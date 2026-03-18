import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

export function Navigation() {
  const { resolvedTheme, toggleTheme } = useTheme();
  
  // Destructure the tri-mode state (Internal names stay the same to preserve functionality)
  const { mode, cycleMode } = usePerformance(); 
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const isManualScrolling = useRef(false);

  // --- BULLETPROOF SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Triggers the glass background effect when scrolling down
      setIsScrolled(currentScrollY > 20);
      
      if (isManualScrolling.current) return;

      if (currentScrollY < 100) {
        setActiveSection('');
        return;
      }

      // Check if user hit the bottom of the page
      const isAtBottom = window.innerHeight + Math.round(currentScrollY) >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection(navLinks[navLinks.length - 1].href);
        return;
      }

      // Determine which section is currently active
      let currentActive = '';
      for (const link of navLinks) {
        const element = document.getElementById(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            currentActive = link.href;
          }
        }
      }

      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = document.getElementById(sectionId);
    if (element) {
      isManualScrolling.current = true;
      setActiveSection(sectionId); 
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 80; 

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ease-in-out translate-y-0">
      <div
        className={`w-full transition-colors duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <motion.nav
          initial={false}
          animate={{ height: isScrolled ? 64 : 80 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        >
          {/* LOGO */}
          <a 
            href="/" 
            className="group flex items-center font-bold text-xl tracking-tight transition-opacity duration-300 hover:opacity-80"
            aria-label="Home"
          >
            <span className="bg-foreground text-background px-3 py-1.5 rounded-l-lg transition-colors shadow-sm">
              KP
            </span>
            <span className="border-2 border-l-0 border-foreground text-foreground px-3 py-1 rounded-r-lg transition-colors shadow-sm bg-background/50 backdrop-blur-sm">
              Espino
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeSection === link.href
                    ? 'text-sky-500 bg-sky-500/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* TRI-MODE TOGGLE BUTTON (Desktop) */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={cycleMode} 
              className={`rounded-full transition-all duration-300 ${
                mode === 'visual' ? 'text-purple-400 hover:bg-purple-500/10' :
                mode === 'performance' ? 'text-sky-500 hover:bg-sky-500/10' :
                'text-emerald-500 hover:bg-emerald-500/10'
              }`}
              // Hover text maps the internal state to your custom hardware names
              title={`Current Mode: ${mode === 'visual' ? 'Turbo' : mode === 'performance' ? 'Performance' : 'Eco'}`}
            >
              {mode === 'visual' && <Sparkles className="h-5 w-5" />}
              {mode === 'performance' && <Zap className="h-5 w-5 fill-current" />}
              {mode === 'minimal' && <Leaf className="h-5 w-5" />}
            </Button>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full hover:bg-foreground/5 transition-colors"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              className="hidden sm:flex bg-foreground text-background hover:bg-sky-500 hover:text-white rounded-full px-6 font-semibold transition-all duration-300 active:scale-95 shadow-sm"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Hire Me
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-foreground/5">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl z-[150] border-l-border">
                <nav className="flex flex-col gap-4 mt-12">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`text-left text-lg font-bold p-4 rounded-xl transition-colors duration-200 ${
                        activeSection === link.href 
                          ? 'bg-sky-500/10 text-sky-500' 
                          : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  
                  {/* TRI-MODE TOGGLE BUTTON (Mobile) */}
                  <button
                    onClick={cycleMode}
                    className={`flex items-center justify-between text-left text-lg font-bold p-4 rounded-xl transition-colors duration-200 ${
                      mode === 'visual' ? 'bg-purple-500/10 text-purple-400' :
                      mode === 'performance' ? 'bg-sky-500/10 text-sky-500' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}
                  >
                    {/* Mobile text maps the internal state to your custom hardware names */}
                    {mode === 'visual' ? 'Turbo Mode' : mode === 'performance' ? 'Performance Mode' : 'Eco Mode'}
                    {mode === 'visual' && <Sparkles className="h-5 w-5" />}
                    {mode === 'performance' && <Zap className="h-5 w-5 fill-current" />}
                    {mode === 'minimal' && <Leaf className="h-5 w-5" />}
                  </button>

                  <button
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className={`text-left text-lg font-bold p-4 rounded-xl transition-colors duration-200 ${
                      activeSection === 'contact' 
                        ? 'bg-sky-500 text-white' 
                        : 'bg-foreground text-background hover:bg-sky-500 hover:text-white'
                    }`}
                  >
                    Hire Me
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}