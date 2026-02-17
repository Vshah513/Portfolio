import { useRef, useSyncExternalStore, useCallback } from "react";

let spinning = true;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return spinning;
}

function setSpinning(value: boolean) {
  spinning = value;
  listeners.forEach((l) => l());
}

export function useShowroomStore<T>(selector: (state: { spinning: boolean }) => T): T {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const selectorRef = useRef(selector);
  selectorRef.current = selector;
  return selectorRef.current({ spinning: state });
}

export function useShowroomActions() {
  const resumeTimerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    setSpinning(false);
  }, [clearTimer]);

  const scheduleResume = useCallback(() => {
    clearTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      setSpinning(true);
    }, 5000);
  }, [clearTimer]);

  return { pause, scheduleResume, clearTimer };
}
