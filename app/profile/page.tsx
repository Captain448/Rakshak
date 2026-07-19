"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, FileText, Calendar, ShieldAlert } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name: string;
}

interface ReportData {
  id: string;
  text: string;
  timestamp: string;
  category: string;
  risk_level: string;
  alert_id?: string | null;
}

export default function UserProfileHub() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSessionStr = typeof window !== "undefined" ? localStorage.getItem("rakshak_user") : null;
    if (!userSessionStr) {
      router.push("/login");
      return;
    }

    const userObj = JSON.parse(userSessionStr);
    setProfile(userObj);

    const fetchUserReports = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/api/v1/auth/profile/${userObj.id}/reports`);
        if (!res.ok) throw new Error("Failed to load user reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserReports();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("rakshak_user");
    router.push("/");
    router.refresh();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  if (!profile) {
    return (
      <div className="text-center py-20 text-xs font-bold text-govgray-600">
        Authenticating citizen session...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-2 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4 flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <User className="h-7 w-7 text-saffron-500" />
          Citizen Profile Hub
        </h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 rounded text-xs font-bold transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Account Details */}
        <div className="md:col-span-1 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Account Profile
          </h3>
          
          <div className="flex flex-col gap-3 text-xs text-navy-900">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-govgray-600 uppercase">Full Name</span>
              <span className="font-bold text-base">{profile.full_name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-govgray-600 uppercase">Username</span>
              <span className="font-semibold">{profile.username}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-govgray-600 uppercase">Email Address</span>
              <span className="font-semibold">{profile.email}</span>
            </div>
            <div className="flex flex-col gap-1 border-t border-govgray-200 pt-3 mt-1">
              <span className="text-[10px] font-bold text-govgray-600 uppercase">Registry ID</span>
              <span className="font-bold font-mono bg-govgray-50 border border-govgray-200 px-2 py-1 rounded w-fit">
                {profile.id}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: User Scams history */}
        <div className="md:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm min-h-[380px]">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            My Reported Scam Incidents ({reports.length})
          </h3>

          {loading && (
            <div className="text-center py-12 text-xs font-bold text-govgray-600">
              Retrieving report logs...
            </div>
          )}

          {!loading && reports.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center items-center py-20 text-center text-govgray-600">
              <FileText className="h-10 w-10 text-govgray-300" />
              <span className="text-xs font-semibold">No Reported Incidents Found</span>
              <p className="text-[10px] max-w-[240px] leading-relaxed">
                You haven&apos;t reported any scams yet. Submissions verified via Citizen Shield will list here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4.5">
              {!loading && reports.map((rep) => (
                <div key={rep.id} className="border border-govgray-200 rounded p-4 bg-govgray-50/50 flex flex-col gap-2.5 hover:border-navy-900 transition-colors">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-govgray-600 bg-govgray-100 border border-govgray-200 px-2 py-0.5 rounded">
                      Report ID: {rep.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-govgray-600 flex items-center gap-0.5 font-semibold">
                        <Calendar className="h-3.5 w-3.5" /> {new Date(rep.timestamp).toLocaleString()}
                      </span>
                      <RiskBadge level={rep.risk_level} />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-navy-900 leading-relaxed bg-white border border-govgray-200 p-3 rounded">
                    &ldquo;{rep.text}&rdquo;
                  </p>
                  <div className="flex justify-between items-center text-[10px] font-bold text-navy-900 border-t border-govgray-100 pt-2">
                    <span>Category: {rep.category}</span>
                    {rep.alert_id && (
                      <span className="text-saffron-600 uppercase tracking-wide flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5" /> Linked Alert: {rep.alert_id}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
