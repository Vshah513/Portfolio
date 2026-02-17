"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface PlaceholderNodeProps {
  angle: number;
  radius: number;
  label: string;
  sublabel: string;
}

export function PlaceholderNode({ angle, radius, label, sublabel }: PlaceholderNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const position = useMemo<[number, number, number]>(
    () => [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
    [angle, radius]
  );

  const rotationY = useMemo(() => -angle + Math.PI / 2, [angle]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(Date.now() * 0.0008 + angle) * 0.12;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {/* Dashed screen frame */}
      <RoundedBox args={[2.4, 1.6, 0.03]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#0d0d0d"
          transparent
          opacity={0.5}
          roughness={0.4}
          metalness={0.6}
        />
      </RoundedBox>

      {/* Dim border */}
      <RoundedBox args={[2.5, 1.7, 0.01]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.1}
          transparent
          opacity={0.08}
          roughness={0.5}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Plus icon */}
      <Text
        position={[0, 0.15, 0.03]}
        fontSize={0.35}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
      >
        +
      </Text>

      {/* Label */}
      <Text
        position={[0, -0.2, 0.03]}
        fontSize={0.12}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {label}
      </Text>

      {/* Sublabel */}
      <Text
        position={[0, -0.45, 0.03]}
        fontSize={0.07}
        color="#444444"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {sublabel}
      </Text>
    </group>
  );
}
