import { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame, 
  useMotionValue, 
  useSpring, 
  useTransform,
  useScroll 
} from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { usePerformance } from '@/context/PerformanceContext'; 
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, Zap, Sparkles, Leaf } from 'lucide-react';

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Organizations', href: 'organizations' },
  { label: 'Contact', href: 'contact' },
];

// --- THE CIRCUIT NODE: ENGINEERED OCTAGON LOGO ---
function PowerMark({ isScrolled }: { isScrolled: boolean }) {
  const { mode, isLowPower, isMinimal } = usePerformance();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();
  const rotation = useMotionValue(0);
  
  const targetProgress = useMotionValue(0);
  const smoothProgress = useSpring(targetProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // "Chamfered Octagon" - The shape of high-end hardware/chips
  const nodePath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  useAnimationFrame((t, delta) => {
    if (isHovered && !isMinimal) {
      rotation.set(rotation.get() + (isLowPower ? 2 : 5));
    } else {
      const current = rotation.get();
      if (current !== 0) {
        rotation.set(current * 0.95); 
        if (current < 0.1) rotation.set(0);
      }
    }
    targetProgress.set(isHovered ? 1 : scrollYProgress.get());
  });

  return (
    <div 
      className="group flex items-center gap-4 cursor-pointer select-none" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="relative flex items-center justify-center flex-shrink-0">
        {/* OUTER ROTATING CHASSIS */}
        <motion.div 
          className="relative w-11 h-11 bg-foreground/10 border border-foreground/20 flex items-center justify-center shadow-lg"
          animate={{ scale: isHovered && !isMinimal ? 1.1 : 1 }}
          style={{ clipPath: nodePath, WebkitClipPath: nodePath, rotate: rotation }}
        >
          {/* Subtle PCB Traces inside the rotating frame */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground/50 rotate-45" />
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground/50 -rotate-45" />
          </div>
        </motion.div>

        {/* SOLID INNER NODE CORE */}
        <motion.div 
          className="absolute inset-1 bg-foreground flex items-center justify-center z-10"
          animate={{ 
            inset: isHovered && !isMinimal ? "2px" : "5px" 
          }}
          style={{ clipPath: nodePath, WebkitClipPath: nodePath }}
        >
          <div className="absolute inset-[1.5px] bg-background flex items-center justify-center" style={{ clipPath: nodePath, WebkitClipPath: nodePath }}>
            {/* THE INITIALS: Bold and high-readability */}
            <motion.span 
              className="relative z-10 text-foreground font-black tracking-tighter"
              animate={{ 
                scale: isHovered && !isMinimal ? 1.45 : 1, 
                fontSize: "13px" 
              }}
            >
              KP
            </motion.span>
            
            {/* Static Grid Pattern for that "Grid Dynamics" vibe */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
          </div>
        </motion.div>

        <AnimatePresence>
          {isHovered && mode === 'visual' && !isMinimal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sky-400/10 blur-xl -z-10 scale-150"
            />
          )}
        </AnimatePresence>
      </div>

      {/* TEXT SECTION: Locked width ensures NO layout jumping */}
      <div className="flex flex-col justify-center w-36 sm:w-44 flex-shrink-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-foreground font-extrabold text-2xl tracking-tighter uppercase leading-none">
            Espino
          </span>
          <div className="relative h-3">
            <motion.span 
              animate={{ opacity: isHovered && !isMinimal ? 1 : 0.5 }}
              className="text-sky-500 font-black text-[9px] uppercase tracking-[0.2em] block"
            >
              {isHovered && !isMinimal ? 'Turbo' : 'System'}
            </motion.span>
          </div>
        </div>
        
        {/* THE PROGRESS LINE - NOW VISIBLE ON MOBILE */}
        <div className="h-[2px] w-full bg-foreground/10 rounded-full mt-1.5 overflow-hidden relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-sky-500 shadow-[0_0_10px_#38bdf8]" 
            style={{ width: '100%', originX: 0, scaleX: smoothProgress }} 
          />
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { mode, cycleMode } = usePerformance(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isManualScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (isManualScrolling.current) return;
      const isAtBottom = window.innerHeight + Math.round(currentScrollY) >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) { setActiveSection(navLinks[navLinks.length - 1].href); return; }
      let currentActive = '';
      for (const link of navLinks) {
        const element = document.getElementById(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) currentActive = link.href;
        }
      }
      setActiveSection(currentActive);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      isManualScrolling.current = true;
      setActiveSection(sectionId); 
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      setTimeout(() => { isManualScrolling.current = false; }, 1000);
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 translate-y-0">
      <div className={`w-full transition-colors duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent border-transparent'}`}>
        <motion.nav
          animate={{ height: isScrolled ? 64 : 80 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative"
        >
          {/* Logo Section */}
          <div className="flex-shrink-0 z-20"><PowerMark isScrolled={isScrolled} /></div>

          {/* Nav Links: Locked in center */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeSection === link.href ? 'text-sky-500 bg-sky-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 z-20">
            {/* PERFORMANCE TOGGLE */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={cycleMode} 
              title={`Current Mode: ${mode === 'visual' ? 'Turbo' : mode === 'performance' ? 'Performance' : 'Eco'}`}
              className={`rounded-full border border-transparent transition-all duration-300 ${
                mode === 'visual' ? 'text-purple-400 hover:text-purple-400 hover:border-purple-500/30 hover:bg-foreground/5' :
                mode === 'performance' ? 'text-sky-500 hover:text-sky-500 hover:border-sky-500/30 hover:bg-foreground/5' :
                'text-emerald-500 hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-foreground/5'
              }`}
            >
              {mode === 'visual' ? <Sparkles className="h-5 w-5" /> : 
               mode === 'performance' ? <Zap className="h-5 w-5 fill-current" /> : 
               <Leaf className="h-5 w-5" />}
            </Button>

            {/* THEME TOGGLE */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="rounded-full border border-transparent hover:border-foreground/10 hover:bg-foreground/5 transition-all duration-300 text-foreground/70 hover:text-foreground"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button className="hidden sm:flex bg-foreground text-background hover:bg-sky-500 hover:text-white rounded-full px-6 font-semibold transition-all duration-300 shadow-sm active:scale-95" onClick={(e) => scrollToSection(e, 'contact')}>
              Hire Me
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-xl"><Menu className="h-6 w-6" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl z-[150] border-l-border">
                <nav className="flex flex-col gap-4 mt-12">
                  {navLinks.map((link) => (
                    <button key={link.href} onClick={(e) => scrollToSection(e, link.href)} className={`text-left text-lg font-bold p-4 rounded-xl transition-colors ${activeSection === link.href ? 'bg-sky-500/10 text-sky-500' : 'text-foreground/70'}`}>
                      {link.label}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}