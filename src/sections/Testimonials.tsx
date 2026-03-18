import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'N/A',
    role: 'N/A',
    organization: 'N/A',
    content: 'N/A',
    rating: 5,
  },
  {
    id: '2',
    name: 'N/A',
    role: 'N/A',
    organization: 'N/A',
    content: 'N/A',
    rating: 5,
  },
  {
    id: '3',
    name: 'N/A',
    role: 'N/A',
    organization: 'N/A',
    content: 'N/A',
    rating: 5,
  },
  {
    id: '4',
    name: 'N/A',
    role: 'N/A',
    organization: 'N/A',
    content: 'N/A',
    rating: 5,
  },
];

export function Testimonials() {
  const { ref: sectionRef } = useScrollReveal<HTMLElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // SMART AUTO-PLAY LOGIC
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-slides every 5 seconds

    // Adding currentIndex to the dependency array ensures the timer resets 
    // when the user manually clicks next/prev, giving them a full 5 seconds to read.
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden text-slate-300"
    >
      {/* Minimalist Background Effects (Permanently Dark) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* Uniform Shimmer Badge */}
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-4 cursor-default">
            <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse relative z-10" />
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest relative z-10">Testimonials</span>
              <motion.div 
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Uniform Gradient Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What Others{' '}
            <motion.span 
              className="inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              style={{
                backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Say
            </motion.span>
          </h2>
          <p className="text-slate-400 text-lg">
            Feedback from professors, mentors, and colleagues who have worked with me.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* PAUSE ON HOVER LOGIC APPLIED HERE */}
          <div 
            className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-[0_8px_30px_rgba(14,165,233,0.05)]"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            
            {/* Top Glowing Accent Line */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Quote className="h-6 w-6 text-white" />
            </div>

            {/* Content Container (Animated) */}
            <div className="pt-4 min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < currentTestimonial.rating
                            ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-xl lg:text-2xl font-medium text-white mb-8 leading-relaxed">
                    "{currentTestimonial.content}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>

              {/* Author & Navigation Row */}
              <div className="flex items-center justify-between flex-wrap gap-4 mt-auto pt-6 border-t border-slate-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`author-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    {/* Avatar placeholder */}
                    <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                      {currentTestimonial.name === 'N/A' ? 'NA' : currentTestimonial.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white">{currentTestimonial.name}</div>
                      <div className="text-sm text-slate-400">{currentTestimonial.role}</div>
                      <div className="text-sm font-semibold text-sky-400">{currentTestimonial.organization}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="rounded-xl bg-slate-800 border-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="rounded-xl bg-slate-800 border-slate-700 text-slate-300 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}