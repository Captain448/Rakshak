"use client";

import { useState, useEffect } from "react";
import { MapPin, Info, Compass } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";

interface AlertData {
  id: string;
  category: string;
  risk_level: string;
  location?: string | null;
  timestamp: string;
}

export default function GeospatialCommandCenter() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/authority/alerts`);
        if (!res.ok) throw new Error("Failed to load alerts");
        const data = await res.json();
        setAlerts(data);
      } catch {
        setAlerts([
          { id: "alt-001", category: "Digital Arrest Scam", risk_level: "CRITICAL", location: "New Delhi, Delhi", timestamp: "19-07-2026" },
          { id: "alt-002", category: "Fake KYC Scam", risk_level: "HIGH", location: "Jamtara, Jharkhand", timestamp: "19-07-2026" },
          { id: "alt-003", category: "OTP Scam", risk_level: "HIGH", location: "Gurugram, Haryana", timestamp: "18-07-2026" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <Compass className="h-7 w-7 text-saffron-500" />
          National Threat Geospatial Heatmap
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Geospatial visualization of active cyber fraud warning loops and telemetry nodes across all states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Column: Visual Map Simulation */}
        <div className="lg:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm min-h-[460px]">
          <div className="flex justify-between items-center border-b border-govgray-200 pb-2">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
              Active Regional Telemetry Coordinates
            </h3>
            <span className="text-[10px] bg-saffron-50 text-saffron-800 border border-saffron-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Simulated Overlay Mode
            </span>
          </div>

          <div className="bg-govgray-50 border border-govgray-200 rounded-lg flex-1 relative flex items-center justify-center overflow-hidden min-h-[380px]">
            {/* Background Map grids */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40"></div>
            
            {/* India Shape skeletal outline placeholder */}
            <div className="border-4 border-dashed border-govgray-200 rounded-full h-80 w-80 flex items-center justify-center flex-col opacity-60">
              <span className="text-xs font-extrabold text-govgray-400 uppercase tracking-widest">MAP INTERFACE CANVAS</span>
              <span className="text-[9px] text-govgray-400 font-semibold mt-1">Geospatial nodes mapped</span>
            </div>

            {/* Dynamic location markers */}
            {!loading && alerts.map((a, idx) => (
              a.location && (
                <div 
                  key={a.id}
                  style={{
                    position: "absolute",
                    top: `${30 + idx * 18}%`,
                    left: `${35 + idx * 12}%`
                  }}
                  className="flex items-center gap-1.5 bg-white border border-govgray-200 rounded p-1.5 shadow-sm text-[9px] font-bold text-navy-900 z-10 animate-fade-in"
                >
                  <MapPin className="h-3 w-3 text-red-600 shrink-0" />
                  <div className="flex flex-col">
                    <span>{a.location.split(",")[0]}</span>
                    <span className="text-[8px] opacity-75 font-semibold text-govgray-600">{a.category}</span>
                  </div>
                </div>
              )
            ))}

            {/* Coming Soon Alert Box */}
            <div className="absolute bottom-6 left-6 right-6 bg-navy-900 text-white p-3 rounded-lg flex items-center gap-2.5 shadow border border-saffron-500 z-20 max-w-sm mx-auto">
              <Info className="h-5 w-5 text-saffron-500 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-saffron-500 uppercase tracking-wider block">Roadmap Feature Warning</span>
                <span className="text-[10px] font-medium leading-relaxed">
                  Real-time ISP and telecom cell tower location mapping coming soon.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Listing Active Alert Locations */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Active Threat Hotspots ({alerts.length})
          </h3>

          {loading && <div className="text-xs font-semibold text-govgray-600">Loading locations...</div>}

          <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
            {!loading && alerts.map((a) => (
              <div key={a.id} className="border border-govgray-200 rounded p-3 bg-govgray-50/50 flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold flex-wrap gap-1">
                  <span className="text-govgray-600 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-saffron-600 shrink-0" />
                    {a.location || "National Feed"}
                  </span>
                  <RiskBadge level={a.risk_level} />
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-navy-900">
                  <span>{a.category}</span>
                  <span className="text-[10px] text-govgray-600 font-bold uppercase">{a.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
