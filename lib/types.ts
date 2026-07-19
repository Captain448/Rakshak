export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface User {
  id: string;
  email: string;
  role: "citizen" | "authority_admin" | "police_officer" | "bank_analyst" | "telecom_operator";
  agencyName?: string;
  createdAt: string;
}

export interface ScamAlert {
  id: string;
  title: string;
  content: string;
  state: string;
  district: string;
  date: string;
  risk: AlertSeverity;
  advisory: string;
  scamVectors: string[];
}

export interface FraudReport {
  id: string;
  reporterName: string;
  reporterPhone: string;
  scamType: string;
  description: string;
  suspectPhone?: string;
  suspectUpi?: string;
  suspectBankAccount?: string;
  suspectBankIfsc?: string;
  status: "PENDING" | "UNDER_INVESTIGATION" | "RESOLVED";
  severityScore: number;
  district: string;
  state: string;
  createdAt: string;
}

export interface ThreatAssessment {
  verdict: AlertSeverity;
  score: number;
  confidence: number;
  analysisLogs: string[];
  matchedRiskVectors: string[];
  alertsTriggered: {
    alertId: string;
    recommendedAction: string;
    severity: AlertSeverity;
  }[];
}

export interface DashboardMetric {
  activeCases: number;
  scamsPreventedValueInr: number;
  alertTriggerCount24h: number;
  highRiskHotspots: {
    district: string;
    state: string;
    level: AlertSeverity;
  }[];
}

export interface InvestigationCase {
  id: string;
  date: string;
  reporter: string;
  phone: string;
  scamType: string;
  suspectPhone: string;
  suspectUpi: string;
  status: "PENDING" | "UNDER_INVESTIGATION" | "RESOLVED";
  severity: AlertSeverity;
  description: string;
  evidenceFile: string;
}

export interface FraudNode {
  id: string;
  label: "Suspect" | "Account" | "UPI" | "IPAddress" | "Device" | "Citizen";
  properties: {
    value: string;
    risk: AlertSeverity;
    status?: string;
    bank?: string;
    number?: string;
  };
}

export interface FraudEdge {
  id: string;
  source: string;
  target: string;
  type: "SCAMMED" | "TRANSFER_TO" | "USED_IP" | "LOGGED_ON" | "ASSOCIATED_WITH";
  properties: {
    amount?: number;
    timestamp?: string;
    weight?: number;
  };
}
