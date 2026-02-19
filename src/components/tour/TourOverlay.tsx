'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTour } from './TourProvider';

export function TourOverlay() {
  const tour = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!tour?.active) return;
    const step = tour.steps[tour.currentStep];
    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
    }
  }, [tour?.active, tour?.currentStep]);

  if (!tour?.active) return null;

  const step = tour.steps[tour.currentStep];
  const padding = 16;

  const spotX = targetRect ? targetRect.left - padding : 0;
  const spotY = targetRect ? targetRect.top - padding : 0;
  const spotW = targetRect ? targetRect.width + padding * 2 : 0;
  const spotH = targetRect ? targetRect.height + padding * 2 : 0;

  return (
    <AnimatePresence>
      {/* Dark overlay with cutout */}
      <motion.div
        key="tour-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      >
        {targetRect && (
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect x={spotX} y={spotY} width={spotW} height={spotH} rx="16" fill="black" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.8)" mask="url(#tour-mask)" />
            <rect
              x={spotX}
              y={spotY}
              width={spotW}
              height={spotH}
              rx="16"
              fill="none"
              stroke="rgba(201,168,76,0.6)"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </motion.div>

      {/* Tooltip — always fixed to center-bottom of viewport */}
      <motion.div
        key={`tooltip-${tour.currentStep}`}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '16px',
          right: '16px',
          width: 'auto',
          maxWidth: '380px',
          margin: '0 auto',
          zIndex: 9999,
          background: 'linear-gradient(135deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,0.99) 100%)',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '16px',
          padding: '20px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(201,168,76,0.2)',
          pointerEvents: 'all',
        }}
      >
        {/* Step progress bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {tour.steps.map((_, i) => (
            <div
              key={i}
              style={{
                height: '2px',
                flex: 1,
                borderRadius: '999px',
                background: i <= tour.currentStep ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>

        <h3 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '8px',
          fontFamily: 'var(--font-playfair), serif',
        }}>
          {step.title}
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.6',
          marginBottom: '20px',
        }}>
          {step.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={tour.skip}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '12px',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0',
            }}
          >
            Skip tour
          </button>
          <button
            onClick={tour.next}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(201,168,76,0.5)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(0,0,0,0.6) 100%)',
              color: '#C9A84C',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(201,168,76,0.1)',
            }}
          >
            {tour.currentStep < tour.steps.length - 1 ? 'Next →' : 'Done ✦'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
