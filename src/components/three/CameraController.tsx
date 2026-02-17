"use client";

import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useShowroomActions } from "./useShowroomStore";

export function ShowroomControls() {
  const { pause, scheduleResume, clearTimer } = useShowroomActions();

  useEffect(() => clearTimer, [clearTimer]);

  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      autoRotate={false}
      onStart={pause}
      onEnd={scheduleResume}
      enablePan={false}
      minDistance={5}
      maxDistance={14}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.2}
    />
  );
}
