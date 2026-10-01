import React, { useEffect } from "react";

interface TermsPageProps {
  onClose: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onClose }) => {
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
          <h1 className="section-title">Aarth — Terms of Service</h1>
        </header>

        <div className="legal-content">
          <p className="legal-date">Last updated: 30 September 2026</p>

          <h2>1. GENERAL</h2>
          <p>These Terms of Service apply to all users of the website, including browsers, customers and contributors of content.</p>
          <p>By using our website, you confirm that you are legally capable of entering into a binding agreement.</p>
          <p>If you do not agree with these Terms, you should not use our website or purchase products from us.</p>
          <p>We reserve the right to update, change or replace any part of these Terms by posting updates to our website. Your continued use of the website following the posting of changes constitutes acceptance of those changes.</p>

          <h2>2. ABOUT AARTH</h2>
          <p>Aarth is operated by:</p>
          <p>
            ARTH STUDIO LIMITED<br />
            Company number: 17091464<br />
            Email: <a href="mailto:hello@aarth.uk">hello@aarth.uk</a><br />
            Website: <a href="https://aarth.uk" target="_blank" rel="noopener noreferrer">aarth.uk</a>
          </p>
          <p>Aarth is a clothing and lifestyle brand operating through limited product releases and drops.</p>
          <p>Our products may be released in limited quantities. Once a product or size sells out, we do not guarantee that it will be restocked.</p>

          <h2>3. ONLINE STORE TERMS</h2>
          <p>By agreeing to these Terms, you represent that you are at least the age of majority in your country, state or province of residence, or that you have given us permission to allow any minor dependent to use this website.</p>
          <p>You may not use our products or website for any unlawful or unauthorised purpose.</p>
          <p>You must not violate any laws applicable to you while using our website, including copyright laws and other intellectual property laws.</p>
          <p>A breach of these Terms may result in the termination of your access to our services.</p>

          <h2>4. PRODUCTS</h2>
          <p>We make every reasonable effort to display our products and their details as accurately as possible.</p>
          <p>Product images are provided for illustrative purposes. Due to differences in screens, displays and lighting, colours may appear slightly different from the physical product.</p>
          <p>We reserve the right to modify product descriptions, change product specifications, discontinue products, limit quantities available for purchase, or refuse sales where necessary.</p>
          <p>We do not guarantee that all products shown on our website will remain available.</p>

          <h2>5. LIMITED DROPS</h2>
          <p>Aarth operates a limited-drop model.</p>
          <p>This means products may be produced or released in limited quantities.</p>
          <p>Limited-drop products may sell out quickly and may not be restocked.</p>
          <p>A product being displayed on the website does not guarantee that it will remain available until you complete your purchase.</p>
          <p>We may also impose reasonable purchase limits on particular products or customers where necessary.</p>

          <h2>6. PRICES</h2>
          <p>Our standard product price is currently £35 per item, unless a different price is displayed on the relevant product page or a valid promotional offer applies.</p>
          <p>Delivery charges are separate and are calculated or displayed at checkout.</p>
          <p>All prices displayed on the website are subject to change without notice.</p>
          <p>Any price change will not affect an order that has already been accepted.</p>
          <p>We reserve the right to correct pricing errors or inaccuracies.</p>
          <p>If an obvious pricing error occurs and an order has been placed at an incorrect price, we may contact you to confirm whether you wish to proceed at the correct price or cancel the order and provide an appropriate refund.</p>

          <h2>7. ORDERS</h2>
          <p>When you place an order through aarth.uk, you are making an offer to purchase the products in your order.</p>
          <p>After placing an order, you should receive an order confirmation by email.</p>
          <p>Receipt of an order confirmation does not necessarily mean that your order has been accepted.</p>
          <p>We reserve the right to accept or decline an order.</p>
          <p>A contract between you and Aarth is formed when we accept your order and confirm that the products have been dispatched, unless otherwise required by law.</p>
          <p>We may refuse or cancel an order where the product is unavailable; there is an obvious pricing or description error; we suspect fraudulent activity; payment cannot be authorised; there is an error in the order; purchase limits have been exceeded; or circumstances outside our reasonable control prevent fulfilment.</p>
          <p>If we cancel an order after payment has been taken, we will refund the amount paid for the cancelled products.</p>

          <h2>8. PAYMENT</h2>
          <p>You agree to provide accurate and complete payment and billing information when placing an order.</p>
          <p>Payment must be successfully authorised before an order can be processed.</p>
          <p>We may use third-party payment providers to process transactions.</p>
          <p>By submitting payment details, you confirm that you are authorised to use the payment method provided.</p>
          <p>We are not responsible for delays caused by payment providers, banks or other financial institutions.</p>

          <h2>9. PROMOTIONAL CODES</h2>
          <p>From time to time, Aarth may offer promotional codes, discount codes or other promotional offers.</p>
          <p>Unless otherwise stated, promotional codes must be entered at checkout; cannot be applied retrospectively; cannot be exchanged for cash; cannot normally be combined; may have expiry dates; may apply only to selected products; may be subject to minimum spend requirements; and may be limited to one use per customer or order.</p>
          <p>We reserve the right to cancel or refuse the use of a promotional code where we reasonably believe it has been obtained, shared or used improperly.</p>
          <p>Specific terms displayed with an individual promotion will take precedence over these general terms.</p>

          <h2>10. DELIVERY</h2>
          <p>Aarth currently delivers to the United Kingdom, Europe, Canada and United States of America.</p>
          <p>Available delivery methods, delivery charges and estimated delivery times will be shown during checkout.</p>
          <p>Delivery times are estimates and may vary depending on destination, courier availability and circumstances outside our control.</p>
          <p>We are not responsible for delays caused by courier or postal services, customs, strikes, adverse weather, public holidays, incorrect delivery information, import procedures, or other circumstances outside our reasonable control.</p>
          <p>Nothing in these Terms limits your statutory rights where goods fail to arrive within a legally required timeframe.</p>

          <h2>11. INTERNATIONAL ORDERS</h2>
          <p>Customers ordering outside the United Kingdom are responsible for providing accurate delivery information.</p>
          <p>International orders may be subject to customs duties, import taxes or other charges imposed by the destination country.</p>
          <p>Where applicable, these charges are the responsibility of the customer unless otherwise stated at checkout.</p>
          <p>Customers are responsible for ensuring that products purchased from Aarth may legally be imported into their destination country.</p>
          <p>Customs delays are outside our control and may affect estimated delivery times.</p>

          <h2>12. RETURNS</h2>
          <p>If you purchase from Aarth online as a consumer, you may have a statutory right to cancel your order even if the product is not faulty.</p>
          <p>For applicable UK distance sales, you generally have 14 days from the day after receiving your goods to tell us that you wish to cancel your purchase.</p>
          <p>After notifying us, you generally have a further 14 days to return the goods.</p>
          <p>You do not normally need to provide a reason for exercising this cancellation right.</p>
          <p>To start a return or cancellation, please contact <a href="mailto:hello@aarth.uk">hello@aarth.uk</a> and include your order number and the product(s) you wish to return.</p>
          <p>This cancellation right is separate from your statutory rights relating to faulty or incorrectly supplied goods.</p>

          <h2>13. RETURN CONDITION</h2>
          <p>Where you are exercising a statutory cancellation right, you may handle the product as reasonably necessary to establish its nature, characteristics and functioning.</p>
          <p>Products should be returned in a condition that allows us to inspect them.</p>
          <p>Where reasonably possible, products should be returned with original labels, original packaging, accessories supplied with the product, and any other items included with the order.</p>
          <p>Where the value of goods has been reduced because they have been handled beyond what is reasonably necessary to inspect them, applicable law may allow us to make an appropriate deduction from the refund.</p>

          <h2>14. NO EXCHANGE POLICY</h2>
          <p>Aarth does not currently offer direct exchanges.</p>
          <p>If you require another size, colour or product, you should return the original item where eligible and place a new order.</p>
          <p>This does not affect your statutory rights relating to faulty, damaged, misdescribed or incorrectly supplied goods.</p>

          <h2>15. FAULTY OR DAMAGED PRODUCTS</h2>
          <p>We take reasonable care when preparing and dispatching orders.</p>
          <p>If your product arrives damaged, faulty or materially different from what you ordered, please contact <a href="mailto:hello@aarth.uk">hello@aarth.uk</a>.</p>
          <p>Please provide your order number, details of the issue, and photographs where appropriate.</p>
          <p>We may ask you to return the product for inspection.</p>
          <p>Where a product does not meet your statutory consumer rights, we will provide the remedy required by applicable law.</p>
          <p>Depending on the circumstances, this may include a repair, replacement, price reduction or refund.</p>
          <p>Nothing in these Terms limits any legal rights you have in relation to faulty or misdescribed goods.</p>

          <h2>16. REFUNDS</h2>
          <p>Where a refund is due, it will normally be made to the original payment method.</p>
          <p>For valid statutory cancellations, refunds will be processed within the period required by applicable law.</p>
          <p>We may wait until we receive the returned goods, or until you provide evidence that the goods have been sent back, where permitted by law.</p>
          <p>Where applicable, the standard delivery charge paid for the original order will also be refunded. Any additional amount paid for an upgraded delivery service may not be refundable.</p>

          <h2>17. RETURN DELIVERY COSTS</h2>
          <p>Unless the product is faulty, damaged, incorrect or otherwise covered by a statutory remedy requiring Aarth to bear the cost, the customer may be responsible for the cost of returning an unwanted item.</p>
          <p>Nothing in this section affects any statutory rights that require Aarth to cover return costs.</p>

          <h2>18. PRODUCTS PURCHASED WITH DISCOUNT CODES</h2>
          <p>If a promotional code was used on an order, refunds will generally reflect the actual amount paid for the returned product.</p>
          <p>A promotional code does not create a cash value.</p>
          <p>Unless otherwise stated, promotional codes will not be reinstated after a return.</p>

          <h2>19. ACCURACY OF INFORMATION</h2>
          <p>We make reasonable efforts to ensure that information on our website is accurate and up to date.</p>
          <p>However, information may occasionally contain typographical errors, inaccuracies or omissions relating to product descriptions, pricing, promotions, availability, delivery information, or other website content.</p>
          <p>We reserve the right to correct errors and update information at any time without prior notice.</p>

          <h2>20. MODIFICATIONS TO PRODUCTS AND SERVICES</h2>
          <p>We reserve the right to modify, suspend or discontinue any part of the website, product range or service at any time.</p>
          <p>We will not be liable to you or any third party for any modification, suspension or discontinuation, subject always to your statutory rights.</p>

          <h2>21. INTELLECTUAL PROPERTY</h2>
          <p>All intellectual property appearing on aarth.uk belongs to Aarth or is used with permission.</p>
          <p>This includes Aarth trademarks, logos, names, graphics, photographs, artwork, product designs, written content, videos, website layouts, and other visual or written materials.</p>
          <p>You may not reproduce, copy, distribute, modify, sell, commercially exploit or otherwise use our intellectual property without our prior written permission.</p>

          <h2>22. PROHIBITED USES</h2>
          <p>You must not use the website for any unlawful purpose; to commit or facilitate fraud; to infringe intellectual property rights; to transmit malicious software; to interfere with website security; to collect personal information without authorisation; to attempt unauthorised access to our systems; to use automated purchasing systems where prohibited; to impersonate another person or business; or to interfere with the normal operation of the website.</p>
          <p>We reserve the right to restrict or terminate access where we reasonably believe these Terms have been breached.</p>

          <h2>23. THIRD-PARTY SERVICES</h2>
          <p>Our website may use third-party services and applications, including payment providers, delivery providers, analytics providers and ecommerce technology.</p>
          <p>Third-party services may have their own terms and privacy policies.</p>
          <p>Aarth is not responsible for the operation of third-party services that are outside our reasonable control.</p>

          <h2>24. PERSONAL INFORMATION</h2>
          <p>Your submission of personal information through the website is governed by our Privacy Policy.</p>
          <p>We process personal information where necessary to operate our website, process orders, provide customer support, arrange delivery, process payments and comply with our legal obligations.</p>

          <h2>25. WEBSITE AVAILABILITY</h2>
          <p>We do not guarantee that aarth.uk will always be available, uninterrupted or error-free.</p>
          <p>The website may occasionally be unavailable because of maintenance, updates, technical problems, security issues, hosting issues, or circumstances outside our reasonable control.</p>
          <p>We may suspend access to the website where reasonably necessary.</p>

          <h2>26. DISCLAIMER</h2>
          <p>To the fullest extent permitted by law, Aarth does not guarantee that use of the website will be uninterrupted, timely, secure or error-free.</p>
          <p>However, nothing in these Terms excludes or limits any liability or consumer right that cannot legally be excluded or limited.</p>
          <p>Our products will continue to be subject to applicable statutory rights, including requirements concerning satisfactory quality, fitness for purpose and conformity with their description.</p>

          <h2>27. LIMITATION OF LIABILITY</h2>
          <p>Nothing in these Terms excludes or limits liability for matters where such exclusion or limitation would be unlawful.</p>
          <p>This includes liability that cannot legally be excluded in relation to matters such as death or personal injury caused by negligence, fraud, fraudulent misrepresentation, or statutory consumer rights.</p>
          <p>Subject to the above, Aarth will not be liable for losses that are not reasonably foreseeable or that arise from circumstances outside our reasonable control.</p>

          <h2>28. EVENTS OUTSIDE OUR CONTROL</h2>
          <p>Aarth will not be responsible for a failure or delay in performing its obligations where the failure or delay results from circumstances outside our reasonable control.</p>
          <p>These circumstances may include natural disasters, severe weather, fire, flood, strikes, industrial disputes, courier disruption, postal disruption, customs delays, government restrictions, power failures, internet or telecommunications failures, cyber incidents, or other events beyond our reasonable control.</p>
          <p>Where reasonably possible, we will take steps to minimise the impact of such circumstances.</p>

          <h2>29. TERMINATION</h2>
          <p>We may suspend or terminate your access to the website if you breach these Terms or engage in unlawful, fraudulent or abusive activity.</p>
          <p>Termination will not affect any rights or obligations that arose before termination.</p>

          <h2>30. SEVERABILITY</h2>
          <p>If any provision of these Terms is found to be unlawful, invalid or unenforceable, that provision will be interpreted or removed to the minimum extent necessary.</p>
          <p>The remaining provisions will continue in full force and effect.</p>

          <h2>31. ENTIRE AGREEMENT</h2>
          <p>These Terms, together with any policies or information expressly incorporated into them, form the agreement between you and Aarth regarding your use of the website and purchase of products.</p>
          <p>Where applicable, statutory consumer rights will take precedence over any conflicting provision.</p>

          <h2>32. CHANGES TO THESE TERMS</h2>
          <p>We may update these Terms from time to time.</p>
          <p>Any updated version will be posted on this page with a revised "Last updated" date.</p>
          <p>The Terms applicable to an order will generally be those in force when the order was placed, subject to any mandatory legal requirements.</p>

          <h2>33. GOVERNING LAW</h2>
          <p>These Terms are governed by the laws of England and Wales.</p>
          <p>If you are a consumer, you will also retain any mandatory protections provided by the laws of the country in which you live where applicable.</p>
          <p>Nothing in these Terms prevents you from relying on mandatory consumer protection rights available to you.</p>

          <h2>34. CONTACT INFORMATION</h2>
          <p>If you have any questions about these Terms, your order, a return or our products, please contact us.</p>
          <p>
            ARTH STUDIO LIMITED<br />
            Company number: 17091464<br />
            Email: <a href="mailto:hello@aarth.uk">hello@aarth.uk</a><br />
            Website: <a href="https://aarth.uk" target="_blank" rel="noopener noreferrer">aarth.uk</a>
          </p>

          <h2>35. YOUR STATUTORY RIGHTS</h2>
          <p>Nothing in these Terms is intended to restrict, remove or exclude rights that you have under applicable consumer law.</p>
          <p>For example, UK consumer law provides protections concerning the quality, description and fitness of goods, and online customers may have cancellation rights for qualifying distance contracts.</p>
          <p>Where these Terms conflict with a mandatory legal right, the mandatory legal right will apply.</p>
          
        </div>
      </div>
    </div>
  );
};
