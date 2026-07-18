"use client";

import { useState } from "react";
import { Landmark, Upload, AlertCircle, RefreshCw } from "lucide-react";

interface CounterfeitAnomaly {
  feature: string;
  issue: string;
  box: {
    top?: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
  };
}

interface CounterfeitResult {
  isCounterfeit: boolean;
  confidence: number;
  serialNumber: string;
  anomalies: CounterfeitAnomaly[];
}

export default function CounterfeitAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CounterfeitResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null); // Clear previous result
    }
  };

  const runAnalysis = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    setResult({
      isCounterfeit: true,
      confidence: 91,
      serialNumber: "9AA 402941",
      anomalies: [
        {
          feature: "National Emblem Seal Alignment",
          issue: "Emblem is offset 3.2mm leftwards relative to RBI template margins.",
          box: { top: "15%", left: "10%", width: "20%", height: "20%" }
        },
        {
          feature: "Language Panel Script Typography",
          issue: "Mismatched regional font thickness detected in Kannada and Tamil spelling nodes.",
          box: { top: "45%", left: "30%", width: "25%", height: "15%" }
        },
        {
          feature: "Watermark Portrait opacity",
          issue: "Mahatma Gandhi portrait transparency exceeds normal limits.",
          box: { top: "25%", right: "8%", width: "22%", height: "35%" }
        }
      ]
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <Landmark className="h-7 w-7 text-saffron-500" />
          Counterfeit Currency Verification (Serial & Layout OCR)
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Forensic audit desk comparing suspect currency uploads directly against standard RBI template patterns (MVP Scope).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Column: Image Upload & Trigger */}
        <div className="md:col-span-1 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-5 h-fit shadow-xs">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Upload Note Image
          </h3>

          <div className="flex flex-col gap-3">
            <div className="border-2 border-dashed border-govgray-300 rounded p-6 text-center flex flex-col items-center justify-center gap-3 bg-govgray-50/50">
              <Upload className="h-7 w-7 text-navy-700" />
              <div>
                <span className="text-[11px] font-bold text-navy-900 block truncate max-w-[150px]">
                  {selectedFile ? selectedFile.name : "Select ₹500 banknote image"}
                </span>
                <span className="text-[9px] text-govgray-600">Max size: 10MB</span>
              </div>
              <input
                type="file"
                id="currency-file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="currency-file"
                className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-[10px] px-3.5 py-2 rounded cursor-pointer transition-colors"
              >
                Choose File
              </label>
            </div>

            <button
              onClick={runAnalysis}
              disabled={loading || !selectedFile}
              className="bg-saffron-500 hover:bg-saffron-600 disabled:bg-govgray-200 disabled:text-govgray-600 text-white font-bold text-xs py-2.5 rounded shadow transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Analyzing Layout...
                </>
              ) : (
                "Scan Specimen Note"
              )}
            </button>
          </div>
        </div>

        {/* Right Columns: Note overlay visualizer and checks */}
        <div className="md:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-5 shadow-xs">
          <div className="flex justify-between items-center border-b border-govgray-200 pb-3">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
              Banknote Alignment Inspector
            </h3>
            <span className="text-[10px] text-govgray-600 font-semibold">Reference Template: ₹500 (2016-series)</span>
          </div>

          {loading && (
            <div className="flex flex-col gap-3 justify-center items-center py-20 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-saffron-500" />
              <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Aligning Specimen Layout
              </p>
              <span className="text-[10px] text-govgray-600 animate-pulse">
                Running OCR matching on serial sequences and template comparison...
              </span>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-govgray-50 border border-govgray-200 rounded p-12 text-center text-govgray-600">
              <Landmark className="h-10 w-10 text-govgray-300 mx-auto mb-2" />
              <p className="text-xs font-semibold">Awaiting Banknote Specimen</p>
              <span className="text-[10px]">Upload a banknote image on the sidebar panel to audit layout alignment.</span>
            </div>
          )}

          {!loading && result && (
            <div className="flex flex-col gap-5">
              
              {/* Banknote image placeholder with bounding box overlays */}
              <div className="border border-govgray-200 rounded bg-govgray-100 p-2 relative h-48 sm:h-56 flex items-center justify-center overflow-hidden">
                {/* Note outline base */}
                <div className="bg-[#e2e8f0] border-2 border-dashed border-govgray-400 rounded w-full h-full relative flex flex-col items-center justify-center">
                  <div className="border border-govgray-300 text-govgray-600 font-bold uppercase tracking-widest text-[10px] p-2 bg-white/50 rounded">
                     ₹500 SPECIMEN LAYOUT
                  </div>
                  
                  {/* Absolute positioning mock bounding boxes */}
                  {result.anomalies.map((anom, idx) => (
                    <div
                      key={idx}
                      className="absolute border-2 border-red-600 bg-red-100/30 flex items-center justify-center cursor-pointer hover:bg-red-100/50 shadow"
                      style={anom.box}
                    >
                      <span className="bg-red-600 text-white font-extrabold text-[8px] h-3.5 w-3.5 flex items-center justify-center rounded-full absolute -top-2 -left-2 shadow">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anomaly list cards */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-red-50 border border-red-200 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4.5 w-4.5 text-red-600" />
                    <div>
                      <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider block">
                        VERDICT: COUNTERFEIT SPECIMEN
                      </span>
                      <p className="text-xs font-bold text-navy-900">
                        Confidence match score: {result.confidence}% | Serial: {result.serialNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                    Anomalies Detected ({result.anomalies.length})
                  </span>
                  {result.anomalies.map((anom, idx) => (
                    <div key={idx} className="border border-govgray-200 rounded p-3 bg-white flex gap-3 hover:border-navy-900 transition-colors">
                      <span className="bg-navy-900 text-white font-extrabold text-[10px] h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-navy-900">{anom.feature}</h4>
                        <p className="text-xs text-govgray-600 leading-relaxed mt-0.5">{anom.issue}</p>
                      </div>
                    </div>
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
