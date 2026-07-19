"use client";

import { useState, useEffect } from "react";
import { Eye, FileText, Filter } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";
import Link from "next/link";

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

export default function InvestigationDashboard() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/authority/alerts`);
        if (!res.ok) throw new Error("Failed to load alerts");
        const data = await res.json();
        setAlerts(data);
      } catch {
        // Mock fallback if backend is offline
        setAlerts([
          {
            id: "alt-001",
            title: "Critical Surge in CBI Mumbai Impersonation Campaign",
            category: "Digital Arrest Scam",
            risk_level: "CRITICAL",
            timestamp: "19-07-2026 10:45 AM",
            location: "New Delhi, Delhi",
            summary: "Scammers claiming to be CBI or Mumbai Police officers are serving fake arrest warrant PDFs on WhatsApp to extort large sums.",
            advisory: "Government police forces will never conduct online judicial arrests or demand deposits.",
            source_message: "WhatsApp video call claiming money laundering link.",
            incident_count: 14,
            recommended_action: ["Do not transfer money.", "Disconnect call."],
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
            summary: "SMS campaign wave sending links claiming SBI accounts will be blocked.",
            advisory: "Banks never request credentials via SMS links.",
            source_message: "SBI block alert message.",
            incident_count: 32,
            recommended_action: ["Ignore links.", "Visit official site."],
            status: "INVESTIGATING",
            updated_at: "19-07-2026 09:15 AM",
            status_changed_by: "Investigator",
            history: []
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const filteredAlerts = filterStatus === "ALL" 
    ? alerts 
    : alerts.filter((a) => a.status === filterStatus);

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-red-50 text-red-700 border-red-200 font-bold";
      case "INVESTIGATING":
        return "bg-amber-50 text-amber-700 border-amber-200 font-bold";
      case "RESOLVED":
        return "bg-green-50 text-green-700 border-green-200 font-bold";
      case "ARCHIVED":
        return "bg-govgray-50 text-govgray-700 border-govgray-200";
      default:
        return "bg-govgray-50 text-govgray-700 border-govgray-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <FileText className="h-7 w-7 text-saffron-500" />
          National Incident & Investigation Dashboard
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Review, assign, and audit citizen reported incidents. Access extracted suspect nodes and safety alerts.
        </p>
      </div>

      <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
        {/* Table Header and filter */}
        <div className="flex justify-between items-center border-b border-govgray-200 pb-3 flex-wrap gap-4">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
            Active Cyber Threat Alerts ({filteredAlerts.length})
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-govgray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-govgray-50 border border-govgray-300 rounded p-1.5 text-xs font-bold text-navy-900 focus:outline-none focus:border-navy-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INVESTIGATING">INVESTIGATING</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12 text-govgray-600 text-xs font-bold">
            Loading investigation cases from command center...
          </div>
        )}

        {!loading && filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-govgray-600 text-xs font-semibold">
            No threat alerts matched the current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-govgray-200 text-left text-xs font-medium text-govgray-900 border border-govgray-200">
              <thead className="bg-govgray-50 text-[10px] font-bold uppercase tracking-wider text-govgray-600">
                <tr>
                  <th className="px-4 py-3 border-b border-govgray-200">Alert ID</th>
                  <th className="px-4 py-3 border-b border-govgray-200">Category</th>
                  <th className="px-4 py-3 border-b border-govgray-200">Risk Level</th>
                  <th className="px-4 py-3 border-b border-govgray-200">Incidents</th>
                  <th className="px-4 py-3 border-b border-govgray-200">Created Time</th>
                  <th className="px-4 py-3 border-b border-govgray-200">Status</th>
                  <th className="px-4 py-3 border-b border-govgray-200 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-govgray-200">
                {!loading && filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-govgray-50/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-navy-900">{alert.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-navy-900">{alert.category}</span>
                        <span className="text-[10px] text-govgray-600 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {alert.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <RiskBadge level={alert.risk_level} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold">{alert.incident_count} reports</td>
                    <td className="px-4 py-3 whitespace-nowrap text-govgray-600">{alert.timestamp}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-[9px] rounded border uppercase tracking-wider ${getStatusBadgeStyle(alert.status)}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Link
                        href={`/authority/cases/${alert.id}`}
                        className="bg-navy-900 hover:bg-navy-800 text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5 ml-auto shadow-xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Audit Case
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
