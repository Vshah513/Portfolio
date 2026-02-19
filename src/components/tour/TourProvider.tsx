'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const TOUR_KEY = 'portfolio-tour-complete';

type TourStep = {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
};

const steps: TourStep[] = [
  {
    id: 'hero-cards',
    title: 'Interactive 3D Scene',
    description: 'These cards orbit in real time — grab and drag them to explore. Each card represents a project I have shipped.',
    targetSelector: '[data-tour="hero-scene"]',
    placement: 'bottom',
  },
  {
    id: 'work-cards',
    title: 'Explore My Work',
    description: 'Navigate to Work in the menu to browse all projects. Use View Exhibit for a full case study, Try Demo to interact with a live prototype, and Live Site to see the deployed product.',
    targetSelector: '[data-tour="work-cards"]',
    placement: 'top',
  },
];

type TourContextValue = {
  active: boolean;
  currentStep: number;
  steps: TourStep[];
  next: () => void;
  skip: () => void;
};

const TourContext = createContext<TourContextValue | null>(null);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    try {
      const done = localStorage.getItem(TOUR_KEY);
      if (!done) {
        const timer = setTimeout(() => setActive(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const complete = useCallback(() => {
    try { localStorage.setItem(TOUR_KEY, 'true'); } catch {}
    setActive(false);
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      complete();
    }
  }, [currentStep, complete]);

  const skip = useCallback(() => {
    complete();
  }, [complete]);

  return (
    <TourContext.Provider value={{ active, currentStep, steps, next, skip }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  return useContext(TourContext);
}
