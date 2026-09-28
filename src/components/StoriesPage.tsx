import React, { useState, useEffect } from 'react';
import type { ShopifyProduct } from '../lib/shopify';

interface StoriesPageProps {
  products: ShopifyProduct[];
  initialProductId: string;
  onBack: () => void;
}

export function StoriesPage({ products, initialProductId, onBack }: StoriesPageProps) {
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

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      if (currentProductIndex > 0) {
        setCurrentProductIndex(prev => prev - 1);
        // Note: setting to slide 0 of prev product is standard Instagram behavior when going back
      }
    }
  };

  const bgPc = product.storyBgPc || '/assets/default-bg.jpg'; 
  const bgMobile = product.storyBgMobile || bgPc;
  const currentImage = product.images[currentSlide]?.url || product.images[0]?.url;
  const currentText = storyTexts[currentSlide];

  return (
    <div className="story-viewer-container" style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#000' }}>
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
        .story-text-box {
          position: absolute;
          width: 320px;
          background: rgba(247, 242, 233, 0.95);
          padding: 24px;
          border: 1px solid var(--border-antique);
          font-family: var(--font-serif);
          font-size: 16px;
          color: #111;
          line-height: 1.5;
          z-index: 10;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .story-text-box.pos-0 { top: 80px; right: calc(50% + 220px); left: auto; bottom: auto; }
        .story-text-box.pos-1 { top: auto; right: calc(50% + 220px); left: auto; bottom: 80px; }
        .story-text-box.pos-2 { top: auto; left: calc(50% + 220px); right: auto; bottom: 80px; }
        .story-text-box.pos-3 { top: 80px; left: calc(50% + 220px); right: auto; bottom: auto; }
        
        @media (max-width: 768px) {
          .story-text-box, .story-text-box.pos-0, .story-text-box.pos-1, .story-text-box.pos-2, .story-text-box.pos-3 {
            top: auto !important;
            bottom: 40px !important;
            left: 20px !important;
            right: 20px !important;
            width: auto !important;
            font-size: 14px !important;
          }
        }
        .story-progress-container {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          gap: 6px;
          z-index: 20;
        }
        .story-progress-bar {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
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
      `}</style>

      {/* Background */}
      <div className="story-bg" />

      {/* Close Button */}
      <button 
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '30px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 50,
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        ×
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

      {/* Center Product Image */}
      <div style={{
        position: 'absolute',
        inset: '60px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <img 
          src={currentImage} 
          alt={product.title}
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
          }}
        />
      </div>

      {/* Story Text Box */}
      {currentText && (
        <div className={`story-text-box pos-${currentSlide % 4}`}>
          <div className="royal-story-text">
            {currentText}
          </div>
        </div>
      )}
    </div>
  );
}
