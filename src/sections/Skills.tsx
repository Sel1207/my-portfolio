import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
// Connect to the global Tri-Mode performance engine
import { usePerformance } from '@/context/PerformanceContext'; 
import { 
  Lightbulb, 
  Layers,
  Zap,
  Sliders,
  Award,
  Star
} from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

interface Skill {
  name: string;
  level: number; // Changed to 1-5 for star rating
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Software & Simulation',
    icon: Layers,
    skills: [
      { name: 'DIALux evo', level: 4 },
      { name: 'Fusion 360', level: 4 },
      { name: 'AutoCAD', level: 4 },
      { name: 'Python / Pandas', level: 4 },
      { name: 'Fluid Sim', level: 4 },
      { name: 'SketchUp', level: 3 },
    ],
  },
  {
    title: 'Core Competencies',
    icon: Zap,
    skills: [
      { name: 'Power System Protection', level: 4 },
      { name: 'Lighting Design', level: 4 },
      { name: 'Omron PLC Programming', level: 4 },
      { name: 'Industrial Automation', level: 4 },
      { name: '3D Printing', level: 4 },
    ],
  },
];

const trainingItems = [
  { name: 'DOST Scholar Program', issuer: 'Department of Science & Technology', status: 'Ongoing', icon: Award },
  { name: 'Illumination Design', issuer: 'Mapúa University', status: 'Completed', icon: Lightbulb },
  { name: 'Power Systems Analysis', issuer: 'Mapúa University', status: 'Completed', icon: Zap },
  { name: 'Control Systems Design', issuer: 'Mapúa University', status: 'Completed', icon: Sliders },
];

