import React, { useState, useEffect } from 'react';
import type { ShopifyProduct } from '../lib/shopify';

interface StoriesPageProps {
  products: ShopifyProduct[];
  initialProductId: string;
  onBack: () => void;
  onSelectProduct?: (product: ShopifyProduct) => void;
}

export function StoriesPage({ products, initialProductId, onBack, onSelectProduct }: StoriesPageProps) {
  // Find initial product index
  const initialIndex = Math.max(0, products.findIndex(p => p.id === initialProductId));
  
  const [currentProductIndex, setCurrentProductIndex] = useState(initialIndex);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync initial product change if opened with a different one
  useEffect(() => {
    const idx = Math.max(0, products.findIndex(p => p.id === initialProductId));
    setCurrentProductIndex(idx);
    setCurrentSlide(0);
  }, [initialProductId, products]);

  const product = products[currentProductIndex];

  if (!product) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  }

  const storyTexts = product.storyTexts && product.storyTexts.length > 0 
    ? product.storyTexts 
    : [product.title]; 

  const slideCount = storyTexts.length;
  const slideDuration = 5000; 

  // Reset slide when product changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [currentProductIndex]);

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < slideCount - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        // End of product's slides -> next product
        if (currentProductIndex < products.length - 1) {
          setCurrentProductIndex(prev => prev + 1);
        } else {
          // End of all stories
          clearInterval(timer);
          onBack();
        }
      }
    }, slideDuration);
    
    return () => clearInterval(timer);
  }, [slideCount, currentSlide, currentProductIndex, products.length, onBack]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentSlide < slideCount - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      if (currentProductIndex < products.length - 1) {
        setCurrentProductIndex(prev => prev + 1);
      } else {
        onBack();
      }
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      if (currentProductIndex > 0) {
        setCurrentProductIndex(prev => prev - 1);
      }
    }
  };

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStart.x - touchEndX;
    const diffY = touchStart.y - touchEndY;

    // Swipe down on phone to close stories (native Instagram gesture)
    if (diffY < -60 && Math.abs(diffY) > Math.abs(diffX) * 1.3) {
      onBack();
      setTouchStart(null);
      return;
    }

    // Horizontal swipe (left = next, right = prev)
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(null);
  };

  // Keyboard navigation for PC (Arrow keys, Spacebar, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, currentProductIndex, slideCount, products.length, onBack]);

  const bgPc = product.storyBgPc || '/assets/story-bg.jpg'; 
  const bgMobile = product.storyBgMobile || bgPc;
  const currentImage = product.images[currentSlide]?.url || product.images[0]?.url;
  const currentText = storyTexts[currentSlide];

  const price = product.priceRange?.minVariantPrice;
  const formattedPrice = price 
    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: price.currencyCode }).format(parseFloat(price.amount))
    : "";

  const formatStoryText = (text: string) => {
    if (!text) return '';
    // If the text is all uppercase mock data, format to graceful sentence case
    if (text === text.toUpperCase() && text.length > 5) {
      const lower = text.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return text;
  };

  return (
    <div 
      className="story-viewer-container" 
      style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#000', touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        .story-bg {
          position: absolute;
          inset: 0;
          background-image: url('${bgPc}');
          background-size: cover;
          background-position: center;
          filter: brightness(0.8);
          z-index: -1;
        }
        @media (max-width: 768px) {
          .story-bg {
            background-image: url('${bgMobile}');
          }
        }
        .story-stage-viewport {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 15;
          pointer-events: none;
        }

        .story-hero-wrapper {
          position: relative;
          height: 82vh;
          max-height: 720px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .story-hero-img {
          height: 100%;
          width: auto;
          max-width: 48vw;
          object-fit: contain;
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.4);
        }

        /* Completely Transparent Editorial Layout (No background box) */
        .story-editorial-column {
          position: absolute;
          width: 270px;
          background: transparent !important;
          border: none !important;
          border-left: 2.5px solid #6E4918 !important;
          padding: 4px 0 4px 18px;
          text-align: left;
          pointer-events: auto;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          animation: storyColumnFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* 4 Dedicated Corners relative to Hero Image: Top-Left, Bottom-Left, Bottom-Right, Top-Right */
        .story-editorial-column.pos-0 {
          top: 60px;
          right: calc(100% + 32px);
          left: auto;
          bottom: auto;
        }

        .story-editorial-column.pos-1 {
          bottom: 60px;
          right: calc(100% + 32px);
          left: auto;
          top: auto;
        }

        .story-editorial-column.pos-2 {
          bottom: 60px;
          left: calc(100% + 32px);
          right: auto;
          top: auto;
        }

        .story-editorial-column.pos-3 {
          top: 60px;
          left: calc(100% + 32px);
          right: auto;
          bottom: auto;
        }

        .story-column-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, 'Barlow Condensed', monospace);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6E4918;
          margin-bottom: 8px;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.95);
        }

        .story-column-dot {
          width: 4px;
          height: 4px;
          border-radius: 50% !important;
          background: #6E4918;
        }

        .story-column-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px, 2.2vw, 30px);
          font-weight: 700;
          color: #0E0A08;
          line-height: 1.2;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.98);
        }

        .story-column-price {
          font-family: var(--font-mono, 'Barlow Condensed', monospace);
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #0E0A08;
          margin-bottom: 12px;
          display: block;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.95);
        }

        .story-column-desc {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.6;
          color: #120D0A;
          margin: 0 0 18px 0;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.98), 0 0 8px rgba(255, 255, 255, 0.7);
        }

        .story-column-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          border-bottom: 2px solid #0E0A08;
          padding: 0 0 3px 0;
          font-family: var(--font-mono, 'Barlow Condensed', monospace);
          font-size: 13px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 800;
          color: #0E0A08;
          cursor: pointer;
          transition: all 0.25s ease;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.9);
        }

        .story-column-cta:hover {
          color: #6E4918;
          border-bottom-color: #6E4918;
          transform: translateX(4px);
        }

        .story-column-cta svg {
          transition: transform 0.25s ease;
        }

        .story-column-cta:hover svg {
          transform: translateX(4px);
        }

        @keyframes storyColumnFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet adjustment */
        @media (max-width: 1100px) and (min-width: 851px) {
          .story-hero-img {
            max-width: 38vw !important;
          }
          .story-editorial-column {
            width: 240px !important;
          }
          .story-editorial-column.pos-0,
          .story-editorial-column.pos-1 {
            right: calc(100% + 24px) !important;
          }
          .story-editorial-column.pos-2,
          .story-editorial-column.pos-3 {
            left: calc(100% + 24px) !important;
          }
        }

        /* Complete Mobile Experience */
        @media (max-width: 850px) {
          .story-stage-viewport {
            inset: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            padding-top: max(54px, calc(env(safe-area-inset-top, 0px) + 38px)) !important;
            padding-bottom: 0 !important;
            pointer-events: none !important;
          }

          .story-hero-wrapper {
            height: auto !important;
            max-height: 48vh !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .story-hero-img {
            max-height: 46vh !important;
            max-width: 84vw !important;
            width: auto !important;
            height: auto !important;
            object-fit: contain !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35) !important;
          }

          .story-editorial-column,
          .story-editorial-column.pos-0,
          .story-editorial-column.pos-1,
          .story-editorial-column.pos-2,
          .story-editorial-column.pos-3 {
            position: fixed !important;
            top: auto !important;
            bottom: max(24px, calc(env(safe-area-inset-bottom, 0px) + 18px)) !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: min(310px, calc(100vw - 64px)) !important;
            max-width: 90vw !important;
            border: none !important;
            border-left: none !important;
            padding: 0 !important;
            background: transparent !important;
            text-align: center !important;
            z-index: 30 !important;
            pointer-events: auto !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            animation: storyMobileSlideUp 0.35s ease both !important;
          }

          @keyframes storyMobileSlideUp {
            from {
              opacity: 0;
              transform: translate(-50%, 12px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }

          .story-column-eyebrow {
            justify-content: center !important;
            font-size: 11px !important;
            margin-bottom: 4px !important;
            letter-spacing: 0.18em !important;
          }

          .story-column-title {
            text-align: center !important;
            font-size: 22px !important;
            margin-bottom: 4px !important;
            line-height: 1.15 !important;
          }

          .story-column-price {
            text-align: center !important;
            font-size: 15.5px !important;
            margin-bottom: 8px !important;
          }

          .story-column-desc {
            text-align: center !important;
            font-size: 14px !important;
            line-height: 1.48 !important;
            margin: 0 auto 14px auto !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }

          .story-column-cta {
            margin: 0 auto !important;
            display: inline-flex !important;
            justify-content: center !important;
            font-size: 12px !important;
            letter-spacing: 0.18em !important;
            padding-bottom: 2px !important;
          }
        }

        .story-progress-container {
          position: absolute;
          top: max(14px, env(safe-area-inset-top, 14px));
          left: 16px;
          right: 16px;
          display: flex;
          gap: 6px;
          z-index: 40;
        }

        .story-progress-bar {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 2px;
          overflow: hidden;
        }

        .story-progress-fill {
          height: 100%;
          background: #fff;
          width: 0%;
        }

        .story-progress-fill.active {
          animation: fillProgress 5s linear forwards;
        }

        .story-progress-fill.completed {
          width: 100%;
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .story-close-btn {
          position: absolute;
          top: max(22px, env(safe-area-inset-top, 22px));
          right: 18px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(14, 10, 8, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #F8F5EE;
          cursor: pointer;
          z-index: 60;
          transition: all 0.25s ease;
        }
        .story-close-btn:hover {
          background: #6E4918;
          color: #fff;
          transform: rotate(90deg) scale(1.05);
        }
      `}</style>

      {/* Background */}
      <div className="story-bg" />

      {/* Close Button */}
      <button 
        onClick={onBack}
        className="story-close-btn"
        aria-label="Close stories"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Progress Bars */}
      <div className="story-progress-container">
        {Array.from({ length: slideCount }).map((_, idx) => (
          <div key={idx} className="story-progress-bar">
            <div 
              key={`${idx}-${currentSlide === idx ? 'active' : ''}`}
              className={`story-progress-fill ${idx < currentSlide ? 'completed' : idx === currentSlide ? 'active' : ''}`} 
            />
          </div>
        ))}
      </div>

      {/* Navigation Areas */}
      <div 
        onClick={handlePrev} 
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '30%', zIndex: 20, cursor: 'w-resize' }} 
      />
      <div 
        onClick={handleNext} 
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '30%', zIndex: 20, cursor: 'e-resize' }} 
      />

      {/* Staged Story Showcase: Hero Image with perfectly docked Archival Card */}
      <div className="story-stage-viewport">
        <div className="story-hero-wrapper">
          <img 
            src={currentImage} 
            alt={product.title}
            className="story-hero-img"
          />

          {/* Background-Free Editorial Column in 4 Corners (Top-Left, Bottom-Left, Bottom-Right, Top-Right) */}
          {currentText && (
            <div key={currentSlide} className={`story-editorial-column pos-${currentSlide % 4}`}>
              <div className="story-column-eyebrow">
                <span>0{currentSlide + 1} / 0{slideCount}</span>
                <span className="story-column-dot" />
                <span>ARCHIVE RECORD</span>
              </div>

              <h2 className="story-column-title">
                {product.title}
              </h2>

              {formattedPrice && (
                <div className="story-column-price">
                  {formattedPrice}
                </div>
              )}

              <p className="story-column-desc">
                {formatStoryText(currentText)}
              </p>

              <button 
                type="button" 
                className="story-column-cta"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectProduct) onSelectProduct(product);
                  else onBack();
                }}
              >
                <span>DISCOVER PIECE</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
