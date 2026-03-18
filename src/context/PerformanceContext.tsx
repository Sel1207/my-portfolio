import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext({
  isLowPower: false,
  togglePerformance: () => {},
});

export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLowPower, setIsLowPower] = useState(false);

  // Auto-detect mobile on initial load to set default
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) setIsLowPower(true);
  }, []);

  const togglePerformance = () => setIsLowPower((prev) => !prev);

  return (
    <PerformanceContext.Provider value={{ isLowPower, togglePerformance }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => useContext(PerformanceContext);