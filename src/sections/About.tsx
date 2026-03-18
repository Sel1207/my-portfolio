import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
// 1. Connect to the global performance engine
import { usePerformance } from '@/context/PerformanceContext'; 
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Lightbulb, Cpu, Code, ChevronRight } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

const educationData = [
  { degree: 'BS/MS Electrical Engineering', period: '2023 — Present', school: 'Mapúa University', details: 'Joint Degree Program (BMEE) • Specialization: Power System Protection', icon: GraduationCap, isActive: true },
  { degree: 'Senior High School - STEM Strand', period: 'Aug 2021 — July 2023', school: 'Mapúa University', details: 'With Highest Honors: 1st, 2nd, and 4th Quarter AY 2022-2023', icon: BookOpen, isActive: false },
  { degree: 'Junior High School', period: 'June 2017 — June 2021', school: 'Justino Sevilla High School', details: 'With High Honors: AY 2017-2018, 2018-2019, 2020-2021', icon: Award, isActive: false },
  { degree: 'Elementary', period: 'June 2011 — March 2017', school: 'San Nicolas Elementary School', details: 'School Valedictorian • Best in Math, Science, Communication Arts', icon: Calendar, isActive: false },
];

const expertiseAreas = [
  { title: 'Lighting Design', description: 'DIALux evo for professional illumination planning', icon: Lightbulb },
  { title: 'Industrial Automation', description: 'PLC programming & pneumatic systems', icon: Cpu },
  { title: 'Data Analysis', description: 'Python with Pandas for engineering data', icon: Code },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export function About() {
  // 2. Destructure global state
  const { isLowPower } = usePerformance();

  // --- SEAMLESS PHYSICS ENGINE FOR ALL GRADIENTS ---
  // Guarantees zero-teleportation when switching speeds
  const gradientPos = useMotionValue(0);
  const gradientDirection = useRef(1);

  // The Spring acts as a smooth "throttle" for the animation speed
  const speedMultiplier = useSpring(isLowPower ? 0.2 : 1, { stiffness: 40, damping: 20 });

  useEffect(() => {
    speedMultiplier.set(isLowPower ? 0.2 : 1);
  }, [isLowPower, speedMultiplier]);

  useAnimationFrame((time, delta) => {
    if (delta > 100) delta = 16; // Safety catch for browser tab switching
    const dSec = delta / 1000;
    const m = speedMultiplier.get();

    // Ping-Pong Gradient Math (0% -> 100% -> 0%)
    let gP = gradientPos.get() + (40 * m * dSec * gradientDirection.current);
    if (gP >= 100) {
      gP = 100 - (gP - 100);
      gradientDirection.current = -1;
    } else if (gP <= 0) {
      gP = Math.abs(gP);
      gradientDirection.current = 1;
    }
    gradientPos.set(gP);
  });

  const bgPosString = useTransform(gradientPos, v => `${v}% 50%`);
  // --------------------------------------------------

  return (
    <section id="about" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      
      {/* Subtle Background Glow - Smoothly dim and reduce blur radius in Performance Mode */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 ${
        isLowPower ? 'bg-accent-blue/5 blur-[60px] opacity-40' : 'bg-accent-blue/5 blur-[100px] opacity-100'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Intro & Expertise */}
          <motion.div {...fadeInUp}>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="inline-block mb-6 cursor-default"
            >
              <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20">
                <span className={`w-2 h-2 rounded-full bg-accent-blue relative z-10 ${isLowPower ? '' : 'animate-pulse'}`} />
                <span className="text-accent-blue text-xs font-bold uppercase tracking-widest relative z-10">Get to Know Me</span>
                
                {/* FAST SHINE: Cleanly disabled in Performance Mode to save render costs */}
                {!isLowPower && (
                  <motion.div 
                    className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent -skew-x-12 z-0"
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  />
                )}
              </div>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
              Engineering the{' '}
              <motion.span 
                className="inline-block"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundPosition: bgPosString // Driven by physics engine
                }}
              >
                Future.
              </motion.span>
            </h2>

            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                I am a dedicated Electrical Engineering student in the <span className="text-foreground font-semibold">BMEE joint degree program</span> at Mapúa University. 
              </p>
              <p>
                My academic focus centers on{' '}
                <motion.span 
                  className="font-bold inline-block"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundPosition: bgPosString // Driven by physics engine
                  }}
                >
                  power system protection, operation, and automation
                </motion.span>. 
                I am driven by a commitment to designing reliable, fault-tolerant, and highly efficient electrical infrastructure.
              </p>
              <p className="text-base">
                Beyond foundational circuitry, I bridge the gap between hardware and software. My technical stack includes professional illumination planning, industrial automation logic, and rigorous statistical analysis.
              </p>
            </div>

            {/* Expertise Spotlight Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {expertiseAreas.map((area, index) => (
                // PERFORMANCE MODE: Disable hover translate
                <motion.div key={area.title} whileHover={isLowPower ? {} : { y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <SpotlightCard className="p-5 h-full border border-border/50 bg-card/50 backdrop-blur-sm flex flex-col items-start group">
                    <div className="p-2 rounded-lg bg-accent-blue/10 mb-4 group-hover:bg-accent-blue/20 transition-colors">
                      <area.icon className="h-6 w-6 text-accent-blue" />
                    </div>
                    <h4 className="font-bold text-sm mb-2 text-foreground">{area.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-10 text-muted-foreground font-medium bg-muted/50 w-fit px-4 py-2 rounded-lg border border-border">
              <MapPin className="h-4 w-4 text-accent-blue" />
              <span className="text-sm">Based in Arayat, Pampanga, Philippines</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Education Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <h3 className="text-2xl font-bold text-foreground">Education Journey</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="relative">
              {/* Sleek Gradient Timeline Line */}
              <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-accent-blue via-border to-transparent z-0" />
              
              <div className="space-y-10">
                {educationData.map((item, index) => (
                  <motion.div 
                    key={item.degree} 
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.15 }} 
                    className="relative pl-16 group" 
                  >
                    
                    <motion.div 
                      className={`absolute left-0 top-1 w-12 h-12 rounded-xl flex items-center justify-center z-10 cursor-default ${
                        item.isActive 
                          ? 'border-none shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                          : 'bg-background border-2 border-border group-hover:border-accent-blue/50 transition-all duration-300'
                      } ${!isLowPower && !item.isActive ? 'group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]' : ''}`}
                      initial={item.isActive ? { scale: 1.1 } : {}}
                      // PERFORMANCE MODE: Disable hover physics
                      whileHover={item.isActive && !isLowPower ? { scale: 1.2, rotate: 5 } : {}}
                      transition={item.isActive ? { 
                        scale: { type: "spring", stiffness: 300, damping: 15 },
                        rotate: { type: "spring", stiffness: 300, damping: 15 } 
                      } : {}}
                      // Gradient syncs with the rest of the page via physics engine
                      style={item.isActive ? {
                        backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                        backgroundSize: "300% 300%",
                        backgroundPosition: bgPosString
                      } : {}}
                    >
                      {item.isActive && (
                        // PERFORMANCE MODE: Downshift the harsh ping to a gentle pulse
                        <div className={`absolute inset-0 rounded-xl border border-white/50 opacity-20 pointer-events-none ${isLowPower ? 'animate-pulse' : 'animate-ping'}`} />
                      )}
                      
                      <motion.div
                        whileHover={item.isActive && !isLowPower ? { scale: 1.2, rotate: -10 } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="relative z-20 flex items-center justify-center"
                      >
                        <item.icon className={`h-5 w-5 ${
                          item.isActive 
                            ? 'text-white' 
                            : 'text-muted-foreground group-hover:text-accent-blue transition-colors duration-300'
                        }`} />
                      </motion.div>
                    </motion.div>

                    {/* Timeline Content Card */}
                    <SpotlightCard className={`p-6 transition-all duration-300 ${item.isActive ? 'border-accent-blue/30 bg-accent-blue/5' : 'border-border/50 hover:border-accent-blue/30'}`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-foreground text-lg">{item.degree}</h4>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${item.isActive ? 'bg-accent-blue text-white' : 'bg-muted text-muted-foreground'}`}>
                          <Calendar className="h-3 w-3" /> {item.period}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-accent-blue">{item.school}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <ChevronRight className="h-4 w-4 mt-0.5 text-accent-blue/50 flex-shrink-0" />
                        {item.details}
                      </p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}