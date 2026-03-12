import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`text-accent-blue text-sm font-semibold uppercase tracking-wider transition-all duration-600 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Get in Touch
          </span>
          <h2
            className={`text-h2 font-bold mt-2 mb-4 transition-all duration-600 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Let's Connect
          </h2>
          <p
            className={`text-body text-muted-foreground transition-all duration-600 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            I am actively seeking an On-The-Job Training (OJT) opportunity where I can apply my analytical skills, software proficiency, and passion for electrical infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div
            className={`transition-all duration-600 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-h4 font-semibold mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 group"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/20 transition-colors">
                    <item.icon className="h-5 w-5 text-accent-blue" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-medium text-foreground hover:text-accent-blue transition-colors flex items-center gap-1"
                      >
                        {item.value.split('\n').map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                        {item.href.startsWith('http') && (
                          <ExternalLink className="h-4 w-4" />
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
            <div className="mt-10">
              <div className="text-sm text-muted-foreground mb-4">Follow me on</div>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/karl-philip-espino-388894346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:border-accent-blue hover:text-accent-blue transition-all duration-200 hover:-translate-y-1"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/Sel1207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:border-accent-blue hover:text-accent-blue transition-all duration-200 hover:-translate-y-1"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:kpcespino@mymail.mapua.edu.ph"
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:border-accent-blue hover:text-accent-blue transition-all duration-200 hover:-translate-y-1"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-600 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
              <h3 className="text-h4 font-semibold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message..."
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-blue hover:bg-accent-blue-hover text-white rounded-xl py-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
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
