import React, { useEffect } from "react";

interface RefundsPageProps {
  onClose: () => void;
}

export const RefundsPage: React.FC<RefundsPageProps> = ({ onClose }) => {
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
          <h1 className="section-title">Aarth — Refund & Returns Policy</h1>
        </header>

        <div className="legal-content">
          <p className="legal-date">Last updated: 30 September 2026</p>

          <p>
            At Aarth, every article is created with purpose. Aarth represents Indian culture at a global stage, drawing inspiration from the richness of India’s heritage, culture, craftsmanship, stories and values. Each article carries meaning beyond the garment itself, and we want every piece to reach you in a condition that reflects the care with which it was created.
          </p>
          <p>
            We understand that sometimes an order may not be right for you. For that reason, we accept eligible returns in accordance with this Refund & Returns Policy and your statutory rights.
          </p>

          <h2>1. Our Return Policy</h2>
          <p>We accept returns for eligible purchases made through Aarth.</p>
          <p>If you have changed your mind about your purchase, you may request a return within 14 days of receiving your order, subject to the conditions set out below and applicable UK consumer law.</p>
          <p>You do not need to provide a reason for cancelling an eligible online order within the statutory cancellation period.</p>
          <p>This policy does not affect your legal rights.</p>

          <h2>2. How to Request a Return</h2>
          <p>To request a return, please contact us at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a>.</p>
          <p>Please include:</p>
          {/* Note: The user's content ends the sentence with a colon and no list items, so leaving it as provided */}

          <h2>3. Return Timeframe</h2>
          <p>For eligible online purchases, you must notify us that you wish to cancel within 14 days of receiving the goods.</p>
          <p>Once you have notified us, you generally have a further 14 days to send the goods back.</p>
          <p>Where a return is made under the statutory cancellation right, we will process the applicable refund in accordance with UK consumer law.</p>
          <p>For voluntary returns outside any statutory cancellation right, any additional return period or conditions offered by Aarth will be stated separately at the time of purchase.</p>

          <h2>4. Condition of Returned Items</h2>
          <p>To help us maintain the quality and integrity of Aarth garments, returned items should be:</p>
          {/* Same here, it ends abruptly in the prompt, leaving as is */}

          <h2>5. Items We May Not Accept as a Change-of-Mind Return</h2>
          <p>Subject to your statutory rights, we may refuse or reduce a change-of-mind refund where an item has been returned in a condition that goes beyond reasonable inspection.</p>
          <p>This may include items that:</p>

          <h2>6. Trying On Your Aarth Article</h2>
          <p>We understand that you may need to try an article on to determine whether it is suitable.</p>
          <p>You may try on an item as you reasonably would in a shop.</p>
          <p>For clothing, please take reasonable care to avoid makeup, deodorant, perfume, jewellery or anything else that could mark or damage the garment.</p>
          <p>An item that has only been reasonably tried on may remain eligible for return.</p>

          <h2>7. Returns of Sale or Promotional Items</h2>
          <p>Items purchased using a promotional code or during a sale may still be eligible for return where applicable.</p>
          <p>Your statutory rights are not affected by the use of a promotional code or by the item being purchased at a reduced price.</p>
          <p>Where a promotional offer contains specific return terms, those terms will be communicated at the time of the promotion and will not override your statutory rights.</p>

          <h2>8. Promotional Codes and Refunds</h2>
          <p>If you used a promotional code when placing your order, any refund will normally reflect the amount actually paid for the returned item.</p>
          <p>A promotional code does not create a cash value unless expressly stated otherwise.</p>
          <p>If a promotional code was conditional on purchasing multiple items, receiving a minimum order value, or receiving a particular promotional benefit, returning items may affect your eligibility for that promotion.</p>
          <p>Where permitted, we may recalculate the value of the promotional benefit when processing a return.</p>

          <h2>9. Faulty, Damaged or Incorrect Items</h2>
          <p>If your Aarth article arrives faulty, damaged, incorrect, not as described, or otherwise does not conform to the contract, please contact us as soon as reasonably possible at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a>.</p>
          <p>Please include photographs of the issue where possible so that we can assess the problem quickly.</p>
          <p>We will work with you to provide the appropriate remedy in accordance with your statutory rights.</p>
          <p>This may include a repair, replacement, price reduction or refund, depending on the circumstances and the rights available to you under applicable law.</p>
          <p>If an item is genuinely faulty or incorrectly supplied, you should not treat it as an ordinary change-of-mind return.</p>

          <h2>10. Damaged Packaging</h2>
          <p>If your parcel arrives visibly damaged, please photograph the packaging and the item before disposing of any packaging materials.</p>
          <p>Contact us at <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> as soon as possible.</p>
          <p>We may request photographs or other information to help us investigate the issue with the delivery provider.</p>
          <p>Your statutory rights remain unaffected.</p>

          <h2>11. Return Delivery Costs</h2>
          <p>For a change-of-mind cancellation under the statutory cancellation right, the customer is generally responsible for the direct cost of returning the goods unless Aarth has agreed to cover those costs or applicable law requires otherwise.</p>
          <p>Where an item is faulty, damaged, incorrect or otherwise does not conform to the contract, Aarth will deal with the return in accordance with the applicable statutory rights.</p>
          <p>We will provide appropriate instructions where a return is required.</p>

          <h2>12. Original Delivery Charges</h2>
          <p>Where you exercise a statutory cancellation right, we will refund the applicable standard delivery charge paid for the original order, in accordance with applicable law.</p>
          <p>If you selected a more expensive delivery option, we are generally only required to refund the cost of the least expensive standard delivery option available.</p>
          <p>Additional delivery charges chosen by you are not necessarily refundable.</p>

          <h2>13. Refund Processing</h2>
          <p>Once we receive your returned item, we will inspect it where necessary and process the applicable refund.</p>
          <p>For statutory cancellations, refunds will be made in accordance with the applicable legal timeframe.</p>
          <p>Refunds will generally be made using the same payment method used for the original transaction, unless another method has been expressly agreed.</p>
          <p>Where the law permits a deduction because the value of an item has been diminished through handling beyond what was reasonably necessary to inspect it, the appropriate amount may be deducted from the refund.</p>

          <h2>14. No Exchange Policy</h2>
          <p>Aarth does not currently offer direct exchanges.</p>
          <p>If you require a different size, colour or article, you may return the original item where eligible and place a new order separately.</p>
          <p>This does not affect your statutory rights relating to faulty, damaged, incorrect or misdescribed goods.</p>

          <h2>15. Limited Drops</h2>
          <p>Aarth releases selected articles through limited drops.</p>
          <p>A limited drop does not remove or restrict your statutory consumer rights.</p>
          <p>Eligible items purchased as part of a limited drop may be returned in accordance with this policy.</p>
          <p>Because certain Aarth articles may be produced in limited quantities, a return does not guarantee that the same article, size or colour will remain available for a replacement purchase.</p>

          <h2>16. Items Purchased as Gifts</h2>
          <p>If an item was purchased as a gift, our return process generally requires the original order details or other reasonable proof of purchase.</p>
          <p>Refunds will normally be issued to the original payment method used to purchase the order.</p>
          <p>If you are returning an item because it is faulty, damaged or incorrect, please contact us so that we can advise you on the appropriate process.</p>

          <h2>17. International Returns</h2>
          <p>Aarth currently ships to the:</p>
          <ul>
            <li>United Kingdom</li>
            <li>Europe</li>
            <li>United States</li>
            <li>Canada</li>
          </ul>
          <p>International customers are responsible for following the return instructions provided by Aarth.</p>
          <p>Unless otherwise required by applicable law, customers returning an item because they have changed their mind are responsible for the applicable return shipping costs.</p>
          <p>Customers outside the UK may also be responsible for any costs associated with customs, duties, taxes or other charges arising from an international return where applicable.</p>

          <h2>18. Items That Cannot Be Returned Because of Their Condition</h2>
          <p>Where legally permitted, we may refuse a change-of-mind return or make an appropriate deduction where the condition of the returned item shows that it has been used beyond reasonable inspection.</p>
          <p>For example, we may consider:</p>
          <ul>
            <li>Visible signs of wear</li>
            <li>Washing or cleaning</li>
            <li>Alterations</li>
            <li>Damage</li>
            <li>Staining</li>
            <li>Makeup or cosmetic marks</li>
            <li>Deodorant marks</li>
            <li>Strong fragrance or smoke odour</li>
            <li>Missing labels or tags</li>
            <li>Material stretching or distortion</li>
            <li>Damage caused after delivery</li>
          </ul>
          <p>We will assess each return reasonably and in accordance with applicable consumer law.</p>

          <h2>19. Your Statutory Rights</h2>
          <p>Nothing in this policy limits, excludes or replaces rights that cannot legally be excluded.</p>
          <p>For online purchases in the UK, consumers generally have a statutory right to cancel within 14 days of receiving goods, subject to applicable exceptions. Consumers may handle goods as reasonably necessary to establish their nature, characteristics and functioning, but may be responsible for diminished value caused by handling beyond that which is necessary.</p>
          <p>Consumers also have statutory rights where goods are faulty, not as described, or otherwise fail to meet the requirements imposed by applicable consumer law.</p>
          <p>Nothing in this Refund &amp; Returns Policy is intended to restrict those rights.</p>

          <h2>20. Proof of Purchase</h2>
          <p>We may ask you for reasonable proof that the item was purchased from Aarth.</p>
          <p>This may include:</p>
          <ul>
            <li>Your order number</li>
            <li>Order confirmation email</li>
            <li>Delivery confirmation</li>
            <li>Payment confirmation</li>
            <li>Other reasonable evidence of purchase</li>
          </ul>

          <h2>21. Items Purchased Through Third Parties</h2>
          <p>If you purchased an Aarth article through an authorised third-party retailer or platform rather than directly from aarth.uk, you should normally contact the retailer or platform from which you purchased the item.</p>
          <p>The return terms of that retailer or platform may apply, alongside any statutory rights you may have.</p>

          <h2>22. Contact Us</h2>
          <p>For all return and refund enquiries, please contact:</p>
          <p>
            ARTH STUDIO LIMITED<br />
            Company number: 17091464<br />
            Email: <a href="mailto:hello@aarth.uk">hello@aarth.uk</a><br />
            Website: <a href="https://aarth.uk" target="_blank" rel="noopener noreferrer">aarth.uk</a>
          </p>
          <p>When contacting us about a return, please include your order number so that we can assist you as quickly as possible.</p>

          <h2>23. Changes to This Policy</h2>
          <p>We may update this Refund &amp; Returns Policy from time to time to reflect changes to our business, products, services or applicable legal requirements.</p>
          <p>The version applicable to your purchase will generally be the version in force at the time your order was placed, subject to any mandatory legal requirements.</p>

          <h2>24. Important Note</h2>
          <p>Aarth is committed to making every article with care and purpose.</p>
          <p>Our designs are inspired by India’s rich culture, heritage and values, and each article represents a part of that wider creative story. We ask customers returning an item to treat it with the same care with which it was created.</p>
          <p>This policy should be read together with Aarth's Terms of Service and Shipping Policy.</p>

        </div>
      </div>
    </div>
  );
};
