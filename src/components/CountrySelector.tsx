import React, { useState, useRef, useEffect } from 'react';
import { getStoredCartId, clearStoredCartId } from '../lib/shopify';

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
    // Clear old cart so a fresh one is created in the correct market/currency
    clearStoredCartId();
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div ref={wrapperRef} className="country-selector-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', marginRight: '4px' }}>
      <button 
        className="country-toggle-btn nav-icon nav-action-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Country"
        title="Select Country"
      >
        <img 
          src={`https://flagcdn.com/w40/${currentRegion.flag}.png`} 
          alt={currentRegion.name} 
          style={{ width: '24px', height: '18px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.2)' }}
        />
        <span className="country-name-text">
          {currentRegion.name}
        </span>
        <svg 
          className="country-chevron"
          width="10" 
          height="10" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="country-dropdown-menu">
          {REGIONS.map(r => (
            <button
              key={r.code}
              onClick={() => handleSelect(r.code)}
              className={`country-dropdown-item ${currentCode === r.code ? 'active' : ''}`}
            >
              <img 
                src={`https://flagcdn.com/w40/${r.flag}.png`} 
                alt={r.name} 
                style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.15)' }}
              />
              <span style={{ fontWeight: currentCode === r.code ? 700 : 500 }}>
                {r.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
