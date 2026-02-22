'use client';

import { useEffect, useRef } from 'react';

const SMOOTHING = 0.3;
const DECAY = 0.9;

export function useScrollVelocity() {
  const velocityRef = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    scrollYRef.current = prevScrollY;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    let rafId: number;
    const tick = () => {
      const currentY = scrollYRef.current;
      const delta = Math.abs(currentY - prevScrollY);

      if (delta > 0.5) {
        velocityRef.current =
          velocityRef.current * (1 - SMOOTHING) + delta * SMOOTHING;
      } else {
        velocityRef.current *= DECAY;
        if (velocityRef.current < 0.1) velocityRef.current = 0;
      }

      prevScrollY = currentY;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { velocityRef, scrollYRef };
}
