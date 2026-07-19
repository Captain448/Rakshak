import { ScamAlert, FraudReport, DashboardMetric, InvestigationCase, FraudNode, FraudEdge } from "./types";

export const MOCK_SCAM_ALERTS: ScamAlert[] = [
  {
    id: "alert-1",
    title: "Critical Surge: WhatsApp 'Digital Arrest' Calls Flagged in Delhi NCR",
    content: "Fraudsters posing as CBI/Customs officials are coercing citizens into continuous video sessions and demanding deposits. Police forces do not conduct virtual arrests.",
    state: "Delhi",
    district: "New Delhi",
    date: "2026-07-19",
    risk: "CRITICAL",
    advisory: "Immediately terminate calls from unknown numbers claiming customs holds. Do not transfer funds for 'verification'.",
    scamVectors: ["WhatsApp Video Calls", "Fake CBI warrant PDF", "Official Logo Impersonation"]
  },
  {
    id: "alert-2",
    title: "MHA Alert: Bank KYC Expiry Phishing SMS Campaign",
    content: "Scam links delivered via SMS: 'Your NetBanking is disabled. Update PAN card at verification-portal.net'. Links steal login pins.",
    state: "Jharkhand",
    district: "Jamtara",
    date: "2026-07-18",
    risk: "HIGH",
    advisory: "Banks never solicit credentials, PAN, or passwords over SMS domains. Access banks strictly through official banking apps.",
    scamVectors: ["SMS text link", "Lookalike landing pages", "KYC block warning"]
  },
  {
    id: "alert-3",
    title: "Spike in Gurgaon: Fake Police Verification Requests",
    content: "Victims contacted by individuals claiming to be Gurgaon Local Police officers requesting payments to resolve pending criminal complaints or passport logs.",
    state: "Haryana",
    district: "Gurugram",
    date: "2026-07-18",
    risk: "CRITICAL",
    advisory: "Verify credentials through official state police department desk numbers. Police do not collect fines/settlements via UPI.",
    scamVectors: ["VoIP Spoofed Phone Calls", "Fake Police ID cards", "UPI payment link"]
  },
  {
    id: "alert-4",
    title: "KBC Lottery Winning Fraud Circular",
    content: "Citizens receiving WhatsApp messages stating they won a ₹25 Lakh KBC lottery. Scammers instruct them to deposit custom processing fees to release winnings.",
    state: "Bihar",
    district: "Patna",
    date: "2026-07-17",
    risk: "MEDIUM",
    advisory: "Legitimate lotteries do not ask for advance taxes. Never transfer funds to secure prize rewards.",
    scamVectors: ["WhatsApp Audio", "Fake KBC Banner", "Advance Tax Deposit"]
  },
  {
    id: "alert-5",
    title: "UPI Collect Request Fraud",
    content: "Suspects sending 'Collect Money' requests with notes: 'Click to receive ₹5000 cashback from NPCI'. Clicking and entering PIN sends money to the fraudster.",
    state: "Maharashtra",
    district: "Pune",
    date: "2026-07-16",
    risk: "HIGH",
    advisory: "Entering your UPI PIN is ONLY for paying/sending money. PIN is never required to receive money.",
    scamVectors: ["UPI Collect Request", "Cashback decoy banners", "NPCI styling clone"]
  }
];

export const MOCK_FRAUD_REPORTS: FraudReport[] = [
  {
    id: "MHA-2026-829402",
    reporterName: "Amit Sinha",
    reporterPhone: "+91 91234 56780",
    scamType: "Bank KYC Scam",
    description: "Received text claiming SBI account was suspended. Entered credentials on 'http://sbi-kyc-verify.in', resulting in unauthorized transfer of ₹85,000.",
    suspectPhone: "+91 91112 22334",
    suspectUpi: "verify-support@okicici",
    status: "PENDING",
    severityScore: 82,
    district: "Gurugram",
    state: "Haryana",
    createdAt: "2026-07-19T09:30:00Z"
  },
  {
    id: "MHA-2026-482019",
    reporterName: "Rajesh Kumar",
    reporterPhone: "+91 98765 43210",
    scamType: "Digital Arrest",
    description: "Coerced over a 4-hour WhatsApp video call by individuals posing as CBI Mumbai. Transferred ₹5,00,000 to 'verify identity'.",
    suspectPhone: "+91 99988 87776",
    suspectUpi: "cbi-verification@oksbi",
    status: "UNDER_INVESTIGATION",
    severityScore: 95,
    district: "Gautam Buddha Nagar (Noida)",
    state: "Uttar Pradesh",
    createdAt: "2026-07-19T10:45:00Z"
  },
  {
    id: "MHA-2026-302948",
    reporterName: "Sunita Roy",
    reporterPhone: "+91 93344 55667",
    scamType: "Part-Time Task Scam",
    description: "Added to Telegram group offering YouTube likes. Lost ₹12,00,000 in VIP deposit levels before the admins blocked contact.",
    suspectPhone: "+91 94455 66778",
    suspectUpi: "task-rewards@paytm",
    status: "RESOLVED",
    severityScore: 68,
    district: "Kolkata",
    state: "West Bengal",
    createdAt: "2026-07-18T14:15:00Z"
  }
];

