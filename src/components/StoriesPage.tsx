import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STORY_PRODUCTS = [
  { id: 1, src: '/assets/tshirt_vintage_v2.jpg', title: 'Vintage Mud-Resist Tee', fitStyle: 'Relaxed' },
  { id: 2, src: '/assets/shirt_linen_v2.jpg', title: 'Classic Beige Linen Shirt', fitStyle: 'Tailored' },
  { id: 3, src: '/assets/kurta_black_v2.jpg', title: 'Modern Onyx Short Kurta', fitStyle: 'Structured' }
];

interface StoriesPageProps {
  onBack: () => void;
}

export function StoriesPage({ onBack }: StoriesPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: `${STORY_PRODUCTS.length * 150}vh`, 
        backgroundColor: '#fbf9f4', 
        position: 'relative' 
      }}
    >
      <div style={{ padding: '2rem 4rem', position: 'fixed', top: '80px', left: 0, zIndex: 60 }}>
        <button 
          onClick={onBack}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px',
            letterSpacing: '0.12em',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '10px 0',
            borderBottom: '1px solid #242220',
            textTransform: 'uppercase',
            color: '#242220'
          }}
        >
          <span>←</span>
          <span>RETURN TO ARCHIVE</span>
        </button>
      </div>

      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        
        {/* The Human Model (Fixed Center) */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '550px', 
          height: '550px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 10
        }}>
          {/* Base Model Torso - MixBlendMode makes white BG disappear into the page color */}
          <img 
            src="/assets/male_model_torso.jpg" 
            alt="Model" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain', 
              mixBlendMode: 'multiply',
              filter: 'brightness(1.05) contrast(1.1) sepia(0.1)'
            }} 
          />
          
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '10px', 
            letterSpacing: '0.2em', 
            color: '#736558', 
            textTransform: 'uppercase' 
          }}>
            Bespoke Form
          </div>
        </div>

        {/* The Products (Scrolling in and out) overlaying the model */}
        {STORY_PRODUCTS.map((product, i) => {
          const phase = 1 / STORY_PRODUCTS.length;
          const start = i * phase;
          const end = start + phase;
          const holdStart = start + (phase * 0.25);
          const holdEnd = end - (phase * 0.25);

          // Animate from right (100vw) to center (0), then left (-100vw)
          const x = useTransform(
            scrollYProgress,
            [start, holdStart, holdEnd, end],
            ['100vw', '0vw', '0vw', '-100vw']
          );
          const opacity = useTransform(
            scrollYProgress,
            [start, holdStart, holdEnd, end],
            [0, 1, 1, 0]
          );

          // Sub-text animations
          const textY = useTransform(
            scrollYProgress,
            [start, holdStart, holdEnd, end],
            [30, 0, 0, 30]
          );
          const textOpacity = useTransform(
            scrollYProgress,
            [start, holdStart, holdEnd, end],
            [0, 1, 1, 0]
          );

          return (
            <div 
              key={product.id}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                zIndex: 20
              }}
            >
              <motion.div
                style={{
                  position: 'relative',
                  width: '550px',
                  height: '550px',
                  x,
                  opacity,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={product.src} 
                  alt={product.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    mixBlendMode: 'multiply', // Makes white BG disappear and blends over the model
                    transform: 'scale(0.55) translateY(25px)', // Crucial: Scales the massive flat-lay shirt to match the width of the human model's shoulders, and shifts it down to align the neck.
                    filter: 'brightness(1.05) contrast(1.1)'
                  }} 
                />
                
                {/* Product label that floats above the image */}
                <motion.div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '20px',
                  y: textY,
                  opacity: textOpacity,
                  background: '#f7f2e9',
                  padding: '12px 20px',
                  border: '1px solid #242220',
                  textAlign: 'left',
                  width: '180px'
                }}>
                  <div style={{ 
                    fontFamily: 'var(--font-serif)', 
                    fontSize: '15px', 
                    color: '#242220', 
                    marginBottom: '6px' 
                  }}>
                    {product.title}
                  </div>
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '9px', 
                    letterSpacing: '0.15em', 
                    color: '#736558', 
                    textTransform: 'uppercase' 
                  }}>
                    Style: {product.fitStyle}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
        
        {/* Vintage vignette overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle, transparent 40%, rgba(36, 34, 32, 0.15) 100%)',
          pointerEvents: 'none',
          zIndex: 30
        }} />
      </div>

      {/* Vertical Progress indicator line */}
      <motion.div style={{
        position: 'fixed',
        bottom: '45px',
        left: '50%',
        marginLeft: '-1px',
        width: '2px',
        height: '60px',
        background: 'rgba(36, 34, 32, 0.15)',
        overflow: 'hidden',
        zIndex: 50
      }}>
        <motion.div style={{
          width: '100%',
          height: '100%',
          background: '#242220',
          originY: 0,
          scaleY: scrollYProgress
        }} />
      </motion.div>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '9.5px',
        letterSpacing: '0.25em',
        color: '#242220',
        zIndex: 50,
        textTransform: 'uppercase',
        fontWeight: 600
      }}>
        Scroll to Fit
      </div>
    </div>
  );
}

