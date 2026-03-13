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
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden text-slate-300"
    >
      {/* Premium Background Effects */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sky-400 font-semibold mb-2 uppercase tracking-wider text-sm">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-2">
            What Others Say
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mx-auto mb-6 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
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
          <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-[0_8px_30px_rgb(14,165,233,0.1)]">
            
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
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{currentTestimonial.name}</div>
                      <div className="text-sm text-slate-400">{currentTestimonial.role}</div>
                      <div className="text-sm font-medium text-sky-400">{currentTestimonial.organization}</div>
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