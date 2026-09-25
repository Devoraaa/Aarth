import React, { useRef, useState } from "react";
import type { ShopifyProduct, ShopifyVariant } from "../lib/shopify";
import { useCart } from "../context/CartContext";

interface ProductModalProps {
  product: ShopifyProduct | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem, loading } = useCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id || ""
  );

  // Vintage Fabric Texture Magnifier State
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const [zoomState, setZoomState] = useState<{
    active: boolean;
    x: number;
    y: number;
    percentX: number;
    percentY: number;
  }>({
    active: false,
    x: 0,
    y: 0,
    percentX: 50,
    percentY: 50,
  });

  if (!product) return null;

  const currentVariant: ShopifyVariant | undefined =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const price = currentVariant?.price || product.priceRange.minVariantPrice;
  const formattedPrice = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${parseFloat(price.amount).toFixed(2)}`;
  const currentImg = product.images[selectedImageIdx]?.url || "";

  const handleAddToCart = async () => {
    if (!currentVariant?.id) return;
    await addItem(currentVariant.id, quantity);
    onClose();
  };

  // Magnifier Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgBoxRef.current) return;
    const rect = imgBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setZoomState({
      active: true,
      x,
      y,
      percentX,
      percentY,
    });
  };

  const handleMouseLeave = () => {
    setZoomState((prev) => ({ ...prev, active: false }));
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div
        className="product-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
      >
        <button
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close product view"
        >
          ✕
        </button>

        <div className="product-modal-grid">
          {/* Product Gallery with Vintage Fabric Magnifier */}
          <div className="product-modal-media">
            <div
              ref={imgBoxRef}
              className="product-modal-main-img-box magnifier-target-box"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomState((prev) => ({ ...prev, active: true }))}
              onMouseLeave={handleMouseLeave}
            >
              {currentImg ? (
                <img
                  src={currentImg}
                  alt={product.images[selectedImageIdx]?.altText || product.title}
                  className="product-modal-main-img"
                />
              ) : (
                <div className="product-modal-img-placeholder" />
              )}

              {/* Corner Antique Registration Marks */}
              <span className="magnifier-corner top-left">⌜</span>
              <span className="magnifier-corner top-right">⌝</span>
              <span className="magnifier-corner bottom-left">⌞</span>
              <span className="magnifier-corner bottom-right">⌟</span>

              {/* Vintage Fabric Magnifier Loupe */}
              {zoomState.active && currentImg && (
                <div
                  className="vintage-fabric-loupe"
                  style={{
                    left: `${zoomState.x}px`,
                    top: `${zoomState.y}px`,
                    backgroundImage: `url(${currentImg})`,
                    backgroundPosition: `${zoomState.percentX}% ${zoomState.percentY}%`,
                    backgroundSize: "320%",
                  }}
                >
                  <div className="loupe-crosshair">✦</div>
                  <div className="loupe-tag">WEAVE 3.2X</div>
                </div>
              )}
            </div>

            {/* Magnifier Inspection Hint */}
            <div className="magnifier-hint-badge">
              <span>✦ HOVER SILHOUETTE TO INSPECT WEAVE & TEXTURE (3.2X) ✦</span>
            </div>

            {product.images.length > 1 && (
              <div className="product-modal-thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`product-thumbnail-btn ${
                      selectedImageIdx === idx ? "active" : ""
                    }`}
                    onClick={() => setSelectedImageIdx(idx)}
                  >
                    <img src={img.url} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-modal-info">
            <span className="product-modal-eyebrow">
              Atelier Archive • Edition 01
            </span>
            <h2 className="product-modal-title">{product.title}</h2>
            <div className="product-modal-price">{formattedPrice}</div>

            <div className="product-modal-divider"></div>

            {/* Description */}
            <div className="product-modal-description">
              {product.descriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p>
                  Handcrafted silhouette meticulously cut and sewn with living
                  craft. Every piece honors artisanal heritage and timeless
                  subcontinental tailoring.
                </p>
              )}
            </div>

            {/* Variants if any */}
            {product.variants.length > 1 && (
              <div className="product-modal-variants">
                <label className="variant-label">SELECT SIZE / EDITION</label>
                <div className="variant-options-row">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      className={`variant-option-btn ${
                        selectedVariantId === v.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedVariantId(v.id)}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag */}
            <div className="product-modal-actions">
              <div className="product-modal-qty">
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

              <button
                className="btn-add-to-cart"
                disabled={loading || !currentVariant?.availableForSale}
                onClick={handleAddToCart}
              >
                {loading
                  ? "ADDING TO ARCHIVE..."
                  : currentVariant?.availableForSale !== false
                  ? `ADD TO BAG • ${formattedPrice}`
                  : "CURRENTLY OUT OF DISPATCH"}
              </button>
            </div>

            <div className="product-modal-guarantee">
              <span>✦ Direct Atelier Dispatch</span>
              <span>✦ Ethically Woven</span>
              <span>✦ Standard Global Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
