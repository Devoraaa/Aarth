import React, { useRef, useState } from "react";
import type { ShopifyProduct } from "../lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
  onSelect: (product: ShopifyProduct) => void;
  onQuickAdd: (e: React.MouseEvent, product: ShopifyProduct) => void;
  loading: boolean;
}

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

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

  const tagNum = `LOT ${romanNumerals[index] || index + 1}`;
  const edition = product.tags[0] || "PROVENANCE VERIFIED • ANNO MDCCCCVI";
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

    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

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
      className={`product-item luxury-atelier-card ${isHovered ? "card-hovered" : ""}`}
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
        {/* Lot Tag Badge */}
        <span className="product-lot-tag">{tagNum}</span>

        {/* Primary Front Plate Image */}
        <img
          src={frontImg}
          alt={product.title}
          loading="lazy"
          className={`product-primary-img ${backImg && isHovered ? "has-flip" : ""}`}
        />

        {/* Secondary Editorial Back Plate Image on Hover */}
        {backImg && (
          <img
            src={backImg}
            alt={`${product.title} Back View`}
            loading="lazy"
            className={`product-secondary-img ${isHovered ? "is-visible" : ""}`}
          />
        )}

        {/* Quick Add Overlay Button inside photo bottom */}
        <div className="product-card-quick-actions">
          <button
            className="btn-card-quick-add"
            disabled={loading}
            onClick={(e) => onQuickAdd(e, product)}
          >
            <span>✦ QUICK ACQUIRE</span>
          </button>
        </div>
      </div>

      {/* Product Meta Section */}
      <div className="product-meta-content">
        <div className="product-provenance-tag">{edition}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price-row">
          <span className="product-price-val">{formattedPrice}</span>
          <span className="product-hallmark-stamp">MDCCCCVI</span>
        </div>
      </div>
    </article>
  );
};
