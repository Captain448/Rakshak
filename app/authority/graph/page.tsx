"use client";

import { useState, useEffect } from "react";
import { Network, Info, ArrowRight, Shield } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";

interface AlertData {
  id: string;
  title: string;
  category: string;
  risk_level: string;
  timestamp: string;
  location?: string | null;
  summary: string;
  advisory: string;
  source_message: string;
  incident_count: number;
  recommended_action: string[];
  status: string;
  updated_at: string;
  status_changed_by: string;
  history: { event: string; time: string }[];
}

interface ReportData {
  id: string;
  text: string;
  timestamp: string;
  category: string;
  risk_level: string;
  alert_id?: string | null;
}

export default function FraudGraphExplorer() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
  const [linkedReports, setLinkedReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/authority/alerts`);
        if (!res.ok) throw new Error("Failed to load alerts");
        const alertsData = await res.json();
        setAlerts(alertsData);
        if (alertsData.length > 0) {
          setSelectedAlert(alertsData[0]);
        }
      } catch {
        // Mock fallback if offline
        const mockAlerts = [
          {
            id: "alt-001",
            title: "Critical Surge in CBI Mumbai Impersonation Campaign",
            category: "Digital Arrest Scam",
            risk_level: "CRITICAL",
            timestamp: "19-07-2026 10:45 AM",
            location: "New Delhi, Delhi",
            summary: "Scammers claiming to be CBI or Mumbai Police officers.",
            advisory: "Block such numbers instantly.",
            source_message: "WhatsApp video call from CBI.",
            incident_count: 14,
            recommended_action: [],
            status: "ACTIVE",
            updated_at: "19-07-2026 10:45 AM",
            status_changed_by: "System",
            history: []
          },
          {
            id: "alt-002",
            title: "Urgent: SBI KYC Verification Phishing Spike",
            category: "Fake KYC Scam",
            risk_level: "HIGH",
            timestamp: "19-07-2026 09:15 AM",
            location: "Jamtara, Jharkhand",
            summary: "SMS campaign wave sending links claiming SBI accounts block.",
            advisory: "Banks never request credentials via SMS links.",
            source_message: "SBI block alert message.",
            incident_count: 32,
            recommended_action: [],
            status: "ACTIVE",
            updated_at: "19-07-2026 09:15 AM",
            status_changed_by: "System",
            history: []
          }
        ];
        setAlerts(mockAlerts);
        setSelectedAlert(mockAlerts[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  useEffect(() => {
    const fetchLinkedReports = async () => {
      if (!selectedAlert) return;
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/authority/alerts/${selectedAlert.id}`);
        if (!res.ok) throw new Error("Failed to load details");
        const data = await res.json();
        setLinkedReports(data.reports || []);
      } catch {
        // Fallback mock report links matching category
        if (selectedAlert.id === "alt-001") {
          setLinkedReports([
            { id: "rep-001", text: "Got WhatsApp call claiming I was under digital arrest.", timestamp: "19-07-2026", category: "Digital Arrest Scam", risk_level: "CRITICAL", alert_id: "alt-001" },
            { id: "rep-002", text: "Fake police served CBI arrest notice PDF online.", timestamp: "19-07-2026", category: "Digital Arrest Scam", risk_level: "HIGH", alert_id: "alt-001" }
          ]);
        } else {
          setLinkedReports([
            { id: "rep-003", text: "SBI KYC update link received via SMS.", timestamp: "19-07-2026", category: "Fake KYC Scam", risk_level: "HIGH", alert_id: "alt-002" }
          ]);
        }
      }
    };
    fetchLinkedReports();
  }, [selectedAlert]);

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <Network className="h-7 w-7 text-saffron-500" />
          Fraud Relationship Graph Explorer
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Trace structural connections between scam campaigns, warning alerts, citizen reports, and calculated risk level nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Left Column: Select active alerts */}
        <div className="bg-white border border-govgray-200 rounded p-4 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Active Alerts Directory
          </h3>
          {loading && <div className="text-xs font-semibold text-govgray-600">Loading directory...</div>}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px]">
            {!loading && alerts.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedAlert(a)}
                className={`text-left p-3 rounded border text-xs font-bold transition-all flex flex-col gap-1.5 ${
                  selectedAlert?.id === a.id 
                    ? "bg-navy-900 text-white border-navy-900 shadow-sm" 
                    : "bg-govgray-50/50 hover:bg-govgray-50 text-navy-900 border-govgray-200"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] uppercase font-extrabold">
                  <span>{a.id}</span>
                  <span className={selectedAlert?.id === a.id ? "text-saffron-500" : "text-govgray-600"}>
                    {a.status}
                  </span>
                </div>
                <span>{a.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Graph Canvas Area */}
        <div className="lg:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm relative min-h-[480px]">
          <div className="flex justify-between items-center border-b border-govgray-200 pb-2">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
              Active Entity Relationship Tree
            </h3>
            <span className="text-[10px] text-govgray-600 font-bold uppercase tracking-wider">
              Lightweight Visual Nodes
            </span>
          </div>

          {selectedAlert ? (
            <div className="bg-govgray-50 border border-govgray-200 rounded-lg flex-1 relative overflow-hidden flex flex-col items-center py-6 min-h-[400px]">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
              
              {/* Category Node (Level 1) */}
              <div className="bg-navy-900 text-white border border-saffron-500 rounded p-3 text-center text-xs font-extrabold shadow-sm w-44 z-10">
                <span className="text-[9px] font-bold text-saffron-500 uppercase block tracking-wider">Scam Category</span>
                {selectedAlert.category}
              </div>

              {/* Arrow Line 1 */}
              <div className="h-10 w-0.5 bg-govgray-300 relative">
                <div className="absolute -bottom-1 -left-[3px] border-l-4 border-r-4 border-t-4 border-transparent border-t-govgray-400"></div>
              </div>

              {/* Alert Node (Level 2) */}
              <div className="bg-white border-2 border-navy-900 rounded p-3 text-center text-xs font-extrabold shadow-sm w-48 z-10 flex flex-col gap-1">
                <span className="text-[9px] font-bold text-navy-900 opacity-75 uppercase tracking-wide">Warning Alert Node</span>
                <span className="text-navy-900">{selectedAlert.id}</span>
                <span className="text-[9px] text-govgray-600 font-semibold">{selectedAlert.location || "National"}</span>
              </div>

              {/* Connection Lines & Reports Nodes */}
              {linkedReports.length > 0 ? (
                <div className="w-full flex flex-col items-center">
                  {/* Vertical Connection Spindle */}
                  <div className="h-8 w-0.5 bg-govgray-300"></div>
                  
                  {/* Reports Row (Level 3) */}
                  <div className="flex justify-around items-start w-full gap-4 px-4">
                    {linkedReports.map((rep) => (
                      <div key={rep.id} className="flex flex-col items-center max-w-[140px]">
                        {/* Connecting Line to Child */}
                        <div className="h-6 w-0.5 bg-govgray-300 relative">
                          <div className="absolute -bottom-1 -left-[3px] border-l-4 border-r-4 border-t-4 border-transparent border-t-govgray-400"></div>
                        </div>

                        {/* Report Node */}
                        <div className="bg-white border border-govgray-300 rounded-lg p-2.5 shadow-xs text-[10px] font-semibold text-navy-900 text-center w-full flex flex-col gap-1.5 z-10 hover:border-navy-900 transition-colors">
                          <span className="text-[8px] font-bold text-govgray-600 uppercase tracking-wide">Report {rep.id}</span>
                          <p className="overflow-hidden text-ellipsis max-h-[36px] leading-tight font-medium">
                            &ldquo;{rep.text}&rdquo;
                          </p>
                          <div className="border-t border-govgray-100 pt-1 flex justify-center">
                            <RiskBadge level={rep.risk_level} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center mt-6 text-[10px] font-bold text-govgray-600">
                  <ArrowRight className="h-5 w-5 rotate-90 mb-1" />
                  <span>No dynamically linked reports yet.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 text-xs font-bold text-govgray-600">
              Select an alert from the directory to visualize relations.
            </div>
          )}
        </div>

        {/* Right Column: Node Info Details */}
        <div className="bg-white border border-govgray-200 rounded p-4 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2 flex items-center gap-1">
            <Shield className="h-4 w-4 text-saffron-500" />
            Selected Node Inspector
          </h3>

          {selectedAlert ? (
            <div className="flex flex-col gap-3.5 text-xs text-navy-900">
              <div className="bg-govgray-50 border border-govgray-200 rounded p-3 flex flex-col gap-1">
                <span className="text-[8px] font-bold text-govgray-600 uppercase">Warning Entity</span>
                <span className="font-extrabold text-navy-900">{selectedAlert.id}</span>
                <span className="text-[10px] font-semibold text-govgray-600 mt-1">{selectedAlert.title}</span>
              </div>

              <div className="flex flex-col gap-1 border-b border-govgray-100 pb-2">
                <span className="text-[9px] font-bold text-govgray-600 uppercase tracking-wide">Threat Severity</span>
                <div>
                  <RiskBadge level={selectedAlert.risk_level} />
                </div>
              </div>

              <div className="flex flex-col gap-1 border-b border-govgray-100 pb-2">
                <span className="text-[9px] font-bold text-govgray-600 uppercase tracking-wide">Incident Counts</span>
                <span className="font-bold">{selectedAlert.incident_count} reports linked</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-govgray-600 uppercase tracking-wide">Linked Reports Details</span>
                <div className="flex flex-col gap-1.5 mt-1 max-h-[160px] overflow-y-auto">
                  {linkedReports.map((rep) => (
                    <div key={rep.id} className="border border-govgray-200 rounded p-2 bg-white text-[10px] font-semibold flex items-center justify-between">
                      <span className="text-govgray-600">{rep.id}</span>
                      <RiskBadge level={rep.risk_level} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center py-12 text-center text-govgray-600 text-xs">
              <Info className="h-6 w-6 text-govgray-300 mb-1" />
              <span>Select node directories to trace details.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
