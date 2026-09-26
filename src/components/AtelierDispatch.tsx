import React, { useState } from "react";

export const AtelierDispatch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="atelier-dispatch-section" id="dispatch">
      <div className="container">
        <div className={`dispatch-envelope-card ${isOpen ? "unsealed" : ""}`}>
          {/* Envelope Header / Exterior Postal Markings */}
          <div className="dispatch-header-bar">
            <div className="dispatch-postal-stamp">
              <span className="stamp-city">BHAGALPUR ➔ LONDON</span>
              <span className="stamp-date">REGISTERED DISPATCH • 2026</span>
            </div>
            <div className="dispatch-seal-btn-wrap">
              <button 
                className="dispatch-seal-btn" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Seal the archival letter" : "Break archival wax seal and read manifesto"}
              >
                <div className="wax-seal-circle">
                  <span className="seal-monogram">AR</span>
                  <span className="seal-ring" />
                </div>
                <span className="seal-action-text">
                  {isOpen ? "SEAL LETTER ✕" : "BREAK WAX SEAL & UNROLL ✦"}
                </span>
              </button>
            </div>
          </div>

          {/* Envelope Teaser View when closed */}
          {!isOpen && (
            <div className="dispatch-teaser" onClick={() => setIsOpen(true)}>
              <span className="teaser-eyebrow">CONFIDENTIAL ATELIER RECORD</span>
              <h3 className="teaser-headline">Why We Refuse to Mass-Produce</h3>
              <p className="teaser-sub">Click the wax seal to unroll the handwritten manifesto of the guild.</p>
              <div className="teaser-open-prompt">UNROLL PARCHMENT [↓]</div>
            </div>
          )}

          {/* Unrolled Parchment Document */}
          {isOpen && (
            <div className="dispatch-unrolled-scroll">
              <div className="scroll-paper-texture">
                <div className="scroll-watermark" aria-hidden="true">AARTH</div>

                <div className="scroll-content-inner">
                  <div className="scroll-masthead">
                    <span className="scroll-registry">ATELIER ARCHIVE • MANIFESTO NO. 01</span>
                    <h3 className="scroll-title">The Subcontinental Manifesto</h3>
                    <div className="scroll-flourish">❦ — ✦ — ❧</div>
                  </div>

                  <div className="scroll-body-prose">
                    <p className="prose-drop-cap">
                      <strong>T</strong>o the modern observer, Indian fashion has often been reduced to ornamental costumes reserved for weddings and distant festivals. We founded <strong>AARTH</strong> to break that illusion.
                    </p>
                    <p>
                      For three millennia before industrial steam engines, the Indian subcontinent clothed the civilized world. Roman senators debated the sheer transparency of Bengal muslins; European merchants traded silver bullion for Bhagalpur Tussar silk. That mastery was never merely decorative—it was an architectural and botanical discipline.
                    </p>
                    <p>
                      Every garment in this archive is woven on hand-pedaled wooden pitlooms. The yarns are conditioned in river silt and steeped in crushed cacao pods, pomegranate rinds, and fermented scrap iron. There are no synthetic polymers here. No automated spinning mills.
                    </p>
                    <p>
                      We bring this heritage into everyday, structured British and global wardrobes: raw silk kurtas tailored with bespoke clean lines, mud-resist kimonos with structured shoulders, and relaxed trousers designed for timeless daily living.
                    </p>
                  </div>

                  <div className="scroll-signoff-grid">
                    <div className="signoff-box">
                      <span className="signoff-role">FOUNDER & ARTISTIC DIRECTION</span>
                      <span className="signoff-name">AARTH Atelier, London</span>
                    </div>
                    <div className="signoff-box">
                      <span className="signoff-role">WEAVING GUILD MASTER</span>
                      <span className="signoff-name">Bhagalpur Handloom Master, Bihar</span>
                    </div>
                    <div className="signoff-box">
                      <span className="signoff-role">STATUS</span>
                      <span className="signoff-verified">AUTHENTICATED • 2026</span>
                    </div>
                  </div>

                  <div className="scroll-close-wrap">
                    <button className="scroll-fold-btn" onClick={() => setIsOpen(false)}>
                      ▲ FOLD ARCHIVAL DISPATCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
