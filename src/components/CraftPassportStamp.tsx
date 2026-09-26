import React, { useState } from "react";

export const CraftPassportStamp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stampTilt, setStampTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setStampTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setStampTilt({ x: 0, y: 0 });
  };

  const scrollToDossier = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    const el = document.getElementById("textile-dossier");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="craft-passport-wrap">
      {/* Interactive 3D Letterpress Wax Stamp */}
      <div
        className="craft-wax-stamp"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          transform: `perspective(600px) rotateX(${stampTilt.y}deg) rotateY(${stampTilt.x}deg)`,
        }}
        title="Click to inspect Provenance & Craft Passport"
      >
        <svg className="wax-stamp-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path
            id="stampCurve"
            d="M 18,50 A 32,32 0 1,1 82,50 A 32,32 0 1,1 18,50"
            fill="none"
          />
          <text className="stamp-curved-text">
            <textPath href="#stampCurve" startOffset="0%">
              ✦ AARTH GUILD • VERIFIED PITLOOM • EST. 2026 •
            </textPath>
          </text>
          <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="50" y="54" textAnchor="middle" className="stamp-center-monogram">
            № 01
          </text>
        </svg>

        <span className="stamp-cue-pill">
          <span>TOUCH SEAL ⌕</span>
        </span>
      </div>

      {/* Expandable Archival Craft Passport Modal */}
      {isOpen && (
        <div className="passport-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="passport-card" onClick={(e) => e.stopPropagation()}>
            <div className="passport-header">
              <div className="passport-badge-row">
                <span className="passport-edition-tag">CERTIFICATE OF PROVENANCE</span>
                <button
                  className="passport-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close passport"
                >
                  ✕
                </button>
              </div>
              <h3 className="passport-title">The AARTH Guild Mandate</h3>
              <p className="passport-subtitle">Archival Standard for Non-Industrial Subcontinental Silhouettes</p>
            </div>

            <div className="passport-body">
              <div className="passport-entry">
                <div className="entry-num">I.</div>
                <div className="entry-content">
                  <h4>THE FOOT-PEDAL PROTOCOL</h4>
                  <p>Every meter of fabric is loomed exclusively by wooden foot pedals and wooden throw shuttles. We reject high-speed industrial looms that sever the tactile heartbeat of yarn.</p>
                </div>
              </div>

              <div className="passport-entry">
                <div className="entry-num">II.</div>
                <div className="entry-content">
                  <h4>FERMENTED BOTANICAL TANNINS</h4>
                  <p>Our palette relies on ancient Ayurvedic mordants: harda, pomegranate rind, madder root, and iron scrap fermented with jaggery. The colors evolve naturally with time and wear.</p>
                </div>
              </div>

              <div className="passport-entry">
                <div className="entry-num">III.</div>
                <div className="entry-content">
                  <h4>SAVILE ROW STRUCTURE</h4>
                  <p>Draped in the soft spirit of Indian courtly garments, but tailored with the sharp geometric balance of classic British tailoring for everyday modern wear.</p>
                </div>
              </div>
            </div>

            <div className="passport-footer">
              <div className="passport-signature">
                <span className="sig-label">REGISTERED ATELIER:</span>
                <span className="sig-val">London • Gujarat • Bhagalpur</span>
              </div>
              <button className="passport-dossier-btn" onClick={scrollToDossier}>
                <span>INSPECT FABRIC DOSSIER ↓</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
