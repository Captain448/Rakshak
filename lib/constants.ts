import { AlertSeverity } from "./types";

export const COLORS = {
  NAVY: "#0b2e59",
  SAFFRON: "#ff9933",
  GRAY_BORDER: "#d1d5db",
  TEXT_MAIN: "#111827",
};

export const RISK_LEVELS: { [key: string]: AlertSeverity } = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
};

export const SCAM_CATEGORIES = [
  { id: "digital_arrest", label: "Digital Arrest Impersonation" },
  { id: "kyc_fraud", label: "Bank KYC Block / Update Scam" },
  { id: "upi_fraud", label: "UPI Transaction Fraud" },
  { id: "lottery_scam", label: "KBC / Lottery Winner Phishing" },
  { id: "police_verification", label: "Fake Police Verification / Customs Duty Call" },
  { id: "part_time_job", label: "Part-Time Task Offers (Telegram/WhatsApp)" },
];

export const ROUTE_PATHS = {
  LANDING: "/",
  ALERTS: "/alerts",
  CITIZEN_SHIELD: "/citizen",
  CITIZEN_ASSISTANT: "/citizen/assistant",
  CITIZEN_REPORT: "/citizen/report",
  AUTHORITY_DASHBOARD: "/authority",
  AUTHORITY_GRAPH: "/authority/graph",
  AUTHORITY_COUNTERFEIT: "/authority/counterfeit",
  AUTHORITY_CASES: "/authority/cases",
};

export const NAVBAR_LINKS = [
  { path: ROUTE_PATHS.LANDING, label: "Home" },
  { path: ROUTE_PATHS.CITIZEN_SHIELD, label: "Citizen Shield" },
  { path: ROUTE_PATHS.ALERTS, label: "Alerts Feed" },
  { path: ROUTE_PATHS.CITIZEN_ASSISTANT, label: "AI Assistant" },
  { path: ROUTE_PATHS.CITIZEN_REPORT, label: "Report Fraud", highlight: true },
];

export const AUTHORITY_MENU_LINKS = [
  { path: ROUTE_PATHS.AUTHORITY_DASHBOARD, label: "Command Center" },
  { path: ROUTE_PATHS.AUTHORITY_GRAPH, label: "Graph Explorer" },
  { path: ROUTE_PATHS.AUTHORITY_COUNTERFEIT, label: "Counterfeit Scanner" },
  { path: ROUTE_PATHS.AUTHORITY_CASES, label: "Cases View" },
];
