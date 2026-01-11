import { AgentSignal } from "@/lib/agents/types";
import { buildCouncilDossiers } from "@/lib/company-brain/council";
import { detectConflicts } from "@/lib/company-brain/conflict-engine";
import { createMemoryEntry } from "@/lib/company-brain/memory";
import { BrainState } from "@/lib/company-brain/models";
import { buildPilotPlans } from "@/lib/company-brain/pilot";
import { buildPriorityQueue } from "@/lib/company-brain/priority-engine";
import { validateProposalReadiness } from "@/lib/company-brain/policies";

const initialSignals: AgentSignal[] = [
  {
    id: "sig-cyber-001",
    source: "CYBERSECURITY",
    createdAt: new Date().toISOString(),
    summary: {
      uz: "Data leak xavfi yuqori, katta eksport aniqlandi.",
      ru: "Высокий риск утечки данных, замечен массовый экспорт.",
      en: "High data leak risk detected with bulk export activity."
    },
    category: "RISK",
    moneyImpact: 12000000,
    riskLevel: "HIGH",
    urgency: 0.9,
    scope: "Core DB",
    evidence: [{ refId: "log-771", refType: "log" }],
    subtype: "DATA_LEAK"
  },
  {
    id: "sig-sales-001",
    source: "SALES",
    createdAt: new Date().toISOString(),
    summary: {
      uz: "Checkout bosqichida yo'qotishlar ko'paydi.",
      ru: "Рост потерь на этапе checkout.",
      en: "Checkout stage leakage increased."
    },
    category: "LOSS",
    moneyImpact: 8900000,
    riskLevel: "MED",
    urgency: 0.7,
    scope: "Checkout",
    evidence: [{ refId: "order-332", refType: "order" }],
    subtype: "FUNNEL_LEAK"
  },
  {
    id: "sig-cash-001",
    source: "CASHFLOW",
    createdAt: new Date().toISOString(),
    summary: {
      uz: "Runway 45 kun, pul bosimi kuchaymoqda.",
      ru: "Runway 45 дней, давление на кэш усиливается.",
      en: "Runway at 45 days with increasing cash pressure."
    },
    category: "RISK",
    moneyImpact: 15000000,
    riskLevel: "HIGH",
    urgency: 0.85,
    scope: "Company-wide",
    evidence: [{ refId: "bank-112", refType: "other" }],
    subtype: "RUNWAY"
  }
];

let state: BrainState = {
  signals: initialSignals,
  priorityQueue: buildPriorityQueue(initialSignals),
  conflicts: detectConflicts(initialSignals),
  councilDossiers: buildCouncilDossiers(initialSignals),
  decisionRequests: initialSignals.map((signal) => ({
    requestId: `req-${signal.id}`,
    summary: signal.summary.en,
    options: ["Option A", "Option B", "Option C"],
    requiredKnowledge: ["verified_evidence", "compliance_ok"],
    riskFlags: validateProposalReadiness(signal).missing
  })),
  pilotPlans: buildPilotPlans(initialSignals),
  memory: [
    createMemoryEntry("sig-sales-001", "SALES", "Run checkout pilot", "Reduce leakage by 10%", "PENDING")
  ],
  knowledgeBase: [],
  agentStatus: [
    {
      agent: "SALES",
      mode: "AUTONOMOUS",
      status: "MONITORING",
      lastSyncAt: new Date().toISOString(),
      activeSignals: 4
    },
    {
      agent: "MARKETING",
      mode: "AUTONOMOUS",
      status: "MONITORING",
      lastSyncAt: new Date().toISOString(),
      activeSignals: 3
    },
    {
      agent: "CASHFLOW",
      mode: "AUTONOMOUS",
      status: "READY",
      lastSyncAt: new Date().toISOString(),
      activeSignals: 2
    },
    {
      agent: "TAX",
      mode: "CHAT_ASSISTED",
      status: "READY",
      lastSyncAt: new Date().toISOString(),
      activeSignals: 1
    },
    {
      agent: "COMPLIANCE",
      mode: "AUTONOMOUS",
      status: "MONITORING",
      lastSyncAt: new Date().toISOString(),
      activeSignals: 2
    },
    {
      agent: "CYBERSECURITY",
      mode: "AUTONOMOUS",
      status: "DEGRADED",
      lastSyncAt: new Date().toISOString(),
      activeSignals: 5
    }
  ],
  integrationCatalog: [
    { id: "bank-uz-001", type: "BANK", name: "Xalq Bank", status: "AVAILABLE" },
    { id: "bank-uz-002", type: "BANK", name: "Asaka Bank", status: "AVAILABLE" },
    { id: "bank-uz-003", type: "BANK", name: "Ipak Yo'li Bank", status: "AVAILABLE" },
    { id: "bank-uz-004", type: "BANK", name: "Kapital Bank", status: "AVAILABLE" },
    { id: "pay-uz-001", type: "PAYMENT", name: "Click", status: "AVAILABLE" },
    { id: "pay-uz-002", type: "PAYMENT", name: "Payme", status: "AVAILABLE" },
    { id: "pay-uz-003", type: "PAYMENT", name: "Apelsin", status: "AVAILABLE" },
    { id: "pay-uz-004", type: "PAYMENT", name: "Stripe", status: "PLANNED" },
    { id: "market-uz-001", type: "MARKETPLACE", name: "Uzum", status: "AVAILABLE" },
    { id: "market-uz-002", type: "MARKETPLACE", name: "Wildberries", status: "AVAILABLE" },
    { id: "market-uz-003", type: "MARKETPLACE", name: "Ozon", status: "PLANNED" },
    { id: "analytics-001", type: "ANALYTICS", name: "GA4", status: "AVAILABLE" },
    { id: "logs-001", type: "LOGS", name: "ELK / OpenSearch", status: "PLANNED" }
  ],
  protocolChecklist: [
    {
      id: "protocol-001",
      rule: "Simulation → Pilot → Result",
      status: "PASS",
      detail: "Pilot required for opportunities and high risk."
    },
    {
      id: "protocol-002",
      rule: "Human final decision required",
      status: "PASS",
      detail: "All approvals routed through Decision Requests."
    },
    {
      id: "protocol-003",
      rule: "Compliance & cybersecurity checks mandatory",
      status: "PENDING",
      detail: "Awaiting legal review on campaign change."
    }
  ],
  pricingTiers: [
    {
      id: "tier-free",
      name: "Free Trial",
      price: "7 days",
      highlights: ["Full Sales/Marketing/Cashflow", "Limited Company Brain", "Daily alerts"]
    },
    {
      id: "tier-start",
      name: "Start",
      price: "$39 / mo",
      highlights: ["1 bank", "1 Telegram bot", "Email alerts"]
    },
    {
      id: "tier-grow",
      name: "Grow",
      price: "$79 / mo",
      highlights: ["Tax + Compliance", "3 banks", "Dashboard alerts"]
    },
    {
      id: "tier-pro",
      name: "Pro",
      price: "$149 / mo",
      highlights: ["Cybersecurity realtime", "Unlimited banks", "Telegram alerts"]
    }
  ]
};

export const getBrainState = () => state;

export const ingestSignal = (signal: AgentSignal) => {
  state = {
    ...state,
    signals: [signal, ...state.signals]
  };
  state.priorityQueue = buildPriorityQueue(state.signals);
  state.conflicts = detectConflicts(state.signals);
  state.councilDossiers = buildCouncilDossiers(state.signals);
  state.pilotPlans = buildPilotPlans(state.signals);
};
