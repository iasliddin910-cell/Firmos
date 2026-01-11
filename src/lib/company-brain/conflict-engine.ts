import { AgentSignal } from "@/lib/agents/types";
import { ConflictReport } from "@/lib/company-brain/models";

const isOpposingCategory = (a: AgentSignal, b: AgentSignal): boolean => {
  const opposingPairs: Array<[string, string]> = [
    ["LOSS", "OPPORTUNITY"],
    ["RISK", "OPPORTUNITY"],
    ["DEADLINE", "OPPORTUNITY"]
  ];
  return opposingPairs.some(
    ([left, right]) =>
      (a.category === left && b.category === right) ||
      (a.category === right && b.category === left)
  );
};

export const detectConflicts = (signals: AgentSignal[]): ConflictReport[] => {
  const conflicts: ConflictReport[] = [];

  for (let i = 0; i < signals.length; i += 1) {
    for (let j = i + 1; j < signals.length; j += 1) {
      const a = signals[i];
      const b = signals[j];

      if (a.scope !== b.scope) {
        continue;
      }

      if (isOpposingCategory(a, b) || a.source === "COMPLIANCE" || b.source === "COMPLIANCE") {
        conflicts.push({
          conflictId: `${a.id}-${b.id}`,
          agentsInvolved: [a.source, b.source],
          conflictReason: `Signals from ${a.source} and ${b.source} conflict on scope: ${a.scope}`,
          blockingConditions: [
            "COMPLIANCE_APPROVAL_REQUIRED",
            "COUNCIL_REVIEW_REQUIRED"
          ],
          riskLevel: a.riskLevel === "CRITICAL" || b.riskLevel === "CRITICAL" ? "CRITICAL" : "HIGH",
          signalIds: [a.id, b.id]
        });
      }
    }
  }

  return conflicts;
};
