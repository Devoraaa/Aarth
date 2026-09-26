import React, { useState, useRef } from "react";

interface SpecimenData {
  id: string;
  plateNum: string;
  title: string;
  subTitle: string;
  origin: string;
  image: string;
  gsm: string;
  craftHours: string;
  dyeRitual: string;
  warpWeft: string;
  drapeType: string;
  description: string;
  matchingHandle: string;
}

const specimens: SpecimenData[] = [
  {
    id: "spec-1",
    plateNum: "SPECIMEN № 01",
    title: "Raw Pitloom Tussar Silk",
    subTitle: "Hand-Reeled Coarse Filament",
    origin: "Bhagalpur, Bihar",
    image: "/assets/product-1.jpg",
    gsm: "240 GSM",
    craftHours: "34 Hours on Frame",
    dyeRitual: "Sun-Dried Harda & Raw Cacao Pods",
    warpWeft: "Pure Tussar Warp • Wild Cocoons Weft",
    drapeType: "Sculpted & Structured",
    description: "Spun from wild cocoons gathered in the deciduous forests of eastern India. Because the silk is hand-reeled rather than boiled uniformly, natural slubs remain intact, allowing the fabric to capture ambient light with an organic, matte sheen.",
    matchingHandle: "cacao-handloom-raw-silk-kurta",
  },
  {
    id: "spec-2",
    plateNum: "SPECIMEN № 02",
    title: "Mud-Resist Dabu Khadi",
    subTitle: "Teak Block Mud Imprint",
    origin: "Bagru, Rajasthan",
    image: "/assets/product-2.jpg",
    gsm: "185 GSM",
    craftHours: "28 Hours on Frame",
    dyeRitual: "Fermented Indigo & Black River Clay",
    warpWeft: "Hand-Spun Rainfed Cotton",
    drapeType: "Supple & Breathable",
    description: "An ancient mud-resist technique wherein clay, lime, and gum are stamped onto hand-loomed cotton using teak blocks. The fabric is steeped in subterranean indigo pits, creating a deep, living blue-black hue that breathes in high summer.",
    matchingHandle: "taupe-block-print-artisanal-kimono",
  },
  {
    id: "spec-3",
    plateNum: "SPECIMEN № 03",
    title: "Gossamer Pearl Chanderi",
    subTitle: "Ethereal Court Drapery",
    origin: "Chanderi, Madhya Pradesh",
    image: "/assets/product-3.jpg",
    gsm: "95 GSM",
    craftHours: "42 Hours on Frame",
    dyeRitual: "Unbleached Botanical Wash",
    warpWeft: "Degummed Silk • Fine Cotton Blend",
    drapeType: "Translucent & Flowing",
    description: "Historically commissioned for royal courts across Central India. Woven using an exacting ratio of degummed silk warp and whisper-fine cotton weft, yielding a semi-translucent textile that drapes like mist over tailored trousers.",
    matchingHandle: "pearl-pleated-chanderi-tunic",
  },
  {
    id: "spec-4",
    plateNum: "SPECIMEN № 04",
    title: "Iron-Vat Fermented Khadi",
    subTitle: "Rusted Iron & Jaggery Tannin",
    origin: "Kutch, Gujarat",
    image: "/assets/product-4.jpg",
    gsm: "275 GSM",
    craftHours: "38 Hours on Frame",
    dyeRitual: "48-Hour Iron Scrap & Jaggery Vat",
    warpWeft: "Indigenous Organic Cotton",
    drapeType: "Architectural & Weighted",
    description: "Scrap horseshoe iron and jaggery sugar are sealed in underground terracotta vessels to ferment for weeks. The resulting tannin imbues indigenous cotton fibers with an indelible deep leather tone that matures and softens over years of wear.",
    matchingHandle: "leather-dyed-relaxed-trousers",
  },
];