export const MOCK_DASHBOARD_METRICS: DashboardMetric = {
  activeCases: 14829,
  scamsPreventedValueInr: 1428400000, // ₹142.84 Cr
  alertTriggerCount24h: 87,
  highRiskHotspots: [
    { district: "Jamtara", state: "Jharkhand", level: "CRITICAL" },
    { district: "Nuh", state: "Haryana", level: "HIGH" },
    { district: "Gautam Buddha Nagar (Noida)", state: "Uttar Pradesh", level: "CRITICAL" },
    { district: "South Delhi", state: "Delhi", level: "MEDIUM" },
    { district: "Pune", state: "Maharashtra", level: "MEDIUM" }
  ]
};

export const MOCK_INVESTIGATION_CASES: InvestigationCase[] = [
  {
    id: "MHA-2026-482019",
    date: "19-07-2026",
    reporter: "Rajesh Kumar",
    phone: "+91 98765 43210",
    scamType: "Digital Arrest",
    suspectPhone: "+91 99988 87776",
    suspectUpi: "cbi-verification@oksbi",
    status: "UNDER_INVESTIGATION",
    severity: "CRITICAL",
    description: "Received WhatsApp video call from suspects posing as CBI Mumbai. Serviced a fake warrant demanding ₹5,00,000.",
    evidenceFile: "cbi_fake_warrant_noida.pdf"
  },
  {
    id: "MHA-2026-829402",
    date: "19-07-2026",
    reporter: "Amit Sinha",
    phone: "+91 91234 56780",
    scamType: "UPI Fraud",
    suspectPhone: "+91 91112 22334",
    suspectUpi: "verify-support@okicici",
    status: "PENDING",
    severity: "HIGH",
    description: "Coerced into updating PAN card on fake bank portal, leading to ₹85,000 transaction to suspect UPI handle.",
    evidenceFile: "bank_sms_screenshot.png"
  },
  {
    id: "MHA-2026-302948",
    date: "18-07-2026",
    reporter: "Sunita Roy",
    phone: "+91 93344 55667",
    scamType: "Part-Time Task",
    suspectPhone: "+91 94455 66778",
    suspectUpi: "task-rewards@paytm",
    status: "RESOLVED",
    severity: "MEDIUM",
    description: "Offered daily tasks on Telegram. Defrauded of ₹12,00,000 deposit before tasks page disappeared.",
    evidenceFile: "telegram_chat_history.pdf"
  }
];

export const MOCK_GRAPH_NODES: FraudNode[] = [
  { id: "n-s1", label: "Suspect", properties: { value: "+91 99988 87776", risk: "CRITICAL" } },
  { id: "n-u1", label: "UPI", properties: { value: "cbi-verification@oksbi", risk: "CRITICAL", status: "Active Mule" } },
  { id: "n-a1", label: "Account", properties: { value: "SBI ...12049", risk: "HIGH", status: "Flagged Account", bank: "State Bank of India", number: "30491029492" } },
  { id: "n-c1", label: "Citizen", properties: { value: "Rajesh Kumar (Victim)", risk: "LOW", status: "Verified Account" } },
  { id: "n-ip1", label: "IPAddress", properties: { value: "192.168.1.14 (Gurgaon)", risk: "MEDIUM", status: "Active Session" } }
];

export const MOCK_GRAPH_EDGES: FraudEdge[] = [
  { id: "e-1", source: "n-s1", target: "n-u1", type: "ASSOCIATED_WITH", properties: { weight: 5 } },
  { id: "e-2", source: "n-c1", target: "n-u1", type: "TRANSFER_TO", properties: { amount: 500000, timestamp: "2026-07-19" } },
  { id: "e-3", source: "n-u1", target: "n-a1", type: "TRANSFER_TO", properties: { amount: 480000, timestamp: "2026-07-19" } },
  { id: "e-4", source: "n-s1", target: "n-ip1", type: "USED_IP", properties: { timestamp: "2026-07-19" } }
];
