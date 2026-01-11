import { AgentSignal } from "@/lib/agents/types";

export const HARD_PROHIBITIONS = [
  "NO_EXECUTION",
  "NO_AUTO_IMPLEMENT",
  "HUMAN_FINAL_DECISION",
  "NO_ILLEGAL_FORWARDING",
  "NO_SECURITY_VIOLATION"
] as const;

export type ProposalReadiness = {
  ready: boolean;
  missing: string[];
};

export const validateProposalReadiness = (signal: AgentSignal): ProposalReadiness => {
  const missing: string[] = [];

  if (!signal.summary.uz || !signal.summary.ru || !signal.summary.en) {
    missing.push("WHY_IMPACT_REASONING");
  }

  if (!signal.scope) {
    missing.push("IMPACT_SCOPE");
  }

  if (!signal.evidence || signal.evidence.length === 0) {
    missing.push("EVIDENCE_OR_IMPACT_TRAIL");
  }

  return {
    ready: missing.length === 0,
    missing
  };
};
