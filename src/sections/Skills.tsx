import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Layers,
  Zap,
  Sliders,
  Award
} from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

interface Skill {
  name: string;
  level: number;
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
      { name: 'DIALux evo', level: 90 },
      { name: 'Fusion 360', level: 85 },
      { name: 'AutoCAD', level: 88 },
      { name: 'Python / Pandas', level: 80 },
      { name: 'Fluid Sim', level: 75 },
      { name: 'SketchUp', level: 70 },
    ],
  },
  {
    title: 'Core Competencies',
    icon: Zap,
    skills: [
      { name: 'Power System Protection', level: 92 },
      { name: 'Omron PLC Programming', level: 85 },
      { name: 'Materials Science', level: 80 },
      { name: '3D Printing', level: 78 },
      { name: 'Lighting Design', level: 90 },
      { name: 'Industrial Automation', level: 85 },
    ],
  },
];

const trainingItems = [
  { name: 'DOST Scholar Program', issuer: 'Department of Science & Technology', status: 'Ongoing', icon: Award },
  { name: 'Advanced Illumination Practice', issuer: 'Mapúa University', status: 'Completed', icon: Lightbulb },
  { name: 'Power Systems Analysis', issuer: 'Mapúa University', status: 'Completed', icon: Zap },
  { name: 'Control Systems Design', issuer: 'Mapúa University', status: 'In Progress', icon: Sliders },
];

// --- UPGRADED PROGRESS BAR WITH MOTION GRADIENT ---
function ProgressBar({ level, delay }: { level: number; delay: number }) {
  return (
    <div className="h-2.5 w-full bg-secondary/50 dark:bg-slate-800/50 rounded-full overflow-hidden mt-2 shadow-inner">
      {/* Outer div controls the width growing once */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }} 
        transition={{ duration: 1.2, delay: delay, ease: "easeOut" }}
        className="h-full rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(59,130,246,0.3)]"
      >
        {/* Inner div controls the endless gradient color shift */}
        <motion.div
          className="absolute inset-0 rounded-full w-full h-full"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
            backgroundSize: "300% 300%",
          }}
        />
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-background overflow-hidden transition-colors duration-300">
      
      {/* --- CONTINUOUS CIRCUIT BOARD BACKGROUND EFFECTS --- */}
      {/* Subtle Grid Pattern (Adapts to Light/Dark Mode) */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none transition-opacity" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Ambient Background Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated "Current" Traces (Connected perfectly to the Projects section layout) */}
      <motion.div 
        className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-sky-500/30 dark:via-sky-400/80 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.2)] dark:shadow-[0_0_10px_#38bdf8]"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/30 dark:via-blue-500/80 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:shadow-[0_0_10px_#3b82f6]"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.div 
        className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 dark:via-sky-400/50 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.2)] dark:shadow-[0_0_10px_#38bdf8]"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* Shimmer Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="inline-block mb-4 cursor-default"
          >
            <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-accent-blue/10 border border-sky-500/20 dark:border-accent-blue/20">
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-accent-blue animate-pulse relative z-10" />
              <span className="text-sky-600 dark:text-accent-blue text-xs font-bold uppercase tracking-widest relative z-10">My Expertise</span>
              <motion.div 
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-sky-300/40 dark:via-white/20 to-transparent -skew-x-12 z-0"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Skills &{' '}
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
              <SpotlightCard className="p-6 lg:p-8 h-full border border-border/50 hover:border-accent-blue/30 transition-colors group">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                    <category.icon className="h-6 w-6 text-accent-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm text-foreground group-hover/skill:text-accent-blue transition-colors">{skill.name}</span>
                        <span className="text-sm font-medium text-muted-foreground group-hover/skill:text-foreground transition-colors">{skill.level}%</span>
                      </div>
                      <ProgressBar
                        level={skill.level}
                        delay={0.2 + (skillIndex * 0.1)} 
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
                whileHover={{ y: -5 }}
              >
                <SpotlightCard className="p-5 h-full flex flex-col border border-border/50 hover:border-accent-blue/30 transition-all group">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue border border-transparent group-hover:border-accent-blue/20 transition-all duration-300">
                      <item.icon className="h-5 w-5 text-accent-blue group-hover:text-white transition-colors" />
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
                  <h4 className="font-bold text-sm mb-2 text-foreground group-hover:text-accent-blue transition-colors">{item.name}</h4>
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