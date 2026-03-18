import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppMode = 'visual' | 'performance' | 'minimal';

interface PerformanceContextType {
  mode: AppMode;
  cycleMode: () => void;
  isVisual: boolean;
  isPerformance: boolean;
  isMinimal: boolean;
  isLowPower: boolean; // Kept for backward compatibility with our previous optimizations
}

const PerformanceContext = createContext<PerformanceContextType>({
  mode: 'visual',
  cycleMode: () => {},
  isVisual: true,
  isPerformance: false,
  isMinimal: false,
  isLowPower: false,
});

export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<AppMode>('visual');

  // Auto-detect mobile on initial load to set a safer default
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // If it's a mobile device, skip the heavy Visual mode and default to Performance
    if (isMobile) {
      setMode('performance');
    }
  }, []);

  const cycleMode = () => {
    setMode((prev) => {
      if (prev === 'visual') return 'performance';
      if (prev === 'performance') return 'minimal';
      return 'visual';
    });
  };

  // Helper booleans so your components stay clean and readable
  const isVisual = mode === 'visual';
  const isPerformance = mode === 'performance';
  const isMinimal = mode === 'minimal';
  
  // This ensures all our previous optimizations still work without rewriting them!
  const isLowPower = mode !== 'visual'; 

  return (
    <PerformanceContext.Provider 
      value={{ 
        mode, 
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