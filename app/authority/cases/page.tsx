"use client";

import { useState } from "react";
import { Eye, FileText, Download, Check, Filter, Phone } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";

interface CaseItem {
  id: string;
  date: string;
  reporter: string;
  phone: string;
  scamType: string;
  suspectPhone: string;
  suspectUpi: string;
  status: string;
  severity: string;
  description: string;
  evidenceFile: string;
}

const MOCK_CASES: CaseItem[] = [
  {
    id: "MHA-2026-482019",
    date: "19-07-2026",
    reporter: "Rajesh Kumar",
    phone: "+91 98765 43210",
    scamType: "Digital Arrest",
    suspectPhone: "+91 99988 87776",
    suspectUpi: "cbi-verification@oksbi",
    status: "UNDER_INVESTIGATION",
    severity: "critical",
    description: "Received WhatsApp video call from suspects posing as CBI Mumbai. Serviced a fake warrant demanding ₹5,00,000.",
    evidenceFile: "cbi_fake_warrant_noida.pdf"
  },
  {
    id: "MHA-2026-829402",
    date: "19-07-2026",
    reporter: "Amit Sinha",
    phone: "+91 91234 56780",
    scamType: "UPI Fraud",
    suspectPhone: "+91 91112 22334",
    suspectUpi: "verify-support@okicici",
    status: "PENDING",
    severity: "high",
    description: "Coerced into updating PAN card on fake bank portal, leading to ₹85,000 transaction to suspect UPI handle.",
    evidenceFile: "bank_sms_screenshot.png"
  },
  {
    id: "MHA-2026-302948",
    date: "18-07-2026",
    reporter: "Sunita Roy",
    phone: "+91 93344 55667",
    scamType: "Part-Time Task",
    suspectPhone: "+91 94455 66778",
    suspectUpi: "task-rewards@paytm",
    status: "RESOLVED",
    severity: "medium",
    description: "Offered daily tasks on Telegram. Defrauded of ₹12,00,000 deposit before tasks page disappeared.",
    evidenceFile: "telegram_chat_history.pdf"
  }
];

export default function InvestigationDashboard() {
  const [cases, setCases] = useState<CaseItem[]>(MOCK_CASES);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(MOCK_CASES[0]);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const handleResolve = (caseId: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: "RESOLVED" } : c))
    );
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase((prev: CaseItem | null) => prev ? { ...prev, status: "RESOLVED" } : null);
    }
  };

  const filteredCases = filterStatus === "ALL" 
    ? cases 
    : cases.filter((c) => c.status === filterStatus);

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <FileText className="h-7 w-7 text-saffron-500" />
          National Incident & Investigation Dashboard
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Review, assign, and audit citizen reported incidents. Access extracted suspect nodes and evidentiary logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Columns: Case Table list */}
        <div className="lg:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          {/* Table Header and filter */}
          <div className="flex justify-between items-center border-b border-govgray-200 pb-3 flex-wrap gap-2">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
              Incident Case Queue
            </h3>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-govgray-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border border-govgray-300 rounded p-1 text-xs font-semibold text-govgray-900 focus:outline-none focus:border-navy-700"
              >
                <option value="ALL">All Complaints</option>
                <option value="PENDING">Pending</option>
                <option value="UNDER_INVESTIGATION">Under Investigation</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-govgray-200 text-left text-xs font-medium text-govgray-900 border border-govgray-200">
              <thead className="bg-govgray-50 text-[10px] font-bold uppercase tracking-wider text-govgray-600">
                <tr>
                  <th className="px-3 py-3 border-b border-govgray-200">Case ID</th>
                  <th className="px-3 py-3 border-b border-govgray-200">Date</th>
                  <th className="px-3 py-3 border-b border-govgray-200">Type</th>
                  <th className="px-3 py-3 border-b border-govgray-200">Reporter</th>
                  <th className="px-3 py-3 border-b border-govgray-200">Severity</th>
                  <th className="px-3 py-3 border-b border-govgray-200">Status</th>
                  <th className="px-3 py-3 border-b border-govgray-200 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-govgray-200 bg-white">
                {filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-govgray-50/50 cursor-pointer ${
                      selectedCase?.id === c.id ? "bg-saffron-100/10 border-l-4 border-l-saffron-500" : ""
                    }`}
                    onClick={() => setSelectedCase(c)}
                  >
                    <td className="px-3 py-3 whitespace-nowrap font-bold text-navy-900">{c.id}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-govgray-600">{c.date}</td>
                    <td className="px-3 py-3 whitespace-nowrap font-semibold">{c.scamType}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{c.reporter}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <RiskBadge level={c.severity} />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase ${
                        c.status === "RESOLVED"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : c.status === "UNDER_INVESTIGATION"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}>
                        {c.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right">
                      <button className="bg-navy-900 text-white hover:bg-navy-800 text-[10px] font-bold px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Case Auditor detail */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-3">
            Case Details & Evidence
          </h3>

          {!selectedCase ? (
            <div className="text-center py-12 text-govgray-600 text-xs font-semibold">
              Select a case row to load evidentiary parameters.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              
              {/* ID Metadata block */}
              <div className="bg-govgray-50 border border-govgray-200 rounded p-4 flex flex-col gap-1">
                <span className="text-[10px] text-govgray-600 font-bold uppercase tracking-wider">
                  Auditing Case File
                </span>
                <span className="text-sm font-extrabold text-navy-900">
                  {selectedCase.id}
                </span>
                <div className="flex justify-between items-center text-[10px] text-govgray-600 font-semibold mt-1">
                  <span>Reporter: {selectedCase.reporter}</span>
                  <span>Contact: {selectedCase.phone}</span>
                </div>
              </div>

              {/* Narrative description */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-1">
                  Complaint Description
                </span>
                <p className="text-xs text-govgray-950 bg-govgray-50 p-3 rounded border border-govgray-200 leading-relaxed font-semibold">
                  {selectedCase.description}
                </p>
              </div>

              {/* Suspect identifiers */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-2">
                  Identified Threat Nodes
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <div className="border border-govgray-200 rounded p-2.5 bg-white flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-govgray-600 uppercase">Suspect Phone</span>
                    <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {selectedCase.suspectPhone}
                    </span>
                  </div>
                  <div className="border border-govgray-200 rounded p-2.5 bg-white flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-govgray-600 uppercase">Target UPI ID</span>
                    <span className="text-xs font-bold text-navy-900">
                      {selectedCase.suspectUpi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Evidentiary attachments */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-1">
                  Evidentiary Attachments
                </span>
                <div className="border border-govgray-200 rounded p-2.5 flex justify-between items-center bg-govgray-50 hover:bg-govgray-100 transition-colors">
                  <span className="text-xs font-bold text-navy-900 truncate max-w-[150px]">
                    {selectedCase.evidenceFile}
                  </span>
                  <button className="bg-navy-900 text-white p-1 rounded hover:bg-navy-800 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Resolution options */}
              {selectedCase.status !== "RESOLVED" && (
                <div className="border-t border-govgray-200 pt-3 mt-1 flex gap-2">
                  <button
                    onClick={() => handleResolve(selectedCase.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2 rounded transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Check className="h-4 w-4" /> Mark Case Resolved
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
