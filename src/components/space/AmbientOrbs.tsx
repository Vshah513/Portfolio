'use client';

import { useMemo } from 'react';

type OrbColor = 'gold' | 'blue';

interface Props {
  count?: number;
  color: OrbColor;
}

interface OrbDef {
  size: number;
  x: string;
  y: string;
  blur: number;
  delay: number;
  duration: number;
  gradient: string;
}

const GRADIENTS: Record<OrbColor, string[]> = {
  gold: [
    'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(232,212,139,0.1) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(139,117,48,0.15) 0%, transparent 70%)',
  ],
  blue: [
    'radial-gradient(circle, rgba(10,22,40,0.35) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(13,43,53,0.3) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(30,50,80,0.2) 0%, transparent 70%)',
    'radial-gradient(circle, rgba(20,35,60,0.25) 0%, transparent 70%)',
  ],
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function AmbientOrbs({ count = 3, color }: Props) {
  const orbs = useMemo<OrbDef[]>(() => {
    const defs: OrbDef[] = [];
    const grads = GRADIENTS[color];
    for (let i = 0; i < count; i++) {
      const s = i + 1;
      defs.push({
        size: 80 + seededRandom(s * 7) * 40,
        x: `${10 + seededRandom(s * 13) * 80}%`,
        y: `${10 + seededRandom(s * 19) * 80}%`,
        blur: 40 + seededRandom(s * 31) * 20,
        delay: seededRandom(s * 37) * 4,
        duration: 6 + seededRandom(s * 43) * 4,
        gradient: grads[i % grads.length],
      });
    }
    return defs;
  }, [count, color]);

  return (
    <>
      {orbs.map((orb, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="ambient-orb-float"
          style={{
            position: 'absolute',
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: orb.x,
            top: orb.y,
            background: orb.gradient,
            filter: `blur(${orb.blur}px)`,
            pointerEvents: 'none',
            zIndex: 4,
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.duration}s`,
          }}
        />
      ))}
    </>
  );
}
