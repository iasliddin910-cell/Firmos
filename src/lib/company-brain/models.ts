import { AgentSource, DecisionStatus, PriorityCategory, Severity } from "@/lib/shared/types";
import { AgentSignal } from "@/lib/agents/types";

export type PriorityItem = {
  itemId: string;
  sourceAgent: AgentSource;
  category: PriorityCategory;
  moneyImpact: number;
  riskLevel: Severity;
  urgency: number;
  scope: string;
  recommendedNextStep: "DECISION_REQUIRED" | "VERIFY" | "PILOT_REQUIRED";
  summary: string;
};

export type ConflictReport = {
  conflictId: string;
  agentsInvolved: AgentSource[];
  conflictReason: string;
  blockingConditions: string[];
  riskLevel: Severity;
  signalIds: string[];
};

export type CouncilReview = {
  agent: AgentSource;
  verdict: "APPROVE" | "CONCERN" | "REJECT";
  risk: Severity;
  moneyImpact: number;
  notes: string;
};

export type CouncilDossier = {
  proposalId: string;
  proposalSummary: string;
  agentReviews: CouncilReview[];
  conflictsDetected: string[];
  decisionOptions: string[];
  requiredPilot: boolean;
};

export type DecisionRequest = {
  requestId: string;
  summary: string;
  options: string[];
  requiredKnowledge: string[];
  riskFlags: string[];
};

export type PilotPlan = {
  proposalId: string;
  durationDays: 7 | 14 | 30;
  scopeDefinition: string;
  successMetrics: string[];
  exitConditions: string[];
  monitoringAgents: AgentSource[];
};

export type DecisionMemoryEntry = {
  proposalId: string;
  agentOrigin: AgentSource;
  action: string;
  expectedEffect: string;
  realEffect?: string;
  status: DecisionStatus;
  lesson?: string;
  confidenceAdjustment?: number;
  timestamp: string;
};

export type KnowledgeItem = {
  knowledgeId: string;
  sourceMeta: string;
  relevantAgents: AgentSource[];
  acceptedAt: string;
  reasoningSummary: string;
  auditTrail: string[];
};

export type BrainState = {
  signals: AgentSignal[];
  priorityQueue: PriorityItem[];
  conflicts: ConflictReport[];
  councilDossiers: CouncilDossier[];
  decisionRequests: DecisionRequest[];
  pilotPlans: PilotPlan[];
  memory: DecisionMemoryEntry[];
  knowledgeBase: KnowledgeItem[];
  agentStatus: AgentStatus[];
  integrationCatalog: IntegrationItem[];
  protocolChecklist: ProtocolCheck[];
  pricingTiers: PricingTier[];
};

export type AgentStatus = {
  agent: AgentSource;
  mode: "AUTONOMOUS" | "CHAT_ASSISTED";
  status: "READY" | "MONITORING" | "DEGRADED";
  lastSyncAt: string;
  activeSignals: number;
};

export type IntegrationItem = {
  id: string;
  type: "BANK" | "PAYMENT" | "MARKETPLACE" | "ANALYTICS" | "LOGS";
  name: string;
  status: "AVAILABLE" | "PLANNED";
  notes?: string;
};

export type ProtocolCheck = {
  id: string;
  rule: string;
  status: "PASS" | "BLOCKED" | "PENDING";
  detail?: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  highlights: string[];
};
