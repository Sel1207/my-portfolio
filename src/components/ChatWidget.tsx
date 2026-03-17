'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- IMPROVED DATABASE: Structured for Better AI Retrieval ---
const KARL_DATABASE = `
[ROLE]
You are the Professional AI Representative for Karl Philip C. Espino. 

[GENERAL SUMMARY]
- Name: Karl Philip C. Espino
- Age: 21
- Birthdate: January 12, 2005
- Location: Arayat, Pampanga, Philippines
- Email: kpcespino@gmail.com
- LinkedIn: https://www.linkedin.com/in/karl-philip-espino

[ACADEMIC SUMMARY]
- Institution: Mapúa University (3rd Year)
- Degree: Joint BS/MS Electrical Engineering Program (BMEE)
- Honors: 6-time President's Lister
- Specializations: Power System Protection (PSP).

[CURRENT ONGOING THESIS: RESEARCH & DEVELOPMENT]
- Title Focus: Adaptive Power Swing Blocking for Distance Protection in Islanded Microgrids with Virtual Inertia BESS Using IEC 61850-Based Hybrid Architecture.
- Keywords: IEC 61850, BESS (Battery Energy Storage), Virtual Inertia, Grid Stability.

[TECHNICAL SKILLS]
- Design & Simulation: DIALux evo, AutoCAD, ETAP, LTSpice, MATLAB
- Industrial: Omron PLC Programming, Protection Coordination, Fluid Sim
- Data: Python for Data Science.

[PROJECTS]
- Data Analytics (March 2026): Developed an interactive Looker Studio dashboard to correlate gaming patterns with user well-being metrics.
- Commercial Lighting Design (Feb 2026): Engineered a standard-compliant mall lighting layout using DIALux evo.
- Residential Lighting Design (Jan 2026): Simulated comprehensive indoor and outdoor residential lighting environments in DIALux evo.
- Transformer Winding (July 2025): Designed, manually wound, and performed testing on a functional electrical transformer.
- PLC Automation (July 2025): Programmed a PLC to automate a complex two-way-intersection traffic light sequence.
- Motor Engineering (March 2025): Executed the complete rewinding and performance verification of a 12V DC motor.
- Logic Circuitry (March 2025): Designed a logic gate-based garbage fill monitoring system with 7-segment visual tracking and audio alerts.
- Electronic Optimization (Oct – Nov 2024): Calibrated BJT parameters and designed amplifier circuits to achieve maximum signal amplification and specific voltage gains.
- Mechanical Modeling (Aug 2024): Modeled and simulated dynamic mechanical responses within a spring-mass system case study.
- CAD Drafting (May 2024): Drafted detailed 2D architectural and structural floor plans for residential projects using AutoCAD.

[AWARDS & ACHIEVEMENTS]
- IEE Excellence: Batch 2023 1st Rank (AY 2023–2024 and 1st Term AY 2024–2025).
- Competitions: 2nd Place, IIEE-Regional Math Wizard Competition - NCR (2025).
- Mathematics: 3x 1st Place in Metrobank-MTAP-DepEd Math Challenge (2018–2020).
- Early Honors: Elementary School Valedictorian with special citations in Math, Science, Communication Arts. Most Obedient Student.

[LEADERSHIP & ENGAGEMENT]
- IEEE - MU: Assistant Finance Committee Head (2026–Present).
- Double Degree Society: Auditor (2025–Present).
- IIEE - MU: Former Academic Committee Head; orchestrated Excellence Awards.
- Scholarships: Active member of the Mapúa University DOST Scholars' Association.
`;

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello. I'm Karl's AI representative. How can I assist with your inquiry today?" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userText = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview", 
        systemInstruction: `
        IDENTITY: Professional, concise, and technically grounded AI.
        
        KNOWLEDGE: ${KARL_DATABASE}
        
        STRICT BEHAVIOR RULES:
        1. GREETINGS: If the user says "Hi", "Hello", or similar, respond with ONE brief sentence. DO NOT introduce Karl yet unless asked.
        2. BREVITY: Keep answers under 3 sentences unless explaining technical thesis details.
        3. ACCURACY: Only use the provided DATABASE. If info is missing, say: "Karl hasn't added that to my database yet, but you can reach him at kpcespino@mymail.mapua.edu.ph."
        4. TONE: Professional Engineer. Avoid "assistant-speak" like "I'm happy to help!"—stay objective.`
      });

      const history = messages.filter((_, i) => i !== 0).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userText);
      const response = await result.response;
      
      setMessages(prev => [...prev, { role: 'model', text: response.text() }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection interrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
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
                <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Technical Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-950/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-tr-none shadow-md' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm'}`}>
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-slate-400 text-xs ml-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Inquire about technical projects..."
                className="flex-1 bg-slate-100 dark:bg-slate-950 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500 transition-all"
              />
              <button type="submit" disabled={!message.trim() || isLoading} className="p-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 active:scale-95 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-sky-500 text-white shadow-xl flex items-center justify-center hover:bg-sky-600 transition-transform active:scale-90">
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}