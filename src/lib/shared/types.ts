export type Severity = "LOW" | "MED" | "HIGH" | "CRITICAL";
export type PriorityCategory = "LOSS" | "RISK" | "OPPORTUNITY" | "DEADLINE";

export type AgentSource =
  | "SALES"
  | "MARKETING"
  | "CASHFLOW"
  | "TAX"
  | "COMPLIANCE"
  | "CYBERSECURITY";

export type DecisionStatus = "SUCCESS" | "FAILED_PILOT" | "PENDING";

export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export type EvidenceRef = {
  refId: string;
  refType: "order" | "complaint" | "session" | "document" | "log" | "other";
};
