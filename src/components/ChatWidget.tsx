'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- YOUR COMPREHENSIVE DATABASE ---
const KARL_DATABASE = {
  role: "I am Karl Philip C. Espino, an electrical engineering student.",
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

const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const INITIAL_MESSAGE = "Hello! I'm Karl. Thanks for visiting my portfolio. What would you like to know about my engineering background or projects?";
const SUGGESTED_QUESTIONS = [
  "Could you tell me more about your ongoing thesis?",
  "What are your strongest technical skills?",
  "Can I see your resume?"
];

const renderTextWithLinks = (text: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <a 
        key={match.index} 
        href={match[2]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
      >
        {match[1]}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false); 
  
  const [messages, setMessages] = useState([
    { role: 'model', text: INITIAL_MESSAGE, timestamp: getCurrentTime() }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isFirstLoad = useRef(true);
  
  // FIX 1: We use a ref to track the open state without triggering re-renders in the useEffect
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FIX 2: This effect NOW ONLY runs when the `messages` array changes. 
  // It completely ignores when you open/close the chat.
  useEffect(() => {
    if (isFirstLoad.current) {
      const timer = setTimeout(() => {
        if (!isOpenRef.current) setHasUnread(true);
      }, 3000);
      isFirstLoad.current = false;
      return () => clearTimeout(timer);
    } else {
      const lastMessage = messages[messages.length - 1];
      // Only show the badge if the AI just sent a message AND the chat is currently closed
      if (lastMessage && lastMessage.role === 'model' && !isOpenRef.current) {
        setHasUnread(true);
      }
    }
  }, [messages]); 

  // FIX 3: Explicit open and close functions to guarantee the badge clears properly
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnread(false); // Mark as read!
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    // Notice we do NOT touch the `hasUnread` state here. It stays false.
  };

  const handleSend = async (e?: React.FormEvent, presetQuery?: string) => {
    if (e) e.preventDefault();
    const userText = presetQuery || message;
    if (!userText.trim() || isLoading) return;

    setMessage('');
    
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: getCurrentTime() }]);
    setIsLoading(true);

    const modelPriority = ["gemini-3-flash-preview", "gemini-3.1-pro-preview", "gemini-3.1-flash-lite-preview"];

    for (const modelName of modelPriority) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: {
            parts: [{ text: `
IDENTITY: You are Karl Philip C. Espino. You are an electrical engineering student at Mapua University.
You are speaking directly to visitors/recruiters on your personal portfolio website.
Always use first-person pronouns ("I", "me", "my", "mine"). Do NOT act like an assistant. Act like Karl.

DATABASE ABOUT YOU (KARL):
${JSON.stringify(KARL_DATABASE)}

STRICT RESPONSE RULES (HIGHEST PRIORITY):
- Speak in the first person (e.g., "I worked on...", "My thesis is...").
- Answer MUST be concise, direct, and technical.
- Answer professionally, avoiding any casual language or filler.
- Maximum 2-3 sentences unless explicitly asked for more.
- Only answer what is asked! No extra context.

ACTION LINKS (CRITICAL):
- If the user asks for your Resume/CV, you MUST reply using exactly this markdown format: [Download CV](/Karl_Espino_Resume.pdf)
- If the user asks for your Email, you MUST reply using exactly this markdown format: [kpcespino@gmail.com](mailto:kpcespino@gmail.com)
- You are allowed to embed these links naturally in your 2-3 sentence response.

FORMATTING:
- Plain text only (except for the Action Links above).
- No asterisks, no bold, no emojis.

FAILSAFE:
If response exceeds guidelines, rewrite it shorter before sending.
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
        
        setMessages(prev => [...prev, { role: 'model', text: response.text(), timestamp: getCurrentTime() }]);
        setIsLoading(false);
        return; 

      } catch (error: any) {
        console.error(`[Diagnostics] Model ${modelName} failed:`, error);
        if (modelName === modelPriority[modelPriority.length - 1]) {
          setMessages(prev => [...prev, { role: 'model', text: "Grid maintenance: Quota limit reached. Please try again in 60 seconds.", timestamp: getCurrentTime() }]);
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
            {/* MESSENGER STYLE HEADER */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/hero-portrait-chat.jpg" alt="Karl Philip Espino" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">Karl Philip Espino</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active now</span>
                </div>
              </div>
              <button onClick={handleCloseChat} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* CHAT CONTENT */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-5 bg-slate-50 dark:bg-slate-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  
                  {/* Avatar next to Karl's messages */}
                  {msg.role === 'model' && (
                    <img src="/hero-portrait-chat.jpg" alt="Karl" className="w-7 h-7 rounded-full object-cover self-end mb-5 shadow-sm" />
                  )}
                  
                  {/* Bubble & Timestamp Container */}
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <div className={`p-3 text-[14px] shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-sky-500 text-white rounded-2xl rounded-br-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl rounded-bl-sm'
                    }`}>
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {renderTextWithLinks(msg.text)}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1 font-medium tracking-wide">
                      {msg.timestamp}
                    </span>
                  </div>

                </div>
              ))}

              {/* MESSENGER STYLE TYPING INDICATOR */}
              {isLoading && (
                <div className="flex gap-2">
                  <img src="/hero-portrait-chat.jpg" alt="Karl" className="w-7 h-7 rounded-full object-cover self-end mb-5 shadow-sm" />
                  <div className="p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 w-fit h-10">
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* VERTICAL SUGGESTED QUESTIONS */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-3 flex flex-col gap-2 items-end bg-slate-50 dark:bg-slate-950/50">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(undefined, question)}
                    className="text-left px-4 py-2 bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-slate-800/50 rounded-2xl rounded-br-sm text-[13px] hover:bg-sky-50 dark:hover:bg-slate-800 transition-all shadow-sm w-fit max-w-[85%]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT AREA */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Karl..."
                className="flex-1 bg-slate-100 dark:bg-slate-800/50 border-none rounded-full px-4 py-2.5 text-[14px] outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 dark:text-slate-200 placeholder-slate-500"
              />
              <button type="submit" disabled={!message.trim() || isLoading} className="p-2.5 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all disabled:opacity-50 disabled:hover:bg-sky-500">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isOpen ? handleCloseChat : handleOpenChat}
          className="w-14 h-14 rounded-full bg-sky-500 text-white shadow-xl flex items-center justify-center hover:bg-sky-600 transition-all z-50 border-none outline-none focus:outline-none focus:ring-0"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
        
        {/* THE UNREAD NOTIFICATION BADGE */}
        <AnimatePresence>
          {hasUnread && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}
              className="absolute -top-1 -right-1 w-[22px] h-[22px] bg-red-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[11px] font-bold text-white shadow-sm z-50 pointer-events-none"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}