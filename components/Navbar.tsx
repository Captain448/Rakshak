"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, AlertCircle, FileText, UserCheck, MessageSquare, Landmark } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isAuthority = pathname?.startsWith("/authority");

  return (
    <header className="w-full flex flex-col border-b border-govgray-200">
      {/* Tricolor Ribbon */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#ff9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      {/* Govt Header bar */}
      <div className="bg-navy-900 text-white py-2 px-6 flex justify-between items-center text-xs font-medium">
        <div className="flex items-center gap-2">
          <Landmark className="h-4.5 w-4.5 text-saffron-500" />
          <span>GOVERNMENT OF INDIA • NATIONAL CYBER DEFENSE INITIATIVE</span>
        </div>
        <div className="flex gap-4">
          <span className="opacity-80">Ministry of Home Affairs</span>
          <span>|</span>
          <span className="opacity-80">National Cyber Crime Reporting Portal</span>
        </div>
      </div>

      {/* Main Brand & Navigation bar */}
      <div className="bg-white py-4 px-6 flex justify-between items-center flex-wrap gap-4">
        {/* Branding */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-navy-900 p-2 rounded text-white">
            <Shield className="h-7 w-7 text-saffron-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-wide text-navy-900">RAKSHAK</span>
              <span className="text-saffron-500 font-extrabold text-sm">AI</span>
            </div>
            <p className="text-[10px] text-govgray-600 font-semibold tracking-wider uppercase">
              Digital Public Safety Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Portal Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {!isAuthority ? (
            <>
              <Link
                href="/"
                className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === "/" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                Home
              </Link>
              <Link
                href="/citizen"
                className={`px-3 py-2 rounded text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  pathname === "/citizen" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                <Shield className="h-4 w-4" />
                Citizen Shield
              </Link>
              <Link
                href="/alerts"
                className={`px-3 py-2 rounded text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  pathname === "/alerts" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                <AlertCircle className="h-4 w-4" />
                Alerts Feed
              </Link>
              <Link
                href="/citizen/assistant"
                className={`px-3 py-2 rounded text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  pathname === "/citizen/assistant" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                AI Assistant
              </Link>
              <Link
                href="/citizen/report"
                className={`px-3.5 py-2 rounded text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  pathname === "/citizen/report"
                    ? "bg-saffron-500 text-white"
                    : "bg-saffron-500 text-white hover:bg-saffron-600 shadow-sm"
                }`}
              >
                <FileText className="h-4 w-4" />
                Report Fraud
              </Link>
              <div className="w-px h-6 bg-govgray-200 mx-2"></div>
              <Link
                href="/authority"
                className="px-3.5 py-2 rounded border border-navy-900 text-navy-900 text-sm font-bold flex items-center gap-1.5 hover:bg-navy-900 hover:text-white transition-colors"
              >
                <UserCheck className="h-4 w-4" />
                Officer Portal
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/authority"
                className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === "/authority" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                Command Center
              </Link>
              <Link
                href="/authority/graph"
                className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === "/authority/graph" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                Graph Explorer
              </Link>
              <Link
                href="/authority/map"
                className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === "/authority/map" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                Heatmap
              </Link>
              <Link
                href="/authority/counterfeit"
                className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === "/authority/counterfeit" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                Counterfeit Scanner
              </Link>
              <Link
                href="/authority/cases"
                className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === "/authority/cases" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-govgray-100"
                }`}
              >
                Cases View
              </Link>
              <div className="w-px h-6 bg-govgray-200 mx-2"></div>
              <Link
                href="/"
                className="px-3.5 py-2 rounded border border-saffron-500 text-saffron-600 text-sm font-bold flex items-center gap-1.5 hover:bg-saffron-500 hover:text-white transition-colors"
              >
                Exit Portal
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
