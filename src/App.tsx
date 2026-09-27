import { useEffect, useRef, useState } from 'react';
import ComingSoon from './ComingSoon';
import { CartProvider, useCart } from './context/CartContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProfilePage } from './components/ProfilePage';
import { SearchModal } from './components/SearchModal';
import { ProductCard } from './components/ProductCard';
import { CustomCursor } from './components/CustomCursor';
import { VintagePocketChronometer } from './components/VintagePocketChronometer';
import { VintageAtmosphere } from './components/VintageAtmosphere';
import { TelegraphTape } from './components/TelegraphTape';
import { getProducts, getHeroSettings, getVideoSettings, getCollectionDetails, type ShopifyProduct } from './lib/shopify';
import { ContactPage } from './components/ContactPage';
import { StoriesPage } from './components/StoriesPage';
import { CollectionPage } from './components/CollectionPage';
import { CollectionHoverCard } from './components/CollectionHoverCard';
import { PostalStamp } from './components/PostalStamp';
import { PageStamps } from './components/PageStamps';
import './vintage-1906.css';


function StorefrontContent() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showStoriesPage, setShowStoriesPage] = useState(false);
  const [showCollectionPage, setShowCollectionPage] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [collectionHovered, setCollectionHovered] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const [collectionInfo, setCollectionInfo] = useState<{ title: string; description?: string } | null>(null);
  const [videoSettings, setVideoSettings] = useState<{ videoUrl: string | null; contactVideoUrl: string | null } | null>(null);
  const [heroImages, setHeroImages] = useState({ desktop: '/assets/hero-banner-transparent.png', mobile: '/assets/hero-banner-mobile-transparent.png' });

  // Video Reel reference
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero Mouse Parallax
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });

  // Ink reveal scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.ink-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const { cart, openCart, addItem, loading: cartLoading } = useCart();
  const { openAuth, customer } = useCustomer();
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

    getCollectionDetails().then((info) => {
      if (info?.title) setCollectionInfo(info);
    });

    getVideoSettings().then((settings) => {
      if (settings?.videoUrl || settings?.contactVideoUrl) {
        setVideoSettings(settings);
      }
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

  const navigateTo = (view: 'home' | 'collection' | 'stories' | 'contact' | 'product', item?: ShopifyProduct) => {
    if (view === 'product' && item) {
      setSelectedProduct(item);
      setShowCollectionPage(false);
      setShowStoriesPage(false);
      setShowContactPage(false);
      window.history.pushState({ view: 'product', handle: item.handle }, '', `#product-${item.handle}`);
    } else if (view === 'collection') {
      setSelectedProduct(null);
      setShowCollectionPage(true);
      setShowStoriesPage(false);
      setShowContactPage(false);
      window.history.pushState({ view: 'collection' }, '', '#collection');
    } else if (view === 'stories') {
      setSelectedProduct(null);
      setShowCollectionPage(false);
      setShowStoriesPage(true);
      setShowContactPage(false);
      window.history.pushState({ view: 'stories' }, '', '#stories');
    } else if (view === 'contact') {
      setSelectedProduct(null);
      setShowCollectionPage(false);
      setShowStoriesPage(false);
      setShowContactPage(true);
      window.history.pushState({ view: 'contact' }, '', '#contact');
    } else {
      setSelectedProduct(null);
      setShowCollectionPage(false);
      setShowStoriesPage(false);
      setShowContactPage(false);
      window.history.pushState({ view: 'home' }, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const handle = hash.replace('#product-', '');
        const p = displayProducts.find((x) => x.handle === handle || x.id === handle);
        if (p) {
          setSelectedProduct(p);
          setShowCollectionPage(false);
          setShowStoriesPage(false);
          setShowContactPage(false);
          return;
        }
      }
      if (hash === '#collection') {
        setSelectedProduct(null);
        setShowCollectionPage(true);
        setShowStoriesPage(false);
        setShowContactPage(false);
        return;
      }
      if (hash === '#stories') {
        setSelectedProduct(null);
        setShowCollectionPage(false);
        setShowStoriesPage(true);
        setShowContactPage(false);
        return;
      }
      if (hash === '#contact') {
        setSelectedProduct(null);
        setShowCollectionPage(false);
        setShowStoriesPage(false);
        setShowContactPage(true);
        return;
      }
      setSelectedProduct(null);
      setShowCollectionPage(false);
      setShowStoriesPage(false);
      setShowContactPage(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [displayProducts]);

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

  const handleCollectionMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setCollectionHovered(true);
  };

  const handleCollectionMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setCollectionHovered(false);
    }, 350);
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

          {/* Desktop navigation links with Collection Mega Card */}
          <div className="desktop-nav-links">
            <div
              className="nav-link-collection-wrap"
              onMouseEnter={handleCollectionMouseEnter}
              onMouseLeave={handleCollectionMouseLeave}
            >
              <a 
                href="#collection" 
                className="nav-link nav-link-collection"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('collection');
                }}
              >
                <span className="nav-link-text">Collection</span>
                <span className="nav-running-stitch" aria-hidden="true" />
              </a>

              {collectionHovered && (
                <CollectionHoverCard
                  products={displayProducts}
                  collectionTitle={collectionInfo?.title}
                  onSelectProduct={(p) => {
                    setCollectionHovered(false);
                    navigateTo('product', p);
                  }}
                  onViewAll={() => {
                    setCollectionHovered(false);
                    navigateTo('collection');
                  }}
                  onMouseEnter={handleCollectionMouseEnter}
                  onMouseLeave={handleCollectionMouseLeave}
                />
              )}
            </div>

            <a 
              href="#stories" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('stories');
              }}
            >
              <span className="nav-link-text">Stories</span>
              <span className="nav-running-stitch" aria-hidden="true" />
            </a>

            <a 
              href="#contact" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
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
              navigateTo('home');
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
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            title="Search Store (Motif, Silhouette, Craft)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span className="nav-icon-tooltip">SEARCH</span>
          </button>
          <a href="#account" onClick={(e) => { e.preventDefault(); if(customer) { setShowProfilePage(true); setShowContactPage(false); setShowStoriesPage(false); setSelectedProduct(null); } else { openAuth(); } }} className="nav-icon desktop-account-link nav-action-btn" aria-label="Account" title="My Account" style={{ position: "relative", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
            {customer ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-svg-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: "2px", minWidth: "max-content" }}>{customer.firstName}</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-svg-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="nav-icon-tooltip" style={{ minWidth: "max-content", right: "0", transform: "translateX(0)" }}>ACCOUNT</span>
              </>
            )}
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
                <span>00</span> Search Store
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
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setSelectedProduct(null);
                  setShowContactPage(false);
                  setShowStoriesPage(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>02</span> Stories & Loom
              </a>
              <a 
                href="#contact" 
                className="mobile-drawer-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setShowStoriesPage(false);
                  setShowContactPage(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>03</span> Contact & Account
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

      {/* MAIN CONTENT: Conditional Product Detail Page vs Collection vs Stories vs Contact vs Homepage */}
      {showCollectionPage ? (
        <main>
          <CollectionPage
            products={displayProducts}
            collectionTitle={collectionInfo?.title}
            collectionDescription={collectionInfo?.description}
            onSelectProduct={(p) => navigateTo('product', p)}
            onQuickAdd={handleQuickAdd}
            loading={cartLoading}
          />
        </main>
      ) : showStoriesPage ? (
        <main>
          <StoriesPage onBack={() => navigateTo('home')} />
        </main>
      ) : showProfilePage ? (
        <main>
          <ProfilePage onBack={() => setShowProfilePage(false)} />
        </main>
      ) : showContactPage ? (
        <main>
          <ContactPage 
            onBack={() => navigateTo('home')} 
            videoUrl={videoSettings?.contactVideoUrl || videoSettings?.videoUrl || undefined}
          />
        </main>
      ) : selectedProduct ? (
        <main>
          <ProductDetailPage
            product={selectedProduct}
            allProducts={displayProducts}
            onBack={() => navigateTo('home')}
            onSelectProduct={(p) => navigateTo('product', p)}
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
                <source media="(max-width: 768px)" srcSet={heroImages.mobile} />
                <img src={heroImages.desktop} alt="AARTH Heritage Handloom Silhouettes" className="hero-image" />
              </picture>
            </div>

            <div className="hero-bottom-mark">
              <span>AARTH</span>
              <div className="hero-scroll-line"></div>
            </div>

            {/* Authentic Vintage Stamps stuck on hero parchment */}
            <PageStamps />
          </section>

          {/* Telegraph Tape Ticker — dispatches from the 1906 atelier */}
          <TelegraphTape />

          {/* Collection Section with Interactive 3D Product Cards */}
          <section className="products-section section-aged-corner" id="collection" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container-wide">
              {/* Ornamental Divider */}
              <div className="ornament-divider"><span className="ornament-divider-symbol">✦ ✦ ✦</span></div>

              {/* Exact Reference Header Bar */}
              <div className="featured-collection-bar">
                <h2 className="featured-collection-heading">FEATURED COLLECTION</h2>
                <div className="featured-collection-divider-line" />
                <a 
                  href="#collection" 
                  className="featured-collection-view-all"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('collection');
                  }}
                >
                  VIEW ALL &rarr;
                </a>
              </div>

              <div className="products-grid-4">
                {displayProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onSelect={(p) => navigateTo('product', p)}
                    onQuickAdd={handleQuickAdd}
                    loading={cartLoading}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Moving Design Reel */}
          <section className="moving-design-section" id="stories" style={{ position: 'relative' }}>
            {/* Authentic Stamp stuck in reel corner */}
            <div className="page-stuck-stamp stories-section-stamp" style={{ position: 'absolute', bottom: '24px', right: '28px', zIndex: 6 }}>
              <PostalStamp
                src="/assets/stamps/stamp-ashoka-blue.png"
                alt="Royal India Service Stamp"
                rotate={-5}
                width={62}
              />
            </div>
            <div className="video-container">
              <video 
                ref={videoRef}
                className="bg-video" 
                autoPlay 
                muted 
                loop 
                playsInline
                key={videoSettings?.videoUrl || "default-video"}
              >
                <source src={videoSettings?.videoUrl || "/assets/fashion-moving-seamless.mp4"} type="video/mp4" />
              </video>
            </div>

            {/* Centered Small Stories Button Only (No Text, No Halt Button) */}
            <div className="video-stories-center-box">
              <button 
                className="video-stories-btn"
                onClick={() => navigateTo('stories')}
              >
                Stories ☞
              </button>
            </div>
          </section>
        </main>
      )}

      {/* Global Site Footer (Redesigned 4-Column Sleek Layout with 1/3rd Reduced Height) */}
      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Left - ONLY Logo */}
            <div className="footer-col footer-col-logo">
              <img
                src="/assets/aarth-logo-white.png"
                alt="AARTH Atelier Logo"
                className="footer-logo"
                style={{ maxHeight: '54px', width: 'auto', display: 'block' }}
              />
            </div>

            {/* Column 2: Collection & About */}
            <div className="footer-col">
              <h4>Atelier</h4>
              <ul className="footer-nav">
                <li>
                  <a 
                    href="#collection"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('collection');
                    }}
                  >
                    Collection
                  </a>
                </li>
                <li>
                  <a 
                    href="#stories"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('stories');
                    }}
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact (Number, Insta, Email) */}
            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="footer-nav footer-contact-list">
                <li>
                  <a href="tel:+919876543210" className="footer-contact-link">
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="footer-contact-link"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:concierge@aarth.studio" className="footer-contact-link">
                    concierge@aarth.studio
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Policy (Terms & Conditions, Return/Refund Policy) */}
            <div className="footer-col">
              <h4>Policy</h4>
              <ul className="footer-nav">
                <li>
                  <a 
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("AARTH TERMS & CONDITIONS:\n\nAll garments are produced in archival numbered editions on traditional handlooms using non-synthetic botanical dyes. Subtle artisanal irregularities are hallmarks of genuine heritage craftsmanship.");
                    }}
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a 
                    href="#returns"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("AARTH RETURN & REFUND POLICY:\n\nWe provide a 14-day archival exchange or return window on unworn specimens with intact wax seals. Complimentary return dispatch for domestic UK clients.");
                    }}
                  >
                    Return / Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © 2026 AARTH. All Rights Reserved. — Designed by{' '}
              <a 
                href="https://www.devora.page/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'underline', color: 'inherit' }}
              >
                Devoraaa
              </a>
            </span>
            <span>Living Subcontinental Handloom Archive</span>
          </div>
        </div>
      </footer>

      {/* Slide-over Cart Drawer */}
      <AuthModal onSuccess={() => setShowProfilePage(true)} />
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
    <CustomerProvider>
      <CartProvider>
        <StorefrontContent />
      </CartProvider>
    </CustomerProvider>
  );
}

export default App;

















