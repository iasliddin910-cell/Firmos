import { getBrainState } from "@/lib/company-brain";

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">{children}</div>
    </section>
  );
};

export default function HomePage() {
  const brain = getBrainState();

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">FIRMOS GOVERNANCE LAYER</p>
          <h1>Company Brain</h1>
          <p className="hero-subtitle">
            Decision clarity across Sales, Marketing, Cashflow, Tax, Compliance, and Cybersecurity.
          </p>
          <div className="pill-row">
            <span>UZ/RU/EN</span>
            <span>Human Final Decision</span>
            <span>Simulation → Pilot → Result</span>
          </div>
        </div>
        <div className="orb-wrap">
          <div className="orb" />
          <div className="orb-shadow" />
        </div>
      </header>

      <div className="grid">
        <SectionCard title="Agent Health">
          <ul className="stack">
            {brain.agentStatus.map((agent) => (
              <li key={agent.agent}>
                <div className="row">
                  <strong>{agent.agent}</strong>
                  <span className={`badge badge-${agent.status.toLowerCase()}`}>
                    {agent.status}
                  </span>
                </div>
                <div className="meta">
                  <span>{agent.mode}</span>
                  <span>Signals: {agent.activeSignals}</span>
                  <span>Last sync: {new Date(agent.lastSyncAt).toLocaleTimeString()}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Priority Queue">
          <ul className="stack">
            {brain.priorityQueue.slice(0, 4).map((item) => (
              <li key={item.itemId}>
                <div className="row">
                  <strong>{item.summary}</strong>
                  <span className={`badge badge-${item.riskLevel.toLowerCase()}`}>
                    {item.riskLevel}
                  </span>
                </div>
                <div className="meta">
                  <span>{item.category}</span>
                  <span>{item.scope}</span>
                  <span>Impact: {item.moneyImpact.toLocaleString()} so‘m</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Conflict Report">
          {brain.conflicts.length === 0 ? (
            <p className="muted">No conflicts detected. Governance path is clean.</p>
          ) : (
            <ul className="stack">
              {brain.conflicts.map((conflict) => (
                <li key={conflict.conflictId}>
                  <strong>{conflict.conflictReason}</strong>
                  <div className="meta">
                    <span>Agents: {conflict.agentsInvolved.join(", ")}</span>
                    <span>Risk: {conflict.riskLevel}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Integrations Ready">
          <ul className="stack">
            {brain.integrationCatalog.map((integration) => (
              <li key={integration.id}>
                <div className="row">
                  <strong>{integration.name}</strong>
                  <span className={`badge badge-${integration.status.toLowerCase()}`}>
                    {integration.status}
                  </span>
                </div>
                <div className="meta">
                  <span>{integration.type}</span>
                  {integration.notes ? <span>{integration.notes}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="AI Council Dossier">
          <ul className="stack">
            {brain.councilDossiers.slice(0, 2).map((dossier) => (
              <li key={dossier.proposalId}>
                <strong>{dossier.proposalSummary}</strong>
                <div className="meta">
                  <span>Options: {dossier.decisionOptions.length}</span>
                  <span>Requires pilot: {dossier.requiredPilot ? "Yes" : "No"}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Decision Requests">
          <ul className="stack">
            {brain.decisionRequests.slice(0, 3).map((request) => (
              <li key={request.requestId}>
                <strong>{request.summary}</strong>
                <div className="meta">
                  <span>Options: {request.options.join(" / ")}</span>
                  <span>Risk flags: {request.riskFlags.join(", ") || "None"}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Governance Protocol">
          <ul className="stack">
            {brain.protocolChecklist.map((check) => (
              <li key={check.id}>
                <div className="row">
                  <strong>{check.rule}</strong>
                  <span className={`badge badge-${check.status.toLowerCase()}`}>
                    {check.status}
                  </span>
                </div>
                {check.detail ? <div className="meta">{check.detail}</div> : null}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Pilot Plans">
          <ul className="stack">
            {brain.pilotPlans.slice(0, 2).map((plan) => (
              <li key={plan.proposalId}>
                <strong>Proposal {plan.proposalId}</strong>
                <div className="meta">
                  <span>Duration: {plan.durationDays} days</span>
                  <span>Scope: {plan.scopeDefinition}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Decision Memory">
          <ul className="stack">
            {brain.memory.map((entry) => (
              <li key={entry.proposalId}>
                <strong>{entry.action}</strong>
                <div className="meta">
                  <span>Status: {entry.status}</span>
                  <span>Expected: {entry.expectedEffect}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Pricing Plans">
          <ul className="stack">
            {brain.pricingTiers.map((tier) => (
              <li key={tier.id}>
                <div className="row">
                  <strong>{tier.name}</strong>
                  <span className="badge badge-low">{tier.price}</span>
                </div>
                <div className="meta">{tier.highlights.join(" • ")}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </main>
  );
}
