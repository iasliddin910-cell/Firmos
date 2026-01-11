import { AgentSource, EvidenceRef, LocalizedText, PriorityCategory, Severity } from "@/lib/shared/types";

export type BaseSignal = {
  id: string;
  source: AgentSource;
  createdAt: string;
  summary: LocalizedText;
  category: PriorityCategory;
  moneyImpact: number;
  riskLevel: Severity;
  urgency: number;
  scope: string;
  evidence?: EvidenceRef[];
};

export type SalesSignal = BaseSignal & {
  subtype:
    | "ORDER_RISK"
    | "LOST_PROFIT"
    | "FUNNEL_LEAK"
    | "CHANNEL_LOSS"
    | "COMPLAINT_IMPACT"
    | "PROFIT_OPPORTUNITY"
    | "TOP_CUSTOMER_SEGMENT"
    | "TIME_PATTERN";
};

export type CashflowSignal = BaseSignal & {
  subtype:
    | "RUNWAY"
    | "DAILY_STRESS"
    | "EXPENSE_DRAIN"
    | "HIDDEN_LEAK"
    | "EXPENSE_WEIGHT"
    | "DECISION_IMPACT"
    | "FORWARD_RISK";
};

export type MarketingSignal = BaseSignal & {
  subtype:
    | "REAL_ROI"
    | "HARMFUL_CAMPAIGN"
    | "FAKE_LEAD"
    | "LANDING_ISSUE"
    | "PAYING_AUDIENCE"
    | "BUDGET_SIM"
    | "AD_FATIGUE";
};

export type TaxSignal = BaseSignal & {
  subtype:
    | "REGIME_CHECK"
    | "PENALTY_RISK"
    | "VAT_OBLIGATION"
    | "OVERPAYMENT"
    | "DEDUCTIBILITY"
    | "VAT_EXIT_SIM"
    | "TAX_WHATIF";
};

export type ComplianceSignal = BaseSignal & {
  subtype:
    | "LAW_CHANGE"
    | "DEADLINE"
    | "PENALTY"
    | "ACTIVITY_PERMISSION"
    | "CONTRACT_RISK"
    | "PROPOSAL_CHECK"
    | "RISK_SCORE";
};

export type CyberSignal = BaseSignal & {
  subtype:
    | "ANOMALOUS_LOGIN"
    | "BOT_ACTIVITY"
    | "INFRA_HEALTH"
    | "DOWNTIME_IMPACT"
    | "DATA_LEAK"
    | "PAYMENT_ABUSE"
    | "SECURITY_SCORE"
    | "RECURRING_THREAT"
    | "EMERGENCY_SHUTDOWN";
};

export type AgentSignal =
  | SalesSignal
  | CashflowSignal
  | MarketingSignal
  | TaxSignal
  | ComplianceSignal
  | CyberSignal;
