import { useState } from 'react';
import RoleSheetModal from '../components/RoleSheetModal';
import './Onboarding.css';

export default function Onboarding({ onStart }) {
  const [name, setName] = useState('');
  const [briefOpen, setBriefOpen] = useState(false);
  const [error, setError]   = useState('');

  const handleStart = () => {
    if (!name.trim()) { setError('Please enter your name to begin.'); return; }
    onStart(name.trim());
  };

  return (
    <div className="onboarding-root">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="onboarding-container animate-fadeUp">
        {/* Header */}
        <div className="onboarding-header">
          <div className="apex-logo">APEX PR</div>
          <p className="onboarding-subtitle">UTC2120 Negotiation Simulation</p>
        </div>

        {/* Hero */}
        <div className="onboarding-hero">
          <div className="aria-avatar-lg">
            <img src="/aria_avatar.png" alt="Aria Lim" />
          </div>
          <div>
            <h1>
              Meet <span className="gradient-text">Aria Lim</span>
            </h1>
            <p className="hero-desc">
              A high-profile lifestyle influencer in crisis. Your agency must decide
              whether to represent her and on what terms.
            </p>
          </div>
        </div>

        <hr className="divider" />

        {/* Name input */}
        <div className="name-section">
          <label className="input-label" htmlFor="student-name">
            Your Name
          </label>
          <input
            id="student-name"
            className="input-field"
            type="text"
            placeholder="e.g. Sarah Tan"
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
          />
          {error && <p className="field-error">{error}</p>}
        </div>

        {/* Actions */}
        <div className="onboarding-actions">
          <button className="btn-primary" id="start-negotiation-btn" onClick={handleStart}>
            ✦ Begin Negotiation
          </button>
          <button className="btn-secondary" id="view-brief-btn" onClick={() => setBriefOpen(true)}>
            📋 Read Role Sheet
          </button>
        </div>

        <p className="onboarding-footer">
          This simulation is governed by <a href="https://studentconduct.nus.edu.sg/wp-content/uploads/NUS-Code-of-Student-Conduct.pdf" target="_blank" rel="noopener noreferrer" className="integrity-link">NUS academic integrity guidelines</a>.
        </p>
      </div>

      <RoleSheetModal open={briefOpen} onClose={() => setBriefOpen(false)} />
    </div>
  );
}
