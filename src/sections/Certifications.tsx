import { motion } from 'framer-motion';
import { Award, Calendar, Trophy, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/SpotlightCard';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  status: 'completed' | 'in-progress' | 'ongoing';
  description: string;
  credential?: string;
}

const certifications: Certification[] = [
  { title: 'DOST Scholar Program', issuer: 'Department of Science & Technology', date: '2023 - Present', status: 'ongoing', description: 'Prestigious scholarship program for outstanding students in science and technology fields.', credential: 'Ongoing Program' },
  { title: 'Advanced Illumination Practice', issuer: 'Mapúa University', date: '2024', status: 'completed', description: 'Comprehensive coursework and practical application in lighting design and illumination engineering.' },
  { title: 'Power Systems Analysis', issuer: 'Mapúa University', date: '2024', status: 'completed', description: 'Advanced study of power system modeling, analysis, and protection schemes.' },
  { title: 'Control Systems Design', issuer: 'Mapúa University', date: '2024 - 2025', status: 'in-progress', description: 'Coursework covering classical and modern control theory with practical applications.' },
  { title: 'PLC Programming Fundamentals', issuer: 'Mapúa University', date: '2024', status: 'completed', description: 'Industrial automation programming using Omron PLC platforms and ladder logic.' },
  { title: '3D Modeling & CAD Design', issuer: 'Mapúa University', date: '2023 - 2024', status: 'completed', description: 'Professional training in AutoCAD, Fusion 360, and SketchUp for engineering design.' },
];

const achievements = [
  { label: "President's Lister", count: '6x', description: 'Academic Excellence Award' },
  { label: 'With High Honors', count: 'SHS', description: 'Senior High School' },
  { label: 'With High Honors', count: 'JHS', description: 'Junior High School' },
  { label: 'Valedictorian', count: 'Elem', description: 'Elementary Graduate' },
];

export function Certifications() {
  const getStatusBadge = (status: Certification['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 shadow-none px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 shadow-none px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold">In Progress</Badge>;
      case 'ongoing':
        return <Badge className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-none px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold">Ongoing</Badge>;
    }
  };

  return (
    <section id="certifications" className="py-24 lg:py-32 relative bg-background overflow-hidden transition-colors duration-300">
      
      {/* --- CONTINUOUS CIRCUIT BOARD BACKGROUND EFFECTS --- */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none transition-opacity" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated "Current" Traces connecting from Skills section */}
      <motion.div 
        className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-sky-500/20 dark:via-sky-400/40 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.1)] dark:shadow-[0_0_10px_#38bdf8]"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 dark:via-blue-500/40 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.1)] dark:shadow-[0_0_10px_#3b82f6]"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Restored to exact H2 and P sizes of Skills/Projects) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* Shimmer Badge (Restored to text-xs) */}
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-4 cursor-default">
            <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse relative z-10" />
              <span className="text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest relative z-10">Verification</span>
              <motion.div 
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-sky-300/40 dark:via-white/20 to-transparent -skew-x-12 z-0"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Certifications &{' '}
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
              Achievements
            </motion.span>
          </h2>
          <p className="text-lg text-muted-foreground">Academic accomplishments, certifications, and honors earned throughout my educational journey.</p>
        </motion.div>

        {/* --- ACHIEVEMENTS METRICS (Restored to text-4xl/5xl and standard text-sm/base) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={`${achievement.label}-${index}`} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="p-6 text-center h-full border border-border/50 hover:border-sky-500/40 transition-all group flex flex-col justify-center relative overflow-hidden bg-card/40 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 relative z-10">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 group-hover:opacity-80 transition-opacity">
                    {achievement.count}
                  </span>
                </div>
                <div className="font-bold text-base mb-1 text-foreground leading-tight relative z-10">{achievement.label}</div>
                <div className="text-sm text-muted-foreground font-medium relative z-10">{achievement.description}</div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* --- CERTIFICATIONS GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div 
              key={cert.title} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="p-6 md:p-8 h-full flex flex-col border border-border/50 hover:border-sky-500/30 transition-colors group bg-card">
                
                <div className="flex items-start justify-between mb-6">
                  {/* Restored icon container to w-12 h-12 */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center border border-border group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-colors shrink-0 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cert.title.includes('Scholar') ? (
                      <Trophy className="h-6 w-6 text-sky-500 dark:text-sky-400 relative z-10" />
                    ) : (
                      <Award className="h-6 w-6 text-sky-500 dark:text-sky-400 relative z-10" />
                    )}
                  </div>
                  {getStatusBadge(cert.status)}
                </div>

                {/* Restored Title to text-xl and Description to text-sm */}
                <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow leading-relaxed">
                  {cert.description}
                </p>

                {/* Restored Footer Text to text-sm */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                  <span className="text-sm font-bold text-sky-600 dark:text-sky-400 max-w-[50%] text-right truncate">
                    {cert.issuer}
                  </span>
                </div>

                {/* Restored Credential Tag to text-xs */}
                {cert.credential && (
                  <div className="mt-4 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/10 rounded-md px-3 py-2 text-center border border-sky-100 dark:border-sky-500/20 group-hover:border-sky-300 dark:group-hover:border-sky-500/40 group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20 transition-all flex items-center justify-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {cert.credential}
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}