import React, { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
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
  const { cart } = useCart();

  const price = product.priceRange.minVariantPrice;
  const formattedPrice = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${parseFloat(price.amount).toFixed(2)}`;

  
  const variantId = product.variants?.[0]?.id || product.id;
  const cartItem = cart?.lines?.find((item: any) => item.merchandise.id === variantId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

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
        position: "relative",
        zIndex: 10,
        backgroundColor: "#f7f2e9",
        backgroundImage: "url('/assets/new-paper.png')",
        backgroundRepeat: "repeat",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="product-image-box">

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

      </div>

      {/* Product Meta Section - Redesigned */}
      <div className="product-meta-content new-meta-layout">
        <div className="product-meta-left">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-price-val">{formattedPrice}</span>
        </div>
        <div className="product-meta-right">
          <button 
             className="btn-card-quick-add-icon"
             disabled={loading}
             onClick={(e) => onQuickAdd(e, product)}
             title="Add to Cart"
          >
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
             </svg>
             {quantityInCart > 0 && (
                <span className="qty-badge">
                  {quantityInCart}
                </span>
             )}
          </button>
        </div>
      </div>
    </article>
  );
};

