import { useEffect, useRef, useState } from 'react';
import ComingSoon from './ComingSoon';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { ProductCard } from './components/ProductCard';
import { CustomCursor } from './components/CustomCursor';
import { ArchivalSeal } from './components/ArchivalSeal';
import { ArchivalTicker } from './components/ArchivalTicker';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        { url: "/assets/product-2.jpg", altText: "Cacao Kurta Back" }
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
        { url: "/assets/product-3.jpg", altText: "Taupe Kimono Detail" }
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
        { url: "/assets/product-4.jpg", altText: "Pearl Tunic Texture" }
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
        { url: "/assets/product-1.jpg", altText: "Relaxed Trousers Model" }
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

      {/* Rotating Archival Heritage Seal */}
      <ArchivalSeal />

      <div className="announcement-bar">
        <span className="announcement-text-mobile">Atelier Edition 01 — London & Gujarat</span>
        <div className="announcement-full-desktop">
          <span>Complimentary UK Dispatch On Orders Above £50</span>
          <span className="ticker-flourish">✦</span>
          <ArchivalTicker />
          <span className="ticker-flourish">✦</span>
          <span>Est. 2026 — The Archival Record</span>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
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

          {/* Desktop navigation links */}
          <div className="desktop-nav-links">
            <a href="#collection" className="nav-link">Collection</a>
            <a href="#stories" className="nav-link">Stories</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>

        <div className="nav-center">
          <a href="#" className="brand-logo-link">
            <img src="/assets/aarth-logo.png" alt="AARTH Logo" className="brand-logo-img" />
          </a>
        </div>

        <div className="nav-right">
          <button 
            className="search-toggle-btn nav-icon" 
            aria-label="Search the archive"
            onClick={() => setSearchOpen(true)}
            title="Search Archive (Motif, Silhouette, Craft)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <a href="#contact" className="nav-icon desktop-account-link" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </a>
          <button 
            className="cart-toggle-btn nav-link" 
            onClick={openCart}
            aria-label={`Open shopping cart with ${cart?.totalQuantity || 0} items`}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span className="cart-label">Cart [{cart?.totalQuantity || 0}]</span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/assets/aarth-logo.png" alt="AARTH" className="mobile-drawer-logo" />
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
              <a href="#collection" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span>01</span> Collection
              </a>
              <a href="#stories" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span>02</span> Stories & Loom
              </a>
              <a href="#contact" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
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

      <main>
        {/* Hero Section with Interactive Parallax */}
        <section 
          className="hero-section" 
          id="hero"
          onMouseMove={handleHeroMouseMove}
        >
          <div 
            className="hero-image-wrapper"
            style={{
              transform: `translate3d(${heroParallax.x * -16}px, ${heroParallax.y * -12}px, 0) scale(1.03)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <picture className="hero-picture">
              <source media="(max-width: 768px)" srcSet="/assets/hero-banner-mobile-transparent.png" />
              <img src="/assets/hero-banner-transparent.png" alt="AARTH Heritage Handloom Silhouettes" className="hero-image" />
            </picture>
          </div>
          
          <div className="hero-bottom-mark">
            <span>AARTH</span>
            <div className="hero-scroll-line"></div>
          </div>
        </section>

        {/* Collection Section with Interactive 3D Product Cards */}
        <section className="products-section" id="collection">
          <div className="container-wide">
            <header className="section-header-antique">
              <div className="section-header-flourish">❦ — ✦ — ❧</div>
              <div className="section-eyebrow">Handloom Edition • No. 01</div>
              <h2 className="section-title">The Curated Archive</h2>
              <div className="section-divider-line">
                <span></span>
                <i>
                  {loadingProducts 
                    ? "Accessing Loom Archive..." 
                    : `Selected Silhouettes [${displayProducts.length} of ${displayProducts.length}]`}
                </i>
                <span></span>
              </div>
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
            <span className="video-caption-eyebrow">Atelier in Motion • Loom & Thread</span>
            <h2 className="video-caption-title">The Drape of Living Tradition</h2>
            <button 
              className="btn-stories"
              onClick={() => {
                const el = document.getElementById("collection");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Collection
            </button>
          </div>

          <button 
            className="video-control-pill"
            onClick={toggleVideo}
            aria-label={isPlayingVideo ? "Pause video reel" : "Play video reel"}
          >
            <span>{isPlayingVideo ? "❚❚" : "▶"}</span>
            <span>{isPlayingVideo ? "PAUSE REEL" : "RESUME REEL"}</span>
          </button>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <img src="/assets/aarth-logo.png" alt="AARTH Logo" className="footer-logo" />
              <p className="footer-text">Preserving the unyielding craft of the subcontinent through structured silhouettes and botanical dyes.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Join the Archive" className="newsletter-input" />
                <button className="newsletter-submit">Subscribe</button>
              </div>
            </div>
            <div className="footer-col">
              <h4>Atelier</h4>
              <ul className="footer-nav">
                <li><a href="#collection">Collection 01</a></li>
                <li><a href="#stories">The Process</a></li>
                <li><a href="#hero">Our Silhouettes</a></li>
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

      {/* Product Quick View / Detail Modal with 3.2X Fabric Texture Magnifier */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

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
