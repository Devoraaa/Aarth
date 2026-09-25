import React from "react";
import { useCart } from "../context/CartContext";

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, updateItem, removeItem, loading } = useCart();

  if (!isOpen) return null;

  const lines = cart?.lines || [];
  const totalQuantity = cart?.totalQuantity || 0;
  const totalAmount = cart?.cost?.totalAmount;
  const formattedTotal = totalAmount
    ? `${totalAmount.currencyCode === "GBP" ? "£" : totalAmount.currencyCode === "INR" ? "₹" : totalAmount.currencyCode + " "}${parseFloat(totalAmount.amount).toFixed(2)}`
    : "£0.00";

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Archive Bag"
      >
        <div className="cart-drawer-header">
          <div className="cart-header-title-box">
            <span className="cart-eyebrow">YOUR SELECTION</span>
            <h3 className="cart-title">ARCHIVE BAG [{totalQuantity}]</h3>
          </div>
          <button
            className="cart-drawer-close"
            onClick={closeCart}
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        <div className="cart-flourish">❦ — ✦ — ❧</div>

        {lines.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">✦</div>
            <p className="cart-empty-text">Your archive bag is currently empty.</p>
            <p className="cart-empty-subtext">Explore our edition of handloom silhouettes and living tradition.</p>
            <button
              className="cart-btn-explore"
              onClick={() => {
                closeCart();
                const el = document.getElementById("collection");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              EXPLORE ARCHIVE
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {lines.map((item) => {
              const price = item.merchandise.price;
              const formattedPrice = `${price.currencyCode === "GBP" ? "£" : price.currencyCode === "INR" ? "₹" : price.currencyCode + " "}${parseFloat(price.amount).toFixed(2)}`;

              return (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-image-box">
                    {item.merchandise.image ? (
                      <img
                        src={item.merchandise.image.url}
                        alt={item.merchandise.image.altText || item.merchandise.product.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="cart-item-placeholder" />
                    )}
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-info-top">
                      <h4 className="cart-item-title">{item.merchandise.product.title}</h4>
                      {item.merchandise.title && item.merchandise.title !== "Default Title" && (
                        <span className="cart-item-variant">{item.merchandise.title}</span>
                      )}
                      <span className="cart-item-price">{formattedPrice}</span>
                    </div>

                    <div className="cart-item-controls">
                      <div className="cart-qty-selector">
                        <button
                          disabled={loading}
                          onClick={() => updateItem(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          disabled={loading}
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="cart-item-remove-btn"
                        disabled={loading}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {lines.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span className="cart-subtotal-val">{formattedTotal}</span>
            </div>
            <p className="cart-shipping-note">
              Taxes, duties & shipping calculated during final checkout dispatch.
            </p>

            <button
              className="cart-checkout-btn"
              disabled={loading || !cart?.checkoutUrl}
              onClick={handleCheckout}
            >
              {loading ? "PREPARING DISPATCH..." : `PROCEED TO CHECKOUT • ${formattedTotal}`}
            </button>

            <div className="cart-trust-mark">
              <span>✦ SECURE SHOPIFY CHECKOUT • WORLDWIDE DISPATCH</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
