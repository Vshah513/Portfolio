"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "hero-drag-hint-dismissed";

type HeroDragHintContextValue = {
  showHint: boolean;
  dismissHint: () => void;
};

const HeroDragHintContext = createContext<HeroDragHintContextValue | null>(null);

export function HeroDragHintProvider({ children }: { children: ReactNode }) {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setShowHint(false);
    } catch {
      // ignore
    }
  }, []);

  const dismissHint = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
    } catch {
      // ignore
    }
    setShowHint(false);
  }, []);

  return (
    <HeroDragHintContext.Provider value={{ showHint, dismissHint }}>
      {children}
    </HeroDragHintContext.Provider>
  );
}

export function useHeroDragHint(): HeroDragHintContextValue | null {
  return useContext(HeroDragHintContext);
}
