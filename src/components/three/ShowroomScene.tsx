"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { CommandCenter } from "./CommandCenter";
import { ShowroomControls } from "./CameraController";

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

function useDeviceCapability() {
  const [capable, setCapable] = useState(true);

  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setCapable(false);
        return;
      }

      // Check for mobile / low-end device
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
      if (isMobile && memory && memory < 4) {
        setCapable(false);
      }
    } catch {
      setCapable(false);
    }
  }, []);

  return capable;
}

export function ShowroomScene() {
  const prefersReduced = useReducedMotion();
  const capable = useDeviceCapability();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to let initial content paint first
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (prefersReduced || !capable || !mounted) {
    return <StaticFallback />;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 10], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CommandCenter />
          <ShowroomControls />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Subtle pulse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
          animation: "pulse-gold 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
