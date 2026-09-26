import React, { useEffect, useState } from "react";

export const AtelierDock: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollPercent(current);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`atelier-dock-container ${isExpanded ? "expanded" : ""}`}>
      {/* Expanded Quick Craft Inspection Card */}
      {isExpanded && (
        <div className="atelier-dock-expanded-card">
          <div className="dock-expanded-header">
            <span className="dock-tag-mono">✦ ARCHIVAL RECORD 01</span>
            <button
              className="dock-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              aria-label="Close atelier record"
            >
              ✕
            </button>
          </div>
          <div className="dock-expanded-body">
            <div className="dock-stat-row">
              <span className="stat-label">SILHOUETTES</span>
              <span className="stat-val">Structured Handloom</span>
            </div>
            <div className="dock-stat-row">
              <span className="stat-label">ORIGIN</span>
              <span className="stat-val">Gujarat & London</span>
            </div>
            <div className="dock-stat-row">
              <span className="stat-label">PROGRESS</span>
              <span className="stat-val">{scrollPercent}% READ</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom-Right Floating Badge Bar */}
      <div className="atelier-dock-bar" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="dock-left-indicator">
          <span className="dock-pulse-dot" />
          <span className="dock-mono-text">AARTH ARCHIVE [{scrollPercent}%]</span>
        </div>

        <button
          className="dock-top-btn"
          onClick={(e) => {
            e.stopPropagation();
            scrollToTop();
          }}
          title="Scroll to Top of Atelier"
        >
          <span>TOP ↑</span>
        </button>
      </div>
    </div>
  );
};
