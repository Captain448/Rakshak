"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Bell, MapPin, Calendar, BookOpen } from "lucide-react";
import SearchFilters from "@/components/ui/SearchFilters";
import RiskBadge from "@/components/ui/RiskBadge";
import TimelineCard from "@/components/ui/TimelineCard";

const INITIAL_ALERTS_MAPPED = [
  {
    id: "alt-001",
    title: "Critical Surge in CBI Mumbai Impersonation Campaign",
    category: "Digital Arrest Scam",
    risk_level: "CRITICAL",
    timestamp: "19-07-2026 10:45 AM",
    location: "New Delhi, Delhi",
    summary: "Scammers claiming to be CBI or Mumbai Police officers are serving fake arrest warrant PDFs on WhatsApp to extort large sums.",
    advisory: "Government police forces will never conduct online judicial arrests or demand deposits. Block such numbers instantly.",
    source_message: "I got a WhatsApp video call from a person in a police uniform claiming my Aadhaar number was linked to money laundering.",
    incident_count: 14,
    recommended_action: [
      "Do not transfer money.",
      "Disconnect the call immediately.",
      "Report to the cybercrime helpline (call 1930)."
    ]
  },
  {
    id: "alt-002",
    title: "Urgent: SBI KYC Verification Phishing Spike",
    category: "Fake KYC Scam",
    risk_level: "HIGH",
    timestamp: "19-07-2026 09:15 AM",
    location: "Jamtara, Jharkhand",
    summary: "SMS campaign wave sending links claiming SBI accounts will be blocked unless PAN card credentials are submitted.",
    advisory: "Banks never request PAN card details or password update links via private non-https domains. Always use the official bank portal.",
    source_message: "Dear SBI Customer, your YONO account block today. Please update PAN immediately by clicking link http://sbi-kyc-verify.in",
    incident_count: 32,
    recommended_action: [
      "Ignore suspicious KYC update links.",
      "Visit the official bank website directly.",
      "Report phishing attempts to the bank's security cell."
    ]
  },
  {
    id: "alt-003",
    title: "Verification Code Hijacking Warning",
    category: "OTP Scam",
    risk_level: "HIGH",
    timestamp: "18-07-2026 04:30 PM",
    location: "Gurugram, Haryana",
    summary: "Phishing wave of calls impersonating utility providers requesting electricity bill payment OTP codes to avoid cut-offs.",
    advisory: "Utility providers never request payment confirmation OTPs over voice calls. Discard private text requests.",
    source_message: "Your power connection will be cut off tonight at 9:30 PM due to unpaid bills. Share the OTP sent to your phone to update your bill payment status.",
    incident_count: 18,
    recommended_action: [
      "Never share OTPs with anyone.",
      "Block the suspect sender number.",
      "Contact your utility provider's official customer care."
    ]
  },
  {
    id: "alt-004",
    title: "Automated UPI Cashback Request Warning",
    category: "UPI Fraud",
    risk_level: "HIGH",
    timestamp: "17-07-2026 11:20 AM",
    location: "Noida, Uttar Pradesh",
    summary: "Fraudulent payment confirmation screens and collect requests sent to users claiming to verify cashback refunds.",
    advisory: "UPI PINs are only required to send money, never to receive. Do not enter your PIN for cashback refunds.",
    source_message: "Congratulations, you have won a cash back of Rs 2000! Scan this QR code and verify your UPI PIN to claim your refund in your bank account.",
    incident_count: 25,
    recommended_action: [
      "Verify payment requests before proceeding.",
      "Do not scan unknown QR codes.",
      "Freeze transactions and report to your bank if scammed."
    ]
  }
];

const TIMELINE_ITEMS = [
  {
    time: "10:45 AM Today",
    title: "Noida Sector 62 alert logged",
    description: "4 complaints registered for suspect number +91 99988 87776 posing as CBI officers.",
    badge: <RiskBadge level="critical" />
  },
  {
    time: "09:15 AM Today",
    title: "Bank KYC domain deactivated",
    description: "Telecom node flagged and blocked domain 'http://sbi-kyc-verify.in' across operators.",
    badge: <RiskBadge level="medium" />
  },
  {
    time: "Yesterday",
    title: "Gurugram Electricity text wave spike",
    description: "21 user reports logged in Gurugram Sector 45 for power disconnection scam messages.",
    badge: <RiskBadge level="high" />
  }
];

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
}

