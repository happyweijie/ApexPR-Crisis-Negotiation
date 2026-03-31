import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactMarkdown from 'react-markdown';
import './Certificate.css';

// Parse the structured markdown from the AI into sections
function parseSection(text, heading) {
  const re = new RegExp(`##\\s*${heading}\\n([\\s\\S]*?)(?=\\n##\\s|$)`, 'i');
  const m = text.match(re);
  return m ? m[1].trim() : '';
}

function parseField(text, field) {
  const re = new RegExp(`\\*\\*${field}:\\*\\*\\s*(.+)`, 'i');
  const m = text.match(re);
  return m ? m[1].trim() : '—';
}

function parseScore(text) {
  const m = text.match(/\*\*Overall Score:\*\*\s*(\d+)\/100/i);
  return m ? m[1] : '—';
}

function parseConflictMode(text) {
  const m = text.match(/\*\*Conflict Mode[^:]*:\*\*\s*(.+)/i);
  return m ? m[1].trim() : '—';
}

function parsePartScore(text, partName) {
  const re = new RegExp(`\\*\\*${partName} Score:\\*\\*\\s*\\[?(\\d+)/\\d+`, 'i');
  const m = text.match(re);
  return m ? m[1].trim() : '—';
}

function parseSevenElements(text) {
  const section = parseSection(text, 'Score Summary');
  const elements = ['Interests', 'BATNA', 'Options', 'Legitimacy', 'Communication', 'Relationship', 'Commitment'];
  return elements.map(el => {
    // Look for "- Element: [score + reason]" or "- Element: score + reason"
    const re = new RegExp(`- ${el}:\\s*\\[?([^\\]\\n]+)\\]?`, 'i');
    const m = section.match(re);
    return { name: el, value: m ? m[1].trim() : '—' };
  });
}

