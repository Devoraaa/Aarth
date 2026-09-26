import React, { useEffect, useState } from "react";

export const AtelierDispatchBar: React.FC = () => {
  const [times, setTimes] = useState({ london: "12:00:00", india: "17:30:00" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const lonStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const indStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      setTimes({ london: lonStr, india: indStr });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div 
        className="atelier-dispatch-tape" 
        onClick={() => setIsModalOpen(true)}
        title="Click to view live craft ledger & provenance"
      >
        <div className="dispatch-tape-inner">
          <div className="dispatch-segment">
            <span className="dispatch-pulse-indicator" />
            <span className="dispatch-mono-label">ATELIER DISPATCH</span>
            <span className="dispatch-badge">LIVE GUILD</span>
          </div>

          <span className="dispatch-sep">✦</span>

          <div className="dispatch-segment">
            <span className="dispatch-city">LONDON STUDIO</span>
            <span className="dispatch-time">{times.london} GMT</span>
          </div>

          <span className="dispatch-sep">✦</span>

          <div className="dispatch-segment">
            <span className="dispatch-city">BHAGALPUR PITLOOM</span>
            <span className="dispatch-time">{times.india} IST</span>
          </div>

          <span className="dispatch-sep">✦</span>

          <div className="dispatch-segment hide-mobile">
            <span className="dispatch-mono-label">LOOM HARNESS:</span>
            <span className="dispatch-val">ACTIVE WEFT</span>
          </div>

          <span className="dispatch-sep hide-mobile">✦</span>

          <div className="dispatch-segment hide-mobile">
            <span className="dispatch-mono-label">ORGANIC DYE VAT:</span>
            <span className="dispatch-val">28°C FERMENTING</span>
          </div>

          <div className="dispatch-inspect-cue">
            <span>AUDIT LEDGER ⌕</span>
          </div>
        </div>
      </div>

      {/* Live Atelier Ledger Modal */}
      {isModalOpen && (
        <div className="dispatch-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="dispatch-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="dispatch-modal-header">
              <div className="modal-title-group">
                <span className="modal-sub">ARCHIVAL PROTOCOL • REF 2026-UK/IND</span>
                <h3 className="modal-title">Atelier Daily Dispatch Ledger</h3>
              </div>
              <button 
                className="dispatch-modal-close" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close ledger"
              >
                ✕
              </button>
            </div>

            <div className="dispatch-modal-body">
              <div className="ledger-grid">
                <div className="ledger-cell">
                  <span className="ledger-lbl">ANNUAL WEAVE QUOTA</span>
                  <span className="ledger-data">Strictly 1,200 Meters</span>
                  <p className="ledger-desc">Limited by seasonal monsoon humidity and raw silk cocoon rearing cycles.</p>
                </div>
                <div className="ledger-cell">
                  <span className="ledger-lbl">GUILD PARTNERS</span>
                  <span className="ledger-data">14 Master Weavers</span>
                  <p className="ledger-desc">Generational pitloom artisans in Bhagalpur, Kutch, and Madhya Pradesh.</p>
                </div>
                <div className="ledger-cell">
                  <span className="ledger-lbl">POWER CONSUMPTION</span>
                  <span className="ledger-data">0.00 kWh (Human Foot Pedal)</span>
                  <p className="ledger-desc">100% carbon-neutral loom mechanics driven by rhythmic artisan foot treadles.</p>
                </div>
                <div className="ledger-cell">
                  <span className="ledger-lbl">DRAFTING STUDIO</span>
                  <span className="ledger-data">Mayfair & Soho, London</span>
                  <p className="ledger-desc">Patterns drafted using traditional Savile Row geometric balance principles.</p>
                </div>
              </div>

              <div className="dispatch-modal-footer">
                <span className="footer-stamp">✦ VERIFIED ARTISANAL INTEGRITY • AARTH 2026 ✦</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
