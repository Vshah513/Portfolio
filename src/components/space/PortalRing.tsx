'use client';

import { useEffect, useRef, useState } from 'react';

export function PortalRing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        height: '120px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      {/* Ambient glow behind the ring */}
      <div
        style={{
          position: 'absolute',
          width: '60vw',
          height: '80px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)',
          filter: 'blur(20px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 600ms ease-out',
        }}
      />

      {/* The ring itself */}
      <div
        style={{
          width: '100vw',
          height: '60px',
          perspective: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '90vw',
            maxWidth: '1200px',
            height: '60px',
            borderRadius: '50%',
            transform: visible
              ? 'rotateX(75deg) scale(1)'
              : 'rotateX(75deg) scale(0.6)',
            opacity: visible ? 1 : 0,
            transition:
              'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out',
            background: 'transparent',
            border: '1.5px solid rgba(201,168,76,0.25)',
            boxShadow: `
              0 0 15px rgba(201,168,76,0.15),
              0 0 30px rgba(201,168,76,0.06),
              inset 0 0 15px rgba(201,168,76,0.1)
            `,
          }}
        />
      </div>
    </div>
  );
}
