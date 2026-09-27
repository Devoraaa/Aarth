import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        .aarth-custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          pointer-events: none;
          z-index: 2147483647; /* Max z-index */
          transition: opacity 0.15s ease;
          will-change: transform;
        }
        @media (max-width: 768px) {
          /* Do not use custom cursor on mobile touch devices */
          * {
            cursor: auto !important;
          }
          .aarth-custom-cursor {
            display: none !important;
          }
        }
      `}</style>
      <img 
        src="/assets/peacock-cursor.png" 
        alt="cursor"
        className="aarth-custom-cursor"
        style={{
          transform: `translate(calc(${pos.x}px - 14px), calc(${pos.y}px - 14px))`,
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
}
