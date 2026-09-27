import React, { useRef, useState } from 'react';
import { subscribeToNewsletter } from '../lib/shopify';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  
  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
      setEmail(''); // clear form on success
    }
  };

  return (
    <div className="contact-page-container" style={{ 
      minHeight: "100vh", 
      paddingTop: "var(--nav-height)", 
      display: "flex", 
      flexDirection: "column",
      backgroundColor: "#f7f2e9",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Vintage Stamps - Contact Section */}
      <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", bottom: "10%", left: "8%", width: "clamp(70px, 10vw, 120px)", transform: "rotate(-12deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "20%", right: "6%", width: "clamp(60px, 8vw, 100px)", transform: "rotate(22deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />

      {/* Top Breadcrumb Bar */}
      <div className="pdp-top-bar-wrapper">
        <div className="pdp-top-bar container-wide">
          <button onClick={onBack} className="pdp-back-btn">
            ← RETURN TO STORE
          </button>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        flex: 1,
        flexDirection: "row", 
        borderTop: "1px solid var(--border-antique)",
        flexWrap: "wrap",
        alignItems: "stretch"
      }}>
        {/* Left Side: Video (16:9 Centered vertically) */}
        <div style={{ 
          flex: "1 1 50%", 
          borderRight: "1px solid var(--border-antique)", 
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "transparent"
        }}>
          <div style={{
            width: "100%",
            aspectRatio: "16/9",
            position: "relative",
            backgroundColor: "#111"
          }}>
            <video 
              ref={videoRef}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                filter: "sepia(0.3) grayscale(0.2) contrast(1.1)"
              }}
              src="/assets/user-hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            
          </div>
        </div>

        {/* Right Side: Contact Form (Tighter Spacing & Transparent BG) */}
        <div style={{ 
          flex: "1 1 50%", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 2rem",
          backgroundColor: "transparent", 
          zIndex: 1
        }}>
          <div style={{ maxWidth: "440px", width: "100%", margin: "0 auto" }}>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "clamp(1.75rem, 2.5vw, 2.2rem)", 
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "0.75rem",
              color: "#111111",
              textTransform: "uppercase",
              letterSpacing: "0.02em"
            }}>
              Get in touch with us
            </h1>
            
            <p style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "11px",
              color: "#8c7365",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em"
            }}>
            </p>

            <p style={{ 
              fontFamily: "var(--font-serif)", 
              fontSize: "14px",
              color: "#4a3b32",
              marginBottom: "1.5rem",
              fontStyle: "italic",
              lineHeight: 1.5
            }}>
              Any query regarding your purchase, please reach out to <strong style={{ fontWeight: 600, fontStyle: "normal", color: "#111", fontFamily: "var(--font-mono)", letterSpacing: "0.05em", fontSize: "12px" }}>HELLO@AARTH.UK</strong> or drop a dispatch below.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input 
                type="text"
                placeholder="Name" 
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
              <textarea 
                placeholder="Your Message..." 
                rows={4}
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
                  resize: "vertical",
                  textTransform: "uppercase"
                }}
              ></textarea>
              
              <div style={{ marginTop: "0.5rem" }}>
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
                  {loading ? "DISPATCHING..." : "SEND MESSAGE"}
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
    </div>
  );
}



