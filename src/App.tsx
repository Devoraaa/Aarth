import { useEffect, useRef, useState } from 'react';
import ComingSoon from './ComingSoon';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { SearchModal } from './components/SearchModal';
import { ProductCard } from './components/ProductCard';
import { CustomCursor } from './components/CustomCursor';
import { VintagePocketChronometer } from './components/VintagePocketChronometer';
import { VintageAtmosphere } from './components/VintageAtmosphere';
import { getProducts, type ShopifyProduct } from './lib/shopify';

function StorefrontContent() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);

  // Video Reel Interactive Play/Pause
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Hero Mouse Parallax
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  const { cart, openCart, addItem, loading: cartLoading } = useCart();
  const [firstScrollTriggered, setFirstScrollTriggered] = useState(false);
  const prevScrolledRef = useRef(false);

  useEffect(() => {
    let timer: number | null = null;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 25;
      if (isScrolled !== prevScrolledRef.current) {
        if (isScrolled) {
          setFirstScrollTriggered(true);
          if (timer) clearTimeout(timer);
          timer = window.setTimeout(() => setFirstScrollTriggered(false), 1400);
        }
        prevScrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Fetch live products from Shopify Storefront API
    getProducts(12)
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch products from Shopify:", err);
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  }, []);

  // Fallback curated mock products if Shopify store has no products yet
  const fallbackProducts: ShopifyProduct[] = [
    {
      id: "mock-1",
      handle: "cacao-handloom-raw-silk-kurta",
      title: "Cacao Handloom Raw Silk Kurta",
      description: "Pitloom Silk • Bhagalpur",
      descriptionHtml: "<p>Pitloom Silk • Bhagalpur. Hand-spun raw silk with natural luster.</p>",
      tags: ["Pitloom Silk • Bhagalpur"],
      priceRange: { minVariantPrice: { amount: "35.00", currencyCode: "GBP" } },
      images: [
        { url: "/assets/product-1.jpg", altText: "Cacao Kurta" },
        { url: "/assets/product-2.jpg", altText: "Cacao Kurta Back" },
        { url: "/assets/product-3.jpg", altText: "Cacao Kurta Detail" },
        { url: "/assets/product-4.jpg", altText: "Cacao Kurta Texture" }
      ],
      variants: [{ id: "mock-v-1", title: "Default", availableForSale: true, price: { amount: "35.00", currencyCode: "GBP" } }]
    },
    {
      id: "mock-2",
      handle: "taupe-block-print-artisanal-kimono",
      title: "Taupe Block-Print Artisanal Kimono",
      description: "Bagru Mud-Resist • Handloom Cotton",
      descriptionHtml: "<p>Bagru Mud-Resist • Handloom Cotton. Traditional mud-resist hand-block print.</p>",
      tags: ["Bagru Mud-Resist • Handloom Cotton"],
      priceRange: { minVariantPrice: { amount: "35.00", currencyCode: "GBP" } },
      images: [
        { url: "/assets/product-2.jpg", altText: "Taupe Kimono" },
        { url: "/assets/product-3.jpg", altText: "Taupe Kimono Detail" },
        { url: "/assets/product-1.jpg", altText: "Taupe Kimono Texture" }
      ],
      variants: [{ id: "mock-v-2", title: "Default", availableForSale: true, price: { amount: "35.00", currencyCode: "GBP" } }]
    },
    {
      id: "mock-3",
      handle: "pearl-pleated-chanderi-tunic",
      title: "Pearl Pleated Chanderi Tunic",
      description: "Chanderi Weave • Pure Zari Thread",
      descriptionHtml: "<p>Chanderi Weave • Pure Zari Thread. Ethereal drape with delicate gold zari.</p>",
      tags: ["Chanderi Weave • Pure Zari Thread"],
      priceRange: { minVariantPrice: { amount: "35.00", currencyCode: "GBP" } },
      images: [
        { url: "/assets/product-3.jpg", altText: "Pearl Tunic" },
        { url: "/assets/product-4.jpg", altText: "Pearl Tunic Texture" },
        { url: "/assets/product-2.jpg", altText: "Pearl Tunic Back" }
      ],
      variants: [{ id: "mock-v-3", title: "Default", availableForSale: true, price: { amount: "35.00", currencyCode: "GBP" } }]
    },
    {
      id: "mock-4",
      handle: "leather-dyed-relaxed-trousers",
      title: "Leather-Dyed Relaxed Trousers",
      description: "Iron-Vat Fermented • Structured Drape",
      descriptionHtml: "<p>Iron-Vat Fermented • Structured Drape. Fermented botanical dye tailored trousers.</p>",
      tags: ["Iron-Vat Fermented • Structured Drape"],
      priceRange: { minVariantPrice: { amount: "35.00", currencyCode: "GBP" } },
      images: [
        { url: "/assets/product-4.jpg", altText: "Relaxed Trousers" },
        { url: "/assets/product-1.jpg", altText: "Relaxed Trousers Model" },
        { url: "/assets/product-3.jpg", altText: "Relaxed Trousers Detail" }
      ],
      variants: [{ id: "mock-v-4", title: "Default", availableForSale: true, price: { amount: "35.00", currencyCode: "GBP" } }]
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const handleQuickAdd = async (e: React.MouseEvent, product: ShopifyProduct) => {
    e.stopPropagation();
    const variantId = product.variants[0]?.id;
    if (variantId) {
      await addItem(variantId, 1);
    }
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroParallax({ x, y });
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlayingVideo(true);
      } else {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      }
    }
  };

  return (
    <>
      {/* Custom Vintage Crosshair & Loom Follower */}
      <CustomCursor />

      {/* Atmospheric 1906 Dust Breeze, Ink Spills & Scattered Atelier Artifacts */}
      <VintageAtmosphere />

      {/* 1906 Antique Brass Pocket Chronometer in Bottom-Right Corner */}
      <VintagePocketChronometer />

      <nav 
        className={`navbar ${scrolled ? 'scrolled' : ''} ${firstScrollTriggered ? 'first-scroll-active' : ''} ${selectedProduct ? 'pdp-navbar-mode' : ''}`}
      >
        {/* Vintage First-Scroll Wax Seal Flash */}
        <div className="nav-scroll-wax-wave" aria-hidden="true" />

        <div className="nav-left">
          {/* Mobile hamburger toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Desktop navigation links with Running Stitch */}
          <div className="desktop-nav-links">
            <a 
              href="#collection" 
              className="nav-link"
              onClick={() => setSelectedProduct(null)}
            >
              <span className="nav-link-num">01</span>
              <span className="nav-link-text">Collection</span>
              <span className="nav-link-flourish">✦</span>
              <span className="nav-running-stitch" aria-hidden="true" />
            </a>
            <a 
              href="#stories" 
              className="nav-link"
              onClick={() => setSelectedProduct(null)}
            >
              <span className="nav-link-num">02</span>
              <span className="nav-link-text">Stories</span>
              <span className="nav-link-flourish">✦</span>
              <span className="nav-running-stitch" aria-hidden="true" />
            </a>
            <a href="#contact" className="nav-link">
              <span className="nav-link-num">03</span>
              <span className="nav-link-text">Contact</span>
              <span className="nav-link-flourish">✦</span>
              <span className="nav-running-stitch" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="nav-center">
          <a 
            href="#" 
            className="brand-logo-link"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="brand-logo-box">
              {/* Antique Loom Compass Wheel behind Monogram */}
              <div className="logo-loom-ring" aria-hidden="true" />
              <img src="/assets/aarth-logo.png" alt="AARTH Logo" className="brand-logo-img" />
              <span className="brand-sub-badge">HERITAGE SILHOUETTES</span>
            </div>
          </a>
        </div>

        <div className="nav-right">
          <button 
            className="search-toggle-btn nav-icon nav-action-btn" 
            aria-label="Search the archive"
            onClick={() => setSearchOpen(true)}
            title="Search Archive (Motif, Silhouette, Craft)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span className="nav-icon-tooltip">SEARCH</span>
          </button>
          <a href="#contact" className="nav-icon desktop-account-link nav-action-btn" aria-label="Account" title="Atelier Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-svg-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span className="nav-icon-tooltip">ATELIER</span>
          </a>
          <button 
            className="cart-toggle-btn nav-link-cart" 
            onClick={openCart}
            aria-label={`Open shopping cart with ${cart?.totalQuantity || 0} items`}
          >
            <span className="cart-btn-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-svg-tote"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span className="cart-label">Bag</span>
              <span className={`cart-count-badge ${(cart?.totalQuantity || 0) > 0 ? 'has-items' : ''}`}>({cart?.totalQuantity || 0})</span>
            </span>
          </button>
        </div>

        {/* Animated Loom Weave Thread Shimmer */}
        <div className="navbar-weave-shimmer" aria-hidden="true" />
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/assets/aarth-logo-white.png" alt="AARTH Logo" className="mobile-drawer-logo" />
              <button 
                className="mobile-drawer-close" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-drawer-flourish">❦ — ✦ — ❧</div>

            <nav className="mobile-drawer-nav">
              <a 
                href="#search" 
                className="mobile-drawer-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <span>00</span> Search Archive
              </a>
              <a 
                href="#collection" 
                className="mobile-drawer-link" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSelectedProduct(null);
                }}
              >
                <span>01</span> Collection
              </a>
              <a 
                href="#stories" 
                className="mobile-drawer-link" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSelectedProduct(null);
                }}
              >
                <span>02</span> Stories & Loom
              </a>
              <a 
                href="#contact" 
                className="mobile-drawer-link" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>03</span> Contact & Atelier
              </a>
              <a 
                href="#cart" 
                className="mobile-drawer-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  openCart();
                }}
              >
                <span>04</span> Bag [{cart?.totalQuantity || 0}]
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <p>A UK-based clothing brand bringing Indian culture into everyday fashion</p>
              <span>Made in India</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT: Conditional Product Detail Page vs Homepage */}
      {selectedProduct ? (
        <main>
          <ProductDetailPage
            product={selectedProduct}
            allProducts={displayProducts}
            onBack={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        </main>
      ) : (
        <main>
          {/* Hero Section with Parallax, Interactive Candlelight Beam & Dust Motes */}
          <section 
            className="hero-section" 
            id="hero"
            onMouseMove={handleHeroMouseMove}
          >
            <div 
              className="hero-image-wrapper"
              style={{
                transform: `translate3d(${heroParallax.x * -8}px, ${heroParallax.y * -6}px, 0)`,
                transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <picture className="hero-picture">
                <source media="(max-width: 768px)" srcSet="/assets/hero-banner-mobile-transparent.png" />
                <img src="/assets/hero-banner-transparent.png" alt="AARTH Heritage Handloom Silhouettes" className="hero-image" />
              </picture>
            </div>

            <div className="hero-bottom-mark">
              <span>AARTH • MDCCCCVI</span>
              <div className="hero-scroll-line"></div>
            </div>
          </section>

          {/* Collection Section with Interactive 3D Product Cards */}
          <section className="products-section" id="collection">
            <div className="container-wide">
              <header className="section-header-1906">
                <div className="folio-label-row">
                  <span className="folio-label-left">CATALOGUE OF BESPOKE LOTS</span>
                  <span className="folio-label-center">
                    ❦ ANNO MDCCCCVI • {loadingProducts ? "CONSULTING REGISTER..." : "EDITION NO. I"} ❦
                  </span>
                  <span className="folio-label-right">MAYFAIR &amp; CALCUTTA REGISTRY</span>
                </div>
                <div className="oxford-double-line" />
                <h2 className="broadsheet-headline">The Curated Broadside Archive</h2>
                <p className="broadsheet-intro-p">
                  Bespoke subcontinental silhouettes, loomed on wooden pedal frames in Eastern residencies and tailored in the West End of London.
                </p>
                <div className="oxford-single-line" />
              </header>

              <div className="products-grid-4">
                {displayProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onSelect={(p) => setSelectedProduct(p)}
                    onQuickAdd={handleQuickAdd}
                    loading={cartLoading}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Moving Design Reel with Interactive Play/Pause */}
          <section className="moving-design-section" id="stories">
            <div className="video-container">
              <video 
                ref={videoRef}
                className="bg-video" 
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/assets/fashion-moving-seamless.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay"></div>
            </div>

            <div className="video-content">
              <span className="video-caption-eyebrow">CHINÉMATOGRAPHE DISPATCH • MDCCCCVI</span>
              <h2 className="video-caption-title">The Drape of Living Tradition</h2>
              <button 
                className="btn-stories"
                onClick={() => {
                  const el = document.getElementById("collection");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ACQUIRE FROM ARCHIVE ☞
              </button>
            </div>

            <button 
              className="video-control-pill"
              onClick={toggleVideo}
              aria-label={isPlayingVideo ? "Halt motion reel" : "Resume motion reel"}
            >
              <span>{isPlayingVideo ? "❚❚" : "▶"}</span>
              <span>{isPlayingVideo ? "HALT MOTION" : "RESUME MOTION"}</span>
            </button>
          </section>
        </main>
      )}

      {/* Global Site Footer */}
      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <img src="/assets/aarth-logo-white.png" alt="AARTH Logo" className="footer-logo" />
              <p className="footer-text">Preserving the unyielding craft of the subcontinent through structured silhouettes and botanical dyes.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Join the Archive" className="newsletter-input" />
                <button className="newsletter-submit">Subscribe</button>
              </div>
            </div>
            <div className="footer-col">
              <h4>Atelier</h4>
              <ul className="footer-nav">
                <li>
                  <a 
                    href="#collection"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Collection 01
                  </a>
                </li>
                <li>
                  <a 
                    href="#stories"
                    onClick={() => setSelectedProduct(null)}
                  >
                    The Process
                  </a>
                </li>
                <li>
                  <a 
                    href="#hero"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Our Silhouettes
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-nav">
                <li><a href="mailto:Hello@aarth.uk">Contact Us</a></li>
                <li><a href="#collection">Shipping & Delivery</a></li>
                <li><a href="#collection">Returns & Exchange</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul className="footer-nav">
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 AARTH. All Rights Reserved.</span>
            <span>Crafted in India</span>
          </div>
        </div>
      </footer>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Interactive Live Search & Filter Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={displayProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAdd={handleQuickAdd}
      />
    </>
  );
}

function App() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check if the user unlocked the storefront
    if (localStorage.getItem("aarth_access") === "true") {
      setHasAccess(true);
    }
  }, []);

  if (!hasAccess) {
    return <ComingSoon />;
  }

  return (
    <CartProvider>
      <StorefrontContent />
    </CartProvider>
  );
}

export default App;