// --- NEW STAR RATING COMPONENT ---
function StarRating({ level, delay, isMinimal }: { level: number; delay: number; isMinimal: boolean }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = starIndex <= level;
        return (
          <motion.div
            key={starIndex}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.4, 
              delay: delay + (starIndex * 0.05), // Stagger each star slightly
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            <Star 
              className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300 ${
                isFilled 
                  ? `text-sky-500 dark:text-accent-blue fill-current ${isMinimal ? '' : 'drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]'}` 
                  : 'text-slate-200 dark:text-slate-800'
              }`}
              strokeWidth={isFilled ? 1 : 2}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export function Skills() {
  const { isLowPower, isMinimal } = usePerformance();

  // --- SEAMLESS PHYSICS ENGINE ---
  const trace1Y = useMotionValue(-100);
  const trace2Y = useMotionValue(-100);
  const trace3X = useMotionValue(-100);
  
  const gradientPos = useMotionValue(0);
  const gradientDirection = useRef(1);

  const speedMultiplier = useSpring(isMinimal ? 0 : isLowPower ? 0.2 : 1, { stiffness: 40, damping: 20 });

  useEffect(() => {
    speedMultiplier.set(isMinimal ? 0 : isLowPower ? 0.2 : 1);
  }, [isMinimal, isLowPower, speedMultiplier]);

  useAnimationFrame((time, delta) => {
    if (delta > 100) delta = 16; 
    const dSec = delta / 1000;
    const m = speedMultiplier.get();

    // Electricity Traces
    let y1 = trace1Y.get() + (50 * m * dSec);
    if (y1 >= 100) y1 -= 200;
    trace1Y.set(y1);

    let y2 = trace2Y.get() + (33.33 * m * dSec);
    if (y2 >= 100) y2 -= 200;
    trace2Y.set(y2);

    let x3 = trace3X.get() + (28.57 * m * dSec);
    if (x3 >= 100) x3 -= 200;
    trace3X.set(x3);

    // Title Gradient Ping-Pong
    if (isMinimal) {
      const currentGPos = gradientPos.get();
      gradientPos.set(currentGPos + (0 - currentGPos) * 0.1); 
      gradientDirection.current = 1; 
    } else {
      let gP = gradientPos.get() + (66.66 * m * dSec * gradientDirection.current);
      if (gP >= 100) {
        gP = 100 - (gP - 100);
        gradientDirection.current = -1;
      } else if (gP <= 0) {
        gP = Math.abs(gP);
        gradientDirection.current = 1;
      }
      gradientPos.set(gP);
    }
  });

  const t1 = useTransform(trace1Y, v => `${v}%`);
  const t2 = useTransform(trace2Y, v => `${v}%`);
  const t3 = useTransform(trace3X, v => `${v}%`);
  const bgPosString = useTransform(gradientPos, v => `${v}% 50%`);

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-background overflow-hidden transition-colors duration-300">
      
      {/* Subtle Grid Pattern */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isMinimal ? 'opacity-0' : 'opacity-[0.03] dark:opacity-10'}`} 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* BACKGROUND GLOWS */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-1000 ${
        isMinimal ? 'opacity-0' : isLowPower ? 'bg-accent-blue/5 blur-[60px] opacity-40' : 'bg-accent-blue/5 blur-[120px] opacity-100'
      }`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-1000 ${
        isMinimal ? 'opacity-0' : isLowPower ? 'bg-purple-500/5 blur-[50px] opacity-40' : 'bg-purple-500/5 blur-[100px] opacity-100'
      }`} />

      {/* CIRCUIT TRACES */}
      <motion.div animate={{ opacity: isMinimal ? 0 : 1 }} transition={{ duration: 1 }} className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-sky-500/30 dark:via-sky-400/80 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.2)] dark:shadow-[0_0_10px_#38bdf8]" style={{ y: t1 }} />
      <motion.div animate={{ opacity: isMinimal ? 0 : 1 }} transition={{ duration: 1 }} className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/30 dark:via-blue-500/80 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:shadow-[0_0_10px_#3b82f6]" style={{ y: t2 }} />
      <motion.div animate={{ opacity: isMinimal ? 0 : 1 }} transition={{ duration: 1 }} className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 dark:via-sky-400/50 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.2)] dark:shadow-[0_0_10px_#38bdf8]" style={{ x: t3 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div whileHover={isMinimal ? {} : { scale: 1.05 }} className="inline-block mb-4 cursor-default">
            <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-accent-blue/10 border border-sky-500/20 dark:border-accent-blue/20">
              <span className={`w-2 h-2 rounded-full bg-sky-500 dark:bg-accent-blue relative z-10 ${isMinimal || isLowPower ? '' : 'animate-pulse'}`} />
              <span className="text-sky-600 dark:text-accent-blue text-xs font-bold uppercase tracking-widest relative z-10">My Expertise</span>
              
              {!isLowPower && !isMinimal && (
                <motion.div 
                  className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-sky-300/40 dark:via-white/20 to-transparent -skew-x-12 z-0"
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                />
              )}
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Skills &{' '}
            <motion.span 
              className="inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                backgroundPosition: bgPosString 
              }}
            >
              Tools
            </motion.span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive toolkit built through academic excellence and hands-on project experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <SpotlightCard className={`p-6 lg:p-8 h-full border border-border/50 transition-colors group ${isMinimal ? '' : 'hover:border-accent-blue/30'}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center transition-colors ${isMinimal ? '' : 'group-hover:bg-accent-blue/20'}`}>
                    <category.icon className="h-6 w-6 text-accent-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{category.title}</h3>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${isMinimal ? '' : 'hover:bg-foreground/5'}`}>
                      <span className="font-semibold text-sm text-foreground">{skill.name}</span>
                      <StarRating 
                        level={skill.level} 
                        delay={0.2 + (skillIndex * 0.1)} 
                        isMinimal={isMinimal} 
                      />
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Training & Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-2xl font-bold text-foreground">Training & Development</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainingItems.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={isMinimal || isLowPower ? {} : { y: -5 }} 
              >
                <SpotlightCard className={`p-5 h-full flex flex-col border border-border/50 transition-all group ${isMinimal ? '' : 'hover:border-accent-blue/30'}`}>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center border border-transparent transition-all duration-300 ${isMinimal ? '' : 'group-hover:bg-accent-blue group-hover:border-accent-blue/20'}`}>
                      <item.icon className={`h-5 w-5 text-accent-blue transition-colors ${isMinimal ? '' : 'group-hover:text-white'}`} />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        item.status === 'Ongoing'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                          : item.status === 'In Progress'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
                          : 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm mb-2 text-foreground transition-colors ${isMinimal ? '' : 'group-hover:text-accent-blue'}`}>{item.name}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{item.issuer}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}