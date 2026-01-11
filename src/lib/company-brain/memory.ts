import { DecisionMemoryEntry } from "@/lib/company-brain/models";
import { AgentSource, DecisionStatus } from "@/lib/shared/types";

export const createMemoryEntry = (
  proposalId: string,
  agentOrigin: AgentSource,
  action: string,
  expectedEffect: string,
  status: DecisionStatus = "PENDING"
): DecisionMemoryEntry => ({
  proposalId,
  agentOrigin,
  action,
  expectedEffect,
  status,
  timestamp: new Date().toISOString()
});
