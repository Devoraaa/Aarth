import React, { useState } from "react";

interface Swatch {
  id: string;
  name: string;
  subname: string;
  origin: string;
  warp: string;
  weft: string;
  loom: string;
  dye: string;
  description: string;
  image: string;
  patternType: "slub" | "resist" | "zari" | "twill";
}

const SWATCHES: Swatch[] = [
  {
    id: "tussar",
    name: "Raw Tussar Silk",
    subname: "Unbleached Wild Forest Silk",
    origin: "Bhagalpur, Bihar (25.24°N, 86.98°E)",
    warp: "118 EPI (Ends Per Inch)",
    weft: "92 PPI (Picks Per Inch)",
    loom: "Traditional Wooden Pitloom",
    dye: "Wild Acacia & Crushed Pomegranate Rind",
    description: "Harvested from wild silkworms feeding on Asan trees. Notable for its rich, tactile slub texture, coarse organic drape, and natural golden-tan luster without chemical bleaching.",
    image: "/assets/product-1.jpg",
    patternType: "slub"
  },
  {
    id: "bagru",
    name: "Bagru Mud-Resist Cotton",
    subname: "Dabu Earth-Resist Handblock",
    origin: "Bagru, Rajasthan (26.81°N, 75.54°E)",
    warp: "96 EPI • Pure Combed Cotton",
    weft: "88 PPI • Hand-Spun Yarn",
    loom: "Single-Shuttle Shuttle Loom",
    dye: "Fermented Harda & Scrap Iron Slag (Kashish)",
    description: "An ancient mud-resist technique where clay, lime, and gum are stamped onto the fabric using hand-carved teak wood blocks before submersion in fermented iron vats.",
    image: "/assets/product-2.jpg",
    patternType: "resist"
  },
  {
    id: "chanderi",
    name: "Gossamer Chanderi Zari",
    subname: "Diaphanous Sheer Weave",
    origin: "Chanderi, Madhya Pradesh (24.71°N, 78.13°E)",
    warp: "132 EPI • Degummed Mulberry Silk",
    weft: "104 PPI • Fine Cotton with Metallic Zari",
    loom: "Artisanal Jacquard Frame Loom",
    dye: "Natural River Water Bleach & Mica Shimmer",
    description: "Woven since the Vedic period. Renowned for its sheer, featherweight transparency and intricate metallic motifs woven seamlessly into pure silk-cotton warp threads.",
    image: "/assets/product-3.jpg",
    patternType: "zari"
  },
  {
    id: "twill",
    name: "Iron-Vat Fermented Twill",
    subname: "Structured Tailored Khadi",
    origin: "Wardha, Maharashtra (20.74°N, 78.60°E)",
    warp: "84 EPI • Heavy 2-Ply Khadi",
    weft: "76 PPI • Organic Dense Weave",
    loom: "4-Shaft Traditional Countermarch Loom",
    dye: "Raw Cacao Hulls & 40-Day Iron Ferment",
    description: "A heavyweight structured handloom twill steeped in molasses, crushed cacao shells, and fermented iron for 40 days to produce our signature deep leather-cacao hue.",
    image: "/assets/product-4.jpg",
    patternType: "twill"
  }
];

const BOTANICAL_DYES = [
  {
    name: "Raw Cacao Pods",
    shade: "Deep Cacao (#4A3B32)",
    process: "Crushed hulls steeped in hot river water for 72 hours"
  },
  {
    name: "Fermented Iron Rust",
    shade: "Leather Black (#242220)",
    process: "Oxidized scrap iron with sugarcane molasses in clay vats"
  },
  {
    name: "Harda & Myrobalan",
    shade: "Artisanal Taupe (#9E9185)",
    process: "Tannin-rich fruit extract mordant applied to raw fibers"
  },
  {
    name: "Acacia & Mica",
    shade: "Unbleached Pearl (#FBF9F4)",
    process: "Gentle natural sun-cured river washing"
  }
];

