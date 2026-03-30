import { useState, useRef } from 'react';
import './AriaProfile.css';

export default function AriaProfile() {
  const [hovered, setHovered] = useState(false);
  const hoverTimeout          = useRef(null);

  function handleMouseEnter() {
    hoverTimeout.current = setTimeout(() => setHovered(true), 120);
  }

  function handleMouseLeave() {
    clearTimeout(hoverTimeout.current);
    setHovered(false);
  }

  return (
    <div
      className="aria-profile-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    >
      <div className="aria-name-row">
        <span className="aria-name">Aria Lim</span>
        <span className="verified-badge">✓ Verified</span>
      </div>
      <span className="aria-handle">@arialim · Lifestyle Influencer</span>

      {/* Hover Quick-Profile Card */}
      {hovered && (
        <div className="aria-hover-card animate-fadeIn">
          <div className="hover-card-top">
            <img src="/aria_avatar.png" alt="Aria Lim" className="hover-card-avatar" />
            <div className="hover-card-stats">
              <div className="stat-block">
                <span className="stat-num">500K</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-block">
                <span className="stat-num">312</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-block">
                <span className="stat-num">2.4M</span>
                <span className="stat-label">Likes</span>
              </div>
            </div>
          </div>
          <div className="hover-card-bio">
            <strong>Aria Lim</strong>
            <p>
              ✨ Lifestyle · Skincare · Travel<br />
              🌿 Brand Ambassador · #AriaLim<br />
              🔗 arialim.sg/links
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
