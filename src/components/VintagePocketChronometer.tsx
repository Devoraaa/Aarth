import React, { useEffect, useState } from "react";

export const VintagePocketChronometer: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isWinding, setIsWinding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
        setScrollPercent(pct);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWinding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsWinding(false), 800);
  };

  const handRotation = scrollPercent * 3.6; // 0 to 360 deg
  const yardsSpun = ((scrollPercent / 100) * 8.4).toFixed(1);

  return (
    <div className={`pocket-chronometer-wrap ${isOpen ? "open" : ""}`}>
      {/* Expanded Antique Watch Case Interior */}
      {isOpen && (
        <div className="chronometer-case-interior" onClick={(e) => e.stopPropagation()}>
          <div className="interior-top-row">
            <span className="interior-heraldry">❦ MDCCCCVI ❧</span>
            <button
              className="interior-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close pocket chronometer"
            >
              ✕
            </button>
          </div>

          <div className="interior-oxford-rule" />

          <div className="interior-movement-view">
            {/* Spinning Mechanical Balance Wheel */}
            <div className="balance-wheel-anim">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="17" fill="none" stroke="#8C6D3F" strokeWidth="1.5" />
                <line x1="20" y1="3" x2="20" y2="37" stroke="#8C6D3F" strokeWidth="1" />
                <line x1="3" y1="20" x2="37" y2="20" stroke="#8C6D3F" strokeWidth="1" />
                <circle cx="20" cy="20" r="4" fill="#4A3B32" />
              </svg>
            </div>
            <div className="movement-text">
              <span className="mov-firm">AARTH &amp; CO. • MAYFAIR</span>
              <span className="mov-jewels">17 JEWELS • LEVER ESCAPEMENT</span>
            </div>
          </div>

          <div className="interior-data-table">
            <div className="interior-row">
              <span className="int-label">WEFT PROGRESS:</span>
              <span className="int-val">{scrollPercent}% WOVEN</span>
            </div>
            <div className="interior-row">
              <span className="int-label">CLOTH RECORD:</span>
              <span className="int-val">{yardsSpun} YARDS LOOMED</span>
            </div>
            <div className="interior-row">
              <span className="int-label">CHRONOMETER REF:</span>
              <span className="int-val">SAVILE ROW 1906</span>
            </div>
          </div>

          <div className="interior-oxford-rule" />

          <button className="interior-spring-btn" onClick={scrollToTop}>
            <span>SPRING TO HEAD OF FOLIO [↑]</span>
          </button>
        </div>
      )}

      {/* Main Antique Brass Pocket Watch */}
      <div 
        className={`antique-watch-body ${isWinding ? "winding-fast" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="1906 Weaver's Pocket Chronometer • Click to Inspect Movement"
      >
        {/* Watch Top Winding Crown & Bow */}
        <div className="watch-crown-bow">
          <div className="watch-bow-loop" />
          <div className="watch-knurled-crown" />
        </div>

        {/* Watch Dial */}
        <div className="watch-enamel-dial">
          {/* Outer Track & Roman Numerals */}
          <div className="watch-roman-numeral pos-12">XII</div>
          <div className="watch-roman-numeral pos-3">III</div>
          <div className="watch-roman-numeral pos-6">VI</div>
          <div className="watch-roman-numeral pos-9">IX</div>

          {/* Sub-Dial Signature */}
          <div className="watch-brand-signature">
            <span>AARTH</span>
            <i>1906</i>
          </div>

          {/* Rotating Mechanical Spade Hand */}
          <div 
            className="watch-spade-hand"
            style={{ transform: `rotate(${handRotation}deg)` }}
          />

          {/* Center Pin */}
          <div className="watch-center-pin" />
        </div>

        {/* Small Leather Label Badge */}
        <div className="watch-leather-pill">
          <span>{scrollPercent}% • {yardsSpun}yds</span>
        </div>
      </div>
    </div>
  );
};
