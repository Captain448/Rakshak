"use client";

import { useState } from "react";
import { ShieldCheck, Upload, AlertCircle, RefreshCw, HelpCircle } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";

interface RiskAnalysisResult {
  verdict: string;
  score: number;
  matchedVectors: string[];
  logs: string[];
  recommendations: string;
}

export default function CitizenShield() {
  const [indicatorType, setIndicatorType] = useState<"text" | "screenshot" | "pdf">("text");
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState<RiskAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const runAnalysis = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    const steps = [
      "Initialising Public Safety Orchestrator...",
      "Citizen Risk Agent: Processing input OCR & Text layouts...",
      "Threat Intelligence Agent: Searching active call & IP registries...",
      "Fraud Graph Agent: Checking transaction paths in Neo4j database...",
      "Geospatial Agent: Checking regional report density metrics...",
      "Alert Agent: Compiling warning recommendations..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    try {
      const textToSend = indicatorType === "text"
        ? inputText
        : `Uploaded file indicator: ${selectedFile?.name || "unnamed_file"}`;

      const res = await fetch("http://127.0.0.1:8000/api/v1/citizen/verify-threat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: textToSend })
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      setResult({
        verdict: data.risk_level,
        score: data.score,
        matchedVectors: data.reasons && data.reasons.length > 0 ? data.reasons : [data.category],
        logs: [
          `Citizen Risk Agent: Identified script matches for ${data.category}.`,
          `Threat Intelligence: Risk level evaluated as ${data.risk_level} with ${data.score}% score.`,
          `Alert Agent: Compiled ${data.reasons ? data.reasons.length : 0} warning vectors.`
        ],
        recommendations: data.recommendations && data.recommendations.length > 0
          ? data.recommendations.join(" ")
          : "Exercise caution. Do not communicate further or share credentials."
      });
    } catch {
      setError("Threat analysis service temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2">
      {/* Title */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-saffron-500" />
          Citizen Shield Verification Console
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Upload or paste suspicious interactions (SMS, calls, mock warrant letters) to run real-time agent audit checks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Form Input */}
        <div className="md:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-5">
          {/* Tab selector */}
          <div className="flex border-b border-govgray-200">
            <button
              onClick={() => { setIndicatorType("text"); setResult(null); }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-colors ${
                indicatorType === "text" ? "border-navy-900 text-navy-900" : "border-transparent text-govgray-600 hover:text-navy-900"
              }`}
            >
              Paste Message / SMS
            </button>
            <button
              onClick={() => { setIndicatorType("screenshot"); setResult(null); }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-colors ${
                indicatorType === "screenshot" ? "border-navy-900 text-navy-900" : "border-transparent text-govgray-600 hover:text-navy-900"
              }`}
            >
              Upload Screenshot
            </button>
            <button
              onClick={() => { setIndicatorType("pdf"); setResult(null); }}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-colors ${
                indicatorType === "pdf" ? "border-navy-900 text-navy-900" : "border-transparent text-govgray-600 hover:text-navy-900"
              }`}
            >
              Upload PDF Warrant
            </button>
          </div>

          {/* Form Content */}
          {indicatorType === "text" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                SMS / Message content (Paste here)
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g. 'Your bank account will be blocked within 2 hours. Call officer Kumar on +91987654...'"
                rows={5}
                className="bg-white border border-govgray-300 rounded p-3 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
              />
            </div>
          )}

          {(indicatorType === "screenshot" || indicatorType === "pdf") && (
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                Select File (PNG, JPG, or PDF Document)
              </label>
              <div className="border-2 border-dashed border-govgray-300 rounded p-8 text-center flex flex-col items-center justify-center gap-3 bg-govgray-50/50 hover:bg-govgray-50 transition-colors">
                <Upload className="h-8 w-8 text-navy-700" />
                <div>
                  <span className="text-xs font-bold text-navy-900 block">
                    {selectedFile ? selectedFile.name : "Drag & Drop files here"}
                  </span>
                  <span className="text-[10px] text-govgray-600">
                    Maximum upload size: 10MB
                  </span>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept={indicatorType === "pdf" ? ".pdf" : "image/*"}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-4 py-2 rounded cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={runAnalysis}
            disabled={loading || (indicatorType === "text" && !inputText) || ((indicatorType === "screenshot" || indicatorType === "pdf") && !selectedFile)}
            className="bg-saffron-500 hover:bg-saffron-600 disabled:bg-govgray-200 disabled:text-govgray-600 text-white font-bold text-sm py-2.5 rounded shadow transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                Running Security Audit...
              </>
            ) : (
              "Run Multi-Agent Risk Analysis"
            )}
          </button>
        </div>

        {/* Right Column: Dynamic Verdict / Guide */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4">
          <h3 className="font-extrabold text-sm text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Verification Output
          </h3>

          {/* Loader status step */}
          {loading && (
            <div className="flex flex-col gap-3 justify-center items-center py-12 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-saffron-500" />
              <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Orchestrating Agents
              </p>
              <span className="text-[10px] text-govgray-600 max-w-xs leading-relaxed animate-pulse">
                {loadingStep}
              </span>
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <div className="flex flex-col gap-3 justify-center items-center py-12 text-center text-red-800 bg-red-50 border border-red-200 rounded p-4">
              <AlertCircle className="h-10 w-10 text-red-600 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider">Analysis Offline</p>
              <span className="text-xs font-semibold max-w-xs leading-relaxed">
                {error}
              </span>
            </div>
          )}

          {/* No results yet */}
          {!loading && !result && !error && (
            <div className="flex flex-col gap-3 justify-center items-center py-12 text-center text-govgray-600">
              <HelpCircle className="h-10 w-10 text-govgray-300" />
              <p className="text-xs font-semibold">Awaiting Verification Parameters</p>
              <span className="text-[10px] max-w-[200px] leading-relaxed">
                Provide text or upload verification images/files to activate threat models.
              </span>
            </div>
          )}

          {/* Result Renders */}
          {!loading && result && (
            <div className="flex flex-col gap-4">
              {/* Verdict Indicator */}
              <div className="flex flex-col gap-2 items-center justify-center p-4 bg-govgray-50 border border-govgray-200 rounded text-center">
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Threat Classification
                </span>
                <RiskBadge level={result.verdict} />
                <div className="mt-2 w-full bg-govgray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      result.verdict === "CRITICAL"
                        ? "bg-red-600"
                        : result.verdict === "HIGH"
                        ? "bg-amber-500"
                        : "bg-green-600"
                    }`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-navy-900 mt-1">
                  Confidence Score: {result.score}%
                </span>
              </div>

              {/* Matched risk factors */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-1">
                  Flagged Threat Signatures
                </span>
                <ul className="flex flex-col gap-1.5">
                  {result.matchedVectors.map((vc: string, i: number) => (
                    <li key={i} className="text-xs font-semibold text-red-700 flex items-start gap-1.5">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                      {vc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Action */}
              <div className="bg-saffron-100 p-4 border border-saffron-200 rounded flex flex-col gap-1">
                <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-wider">
                  Recommended Action
                </span>
                <p className="text-xs font-bold text-navy-900 leading-relaxed">
                  {result.recommendations}
                </p>
              </div>

              {/* Agent Logs */}
              <div className="border-t border-govgray-200 pt-3 mt-2">
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-1">
                  Audit Trace Logs
                </span>
                <div className="bg-govgray-900 text-green-400 p-3 rounded font-mono text-[9px] leading-relaxed flex flex-col gap-1 overflow-x-auto max-h-40">
                  {result.logs.map((log: string, idx: number) => (
                    <p key={idx} className="whitespace-nowrap">
                      &gt; {log}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
