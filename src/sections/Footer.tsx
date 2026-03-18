import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
// 1. Connect to the global performance engine
import { usePerformance } from '@/context/PerformanceContext'; 
import { Linkedin, Github, Mail, ArrowUp, Sparkles } from 'lucide-react';

export function Footer() {
  const [showButton, setShowButton] = useState(false);
  const { isLowPower, isMinimal } = usePerformance();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // --- SEAMLESS PHYSICS ENGINE FOR BACKGROUND GLOW ---
  const timeRef = useRef(0);
  const blobScale = useMotionValue(1);
  const blobOpacity = useMotionValue(0.2);

  // TRI-MODE THROTTLE: Minimal = 0 (Stop), Performance = 0.2 (Slow), Visual = 1 (Fast)
  const speedMultiplier = useSpring(isMinimal ? 0 : isLowPower ? 0.2 : 1, { stiffness: 40, damping: 20 });

  useEffect(() => {
    speedMultiplier.set(isMinimal ? 0 : isLowPower ? 0.2 : 1);
  }, [isMinimal, isLowPower, speedMultiplier]);

  useAnimationFrame((time, delta) => {
    if (delta > 100) delta = 16; 
    const dSec = delta / 1000;
    const m = speedMultiplier.get();

    if (isMinimal) {
      // SETTLE SMOOTHLY: Mathematically glide the glow back to 0 opacity
      const currentScale = blobScale.get();
      blobScale.set(currentScale + (1 - currentScale) * 0.05);
      
      const currentOpacity = blobOpacity.get();
      blobOpacity.set(currentOpacity + (0 - currentOpacity) * 0.05); 
    } else {
      // Continuous Sine Waves for Pulsing physics
      timeRef.current += dSec * m;
      const t = timeRef.current;
      
      blobScale.set(1 + Math.sin(t * 0.78) * 0.05);
      // Lower base opacity if in low power mode
      const baseOpacity = isLowPower ? 0.1 : 0.2;
      blobOpacity.set(baseOpacity + Math.sin(t * 0.78) * 0.05);
    }
  });
  // --------------------------------------------------

  // --- SMART VISIBILITY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // FIX: Check the scroll position immediately on mount in case the user reloads at the bottom
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative py-12 border-t border-slate-900 bg-slate-950 overflow-hidden text-slate-300">
      
      {/* Premium Background Grid - Fades in Minimal Mode */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isMinimal ? 'opacity-5' : 'opacity-20'}`} 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Background Glow - Driven by Physics Engine for smooth decay */}
      <motion.div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none transition-[filter] duration-1000 ${
          isLowPower ? 'bg-sky-500/5 blur-[80px]' : 'bg-sky-500/5 blur-[120px]'
        }`}
        style={{ scale: blobScale, opacity: blobOpacity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center font-bold text-2xl tracking-tight mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={scrollToTop}
          >
            <span className="bg-white text-slate-950 px-3 py-1.5 rounded-l-lg">KP</span>
            <span className="border-2 border-l-0 border-white text-white px-3 py-1 rounded-r-lg">Espino</span>
          </div>

          <p className="text-slate-400 text-center mb-8 tracking-wide">
            Engineered for Excellence
          </p>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {['About', 'Projects', 'Skills', 'Organizations', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(link.toLowerCase());
                  if (element) {
                    const offsetTop = element.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                  }
                }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4 mb-10">
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/in/karl-philip-espino-388894346/', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/Sel1207', label: 'GitHub' },
              { icon: Mail, href: 'mailto:kpcespino@mymail.mapua.edu.ph', label: 'Email' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 ${
                  isMinimal ? '' : 'hover:text-sky-400 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-1'
                }`}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* AI Disclaimer */}
          <div className="flex flex-col items-center gap-3 mb-8 text-center px-4 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sky-500 font-bold mb-1">
              <Sparkles className="h-3 w-3" />
              AI-Augmented Development
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              "This digital portfolio was developed through the strategic utilization of Artificial Intelligence (AI) to enhance code optimization and user experience design. Intended strictly for personal and professional presentation use."
            </p>
          </div>

          <div className="w-full max-w-3xl h-px bg-slate-800/60 mb-8" />

          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 mb-4">
            <span>© {currentYear} Karl Philip Espino. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="tracking-wide">Arayat, Pampanga • Philippines</span>
          </div>
        </div>

        {/* --- BACK TO TOP BUTTON (Fixed to match Chatbot behavior exactly) --- */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-sky-500 text-white shadow-xl flex items-center justify-center hover:bg-sky-600 transition-colors z-50 border-none outline-none focus:outline-none focus:ring-0"
              aria-label="Back to top"
            >
              <ArrowUp className="w-6 h-6" />
              {/* Subtle pulse removed in Performance and Minimal modes */}
              {!isMinimal && !isLowPower && (
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}