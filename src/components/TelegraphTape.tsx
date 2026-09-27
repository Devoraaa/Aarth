import React from "react";

const TAPE_MESSAGES = [
  { label: "AARTH ATELIER", text: "Handloomed in Gujarat, tailored in London" },
  { label: "HERITAGE CRAFT", text: "Ancestral handlooms revived" },
  { label: "NEW DISPATCH", text: "Autumn collection — limited lots available" },
  { label: "MAYFAIR ✦ CALCUTTA", text: "Two cities, one thread" },
  { label: "KHADI REGISTRY", text: "All cloth hand-spun on pedal looms" },
  { label: "WEST END ATELIER", text: "Subcontinental silhouettes, artisanal tailoring" },
  { label: "WIRE REPORT", text: "Free shipping on orders above £85" },
];

export const TelegraphTape: React.FC = () => {
  // Duplicate for seamless loop
  const items = [...TAPE_MESSAGES, ...TAPE_MESSAGES];

  return (
    <div className="telegraph-tape-outer" aria-hidden="true">
      <div className="telegraph-tape-track">
        {items.map((item, i) => (
          <span className="telegraph-item" key={i}>
            <strong>{item.label}</strong>
            <span className="sep">—</span>
            {item.text}
            <span className="sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};
