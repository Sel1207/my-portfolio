import { motion } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { PerformanceProvider } from '@/context/PerformanceContext'; // MAKE SURE THIS IS IMPORTED
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';
import { Organizations } from '@/sections/Organizations';
import { Certifications } from '@/sections/Certifications';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ChatWidget } from '@/components/ChatWidget'; 
import { BootSequence } from '@/components/BootSequence'; // NEW COMPONENT
import './App.css';

// This is a "Wrapper" component. It makes things fade and slide up.
const Reveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <PerformanceProvider>
        <div className="min-h-screen bg-background text-foreground">
          
          {/* THE SYSTEM INITIALIZATION INTERCEPTOR */}
          <BootSequence />

          <ScrollProgress />
          <Navigation />
          <main>
            {/* Hero usually looks better without a scroll-reveal since it's the first thing you see */}
            <Hero /> 

            <Reveal><About /></Reveal>
            <Reveal><Projects /></Reveal>
            <Reveal><Skills /></Reveal>
            <Reveal><Organizations /></Reveal>
            <Reveal><Certifications /></Reveal>
            <Reveal><Testimonials /></Reveal>
            <Reveal><Contact /></Reveal>
          </main>
          <Footer />
          
          {/* Floating ChatWidget */}
          <ChatWidget />
          
        </div>
      </PerformanceProvider>
    </ThemeProvider>
  );
}

export default App;