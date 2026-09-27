import React, { useState } from "react";
import type { ShopifyProduct } from "../lib/shopify";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
  onSelect: (product: ShopifyProduct) => void;
  onQuickAdd: (e: React.MouseEvent, product: ShopifyProduct) => void;
  loading: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onSelect,
  onQuickAdd,
  loading: productLoading,
}) => {
  const { cart, addItem, updateItem, loading: cartLoading } = useCart();
  const loading = productLoading || cartLoading;

  const cartLine = cart?.lines.find((line) => line.merchandise.product.id === product.id);
  const quantity = cartLine ? cartLine.quantity : 0;

  const price = product.priceRange.minVariantPrice;
  // If currency is INR or zero decimals, format cleanly without redundant trailing cents if whole
  const numericAmount = parseFloat(price.amount);
  const formattedPrice = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${numericAmount % 1 === 0 ? numericAmount.toLocaleString() : numericAmount.toFixed(2)}`;

  const frontImg = product.images[0]?.url || "/assets/product-1.jpg";
  const backImg = product.images[1]?.url || null;
  const isNew = index === 0 || product.tags?.some((t) => t.toLowerCase().includes("new"));

  return (
    <article
      className="vintage-manilla-card"
      onClick={() => onSelect(product)}
    >
      <div className="vintage-card-img-box">
        {/* Top-Right: Red "NEW" Tape on first lot */}
        {isNew && (
          <div className="card-tape-new-badge" aria-label="New lot">
            <span>NEW</span>
          </div>
        )}

        {/* Product Image Display */}
        <img
          src={frontImg}
          alt={product.title}
          loading="lazy"
          className="vintage-card-product-img"
        />

        {backImg && (
          <img
            src={backImg}
            alt={`${product.title} Back View`}
            loading="lazy"
            className="vintage-card-product-img-hover"
          />
        )}
      </div>

      {/* Meta Section */}
      <div className="vintage-card-meta">
        <h3 className="vintage-card-title">{product.title}</h3>
        <div className="vintage-card-price">{formattedPrice}</div>

        {/* Vintage Weathered Enamel Sign Action Area */}
        <div
          className="vintage-card-action-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left / Mid: ADD TO CART Button */}
          <button
            type="button"
            className="vintage-card-add-img-btn"
            disabled={loading}
            aria-label={`Add ${product.title} to cart`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(e, product);
            }}
          >
            <img
              src="/assets/vintage-add-to-cart.png"
              alt="Add to Cart"
              className="vintage-card-add-sign-img"
              loading="lazy"
            />
          </button>

          {/* Right Corner: '+' if 0, or '[-] [qty] [+]' if >= 1 */}
          {quantity > 0 ? (
            <div className="vintage-card-qty-cluster">
              <button
                type="button"
                className="vintage-card-sign-btn vintage-card-minus-btn"
                disabled={loading}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (cartLine) await updateItem(cartLine.id, quantity - 1);
                }}
                aria-label="Decrease quantity"
                title="Decrease quantity"
              >
                <img
                  src="/assets/vintage-minus.png"
                  alt="-"
                  className="vintage-sign-icon-img"
                />
              </button>

              <div className="vintage-card-qty-number-box">
                <span className="vintage-card-qty-count">{quantity}</span>
              </div>

              <button
                type="button"
                className="vintage-card-sign-btn vintage-card-plus-btn"
                disabled={loading}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (cartLine) await updateItem(cartLine.id, quantity + 1);
                }}
                aria-label="Increase quantity"
                title="Increase quantity"
              >
                <img
                  src="/assets/vintage-plus.png"
                  alt="+"
                  className="vintage-sign-icon-img"
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="vintage-card-sign-btn vintage-card-plus-btn"
              disabled={loading}
              aria-label={`Add 1 ${product.title} to cart`}
              title="Add 1 to cart"
              onClick={async (e) => {
                e.stopPropagation();
                const variantId = product.variants[0]?.id;
                if (variantId) {
                  await addItem(variantId, 1, false); // DO NOT OPEN CART DRAWER
                }
              }}
            >
              <img
                src="/assets/vintage-plus.png"
                alt="+"
                className="vintage-sign-icon-img"
                loading="lazy"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
