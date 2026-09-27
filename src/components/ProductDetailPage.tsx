import React, { useEffect, useRef, useState } from "react";
import type { ShopifyProduct, ShopifyVariant } from "../lib/shopify";
import { useCart } from "../context/CartContext";
import { cartCreate } from "../lib/shopify";
import { ProductCard } from "./ProductCard";

interface ProductDetailPageProps {
  product: ShopifyProduct;
  allProducts: ShopifyProduct[];
  onBack: () => void;
  onSelectProduct: (product: ShopifyProduct) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
}) => {
  const { addItem, openCart, loading: cartLoading } = useCart();

  const handleQuickAdd = async (e: React.MouseEvent, p: ShopifyProduct) => {
    e.stopPropagation();
    if (p.variants.length > 0) {
      await addItem(p.variants[0].id, 1);
      openCart();
    }
  };

  // Active large image state
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ""
  );
  const [buyingNow, setBuyingNow] = useState(false);

  // Accordion dropdown states
  const [descOpen, setDescOpen] = useState(false);
  const [washCareOpen, setWashCareOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);


  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImgIdx(0);
    setQuantity(1);
    setSelectedVariantId(product.variants[0]?.id || "");
  }, [product.id]);

  const currentVariant: ShopifyVariant | undefined =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const price = currentVariant?.price || product.priceRange.minVariantPrice;
  const formattedPrice = `${
    price.currencyCode === "GBP"
      ? "£"
      : price.currencyCode === "INR"
      ? "₹"
      : price.currencyCode + " "
  }${parseFloat(price.amount).toFixed(2)}`;

  // Product images list
  const baseImages =
    product.images.length > 0
      ? product.images
      : [{ url: "/assets/product-1.jpg", altText: product.title }];

  // If product has 2 images, create a curated 4-angle gallery so middle column has rich scrolling
  const images =
    baseImages.length === 2
      ? [
          baseImages[0],
          baseImages[1],
          { url: baseImages[0].url, altText: `${product.title} - Silhouette Study` },
          { url: baseImages[1].url, altText: `${product.title} - Weave & Motif Detail` },
        ]
      : baseImages;

  const mainImage = images[activeImgIdx] || images[0];



  const handleMouseLeave = () => {
  };

  // Add to Bag handler
  const handleAddToCart = async () => {
    if (!currentVariant?.id) return;
    await addItem(currentVariant.id, quantity);
    openCart();
  };

  // 1-Click Buy Now handler (Direct Shopify Checkout)
  const handleBuyNow = async () => {
    if (!currentVariant?.id) return;
    setBuyingNow(true);
    try {
      const newCart = await cartCreate([
        {
          merchandiseId: currentVariant.id,
          quantity,
        },
      ]);
      if (newCart?.checkoutUrl) {
        window.location.href = newCart.checkoutUrl;
      } else {
        throw new Error("Checkout URL missing");
      }
    } catch (err) {
      console.error("Buy now failed:", err);
      alert("Could not initialize direct checkout. Adding to bag instead.");
      await addItem(currentVariant.id, quantity);
      openCart();
      setBuyingNow(false);
    }
  };

  // Products you may like: exactly 3 other products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page-container" style={{ position: "relative" }}>

      {/* Background Vintage Stamps for PDP */}
      <img src="/assets/stamps/stamp2.png" style={{ position: "absolute", top: "15%", left: "3%", width: "clamp(70px, 8vw, 110px)", transform: "rotate(-12deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", top: "40%", right: "4%", width: "clamp(60px, 7vw, 95px)", transform: "rotate(18deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp1.png" style={{ position: "absolute", bottom: "30%", left: "5%", width: "clamp(75px, 9vw, 105px)", transform: "rotate(-25deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp4.png" style={{ position: "absolute", bottom: "5%", right: "8%", width: "clamp(65px, 8vw, 90px)", transform: "rotate(15deg)", opacity: 0.5, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />

      {/* Top Breadcrumb Bar (Tight & Compact Spacing with Full-Width Shield) */}
      <div className="pdp-top-bar-wrapper">
        <div className="pdp-top-bar container-wide">
          <button className="pdp-back-btn" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>RETURN TO ARCHIVE</span>
          </button>

          <div className="pdp-breadcrumb">
            <span>COLLECTION</span>
            <span className="pdp-bc-sep">/</span>
            <span className="pdp-bc-current">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Showcase Container */}
      <div className="pdp-showcase-container container-wide">
        <div className="pdp-three-column-grid">
          {/* COLUMN 1: LEFT LARGE STICKY IMAGE */}
          <div className="pdp-col-large-sticky">
            <div
              className="pdp-large-img-box magnifier-target-box"
              
            >
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="pdp-large-main-img" /></div><div className="pdp-thumbnail-strip">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`pdp-thumb-box ${activeImgIdx === idx ? "active-thumb" : ""}`}
                  onClick={() => setActiveImgIdx(idx)}
                >
                  <img src={img.url} alt={`${product.title} angle ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
              

              </div><div className="pdp-col-right-details">
            <div className="pdp-details-sticky-wrap">
              {/* Product Header: Name & Price */}
              <div className="pdp-header-row">
                <div className="pdp-title-box">
                  <h1 className="pdp-product-title">{product.title}</h1>
                </div>
                <div className="pdp-price-box">
                  <span className="pdp-product-price">{formattedPrice}</span>
                </div>
              </div>

              <div className="pdp-divider"></div>

              {/* Variants Selector if more than 1 */}
              {product.variants.length > 1 && (
                <div className="pdp-variants-section">
                  <label className="pdp-variant-label">SELECT SIZE / EDITION</label>
                  <div className="pdp-variant-chips">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        className={`pdp-variant-chip ${selectedVariantId === v.id ? "selected" : ""}`}
                        onClick={() => setSelectedVariantId(v.id)}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="pdp-qty-row">
                <div className="pdp-qty-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Action Buttons: Add to Bag & Buy Now */}
              <div className="pdp-cta-buttons">
                {/* 1. Add to Bag */}
                <button
                  className="btn-pdp-add-to-cart"
                  disabled={cartLoading || !currentVariant?.availableForSale}
                  onClick={handleAddToCart}
                >
                  <span>
                    {cartLoading
                      ? "ADDING TO BAG..."
                      : currentVariant?.availableForSale !== false
                      ? `ADD TO BAG • ${formattedPrice}`
                      : "SOLD OUT"}
                  </span>
                </button>

                {/* 2. Buy Now (Direct Shopify Checkout) */}
                <button
                  className="btn-pdp-buy-now"
                  disabled={buyingNow || !currentVariant?.availableForSale}
                  onClick={handleBuyNow}
                >
                  <span>
                    {buyingNow
                      ? "DISPATCHING TO CHECKOUT..."
                      : "BUY NOW — EXPRESS DISPATCH"}
                  </span>
                </button>
              </div>

                                              {/* Description Dropdown (Accordion) */}
                <div className="pdp-accordion-item">
                  <button
                    className="pdp-accordion-trigger"
                    onClick={() => setDescOpen(!descOpen)}
                    aria-expanded={descOpen}
                  >
                    <span className="pdp-acc-title">Details and Description</span>
                    <span className="pdp-acc-icon">{descOpen ? "-" : "+"}</span>
                  </button>
                  {descOpen && (
                    <div className="pdp-accordion-content">
                      {product.descriptionHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                      ) : (
                        <p>
                          Handcrafted artisanal silhouette cut and finished with heirloom precision.
                          Woven on wooden pitlooms with living botanical dyes, celebrating timeless
                          subcontinental craft tailored for modern living.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Wash Care Dropdown (Accordion) */}
                <div className="pdp-accordion-item">
                  <button
                    className="pdp-accordion-trigger"
                    onClick={() => setWashCareOpen(!washCareOpen)}
                    aria-expanded={washCareOpen}
                  >
                    <span className="pdp-acc-title">WASH & ATELIER CARE</span>
                    <span className="pdp-acc-icon">{washCareOpen ? "-" : "+"}</span>
                  </button>
                  {washCareOpen && (
                    <div className="pdp-accordion-content">
                      {product.washCare ? (
                        <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: product.washCare }} />
                      ) : (
                        <ul className="pdp-care-list">
                          <li>? Gentle cold hand wash or eco dry clean recommended.</li>
                          <li>? Use pH-neutral organic mild detergent to protect botanical fibers.</li>
                          <li>? Dry flat in natural shade; avoid direct harsh sunlight.</li>
                          <li>? Warm iron on reverse side to retain textured handloom slub.</li>
                          <li>? Do not bleach or tumble dry.</li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping & Returns Dropdown (Accordion) */}
                <div className="pdp-accordion-item">
                  <button
                    className="pdp-accordion-trigger"
                    onClick={() => setShippingOpen(!shippingOpen)}
                    aria-expanded={shippingOpen}
                  >
                    <span className="pdp-acc-title">SHIPPING & DISPATCH POLICY</span>
                    <span className="pdp-acc-icon">{shippingOpen ? "-" : "+"}</span>
                  </button>
                  {shippingOpen && (
                    <div className="pdp-accordion-content">
                      {product.shipping ? (
                        <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: product.shipping }} />
                      ) : (
                        <ul className="pdp-care-list">
                          <li>? <strong>UK Domestic:</strong> Complimentary dispatch on orders above 50 (2-3 business days via Royal Mail).</li>
                          <li>? <strong>Worldwide Express:</strong> Fast international dispatch with live tracking (DHL Express).</li>
                          <li>? <strong>Archival Returns:</strong> 14-day hassle-free exchange on unworn garments with original atelier tags intact.</li>
                          <li>? Secure payment processing via Shopify encrypted checkout.</li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Craftsmanship Guarantee Stamp */}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS YOU MAY LIKE SECTION (EXACTLY 3 PRODUCTS) */}
      <section className="pdp-related-section">
        <div className="container-wide">
          <header className="section-header-antique">
            <div className="section-header-flourish">✧ ─ ✦ ─ ☙</div>
            <h2 className="section-title">Products you may like</h2>
          </header>
          <div className="pdp-related-grid-3">
            {relatedProducts.map((relProduct, idx) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                index={idx}
                onSelect={onSelectProduct}
                onQuickAdd={handleQuickAdd}
                loading={cartLoading}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};















