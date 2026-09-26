import React, { useEffect, useRef, useState } from "react";
import type { ShopifyProduct, ShopifyVariant } from "../lib/shopify";
import { useCart } from "../context/CartContext";
import { cartCreate } from "../lib/shopify";

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

  // Active large image state
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ""
  );
  const [buyingNow, setBuyingNow] = useState(false);

  // Accordion dropdown states
  const [descOpen, setDescOpen] = useState(true);
  const [washCareOpen, setWashCareOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  // Precision Vintage Magnifier Loupe State
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const [loupe, setLoupe] = useState<{
    active: boolean;
    x: number;
    y: number;
    bgX: number;
    bgY: number;
    bgW: number;
    bgH: number;
  }>({
    active: false,
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0,
    bgW: 0,
    bgH: 0,
  });

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImgIdx(0);
    setQuantity(1);
    setSelectedVariantId(product.variants[0]?.id || "");
    setLoupe((prev) => ({ ...prev, active: false }));
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

  // Mathematical precision magnifier loupe anchored right under cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgBoxRef.current) return;
    const rect = imgBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const zoom = 1.6; // Amazon-style natural, comfortable zoom level
    const loupeSize = 250;

    // Total width & height of the magnified image background
    const bgW = rect.width * zoom;
    const bgH = rect.height * zoom;

    // Shift background so the exact point (x, y) is in the center of the loupe
    const bgX = -(x * zoom - loupeSize / 2);
    const bgY = -(y * zoom - loupeSize / 2);

    setLoupe({
      active: true,
      x,
      y,
      bgX,
      bgY,
      bgW,
      bgH,
    });
  };

  const handleMouseEnter = () => {
    setLoupe((prev) => ({ ...prev, active: true }));
  };

  const handleMouseLeave = () => {
    setLoupe((prev) => ({ ...prev, active: false }));
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
    <div className="product-detail-page-container">
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
            <span>ATELIER</span>
            <span className="pdp-bc-sep">/</span>
            <span>EDITION 01</span>
            <span className="pdp-bc-sep">/</span>
            <span className="pdp-bc-current">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Showcase Container */}
      <div className="pdp-showcase-container container-wide">
        <div className="pdp-three-column-grid">
          {/* COLUMN 1: LEFT LARGE STICKY IMAGE WITH EXACT POINT LOUPE ZOOM */}
          <div className="pdp-col-large-sticky">
            <div
              ref={imgBoxRef}
              className="pdp-large-img-box magnifier-target-box"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="pdp-large-main-img"
              />

              {/* Antique Corner Registration Marks */}
              <span className="magnifier-corner top-left">⌜</span>
              <span className="magnifier-corner top-right">⌝</span>
              <span className="magnifier-corner bottom-left">⌞</span>
              <span className="magnifier-corner bottom-right">⌟</span>

              {/* Vintage Magnifying Loupe Lens (Anchored Exactly to Cursor Position) */}
              {loupe.active && (
                <div
                  className="vintage-fabric-loupe"
                  style={{
                    left: `${loupe.x}px`,
                    top: `${loupe.y}px`,
                    backgroundImage: `url(${mainImage.url})`,
                    backgroundPosition: `${loupe.bgX}px ${loupe.bgY}px`,
                    backgroundSize: `${loupe.bgW}px ${loupe.bgH}px`,
                  }}
                >
                  <div className="loupe-tag">1.6X ZOOM</div>
                </div>
              )}
            </div>

            <div className="magnifier-hint-badge">
              <span>✦ HOVER SILHOUETTE TO ZOOM (1.6X) ✦</span>
            </div>
          </div>

          {/* COLUMN 2: CENTER SCROLLABLE OTHER PRODUCT IMAGES */}
          <div className="pdp-col-center-gallery">
            <div className="pdp-gallery-header">
              <span>ARCHIVE ANGLES [{images.length}]</span>
              <span className="pdp-scroll-hint">SCROLL TO EXPLORE 🡓</span>
            </div>

            <div className="pdp-center-images-stack">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`pdp-stack-thumb-box ${activeImgIdx === idx ? "active-thumb" : ""}`}
                  onClick={() => setActiveImgIdx(idx)}
                  title={`View angle 0${idx + 1}`}
                >
                  <img src={img.url} alt={`${product.title} angle ${idx + 1}`} loading="lazy" />
                  <span className="pdp-thumb-number">0{idx + 1}</span>
                  {activeImgIdx === idx && (
                    <span className="pdp-active-badge">VIEWING ON LEFT</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: RIGHT STICKY PRODUCT DETAILS & ACTIONS */}
          <div className="pdp-col-right-details">
            <div className="pdp-details-sticky-wrap">
              {/* Product Header: Name & Price */}
              <div className="pdp-header-row">
                <div className="pdp-title-box">
                  <span className="pdp-eyebrow">
                    {product.tags[0] || "HANDLOOM ARCHIVE • NO. 01"}
                  </span>
                  <h1 className="pdp-product-title">{product.title}</h1>
                </div>
                <div className="pdp-price-box">
                  <span className="pdp-product-price">{formattedPrice}</span>
                  <span className="pdp-tax-note">Inc. VAT</span>
                </div>
              </div>

              <div className="pdp-divider"></div>

              {/* Description Dropdown (Accordion) */}
              <div className="pdp-accordion-item">
                <button
                  className="pdp-accordion-trigger"
                  onClick={() => setDescOpen(!descOpen)}
                  aria-expanded={descOpen}
                >
                  <span className="pdp-acc-title">SILHOUETTE & CRAFT DETAILS</span>
                  <span className="pdp-acc-icon">{descOpen ? "−" : "+"}</span>
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
                <span className="pdp-qty-label">QUANTITY</span>
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
                      ? "RECORDING TO ARCHIVE..."
                      : currentVariant?.availableForSale !== false
                      ? `ADD TO BAG • ${formattedPrice}`
                      : "OUT OF DISPATCH"}
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

              {/* Wash Care Dropdown (Accordion) */}
              <div className="pdp-accordion-item">
                <button
                  className="pdp-accordion-trigger"
                  onClick={() => setWashCareOpen(!washCareOpen)}
                  aria-expanded={washCareOpen}
                >
                  <span className="pdp-acc-title">WASH & ATELIER CARE</span>
                  <span className="pdp-acc-icon">{washCareOpen ? "−" : "+"}</span>
                </button>
                {washCareOpen && (
                  <div className="pdp-accordion-content">
                    <ul className="pdp-care-list">
                      <li>✦ Gentle cold hand wash or eco dry clean recommended.</li>
                      <li>✦ Use pH-neutral organic mild detergent to protect botanical fibers.</li>
                      <li>✦ Dry flat in natural shade; avoid direct harsh sunlight.</li>
                      <li>✦ Warm iron on reverse side to retain textured handloom slub.</li>
                      <li>✦ Do not bleach or tumble dry.</li>
                    </ul>
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
                  <span className="pdp-acc-icon">{shippingOpen ? "−" : "+"}</span>
                </button>
                {shippingOpen && (
                  <div className="pdp-accordion-content">
                    <ul className="pdp-care-list">
                      <li>✦ <strong>UK Domestic:</strong> Complimentary dispatch on orders above £50 (2-3 business days via Royal Mail).</li>
                      <li>✦ <strong>Worldwide Express:</strong> Fast international dispatch with live tracking (DHL Express).</li>
                      <li>✦ <strong>Archival Returns:</strong> 14-day hassle-free exchange on unworn garments with original atelier tags intact.</li>
                      <li>✦ Secure payment processing via Shopify encrypted checkout.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Craftsmanship Guarantee Stamp */}
              <div className="pdp-craft-seal">
                <span>✦ MADE IN INDIA • DESIGNED IN LONDON • THE LIVING ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS YOU MAY LIKE SECTION (EXACTLY 3 PRODUCTS) */}
      <section className="pdp-related-section">
        <div className="container-wide">
          <header className="section-header-antique">
            <div className="section-header-flourish">❦ — ✦ — ❧</div>
            <div className="section-eyebrow">Curated Complements</div>
            <h2 className="section-title">Products you may like</h2>
            <div className="section-divider-line">
              <span></span>
              <i>Selected Silhouettes [3 of 3]</i>
              <span></span>
            </div>
          </header>

          <div className="pdp-related-grid-3">
            {relatedProducts.map((relProduct, idx) => {
              const relPrice = relProduct.priceRange.minVariantPrice;
              const formattedRelPrice = `${
                relPrice.currencyCode === "GBP"
                  ? "£"
                  : relPrice.currencyCode === "INR"
                  ? "₹"
                  : relPrice.currencyCode + " "
              }${parseFloat(relPrice.amount).toFixed(2)}`;
              const relImg = relProduct.images[0]?.url || "/assets/product-1.jpg";

              return (
                <article
                  key={relProduct.id}
                  className="pdp-related-card"
                  onClick={() => onSelectProduct(relProduct)}
                >
                  <div className="pdp-related-img-box">
                    <span className="product-number-tag">№ 0{idx + 1}</span>
                    <img src={relImg} alt={relProduct.title} loading="lazy" />

                    <div className="pdp-related-overlay-btn">
                      <span>✦ VIEW SILHOUETTE</span>
                    </div>
                  </div>

                  <div className="pdp-related-meta">
                    <span className="pdp-related-edition">
                      {relProduct.tags[0] || "Heirloom Edition"}
                    </span>
                    <h3 className="pdp-related-title">{relProduct.title}</h3>
                    <p className="pdp-related-price">{formattedRelPrice}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
