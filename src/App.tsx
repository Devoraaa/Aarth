import { useEffect, useRef, useState } from 'react';
import ComingSoon from './ComingSoon';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { SearchModal } from './components/SearchModal';
import { CountrySelector } from './components/CountrySelector';
import { ProductCard, ProductSkeleton } from './components/ProductCard';
import { CustomCursor } from './components/CustomCursor';
import { VintagePocketChronometer } from './components/VintagePocketChronometer';
import { VintageAtmosphere } from './components/VintageAtmosphere';
import { getProducts, getHeroSettings, getContactSettings, type ShopifyProduct } from './lib/shopify';
import { ContactPage } from './components/ContactPage';
import { RefundsPage } from './components/RefundsPage';
import { ShippingPage } from './components/ShippingPage';
import { TermsPage } from './components/TermsPage';
import { CollectionPage } from './components/CollectionPage';
import { StoriesPage } from './components/StoriesPage';
import { NewsletterPopup } from './components/NewsletterPopup';

function StorefrontContent() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [storiesMenuOpen, setStoriesMenuOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showStoriesPage, setShowStoriesPage] = useState(false);
  const [showCollectionPage, setShowCollectionPage] = useState(false);
  const [showRefundsPage, setShowRefundsPage] = useState(false);
  const [showShippingPage, setShowShippingPage] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(false);
  const [heroImages, setHeroImages] = useState<{ desktop: string | null; mobile: string | null }>({ desktop: null, mobile: null });
  const [contactVideoUrl, setContactVideoUrl] = useState<string | null>(null);

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

    getHeroSettings().then((settings) => {
      if (settings && (settings.desktopUrl || settings.mobileUrl)) {
        setHeroImages(prev => ({
          desktop: settings.desktopUrl || prev.desktop,
          mobile: settings.mobileUrl || settings.desktopUrl || prev.mobile
        }));
      }
    });

    getContactSettings().then((settings) => {
      if (settings && settings.videoUrl) {
        setContactVideoUrl(settings.videoUrl);
      }
    });
  }, []);
  const displayProducts = products;

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

      {/* Atmospheric 1906 Dust Breeze, Ink Spills & Scattered Account Artifacts */}
      <VintageAtmosphere />

      {/* 1906 Antique Brass Pocket Chronometer in Bottom-Right Corner */}
      <VintagePocketChronometer />

      <nav 
        className={`navbar ${scrolled ? 'scrolled' : ''} ${firstScrollTriggered ? 'first-scroll-active' : ''} ${selectedProduct ? 'pdp-navbar-mode' : ''}`}
      >
        {/* Vintage First-Scroll Wax Seal Flash */}
        <div className="nav-scroll-wax-wave" aria-hidden="true" />

        <div className="nav-left">
          {/* Desktop navigation links with Running Stitch */}
          <div className="desktop-nav-links">
            <a href="#collection" className="nav-link" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setShowContactPage(false); setShowStoriesPage(false); setShowCollectionPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <span className="nav-link-text">Collection</span>
              <span className="nav-running-stitch" aria-hidden="true" />
            </a>
            <div 
                className="nav-item-wrapper" 
                style={{ position: "relative", display: "flex", alignItems: "center", height: "100%" }}
                onMouseEnter={() => setStoriesMenuOpen(true)}
                onMouseLeave={() => setStoriesMenuOpen(false)}
              >
                <a 
                  href="#stories" 
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    // Optionally open first story on click
                    setSelectedProduct(displayProducts[0]);
                    setShowContactPage(false);
                    setShowCollectionPage(false);
                    setShowStoriesPage(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <span className="nav-link-text">Stories</span>
                  <span className="nav-running-stitch" aria-hidden="true" />
                </a>
                
                {storiesMenuOpen && (
                  <div className="stories-dropdown-mega">
                    {displayProducts.slice(0, 4).map((prod) => (
                      <div 
                        key={prod.id} 
                        className="story-dropdown-card"
                        onClick={() => {
                          setStoriesMenuOpen(false);
                          setSelectedProduct(prod);
                          setShowContactPage(false);
                          setShowCollectionPage(false);
                          setShowStoriesPage(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {prod.images[0]?.url && (
                          <img src={prod.images[0].url} alt={prod.title} />
                        )}
                        <div className="story-dropdown-card-overlay">
                          <h3 className="story-dropdown-card-title">{prod.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            <a 
              href="#contact" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                setShowStoriesPage(false);
                setShowContactPage(true); setShowCollectionPage(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="nav-link-text">Contact</span>
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
                setShowContactPage(false);
                setShowStoriesPage(false);
                setShowCollectionPage(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
          >
            <div className="brand-logo-box">
              {/* Antique Loom Compass Wheel behind Monogram */}
              <div className="logo-loom-ring" aria-hidden="true" />
              <img src="/assets/aarth-logo.png" alt="AARTH Logo" className="brand-logo-img" />
            </div>
          </a>
        </div>

        <div className="nav-right">
          <CountrySelector />
          <button 
            className="search-toggle-btn nav-icon nav-action-btn" 
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            title="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span className="nav-icon-tooltip">SEARCH</span>
          </button>
          
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
        </div>

        {/* Animated Loom Weave Thread Shimmer */}
        <div className="navbar-weave-shimmer" aria-hidden="true" />
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/assets/aarth-logo.png" alt="AARTH Logo" className="mobile-drawer-logo" />
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
              {/* <a 
                href="#search" 
                className="mobile-drawer-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <span>00</span> Search
              </a> */}
              <a href="#collection" className="mobile-drawer-link" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setSelectedProduct(null); setShowContactPage(false); setShowStoriesPage(false); setShowCollectionPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <span>01</span> Collection
              </a>
              <a 
                href="#stories" 
                className="mobile-drawer-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setSelectedProduct(null);
                  setShowContactPage(false);
                  setShowStoriesPage(true); setShowCollectionPage(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>02</span> Stories
              </a>
              <a 
                href="#contact" 
                className="mobile-drawer-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setShowStoriesPage(false);
                  setShowContactPage(true); setShowCollectionPage(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>03</span> Contact Us
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

            
          </div>
        </div>
      )}

      {/* MAIN CONTENT: Conditional Product Detail Page vs Homepage */}
      {showCollectionPage ? (
        <main>
          <CollectionPage 
            products={products}
            loading={loadingProducts}
            onSelectProduct={(p) => { setSelectedProduct(p); setShowCollectionPage(false); }}
            onQuickAdd={(e, p) => { e.stopPropagation(); addItem(p.variants[0]?.id || p.id, 1); }}
          />
        </main>
      ) : showStoriesPage ? (
        <main>
          <StoriesPage 
            products={displayProducts.slice(0,4)} 
            initialProductId={selectedProduct?.id || displayProducts[0]?.id || ""} 
            onBack={() => {
              setShowStoriesPage(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setShowStoriesPage(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : showTermsPage ? (
        <main>
          <TermsPage onClose={() => { setShowTermsPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </main>
      ) : showShippingPage ? (
        <main>
          <ShippingPage onClose={() => { setShowShippingPage(false); setShowTermsPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </main>
      ) : showRefundsPage ? (
        <main>
          <RefundsPage onClose={() => { setShowRefundsPage(false); setShowShippingPage(false); setShowTermsPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </main>
      ) : showContactPage ? (
        <main>
          <ContactPage 
            videoUrl={contactVideoUrl}
            onBack={() => {
              setShowContactPage(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        </main>
      ) : selectedProduct ? (
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
            style={{ overflow: "hidden", position: "relative", isolation: "isolate" }}
          >
                        
            {/* Vintage Stamps - Hero Section */}
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "12%", left: "4%", width: "clamp(60px, 8vw, 100px)", transform: "rotate(-8deg)", opacity: 0.5, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp2.png" style={{ position: "absolute", bottom: "35%", right: "3%", width: "clamp(70px, 9vw, 110px)", transform: "rotate(12deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp5.png" style={{ position: "absolute", bottom: "10%", left: "8%", width: "clamp(80px, 10vw, 120px)", transform: "rotate(-15deg)", opacity: 0.6, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp Bottom Left" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "25%", right: "12%", width: "clamp(55px, 7vw, 90px)", transform: "rotate(25deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />

            <div 
              className="hero-image-wrapper"
              style={{
                transform: `translate3d(${heroParallax.x * -8}px, ${heroParallax.y * -6}px, 0)`,
                transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {(!heroImages.desktop && !heroImages.mobile) ? (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.05)', animation: 'pulse 1.5s infinite', borderRadius: '4px' }} />
              ) : (
                <picture className="hero-picture">
                  {heroImages.mobile && <source media="(max-width: 768px)" srcSet={heroImages.mobile} />}
                  {heroImages.desktop && <img src={heroImages.desktop} alt="AARTH Heritage Handloom Silhouettes" className="hero-image" />}
                </picture>
              )}
            </div>

            <div className="hero-bottom-mark">
              <span>AARTH</span>
            </div>
          </section>

          {/* Collection Section with Interactive 3D Product Cards */}
          <section className="products-section" id="collection" style={{ position: "relative", isolation: "isolate" }}>
                        
            {/* Vintage Stamps - Products Section (strictly background) */}
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "180px", left: "2%", width: "clamp(65px, 8vw, 100px)", transform: "rotate(-15deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp4.png" style={{ position: "absolute", bottom: "250px", right: "2%", width: "clamp(55px, 7vw, 90px)", transform: "rotate(18deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "450px", right: "5%", width: "clamp(75px, 9vw, 110px)", transform: "rotate(-12deg)", opacity: 0.5, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp2.png" style={{ position: "absolute", top: "50%", left: "1%", width: "clamp(85px, 10vw, 120px)", transform: "rotate(5deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp5.png" style={{ position: "absolute", bottom: "100px", left: "6%", width: "clamp(60px, 8vw, 95px)", transform: "rotate(-25deg)", opacity: 0.6, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img className="vintage-bg-stamp" src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "75%", right: "8%", width: "clamp(70px, 8vw, 105px)", transform: "rotate(30deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none" }} alt="Vintage Stamp" />

            <div className="container-wide" style={{ position: "relative", zIndex: 10 }}>
              <header className="section-header-1906">
          
                <div className="oxford-double-line" />
                <h2 className="broadsheet-headline">GARVI • DROP 001</h2>
               
                <div className="oxford-single-line" />
              </header>

              <div className="products-grid-4">
                {loadingProducts ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <ProductSkeleton key={`skeleton-${idx}`} />
                  ))
                ) : (
                  displayProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={idx}
                      onSelect={(p) => setSelectedProduct(p)}
                      onQuickAdd={handleQuickAdd}
                      loading={cartLoading}
                    />
                  ))
                )}
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
            </div>

            <div className="video-content">
              
              <button 
                className="btn-stories"
                onClick={() => { setSelectedProduct(displayProducts[0]); setShowContactPage(false); setShowCollectionPage(false); setShowStoriesPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                STORIES
              </button>
            </div>

           
          </section>
        </main>
      )}

      {/* Global Site Footer */}
      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <img src="/assets/aarth-logo-white.png" alt="AARTH Logo" className="footer-logo" style={{ marginTop: '0' }} />
              <div className='footer-col footer-nav'>Move With Meaning <br />
GARVI • DROP 001 <br />
Culture x Streetwear</div>
            </div>
            <div className="footer-col">
              <h4>Pages</h4>
              <ul className="footer-nav">
                <li>
                  <a href="#collection" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setShowContactPage(false); setShowStoriesPage(false); setShowCollectionPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    Collection
                  </a>
                </li>
                <li>
                  <a href="#stories" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setShowContactPage(false); setShowCollectionPage(false); setShowStoriesPage(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Stories
                  </a>
                </li>
                <li><a href="#about" onClick={(e) => e.preventDefault()}>About</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="footer-nav">
                <li>
                  <a 
                    href="https://www.instagram.com/aarth.uk?stkn=MTVsc3VweGczN2ptNQ==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                    <span>aarth.uk</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:hello@aarth.uk"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span>Email: hello@aarth.uk</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Policy</h4>
              <ul className="footer-nav">
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setShowStoriesPage(false); setShowCollectionPage(false); setShowContactPage(false); setShowRefundsPage(false); setShowShippingPage(false); setShowTermsPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Terms and Condition</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setShowStoriesPage(false); setShowCollectionPage(false); setShowContactPage(false); setShowRefundsPage(false); setShowShippingPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Shipping Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setSelectedProduct(null); setShowStoriesPage(false); setShowCollectionPage(false); setShowContactPage(false); setShowShippingPage(false); setShowTermsPage(false); setShowRefundsPage(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Refund & Returns Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', paddingTop: '24px', marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Arth Studio Limited — Designed by 
              <img src="/assets/devoraaa-logo.jpg" alt="Devoraaa Logo" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} /> 
              <a href="https://www.devora.page/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Devoraaa</a>
            </span>
          </div>
        </div>
      </footer>

      {/* Slide-over Cart Drawer */}
      
      <CartDrawer 
        onNavigateToCollection={() => {
          setSelectedProduct(null);
          setShowContactPage(false);
          setShowStoriesPage(false);
          setShowTermsPage(false);
          setShowShippingPage(false);
          setShowRefundsPage(false);
          setShowCollectionPage(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Interactive Live Search & Filter Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={displayProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Global Newsletter Popup */}
      <NewsletterPopup />
    </>
  );
}

function App() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user unlocked the storefront with password
    const hasLocalAccess = localStorage.getItem("aarth_access") === "true";
    if (hasLocalAccess) {
      setHasAccess(true);
      return;
    }

    // Otherwise fetch the store config from Shopify
    import('./lib/shopify').then(({ getStoreConfig }) => {
      getStoreConfig().then((config) => {
        // If config.isLocked is false, it means Shopify says it's open for all users
        if (!config.isLocked) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      });
    });
  }, []);

  if (hasAccess === null) {
    return null; // Return empty or a global spinner while determining access
  }

  if (hasAccess === false) {
    return <ComingSoon />;
  }

  return (
    <CartProvider>
        <StorefrontContent />
      </CartProvider>
  );
}

export default App;



































