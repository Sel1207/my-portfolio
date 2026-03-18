import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Import the global performance engine
import { PerformanceProvider } from './context/PerformanceContext' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrapping App here makes the performance state available everywhere */}
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  </StrictMode>,
)