export default function NationalAlertFeed() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/alerts`);
        if (!res.ok) {
          throw new Error("Server error");
        }
        const data = await res.json();
        setAlerts(data.alerts || []);
        setFilteredAlerts(data.alerts || []);
        setError(null);
      } catch {
        setError("Unable to sync with live Alert Feed. Showing cached regional warnings.");
        setAlerts(INITIAL_ALERTS_MAPPED);
        setFilteredAlerts(INITIAL_ALERTS_MAPPED);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleFilter = ({ state, district, query }: { state: string; district: string; query: string }) => {
    let result = alerts;

    if (state !== "All States") {
      result = result.filter((item) => item.location?.toLowerCase().includes(state.toLowerCase()));
    }

    if (district) {
      result = result.filter((item) => item.location?.toLowerCase().includes(district.toLowerCase()));
    }

    if (query.trim() !== "") {
      const q = query.toLowerCase();
      result = result.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(q) ||
          (item.summary || "").toLowerCase().includes(q) ||
          (item.category || "").toLowerCase().includes(q)
      );
    }

    setFilteredAlerts(result);
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Title */}
      <div className="border-b border-govgray-200 pb-4 flex items-center gap-2">
        <Bell className="h-7 w-7 text-saffron-500" />
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">National Cyber Security Alert Feed</h1>
          <p className="text-xs text-govgray-600 mt-1">
            Proactive district-level alerts and automated safety recommendations managed by Alert and Notification agents.
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <SearchFilters onSearch={handleFilter} />

      {error && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded flex items-center gap-2">
          <AlertCircle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Grid of Active Alert Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border-l-4 border-navy-900 pl-3">
            <h3 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider">
              Active Security Bulletins ({filteredAlerts.length})
            </h3>
          </div>

          {loading && (
            <div className="text-center py-12 text-govgray-600 text-xs font-bold">
              Syncing with National Command Center...
            </div>
          )}

          {!loading && filteredAlerts.length === 0 ? (
            <div className="bg-white border border-govgray-200 rounded p-12 text-center text-govgray-600">
              <AlertCircle className="h-10 w-10 text-govgray-300 mx-auto mb-2" />
              <p className="text-xs font-semibold">No Regional Alerts Found</p>
              <span className="text-[10px]">Try clearing search parameters to display default items.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {!loading && filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-3 shadow-xs hover:border-navy-700 transition-colors"
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-govgray-600">
                      <MapPin className="h-4 w-4 text-navy-900" />
                      <span>
                        {alert.location || "National Feed"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] text-govgray-600 flex items-center gap-1 font-semibold">
                        <Calendar className="h-3.5 w-3.5" /> {alert.timestamp}
                      </span>
                      <span className="text-[10px] bg-govgray-50 border border-govgray-200 px-2 py-0.5 rounded font-bold text-navy-900">
                        Incidents: {alert.incident_count}
                      </span>
                      <RiskBadge level={alert.risk_level} />
                    </div>
                  </div>

                  {/* Header Title */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-navy-900 uppercase tracking-wide opacity-75">
                      {alert.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-navy-900">{alert.title}</h4>
                  </div>

                  {/* Context text */}
                  <p className="text-xs text-govgray-900 leading-relaxed font-medium bg-govgray-50 p-3 rounded">
                    {alert.summary}
                  </p>

                  {/* Advisory / Recommended actions */}
                  <div className="border-t border-govgray-200 pt-3 flex flex-col gap-2.5 text-navy-900">
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4.5 w-4.5 text-saffron-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-bold text-saffron-600 uppercase tracking-wider block">
                          Official Safety Advisory
                        </span>
                        <p className="text-xs font-bold leading-relaxed">{alert.advisory}</p>
                      </div>
                    </div>
                    {alert.recommended_action && alert.recommended_action.length > 0 && (
                      <div className="pl-7 flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-govgray-600 uppercase tracking-wider block">
                          Recommended Action Items:
                        </span>
                        <ul className="list-disc flex flex-col gap-1.5 pl-3">
                          {alert.recommended_action.map((action: string, idx: number) => (
                            <li key={idx} className="text-xs text-govgray-800 font-semibold leading-relaxed">
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Incident timeline widget */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-5">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wider border-b border-govgray-200 pb-2">
            Real-time Threat Activity
          </h3>

          <TimelineCard items={TIMELINE_ITEMS} />
        </div>
      </div>
    </div>
  );
}
