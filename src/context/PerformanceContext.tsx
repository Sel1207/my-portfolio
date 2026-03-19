'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Updated 'minimal' to 'eco' to match the Boot Screen
export type AppMode = 'visual' | 'performance' | 'eco';

interface PerformanceContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void; // 2. ADDED THE MISSING SETTER
  cycleMode: () => void;
  isVisual: boolean;
  isPerformance: boolean;
  isMinimal: boolean; 
  isLowPower: boolean; 
}

// Dummy defaults
const PerformanceContext = createContext<PerformanceContextType>({
  mode: 'visual',
  setMode: () => {}, 
  cycleMode: () => {},
  isVisual: true,
  isPerformance: false,
  isMinimal: false,
  isLowPower: false,
});

export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<AppMode>('visual');

  // Load saved preference or auto-detect device on first load
  useEffect(() => {
    const savedMode = localStorage.getItem('espino_performance_mode') as AppMode;
    
    if (savedMode) {
      setModeState(savedMode);
    } else {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setModeState('performance');
      }
    }
  }, []);

  // 3. THE FUNCTION THE BOOT SCREEN NEEDS
  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    localStorage.setItem('espino_performance_mode', newMode); // Saves it permanently
  };

  const cycleMode = () => {
    setModeState((prev) => {
      let nextMode: AppMode = 'visual';
      if (prev === 'visual') nextMode = 'performance';
      if (prev === 'performance') nextMode = 'eco';
      
      localStorage.setItem('espino_performance_mode', nextMode);
      return nextMode;
    });
  };

  // Helper booleans (We keep isMinimal mapped to eco so your old code doesn't break!)
  const isVisual = mode === 'visual';
  const isPerformance = mode === 'performance';
  const isMinimal = mode === 'eco'; 
  const isLowPower = mode !== 'visual'; 

  return (
    <PerformanceContext.Provider 
      value={{ 
        mode, 
        setMode,  // NOW IT IS EXPOSED GLOBALLY
        cycleMode, 
        isVisual, 
        isPerformance, 
        isMinimal, 
        isLowPower 
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => useContext(PerformanceContext);