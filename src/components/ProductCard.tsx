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

  const tagNum = `LOT NO. ${romanNumerals[index] || index + 1}`;
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

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

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
      className={`product-item edwardian-lot-card burnt-torn-card ${isHovered ? "card-hovered" : ""}`}
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
      {/* Scorched / Burnt Corner Marks (jala hua) */}
      <div className="card-burn-scorch scorch-top-right" aria-hidden="true" />
      <div className="card-burn-scorch scorch-bottom-left" aria-hidden="true" />

      {/* Torn Paper Deckled Edge Notches (phata hua) */}
      <div className="card-torn-notch notch-1" aria-hidden="true" />
      <div className="card-torn-notch notch-2" aria-hidden="true" />

      {/* Faint Diagonal Crease / Fold Mark */}
      <div className="card-aged-crease" aria-hidden="true" />

      <div className="lot-mount-inner">
        <div className="product-image-box">
          <span className="product-lot-tag">{tagNum}</span>

          {/* 1906 Corner Mount Brackets */}
          <span className="plate-corner top-left">⌜</span>
          <span className="plate-corner top-right">⌝</span>
          <span className="plate-corner bottom-left">⌞</span>
          <span className="plate-corner bottom-right">⌟</span>

          {/* Primary Front Plate Image */}
          <img
            src={frontImg}
            alt={product.title}
            loading="lazy"
            className={`product-primary-img ${backImg && isHovered ? "has-flip" : ""}`}
          />

          {/* Secondary Editorial Plate Image */}
          {backImg && (
            <img
              src={backImg}
              alt={`${product.title} Alternate View`}
              loading="lazy"
              className={`product-secondary-img ${isHovered ? "is-visible" : ""}`}
            />
          )}

          {/* Charred Perimeter Vignette Overlay */}
          <div className="charred-vignette-overlay" aria-hidden="true" />

          {/* Fine Linen Sheen on Hover */}
          <div
            className="product-card-glare"
            style={{
              opacity: isHovered ? 0.22 : 0,
              transform: `translate(${tilt.y * 2.5}px, ${tilt.x * 2.5}px)`,
            }}
          />

          <div className="product-card-quick-actions">
            <button
              className="btn-card-quick-add"
              disabled={loading}
              onClick={(e) => onQuickAdd(e, product)}
            >
              <span>ACQUIRE LOT ☞</span>
            </button>
          </div>
        </div>

        <div className="lot-entry-meta">
          <div className="lot-provenance-line">{edition}</div>
          <h3 className="lot-title">{product.title}</h3>
          <div className="lot-price-row">
            <span className="lot-price-val">{formattedPrice}</span>
            <span className="lot-hallmark">MDCCCCVI</span>
          </div>
        </div>
      </div>
    </article>
  );
};
