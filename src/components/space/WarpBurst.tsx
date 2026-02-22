'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

const VELOCITY_THRESHOLD = 8;
const SECTION_IDS = ['work', 'process', 'capabilities', 'cta'];

export function WarpBurst() {
  const { velocityRef, scrollYRef } = useScrollVelocity();
  const [firing, setFiring] = useState(false);
  const boundariesRef = useRef<number[]>([]);
  const lastCrossedRef = useRef(-1);
  const cooldownRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const computeBoundaries = useCallback(() => {
    const boundaries: number[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        boundaries.push(el.getBoundingClientRect().top + window.scrollY);
      }
    }
    boundariesRef.current = boundaries;
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    computeBoundaries();
    window.addEventListener('resize', computeBoundaries);
    return () => window.removeEventListener('resize', computeBoundaries);
  }, [computeBoundaries]);

  useEffect(() => {
    let rafId: number;

    const check = () => {
      if (!reducedMotionRef.current && !cooldownRef.current) {
        const vel = velocityRef.current;
        const sy = scrollYRef.current;

        if (vel > VELOCITY_THRESHOLD) {
          const boundaries = boundariesRef.current;
          for (let i = 0; i < boundaries.length; i++) {
            const bY = boundaries[i];
            const dist = Math.abs(sy - bY);
            if (dist < 100 && lastCrossedRef.current !== i) {
              lastCrossedRef.current = i;
              cooldownRef.current = true;
              setFiring(true);

              setTimeout(() => {
                setFiring(false);
                cooldownRef.current = false;
              }, 500);
              break;
            }
          }
        }

        if (vel < 1) {
          lastCrossedRef.current = -1;
        }
      }

      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [velocityRef, scrollYRef]);

  return (
    <div
      aria-hidden="true"
      className={firing ? 'warp-burst-active' : ''}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        pointerEvents: 'none',
        opacity: 0,
        background:
          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(201,168,76,0.08) 30%, transparent 70%)',
      }}
    />
  );
}
