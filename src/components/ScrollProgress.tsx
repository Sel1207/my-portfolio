import { useScrollProgress } from '@/hooks/useScrollReveal';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60]">
      <div
        className="h-full bg-gradient-to-r from-accent-blue to-accent-blue-hover transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