function Today() {
  return new Date().toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Certificate({ studentName, evaluation, onClose }) {
  const certRef = useRef(null);

  const score             = parseScore(evaluation);
  const conflictMode      = parseConflictMode(evaluation);
  const partBScore        = parsePartScore(evaluation, 'Part B');
  const partCScore        = parsePartScore(evaluation, 'Part C');
  const partDScore        = parsePartScore(evaluation, 'Part D');
  const sevenElements     = parseSevenElements(evaluation);
  const agreementSection  = parseSection(evaluation, 'Crisis Action Agreement');
  const analysisSection   = parseSection(evaluation, 'Negotiation Analysis');
  const instructorSection = parseSection(evaluation, 'Instructor Analytics');

  const feeStructure  = parseField(agreementSection, 'Fee Structure');
  const strategy      = parseField(agreementSection, 'Strategy');
  const safeguards    = parseField(agreementSection, 'Safeguards & Control');
  const acceptability = parseField(agreementSection, 'Acceptability');
  const zopaOutcome   = parseField(instructorSection, 'ZOPA Outcome');
  const disclosurePattern = parseField(instructorSection, 'Disclosure Pattern');
  const riskAssessment    = parseField(instructorSection, 'Risk Assessment');
  const readiness         = parseField(instructorSection, 'Readiness for Next Exercise');

  async function handleDownload() {
    const pages = certRef.current.querySelectorAll('.cert-page');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add printing class to expand all scrollable blocks for full capture
    certRef.current.classList.add('is-printing');

    let isFirstPage = true;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const canvas = await html2canvas(page, {
        scale: 3,
        useCORS: true,
        logging: false,
        width: page.offsetWidth,
        height: page.offsetHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      const pageH = pdf.internal.pageSize.getHeight();

      let yOffset = 0;
      let remainingH = pdfH;

      // Smart Fit: If current page is only slightly longer than standard A4 (up to 12% over)
      // just scale it down to fit one page instead of slicing it.
      if (pdfH > pageH && pdfH < pageH * 1.12) {
        if (!isFirstPage) pdf.addPage();
        isFirstPage = false;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pageH);
        remainingH = 0; // Skip slicing
      }

      // Slice the captured canvas into multiple PDF pages if it truly exceeds A4 height
      while (remainingH > 10) {
        if (!isFirstPage) pdf.addPage();
        isFirstPage = false;
        
        pdf.addImage(imgData, 'PNG', 0, -yOffset, pdfW, pdfH);
        
        yOffset += pageH;
        remainingH -= pageH;
      }
    }

    certRef.current.classList.remove('is-printing');

    const safeName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
    pdf.save(`Aria_Lim_Certificate_${safeName}.pdf`);
  }

  return (
    <div className="cert-overlay animate-fadeIn" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cert-modal-wrapper">
        <div className="cert-modal-header">
          <h3>Certificate Preview</h3>
          <div className="cert-modal-actions">
            <button className="btn-primary" id="download-pdf-btn" onClick={handleDownload}>
              ⬇ Download PDF
            </button>
            <button className="btn-ghost" onClick={onClose}>✕ Close</button>
          </div>
        </div>

        {/* The printable certificate */}
        <div className="cert-scroll-area">
          <div className="certificate" ref={certRef}>

            {/* ===== PAGE 1: ACHIEVEMENT CERTIFICATE ===== */}
            <div className="cert-page">
              {/* Header band */}
              <div className="cert-header-band">
                <div className="cert-logo-row">
                  <div className="cert-apex-logo">APEX PR</div>
                  <div className="cert-divider-v" />
                  <div className="cert-course-label">UTC2120 · Negotiation Simulation</div>
                </div>
              </div>

              {/* Gold seal area */}
              <div className="cert-seal-row">
                <div className="cert-seal">
                  <div className="cert-seal-inner">
                    <div className="cert-seal-score">{score}</div>
                    <div className="cert-seal-label">/ 100</div>
                  </div>
                </div>
              </div>

              {/* Title block */}
              <div className="cert-title-block">
                <p className="cert-presents">This certifies that</p>
                <h1 className="cert-student-name">{studentName}</h1>
                <p className="cert-subtitle-text">
                  has successfully completed the <em>Aria Lim Crisis Negotiation Simulation</em>
                  <br />in the role of <strong>Senior Account Director, Apex PR</strong>
                </p>
                <p className="cert-date">Completed on {Today()}</p>
              </div>

              <div className="cert-hr" />

              {/* Crisis Action Agreement */}
              <div className="cert-section">
                <div className="cert-section-title">⚖️ Crisis Action Agreement</div>
                <div className="cert-grid-2">
                  <div className="cert-field">
                    <div className="cert-field-key">Fee Structure</div>
                    <div className="cert-field-val">{feeStructure}</div>
                  </div>
                  <div className="cert-field">
                    <div className="cert-field-key">Strategy Chosen</div>
                    <div className="cert-field-val">{strategy}</div>
                  </div>
                  <div className="cert-field">
                    <div className="cert-field-key">Safeguards & Control</div>
                    <div className="cert-field-val">{safeguards}</div>
                  </div>
                  <div className="cert-field">
                    <div className="cert-field-key">Overall Acceptability</div>
                    <div className="cert-field-val">{acceptability}</div>
                  </div>
                </div>
              </div>

              <div className="cert-hr" />

              {/* Score Summary */}
              <div className="cert-section">
                <div className="cert-section-title">📊 Score Summary</div>
                <div className="cert-scores-summary-grid">
                  <div className="cert-score-item">
                    <span className="cert-score-label">Deal Outcome:</span>
                    <span className="cert-score-value">{partBScore}/15</span>
                  </div>
                  <div className="cert-score-item">
                    <span className="cert-score-label">Ethical Compliance:</span>
                    <span className="cert-score-value">{partCScore}/10</span>
                  </div>
                  <div className="cert-score-item">
                    <span className="cert-score-label">Conflict Mode:</span>
                    <span className="cert-score-value">{conflictMode} ({partDScore}/5)</span>
                  </div>
                </div>
                <div className="cert-seven-elements">
                  <div className="cert-seven-title">7 Elements of Effective Negotiation</div>
                  <div className="cert-elements-grid">
                    {sevenElements.map(el => (
                      <div key={el.name} className="cert-element">
                        <div className="cert-el-name">{el.name}</div>
                        <div className="cert-el-val">{el.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cert-hr" />

              {/* Analysis */}
              <div className="cert-section">
                <div className="cert-section-title">💬 Negotiation Analysis</div>
                <div className="cert-analysis-raw">
                  <ReactMarkdown>{analysisSection || 'See detailed notes above.'}</ReactMarkdown>
                </div>
              </div>

              {/* Footer */}
              <div className="cert-footer-band">
                <div className="cert-footer-left">
                  <div className="cert-sig-line" />
                  <div className="cert-sig-label">Simulation Facilitator</div>
                </div>
                <div className="cert-footer-right">
                  <div className="cert-watermark">APEX PR · UTC2120</div>
                </div>
              </div>
            </div>

            {/* ===== PAGE 2: INSTRUCTOR ANALYTICS ===== */}
            <div className="cert-page cert-page-analytics">
              <div className="cert-analytics-header">
                <div className="cert-analytics-badge">🔒 INSTRUCTOR ANALYTICS</div>
                <p className="cert-analytics-sub">
                  For instructor use only — not for student distribution
                </p>
                <div className="cert-analytics-meta">
                  <span>Student: <strong>{studentName}</strong></span>
                  <span>Date: <strong>{Today()}</strong></span>
                  <span>Score: <strong>{score}/100</strong></span>
                </div>
              </div>

              <div className="cert-analytics-grid">
                <div className="cert-analytics-card">
                  <div className="cert-analytics-card-title">ZOPA Outcome</div>
                  <div className="cert-analytics-card-body">{zopaOutcome}</div>
                </div>
                <div className="cert-analytics-card">
                  <div className="cert-analytics-card-title">Disclosure Pattern</div>
                  <div className="cert-analytics-card-body">{disclosurePattern}</div>
                </div>
                <div className="cert-analytics-card">
                  <div className="cert-analytics-card-title">Risk Assessment</div>
                  <div className="cert-analytics-card-body">{riskAssessment}</div>
                </div>
                <div className="cert-analytics-card">
                  <div className="cert-analytics-card-title">Readiness for Next Exercise</div>
                  <div className="cert-analytics-card-body">{readiness}</div>
                </div>
              </div>

              <div className="cert-analytics-raw-section">
                <div className="cert-analytics-raw-title">Key Negotiation Moves</div>
                <div className="cert-analytics-raw-body">
                  <ReactMarkdown>
                    {instructorSection 
                      ? instructorSection
                          /* Force double breaks ONLY where we see a new section header, 
                             accounting for optional markdown bolding stars */
                          .replace(/(\n?\s*\**\s*(ZOPA Outcome:|Disclosure Pattern:|Key Negotiation Moves:|Risk Assessment:|Readiness for Next Exercise:)\s*\**)/g, '\n\n$1')
                          .trim()
                      : 'Full transcript analysis not available.'}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="cert-analytics-footer">
                <div className="cert-analytics-footer-text">
                  UTC2120 · Aria Lim Negotiation Simulation · Generated {Today()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
