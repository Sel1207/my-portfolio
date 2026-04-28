import { useEffect } from 'react';
import { motion } from 'framer-motion';
// 1. Connect to the global Tri-Mode performance engine
import { usePerformance } from '@/context/PerformanceContext'; 
import { Calendar, Award, Zap, BookOpen, Microscope, Globe } from 'lucide-react';

interface Organization {
  name: string;
  role: string;
  period: string;
  description: string;
  icon: React.ElementType;
}

// Reordered exactly as requested: Top 3, Bottom 2
const organizations: Organization[] = [
  {
    name: 'Institute of Integrated Electrical Engineers Philippines - MU',
    role: 'Member',
    period: 'May 2024 - Present',
    description: 'Engaged with the premier professional organization for electrical engineers, fostering industry connections and technical knowledge.',
    icon: Zap,
  },
  {
    name: 'IEEE Philippines - Mapúa University',
    role: 'Officer',
    period: 'Feb 2026 - Present',
    description: "Leading student branch initiatives for the world's largest technical professional organization to foster engineering innovation and networking.",
    icon: Globe,
  },
  {
    name: 'The Mapúa Society of Double Degree and Joint Program',
    role: 'Officer',
    period: 'July 2025 - Present',
    description: 'Serving in a leadership capacity to support, guide, and develop strategic initiatives for students navigating accelerated degree programs.',
    icon: BookOpen,
  },
  {
    name: 'Physics Society of Mapua',
    role: 'Member',
    period: 'Oct 2023 - Present',
    description: 'Academic organization member dedicated to promoting advanced physics education, theoretical discussions, and research.',
    icon: Microscope,
  },
  {
    name: "Mapúa University DOST Scholars' Association",
    role: 'Member',
    period: 'Oct 2023 - Present',
    description: 'Active member of the DOST scholars community, participating in academic excellence programs and community service activities.',
    icon: Award,
  },
];

export function Organizations() {
  // 2. Destructure global Tri-Mode state
  const { isLowPower, isMinimal } = usePerformance();

  return (
    <section 
      id="organizations" 
      className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center bg-slate-950 overflow-hidden text-slate-300"
    >
      {/* Minimalist Background Grid Pattern - Fades out entirely in Minimal Mode */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isMinimal ? 'opacity-0' : 'opacity-10'}`} 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* BACKGROUND GLOWS: Smoothly dim in Performance, Hidden in Minimal Mode */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 ${isMinimal ? 'opacity-0' : isLowPower ? 'bg-sky-500/5 blur-[60px] opacity-40' : 'bg-sky-500/10 blur-[120px] opacity-100'}`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 ${isMinimal ? 'opacity-0' : isLowPower ? 'bg-blue-500/5 blur-[60px] opacity-40' : 'bg-blue-500/10 blur-[120px] opacity-100'}`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* Uniform Shimmer Badge */}
          <motion.div whileHover={isMinimal ? {} : { scale: 1.05 }} className="inline-block mb-4 cursor-default">
            <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className={`w-2 h-2 rounded-full bg-sky-500 relative z-10 ${isMinimal || isLowPower ? '' : 'animate-pulse'}`} />
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest relative z-10">Extracurricular</span>
              
              {/* FAST SHINE: Now smoothly fades to opacity 0 instead of vanishing/teleporting */}
              <motion.div 
                className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-0"
                animate={{ 
                  left: ['-100%', '200%'],
                  opacity: isLowPower || isMinimal ? 0 : 1
                }}
                transition={{ 
                  left: { duration: 0.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" },
                  opacity: { duration: 0.5, ease: "easeInOut" } // Smooth fade out
                }}
              />
            </div>
          </motion.div>

          {/* NATIVE FRAMER MOTION GRADIENT: Butter-smooth crossfading of colors */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Professional{' '}
            <motion.span 
              className="inline-block"
              animate={{
                // Smoothly blends the entire gradient string into a solid sky blue in Minimal mode
                backgroundImage: isMinimal 
                  ? "linear-gradient(135deg, rgb(14, 165, 233), rgb(14, 165, 233), rgb(14, 165, 233), rgb(14, 165, 233))"
                  : "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                backgroundPosition: isMinimal ? "0% 50%" : ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: isMinimal ? 1 : (isLowPower ? 15 : 8),
                  ease: isMinimal ? "easeOut" : "linear",
                  repeat: isMinimal ? 0 : Infinity,
                },
                backgroundImage: {
                  duration: 1, // Smoothly crossfades the colors over 1 second
                  ease: "easeInOut"
                }
              }}
              style={{
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Organizations
            </motion.span>
          </h2>
          <p className="text-slate-400 text-lg">
            Active member and officer of various academic and professional organizations, fostering leadership and networking in the engineering community.
          </p>
        </motion.div>

        {/* Organizations Grid (Centered Flex Wrap layout) */}
        <div className="flex flex-wrap justify-center gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-sky-500/50 transition-all duration-500 overflow-hidden flex flex-col ${
                isLowPower || isMinimal ? '' : 'hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 pointer-events-none ${isLowPower || isMinimal ? 'hidden' : 'group-hover:opacity-100'}`} />
              
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-5 border border-slate-700 group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition-colors shadow-sm">
                  <org.icon className="h-6 w-6 text-sky-400" />
                </div>

                <h3 className="font-bold text-white mb-3 leading-snug pr-4">{org.name}</h3>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-md border ${
                    org.role === 'Officer' 
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                      : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  }`}>
                    {org.role}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    {org.period}
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mt-auto">
                  {org.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-800"
        >
          {[
            { value: "5", label: "Organizations" },
            { value: "2+", label: "Years Active" },
            { value: "2", label: "Professional Orgs" },
            { value: "3", label: "Academic Orgs" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2 transition-transform duration-300 ${isLowPower || isMinimal ? '' : 'group-hover:scale-110'}`}>
                {stat.value}
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}