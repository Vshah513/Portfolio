'use client';

import React from 'react';

type Zone = 'hero' | 'work' | 'process' | 'capabilities' | 'cta';

interface ZoneConfig {
  bg: string;
  glow: string | null;
  glowSize: string;
}

const ZONE_MAP: Record<Zone, ZoneConfig> = {
  hero: {
    bg: '#050505',
    glow: null,
    glowSize: '60%',
  },
  work: {
    bg: '#03071e',
    glow: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,22,40,0.8) 0%, rgba(30,20,60,0.15) 40%, transparent 70%)',
    glowSize: '100%',
  },
  process: {
    bg: '#020e14',
    glow: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(13,43,53,0.5) 0%, transparent 70%)',
    glowSize: '100%',
  },
  capabilities: {
    bg: '#050505',
    glow: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,18,0,0.6) 0%, transparent 70%)',
    glowSize: '100%',
  },
  cta: {
    bg: '#050505',
    glow: 'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
    glowSize: '100%',
  },
};

const TRANSITIONS: Record<Zone, { prev: string; next: string }> = {
  hero: { prev: '#050505', next: '#03071e' },
  work: { prev: '#050505', next: '#020e14' },
  process: { prev: '#03071e', next: '#050505' },
  capabilities: { prev: '#020e14', next: '#050505' },
  cta: { prev: '#050505', next: '#050505' },
};

interface Props {
  zone: Zone;
  children: React.ReactNode;
  className?: string;
}

export function SectionAtmosphere({ zone, children, className = '' }: Props) {
  const config = ZONE_MAP[zone];
  const trans = TRANSITIONS[zone];

  return (
    <div
      data-zone={zone}
      className={className}
      style={{ position: 'relative', background: config.bg }}
    >
      {/* Radial nebula glow */}
      {config.glow && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: config.glow,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top gradient fade from previous section */}
      {zone !== 'hero' && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            zIndex: 2,
            background: `linear-gradient(to bottom, ${trans.prev}, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Bottom gradient fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          zIndex: 2,
          background: `linear-gradient(to top, ${trans.next}, transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>{children}</div>
    </div>
  );
}
