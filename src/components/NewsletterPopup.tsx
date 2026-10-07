import React, { useState, useEffect } from 'react';
import { subscribeToNewsletter } from '../lib/shopify';

export const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check local storage if the user has already subscribed
    const isSubscribed = localStorage.getItem('aarth_newsletter_subscribed');
    
    // Only show if not subscribed
    if (!isSubscribed) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage("Please enter a valid email address.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage('');
    
    // Attempt to subscribe
    const res = await subscribeToNewsletter(email);
    
    setLoading(false);
    setMessage(res.message);
    setIsSuccess(res.success);
    
    if (res.success) {
      setEmail(''); 
      // Save to local storage permanently (browsers keep this indefinitely until cleared)
      localStorage.setItem('aarth_newsletter_subscribed', 'true');
      
      // Auto close after showing success message for 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    // Note: We don't save to localStorage here so it asks again next time they visit
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="newsletter-popup-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="newsletter-popup-content"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#f7f2e9',
          backgroundImage: "url('/assets/new-paper.png')",
          backgroundRepeat: 'repeat',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Vintage Stamp Decoration */}
        <img 
          src="/assets/stamps/stamp1.png" 
          alt="Vintage Stamp" 
          style={{ 
            position: 'absolute', 
            top: '-20px', 
            right: '-20px', 
            width: '120px', 
            opacity: 0.25, 
            mixBlendMode: 'multiply', 
            transform: 'rotate(15deg)', 
            pointerEvents: 'none',
            zIndex: 0
          }} 
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#4a3b32',
            padding: '5px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "clamp(1.5rem, 2vw, 2rem)", 
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "0.75rem",
            color: "#111111",
            textTransform: "uppercase",
            letterSpacing: "0.02em"
          }}>
            Join The Archive
          </h2>
          
          <p style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "14px",
            color: "#4a3b32",
            marginBottom: "1.5rem",
            fontStyle: "italic",
            lineHeight: 1.5
          }}>
            Leave your mark. Enter your email to be the first to know about new <strong style={{ fontWeight: 600, fontStyle: "normal", color: "#111", fontFamily: "var(--font-mono)", letterSpacing: "0.05em", fontSize: "12px" }}>AARTH</strong> products and early narratives.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" 
              required
              style={{
                width: "100%",
                padding: "0.85rem",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                backgroundColor: "transparent",
                border: "1px solid var(--border-antique)",
                borderRadius: "0",
                color: "#111111",
                outline: "none",
                textTransform: "uppercase"
              }}
            />
            
            <div style={{ marginTop: "0.25rem" }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: "100%",
                  backgroundColor: "#111111",
                  color: "#f7f2e9",
                  border: "1.5px solid #111111",
                  borderRadius: "0",
                  padding: "12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  cursor: loading ? "not-allowed" : "pointer",
                  textTransform: "uppercase",
                  display: "inline-block",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "var(--color-cacao)"; e.currentTarget.style.borderColor = "var(--color-cacao)"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#111111"; e.currentTarget.style.borderColor = "#111111"; }}
              >
                {loading ? "SEALING..." : "SUBSCRIBE"}
              </button>
            </div>

            {message && (
              <div style={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                backgroundColor: "transparent",
                border: "1px solid",
                borderColor: isSuccess ? "#8c7365" : "#9e2a2b",
                color: isSuccess ? "#8c7365" : "#9e2a2b",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textAlign: "center",
                textTransform: "uppercase"
              }}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
