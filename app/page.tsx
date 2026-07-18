import Link from "next/link";
import { ShieldCheck, FileText, AlertOctagon, HelpCircle, ArrowRight, Shield, BadgeAlert, TrendingUp, Landmark } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import WarningBanner from "@/components/ui/WarningBanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-2">
      {/* Active Warning Banner */}
      <WarningBanner
        type="critical"
        message="Active Scam wave detected: Fraudsters impersonating CBI, Customs, and ED officers are conducting fake 'Digital Arrests' via WhatsApp video calls. Government agencies NEVER conduct online trials or request funds. Disconnect immediately."
      />

      {/* Hero Section */}
      <div className="bg-navy-900 text-white rounded p-8 flex flex-col md:flex-row justify-between items-center gap-8 border-b-4 border-saffron-500">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Public Safety Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Protecting Citizens Against Online Cyber Fraud
          </h1>
          <p className="text-sm text-govgray-100 leading-relaxed">
            Verify caller handles, analyze suspicious court warrants, track coordinated money laundering rings, and protect your hard-earned savings. Powered by the National Public Safety Intelligence Initiative.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/citizen"
              className="bg-saffron-500 text-white hover:bg-saffron-600 font-bold px-5 py-3 rounded text-sm flex items-center gap-1.5 shadow transition-colors"
            >
              <ShieldCheck className="h-4.5 w-4.5" />
              Verify Suspicious Signal
            </Link>
            <Link
              href="/citizen/report"
              className="bg-white text-navy-900 hover:bg-govgray-100 font-bold px-5 py-3 rounded text-sm flex items-center gap-1.5 transition-colors border border-govgray-200"
            >
              <FileText className="h-4.5 w-4.5 text-red-600" />
              File Scam Incident
            </Link>
          </div>
        </div>

        {/* Emblems / Side Column */}
        <div className="bg-white/10 p-6 rounded border border-white/10 flex flex-col gap-3 max-w-xs w-full text-center items-center justify-center">
          <Shield className="h-14 w-14 text-saffron-500" />
          <h3 className="font-bold text-sm tracking-wide">RAKSHAK AI SECURITY</h3>
          <p className="text-[10px] text-govgray-200 leading-relaxed">
            Integrated multi-agent network performing real-time transaction, domain, and entity threat classifications.
          </p>
          <div className="w-full h-px bg-white/20 my-1"></div>
          <span className="text-[11px] font-bold text-saffron-500">Helpline Number: 1930</span>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="flex flex-col gap-4">
        <div className="border-l-4 border-navy-900 pl-3">
          <h3 className="text-lg font-extrabold text-navy-900 uppercase tracking-wide">
            National Cyber Fraud Metrics (FY 25-26)
          </h3>
          <p className="text-xs text-govgray-600">Verified status updates from centralized reporting databases</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Cyber Complaints"
            value="12,48,294"
            description="Logged through citizen portals & 1930"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: "+14.2% spike this month", type: "up" }}
          />
          <StatCard
            title="Prevented Financial Losses"
            value="₹142.84 Cr"
            description="Mule accounts frozen in real-time"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: "48,209 transactions intercepted", type: "down" }}
          />
          <StatCard
            title="Active Warning Advisories"
            value="142"
            description="District-specific threats live"
            icon={<BadgeAlert className="h-5 w-5" />}
            trend={{ value: "Noida and Gurugram hot-spots", type: "neutral" }}
          />
          <StatCard
            title="Resolved Scam Cartels"
            value="204"
            description="Fraud call centers neutralized"
            icon={<Landmark className="h-5 w-5" />}
            trend={{ value: "Collaborative police raids completed", type: "down" }}
          />
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* Card 1: Citizen Shield */}
        <div className="bg-white border border-govgray-200 rounded p-6 flex flex-col gap-4 hover:border-navy-900 transition-colors">
          <div className="bg-navy-900/5 text-navy-900 p-3 rounded w-fit">
            <ShieldCheck className="h-6 w-6 text-saffron-500" />
          </div>
          <div>
            <h4 className="font-extrabold text-md text-navy-900 mb-1">
              Verify Threats via Citizen Shield
            </h4>
            <p className="text-xs text-govgray-600 leading-relaxed">
              Instantly scan screenshot images, suspect phone numbers, UPI accounts, or text messages. The threat scanner identifies digital arrest indicators and matches contacts against the central list.
            </p>
          </div>
          <Link
            href="/citizen"
            className="text-xs font-bold text-navy-900 hover:text-saffron-500 inline-flex items-center gap-1 mt-auto w-fit"
          >
            Launch Citizen Shield <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Card 2: National Alert Feed */}
        <div className="bg-white border border-govgray-200 rounded p-6 flex flex-col gap-4 hover:border-navy-900 transition-colors">
          <div className="bg-navy-900/5 text-navy-900 p-3 rounded w-fit">
            <AlertOctagon className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h4 className="font-extrabold text-md text-navy-900 mb-1">
              National Incident Feed & Advisories
            </h4>
            <p className="text-xs text-govgray-600 leading-relaxed">
              Explore active alert bulletins mapped out state-wise and district-wise. Verify current scams circulating in your region, read automated safety guidelines, and view incident timelines.
            </p>
          </div>
          <Link
            href="/alerts"
            className="text-xs font-bold text-navy-900 hover:text-saffron-500 inline-flex items-center gap-1 mt-auto w-fit"
          >
            Open Alert Feed <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Card 3: AI Assistant */}
        <div className="bg-white border border-govgray-200 rounded p-6 flex flex-col gap-4 hover:border-navy-900 transition-colors">
          <div className="bg-navy-900/5 text-navy-900 p-3 rounded w-fit">
            <HelpCircle className="h-6 w-6 text-saffron-500" />
          </div>
          <div>
            <h4 className="font-extrabold text-md text-navy-900 mb-1">
              Ask AI Cyber Safety Assistant
            </h4>
            <p className="text-xs text-govgray-600 leading-relaxed">
              Have doubts about an interaction? Chat with our government safety intelligence bot. It answers cyber law queries, explains report filing sequences, and advises on recovery channels.
            </p>
          </div>
          <Link
            href="/citizen/assistant"
            className="text-xs font-bold text-navy-900 hover:text-saffron-500 inline-flex items-center gap-1 mt-auto w-fit"
          >
            Start Conversation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Card 4: Report Incident */}
        <div className="bg-white border border-govgray-200 rounded p-6 flex flex-col gap-4 hover:border-navy-900 transition-colors border-l-4 border-l-saffron-500">
          <div className="bg-saffron-100 p-3 rounded w-fit">
            <FileText className="h-6 w-6 text-saffron-600" />
          </div>
          <div>
            <h4 className="font-extrabold text-md text-navy-900 mb-1">
              Report Fraud Incident Immediately
            </h4>
            <p className="text-xs text-govgray-600 leading-relaxed">
              If you have lost money or been subjected to coercive extortion threats, file an official incident report. Submitting phone numbers and UPI IDs helps us flag and freeze accounts faster.
            </p>
          </div>
          <Link
            href="/citizen/report"
            className="text-xs font-bold text-saffron-600 hover:text-saffron-500 inline-flex items-center gap-1 mt-auto w-fit"
          >
            File Fraud Incident <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
