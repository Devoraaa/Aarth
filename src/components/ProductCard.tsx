import React, { useRef, useState } from "react";
import type { ShopifyProduct } from "../lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
  onSelect: (product: ShopifyProduct) => void;
  onQuickAdd: (e: React.MouseEvent, product: ShopifyProduct) => void;
  loading: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onSelect,
  onQuickAdd,
  loading,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const tagNum = `№ 0${index + 1}`;
  const edition = product.tags[0] || "Living Craft • Handcrafted Edition";
  const price = product.priceRange.minVariantPrice;
  const formattedPrice = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${parseFloat(price.amount).toFixed(2)}`;

  const frontImg = product.images[0]?.url || "/assets/product-1.jpg";
  const backImg = product.images[1]?.url || null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max 5 degrees
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <article
      ref={cardRef}
      className={`product-item interactive-vintage-card ${isHovered ? "card-hovered" : ""}`}
      onClick={() => onSelect(product)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="product-image-box">
        <span className="product-number-tag">{tagNum}</span>

        {/* Vintage Corner Flourish Marks */}
        <span className="card-corner-bracket top-left">⌜</span>
        <span className="card-corner-bracket bottom-right">⌟</span>

        {/* Primary Front Image */}
        <img
          src={frontImg}
          alt={product.title}
          loading="lazy"
          className={`product-primary-img ${backImg && isHovered ? "has-flip" : ""}`}
        />

        {/* Secondary Back/Editorial Image crossfade if available */}
        {backImg && (
          <img
            src={backImg}
            alt={`${product.title} Alternate View`}
            loading="lazy"
            className={`product-secondary-img ${isHovered ? "is-visible" : ""}`}
          />
        )}

        {/* Antique subtle lens flare/glare overlay */}
        <div
          className="product-card-glare"
          style={{
            opacity: isHovered ? 0.25 : 0,
            transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
          }}
        />

        <div className="product-card-quick-actions">
          <button
            className="btn-card-quick-add"
            disabled={loading}
            onClick={(e) => onQuickAdd(e, product)}
          >
            <span>✦ Quick Add</span>
          </button>
        </div>
      </div>

      <div className="product-meta-bottom-left">
        <span className="product-edition-stamp">{edition}</span>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>
    </article>
  );
};
