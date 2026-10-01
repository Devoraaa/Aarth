import React, { useState, useRef, useEffect } from 'react';

const REGIONS = [
  { code: 'GB', flag: 'gb', name: 'UK' },
  { code: 'FR', flag: 'eu', name: 'Europe' },
  { code: 'US', flag: 'us', name: 'USA' },
  { code: 'CA', flag: 'ca', name: 'Canada' },
];

export const CountrySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const currentCode = typeof window !== 'undefined' ? (localStorage.getItem('aarth_country') || 'GB') : 'GB';
  const currentRegion = REGIONS.find(r => r.code === currentCode) || REGIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    localStorage.setItem('aarth_country', code);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div ref={wrapperRef} className="country-selector-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginRight: '8px' }}>
      <button 
        className="nav-action-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Country"
        title="Select Country"
        style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: 'none', border: 'none', padding: '0 8px' }}
      >
        <img 
          src={`https://flagcdn.com/w40/${currentRegion.flag}.png`} 
          alt={currentRegion.name} 
          style={{ width: '24px', height: '18px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.2)' }}
        />
        <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'inherit' }}>
          {currentRegion.name}
        </span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '12px',
          backgroundColor: '#f7f2e9',
          border: '1px solid #362d24',
          minWidth: '140px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {REGIONS.map(r => (
            <button
              key={r.code}
              onClick={() => handleSelect(r.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                background: currentCode === r.code ? 'rgba(54, 45, 36, 0.05)' : 'none',
                border: 'none',
                borderBottom: '1px solid rgba(54, 45, 36, 0.1)',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(54, 45, 36, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentCode === r.code ? 'rgba(54, 45, 36, 0.05)' : 'transparent'}
            >
              <img 
                src={`https://flagcdn.com/w40/${r.flag}.png`} 
                alt={r.name} 
                style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)' }}
              />
              <span style={{ 
                fontSize: '12px', 
                fontFamily: 'var(--font-mono)', 
                letterSpacing: '0.05em', 
                textTransform: 'uppercase',
                fontWeight: currentCode === r.code ? 600 : 400
              }}>
                {r.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
