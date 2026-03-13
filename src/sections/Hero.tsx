import React, { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  ZoomIn, 
  X 
} from 'lucide-react';

// --- CUSTOM TYPEWRITER (No external packages needed) ---
function TypewriterEffect() {
  const strings = [
    'BS/MS Electrical Engineering Student',
    'Power System Protection Specialist',
    'Industrial Automation Enthusiast'
  ];
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const i = loopNum % strings.length;
    const fullText = strings[i];
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const delayBetweenWords = 1500;

    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return <span>{text}<span className="animate-pulse ml-1 text-slate-400">|</span></span>;
}

// --- CUSTOM COUNTER (Uses native framer-motion) ---
function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

// --- MAGNETIC WRAPPER COMPONENT ---
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
    }
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- STAT ITEM CONFIGURATION ---
interface StatItemProps {
  value: number | string;
  label: string;
  suffix?: string;
  tooltip?: string;
  isCounter?: boolean;
}

function StatItem({ value, label, suffix = '', tooltip, isCounter = false }: StatItemProps) {
  return (
    <motion.div variants={fadeInUp} className="text-center relative group cursor-help">
      <div className="text-3xl sm:text-4xl font-bold text-accent-blue transition-colors group-hover:text-blue-400">
        {isCounter && typeof value === 'number' ? <Counter end={value} /> : value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 transition-colors group-hover:text-foreground">
        {label}
      </div>
      
      {tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-2 group-hover:translate-y-0">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-3 shadow-2xl text-[11px] text-slate-300 leading-relaxed text-center">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-700" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-slate-900" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// --- MAIN HERO COMPONENT ---
export function Hero() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 80;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden bg-background">
      {/* Animated Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" 
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Content Column */}
          <motion.div 
            className="order-2 lg:order-1"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/80 cursor-default">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Available for OJT
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Headline */}
            <motion.div variants={fadeInUp}>
              <p className="text-lg text-muted-foreground mb-2">Hello, I'm</p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 flex flex-col items-start">
                <span className="text-foreground">Karl Philip</span>
                <motion.span 
                  className="leading-tight py-2 inline-block w-fit"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))",
                  }}
                >
                  Espino
                </motion.span>
              </h1>
              
              {/* Custom Typewriter Implementation */}
              <div className="text-xl font-medium text-blue-400 h-8 mb-6">
                <TypewriterEffect />
              </div>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-xl mb-8">
              Third-year BS/MS Electrical Engineering student at{' '}
              <span className="text-foreground font-medium">Mapúa University</span> specializing in{' '}
              <span className="text-accent-blue font-semibold">power system protection</span> and{' '}
              <span className="text-accent-blue font-semibold">control</span>.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <Magnetic>
                <Button size="lg" className="bg-accent-blue hover:scale-105 transition-transform rounded-xl px-8" onClick={() => scrollToSection('projects')}>
                  View Projects <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="outline" className="rounded-xl px-8 hover:bg-accent-blue/10 transition-colors">
                  Download CV <Download className="ml-2 h-4 w-4" />
                </Button>
              </Magnetic>
            </motion.div>

            {/* STATS GRID */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <StatItem 
                value={3} 
                label="Year Standing" 
                suffix="rd" 
                isCounter={true}
                tooltip="Calculated based on successfully completed academic units."
              />
              <StatItem 
                value={6} 
                label="President's Lister" 
                suffix="x" 
                isCounter={true}
                tooltip="An elite quarterly award granted exclusively to top-ranking Dean's Listers."
              />
              <StatItem 
                value="BMEE" 
                label="Program" 
                tooltip="An accelerated joint degree program for both BS and MS in Electrical Engineering."
              />
              <StatItem 
                value="2023" 
                label="Batch" 
                tooltip="Year of matriculation at Mapúa University."
              />
            </motion.div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div 
              className="relative group cursor-zoom-in"
              onClick={() => setIsImageModalOpen(true)}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-accent-blue/30 rounded-3xl blur-3xl scale-110" />
              
              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-300 group-hover:border-accent-blue/30">
                <img 
                  src="/hero-portrait.jpg" 
                  alt="Karl Philip Espino" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 flex items-center gap-2 z-10">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-medium text-white">BS/MS Electrical Engineering</span>
                </div>

                <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm border border-white/20">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-white text-sm font-semibold p-2 rounded-lg bg-black/60 backdrop-blur-sm">Click to expand photo</p>
                  </div>
                </div>
              </div>

              {/* MEDAL */}
              <motion.div 
                animate={{ 
                  y: [0, -5, 0],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }} 
                transition={{ 
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }} 
                className="absolute -top-4 -right-4 text-white rounded-2xl p-4 shadow-xl z-30"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                  backgroundSize: "300% 300%",
                }}
              >
                <Award className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2.5 }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-accent-blue rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>

      {/* IMAGE POPUP MODAL */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-slate-900 border-slate-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[100] outline-none border-none">
          <button 
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-accent-blue transition-colors group"
            aria-label="Close"
          >
            <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
          <DialogHeader className="p-0">
            <DialogTitle className="sr-only">Karl Philip Espino Portrait</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img src="/hero-portrait.jpg" alt="Karl Philip Espino" className="w-full max-h-[80vh] object-contain" />
            <div className="p-6 w-full text-center bg-slate-950 border-t border-slate-800">
              <DialogDescription className="text-sm text-slate-400 italic leading-relaxed">
                Photo taken during the Mapúa University Senior High School Official Pictorial.
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}