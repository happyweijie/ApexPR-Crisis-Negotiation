import './CaseBriefModal.css';

// ── Full Role Sheet ─────────────────────────────────────────────────────────
const BRIEF_SECTIONS = [
  {
    icon: '🏢',
    title: 'Your Role',
    content: [
      { label: 'Position', value: 'Senior Account Director at Apex PR' },
      { label: 'Firm', value: 'Small PR agency, financially pressured. High ethical standards. Serves family-oriented brands.' },
    ],
  },
  {
    icon: '⚡',
    title: 'The Scenario',
    content: [
      { label: 'Client', value: 'Aria Lim — lifestyle influencer, 500k followers. Her brand is her livelihood.' },
      { label: 'Primary Crisis', value: 'Screenshots surfaced suggesting a relationship with a married public figure. If unmanaged, this threatens her entire career — follower trust, brand partnerships, and public identity.' },
      { label: 'Secondary Risk', value: 'A $250,000 skincare ambassadorship is currently in jeopardy. The brand expects a crisis strategy in 48 hours — but losing this deal is a symptom, not the core problem.' },
      { label: "What's Really at Stake", value: "Aria's long-term viability as a public figure. A poorly handled crisis could end her career permanently — no deal is worth that." },
      { label: 'Status', value: 'Your agency has NOT yet agreed to represent Aria. This meeting decides whether and how you help.' },
    ],
  },
  {
    icon: '🎯',
    title: 'Your Objectives',
    content: [
      { label: '🥇 Primary Goal', value: "Save Aria's career. Protect her reputation, rebuild public trust, and preserve her long-term livelihood as a public figure." },
      { label: '🥈 Secondary Goal', value: 'Where possible, secure or salvage the $250,000 skincare ambassadorship — but only if it does not compromise the primary goal.' },
      { label: '1. Vet the Client', value: "Assess whether Aria is truthful and whether her values align with Apex PR's ethics." },
      { label: '2. Fact-Find', value: "Understand the full picture: Are the screenshots real? Is there more damaging content? What is Aria's actual exposure?" },
      { label: '3. Negotiate Representation Terms', value: 'Define fees, scope of work, and conditions under which Apex PR will take on this high-risk case.' },
      { label: '4. Establish Safeguards', value: 'Negotiate disclosure requirements, media control protocols, and legal compliance to protect both Aria and the agency.' },
      { label: '5. Agree on Governance', value: 'Secure veto power and approval workflow for all public-facing messaging to ensure Apex PR can steer the narrative.' },
    ],
  },
  {
    icon: '⚖️',
    title: 'Constraints',
    content: [
      { label: 'Ethics First', value: 'Cannot condone illegal actions, deception, or evidence suppression.' },
      { label: 'Reputation Over Revenue', value: 'Agency credibility outweighs short-term fees.' },
      { label: 'Veto Power', value: 'Managing Partner can veto if family-oriented clients are at risk.' },
      { label: 'Requirement', value: 'Apex will only represent Aria if she agrees to full private disclosure.' },
    ],
  },
  {
    icon: '🔍',
    title: 'Critical Unknowns',
    content: [
      { value: 'Are the screenshots genuine?' },
      { value: 'Does more damaging evidence exist?' },
      { value: 'Will the skincare brand terminate the contract regardless of PR strategy?' },
    ],
  },
  {
    icon: '📝',
    title: 'Negotiation Scope',
    content: [
      { label: 'Career Strategy (Primary)', value: "What is the long-term plan to restore Aria's public image and career viability? This must be established before anything else." },
      { label: 'Skincare Deal (Secondary)', value: 'Determine whether the ambassadorship can be salvaged as part of the career recovery plan, or whether pursuing it would backfire.' },
      { label: 'Fees', value: 'Base retainers or performance incentives, reflecting the scope and risk of full career management.' },
      { label: 'Disclosure', value: 'Level and timing of information sharing — Aria must be fully transparent for career-level crisis management to succeed.' },
      { label: 'Control', value: 'Approval process for all public-facing messaging, including social media, interviews, and brand communications.' },
    ],
  },
  {
    icon: '💼',
    title: 'Financial Benchmarks',
    content: [
      { label: 'Market Standard', value: "Full-scope career crisis management for an influencer of Aria's tier typically starts at a $15,000 retainer — higher than a standard deal because you are managing her entire public identity." },
      { label: 'Agency Goal', value: "Apex PR aims for a 'Win-Win' structure. You have authority to trade a lower base fee for a higher performance bonus — ideally tied to measurable career outcomes (e.g., follower recovery, positive sentiment index, secured future partnerships)." },
      { label: 'Skincare Bonus', value: 'Saving the $250k skincare deal can be included as a secondary performance milestone. However, do NOT make it the primary metric — career longevity has higher long-term value.' },
      { label: 'Floor', value: 'Your agency rarely takes on high-risk career cases for less than $12,000 upfront without significant performance-linked upside.' },
    ],
  },
  {
    icon: '🛠️',
    title: 'Strategic Capabilities',
    content: [
      { label: 'The Shield', value: 'A 24/7 media monitoring team to track sentiment and suppress emerging tabloid stories before they trend.' },
      { label: 'The Pivot', value: 'A staged recovery plan — moving from a neutral holding statement to a full rebranding campaign once the heat dies down.' },
      { label: 'The Vault', value: 'Secure, NDA-protected information gathering to verify whether the screenshots were faked or selectively edited.' },
    ],
  },
];

