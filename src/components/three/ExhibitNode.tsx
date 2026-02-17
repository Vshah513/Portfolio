"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ExhibitNodeProps {
  angle: number;
  radius: number;
  title: string;
  tagline: string;
  status: string;
  onClick?: () => void;
}

export function ExhibitNode({
  angle,
  radius,
  title,
  tagline,
  status,
  onClick,
}: ExhibitNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo<[number, number, number]>(
    () => [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
    [angle, radius]
  );

  const rotationY = useMemo(() => -angle + Math.PI / 2, [angle]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.08 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    // Gentle float
    groupRef.current.position.y =
      Math.sin(Date.now() * 0.001 + angle) * 0.15;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {/* Screen frame */}
      <RoundedBox
        args={[2.4, 1.6, 0.05]}
        radius={0.08}
        smoothness={4}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={hovered ? "#1a1a1a" : "#111111"}
          transparent
          opacity={0.85}
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Glow border */}
      <RoundedBox args={[2.5, 1.7, 0.02]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={hovered ? 0.8 : 0.3}
          transparent
          opacity={hovered ? 0.6 : 0.2}
          roughness={0.3}
          metalness={1}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 0.2, 0.04]}
        fontSize={0.22}
        color="#F5F5F0"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>

      {/* Tagline */}
      <Text
        position={[0, -0.15, 0.04]}
        fontSize={0.1}
        color="#A0A0A0"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {tagline}
      </Text>

      {/* Status badge */}
      <Text
        position={[0, -0.5, 0.04]}
        fontSize={0.08}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
      >
        {status === "shipped" ? "SHIPPED" : "IN PROGRESS"}
      </Text>
    </group>
  );
}
