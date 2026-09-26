import React, { useEffect, useState } from "react";

export const VintageAtmosphere: React.FC = () => {
  // Dust particles array
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate 32 randomized dust particles
    const items = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1.2,
      delay: Math.random() * 8,
      duration: Math.random() * 14 + 10,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="vintage-atmosphere-layer" aria-hidden="true">
      {/* 1. Dust Particles & Dust Breeze */}
      <div className="dust-breeze-container">
        {particles.map((p) => (
          <span
            key={p.id}
            className="dust-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 2. Authentic Faded Iron-Gall Ink Stains (Dried decades ago, smudged into paper grain) */}
      {/* Ink Spill 1: Top Right Edge */}
      <svg className="ink-spill-svg ink-spill-1" viewBox="0 0 180 180">
        {/* Outer translucent water-bleed diffusion halo */}
        <path
          d="M56,36 Q92,14 125,40 Q156,66 145,104 Q134,136 92,146 Q54,156 39,118 Q24,78 56,36 Z"
          fill="#6E5540"
          opacity="0.08"
        />
        {/* Dried iron-gall tannin deposit core */}
        <path
          d="M60,40 Q90,20 120,45 Q150,70 140,100 Q130,130 95,140 Q60,150 45,115 Q30,80 60,40 Z"
          fill="#4D392B"
          opacity="0.18"
        />
        {/* Faded dried splatter specks */}
        <circle cx="150" cy="120" r="3.5" fill="#4D392B" opacity="0.16" />
        <circle cx="135" cy="140" r="2" fill="#4D392B" opacity="0.14" />
        <circle cx="40" cy="45" r="2.5" fill="#4D392B" opacity="0.15" />
        <circle cx="160" cy="85" r="1.5" fill="#4D392B" opacity="0.12" />
      </svg>

      {/* Ink Spill 2: Left Middle Margin */}
      <svg className="ink-spill-svg ink-spill-2" viewBox="0 0 140 140">
        {/* Outer translucent water-bleed halo */}
        <path
          d="M46,26 Q82,10 105,36 Q126,62 110,94 Q94,120 62,115 Q34,110 29,82 Q24,52 46,26 Z"
          fill="#6E5540"
          opacity="0.07"
        />
        {/* Dried iron-gall tannin core */}
        <path
          d="M50,30 Q80,15 100,40 Q120,65 105,90 Q90,115 65,110 Q40,105 35,80 Q30,55 50,30 Z"
          fill="#4D392B"
          opacity="0.17"
        />
        <circle cx="115" cy="100" r="2.8" fill="#4D392B" opacity="0.15" />
        <circle cx="125" cy="80" r="1.8" fill="#4D392B" opacity="0.12" />
        <circle cx="30" cy="95" r="2" fill="#4D392B" opacity="0.14" />
        <circle cx="45" cy="20" r="1.2" fill="#4D392B" opacity="0.11" />
      </svg>

      {/* Ink Spill 3: Lower Right Margin */}
      <svg className="ink-spill-svg ink-spill-3" viewBox="0 0 160 160">
        {/* Outer translucent water-bleed halo */}
        <path
          d="M66,30 Q114,18 130,56 Q146,98 114,125 Q82,151 51,130 Q24,108 35,66 Q45,30 66,30 Z"
          fill="#6E5540"
          opacity="0.08"
        />
        {/* Dried iron-gall tannin core */}
        <path
          d="M70,35 Q110,25 125,60 Q140,95 110,120 Q80,145 55,125 Q30,105 40,70 Q50,35 70,35 Z"
          fill="#4D392B"
          opacity="0.18"
        />
        <circle cx="140" cy="65" r="3.2" fill="#4D392B" opacity="0.15" />
        <circle cx="35" cy="50" r="2.2" fill="#4D392B" opacity="0.13" />
        <circle cx="85" cy="145" r="1.8" fill="#4D392B" opacity="0.12" />
      </svg>

      {/* 3. Random Vintage Atelier Artifacts in Background */}
      {/* Artifact A: Aged Tea / Coffee Cup Ring Stain on Parchment */}
      <div className="vintage-cup-stain" />

      {/* Artifact B: Antique Brass Tailoring Needle & Trailing Basting Thread */}
      <div className="vintage-needle-artifact">
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
          {/* Thread curve */}
          <path
            d="M 10,75 Q 35,15 70,45 T 120,20"
            stroke="#8C6D3F"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            opacity="0.65"
          />
          {/* Needle */}
          <line x1="68" y1="46" x2="115" y2="22" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" />
          <circle cx="113" cy="23" r="1.2" fill="#f7f2e9" />
        </svg>
      </div>

      {/* Artifact C: 1906 Cancelled Postal Stamp in Background */}
      <div className="vintage-cancelled-stamp">
        <div className="stamp-inner-serrated">
          <span className="stamp-postmark-date">14 OCT 1906</span>
          <span className="stamp-postmark-loc">CALCUTTA G.P.O.</span>
          <span className="stamp-val-print">ONE ANNA</span>
          {/* Wavy cancellation bars */}
          <div className="stamp-cancellation-waves" />
        </div>
      </div>

      {/* Artifact D: Faint Handwritten Cutter's Marginalia */}
      <div className="vintage-marginalia marginalia-left">
        <span>“Cut on bias • 32 in • Pure Tussar Weft”</span>
      </div>
      <div className="vintage-marginalia marginalia-right">
        <span>“Vat ferment 48 hrs • Harda tincture”</span>
      </div>
    </div>
  );
};
