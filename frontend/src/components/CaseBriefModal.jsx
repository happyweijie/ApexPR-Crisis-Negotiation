import './CaseBriefModal.css';

const BRIEF_SECTIONS = [
  {
    icon: '🏢',
    title: 'Your Role',
    content: [
      { label: 'Position', value: 'Senior Account Director at Apex PR' },
      { label: 'Firm', value: 'Mid-sized PR firm. High ethical standards. Represents family-oriented brands.' },
    ],
  },
  {
    icon: '⚡',
    title: 'The Scenario',
    content: [
      { label: 'Client', value: 'Aria Lim — lifestyle influencer, 500k followers' },
      { label: 'Stakes', value: '$250,000 six-month skincare ambassadorship' },
      { label: 'Crisis', value: 'Screenshots surfaced suggesting a relationship with a married public figure. Trending on social media.' },
      { label: 'Pressure', value: 'Skincare brand expects a crisis strategy in 48 hours.' },
      { label: 'Status', value: 'Your agency has NOT yet agreed to represent Aria. This meeting decides.' },
    ],
  },
  {
    icon: '🎯',
    title: 'Your Objectives',
    content: [
      { label: '1. Vet the Client', value: "Does Aria align with Apex PR's ethics?" },
      { label: '2. Negotiate Terms', value: 'Define fees and conditions for representation.' },
      { label: '3. Fact-Find', value: 'Clarify the timeline and identify escalation risks.' },
      { label: '4. Safeguards', value: 'Negotiate disclosure, media control, and legal compliance protocols.' },
      { label: '5. Governance', value: 'Agree on veto power and approval workflow for messaging.' },
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
      { label: 'Fees', value: 'Base retainers or performance incentives.' },
      { label: 'Disclosure', value: 'Level and timing of information sharing.' },
      { label: 'Strategy', value: 'Denial, holding statement, or phased response.' },
      { label: 'Control', value: 'Approval process for all public-facing messaging.' },
    ],
  },
  {
    icon: '💼',
    title: 'Financial Benchmarks',
    content: [
      { label: 'Market Standard', value: 'Professional crisis management for an influencer of Aria\'s tier typically starts at a $15,000 retainer.' },
      { label: 'Agency Goal', value: 'Apex PR aims for a \'Win-Win\' structure. You have the authority to trade a lower base fee for a higher Performance Bonus — e.g., tied to saving the $250k skincare contract.' },
      { label: 'Floor', value: 'Your agency rarely takes on high-risk cases for less than $12,000 upfront without significant performance-linked upside.' },
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

export default function CaseBriefModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay animate-fadeIn" id="case-brief-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel glass-card animate-fadeUp">
        <div className="modal-header">
          <div>
            <div className="modal-label">Case Brief</div>
            <h2 className="modal-title">The Aria Lim Crisis</h2>
          </div>
          <button className="modal-close btn-ghost" id="close-brief-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          {BRIEF_SECTIONS.map(section => (
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

          <div className="brief-goal-box">
            <strong>Your Goal:</strong> Reach an agreement on the terms of representation and establish a safe framework for the agency to operate within.
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Close Brief</button>
        </div>
      </div>
    </div>
  );
}
