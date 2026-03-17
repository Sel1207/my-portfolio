import { Linkedin, Github, Mail, ArrowUp, Sparkles, ShieldCheck } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-slate-900 bg-slate-950 overflow-hidden text-slate-300">
      {/* Premium Background Grid & Glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center font-bold text-2xl tracking-tight mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={scrollToTop}
          >
            <span className="bg-white text-slate-950 px-3 py-1.5 rounded-l-lg">
              KP
            </span>
            <span className="border-2 border-l-0 border-white text-white px-3 py-1 rounded-r-lg">
              Espino
            </span>
          </div>

          <p className="text-slate-400 text-center mb-8 tracking-wide">
            Engineered for Excellence
          </p>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {['About', 'Projects', 'Skills', 'Organizations', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(link.toLowerCase());
                  if (element) {
                    const offsetTop = element.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                  }
                }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4 mb-10">
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/in/karl-philip-espino-388894346/', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/Sel1207', label: 'GitHub' },
              { icon: Mail, href: 'mailto:kpcespino@mymail.mapua.edu.ph', label: 'Email' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* AI & Usage Disclaimer Section */}
          <div className="flex flex-col items-center gap-3 mb-8 text-center px-4 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sky-500 font-bold mb-1">
              <Sparkles className="h-3 w-3" />
              AI-Augmented Development
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              "This digital portfolio was developed through the strategic utilization of Artificial Intelligence (AI) to enhance code optimization and user experience design. Intended strictly for personal and professional presentation use."
            </p>
          </div>

          {/* Divider */}
          <div className="w-full max-w-3xl h-px bg-slate-800/60 mb-8" />

          {/* Professional Copyright & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 mb-4">
            <span>© {currentYear} Karl Philip Espino. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="tracking-wide">
              Arayat, Pampanga • Philippines
            </span>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center hover:bg-sky-400 hover:shadow-[0_0_30_rgba(56,189,248,0.6)] transition-all duration-300 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      </div>
    </footer>
  );
}