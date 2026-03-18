import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu } from 'lucide-react';

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Organizations', href: 'organizations' },
  { label: 'Contact', href: 'contact' },
];

export function Navigation() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // --- Scroll state trackers ---
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isManualScrolling = useRef(false);

  // --- BULLETPROOF SCROLL SPY LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Hide-on-scroll logic (graceful on mobile, stays visible on desktop via CSS)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Don't auto-update if the user just clicked a nav link
      if (isManualScrolling.current) return;

      // Reset if at the very top
      if (currentScrollY < 100) {
        setActiveSection('');
        return;
      }

      // 1. Check if user hit the absolute bottom of the page
      const isAtBottom = window.innerHeight + Math.round(currentScrollY) >= document.documentElement.scrollHeight - 50;
      
      if (isAtBottom) {
        setActiveSection(navLinks[navLinks.length - 1].href);
        return;
      }

      // 2. Mathematical Coordinate Check (100% Reliable)
      let currentActive = '';
      
      for (const link of navLinks) {
        const element = document.getElementById(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section reaches the upper 1/3rd of the screen, mark it active
          if (rect.top <= window.innerHeight / 3) {
            currentActive = link.href;
          }
        }
      }

      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    // Use passive listener for butter-smooth 60fps performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check on mount
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- ROBUST CLICK-TO-SCROLL ---
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = document.getElementById(sectionId);
    
    if (element) {
      isManualScrolling.current = true;
      setActiveSection(sectionId); 
      
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Account for the navbar height so it doesn't cover the title
      const targetY = rect.top + scrollTop - 80; 

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });

      // Unlock standard scroll detection after animation finishes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ease-in-out ${
        !isVisible ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
      }`}
    >
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
          {/* RESTORED PREMIUM LOGO - High Contrast Black/White */}
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
          <div className="flex items-center gap-3">
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