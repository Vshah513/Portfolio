"use client";

import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useShowroomActions } from "./useShowroomStore";
import { useHeroDragHint } from "@/contexts/HeroDragHintContext";

export function ShowroomControls() {
  const { pause, scheduleResume, clearTimer } = useShowroomActions();
  const hint = useHeroDragHint();

  useEffect(() => clearTimer, [clearTimer]);

  const handleStart = () => {
    pause();
    hint?.dismissHint();
  };

  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      autoRotate={false}
      onStart={handleStart}
      onEnd={scheduleResume}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.2}
    />
  );
}
