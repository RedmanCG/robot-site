"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastScrollYRef.current = window.scrollY;
    let frameId = 0;
    let isTicking = false;

    const setVisibleIfNeeded = (nextValue: boolean) => {
      if (isVisibleRef.current === nextValue) return;

      isVisibleRef.current = nextValue;
      setIsVisible(nextValue);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollYRef.current) {
        setVisibleIfNeeded(true);
      } else if (
        currentScrollY > 100 &&
        currentScrollY > lastScrollYRef.current
      ) {
        setVisibleIfNeeded(false);

        if (isMobileMenuOpenRef.current) {
          isMobileMenuOpenRef.current = false;
          setIsMobileMenuOpen(false);
        }
      }

      lastScrollYRef.current = currentScrollY;
      isTicking = false;
    };

    const onScroll = () => {
      if (isTicking) return;

      isTicking = true;
      frameId = window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const navLinks = [
    { label: "Sensors", href: "#technology" },
    { label: "How It Works", href: "#use-cases" },
    { label: "3D Model", href: "#outputs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center w-full px-4 md:px-0"
    >
      <div className="relative w-full max-w-sm md:max-w-fit">
        
        {/* Main Pill Wrapper */}
        <nav className="flex items-center justify-between gap-8 px-6 md:px-10 py-3.5 rounded-[2.5rem] bg-gradient-to-b from-white/70 to-[#f0f4f8]/50 backdrop-blur-[32px] border border-white/80 shadow-[0_12px_40px_-8px_rgba(11,30,54,0.2),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.4)]">
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="text-[15px] font-medium tracking-wide text-brand-navy/80 hover:text-brand-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/lastline_pt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-navy/60 hover:text-brand-navy transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center justify-between w-full">
            <span className="text-[13px] font-bold tracking-[0.2em] text-brand-navy">SYSTEMS</span>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-1 text-brand-navy"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X size={20} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[115%] left-0 right-0 p-2 rounded-[2rem] bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-[32px] border border-white/60 shadow-[0_20px_40px_-8px_rgba(11,30,54,0.15),inset_0_2px_4px_rgba(255,255,255,1)] flex flex-col overflow-hidden md:hidden"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-center text-[15px] font-medium tracking-wide text-brand-navy/80 hover:text-brand-navy hover:bg-black/[0.03] rounded-2xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/lastline_pt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-4 flex items-center justify-center gap-2 text-[15px] font-medium tracking-wide text-brand-navy/80 hover:text-brand-navy hover:bg-black/[0.03] rounded-2xl transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