export const WeaversDesk: React.FC = () => {
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch>(SWATCHES[0]);
  const [activeDye, setActiveDye] = useState<number | null>(null);
  const [tensionValue, setTensionValue] = useState<number>(75);
  const [activeTab, setActiveTab] = useState<"spec" | "botanical" | "anatomy">("spec");

  return (
    <section className="weavers-desk-section" id="weavers-desk">
      <div className="container-wide">
        {/* Section Antique Header */}
        <header className="weavers-header">
          <div className="weavers-eyebrow-box">
            <span className="weavers-stamp">✦ SPECIFICATION RECORD 01 ✦</span>
            <span className="weavers-serial">ATELIER DRAFTING ARCHIVE</span>
          </div>
          <h2 className="weavers-title">The Weaver's Drafting Desk</h2>
          <p className="weavers-subtitle">
            Before garments are cut, threads are spun. Touch the tactile specimens below to inspect the warp, weft, and botanical pigments that compose each silhouette.
          </p>
          <div className="weavers-divider-line">
            <span />
            <i>Bhagalpur • Bagru • Chanderi • London</i>
            <span />
          </div>
        </header>

        {/* Main Interactive Drafting Workbench */}
        <div className="weavers-workbench">
          {/* Left Column: Tactile Swatch Selection Tray */}
          <div className="workbench-tray">
            <div className="tray-title-bar">
              <span className="tray-title">TEXTILE SPECIMENS</span>
              <span className="tray-count">4 ARCHIVED</span>
            </div>

            <div className="swatches-list">
              {SWATCHES.map((swatch, idx) => {
                const isSelected = selectedSwatch.id === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    className={`swatch-tray-item ${isSelected ? "active" : ""}`}
                    onClick={() => setSelectedSwatch(swatch)}
                  >
                    <div className="swatch-item-preview">
                      <img src={swatch.image} alt={swatch.name} className="swatch-mini-img" />
                      <div className={`swatch-weave-overlay pattern-${swatch.patternType}`} />
                    </div>
                    <div className="swatch-item-info">
                      <div className="swatch-idx">SPEC 0{idx + 1}</div>
                      <h4 className="swatch-name">{swatch.name}</h4>
                      <p className="swatch-origin">{swatch.origin.split("(")[0]}</p>
                    </div>
                    <span className="swatch-select-arrow">{isSelected ? "→" : "+"}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Tension Slider */}
            <div className="loom-tension-box">
              <div className="tension-label-row">
                <span className="tension-label">LOOM WARP TENSION</span>
                <span className="tension-val">{tensionValue} N/cm</span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                value={tensionValue}
                onChange={(e) => setTensionValue(Number(e.target.value))}
                className="tension-slider"
              />
              <div className="tension-scale">
                <span>RELAXED DRAPE</span>
                <span>CRISP STRUCTURE</span>
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Magnified Inspection Loupe */}
          <div className="workbench-loupe-card">
            <div className="loupe-header">
              <div className="loupe-badge">
                <span className="loupe-circle-indicator" />
                <span>MAGNIFIED SPECIMEN LOUPE • 12X</span>
              </div>
              <span className="loupe-coords">{selectedSwatch.origin}</span>
            </div>

            <div className="loupe-visual-stage">
              {/* Macro Image with Dynamic Texture Mesh */}
              <div className="loupe-lens-frame">
                <img
                  src={selectedSwatch.image}
                  alt={selectedSwatch.name}
                  className="loupe-macro-img"
                  style={{
                    transform: `scale(${1.15 + (tensionValue - 75) * 0.002})`,
                    filter: `contrast(${1 + (tensionValue - 75) * 0.001})`
                  }}
                />
                
                {/* SVG Loom Grid Overlay */}
                <div 
                  className={`loupe-grid-overlay pattern-${selectedSwatch.patternType}`}
                  style={{ opacity: 0.35 + (tensionValue - 40) * 0.004 }}
                />

                {/* Corner Architectural Crop Crosshairs */}
                <span className="crop-corner top-l">⌜</span>
                <span className="crop-corner top-r">⌝</span>
                <span className="crop-corner btm-l">⌞</span>
                <span className="crop-corner btm-r">⌟</span>

                <div className="loupe-lens-meter">
                  <span>WARP: {selectedSwatch.warp.split("•")[0]}</span>
                  <span>WEFT: {selectedSwatch.weft.split("•")[0]}</span>
                </div>
              </div>

              <div className="loupe-spec-desc">
                <h3 className="spec-title">{selectedSwatch.name}</h3>
                <span className="spec-subname">{selectedSwatch.subname}</span>
                <p className="spec-text">{selectedSwatch.description}</p>
              </div>
            </div>

            {/* Interactive Tabbed Inspection Panel */}
            <div className="loupe-tab-bar">
              <button 
                className={`loupe-tab-btn ${activeTab === "spec" ? "active" : ""}`}
                onClick={() => setActiveTab("spec")}
              >
                01. Technical Metrics
              </button>
              <button 
                className={`loupe-tab-btn ${activeTab === "botanical" ? "active" : ""}`}
                onClick={() => setActiveTab("botanical")}
              >
                02. Botanical Dyes
              </button>
              <button 
                className={`loupe-tab-btn ${activeTab === "anatomy" ? "active" : ""}`}
                onClick={() => setActiveTab("anatomy")}
              >
                03. Loom Classification
              </button>
            </div>

            <div className="loupe-tab-content">
              {activeTab === "spec" && (
                <div className="tab-metrics-grid">
                  <div className="metric-box">
                    <span className="m-label">WARP DENSITY</span>
                    <span className="m-val">{selectedSwatch.warp}</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">WEFT DENSITY</span>
                    <span className="m-val">{selectedSwatch.weft}</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">LOOM TYPE</span>
                    <span className="m-val">{selectedSwatch.loom}</span>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">NATURAL DYE</span>
                    <span className="m-val">{selectedSwatch.dye}</span>
                  </div>
                </div>
              )}

              {activeTab === "botanical" && (
                <div className="tab-botanicals-list">
                  {BOTANICAL_DYES.map((dye, idx) => (
                    <div 
                      key={idx}
                      className={`botanical-pill ${activeDye === idx ? "active" : ""}`}
                      onClick={() => setActiveDye(activeDye === idx ? null : idx)}
                    >
                      <div className="botanical-top">
                        <span className="b-name">{dye.name}</span>
                        <span className="b-shade">{dye.shade}</span>
                      </div>
                      <p className="b-process">{dye.process}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "anatomy" && (
                <div className="tab-anatomy-box">
                  <div className="anatomy-row">
                    <span className="a-title">PITLOOM REED STRIKE</span>
                    <p className="a-desc">The artisan uses foot pedals sunk into an earth pit to control the warp shed, passing a wooden boat shuttle manually across the fabric width.</p>
                  </div>
                  <div className="anatomy-row">
                    <span className="a-title">SUBCONTINENTAL YARN REFINEMENT</span>
                    <p className="a-desc">Yarns are washed in alkaline river beds and conditioned with organic castor starch to strengthen natural tensile fibers before warping.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
