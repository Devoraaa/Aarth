import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ArrowRight, Mail } from "lucide-react";

export default function ComingSoon() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    title: "COMING SOON",
    instagramHandle: "@aarth.uk",
    instagramUrl: "https://www.instagram.com/aarth.uk?stkn=ZWgwNWUza3E3czk5",
    email: "Hello@aarth.uk",
    modalTitle: "Atelier Access",
    modalDescription: "Enter passphrase to unlock the AARTH Storefront preview.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (password === "Aarth2026") {
        localStorage.setItem("aarth_access", "true");
        window.location.reload();
      } else {
        setError("Incorrect password. Please try again.");
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-black text-[#FBF9F4] flex flex-col justify-between select-none" style={{ fontFamily: "var(--font-sans)" }}>
      {/* ── Responsive Background: Desktop (16:9) & Mobile (9:16) Full Bleed ────────────────────────────── */}
      <div className="coming-soon-bg absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
        <picture className="block absolute inset-0 w-full h-full" style={{ width: '100%', height: '100%', display: 'block' }}>
          <source media="(min-width: 768px)" srcSet="/assets/coming-soon-desktop.jpg" />
          <img
            src="/assets/coming-soon-mobile.jpg"
            alt="AARTH Heritage Handloom"
            className="w-full h-full object-cover object-center block"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </picture>
        {/* Cinematic gradient: soft dark top & bottom for 100% readable text, crystal clear center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />
      </div>

      {/* ── Top Header: Sleek, high-contrast Admin Trigger ───────────────────── */}
      <header className="relative z-20 w-full px-5 md:px-12 py-5 md:py-6 flex items-center justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-black/50 hover:bg-black/80 border border-white/30 hover:border-white/60 backdrop-blur-md transition-all text-[11px] md:text-xs font-medium tracking-[0.2em] text-white shadow-lg cursor-pointer"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/90 group-hover:text-white transition-colors" />
          <span>
            ADMIN? <span className="underline underline-offset-4 decoration-white/50 group-hover:decoration-white">ENTER YOUR PASSWORD</span>
          </span>
        </button>
      </header>

      {/* ── Center Content: COMING SOON above, clear view of golden logo in archway, description below ─────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-between text-center px-4 md:px-6 py-4 md:py-8 max-w-4xl mx-auto w-full">
        {/* COMING SOON Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-1 md:pt-3"
        >
          <h1 
            className="text-[clamp(2.2rem,5vw,3.8rem)] font-light tracking-[0.3em] leading-none uppercase text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {content.title}
          </h1>
        </motion.div>

        {/* Generous empty spacer to leave the 3D golden emblem & reflection 100% uncovered */}
        <div className="flex-1 w-full min-h-[140px] md:min-h-[220px]" />

        {/* Description: Exact text requested by user */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pb-3 md:pb-5 px-2"
        >
          <p 
            className="text-xs sm:text-sm md:text-base text-white font-medium max-w-2xl mx-auto leading-relaxed tracking-[0.16em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,1)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            A UK-based clothing brand bringing Indian culture into everyday fashion
            <br />
            <span className="tracking-[0.26em] text-amber-100 font-light text-[11px] sm:text-xs md:text-sm mt-1.5 inline-block opacity-95">
              made in India
            </span>
          </p>
        </motion.div>
      </main>

      {/* ── Bottom Bar: Luminous white rule, Left Insta & Right Email ─────────────────────────────────── */}
      <footer className="relative z-20 w-full px-5 md:px-12 pb-6 md:pb-8 pt-2">
        {/* Crisp white horizontal line */}
        <div className="w-full h-[1.5px] bg-white/70 shadow-[0_1px_8px_rgba(255,255,255,0.3)] mb-4 md:mb-5" />
        
        {/* Left-aligned Instagram & Right-aligned Email */}
        <div 
          className="flex items-center justify-between w-full text-xs sm:text-sm md:text-base font-medium text-white"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.15em" }}
        >
          {/* Left: Instagram */}
          <a 
            href={content.instagramUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 md:gap-2.5 text-white/95 hover:text-white transition-all hover:scale-105 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-4.5 md:h-4.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>{content.instagramHandle}</span>
          </a>

          {/* Right: Email */}
          <a 
            href={`mailto:${content.email}`} 
            className="flex items-center gap-2 md:gap-2.5 text-white/95 hover:text-white transition-all hover:scale-105 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            <Mail className="w-4 h-4 md:w-4.5 md:h-4.5" strokeWidth={2} />
            <span>{content.email}</span>
          </a>
        </div>
      </footer>

      {/* ── Floating Admin Password Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsModalOpen(false); setError(""); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md bg-[#242220] border border-[#B8923A]/30 rounded-none p-6 md:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => { setIsModalOpen(false); setError(""); }}
                className="absolute top-5 right-5 w-8 h-8 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#B8923A]/20 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#B8923A]" />
                </div>
                <h3 className="text-lg font-normal tracking-widest text-[#FBF9F4] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  {content.modalTitle}
                </h3>
              </div>

              <p className="text-xs text-white/50 leading-relaxed mb-6" style={{ fontFamily: "var(--font-sans)" }}>
                {content.modalDescription}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter passphrase..."
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
                    className="w-full h-12 px-4 rounded-none bg-black/50 border border-white/10 text-white placeholder:text-white/30 text-sm outline-none focus:border-[#B8923A] transition-colors"
                    required
                  />
                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 mt-2">
                      {error}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#FBF9F4] text-[#242220] text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#D8D1C2] transition-colors disabled:opacity-50 mt-1 cursor-pointer font-semibold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-[#242220]/20 border-t-[#242220] animate-spin" />
                  ) : (
                    <>
                      <span>Enter Storefront</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
