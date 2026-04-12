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

  const feeStructure  = parseField(agreementSection, 'Fee Structure');
  const strategy      = parseField(agreementSection, 'Strategy');
  const safeguards    = parseField(agreementSection, 'Safeguards & Control');
  const acceptability = parseField(agreementSection, 'Acceptability');

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
      const pdfW = 210; // Standard A4 width in mm
      const pdfH = (canvas.height * pdfW) / canvas.width; // Proportional height in mm

      if (isFirstPage) {
        isFirstPage = false;
        // First page is the formal certificate, cap it to standard A4 height (297) if needed to look like a real cert
        const maxH = 297; 
        pdf.addImage(imgData, 'PNG', 0, 0, pdfW, Math.min(pdfH, maxH));
      } else {
        // For the feedback page, just create a custom-height PDF page so nothing ever gets cut in half!
        pdf.addPage([pdfW, Math.max(pdfH, 297)], 'portrait');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
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

            {/* ===== PAGE 2: FEEDBACK & ANALYSIS ===== */}
            <div className="cert-page">
              {/* Header band */}
              <div className="cert-header-band">
                <div className="cert-logo-row">
                  <div className="cert-apex-logo">APEX PR</div>
                  <div className="cert-divider-v" />
                  <div className="cert-course-label">UTC2120 · Negotiation Simulation</div>
                </div>
              </div>

              {/* Title block */}
              <div className="cert-title-block" style={{ marginTop: '24px', paddingBottom: '16px' }}>
                <h1 className="cert-student-name">Detailed Feedback & Analysis</h1>
                <p className="cert-subtitle-text">
                  Student: <strong>{studentName}</strong> &nbsp;|&nbsp; Date: <strong>{Today()}</strong> &nbsp;|&nbsp; Score: <strong>{score}/100</strong>
                </p>
              </div>

              <div className="cert-hr" />

              {/* Analysis */}
              <div className="cert-section" style={{ flexGrow: 1, paddingTop: '20px' }}>
                <div className="cert-analysis-raw" style={{ border: 'none', background: 'transparent', padding: '0 10px' }}>
                  <ReactMarkdown>
                    {analysisSection || 'Feedback analysis not available.'}
                  </ReactMarkdown>
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

          </div>
        </div>
      </div>
    </div>
  );
}
