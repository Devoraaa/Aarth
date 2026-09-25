import { useEffect, useState } from 'react';
import ComingSoon from './ComingSoon';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if the user unlocked the storefront
    if (localStorage.getItem("aarth_access") === "true") {
      setHasAccess(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasAccess) {
    return <ComingSoon />;
  }

  const products = [
    {
      id: 1,
      tag: '№ 01',
      edition: 'Pitloom Silk • Bhagalpur',
      title: 'Cacao Handloom Raw Silk Kurta',
      price: '₹5,400',
      image: '/assets/product-1.jpg'
    },
    {
      id: 2,
      tag: '№ 02',
      edition: 'Bagru Mud-Resist • Handloom Cotton',
      title: 'Taupe Block-Print Artisanal Kimono',
      price: '₹6,800',
      image: '/assets/product-2.jpg'
    },
    {
      id: 3,
      tag: '№ 03',
      edition: 'Chanderi Weave • Pure Zari Thread',
      title: 'Pearl Pleated Chanderi Tunic',
      price: '₹5,600',
      image: '/assets/product-3.jpg'
    },
    {
      id: 4,
      tag: '№ 04',
      edition: 'Iron-Vat Fermented • Structured Drape',
      title: 'Leather-Dyed Relaxed Trousers',
      price: '₹4,800',
      image: '/assets/product-4.jpg'
    }
  ];

  return (
    <>
      <div className="announcement-bar">
        <span className="announcement-text-mobile">Atelier Edition 01 — Heirloom Pitloom Silks</span>
        <span className="announcement-full-desktop">
          <span>Complimentary Domestic Dispatch On Orders Above ₹3,000</span>
          <span className="ticker-flourish">✦</span>
          <span>Atelier Edition 01 — Heirloom Pitloom Silks & Botanical Dyes</span>
          <span className="ticker-flourish">✦</span>
          <span>Est. 2026 — The Archival Record</span>
        </span>
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
          <button className="search-toggle-btn nav-icon" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <a href="#account" className="nav-icon desktop-account-link" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </a>
          <button className="cart-toggle-btn nav-link">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span className="cart-label">Cart [1]</span>
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
              <a href="#collection" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span>01</span> Collection
              </a>
              <a href="#stories" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span>02</span> Stories & Loom
              </a>
              <a href="#contact" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span>03</span> Contact & Atelier
              </a>
              <a href="#account" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span>04</span> Client Account
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
        <section className="hero-section" id="hero">
          <div className="hero-image-wrapper">
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

        <section className="products-section" id="collection">
          <div className="container-wide">
            <header className="section-header-antique">
              <div className="section-header-flourish">❦ — ✦ — ❧</div>
              <div className="section-eyebrow">Handloom Edition • No. 01</div>
              <h2 className="section-title">The Curated Archive</h2>
              <div className="section-divider-line">
                <span></span>
                <i>Selected Silhouettes [4 of 4]</i>
                <span></span>
              </div>
            </header>

            <div className="products-grid-4">
              {products.map(product => (
                <article key={product.id} className="product-item">
                  <div className="product-image-box">
                    <span className="product-number-tag">{product.tag}</span>
                    <img src={product.image} alt={product.title} loading="lazy" />
                  </div>
                  <div className="product-meta-bottom-left">
                    <span className="product-edition-stamp">{product.edition}</span>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="moving-design-section" id="stories">
          <div className="video-container">
            <video className="bg-video" autoPlay muted loop playsInline>
              <source src="/assets/fashion-moving-seamless.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
          </div>

          <div className="video-content">
            <span className="video-caption-eyebrow">Atelier in Motion • Loom & Thread</span>
            <h2 className="video-caption-title">The Drape of Living Tradition</h2>
            <button className="btn-stories">Stories</button>
          </div>

          <button className="video-control-pill">
            <span>❚❚</span>
            <span>PAUSE REEL</span>
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
                <li><a href="#">Our Silhouettes</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-nav">
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
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
    </>
  );
}

export default App;