export const TactileDossier: React.FC = () => {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [lightMode, setLightMode] = useState<"natural" | "amber">("natural");
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [isHoveringLens, setIsHoveringLens] = useState(false);
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const activeSpec = specimens[activeSpecIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgBoxRef.current) return;
    const rect = imgBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });
  };

  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="tactile-dossier-section" id="textile-dossier">
      <div className="container-wide">
        {/* Section Header */}
        <header className="section-header-antique">
          <div className="section-header-flourish">❦ — ✦ — ❧</div>
          <div className="section-eyebrow">Archival Material Index • Vol. 01</div>
          <h2 className="section-title">The Weaver’s Ledger</h2>
          <p className="section-subtitle-antique">
            Before a silhouette is drafted, its spirit is loomed on a wooden frame. Touch any specimen below to inspect fiber density, botanical dye, and weave grain.
          </p>
          <div className="section-divider-line">
            <span />
            <i>Touch Specimen to Inspect Grain</i>
            <span />
          </div>
        </header>

        {/* Specimen Index Selector Bar */}
        <div className="dossier-tabs-bar" role="tablist">
          {specimens.map((spec, idx) => (
            <button
              key={spec.id}
              role="tab"
              aria-selected={activeSpecIndex === idx}
              className={`dossier-tab-btn ${activeSpecIndex === idx ? "active" : ""}`}
              onClick={() => setActiveSpecIndex(idx)}
            >
              <div className="tab-plate-tag">{spec.plateNum}</div>
              <div className="tab-title-text">{spec.title}</div>
              <div className="tab-origin-sub">{spec.origin}</div>
              {activeSpecIndex === idx && <span className="tab-active-stitch" aria-hidden="true" />}
            </button>
          ))}
        </div>

        {/* Interactive Specimen Inspection Workbench */}
        <div className={`dossier-workbench light-${lightMode}`}>
          {/* Left Column: Interactive Macro Texture Loupe */}
          <div className="workbench-media-col">
            <div
              ref={imgBoxRef}
              className="workbench-img-frame"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringLens(true)}
              onMouseLeave={() => setIsHoveringLens(false)}
            >
              <img
                src={activeSpec.image}
                alt={activeSpec.title}
                className="workbench-specimen-img"
              />

              {/* Dynamic Interactive Magnifier Loupe */}
              {isHoveringLens && (
                <div
                  className="interactive-magnifier-lens"
                  style={{
                    left: `${lensPos.x}%`,
                    top: `${lensPos.y}%`,
                    backgroundImage: `url(${activeSpec.image})`,
                    backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                  }}
                >
                  <span className="lens-crosshair" />
                  <span className="lens-mag-tag">2.5× WEAVE ZOOM</span>
                </div>
              )}

              {/* Light Atmosphere Switcher */}
              <div className="workbench-light-controls" onClick={(e) => e.stopPropagation()}>
                <span className="light-ctl-label">ATMOSPHERE:</span>
                <button
                  className={`light-btn ${lightMode === "natural" ? "active" : ""}`}
                  onClick={() => setLightMode("natural")}
                >
                  LONDON DAYLIGHT
                </button>
                <button
                  className={`light-btn ${lightMode === "amber" ? "active" : ""}`}
                  onClick={() => setLightMode("amber")}
                >
                  ATELIER AMBER
                </button>
              </div>

              {/* Corner Registration Elements */}
              <span className="workbench-corner top-left">⌜</span>
              <span className="workbench-corner top-right">⌝</span>
              <span className="workbench-corner bottom-left">⌞</span>
              <span className="workbench-corner bottom-right">⌟</span>
            </div>

            <div className="workbench-hint">
              <span>✦ Hover over fabric to activate 2.5× optical grain inspection</span>
            </div>
          </div>

          {/* Right Column: Archival Ledger Specifications */}
          <div className="workbench-spec-col">
            <div className="spec-card-inner">
              <div className="spec-header-row">
                <span className="spec-plate-badge">{activeSpec.plateNum}</span>
                <span className="spec-verified-guild">VERIFIED HANDLOOM</span>
              </div>

              <h3 className="spec-headline">{activeSpec.title}</h3>
              <span className="spec-subline">{activeSpec.subTitle} • {activeSpec.origin}</span>

              <p className="spec-narrative">{activeSpec.description}</p>

              {/* Detailed Technical Grid */}
              <div className="spec-data-table">
                <div className="data-row">
                  <span className="data-key">FABRIC WEIGHT (GSM)</span>
                  <span className="data-val">{activeSpec.gsm}</span>
                </div>
                <div className="data-row">
                  <span className="data-key">CRAFT DURATION</span>
                  <span className="data-val">{activeSpec.craftHours}</span>
                </div>
                <div className="data-row">
                  <span className="data-key">BOTANICAL DYE RITUAL</span>
                  <span className="data-val">{activeSpec.dyeRitual}</span>
                </div>
                <div className="data-row">
                  <span className="data-key">WARP & WEFT FORMULA</span>
                  <span className="data-val">{activeSpec.warpWeft}</span>
                </div>
                <div className="data-row">
                  <span className="data-key">DRAPE ARCHITECTURE</span>
                  <span className="data-val">{activeSpec.drapeType}</span>
                </div>
              </div>

              {/* Direct Link to Collection */}
              <div className="spec-footer-action">
                <button className="btn-explore-weave" onClick={scrollToCollection}>
                  <span>EXPLORE SILHOUETTES IN THIS WEAVE ↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
