import { KnowledgeItem } from "@/lib/company-brain/models";
import { AgentSource } from "@/lib/shared/types";

export type KnowledgeSubmission = {
  knowledgeId: string;
  sourceMeta: string;
  relevantAgents: AgentSource[];
  reasoningSummary: string;
  auditTrail: string[];
  passesFilters: boolean;
};

export const acceptKnowledge = (submission: KnowledgeSubmission): KnowledgeItem | null => {
  if (!submission.passesFilters) {
    return null;
  }

  return {
    knowledgeId: submission.knowledgeId,
    sourceMeta: submission.sourceMeta,
    relevantAgents: submission.relevantAgents,
    acceptedAt: new Date().toISOString(),
    reasoningSummary: submission.reasoningSummary,
    auditTrail: submission.auditTrail
  };
};
