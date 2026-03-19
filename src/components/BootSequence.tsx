'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Zap, Sparkles, Leaf, Moon, Sun, Power } from 'lucide-react';
import { usePerformance, AppMode } from '@/context/PerformanceContext'; 
import { useTheme } from '@/hooks/useTheme'; 

// --- THE BOOT LOGO (Scaled up PowerMark) ---
function BootLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useMotionValue(0);
  const nodePath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  useAnimationFrame(() => {
    if (isHovered) {
      rotation.set(rotation.get() + 5);
    } else {
      const current = rotation.get();
      if (current !== 0) {
        rotation.set(current * 0.95);
        if (current < 0.1) rotation.set(0);
      }
    }
  });

  return (
    <div 
      className="relative w-20 h-20 flex items-center justify-center cursor-pointer mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 bg-foreground/5 border border-foreground/20 shadow-xl"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        style={{ clipPath: nodePath, WebkitClipPath: nodePath, rotate: rotation }}
      >
        {["top-1.5 left-1.5", "top-1.5 right-1.5", "bottom-1.5 left-1.5", "bottom-1.5 right-1.5"].map((pos, i) => (
          <div key={i} className={`absolute w-1.5 h-1.5 rounded-full bg-foreground/30 border border-foreground/20 ${pos}`} />
        ))}
      </motion.div>

      <motion.div 
        className="absolute inset-2 bg-foreground flex items-center justify-center z-10 shadow-2xl"
        animate={{ inset: isHovered ? "4px" : "10px" }}
        style={{ clipPath: nodePath, WebkitClipPath: nodePath }}
      >
        <div className="absolute inset-[1.5px] bg-background flex items-center justify-center" style={{ clipPath: nodePath, WebkitClipPath: nodePath }}>
          <motion.span 
            className="relative z-10 text-foreground font-black tracking-tighter"
            animate={{ scale: isHovered ? 1.3 : 1, fontSize: "16px" }}
          >
            KP
          </motion.span>
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-sky-400/40 blur-2xl -z-10 scale-[1.5]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAIN BOOT SEQUENCE COMPONENT ---
export function BootSequence() {
  const { setMode } = usePerformance(); 
  const { resolvedTheme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [stagedMode, setStagedMode] = useState<AppMode>('performance');

  useEffect(() => {
    setHasMounted(true);
    const hasBooted = localStorage.getItem('espino_system_booted'); 
    
    if (!hasBooted) {
      const timer = setTimeout(() => setIsVisible(true), 400); 
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isVisible]);

  // THE FAILSAFE PROCEED FUNCTION
  const handleProceed = () => {
    try {
      if (typeof setMode === 'function') {
        setMode(stagedMode); 
      }
    } catch (error) {
      console.warn("Context fallback activated.");
    } finally {
      // This will ALWAYS run, guaranteeing the modal closes
      localStorage.setItem('espino_system_booted', 'true'); 
      setIsVisible(false); 
    }
  };

  // Dynamic Button Styling (Less steep purple, softer glow)
  const getButtonColor = () => {
    switch(stagedMode) {
      case 'visual': return 'bg-purple-700 shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] hover:bg-purple-600';
      case 'performance': return 'bg-sky-600 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:bg-sky-500';
      case 'eco': return 'bg-emerald-700 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] hover:bg-emerald-600';
      default: return 'bg-sky-600';
    }
  };

  if (!hasMounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[500] flex items-center justify-center bg-background/80 backdrop-blur-2xl p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
          
          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
            
            <motion.div variants={itemVariants} className="flex flex-col items-center mb-10 text-center">
              <BootLogo />
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-3">
                System Initialization
              </h1>
              <p className="text-muted-foreground max-w-md text-sm md:text-base">
                Welcome to the Espino Engine. Configure your system resources and interface theme to proceed.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
              
              {/* TURBO MODE - Restored Transparent Background */}
              <motion.button
                variants={itemVariants}
                onClick={() => setStagedMode('visual')}
                className={`group relative flex flex-col items-start p-6 rounded-2xl border transition-all text-left overflow-hidden ${
                  stagedMode === 'visual' 
                    ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                    : 'border-border bg-card/50 hover:bg-card hover:border-purple-500/50'
                }`}
              >
                <div className="p-2.5 rounded-full bg-purple-500/10 text-purple-500 mb-4 transition-transform group-hover:scale-110">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Turbo</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Maximum visual fidelity. High-frequency animations, glows, and particle effects.</p>
              </motion.button>

              {/* PERFORMANCE MODE - Restored Transparent Background */}
              <motion.button
                variants={itemVariants}
                onClick={() => setStagedMode('performance')}
                className={`group relative flex flex-col items-start p-6 rounded-2xl border transition-all text-left overflow-hidden ${
                  stagedMode === 'performance' 
                    ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]' 
                    : 'border-border bg-card/50 hover:bg-card hover:border-sky-500/50'
                }`}
              >
                <div className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded-full">Default</div>
                <div className="p-2.5 rounded-full bg-sky-500/20 text-sky-500 mb-4 transition-transform group-hover:scale-110">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Performance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Balanced system load. Essential physics and smooth transitions without GPU strain.</p>
              </motion.button>

              {/* ECO MODE - Restored Transparent Background */}
              <motion.button
                variants={itemVariants}
                onClick={() => setStagedMode('eco')}
                className={`group relative flex flex-col items-start p-6 rounded-2xl border transition-all text-left overflow-hidden ${
                  stagedMode === 'eco' 
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                    : 'border-border bg-card/50 hover:bg-card hover:border-emerald-500/50'
                }`}
              >
                <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-500 mb-4 transition-transform group-hover:scale-110">
                  <Leaf className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">Eco</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Maximum efficiency. Static layouts, disabled physics loops, and minimal rendering.</p>
              </motion.button>
            </div>

            {/* CONTROL ROW: Theme Toggle + Boot Button */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-3xl justify-between px-2">
              
              {/* THEME TOGGLE */}
              <div className="flex flex-col gap-2 items-center sm:items-start">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-2">Interface Theme</span>
                <div className="flex bg-foreground/5 rounded-full p-1 border border-border">
                  <button 
                    onClick={() => setTheme('dark')} 
                    className={`px-5 py-2 rounded-full flex items-center gap-2 text-xs font-bold transition-all ${resolvedTheme === 'dark' ? 'bg-background text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Moon className="w-3.5 h-3.5" /> Dark
                  </button>
                  <button 
                    onClick={() => setTheme('light')} 
                    className={`px-5 py-2 rounded-full flex items-center gap-2 text-xs font-bold transition-all ${resolvedTheme === 'light' ? 'bg-background text-foreground shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Light
                  </button>
                </div>
              </div>

              {/* DYNAMIC PROCEED BUTTON */}
              <button
                onClick={handleProceed}
                className={`group relative px-8 py-3.5 text-white font-black text-sm uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 flex items-center gap-3 overflow-hidden mt-4 sm:mt-0 ${getButtonColor()}`}
              >
                {/* Hardware Pulse Ring */}
                <div className="absolute inset-0 rounded-full border border-white/10 animate-[pulse_2s_ease-in-out_infinite]" />
                <Power className="w-4 h-4 relative z-10 transition-transform group-hover:rotate-180 duration-500" />
                <span className="relative z-10">Initialize Engine</span>
              </button>

            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}