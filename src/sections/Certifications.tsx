import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
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
  { title: 'DOST Scholar Program', issuer: 'Department of Science and Technology', date: '2023 - Present', status: 'ongoing', description: 'Prestigious scholarship program for outstanding students in science and technology fields.', credential: 'Ongoing Program' },
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
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">In Progress</Badge>;
      case 'ongoing':
        return <Badge className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">Ongoing</Badge>;
    }
  };

  return (
    <section id="certifications" className="py-24 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-blue text-sm font-semibold uppercase tracking-wider">Credentials</span>
          <h2 className="text-h2 font-bold mt-2 mb-4 text-foreground">Certifications & Achievements</h2>
          <p className="text-body text-muted-foreground">Academic accomplishments, certifications, and honors earned throughout my educational journey.</p>
        </motion.div>

        {/* Achievements Grid with Spotlight */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {achievements.map((achievement, index) => (
            <motion.div key={achievement.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <SpotlightCard className="p-5 text-center h-full">
                <div className="text-3xl font-bold text-accent-blue mb-1">{achievement.count}</div>
                <div className="font-semibold text-sm mb-1 text-foreground">{achievement.label}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Certifications List with Spotlight */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div key={cert.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <SpotlightCard className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent-blue" />
                  </div>
                  {getStatusBadge(cert.status)}
                </div>

                <h3 className="font-semibold text-foreground mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{cert.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                  <span className="text-sm font-medium text-accent-blue">{cert.issuer}</span>
                </div>

                {cert.credential && (
                  <div className="mt-3 text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
                    Credential: {cert.credential}
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