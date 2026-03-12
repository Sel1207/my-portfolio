import { useState, useEffect, useRef } from 'react';

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCounter({
  start = 0,
  end,
  duration = 1500,
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setTimeout(() => {
      setIsAnimating(true);
      
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }
        
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out expo
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = start + (end - start) * easeOutExpo;
        
        setCount(Number(currentValue.toFixed(decimals)));
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setIsAnimating(false);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const formattedValue = `${prefix}${count}${suffix}`;

  return { count, formattedValue, startAnimation, isAnimating };
}

export function useInViewCounter(options: UseCounterOptions) {
  const { ref, startAnimation } = useInViewTrigger();
  const counter = useCounter(options);

  const handleInView = () => {
    startAnimation();
    counter.startAnimation();
  };

  return { ref, formattedValue: counter.formattedValue, handleInView };
}

function useInViewTrigger() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const startAnimation = () => {
    if (!hasTriggered) {
      setHasTriggered(true);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasTriggered]);

  return { ref, startAnimation };
}
