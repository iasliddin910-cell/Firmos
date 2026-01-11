import { AgentSignal } from "@/lib/agents/types";
import { PriorityItem } from "@/lib/company-brain/models";

export const buildPriorityQueue = (signals: AgentSignal[]): PriorityItem[] => {
  const scored = signals.map((signal) => {
    const riskWeight =
      signal.riskLevel === "CRITICAL"
        ? 4
        : signal.riskLevel === "HIGH"
          ? 3
          : signal.riskLevel === "MED"
            ? 2
            : 1;
    const score = signal.moneyImpact * 0.6 + signal.urgency * 100 + riskWeight * 50;

    return {
      score,
      item: {
        itemId: signal.id,
        sourceAgent: signal.source,
        category: signal.category,
        moneyImpact: signal.moneyImpact,
        riskLevel: signal.riskLevel,
        urgency: signal.urgency,
        scope: signal.scope,
        recommendedNextStep: signal.riskLevel === "HIGH" || signal.riskLevel === "CRITICAL"
          ? "DECISION_REQUIRED"
          : signal.category === "OPPORTUNITY"
            ? "PILOT_REQUIRED"
            : "VERIFY",
        summary: signal.summary.en
      } satisfies PriorityItem
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
};
