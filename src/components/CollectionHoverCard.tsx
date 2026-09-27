import React from "react";
import type { ShopifyProduct } from "../lib/shopify";

interface CollectionHoverCardProps {
  products: ShopifyProduct[];
  collectionTitle?: string;
  onSelectProduct: (product: ShopifyProduct) => void;
  onViewAll: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const CollectionHoverCard: React.FC<CollectionHoverCardProps> = ({
  products,
  collectionTitle,
  onSelectProduct,
  onViewAll,
  onMouseEnter,
  onMouseLeave,
}) => {
  const showcaseProducts = products.slice(0, 4);

  return (
    <div
      className="nav-collection-hover-card"
      style={{
        backgroundImage: "url('/assets/user-vintage-bg.jpg')",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
        backgroundColor: "#F3EBDD",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
    >
      <div className="hover-card-header">
        <span className="hover-card-eyebrow">1906 EDITION REGISTER</span>
        <h4 className="hover-card-title">{collectionTitle ? collectionTitle.toUpperCase() : "FEATURED SPECIMENS"}</h4>
      </div>

      <div className="hover-card-grid">
        {showcaseProducts.map((p) => {
          const imgUrl = p.images[0]?.url || "/assets/product-1.jpg";
          const price = p.priceRange.minVariantPrice;
          const formatted = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${parseFloat(price.amount).toFixed(2)}`;

          return (
            <div
              key={p.id}
              className="hover-card-item"
              onClick={() => onSelectProduct(p)}
            >
              <div className="hover-item-img-box">
                <img src={imgUrl} alt={p.title} loading="lazy" />
              </div>
              <div className="hover-item-info">
                <span className="hover-item-title">{p.title}</span>
                <span className="hover-item-price">{formatted}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hover-card-footer">
        <button className="hover-card-all-btn" onClick={onViewAll}>
          <span>VIEW FULL ARCHIVE [{products.length}] 🡒</span>
        </button>
      </div>
    </div>
  );
};
