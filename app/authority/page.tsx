"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Users, TrendingUp, DollarSign, Activity, MapPin, Eye } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import Link from "next/link";

interface DashboardStats {
  total_alerts: number;
  critical_alerts: number;
  high_alerts: number;
  total_reports: number;
  reports_today: number;
  categories: string[];
}

export default function NationalCommandCenter() {
  const [stats, setStats] = useState<DashboardStats>({
    total_alerts: 0,
    critical_alerts: 0,
    high_alerts: 0,
    total_reports: 0,
    reports_today: 0,
    categories: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/authority/dashboard`);
        if (!res.ok) throw new Error("Dashboard API unavailable");
        const data = await res.json();
        setStats(data);
      } catch {
        // Fallback mock stats for local development offline mode
        setStats({
          total_alerts: 4,
          critical_alerts: 1,
          high_alerts: 3,
          total_reports: 99,
          reports_today: 5,
          categories: ["Digital Arrest Scam", "Fake KYC Scam", "OTP Scam", "UPI Fraud"]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);



  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Page Header */}
      <div className="border-b border-govgray-200 pb-4 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
            <Activity className="h-7 w-7 text-saffron-500" />
            National Public Safety Command Center
          </h1>
          <p className="text-xs text-govgray-600 mt-1">
            Law Enforcement oversight panel monitoring active cyber fraud, money routing links, and regional hotspot telemetry.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold text-navy-900 bg-govgray-100 border border-govgray-200 px-3 py-1.5 rounded uppercase">
            Jurisdiction: All India
          </span>
          <span className="text-[10px] font-bold text-white bg-red-600 px-3 py-1.5 rounded uppercase animate-pulse">
            Live Stream Connected
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Threat Alerts"
          value={loading ? "..." : stats.total_alerts.toString()}
          description="Active campaign bulletins"
          icon={<ShieldAlert className="h-5 w-5 text-navy-900" />}
          trend={{ value: `${stats.critical_alerts} critical campaigns logged`, type: "up" }}
        />
        <StatCard
          title="Citizen Reports Logged"
          value={loading ? "..." : stats.total_reports.toString()}
          description="Submissions processed by agents"
          icon={<Users className="h-5 w-5 text-navy-900" />}
          trend={{ value: `${stats.reports_today} verified reports logged today`, type: "neutral" }}
        />
        <StatCard
          title="Critical Alerts Active"
          value={loading ? "..." : stats.critical_alerts.toString()}
          description="Requires immediate action"
          icon={<DollarSign className="h-5 w-5 text-navy-900" />}
          trend={{ value: "Urgent advisory active", type: "down" }}
        />
        <StatCard
          title="High-Risk Cases Assigned"
          value={loading ? "..." : stats.high_alerts.toString()}
          description="Under investigation status"
          icon={<TrendingUp className="h-5 w-5 text-navy-900" />}
          trend={{ value: "Escalated to Cyber Cell", type: "up" }}
        />
      </div>

      {/* Main Grid: Heatmap Map Placeholder vs Regional stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Map Column */}
        <div className="lg:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-govgray-200 pb-3">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
              Geospatial Fraud Hotspot Map
            </h3>
            <Link href="/authority/map" className="text-[10px] font-bold text-saffron-600 hover:underline uppercase">
              View Extended Heatmap &rarr;
            </Link>
          </div>

          {/* Visual Map Simulator */}
          <div className="bg-govgray-100 border border-govgray-200 rounded-lg h-96 relative flex items-center justify-center overflow-hidden">
            {/* Simulated Map Background grids */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
            
            {/* Outline Emulated India Map Shapes */}
            <div className="border-2 border-dashed border-govgray-300 rounded-full h-80 w-64 opacity-50 flex items-center justify-center flex-col">
              <span className="text-[10px] text-govgray-600 uppercase font-bold tracking-widest">MAP AREA SKELETON</span>
            </div>

            {/* Hotspots markers overlay */}
            <div className="absolute top-1/4 left-1/2 flex items-center gap-1 bg-red-100 border border-red-300 text-red-800 text-[9px] font-bold px-2 py-0.5 rounded shadow">
              <span className="h-2 w-2 bg-red-600 rounded-full animate-ping"></span>
              Noida Sec 62: Critical
            </div>

            <div className="absolute top-1/3 left-[40%] flex items-center gap-1 bg-red-100 border border-red-300 text-red-800 text-[9px] font-bold px-2 py-0.5 rounded shadow">
              <span className="h-2 w-2 bg-red-600 rounded-full animate-ping"></span>
              Jamtara: Critical
            </div>

            <div className="absolute top-[45%] left-[58%] flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded shadow">
              <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
              Gurugram: High
            </div>

            <div className="absolute bottom-1/4 left-[35%] flex items-center gap-1 bg-blue-100 border border-blue-300 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded shadow">
              <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
              Pune: Medium
            </div>

            <div className="absolute bottom-12 right-12 bg-white border border-govgray-200 p-2.5 rounded text-[10px] font-semibold text-navy-900 flex flex-col gap-1 shadow-sm z-10">
              <p className="font-bold border-b border-govgray-200 pb-1 mb-1">LEGEND</p>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-red-600 rounded-full"></span>
                <span>Critical Spike (&gt;100 cases/24h)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-amber-500 rounded-full"></span>
                <span>High Spikes (50-100 cases)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-blue-500 rounded-full"></span>
                <span>Moderate Activity (&lt;50 cases)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspots list Column */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-3">
            Active Scam Categories ({stats.categories.length})
          </h3>

          <div className="flex flex-col gap-3">
            {stats.categories.map((cat, idx) => (
              <div key={idx} className="border border-govgray-200 rounded p-3 bg-govgray-50/50 flex flex-col gap-1 hover:border-navy-900 transition-colors">
                <span className="text-xs font-bold text-navy-900 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
                  {cat}
                </span>
                <span className="text-[10px] text-govgray-600 font-semibold mt-1">
                  Active monitoring campaign configured
                </span>
              </div>
            ))}
            {stats.categories.length === 0 && (
              <p className="text-xs text-govgray-600">No active categories scanned.</p>
            )}
          </div>
        </div>
      </div>

      {/* Case queue snippet */}
      <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center border-b border-govgray-200 pb-3">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
            Recently Escalated Cyber Incidents
          </h3>
          <Link href="/authority/cases" className="text-xs font-bold text-saffron-600 hover:underline">
            Manage Cases &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-govgray-200 text-left text-xs font-medium text-govgray-900 border border-govgray-200">
            <thead className="bg-govgray-50 text-[10px] font-bold uppercase tracking-wider text-govgray-600">
              <tr>
                <th className="px-4 py-3 border-b border-govgray-200">Date/Time</th>
                <th className="px-4 py-3 border-b border-govgray-200">Case ID</th>
                <th className="px-4 py-3 border-b border-govgray-200">Type</th>
                <th className="px-4 py-3 border-b border-govgray-200">Reporter</th>
                <th className="px-4 py-3 border-b border-govgray-200 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-govgray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">19-07-2026 10:45 AM</td>
                <td className="px-4 py-3 whitespace-nowrap font-bold text-navy-900">alt-001</td>
                <td className="px-4 py-3 whitespace-nowrap font-semibold">Digital Arrest Scam</td>
                <td className="px-4 py-3 whitespace-nowrap">Citizen Audit Report</td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Link href="/authority/cases/alt-001" className="bg-navy-900 hover:bg-navy-800 text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1 ml-auto">
                    <Eye className="h-3 w-3" /> Audit Case
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">19-07-2026 09:15 AM</td>
                <td className="px-4 py-3 whitespace-nowrap font-bold text-navy-900">alt-002</td>
                <td className="px-4 py-3 whitespace-nowrap font-semibold">Fake KYC Scam</td>
                <td className="px-4 py-3 whitespace-nowrap">Citizen Audit Report</td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Link href="/authority/cases/alt-002" className="bg-navy-900 hover:bg-navy-800 text-white text-[10px] font-bold px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1 ml-auto">
                    <Eye className="h-3 w-3" /> Audit Case
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
