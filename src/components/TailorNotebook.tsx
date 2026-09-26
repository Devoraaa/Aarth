import React, { useState } from "react";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  detail: string;
}

const hotspots: Hotspot[] = [
  {
    id: "spot-1",
    x: 48,
    y: 18,
    label: "SAVILE ROW COLLAR STAND",
    detail: "Double-fused canvas stand drafted in London for sharp structural posture without stiffness.",
  },
  {
    id: "spot-2",
    x: 32,
    y: 42,
    label: "RELAXED GUJARAT DROP SHOULDER",
    detail: "Zero armscye tension, permitting effortless movement inspired by traditional court kurtas.",
  },
  {
    id: "spot-3",
    x: 64,
    y: 65,
    label: "HAND-SEWN PITLOOM SELVAGE",
    detail: "Intact loom edge preserved on hem. No machine overlocking; clean artisanal closure.",
  },
  {
    id: "spot-4",
    x: 52,
    y: 84,
    label: "REINFORCED SIDE GUSSET",
    detail: "Hand-stitched triangular basting stitch to withstand daily urban wear.",
  },
];

const manifestoTabs = [
  {
    id: "tab-1",
    num: "CHAPTER I",
    title: "The Geometry of Slowness",
    text: "Industrial fast-fashion operates at 1,000 picks per minute, stripping natural fibers of their natural tensile elasticity. Our pitlooms beat at 24 rhythmic pedal strokes per minute. This unhurried pace preserves the air pockets within raw silk and cotton, creating garments that breathe with living humidity.",
  },
  {
    id: "tab-2",
    num: "CHAPTER II",
    title: "Living Ayurvedic Ferment",
    text: "Modern petroleum dyes coat yarns in a plastic sheen that suffocates cloth. Our color palette originates in terracotta fermentation vats—crushed pomegranate rind for muted olive, rusted horseshoe scrap for deep leather charcoal, and madder root for deep earth. As you wear an AARTH silhouette, the botanical dyes subtly respond to your body heat and sunlight.",
  },
  {
    id: "tab-3",
    num: "CHAPTER III",
    title: "The Diaspora Bridge",
    text: "AARTH was founded on a simple architectural conviction: Indian handloom heritage is not merely bridal or celebratory costume; it is high tailoring. By marrying the fluid majesty of subcontinental drapery with the severe, geometric discipline of British tailoring, we craft everyday heirlooms for modern streets.",
  },
];

export const TailorNotebook: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(hotspots[0]);

  return (
    <section className="tailor-notebook-section" id="notebook">
      <div className="container-wide">
        <header className="section-header-antique">
          <div className="section-header-flourish">❦ — ✦ — ❧</div>
          <div className="section-eyebrow">The Atelier Journal • Vol. 01</div>
          <h2 className="section-title">The Tailor’s Workbook</h2>
          <p className="section-subtitle-antique">
            Architecture of a silhouette. Click the blueprint registration points on the sketch to reveal Savile Row pattern engineering.
          </p>
          <div className="section-divider-line">
            <span />
            <i>Architectural Blueprint & Manifesto</i>
            <span />
          </div>
        </header>

        {/* Vintage Dual-Page Open Ledger Display */}
        <div className="notebook-ledger-desk">
          {/* Left Page: Hand-Drawn Blueprint with Interactive Hotspots */}
          <div className="notebook-blueprint-page">
            <div className="blueprint-header">
              <span className="blueprint-stamp">ARCHIVAL BLUEPRINT № 01</span>
              <span className="blueprint-scale">SCALE 1:1 • LONDON DRAFT</span>
            </div>

            <div className="blueprint-interactive-canvas">
              <img
                src="/assets/sketch-wireframe.png"
                alt="AARTH Silhouette Blueprint"
                className="blueprint-sketch-img"
              />

              {/* Interactive Hotspot Pulsing Pins */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  className={`hotspot-pin ${selectedHotspot?.id === spot.id ? "active" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => setSelectedHotspot(spot)}
                  aria-label={spot.label}
                  title={spot.label}
                >
                  <span className="hotspot-pulse" />
                  <span className="hotspot-dot">✦</span>
                </button>
              ))}

              {/* Hotspot Floating Annotation Card */}
              {selectedHotspot && (
                <div
                  className="blueprint-annotation-card"
                  style={{
                    left: `${Math.min(75, Math.max(25, selectedHotspot.x))}%`,
                    top: `${Math.min(75, Math.max(20, selectedHotspot.y + 12))}%`,
                  }}
                >
                  <div className="annotation-header">
                    <span className="annotation-tag">PATTERN DRAFT POINT</span>
                    <span className="annotation-title">{selectedHotspot.label}</span>
                  </div>
                  <p className="annotation-desc">{selectedHotspot.detail}</p>
                </div>
              )}
            </div>

            <div className="blueprint-footer-note">
              <span>✦ Click pins on sketch to inspect geometric engineering</span>
            </div>
          </div>

          {/* Right Page: Hand-Penned Atelier Manifesto */}
          <div className="notebook-manifesto-page">
            <div className="manifesto-tabs-row">
              {manifestoTabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  className={`manifesto-tab-btn ${activeTab === idx ? "active" : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className="tab-ch-num">{tab.num}</span>
                  <span className="tab-ch-title">{tab.title}</span>
                </button>
              ))}
            </div>

            <div className="manifesto-card-content">
              <div className="manifesto-entry-seal">
                <span className="entry-fleuro">❦</span>
                <span className="entry-chapter-label">{manifestoTabs[activeTab].num}</span>
              </div>

              <h3 className="manifesto-entry-title">{manifestoTabs[activeTab].title}</h3>

              <div className="manifesto-ruled-lines">
                <p className="manifesto-body-text">{manifestoTabs[activeTab].text}</p>
              </div>

              <div className="manifesto-provenance-signoff">
                <div className="signoff-signature">
                  <span>AARTH ATELIER GUILD</span>
                  <i>Crafted for Everyday Modern Life</i>
                </div>
                <div className="signoff-seal">
                  <span>SEAL OF SLOW FASHION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
