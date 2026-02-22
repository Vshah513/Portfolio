'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

const STAR_COUNT = 200;
const GOLD_RATIO = 0.15;
const GOLD_COLOR = '#C9A84C';
const MAX_STREAK_LENGTH = 40;
const DRIFT_SPEED = 0.15;

interface Star {
  x: number;
  y: number;
  baseSize: number;
  opacity: number;
  isGold: boolean;
  angle: number;
  dist: number;
  driftSpeed: number;
}

function createStars(w: number, h: number): Star[] {
  const cx = w / 2;
  const cy = h / 2;
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const dx = x - cx;
    const dy = y - cy;
    stars.push({
      x,
      y,
      baseSize: 0.5 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.4,
      isGold: Math.random() < GOLD_RATIO,
      angle: Math.atan2(dy, dx),
      dist: Math.sqrt(dx * dx + dy * dy),
      driftSpeed: DRIFT_SPEED + Math.random() * 0.15,
    });
  }
  return stars;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const { velocityRef, scrollYRef } = useScrollVelocity();
  const reducedMotion = useRef(false);

  const heroHeightRef = useRef(0);

  const measure = useCallback(() => {
    const hero = document.querySelector<HTMLElement>('[data-zone="hero"]');
    heroHeightRef.current = hero
      ? hero.offsetTop + hero.offsetHeight
      : window.innerHeight;
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = createStars(window.innerWidth, window.innerHeight);
      measure();
    };

    resize();
    window.addEventListener('resize', resize);

    let rafId: number;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const scrollY = scrollYRef.current;
      const heroH = heroHeightRef.current || h;
      const fadeStart = heroH * 0.4;
      const fadeEnd = heroH * 0.9;
      let canvasAlpha =
        scrollY <= fadeStart
          ? 0
          : scrollY >= fadeEnd
            ? 1
            : (scrollY - fadeStart) / (fadeEnd - fadeStart);
      canvasAlpha = Math.min(1, Math.max(0, canvasAlpha));

      if (canvasAlpha < 0.01) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      ctx.globalAlpha = canvasAlpha;

      const vel = reducedMotion.current ? 0 : velocityRef.current;
      const streakFactor = Math.min(vel / 30, 1);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reducedMotion.current) {
          s.dist += s.driftSpeed * (1 + streakFactor * 2);
          s.x = cx + Math.cos(s.angle) * s.dist;
          s.y = cy + Math.sin(s.angle) * s.dist;

          if (s.x < -10 || s.x > w + 10 || s.y < -10 || s.y > h + 10) {
            s.dist = Math.random() * 30;
            s.angle = Math.random() * Math.PI * 2;
            s.x = cx + Math.cos(s.angle) * s.dist;
            s.y = cy + Math.sin(s.angle) * s.dist;
          }
        }

        const color = s.isGold ? GOLD_COLOR : '#ffffff';
        const alpha = s.opacity + streakFactor * 0.3;

        if (streakFactor > 0.05) {
          const streakLen = streakFactor * MAX_STREAK_LENGTH;
          const endX = s.x - Math.cos(s.angle) * streakLen;
          const endY = s.y - Math.sin(s.angle) * streakLen;

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = color;
          ctx.globalAlpha = canvasAlpha * Math.min(alpha, 1);
          ctx.lineWidth = s.baseSize * 0.8;
          ctx.lineCap = 'round';
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.baseSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = canvasAlpha * Math.min(alpha, 1);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [velocityRef, scrollYRef, measure]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
