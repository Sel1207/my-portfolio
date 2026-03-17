import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
  
  // --- NEW: Scroll direction state ---
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isManualScrolling = useRef(false);

  // 1. Scroll State, Top Reset, & Hide-on-Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // HIDE ON SCROLL DOWN (Mobile only via CSS later)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down -> Hide
      } else {
        setIsVisible(true);  // Scrolling up -> Show
      }
      lastScrollY.current = currentScrollY;
      
      if (currentScrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Intersection Observer for Scroll Spy
  useLayoutEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current || window.scrollY < 100) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const timeoutId = setTimeout(() => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.href);
        if (section) observer.observe(section);
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // 3. Robust Scroll Function
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
    <header
      // --- FIX: Added transform classes to handle the hide/show logic gracefully ---
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        !isVisible ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
      } ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-md border-b border-border/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <motion.nav
        initial={false}
        animate={{ height: isScrolled ? 64 : 96 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        {/* FIXED LOGO - NATIVE LINK BEHAVIOR */}
        <a 
          href="/" 
          className="group flex items-center font-bold text-xl tracking-tight transition-transform duration-300 hover:scale-105"
          aria-label="Home"
        >
          <span className="bg-foreground text-background px-3 py-1.5 rounded-l-lg transition-all">
            KP
          </span>
          <span className="border-2 border-l-0 border-foreground text-foreground px-3 py-1 rounded-r-lg transition-all">
            Espino
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSection === link.href
                  ? 'text-accent-blue bg-accent-blue/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button
            className="hidden sm:flex bg-foreground text-background hover:bg-accent-blue rounded-full px-6 font-semibold transition-all duration-300 active:scale-95"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            Hire Me
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl z-[150]">
              <nav className="flex flex-col gap-4 mt-12">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-left text-lg font-bold p-4 rounded-xl transition-colors ${
                      activeSection === link.href ? 'bg-accent-blue/10 text-accent-blue' : 'text-foreground/70'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </header>
  );
}