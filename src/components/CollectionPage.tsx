import React, { useState } from "react";
import type { ShopifyProduct } from "../lib/shopify";
import { ProductCard, ProductSkeleton } from "./ProductCard";

interface CollectionPageProps {
  products: ShopifyProduct[];
  onSelectProduct: (product: ShopifyProduct) => void;
  onQuickAdd: (e: React.MouseEvent, product: ShopifyProduct) => void;
  loading: boolean;
  collectionTitle?: string;
  collectionDescription?: string;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  loading,
  collectionTitle,
  collectionDescription,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "" },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "ALL") return true;
    const desc = (p.title + " " + (p.tags || []).join(" ") + " " + p.description).toLowerCase();
    if (selectedCategory === "SILK") return desc.includes("silk") || desc.includes("kurta");
    if (selectedCategory === "COTTON") return desc.includes("cotton") || desc.includes("kimono");
    if (selectedCategory === "ZARI") return desc.includes("zari") || desc.includes("chanderi") || desc.includes("tunic");
    return true;
  });

  const heading = collectionTitle || "GARVI • DROP 001";

  return (
    <div 
      className="collection-page-view container-wide" 
      style={{ 
        paddingTop: 'calc(var(--nav-height) + 28px)', 
        paddingBottom: '20px',
        backgroundImage: "url('/assets/user-vintage-bg.jpg')",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
      }}
    >
      {/* Collection Header Bar */}
      <div className="collection-page-header">
        <div className="collection-header-meta">
          <h1 className="collection-main-heading">{heading}</h1>
        </div>

       
      </div>

      <div className="collection-page-divider" />

      {/* Grid of Product Cards (Exactly Consistent with Home Page) */}
      <div className="products-grid-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <ProductSkeleton key={`collection-skeleton-${idx}`} />
          ))
        ) : (
          filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              loading={loading}
            />
          ))
        )}
      </div>
    </div>
  );
};

