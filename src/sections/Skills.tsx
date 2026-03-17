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

// --- UPGRADED PROGRESS BAR ---
function ProgressBar({ level, delay }: { level: number; delay: number }) {
  return (
    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-2">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        // Removed the problematic negative margin. This now triggers as soon as it enters the screen!
        viewport={{ once: true }} 
        transition={{ duration: 1.2, delay: delay, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-accent-blue to-blue-400 rounded-full"
      />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent-blue text-sm font-semibold uppercase tracking-wider">
            My Expertise
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-foreground">
            Skills & Tools
          </h2>
          <p className="text-muted-foreground">
            A comprehensive toolkit built through academic excellence and hands-on project experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <SpotlightCard className="p-6 lg:p-8 h-full">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-accent-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <ProgressBar
                        level={skill.level}
                        delay={0.3 + (skillIndex * 0.1)} 
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
          <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Training & Development</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainingItems.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard className="p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-accent-blue" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        item.status === 'Ongoing'
                          ? 'bg-green-500/10 text-green-500'
                          : item.status === 'In Progress'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-accent-blue/10 text-accent-blue'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-foreground">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.issuer}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}