// ── Quick Summary (used in Chat sidebar) ───────────────────────────────────
const SUMMARY_SECTIONS = [
  {
    icon: '🏢',
    title: 'Your Role',
    content: [
      { label: 'Position', value: 'Senior Account Director, Apex PR — a small agency under financial pressure seeking higher-visibility accounts.' },
    ],
  },
  {
    icon: '🤝',
    title: 'Who You Are Meeting',
    content: [
      { value: 'Aria Lim, lifestyle influencer facing a public scandal after screenshots suggested a relationship with a married public figure. Her $250,000 skincare deal is under review (brand wants a crisis plan in 48 h). Apex has NOT yet agreed to represent her.' },
    ],
  },
  {
    icon: '🎯',
    title: 'Priority Order',
    content: [
      { label: '1 — Primary', value: "Protect or stabilise Aria's long-term reputation and career." },
      { label: '2 — Secondary', value: 'Try to preserve the skincare ambassadorship (do not let it override the broader strategy).' },
    ],
  },
  {
    icon: '❓',
    title: 'Main Negotiation Question',
    content: [
      { value: 'Should Apex PR represent Aria, and if yes, under what conditions?' },
    ],
  },
  {
    icon: '⚠️',
    title: 'What Makes This Difficult',
    content: [
      { value: 'You do not know the full truth yet' },
      { value: 'More damaging information may surface' },
      { value: 'Time pressure is high (48 h deadline)' },
      { value: 'Aria needs Apex, but Apex also benefits from a high-visibility client' },
      { value: 'Apex must protect its own reputation and existing clients' },
    ],
  },
  {
    icon: '📋',
    title: 'Your Objectives',
    content: [
      { label: '1', value: 'Assess whether Aria is a representable client' },
      { label: '2', value: 'Clarify the basic shape of the crisis' },
      { label: '3', value: 'Negotiate terms of representation' },
      { label: '4', value: 'Establish safeguards and approval processes' },
      { label: '5', value: "Protect Apex's ethics, reputation, and client relationships" },
    ],
  },
  {
    icon: '🔑',
    title: 'Negotiation Concepts to Apply',
    content: [
      { label: 'Interests', value: "What Aria really cares about beneath her stated positions" },
      { label: 'BATNA', value: "What happens if no deal is reached — for both sides" },
      { label: 'Options', value: "Creative deal structures (fees, disclosure timing, phased response)" },
      { label: 'Legitimacy', value: "Professional norms and industry standards to justify your position" },
      { label: 'Commitment', value: "Any agreement must be clear, realistic, and implementable" },
    ],
  },
  {
    icon: '🚫',
    title: "Apex's Non-Negotiables",
    content: [
      { value: 'No illegal or unethical actions' },
      { value: 'No deception, harassment, intimidation, or evidence suppression' },
      { value: 'No reckless reputational exposure for Apex' },
      { value: 'Existing clients must be protected' },
    ],
  },
];

// ── Component ───────────────────────────────────────────────────────────────
export default function CaseBriefModal({ open, onClose, mode = 'rolesheet' }) {
  if (!open) return null;

  const isSummary = mode === 'summary';
  const sections = isSummary ? SUMMARY_SECTIONS : BRIEF_SECTIONS;
  const title = isSummary ? 'Quick Reference Summary' : 'The Aria Lim Crisis';

  return (
    <div className="modal-overlay animate-fadeIn" id="case-brief-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`modal-panel glass-card animate-fadeUp ${isSummary ? 'modal-summary' : ''}`}>
        <div className="modal-header">
          <div>
            <div className="modal-label">{isSummary ? 'Negotiation Reference' : 'Case Brief'}</div>
            <h2 className="modal-title">{title}</h2>
          </div>
          <button className="modal-close btn-ghost" id="close-brief-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          {sections.map(section => (
            <div key={section.title} className="brief-section">
              <h3 className="brief-section-title">
                <span className="brief-icon">{section.icon}</span>
                {section.title}
              </h3>
              <div className="brief-items">
                {section.content.map((item, i) => (
                  <div key={i} className="brief-item">
                    {item.label && <span className="brief-key">{item.label}:</span>}
                    <span className="brief-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!isSummary && (
            <div className="brief-goal-box">
              <strong>Primary Goal:</strong> Save Aria Lim's career and long-term livelihood as a public figure — by managing the reputational crisis, restoring public trust, and giving her a viable path forward.<br /><br />
              <strong>Secondary Goal:</strong> Where feasible, salvage the $250,000 skincare ambassadorship as part of that recovery — but only if it genuinely supports Aria's career, not at the expense of it.
            </div>
          )}

          {isSummary && (
            <div className="brief-goal-box">
              <strong>Remember:</strong> A &ldquo;no deal&rdquo; outcome can still be a strong outcome if you justify it well and manage the interaction professionally.
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
