import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Lightbulb, Cpu, Code } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

const educationData = [
  { degree: 'BS/MS Electrical Engineering', period: '2023 — Present', school: 'Mapúa University', details: 'Joint Degree Program (BMEE) • Specialization: Power System Protection & Operation', icon: GraduationCap },
  { degree: 'Senior High School - STEM Strand', period: 'Aug 2021 — July 2023', school: 'Mapúa University - Senior High School Department', details: 'With Highest Honors: 1st, 2nd, and 4th Quarter AY 2022-2023', icon: BookOpen },
  { degree: 'Junior High School', period: 'June 2017 — June 2021', school: 'Justino Sevilla High School', details: 'With High Honors: AY 2017-2018, 2018-2019, 2020-2021', icon: Award },
  { degree: 'Elementary', period: 'June 2011 — March 2017', school: 'San Nicolas Elementary School', details: 'School Valedictorian • Best in Math, Science, Communication Arts', icon: Calendar },
];

const expertiseAreas = [
  { title: 'Lighting Design', description: 'DIALux evo for professional illumination planning', icon: Lightbulb },
  { title: 'Industrial Automation', description: 'PLC programming & pneumatic systems', icon: Cpu },
  { title: 'Data Analysis', description: 'Python with Pandas for engineering data', icon: Code },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-accent-blue text-sm font-semibold uppercase tracking-wider">Get to Know Me</span>
            <h2 className="text-h2 font-bold mt-2 mb-6 text-foreground">About Me</h2>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-body-lg">
                I am a dedicated Electrical Engineering student in the <span className="text-foreground font-medium">BMEE joint degree program</span> at <span className="text-foreground font-medium">Mapúa University</span>. My academic focus centers on power system protection, operation, and automation, driven by a commitment to designing reliable and efficient electrical infrastructure.
              </p>
              <p className="text-body">
                Beyond foundational circuitry, my expertise spans lighting design using <span className="text-accent-blue font-medium">DIALux evo</span>, industrial automation through <span className="text-accent-blue font-medium">PLC programming</span>, and rigorous data analysis utilizing <span className="text-accent-blue font-medium">Python</span>.
              </p>
            </div>

            {/* Expertise Spotlight Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {expertiseAreas.map((area, index) => (
                <SpotlightCard key={area.title} className="p-4">
                  <area.icon className="h-8 w-8 text-accent-blue mb-3" />
                  <h4 className="font-semibold text-sm mb-1 text-foreground">{area.title}</h4>
                  <p className="text-xs text-muted-foreground">{area.description}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-8 text-muted-foreground">
              <MapPin className="h-5 w-5 text-accent-blue" />
              <span>Arayat, Pampanga, Philippines</span>
            </div>
          </motion.div>

          {/* Right Column - Education Timeline */}
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
  <h3 className="text-h4 font-semibold mb-8 text-foreground">Education Journey</h3>

  <div className="relative">
    {/* 1. Added z-0 to the line to keep it in the back */}
    <div className="absolute left-6 top-0 bottom-0 w-px bg-border z-0" />
    
    <div className="space-y-8">
      {educationData.map((item, index) => (
        <motion.div key={item.degree} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative pl-16">
          
          {/* 2. THE FIX: Added bg-background to block the line and z-10 to stay on top */}
          <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-background border border-accent-blue/20 flex items-center justify-center z-10 shadow-sm">
            {/* Inner blue tint layer so it still looks the same as your design */}
            <div className="absolute inset-0 rounded-xl bg-accent-blue/10" />
            <item.icon className="h-5 w-5 text-accent-blue relative z-20" />
          </div>

          {/* Spotlight Education Card */}
          <SpotlightCard className="p-5">
            <h4 className="font-semibold text-foreground mb-1">{item.degree}</h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <Calendar className="h-3.5 w-3.5" /> {item.period}
            </div>
            <p className="text-sm font-medium text-foreground mb-1">{item.school}</p>
            <p className="text-sm text-muted-foreground">{item.details}</p>
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