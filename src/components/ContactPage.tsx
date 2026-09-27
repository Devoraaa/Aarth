import React, { useRef, useState } from 'react';
import { subscribeToNewsletter } from '../lib/shopify';
import { PostalStamp } from './PostalStamp';

interface ContactPageProps {
  onBack: () => void;
  videoUrl?: string;
}

export function ContactPage({ onBack, videoUrl }: ContactPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatusMessage("Kindly supply an authentic dispatch email address.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setStatusMessage('');

    // Attempt to subscribe
    const res = await subscribeToNewsletter(email);

    setLoading(false);
    setStatusMessage(
      res.success
        ? "DISPATCH REGISTERED: Your communiqué has been received into the 1906 ledger. An ink bulletin will follow."
        : res.message || "Failed to record dispatch. Please re-enter."
    );
    setIsSuccess(res.success);

    if (res.success) {
      setEmail('');
      setName('');
      setMessageText('');
    }
  };

  const activeVideo = videoUrl || "/assets/fashion-moving-seamless.mp4";

  return (
    <div 
      className="contact-page-container" 
      style={{ 
        minHeight: '100vh', 
        paddingTop: 'calc(var(--nav-height) + 24px)', 
        paddingBottom: '80px',
        backgroundImage: "url('/assets/user-vintage-bg.jpg')",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
      }}
    >
      <div className="container-wide">
        {/* Breadcrumb / Return to Store button */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            onClick={onBack}
            className="pdp-back-btn"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontFamily: 'var(--font-typewriter, monospace)', 
              fontSize: '11px',
              letterSpacing: '0.14em',
              background: 'rgba(244, 239, 230, 0.75)',
              border: '1px solid rgba(74, 59, 50, 0.35)',
              padding: '8px 18px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              color: '#242220',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}
          >
            <span>←</span>
            <span>RETURN TO ARCHIVE STORE</span>
          </button>

          <span 
            style={{ 
              fontFamily: 'var(--font-typewriter, monospace)', 
              fontSize: '10px', 
              letterSpacing: '0.2em', 
              color: '#7A5B3E',
              textTransform: 'uppercase'
            }}
          >
            BOMBAY • CALCUTTA • LONDON
          </span>
        </div>

        {/* Split Ledger Dispatch Station */}
        <div 
          className="contact-ledger-card"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            background: 'rgba(248, 244, 237, 0.88)',
            border: '1.5px solid rgba(74, 59, 50, 0.4)',
            boxShadow: '0 12px 36px rgba(35, 20, 10, 0.18)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Left Side: Original Unfiltered Video (Shopify Dynamic + No Halt Button) */}
          <div 
            style={{ 
              flex: '1 1 50%', 
              minWidth: '320px',
              minHeight: '560px',
              position: 'relative',
              borderRight: '1.5px solid rgba(74, 59, 50, 0.3)',
              backgroundColor: '#1E1915',
              overflow: 'hidden'
            }}
          >
            <video 
              ref={videoRef}
              key={activeVideo}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block',
                filter: 'none' // 100% original video colors
              }}
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src={activeVideo} type="video/mp4" />
            </video>

            {/* Vintage Subtle Edge Framing & Corner Watermark */}
            <div 
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(25, 20, 16, 0.72)',
                backdropFilter: 'blur(3px)',
                border: '1px solid rgba(240, 230, 215, 0.25)',
                padding: '6px 14px',
                fontFamily: 'var(--font-typewriter, monospace)',
                fontSize: '9.5px',
                letterSpacing: '0.16em',
                color: '#E8DDCB',
                textTransform: 'uppercase'
              }}
            >
              ARCHIVAL WEAVE REEL • LIVING TRADITION
            </div>
          </div>

          {/* Right Side: 1906 Postal & Telegraph Dispatch Form */}
          <div 
            style={{ 
              flex: '1 1 50%', 
              minWidth: '320px',
              padding: '44px 38px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              backgroundImage: "url('/assets/user-vintage-bg.jpg')",
              backgroundRepeat: "repeat-y",
              backgroundPosition: "top center",
              backgroundSize: "100% auto"
            }}
          >
            {/* Top Right Decorative Postal Stamps */}
            <div 
              style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '24px', 
                display: 'flex', 
                gap: '8px',
                pointerEvents: 'none'
              }}
            >
              <PostalStamp
                src="/assets/stamps/stamp-ashoka-blue.png"
                alt="Ashoka Blue Stamp"
                width={52}
                rotate={-4}
              />
              <PostalStamp
                src="/assets/stamps/stamp-shakuntala.png"
                alt="Shakuntala Stamp"
                width={56}
                rotate={5}
              />
            </div>

            <div style={{ maxWidth: '460px', width: '100%', margin: '0 auto' }}>
              <div style={{ marginBottom: '22px' }}>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-typewriter, monospace)', 
                    fontSize: '10px', 
                    letterSpacing: '0.22em', 
                    textTransform: 'uppercase', 
                    color: '#7A5B3E', 
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  DISPATCH MANIFEST • POSTAL REGISTER
                </span>
                
                <h1 
                  style={{ 
                    fontFamily: 'var(--font-serif)', 
                    fontSize: 'clamp(26px, 2.5vw, 36px)', 
                    fontWeight: 500, 
                    lineHeight: 1.15, 
                    color: '#242220',
                    margin: '0 0 10px 0'
                  }}
                >
                  Inquiries & Communiqués
                </h1>

                <p 
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '13px', 
                    color: '#5C4A3E', 
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  Pen an inquiry directly to the master weavers, or record your correspondence to receive the private archival releases and limited edition specimen ledgers.
                </p>
              </div>

              {/* Telegraph Postal Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontFamily: 'var(--font-typewriter, monospace)', 
                      fontSize: '9.5px', 
                      letterSpacing: '0.16em', 
                      textTransform: 'uppercase', 
                      color: '#4A3B32',
                      marginBottom: '5px'
                    }}
                  >
                    Correspondent Name / Title
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Lady Curzon / Master Weaver"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      fontFamily: 'var(--font-typewriter, monospace)',
                      fontSize: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(74, 59, 50, 0.45)',
                      color: '#1F1C18',
                      outline: 'none',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontFamily: 'var(--font-typewriter, monospace)', 
                      fontSize: '9.5px', 
                      letterSpacing: '0.16em', 
                      textTransform: 'uppercase', 
                      color: '#4A3B32',
                      marginBottom: '5px'
                    }}
                  >
                    Telegraph Address / Email <span style={{ color: '#8C3B2F' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="address@domain.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      fontFamily: 'var(--font-typewriter, monospace)',
                      fontSize: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(74, 59, 50, 0.45)',
                      color: '#1F1C18',
                      outline: 'none',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    style={{ 
                      display: 'block', 
                      fontFamily: 'var(--font-typewriter, monospace)', 
                      fontSize: '9.5px', 
                      letterSpacing: '0.16em', 
                      textTransform: 'uppercase', 
                      color: '#4A3B32',
                      marginBottom: '5px'
                    }}
                  >
                    Dispatch Note / Inquiry
                  </label>
                  <textarea
                    rows={3}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Specify bespoke requirements, fabric origins, or courier instructions..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      fontFamily: 'var(--font-typewriter, monospace)',
                      fontSize: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(74, 59, 50, 0.45)',
                      color: '#1F1C18',
                      outline: 'none',
                      resize: 'none',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: '8px',
                    padding: '13px 24px',
                    backgroundColor: '#342417',
                    color: '#FBF9F4',
                    border: '1.5px solid #1F1C18',
                    fontFamily: 'var(--font-typewriter, monospace)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    cursor: loading ? 'wait' : 'pointer',
                    boxShadow: '0 4px 12px rgba(35, 20, 10, 0.3)',
                    transition: 'all 0.2s ease',
                    opacity: loading ? 0.75 : 1
                  }}
                >
                  {loading ? 'TRANSMITTING DISPATCH...' : 'SEAL & TRANSMIT DISPATCH ☞'}
                </button>

                {statusMessage && (
                  <div 
                    style={{
                      marginTop: '10px',
                      padding: '10px 14px',
                      backgroundColor: isSuccess ? 'rgba(46, 125, 50, 0.12)' : 'rgba(198, 40, 40, 0.12)',
                      border: `1px solid ${isSuccess ? 'rgba(46, 125, 50, 0.4)' : 'rgba(198, 40, 40, 0.4)'}`,
                      color: isSuccess ? '#1b5e20' : '#b71c1c',
                      fontFamily: 'var(--font-typewriter, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      lineHeight: 1.5
                    }}
                  >
                    {statusMessage}
                  </div>
                )}
              </form>

              {/* Direct Atelier Details */}
              <div 
                style={{
                  marginTop: '28px',
                  paddingTop: '18px',
                  borderTop: '1px dashed rgba(74, 59, 50, 0.3)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  fontFamily: 'var(--font-typewriter, monospace)',
                  fontSize: '10px',
                  color: '#634E3F'
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, display: 'block', color: '#242220' }}>CORRESPONDENCE</span>
                  <span>inquiries@aarth.co</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700, display: 'block', color: '#242220' }}>DISPATCH HOURS</span>
                  <span>Monday – Friday, 10AM - 6PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
