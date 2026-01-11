import { AgentSignal } from "@/lib/agents/types";
import { CouncilDossier } from "@/lib/company-brain/models";
import { AgentSource } from "@/lib/shared/types";

const defaultReview = (agent: AgentSource): string => {
  switch (agent) {
    case "MARKETING":
      return "Impact on conversion and audience trust.";
    case "CASHFLOW":
      return "Impact on runway and liquidity.";
    case "TAX":
      return "Tax consequences and legal basis.";
    case "COMPLIANCE":
      return "Legal compliance validation required.";
    case "CYBERSECURITY":
      return "Security risk validation required.";
    default:
      return "Business impact review required.";
  }
};

export const buildCouncilDossiers = (signals: AgentSignal[]): CouncilDossier[] => {
  return signals.map((signal) => ({
    proposalId: signal.id,
    proposalSummary: signal.summary.en,
    agentReviews: [
      {
        agent: "MARKETING",
        verdict: "CONCERN",
        risk: signal.riskLevel,
        moneyImpact: signal.moneyImpact,
        notes: defaultReview("MARKETING")
      },
      {
        agent: "CASHFLOW",
        verdict: "CONCERN",
        risk: signal.riskLevel,
        moneyImpact: signal.moneyImpact,
        notes: defaultReview("CASHFLOW")
      }
    ],
    conflictsDetected: [],
    decisionOptions: [
      "Option A: Proceed with simulation",
      "Option B: Run limited pilot",
      "Option C: Hold pending more data"
    ],
    requiredPilot: signal.category === "OPPORTUNITY" || signal.riskLevel === "HIGH"
  }));
};
