import React, { useState } from "react";
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

  if (!product) return null;

  const currentVariant: ShopifyVariant | undefined =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const price = currentVariant?.price || product.priceRange.minVariantPrice;
  const formattedPrice = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${parseFloat(price.amount).toFixed(2)}`;

  const handleAddToCart = async () => {
    if (!currentVariant?.id) return;
    await addItem(currentVariant.id, quantity);
    onClose();
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
          {/* Product Gallery */}
          <div className="product-modal-media">
            <div className="product-modal-main-img-box">
              {product.images[selectedImageIdx] ? (
                <img
                  src={product.images[selectedImageIdx].url}
                  alt={product.images[selectedImageIdx].altText || product.title}
                  className="product-modal-main-img"
                />
              ) : (
                <div className="product-modal-img-placeholder" />
              )}
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
