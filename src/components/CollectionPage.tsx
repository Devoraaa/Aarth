import React, { useState } from "react";
import type { ShopifyProduct } from "../lib/shopify";
import { ProductCard } from "./ProductCard";

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
    { id: "ALL", label: "ALL SPECIMENS" },
    // { id: "SILK", label: "PITLOOM RAW SILK" },
    // { id: "COTTON", label: "MUD-RESIST COTTON" },
    // { id: "ZARI", label: "CHANDERI WEAVE" },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "ALL") return true;
    const desc = (p.title + " " + (p.tags || []).join(" ") + " " + p.description).toLowerCase();
    if (selectedCategory === "SILK") return desc.includes("silk") || desc.includes("kurta");
    if (selectedCategory === "COTTON") return desc.includes("cotton") || desc.includes("kimono");
    if (selectedCategory === "ZARI") return desc.includes("zari") || desc.includes("chanderi") || desc.includes("tunic");
    return true;
  });

  const heading = collectionTitle || "THE ATELIER COLLECTION";
  const subheading = collectionDescription || "Pure handloom silhouettes woven on ancestral pitlooms with botanical extracts, curated as living archival specimens.";

  return (
    <div 
      className="collection-page-view container-wide" 
      style={{ 
        paddingTop: 'calc(var(--nav-height) + 28px)', 
        paddingBottom: '80px',
        backgroundImage: "url('/assets/user-vintage-bg.jpg')",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
      }}
    >
      {/* Collection Header Bar */}
      <div className="collection-page-header">
        <div className="collection-header-meta">
          <span className="collection-eyebrow">ARCHIVAL REGISTER • 1906 ATELIER</span>
          <h1 className="collection-main-heading">{heading}</h1>
          <p className="collection-subheading">
            {subheading}
          </p>
        </div>

        {/* Category Ledger Filter Tabs */}
        <div className="collection-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`collection-tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="collection-page-divider" />

      {/* Grid of Product Cards (Exactly Consistent with Home Page) */}
      <div className="products-grid-4">
        {filteredProducts.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            index={idx}
            onSelect={onSelectProduct}
            onQuickAdd={onQuickAdd}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};
