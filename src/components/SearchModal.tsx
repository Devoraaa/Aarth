import React, { useEffect, useRef, useState } from "react";
import type { ShopifyProduct } from "../lib/shopify";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ShopifyProduct[];
  onSelectProduct: (product: ShopifyProduct) => void;
  onQuickAdd: (e: React.MouseEvent, product: ShopifyProduct) => void;
}

const CATEGORIES = ["ALL", "GUJARAT", "PEACOCK", "LION", "SPARROW", "SILK"];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setActiveCategory("ALL");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter products
  const filteredProducts = products.filter((product) => {
    const q = query.toLowerCase().trim();
    const titleMatch = product.title.toLowerCase().includes(q);
    const tagMatch = product.tags.some((t) => t.toLowerCase().includes(q));
    const descMatch = product.description.toLowerCase().includes(q);

    const matchesQuery = !q || titleMatch || tagMatch || descMatch;

    let matchesCategory = true;
    if (activeCategory !== "ALL") {
      const cat = activeCategory.toLowerCase();
      matchesCategory =
        product.title.toLowerCase().includes(cat) ||
        product.tags.some((t) => t.toLowerCase().includes(cat)) ||
        product.handle.toLowerCase().includes(cat);
    }

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div
        className="search-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search the Archive"
      >
        <div className="search-modal-header">
          <div className="search-header-eyebrow">ATELIER CATALOGUE SEARCH</div>
          <button
            className="search-modal-close"
            onClick={onClose}
            aria-label="Close search"
          >
            <span>ESC / ✕</span>
          </button>
        </div>

        <div className="search-flourish">❦ — ✦ — ❧</div>

        {/* Search Input Box */}
        <div className="search-input-wrapper">
          <svg
            className="search-input-icon"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            ref={inputRef}
            type="text"
            className="search-input-field"
            placeholder="Type silhouette, motif, or craft (e.g. Gujarat, Peacock, Lion)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <button
              className="search-input-clear"
              onClick={() => setQuery("")}
              aria-label="Clear query"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Categories */}
        <div className="search-categories-bar">
          <span className="search-filter-label">CURATED MOTIFS:</span>
          <div className="search-chips-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`search-chip-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Results Info */}
        <div className="search-results-meta">
          <span>
            {filteredProducts.length === 1
              ? "1 SILHOUETTE RECORDED"
              : `${filteredProducts.length} SILHOUETTES RECORDED`}
          </span>
          <div className="search-divider-line"></div>
        </div>

        {/* Results Grid */}
        <div className="search-results-container">
          {filteredProducts.length === 0 ? (
            <div className="search-empty-state">
              <span className="search-empty-flourish">✦</span>
              <p className="search-empty-title">
                No archived silhouettes match &ldquo;{query}&rdquo;
              </p>
              <p className="search-empty-hint">
                Try searching by city or motif: &ldquo;Gujarat&rdquo;, &ldquo;Peacock&rdquo;, &ldquo;Sparrow&rdquo;, or &ldquo;Tee&rdquo;.
              </p>
            </div>
          ) : (
            <div className="search-results-grid">
              {filteredProducts.map((product) => {
                const price = product.priceRange.minVariantPrice;
                const formattedPrice = `${
                  price.currencyCode === "GBP"
                    ? "£"
                    : price.currencyCode === "INR"
                    ? "₹"
                    : price.currencyCode + " "
                }${parseFloat(price.amount).toFixed(2)}`;
                const img = product.images[0]?.url || "/assets/product-1.jpg";

                return (
                  <div
                    key={product.id}
                    className="search-result-card"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <div className="search-result-img-box">
                      <img src={img} alt={product.title} loading="lazy" />
                    </div>

                    <div className="search-result-details">
                      <span className="search-result-edition">
                        {product.tags[0] || "Heirloom Edition"}
                      </span>
                      <h4 className="search-result-title">{product.title}</h4>
                      <p className="search-result-price">{formattedPrice}</p>

                      <div className="search-result-actions">
                        <button
                          className="search-result-quick-add"
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickAdd(e, product);
                          }}
                        >
                          ✦ Quick Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
