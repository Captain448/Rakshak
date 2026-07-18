"use client";

import { useState } from "react";
import { FileText, User, Upload, CheckCircle, RefreshCw, ChevronRight, ChevronLeft } from "lucide-react";
import { INDIAN_REGIONS } from "@/components/ui/SearchFilters";

export default function FraudReporting() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  // Step 1: Incident Details
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [scamType, setScamType] = useState("digital_arrest");
  const [description, setDescription] = useState("");
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Step 2: Suspect Details
  const [suspectPhone, setSuspectPhone] = useState("");
  const [suspectUpi, setSuspectUpi] = useState("");
  const [suspectBank, setSuspectBank] = useState("");
  const [suspectIfsc, setSuspectIfsc] = useState("");

  // Step 3: Files
  const [evidenceName, setEvidenceName] = useState("");

  const states = Object.keys(INDIAN_REGIONS).filter(s => s !== "All States");
  const districts = INDIAN_REGIONS[selectedState as keyof typeof INDIAN_REGIONS] || [];

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomId = `MHA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(randomId);
    setLoading(false);
    setSuccess(true);
  };

  const resetForm = () => {
    setStep(1);
    setSuccess(false);
    setReporterName("");
    setReporterPhone("");
    setDescription("");
    setSuspectPhone("");
    setSuspectUpi("");
    setSuspectBank("");
    setSuspectIfsc("");
    setEvidenceName("");
  };

  if (success) {
    return (
      <div className="bg-white border border-govgray-200 rounded p-8 max-w-xl mx-auto text-center flex flex-col items-center justify-center gap-4 py-12 shadow-sm">
        <CheckCircle className="h-14 w-14 text-green-600" />
        <h2 className="text-xl font-extrabold text-navy-900 uppercase tracking-wide">
          Incident Filed Successfully
        </h2>
        <div className="bg-govgray-100 p-4 border border-govgray-200 rounded w-full flex flex-col gap-1.5 my-2">
          <span className="text-[10px] text-govgray-600 font-bold uppercase tracking-wider">
            National Cyber Complaint Acknowledgement
          </span>
          <span className="text-lg font-extrabold text-navy-900 tracking-wider">
            {trackingId}
          </span>
          <p className="text-[10px] text-govgray-600">
            A confirmation SMS with instructions has been dispatched to {reporterPhone}.
          </p>
        </div>
        <p className="text-xs text-govgray-600 leading-relaxed max-w-sm">
          Your report has been logged and forwarded to the appropriate cyber cell. Suspect bank handles have been automatically shared with partner bank nodes for security audits.
        </p>
        <button
          onClick={resetForm}
          className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-5 py-2.5 rounded transition-colors"
        >
          File Another Complaint
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-govgray-200 rounded p-6 flex flex-col gap-6 shadow-sm">
      {/* Title */}
      <div className="border-b border-govgray-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">
            National Cyber Crime Reporting Form
          </h1>
          <p className="text-xs text-govgray-600 mt-1">
            Official intake terminal under the MHA Cyber Crime cell. All filings are legally audited.
          </p>
        </div>
        <span className="text-xs font-bold text-saffron-600 bg-saffron-100 px-3 py-1 rounded">
          Step {step} of 3
        </span>
      </div>

      {/* Form wrapper */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Step 1: Reporter & Incident Details */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-extrabold text-sm text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2 flex items-center gap-1.5">
              <User className="h-4.5 w-4.5 text-saffron-500" />
              Reporter & Incident Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Full Name of Reporter *
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. 'Rajesh Kumar'"
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Contact Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="e.g. '+91 9876543210'"
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Select State *
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                >
                  {states.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Select District *
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  required
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                >
                  <option value="">Choose District</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Scam Category *
                </label>
                <select
                  value={scamType}
                  onChange={(e) => setScamType(e.target.value)}
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                >
                  <option value="digital_arrest">Digital Arrest Impersonation</option>
                  <option value="upi_fraud">UPI Transaction Fraud</option>
                  <option value="part_time">Part-Time Task Offer</option>
                  <option value="kyc_block">Bank KYC Block Text</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Detailed Narrative (Scam timeline description) *
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain exactly how you were approached, what links were clicked, and what the suspects demanded..."
                  rows={4}
                  className="bg-white border border-govgray-300 rounded p-3 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Suspect Indicators */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-extrabold text-sm text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2 flex items-center gap-1.5">
              <FileText className="h-4.5 w-4.5 text-saffron-500" />
              Suspect Handles & Bank Details (If known)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Suspect Phone Number
                </label>
                <input
                  type="text"
                  value={suspectPhone}
                  onChange={(e) => setSuspectPhone(e.target.value)}
                  placeholder="e.g. '+91 9998887776'"
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Suspect UPI ID / Handle
                </label>
                <input
                  type="text"
                  value={suspectUpi}
                  onChange={(e) => setSuspectUpi(e.target.value)}
                  placeholder="e.g. 'cbi-verification@oksbi'"
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Suspect Bank Account Number
                </label>
                <input
                  type="text"
                  value={suspectBank}
                  onChange={(e) => setSuspectBank(e.target.value)}
                  placeholder="e.g. '5010042948293'"
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                  Suspect Bank IFSC Code
                </label>
                <input
                  type="text"
                  value={suspectIfsc}
                  onChange={(e) => setSuspectIfsc(e.target.value)}
                  placeholder="e.g. 'HDFC0000293'"
                  className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Evidentiary Files */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-extrabold text-sm text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2 flex items-center gap-1.5">
              <Upload className="h-4.5 w-4.5 text-saffron-500" />
              Upload Evidence Files
            </h3>

            <div className="border-2 border-dashed border-govgray-300 rounded p-8 text-center flex flex-col items-center justify-center gap-3 bg-govgray-50/50">
              <Upload className="h-8 w-8 text-navy-700" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">
                  {evidenceName ? evidenceName : "Upload PDF warrant copy, bank logs, or screenshots"}
                </span>
                <span className="text-[10px] text-govgray-600">
                  Maximum file upload count: 5 files. formats: PDF, PNG, JPG
                </span>
              </div>
              <input
                type="file"
                id="evidence-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEvidenceName(e.target.files[0].name);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor="evidence-upload"
                className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-4 py-2 rounded cursor-pointer transition-colors"
              >
                Choose File
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center border-t border-govgray-200 pt-4 mt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-govgray-100 hover:bg-govgray-200 text-navy-900 font-bold text-xs px-4 py-2.5 rounded transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={step === 1 && (!reporterName || !reporterPhone || !selectedDistrict || !description)}
              className="bg-navy-900 hover:bg-navy-800 disabled:bg-govgray-200 text-white font-bold text-xs px-4 py-2.5 rounded transition-colors flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-2.5 rounded shadow transition-colors flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Submission in progress...
                </>
              ) : (
                "File Official Complaint"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
