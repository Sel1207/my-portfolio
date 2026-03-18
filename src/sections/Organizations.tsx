import { motion } from 'framer-motion';
import { Calendar, Award, Zap, BookOpen, Microscope, Globe } from 'lucide-react';

interface Organization {
  name: string;
  role: string;
  period: string;
  description: string;
  icon: React.ElementType;
}

const organizations: Organization[] = [
  {
    name: "Mapúa University DOST Scholars' Association",
    role: 'Member',
    period: 'Oct 2023 - Present',
    description: 'Active member of the DOST scholars community, participating in academic excellence programs and community service activities.',
    icon: Award,
  },
  {
    name: 'Institute of Integrated Electrical Engineers Philippines - MU',
    role: 'Member',
    period: 'Apr 2024 - Present',
    description: 'Engaged with the premier professional organization for electrical engineers, fostering industry connections and technical knowledge.',
    icon: Zap,
  },
  {
    name: 'Physics Society of Mapua',
    role: 'Member',
    period: 'Oct 2023 - Present',
    description: 'Academic organization member dedicated to promoting advanced physics education, theoretical discussions, and research.',
    icon: Microscope,
  },
  {
    name: 'The Mapúa Society of Double Degree and Joint Program',
    role: 'Officer',
    period: 'Sep 2024 - Present',
    description: 'Serving in a leadership capacity to support, guide, and develop strategic initiatives for students navigating accelerated degree programs.',
    icon: BookOpen,
  },
  {
    name: 'IEEE Philippines - Mapúa University',
    role: 'Officer',
    period: 'Sep 2024 - Present',
    description: "Leading student branch initiatives for the world's largest technical professional organization to foster engineering innovation and networking.",
    icon: Globe,
  },
];

export function Organizations() {
  return (
    <section 
      id="organizations" 
      // THE FIX: Added min-h-screen flex flex-col justify-center so the Nav Observer catches it perfectly
      className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center bg-slate-950 overflow-hidden text-slate-300"
    >
      
      {/* Minimalist Background Effects */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Section Header (Upgraded to match Uniform Aesthetic) */}
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
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest relative z-10">Extracurricular</span>
              <motion.div 
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Uniform Gradient Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Professional{' '}
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
              Organizations
            </motion.span>
          </h2>
          <p className="text-slate-400 text-lg">
            Active member and officer of various academic and professional organizations, fostering leadership and networking in the engineering community.
          </p>
        </motion.div>

        {/* Organizations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-sky-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)] overflow-hidden flex flex-col h-full"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col flex-grow">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-5 border border-slate-700 group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition-colors shadow-sm">
                  <org.icon className="h-6 w-6 text-sky-400" />
                </div>

                {/* Content */}
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
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
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