'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react'; // Removed Loader2
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- YOUR COMPREHENSIVE DATABASE ---
const KARL_DATABASE = {
  role: "Professional AI Representative for Karl Philip C. Espino",
  general: {
    name: "Karl Philip C. Espino",
    age: 21,
    location: "Arayat, Pampanga, Philippines",
    contact: {
      personal_email: "kpcespino@gmail.com",
      university_email: "kpcespino@mymail.mapua.edu.ph",
      phone: "(+63) 936 666 6361"
    },
    birthday: "January 12, 2005",
    languages: ["English", "Filipino", "Kapampangan"],
    links: { 
      linkedin: "linkedin.com/in/karl-philip-espino",
      portfolio: "https://karl-philip-espino.vercel.app/"
    }
  },
  academics: {
    university: "Mapúa University (3rd Year, Aug 2023 - Present)",
    degree: "Joint BS/MS Electrical Engineering Program (BMEE)",
    honors: "6-time President's Lister (AY 23-24: 1st, 2nd, 4th Term | AY 24-25: 1st, 2nd, 3rd Term)",
    specialization: "Power System Protection (PSP)",
    previous_education: "Mapúa SHS (STEM, Highest Honors), Justino Sevilla JHS (High Honors), San Nicolas ES (Valedictorian)"
  },
  ongoingthesis: {
    title: "Adaptive Power Swing Blocking for Distance Protection in Islanded Microgrids with Virtual Inertia BESS Using IEC 61850-Based Hybrid Architecture",
    keywords: ["IEC 61850", "BESS", "Virtual Inertia", "Grid Stability","ongoing thesis","learning"]
  },
  projects: [
    { title: "Data Analytics (March 2026)", desc: "Interactive Looker Studio dashboard for gaming patterns and well-being." },
    { title: "Commercial Lighting (Feb 2026)", desc: "Standard-compliant mall lighting layout using DIALux evo." },
    { title: "Residential Lighting (Jan 2026)", desc: "Simulated comprehensive lighting environments in DIALux evo." },
    { title: "Transformer Winding (July 2025)", desc: "Designed, manually wound, and tested a functional electrical transformer." },
    { title: "PLC Automation (July 2025)", desc: "Programmed a two-way-intersection traffic light sequence." },
    { title: "Motor Engineering (March 2025)", desc: "Complete rewinding and verification of a 12V DC motor." },
    { title: "Logic Circuitry (March 2025)", desc: "Garbage fill monitoring system with 7-segment visual tracking & audio alerts." },
    { title: "Electronic Optimization (Oct-Nov 2024)", desc: "Calibrated BJT parameters and designed amplifier circuits for maximum voltage gains." },
    { title: "Mechanical Modeling (Aug 2024)", desc: "Simulated dynamic mechanical responses in spring-mass systems." },
    { title: "CAD Drafting (May 2024)", desc: "Drafted 2D architectural and structural floor plans using AutoCAD." }
  ],
  extracurriculars: [
    { role: "Officer, Assistant Finance Committee Head", org: "IEEE of the Philippines, Inc. - MU (Feb 2026 - Present)", desc: "Secured corporate sponsorships and managed finances for major events." },
    { role: "Officer, Auditor", org: "The Mapúa Society of Double Degree and Joint Program (July 2025 - Present)", desc: "Audited financial records and verified receipts to ensure strict fiscal transparency." },
    { role: "Former Officer, Academic Committee Head", org: "IIEE of the Philippines, Inc. - MU (May 2024 - Present)", desc: "Orchestrated the IIEE Excellence Awards and managed logistics." },
    { role: "Member", org: "Mapúa University DOST Scholars' Association (Oct 2023 - Present)", desc: "Engages in DOST-related programs and activities." },
    { role: "Member", org: "Physics Society of Mapua (Oct 2023 - Present)", desc: "Participates in physics-focused events." }
  ],
  skills: {
    software_and_engineering: ["DIALux evo", "AutoCAD", "ETAP", "LTSpice", "MATLAB", "TinaPro Simulation", "Python for Data Science", "Web Development"],
    industrial: ["PLC Programming (Omron)", "Fluid Sim"],
    tools: ["Microsoft Office", "Adobe InDesign", "Canva", "CapCut"],
    soft_skills: ["Critical thinking", "Problem-solving", "Analytical reasoning", "Adaptability"]
  },
  achievements: [
    "1st Rank EECE Excellence Awards - Electrical Engineering Program, Batch 2023 (2024 & 2025)",
    "1st Rank IIEE Excellence Awards - Batch 2023 (AY 2023-2024 & AY 2024-2025)",
    "2nd Place, IIEE-Regional Math Wizard Competition - NCR (2025)",
    "3x 1st Place Metrobank-MTAP-DepEd Math Challenge (2018-2020)",
    "3rd Place Math Quiz Bee Division Level - Pampanga (2017)"
  ],
  personal_details: {
    hobbies: ["Piano, Guitar, and Organ", "Gaming (Dota 2, CS2, ML, Valorant)"],
    fun_fact: "Was part of a Catholic Church Choir as an Organist for several years."
  }
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello. I'm Karl's AI representative. How can I assist with your technical or professional inquiry today?" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, presetQuery?: string) => {
    if (e) e.preventDefault();
    const userText = presetQuery || message;
    if (!userText.trim() || isLoading) return;

    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const modelPriority = ["gemini-3-flash-preview", "gemini-3.1-pro-preview", "gemini-3.1-flash-lite-preview"];

    for (const modelName of modelPriority) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: {
            parts: [{ text: `
IDENTITY: Professional AI for Karl Espino.

DATABASE:
${JSON.stringify(KARL_DATABASE)}

STRICT RESPONSE RULES (HIGHEST PRIORITY):
- Answer MUST be concise, direct, and technical.
- Answer professionally, avoiding any casual language or filler.
- Maximum 2-3 sentences unless explicitly asked for more.
- Do NOT explain unnecessarily.
- Do NOT add filler, introductions, or conclusions.
- Only answer what is asked! No extra context.
- Answer straight to the point, straightforward.

FORMATTING (MANDATORY):
- Plain text only.
- No markdown, no asterisks, no bold, no emojis.
- Use '> ' for headers ONLY if needed.
- Use '-' for lists ONLY if necessary.

BEHAVIORAL CONSTRAINTS:
- If question is simple → respond in 1–2 sentences.
- If question is about Karl → pull ONLY relevant fields from DATABASE.
- Do NOT restate the whole database.
- Do NOT generalize or add external knowledge unless required.

FAILSAFE:
If response exceeds guidelines, rewrite it shorter before sending.

Tone: precise, minimal, clarity, conciseness, and professionalism. Emphasis on professionalism.
` }]
          }
        });

        const history = messages
          .slice(1) 
          .slice(-4) 
          .map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userText);
        const response = await result.response;
        
        setMessages(prev => [...prev, { role: 'model', text: response.text() }]);
        setIsLoading(false);
        return; 

      } catch (error: any) {
        console.error(`[Diagnostics] Model ${modelName} failed:`, error);
        if (modelName === modelPriority[modelPriority.length - 1]) {
          setMessages(prev => [...prev, { role: 'model', text: "Grid maintenance: Quota limit reached. Please try again in 60 seconds." }]);
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-sky-500" />
                <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest">Karl's Technical Rep</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" /></button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-50/20 dark:bg-slate-950">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-sky-500 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* NEW: Bouncing Wave Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-sm flex items-center gap-1.5 w-fit h-10">
                    <motion.div
                      className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {["Thesis", "Skills", "Achievements"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(undefined, chip)}
                  className="whitespace-nowrap px-3 py-1.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-[10px] font-bold border border-sky-100 dark:border-sky-800 hover:bg-sky-500 hover:text-white transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about my projects..."
                className="flex-1 bg-slate-100 dark:bg-slate-950 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button type="submit" disabled={!message.trim() || isLoading} className="p-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SLEEK BUTTON - FORCED NO BORDER & NO FOCUS RING */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-sky-500 text-white shadow-xl flex items-center justify-center hover:bg-sky-600 transition-all z-50 border-none outline-none focus:outline-none focus:ring-0"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}