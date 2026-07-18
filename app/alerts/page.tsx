"use client";

import { useState } from "react";
import { AlertCircle, Bell, MapPin, Calendar, BookOpen } from "lucide-react";
import SearchFilters from "@/components/ui/SearchFilters";
import RiskBadge from "@/components/ui/RiskBadge";
import TimelineCard from "@/components/ui/TimelineCard";

// Mock data reflecting active bulletins
const INITIAL_ALERTS = [
  {
    id: 1,
    title: "Critical Surge in WhatsApp 'Digital Arrest' Calls",
    content: "Scammers claiming to be CBI Mumbai police. They served a fake arrest warrant PDF on WhatsApp to extort ₹5,00,000.",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar (Noida)",
    date: "19-07-2026",
    risk: "critical",
    advisory: "Government police forces will never conduct online judicial arrests or demand deposits. Block such numbers instantly."
  },
  {
    id: 2,
    title: "Urgent: Electricity Bill Cut-off SMS Phishing",
    content: "Citizens receiving SMS stating: 'Your electricity power will be disconnected in 2 hours. Update KYC by calling 91823...'",
    state: "Haryana",
    district: "Gurugram",
    date: "19-07-2026",
    risk: "high",
    advisory: "Discard such messages. Electricity providers never use private mobile numbers to message disconnect alerts."
  },
  {
    id: 3,
    title: "Fake Customs Officer Call at Airport Customs Gate",
    content: "Scammers claiming a package containing illegal items has arrived in your name at Mumbai Airport customs. They demand customs check deposit.",
    state: "Maharashtra",
    district: "Mumbai City",
    date: "18-07-2026",
    risk: "critical",
    advisory: "Airport customs never call individuals directly to settle shipping holds via private banking or UPI transfers."
  },
  {
    id: 4,
    title: "Bank KYC Update Verification Phishing Links",
    content: "SMS scam wave matching looks like: 'Dear Customer, your SBI account is blocked. Click http://sbi-kyc-verify.in to submit PAN card.'",
    state: "Jharkhand",
    district: "Jamtara",
    date: "17-07-2026",
    risk: "high",
    advisory: "Banks never request PAN card details or password links via private non-https domains. Always use the official bank portal."
  },
  {
    id: 5,
    title: "Part-time Job YouTube Video Likes Task Scam",
    content: "Recruitment scams distributing Telegram job groups offering ₹150 per YouTube video liked. Once users join, they are coerced into cryptocurrency deposit plans.",
    state: "Delhi",
    district: "New Delhi",
    date: "16-07-2026",
    risk: "medium",
    advisory: "Legitimate businesses do not charge money to offer tasks. Avoid speculative deposits in unofficial groups."
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

export default function NationalAlertFeed() {
  const [filteredAlerts, setFilteredAlerts] = useState(INITIAL_ALERTS);

  const handleFilter = ({ state, district, query }: { state: string; district: string; query: string }) => {
    let result = INITIAL_ALERTS;

    // Filter state
    if (state !== "All States") {
      result = result.filter((item) => item.state === state);
    }

    // Filter district
    if (district) {
      result = result.filter((item) => item.district === district);
    }

    // Filter text query
    if (query.trim() !== "") {
      const q = query.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.advisory.toLowerCase().includes(q)
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Grid of Active Alert Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border-l-4 border-navy-900 pl-3">
            <h3 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider">
              Active Security Bulletins ({filteredAlerts.length})
            </h3>
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="bg-white border border-govgray-200 rounded p-12 text-center text-govgray-600">
              <AlertCircle className="h-10 w-10 text-govgray-300 mx-auto mb-2" />
              <p className="text-xs font-semibold">No Regional Alerts Found</p>
              <span className="text-[10px]">Try clearing search parameters to display default items.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-3 shadow-xs hover:border-navy-700 transition-colors"
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-govgray-600">
                      <MapPin className="h-4 w-4 text-navy-900" />
                      <span>
                        {alert.district}, {alert.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-govgray-600 flex items-center gap-1 font-semibold">
                        <Calendar className="h-3.5 w-3.5" /> {alert.date}
                      </span>
                      <RiskBadge level={alert.risk} />
                    </div>
                  </div>

                  {/* Header Title */}
                  <h4 className="font-extrabold text-sm text-navy-900">{alert.title}</h4>

                  {/* Context text */}
                  <p className="text-xs text-govgray-900 leading-relaxed font-medium bg-govgray-50 p-3 rounded">
                    {alert.content}
                  </p>

                  {/* Advisory */}
                  <div className="border-t border-govgray-200 pt-3 flex items-start gap-2 text-navy-900">
                    <BookOpen className="h-4.5 w-4.5 text-saffron-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-bold text-saffron-600 uppercase tracking-wider block">
                        Official Safety Advisory
                      </span>
                      <p className="text-xs font-bold leading-relaxed">{alert.advisory}</p>
                    </div>
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
