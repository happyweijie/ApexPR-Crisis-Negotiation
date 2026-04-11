import './RoleSheetModal.css';

export default function RoleSheetModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="rs-overlay"
      id="role-sheet-modal"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="rs-panel">
        {/* Close button */}
        <button className="rs-close" id="close-role-sheet-btn" onClick={onClose} aria-label="Close">✕</button>

        <div className="rs-document">

          <h1 className="rs-title">Role Sheet: Apex PR</h1>

          {/* ── Your Role ── */}
          <h2 className="rs-h2">Your Role</h2>
          <p>
            You are a <strong>Senior Account Director at Apex PR</strong>, a small public relations agency that specialises in brand reputation management and crisis communications.
          </p>
          <p>
            Apex PR is respected for being careful, professional, and ethically disciplined, but it is not a major market leader. Compared with larger agencies, Apex has fewer resources, a smaller client base, and a more fragile reputation. The firm has also been facing financial pressure in recent months and is actively seeking more clients and higher-visibility accounts to strengthen its position in the industry.
          </p>
          <p>This means that representing the right client could help Apex PR:</p>
          <ul>
            <li>increase revenue</li>
            <li>improve its standing in a competitive market</li>
            <li>demonstrate that it can manage high-pressure crisis accounts</li>
            <li>attract future high-profile clients</li>
          </ul>
          <p>
            At the same time, taking the wrong client could seriously damage the agency's credibility and harm its relationships with existing clients.
          </p>
          <p>
            You are meeting with Aria Lim, and your task is to negotiate whether Apex PR should represent her in the current crisis, and if so, under what terms.
          </p>

          <hr className="rs-rule" />

          {/* ── Background ── */}
          <h2 className="rs-h2">Background of the Situation</h2>
          <p>
            Aria Lim is a lifestyle influencer with a large public following and a strong history of successful brand partnerships.
          </p>
          <p>
            Three days ago, screenshots began circulating online suggesting that she was involved in a romantic relationship with a married public figure. The story is now gaining traction across social media, and journalists are beginning to ask for comment.
          </p>
          <p>
            Aria recently signed a 6-month ambassadorship worth $250,000 with a premium skincare brand. The brand has not yet terminated the contract, but it has expressed concern about the reputational fallout and expects a crisis response strategy within 48 hours.
          </p>
          <p>
            Apex PR has not yet formally agreed to represent Aria. This means the current conversation is not about executing a PR plan immediately. It is first and foremost a <strong>negotiation</strong> over whether your agency will take her on as a client, and under what conditions.
          </p>

          <hr className="rs-rule" />

          {/* ── What Makes This Difficult ── */}
          <h2 className="rs-h2">What Makes This Negotiation Difficult</h2>
          <p>This is not a straightforward service pitch. The situation involves several layers of uncertainty and conflict:</p>

          <h3 className="rs-h3">1. Information asymmetry</h3>
          <p>You only know what is currently public. You do not yet know:</p>
          <ul>
            <li>whether the screenshots are genuine</li>
            <li>whether they are misleading or taken out of context</li>
            <li>whether more damaging material may surface</li>
            <li>whether Aria is withholding anything</li>
            <li>whether the skincare brand is already close to termination</li>
            <li>whether Aria is truly willing to cooperate with crisis protocols</li>
          </ul>
          <p>Aria likely knows more than you do, but may not disclose everything immediately.</p>

          <h3 className="rs-h3">2. Time pressure</h3>
          <p>
            The skincare brand expects a crisis strategy proposal within 48 hours. This creates urgency, but rushing too quickly may expose your agency to reputational or ethical risk.
          </p>

          <h3 className="rs-h3">3. Mutual dependence</h3>
          <p>Aria needs professional help to manage a fast-moving public controversy.</p>
          <p>However, Apex PR also has something to gain:</p>
          <ul>
            <li>Aria is a high-visibility client</li>
            <li>handling her case well could improve Apex's industry standing</li>
            <li>a successful engagement could help the agency secure more clients in the future</li>
          </ul>
          <p>This means the negotiation is not one-sided. Aria needs Apex, but Apex may also benefit from representing Aria.</p>

          <h3 className="rs-h3">4. Reputational risk</h3>
          <p>
            Your agency represents family-oriented and values-driven brands. If you take on a controversial client without proper safeguards, it may damage Apex's credibility and create spillover risk for existing accounts.
          </p>

          <h3 className="rs-h3">5. Ethical constraints</h3>
          <p>Even under pressure, your agency cannot support:</p>
          <ul>
            <li>illegal conduct</li>
            <li>deception</li>
            <li>harassment</li>
            <li>intimidation</li>
            <li>destruction or suppression of evidence</li>
            <li>knowingly misleading statements</li>
          </ul>
          <p>Your agency's long-term credibility matters more than short-term revenue.</p>

          <hr className="rs-rule" />

          {/* ── Your Professional Position ── */}
          <h2 className="rs-h2">Your Professional Position</h2>
          <p>
            As Senior Account Director, you are responsible for assessing whether Aria is a representable client and whether Apex can manage the crisis responsibly.
          </p>
          <p>You must balance:</p>
          <ul>
            <li>commercial opportunity</li>
            <li>client management</li>
            <li>reputational risk</li>
            <li>ethics</li>
            <li>operational feasibility</li>
          </ul>
          <p>
            You are not expected to uncover every detail of the scandal. Instead, you are expected to negotiate the conditions under which representation would or would not be possible.
          </p>
          <p>
            This means a strong outcome is not simply "getting the client." A strong outcome could also be a <strong>well-justified decision not to represent Aria</strong> if the risks are too high or the conditions for trust are not met.
          </p>

          <hr className="rs-rule" />

          {/* ── Core Objective ── */}
          <h2 className="rs-h2">Your Core Objective</h2>
          <p>
            To negotiate whether Apex PR will represent Aria, and if so, under what conditions, while protecting the agency's ethics, reputation, and commercial interests.
          </p>

          <hr className="rs-rule" />

          {/* ── Priority Structure ── */}
          <h2 className="rs-h2">Priority Structure of the Negotiation</h2>

          <h3 className="rs-h3">Primary goal</h3>
          <p>Your primary focus should be on negotiating a path that <strong>protects or stabilises Aria's long-term reputation and career</strong>.</p>

          <h3 className="rs-h3">Secondary goal</h3>
          <p>
            Preserving the skincare ambassadorship is important, but it is a secondary concern. It should not override the broader reputational strategy.
          </p>
          <p>
            This means that if you negotiate as though saving the skincare deal is the only issue, you may miss the larger strategic goal of long-term career protection.
          </p>

          <hr className="rs-rule" />

          {/* ── Specific Objectives ── */}
          <h2 className="rs-h2">Your Specific Objectives During the Negotiation</h2>
          <p>During this conversation, you should try to:</p>

          <h3 className="rs-h3">1. Assess whether Aria is a representable client</h3>
          <ul>
            <li>Is she credible enough to work with?</li>
            <li>Is she willing to cooperate?</li>
            <li>Is the reputational risk manageable?</li>
            <li>Would taking her on harm Apex's standing with existing clients?</li>
          </ul>

          <h3 className="rs-h3">2. Clarify the basic shape of the crisis</h3>
          <ul>
            <li>What is publicly known?</li>
            <li>What does Aria say happened?</li>
            <li>Are there likely escalation points?</li>
            <li>Is there a risk that more material will emerge?</li>
          </ul>

          <h3 className="rs-h3">3. Negotiate the terms of possible representation</h3>
          <ul>
            <li>under what conditions Apex PR would agree to take the account</li>
            <li>what fees or payment structure would make sense</li>
            <li>what disclosure expectations are required</li>
            <li>what scope of work Apex would take on</li>
          </ul>

          <h3 className="rs-h3">4. Establish safeguards</h3>
          <ul>
            <li>how sensitive information would be disclosed</li>
            <li>who approves public statements</li>
            <li>what legal or reputational boundaries must be observed</li>
            <li>what happens if new evidence appears later</li>
          </ul>

          <h3 className="rs-h3">5. Protect Apex PR's interests</h3>
          <ul>
            <li>protect existing clients from spillover damage</li>
            <li>avoid agreeing to unethical or unrealistic strategies</li>
            <li>avoid overcommitting under time pressure</li>
            <li>ensure that the engagement is commercially and operationally worthwhile</li>
          </ul>

          <h3 className="rs-h3">6. Create a clear process</h3>
          <ul>
            <li>clarify who has veto power</li>
            <li>determine how approvals will work</li>
            <li>define immediate next steps if a deal is reached</li>
            <li>identify what must happen before formal representation begins</li>
          </ul>

          <hr className="rs-rule" />

          {/* ── What to Pay Attention To ── */}
          <h2 className="rs-h2">What You Should Be Paying Attention To</h2>
          <p>As you negotiate, pay attention to negotiation concepts such as:</p>
          <ul>
            <li><strong>Interests:</strong> What Aria really cares about beneath her stated positions</li>
            <li><strong>BATNA:</strong> What happens if no agreement is reached, for both sides</li>
            <li><strong>Options:</strong> Whether there are creative ways to structure fees, disclosure, or response sequencing</li>
            <li><strong>Legitimacy:</strong> What standards, norms, or industry logic can justify your position</li>
            <li><strong>Communication:</strong> Whether your tone, framing, and questioning build trust or damage it</li>
            <li><strong>Relationship:</strong> Whether you are treating Aria in a way that keeps the conversation productive</li>
            <li><strong>Commitment:</strong> Whether any agreement is clear, realistic, and implementable</li>
          </ul>
          <p>This is not only a test of whether you can ask questions. It is also a test of whether you can <strong>structure a negotiation under uncertainty</strong>.</p>

          <hr className="rs-rule" />

          {/* ── Constraints ── */}
          <h2 className="rs-h2">Constraints You Must Follow</h2>
          <p>Apex PR has several non-negotiable constraints:</p>
          <ul>
            <li>You cannot advise or condone illegal actions.</li>
            <li>You cannot facilitate deception, harassment, intimidation, or evidence suppression.</li>
            <li>You cannot recklessly expose the agency to reputational harm.</li>
            <li>You must take seriously the impact on existing clients.</li>
            <li>Your agency's long-term credibility is more important than short-term fees.</li>
            <li>The Managing Partner may veto representation if the risk is too high.</li>
            <li>You should not agree to represent Aria unless there is a workable level of trust, cooperation, and process discipline.</li>
          </ul>
          <p>You should therefore be careful about demanding too much too early, but also careful about agreeing too quickly without adequate safeguards.</p>

          <hr className="rs-rule" />

          {/* ── What Is Negotiable ── */}
          <h2 className="rs-h2">What Is Negotiable</h2>
          <p>You may negotiate on:</p>
          <ul>
            <li>whether Apex PR will represent Aria</li>
            <li>fee structure</li>
            <li>payment schedule</li>
            <li>performance-based incentives</li>
            <li>disclosure level and timing</li>
            <li>communication strategy</li>
            <li>whether to use a denial, holding statement, or phased response</li>
            <li>who has approval rights over public messaging</li>
            <li>legal review or NDA</li>
            <li>what happens if more evidence emerges</li>
            <li>timeline and immediate next steps</li>
          </ul>

          <hr className="rs-rule" />

          {/* ── What Is Not Negotiable ── */}
          <h2 className="rs-h2">What Is Not Negotiable</h2>
          <p>You may not:</p>
          <ul>
            <li>promise unethical conduct</li>
            <li>support falsehoods you know are false</li>
            <li>guarantee outcomes you cannot realistically guarantee</li>
            <li>allow Aria full freedom to act in ways that undermine the agency's role while still expecting Apex to absorb the reputational risk</li>
            <li>ignore the interests of Apex PR's current clients</li>
          </ul>

          <hr className="rs-rule" />

          {/* ── Unknowns ── */}
          <h2 className="rs-h2">Unknowns</h2>
          <p>At the start of the negotiation, several things remain unknown:</p>
          <ul>
            <li>whether the screenshots are genuine, incomplete, or manipulated</li>
            <li>whether more evidence exists</li>
            <li>whether Aria has fully disclosed the relevant facts</li>
            <li>whether the skincare brand is likely to terminate</li>
            <li>whether Aria is willing to accept safeguards and structured oversight</li>
            <li>whether Apex can manage the case without unacceptable spillover risk</li>
          </ul>
          <p>You will need to negotiate under these uncertainties.</p>

          <hr className="rs-rule" />

          {/* ── Good Outcome ── */}
          <h2 className="rs-h2">What a Good Outcome Looks Like</h2>
          <p>A good outcome is one where you:</p>
          <ul>
            <li>make a sound judgement about whether Aria is representable</li>
            <li>negotiate terms that are commercially sensible</li>
            <li>protect Apex's ethical and reputational boundaries</li>
            <li>create a clear and workable process</li>
            <li>identify immediate next steps</li>
            <li>prioritise long-term career protection over short-term optics</li>
            <li>avoid being manipulated into a bad deal</li>
            <li>maintain professionalism under pressure</li>
          </ul>
          <p>A "no deal" outcome can still be a good outcome if you justify it well and manage the interaction professionally.</p>

          <hr className="rs-rule" />

          {/* ── Final Task ── */}
          <h2 className="rs-h2">Final Task</h2>
          <p>
            Enter the negotiation as Apex PR.
          </p>
          <p>
            Your job is not to solve the entire scandal in one conversation. Your job is to determine whether Apex PR should represent Aria and, if so, to negotiate clear conditions for doing so.
          </p>
          <p>Focus on:</p>
          <ul>
            <li>protecting Aria's longer-term reputation and career as the primary concern</li>
            <li>treating the skincare deal as a secondary concern</li>
            <li>balancing empathy with professional judgement</li>
            <li>gathering enough information without turning the conversation into an interrogation</li>
            <li>creating options and safeguards</li>
            <li>protecting Apex PR's reputation, ethics, and client relationships</li>
          </ul>
        </div>

        <div className="rs-footer">
          <button className="rs-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
