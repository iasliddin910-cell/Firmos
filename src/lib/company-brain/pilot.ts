import { AgentSignal } from "@/lib/agents/types";
import { PilotPlan } from "@/lib/company-brain/models";

export const buildPilotPlans = (signals: AgentSignal[]): PilotPlan[] => {
  return signals.map((signal) => ({
    proposalId: signal.id,
    durationDays: signal.riskLevel === "HIGH" || signal.riskLevel === "CRITICAL" ? 7 : 14,
    scopeDefinition: `${signal.scope} (20% segment)`,
    successMetrics: ["profit", "conversion", "complaints", "risk_score"],
    exitConditions: ["stop_loss_trigger", "compliance_block"],
    monitoringAgents: ["SALES", "CASHFLOW", "COMPLIANCE", "CYBERSECURITY"]
  }));
};
