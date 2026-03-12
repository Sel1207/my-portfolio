import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { 
  ExternalLink, 
  Zap, 
  Lightbulb, 
  Cpu, 
  LineChart, 
  Volume2, 
  CircuitBoard 
} from 'lucide-react';

// --- 3D TILT CARD WRAPPER ---
function TiltCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative group bg-slate-900 rounded-xl overflow-hidden border border-slate-700/50 hover:border-sky-500/50 transition-colors duration-500 cursor-pointer shadow-lg h-full"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      <div style={{ transform: "translateZ(30px)" }} className="relative z-20 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

// --- PROJECT DATA ---
const projects = [
  {
    id: 'lighting',
    title: 'Illumination Eng.',
    subtitle: 'Residential Lighting Design',
    description: 'Designed a comprehensive 3D lighting simulation and architectural model for a residential property.',
    fullDescription: 'Developed a complete residential lighting design for EEA112P-4 (Illumination Engineering Design). This project involved 3D house modeling, precise lux level calculations, and ensuring modern lighting standards were met for residential comfort and energy efficiency.',
    image: '/project-lighting.jpg',
    tags: ['2T2526', 'DIALux evo', '3D Modeling'],
    icon: Lightbulb,
    features: ['Complete 3D house modeling', 'Lux calculation & optimization', 'Energy-efficient fixture selection'],
    technologies: ['DIALux evo', 'AutoCAD', 'Lighting Standards'],
  },
  {
    id: 'transformer',
    title: 'AC Apparatus',
    subtitle: 'Transformer Winding Construction',
    description: 'Practical design and physical construction of transformer windings, analyzing magnetic flux and voltage regulation.',
    fullDescription: 'Executed for the AC Apparatus and Devices Laboratory (EEA107L-4). The project required designing, winding, and testing a physical transformer. It involved calculating turn ratios, wire gauges, and evaluating core losses to achieve targeted voltage transformation.',
    image: '/project-transformer.jpg',
    tags: ['3T2425', 'Power Systems', 'Hardware'],
    icon: Zap,
    features: ['Turn ratio calculations', 'Magnetic core loss evaluation', 'Hands-on coil winding'],
    technologies: ['Copper Winding', 'Multimeters', 'AC Power Supplies'],
  },
  {
    id: 'plc',
    title: 'Industrial Electronics',
    subtitle: 'PLC Traffic Control System',
    description: 'Implemented a PLC-based two-way traffic light control system featuring integrated start and reset fail-safes.',
    fullDescription: 'Developed during the Industrial Electronics Laboratory (ECEA103-1L). This project focused on industrial automation, requiring the programming of a Programmable Logic Controller (PLC) to manage a synchronized two-way traffic light system with built-in fail-safes and manual override states.',
    image: '/project-plc.jpg',
    tags: ['3T2425', 'Automation', 'PLC'],
    icon: Cpu,
    features: ['Ladder logic programming', 'Start/Reset fail-safe states', 'Synchronized timing loops'],
    technologies: ['Omron PLC', 'Ladder Logic', 'Relay Contactors'],
  },
  {
    id: 'garbage-monitor',
    title: 'Logic Circuits',
    subtitle: 'Smart Garbage Monitor',
    description: 'Built a digital logic monitoring system utilizing 7-segment displays and noise alerts for real-time waste level tracking.',
    fullDescription: 'Created for Logic Circuits and Switching Theory Laboratory (CPE107-42L). The system uses combinational and sequential logic gates to monitor fill levels. Outputs are routed to a 7-segment display for visual tracking and an audio alert mechanism when maximum capacity is reached.',
    image: '/project-garbage.jpg',
    tags: ['2T2425', 'Digital Logic', 'Hardware'],
    icon: CircuitBoard,
    features: ['Combinational logic design', '7-segment display integration', 'Audible alert triggering'],
    technologies: ['Logic Gates (TTL/CMOS)', 'Breadboarding', 'Sensors'],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    subtitle: 'BJT Gain Optimization',
    description: 'Conducted a data-driven analysis of Common-Emitter amplifiers using LTSpice, linear regression, and ANOVA.',
    fullDescription: 'An interdisciplinary project for Engineering Data Analysis (MATH142-02). Generated extensive dataset samples via LTSpice simulations of a Common-Emitter BJT amplifier. Applied linear regression and Analysis of Variance (ANOVA) to determine the statistical significance of various resistor values on voltage gain.',
    image: '/project-data.jpg',
    tags: ['1T2425', 'LTSpice', 'Data Science'],
    icon: LineChart,
    features: ['LTSpice batch simulation', 'Linear regression modeling', 'ANOVA statistical testing'],
    technologies: ['LTSpice', 'Python/Pandas', 'Statistical Analysis'],
  },
  {
    id: 'bjt-speaker',
    title: 'Electronics I',
    subtitle: 'BJT Amplifier Speaker',
    description: 'Designed and constructed a functional audio speaker driven by a custom-built BJT amplifier circuit.',
    fullDescription: 'A hardware capstone for Electronics 1 Laboratory (ECEA101L-4) titled "Amplifying Knowledge". Designed a BJT-based audio amplifier from scratch, performing DC biasing and AC small-signal analysis to successfully drive a physical speaker with minimal distortion.',
    image: '/project-speaker.jpg',
    tags: ['1T2425', 'Audio Amp', 'Circuit Design'],
    icon: Volume2,
    features: ['DC biasing & AC analysis', 'Impedance matching', 'Hardware soldering & testing'],
    technologies: ['BJT Transistors', 'Oscilloscopes', 'Function Generators'],
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden text-slate-300">
      
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sky-400 font-semibold mb-2 uppercase tracking-wider text-sm">My Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Selected Projects</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mx-auto shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
        </motion.div>

        {/* --- 3-COLUMN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard onClick={() => setSelectedProject(project)}>
                
                {/* Visual Header */}
                <div className="relative h-40 overflow-hidden bg-slate-800">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <Badge className="absolute top-4 right-4 z-20 bg-sky-500/20 text-sky-400 border-sky-500/30 backdrop-blur-md uppercase text-[9px] font-bold">
                    {project.title}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6 bg-slate-900 flex-grow flex flex-col">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 group-hover:bg-sky-500/20 group-hover:border-sky-500/30 transition-colors mb-4">
                    <project.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors line-clamp-1">
                    {project.subtitle}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[9px] uppercase font-bold tracking-wider rounded border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs group/btn mt-auto">
                    Explore Concept
                    <ExternalLink className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
          {selectedProject && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.subtitle} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <Badge className="mb-2 bg-sky-500 text-white border-none">{selectedProject.title}</Badge>
                  <h2 className="text-3xl font-bold text-white">{selectedProject.subtitle}</h2>
                </div>
              </div>

              <div className="space-y-6">
                <DialogHeader>
                  <DialogDescription className="text-lg text-slate-400 leading-relaxed text-left">
                    {selectedProject.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-widest text-xs text-sky-400">
                    <Zap className="h-4 w-4" /> Key Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" /> 
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-3 uppercase tracking-widest text-xs text-sky-400">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(t => (
                      <Badge key={t} variant="outline" className="border-sky-500/30 text-sky-400 bg-sky-500/5">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}