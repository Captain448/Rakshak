"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Clock, User, ArrowLeft, BookOpen, 
  MapPin, CheckCircle2, History, AlertCircle, PlayCircle 
} from "lucide-react";
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

interface ReportData {
  id: string;
  text: string;
  timestamp: string;
  category: string;
  risk_level: string;
  alert_id?: string | null;
}

export default function CaseAuditDetails() {
  const params = useParams();
  const router = useRouter();
  const alertId = params?.alertId as string;

  const [alert, setAlert] = useState<AlertData | null>(null);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAlertDetails = useCallback(async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/alerts/${alertId}`);
      if (!res.ok) {
        throw new Error("Unable to locate case files");
      }
      const data = await res.json();
      setAlert(data.alert);
      setReports(data.reports || []);
      setError(null);
    } catch {
      setError("Alert details are temporarily offline.");
    } finally {
      setLoading(false);
    }
  }, [alertId]);

  useEffect(() => {
    if (alertId) {
      fetchAlertDetails();
    }
  }, [alertId, fetchAlertDetails]);

  const handleStatusChange = async (action: "investigate" | "resolve" | "archive") => {
    try {
      setActionLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/alerts/${alertId}/${action}`, {
        method: "POST"
      });
      if (!res.ok) {
        throw new Error(`Failed to perform status action: ${action}`);
      }
      // Re-fetch details to sync the state
      await fetchAlertDetails();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      window.alert(`Action error: ${errMsg}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-govgray-600 text-xs font-bold">
        Accessing classified case files from National Security database...
      </div>
    );
  }

  if (error || !alert) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded p-6 max-w-xl mx-auto my-12 text-center">
        <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-2" />
        <p>{error || "Case details not found."}</p>
        <button 
          onClick={() => router.push("/authority/cases")}
          className="mt-4 bg-navy-900 text-white text-[10px] font-bold px-4 py-2 rounded hover:bg-navy-800 transition-colors"
        >
          Return to Cases Board
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Header Back bar */}
      <div className="flex justify-between items-center border-b border-govgray-200 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/authority/cases" className="p-1.5 border border-govgray-200 rounded hover:bg-govgray-50 transition-colors text-navy-900">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-navy-900 text-white px-2 py-0.5 rounded font-bold uppercase">
                Alert ID: {alert.id}
              </span>
              <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold uppercase">
                Status: {alert.status}
              </span>
            </div>
            <h1 className="text-lg font-extrabold text-navy-900 mt-1">{alert.title}</h1>
          </div>
        </div>

        {/* Case status buttons */}
        <div className="flex gap-2">
          <button
            disabled={actionLoading || alert.status === "INVESTIGATING"}
            onClick={() => handleStatusChange("investigate")}
            className="px-3.5 py-1.5 border border-amber-600 text-amber-700 bg-white hover:bg-amber-50 rounded text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Investigate
          </button>
          <button
            disabled={actionLoading || alert.status === "RESOLVED"}
            onClick={() => handleStatusChange("resolve")}
            className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1 shadow-sm"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Resolve Case
          </button>
          <button
            disabled={actionLoading || alert.status === "ARCHIVED"}
            onClick={() => handleStatusChange("archive")}
            className="px-3.5 py-1.5 border border-govgray-300 text-govgray-700 bg-white hover:bg-govgray-100 rounded text-xs font-bold transition-colors disabled:opacity-50"
          >
            Archive Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Details & Associated Reports */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card: Alert details */}
          <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
              Alert Profile Overview
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1 border-r border-govgray-100 pr-2">
                <span className="text-govgray-600 font-semibold">Scam Category</span>
                <span className="font-bold text-navy-900">{alert.category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-govgray-600 font-semibold">Risk Classification</span>
                <div>
                  <RiskBadge level={alert.risk_level} />
                </div>
              </div>
              <div className="flex flex-col gap-1 border-r border-govgray-100 pr-2 pt-2 border-t sm:border-t-0">
                <span className="text-govgray-600 font-semibold">Incident Aggregation</span>
                <span className="font-extrabold text-navy-900">{alert.incident_count} reports linked</span>
              </div>
              <div className="flex flex-col gap-1 pt-2 border-t sm:border-t-0">
                <span className="text-govgray-600 font-semibold">Flagged Regional Location</span>
                <span className="font-bold text-navy-900 flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-saffron-500" />
                  {alert.location || "National Scope / Distributed"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs border-t border-govgray-200 pt-3">
              <span className="text-govgray-600 font-semibold">Intelligence Summary</span>
              <p className="bg-govgray-50 text-navy-900 font-medium p-3 rounded leading-relaxed border border-govgray-200">
                {alert.summary}
              </p>
            </div>

            {/* Advisory / Recommendations */}
            <div className="border-t border-govgray-200 pt-3 flex flex-col gap-3 text-navy-900">
              <div className="flex items-start gap-2">
                <BookOpen className="h-4.5 w-4.5 text-saffron-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-saffron-600 uppercase tracking-wider block">
                    Advisory Published to Citizens
                  </span>
                  <p className="text-xs font-bold leading-relaxed">{alert.advisory}</p>
                </div>
              </div>

              {alert.recommended_action && alert.recommended_action.length > 0 && (
                <div className="pl-7 flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-govgray-600 uppercase tracking-wider block">
                    Recommendations Checklist:
                  </span>
                  <ul className="list-disc flex flex-col gap-1 pl-3 text-xs text-govgray-800 font-semibold leading-relaxed">
                    {alert.recommended_action.map((action, idx) => (
                      <li key={idx}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Card: Linked citizen reports */}
          <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
              Linked Citizen Submissions ({reports.length})
            </h3>
            
            <div className="flex flex-col gap-3.5">
              {reports.map((rep) => (
                <div key={rep.id} className="border border-govgray-200 rounded p-4.5 bg-govgray-50/50 hover:border-navy-900 transition-colors flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-bold flex-wrap gap-2">
                    <span className="text-govgray-600 bg-govgray-100 border border-govgray-200 px-2 py-0.5 rounded">
                      Report ID: {rep.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-govgray-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {new Date(rep.timestamp).toLocaleString()}
                      </span>
                      <RiskBadge level={rep.risk_level} />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-navy-900 leading-relaxed bg-white border border-govgray-200 p-3 rounded">
                    &ldquo;{rep.text}&rdquo;
                  </p>
                </div>
              ))}

              {reports.length === 0 && (
                <p className="text-center py-6 text-xs text-govgray-600 font-semibold">
                  No direct citizen reports are currently linked. Pre-seeded campaign metadata loaded.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Case timeline & Audit history */}
        <div className="flex flex-col gap-6">
          {/* Card: Audit history timeline */}
          <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2 flex items-center gap-1.5">
              <History className="h-4 w-4 text-saffron-500" />
              Dynamic Case Audit History
            </h3>

            <div className="flex flex-col gap-1 text-[10px] text-govgray-600 font-semibold">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>Last updated by: <strong>{alert.status_changed_by}</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Timestamp: <strong>{alert.updated_at}</strong></span>
              </div>
            </div>

            {/* Timeline component */}
            <div className="relative border-l border-govgray-200 ml-2.5 pl-4 flex flex-col gap-5 text-xs pt-1">
              {/* Dynamic history loop */}
              {alert.history && alert.history.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[22.5px] top-0.5 bg-navy-900 border border-saffron-500 rounded-full h-3 w-3"></div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-navy-900">{event.event}</span>
                    <span className="text-[10px] text-govgray-600 font-semibold flex items-center gap-0.5">
                      <Clock className="h-3 w-3" /> {event.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Alert Creation event fallback */}
              {(!alert.history || alert.history.length === 0) && (
                <div className="relative">
                  <div className="absolute -left-[22.5px] top-0.5 bg-navy-900 border border-saffron-500 rounded-full h-3 w-3"></div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-navy-900">Alert compiled by Command Center</span>
                    <span className="text-[10px] text-govgray-600 font-semibold flex items-center gap-0.5">
                      <Clock className="h-3 w-3" /> {alert.timestamp}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
