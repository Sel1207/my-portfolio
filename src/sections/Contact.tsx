import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
// 1. Connect to the global Tri-Mode performance engine
import { usePerformance } from '@/context/PerformanceContext'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Mail, 
  GraduationCap, 
  Linkedin, 
  Send, 
  CheckCircle2,
  Loader2,
  Github,
  ExternalLink
} from 'lucide-react';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Arayat, Pampanga, Philippines',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'kpcespino@mymail.mapua.edu.ph',
    href: 'mailto:kpcespino@mymail.mapua.edu.ph',
  },
  {
    icon: GraduationCap,
    label: 'University',
    value: 'Mapúa University\nBS/MS Electrical Engineering',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Karl Philip Espino',
    href: 'https://www.linkedin.com/in/karl-philip-espino-388894346/',
  },
];

export function Contact() {
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>();
  
  // 2. Destructure global Tri-Mode state
  const { isLowPower, isMinimal } = usePerformance();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- SEAMLESS PHYSICS ENGINE FOR ALL GRADIENTS ---
  const gradientPos = useMotionValue(0);
  const gradientDirection = useRef(1);

  // TRI-MODE THROTTLE: Minimal = 0 (Stop), Performance = 0.2 (Slow), Visual = 1 (Fast)
  const speedMultiplier = useSpring(isMinimal ? 0 : isLowPower ? 0.2 : 1, { stiffness: 40, damping: 20 });

  useEffect(() => {
    speedMultiplier.set(isMinimal ? 0 : isLowPower ? 0.2 : 1);
  }, [isMinimal, isLowPower, speedMultiplier]);

  useAnimationFrame((time, delta) => {
    if (delta > 100) delta = 16; // Safety catch for browser tab switching
    const dSec = delta / 1000;
    const m = speedMultiplier.get();

    if (isMinimal) {
      // SETTLE AT BLUE: Smoothly glide the gradient back to 0% without teleporting
      const currentGPos = gradientPos.get();
      gradientPos.set(currentGPos + (0 - currentGPos) * 0.1); // Smooth decay factor
      gradientDirection.current = 1; // Reset direction for when it turns back on
    } else {
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
    }
  });

  const bgPosString = useTransform(gradientPos, v => `${v}% 50%`);
  // --------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // --- API LOGIC (UNTOUCHED AND FULLY FUNCTIONAL) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '06c80bca-5388-4de0-9609-beaffce264f3',
          from_name: 'Portfolio Contact Form',
          subject: formState.subject,
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' }); 
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 relative bg-background overflow-hidden transition-colors duration-300"
    >
      {/* --- MINIMALIST BACKGROUND EFFECTS --- */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isMinimal ? 'opacity-0' : 'opacity-[0.03] dark:opacity-[0.08]'}`} 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.5) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* BACKGROUND GLOWS: Smoothly dim in Performance Mode, Fade out in Minimal Mode */}
      <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000 ${isMinimal ? 'opacity-0' : isLowPower ? 'bg-sky-500/5 blur-[60px] opacity-40' : 'bg-sky-500/5 blur-[120px] opacity-100'}`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-1000 ${isMinimal ? 'opacity-0' : isLowPower ? 'bg-blue-500/5 blur-[50px] opacity-40' : 'bg-blue-500/5 blur-[100px] opacity-100'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- UNIFORM SECTION HEADER --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Shimmer Badge */}
            <motion.div whileHover={isMinimal ? {} : { scale: 1.05 }} className="inline-block mb-4 cursor-default">
              <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                <span className={`w-2 h-2 rounded-full bg-sky-500 relative z-10 ${isMinimal || isLowPower ? '' : 'animate-pulse'}`} />
                <span className="text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest relative z-10">Get In Touch</span>
                
                {/* FAST SHINE: 0.8s duration, cleanly removed in Performance & Minimal Mode */}
                {!isLowPower && !isMinimal && (
                  <motion.div 
                    className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-sky-300/40 dark:via-white/20 to-transparent -skew-x-12 z-0"
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  />
                )}
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              Let's{' '}
              <motion.span 
                className="inline-block"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgb(14, 165, 233), rgb(59, 130, 246), rgb(139, 92, 246), rgb(14, 165, 233))",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundPosition: bgPosString // Settles to 0% smoothly on Minimal Mode
                }}
              >
                Connect
              </motion.span>
            </h2>
            <p className="text-lg text-muted-foreground">
              I am actively seeking an On-The-Job Training (OJT) opportunity where I can apply my analytical skills, software proficiency, and passion for electrical infrastructure.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* --- CONTACT INFO PANEL --- */}
          <div
            className={`transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-start gap-5 group"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 border border-border transition-all duration-300 ${isMinimal ? '' : 'group-hover:bg-sky-500/10 group-hover:border-sky-500/30'}`}>
                    <item.icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1 tracking-wide uppercase">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-medium text-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group/link"
                      >
                        {item.value.split('\n').map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                        {item.href.startsWith('http') && (
                          <ExternalLink className={`h-4 w-4 transition-all ${isMinimal ? '' : 'opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'}`} />
                        )}
                      </a>
                    ) : (
                      <div className="font-medium text-foreground">
                        {item.value.split('\n').map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Follow me on</div>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/karl-philip-espino-388894346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-sm ${isMinimal ? '' : 'hover:bg-sky-500/10 hover:border-sky-500/40 hover:text-sky-600 dark:hover:text-sky-400'} ${isLowPower || isMinimal ? '' : 'hover:-translate-y-1'}`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Sel1207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-sm ${isMinimal ? '' : 'hover:bg-sky-500/10 hover:border-sky-500/40 hover:text-sky-600 dark:hover:text-sky-400'} ${isLowPower || isMinimal ? '' : 'hover:-translate-y-1'}`}
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:kpcespino@mymail.mapua.edu.ph"
                  className={`w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-sm ${isMinimal ? '' : 'hover:bg-sky-500/10 hover:border-sky-500/40 hover:text-sky-600 dark:hover:text-sky-400'} ${isLowPower || isMinimal ? '' : 'hover:-translate-y-1'}`}
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div
            className={`transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-border/50 shadow-lg relative overflow-hidden group">
              {/* Form Hover Glow - Disabled in Performance & Minimal Mode to save GPU repaints */}
              <div className={`absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${isLowPower || isMinimal ? 'hidden' : 'group-hover:opacity-100'}`} />
              
              <h3 className="text-2xl font-bold mb-6 text-foreground relative z-10">Send a Message</h3>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  
                  {/* Web3Forms Anti-Spam Honeypot */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-muted-foreground font-semibold">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="rounded-xl bg-background border-border focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-muted-foreground font-semibold">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="rounded-xl bg-background border-border focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-muted-foreground font-semibold">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="rounded-xl bg-background border-border focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-muted-foreground font-semibold">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message..."
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="rounded-xl bg-background border-border focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                    />
                  </div>

                  {/* Error Message Display */}
                  {errorMessage && (
                    <p className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-sky-500 text-white font-bold tracking-wide rounded-xl py-6 mt-4 transition-all duration-300 hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed group/btn ${isMinimal ? '' : 'hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        {/* PERFORMANCE MODE: Disable hover translate on send icon */}
                        <Send className={`ml-2 h-5 w-5 transition-transform ${isLowPower || isMinimal ? '' : 'group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1'}`} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}