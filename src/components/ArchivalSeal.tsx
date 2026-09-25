import React, { useEffect, useState } from "react";

export const ArchivalSeal: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      setRotation((prev) => prev + delta * 0.35);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="archival-seal-container"
      onClick={handleClick}
      title="AARTH Archival Seal • Scroll to Collection"
      role="button"
      tabIndex={0}
    >
      <div
        className="archival-seal-disc"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg viewBox="0 0 160 160" className="archival-seal-svg">
          <defs>
            <path
              id="sealCirclePath"
              d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
            />
          </defs>

          {/* Outer fine border rings */}
          <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="80" cy="80" r="72" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
          <circle cx="80" cy="80" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />

          {/* Circular Text */}
          <text className="seal-text" fill="currentColor">
            <textPath href="#sealCirclePath" startOffset="0%">
              ✦ AARTH ATELIER ✦ EST. 2026 ✦ THE LIVING LOOM ✦ LONDON & GUJARAT ✦
            </textPath>
          </text>
        </svg>
      </div>

      {/* Static Center Core with Antique Monogram */}
      <div className="archival-seal-center">
        <span className="seal-monogram">A</span>
        <span className="seal-flourish">❦</span>
      </div>
    </div>
  );
};
