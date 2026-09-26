import React, { useEffect, useState, useRef } from "react";

export const AtelierDock: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isReeling, setIsReeling] = useState(false);
  
  // Audio Context for Web Audio API Pitloom Wood Click
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSoundTimeRef = useRef<number>(0);

  // Play subtle organic wooden shuttle acoustic click on scroll if sound enabled
  const playShuttleClick = (pitch = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      
      const now = ctx.currentTime;
      // Rate-limit clicks to avoid harsh audio overlap
      if (now - lastSoundTimeRef.current < 0.12) return;
      lastSoundTimeRef.current = now;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // Audio context fallback
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollPercent(current);
        playShuttleClick(320 + current * 2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [soundEnabled]);

  const scrollToTop = () => {
    setIsReeling(true);
    playShuttleClick(600);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setIsReeling(false);
    }, 700);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playShuttleClick(520);
    }
  };

  const yarnMeters = ((scrollPercent / 100) * 8.4).toFixed(1);

  return (
    <div className={`atelier-dock-container ${isExpanded ? "expanded" : ""}`}>
      {/* Expanded Interactive Craft Console */}
      {isExpanded && (
        <div className="atelier-dock-expanded-card">
          <div className="dock-expanded-header">
            <div className="dock-header-title">
              <span className="dock-symbol">✦</span>
              <span className="dock-tag-mono">PITLOOM CONSOLE • SPEC 04</span>
            </div>
            <button
              className="dock-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              aria-label="Close atelier console"
            >
              ✕
            </button>
          </div>

          <div className="dock-expanded-body">
            <div className="dock-stat-row">
              <span className="stat-label">YARN SPUN</span>
              <span className="stat-val highlight">{yarnMeters} METERS</span>
            </div>
            <div className="dock-stat-row">
              <span className="stat-label">WEAVE PROGRESS</span>
              <span className="stat-val">{scrollPercent}% WOVEN</span>
            </div>
            <div className="dock-stat-row">
              <span className="stat-label">CRAFT ORIGIN</span>
              <span className="stat-val">Bhagalpur & London</span>
            </div>
            <div className="dock-stat-row">
              <span className="stat-label">GUILD VERIFIED</span>
              <span className="stat-val badge">EST. 2026</span>
            </div>

            {/* Interactive Soundscape Toggle */}
            <div className="dock-sound-toggle-row" onClick={toggleSound}>
              <span className="stat-label">SHUTTLE SOUND</span>
              <button className={`dock-toggle-pill ${soundEnabled ? "active" : ""}`}>
                <span>{soundEnabled ? "ACOUSTIC ON 🔊" : "MUTED 🔇"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Craft Dock Bar */}
      <div className="atelier-dock-bar" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Animated Loom Gear Spool Icon */}
        <div className="dock-spool-wrapper">
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            className={`dock-loom-spool ${isReeling ? "reeling" : ""}`}
            style={{ transform: `rotate(${scrollPercent * 3.6}deg)` }}
          >
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Live Thread Indicator & Metric */}
        <div className="dock-left-indicator">
          <div className="dock-thread-gauge">
            <div className="dock-thread-fill" style={{ width: `${scrollPercent}%` }} />
          </div>
          <span className="dock-mono-text">
            LOOM [{scrollPercent}%] • {yarnMeters}m
          </span>
        </div>

        {/* Rapid Reel-In Top Scroll Button */}
        <button
          className="dock-top-btn"
          onClick={(e) => {
            e.stopPropagation();
            scrollToTop();
          }}
          title="Reel thread to top"
        >
          <span>REEL TOP ↑</span>
        </button>
      </div>
    </div>
  );
};
