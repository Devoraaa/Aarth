import React, { useEffect } from "react";

interface ShippingPageProps {
  onClose: () => void;
}

export const ShippingPage: React.FC<ShippingPageProps> = ({ onClose }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="contact-page-container" style={{ position: "relative", isolation: "isolate", minHeight: "100vh", paddingTop: "var(--nav-height)", backgroundColor: "#f7f2e9" }}>
      {/* Background Vintage Stamps */}
      <img className="vintage-bg-stamp" src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "10%", left: "5%", width: "clamp(60px, 8vw, 100px)", transform: "rotate(-15deg)", opacity: 0.3, mixBlendMode: "multiply", zIndex: -1 }} alt="Vintage Stamp" />
      <img className="vintage-bg-stamp" src="/assets/stamps/stamp4.png" style={{ position: "absolute", bottom: "15%", right: "8%", width: "clamp(70px, 9vw, 110px)", transform: "rotate(20deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: -1 }} alt="Vintage Stamp" />

      <div className="pdp-top-bar-wrapper">
        <div className="pdp-top-bar container-wide">
          <button className="pdp-back-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>RETURN TO STORE</span>
          </button>
        </div>
      </div>

      <div className="container-narrow" style={{ paddingTop: "60px", paddingBottom: "120px" }}>
        <header className="section-header-antique">
          <div className="section-header-flourish">✤ ✦ ✤</div>
          <h1 className="section-title">Aarth — Shipping Policy</h1>
        </header>

        <div className="legal-content">
          <p className="legal-date">Last updated: 30 September 2026</p>

          <p>
            Thank you for shopping with Aarth. We aim to provide clear and reliable shipping information for every order.<br />
            Please review the information below before placing your order.
          </p>

          <h2>ORDER PROCESSING TIME</h2>
          <p>All Aarth orders are processed within 1–3 business days.</p>
          <p>During limited drops, collection launches, peak periods or periods of unusually high order volume, processing may take an additional 1–2 business days.</p>
          <p>Processing time refers to the time required to prepare your order before it is handed to the delivery carrier. It is separate from the delivery time.</p>

          <h2>SHIPPING DESTINATIONS</h2>
          <p>Aarth currently ships to:</p>
          <ul>
            <li>United Kingdom</li>
            <li>Europe</li>
            <li>United States of America</li>
            <li>Canada</li>
          </ul>
          <p>If your destination is not available at checkout, please contact us at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a>.</p>

          <h2>SHIPPING FEES</h2>
          <p>Shipping charges are separate from the product price. Aarth products are priced at £35 per item, excluding delivery charges unless otherwise stated.</p>
          <p>Shipping rates are calculated at checkout based on factors including the delivery destination, order details and available courier service.</p>
          <p>The final shipping charge applicable to your order will be shown before you complete your purchase.</p>

          <h2>ESTIMATED DELIVERY TIMES</h2>
          <p>
            <strong>United Kingdom:</strong> 2–5 business days<br />
            <strong>Europe:</strong> 5–10 business days<br />
            <strong>USA &amp; Canada:</strong> 7–14 business days
          </p>
          <p>These are estimated delivery times and are not guaranteed delivery dates. Delivery may take longer because of customs clearance, courier delays, public holidays, adverse weather or other circumstances outside our reasonable control.</p>

          <h2>LIMITED DROPS &amp; HIGH ORDER VOLUMES</h2>
          <p>Aarth operates limited product drops. During a product launch or limited drop, order volumes may be significantly higher than usual.</p>
          <p>Where order volumes are unusually high, processing may take an additional 1–2 business days.</p>
          <p>We appreciate your patience during launches and will aim to dispatch orders as quickly as reasonably possible.</p>

          <h2>ORDER TRACKING</h2>
          <p>Once your order has been dispatched, you will receive a dispatch confirmation email containing tracking information where tracking is available.</p>
          <p>Tracking information may take up to 24 hours to begin updating after dispatch.</p>
          <p>If your tracking information has not updated after a reasonable period, please contact <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> with your order number.</p>

          <h2>CUSTOMS, DUTIES &amp; TAXES</h2>
          <p>International shipments may be subject to customs duties, import taxes, handling charges or other fees imposed by the destination country.</p>
          <p>Where applicable, these charges are the responsibility of the customer unless the applicable checkout information states otherwise.</p>
          <p>Aarth is not responsible for delays arising from customs inspections or clearance procedures.</p>

          <h2>INCORRECT SHIPPING INFORMATION</h2>
          <p>Customers are responsible for providing accurate and complete delivery information at checkout.</p>
          <p>If you notice that your shipping information is incorrect, contact us at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> as soon as possible.</p>
          <p>Once an order has been dispatched, we may not be able to change the delivery address.</p>
          <p>Additional delivery charges or costs resulting from an incorrect address may be the responsibility of the customer, subject to applicable law.</p>

          <h2>LOST, DELAYED OR STOLEN PACKAGES</h2>
          <p>If your order appears to be delayed or missing, please contact us at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> with your order number and tracking information so that we can assist with an investigation.</p>
          <p>If tracking confirms that a package has been delivered to the address provided at checkout, Aarth cannot automatically treat the package as lost. We may assist you in contacting the relevant courier to investigate the delivery.</p>
          <p>Nothing in this section limits any rights or remedies you may have under applicable consumer law.</p>

          <h2>DELIVERY ATTEMPTS &amp; FAILED DELIVERY</h2>
          <p>If a courier is unable to deliver an order because the recipient is unavailable, the address is incorrect, access is unavailable, or another delivery issue occurs, the courier may attempt redelivery or return the parcel to the sender.</p>
          <p>If an order is returned to Aarth because of an incorrect address, failure to accept delivery or another issue attributable to the customer, we may contact you to arrange redelivery. Additional delivery charges may apply where permitted by law.</p>

          <h2>DELIVERY DELAYS</h2>
          <p>Delivery estimates are provided for guidance only.</p>
          <p>Aarth is not responsible for delays caused by events outside our reasonable control, including courier disruption, postal disruption, customs procedures, strikes, severe weather, public holidays, technical failures or other circumstances beyond our reasonable control.</p>
          <p>If a delivery is significantly delayed, please contact us at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> so we can help investigate the shipment.</p>

          <h2>DAMAGED PACKAGES</h2>
          <p>If your parcel arrives visibly damaged, please contact <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> as soon as reasonably possible.</p>
          <p>Please provide your order number and clear photographs of the packaging and product where appropriate.</p>
          <p>If the product itself is damaged or faulty, your statutory consumer rights remain unaffected and the matter will be handled in accordance with our Returns/Refund Policy and applicable law.</p>

          <h2>CONTACT</h2>
          <p>For shipping-related questions, please contact:</p>
          <p>
            Email: <a href="mailto:hello@aarth.uk">hello@aarth.uk</a><br />
            ARTH STUDIO LIMITED<br />
            Company number: 17091464<br />
            Website: <a href="https://aarth.uk" target="_blank" rel="noopener noreferrer">aarth.uk</a>
          </p>

          <h2>IMPORTANT INFORMATION</h2>
          <p>This Shipping Policy should be read together with Aarth's Terms &amp; Conditions and Refund/Returns Policy.</p>
          <p>Nothing in this Shipping Policy is intended to remove, restrict or exclude any statutory consumer rights that cannot legally be excluded or limited.</p>
          
        </div>
      </div>
    </div>
  );
};
