import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<"default" | "pointer">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop / devices with a mouse
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Instant 1:1 hardware-speed transform update without React re-render lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const productCard = target.closest(".product-item");
      const clickable = target.closest("button, a, input, select, textarea, .nav-link, .nav-icon, .clickable, [role='button']");

      if (clickable || productCard) {
        setHoverState("pointer");
      } else {
        setHoverState("default");
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      <div
        ref={cursorRef}
        className={`peacock-cursor-feather ${hoverState !== "default" ? "hovered" : ""}`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <img
          src="/assets/peacock-feather-cursor.png"
          alt="Peacock Feather Cursor"
          className="peacock-feather-img"
        />
      </div>
    </div>
  );
};
