"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ExhibitNodeProps {
  angle: number;
  radius: number;
  title: string;
  tagline: string;
  status: string;
  logoUrl?: string;
  onClick?: () => void;
}

export function ExhibitNode({
  angle,
  radius,
  title,
  tagline,
  status,
  logoUrl,
  onClick,
}: ExhibitNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  const position = useMemo<[number, number, number]>(
    () => [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
    [angle, radius]
  );

  const rotationY = useMemo(() => -angle + Math.PI / 2, [angle]);

  useEffect(() => {
    if (!logoUrl) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      logoUrl,
      (tex) => {
        tex.flipY = true;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        textureRef.current?.dispose();
        textureRef.current = tex;
        setTexture(tex);
      },
      undefined,
      () => setTexture(null)
    );
    return () => {
      textureRef.current?.dispose();
      textureRef.current = null;
    };
  }, [logoUrl]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.08 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
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
          color={hovered ? "#1c1c1c" : "#1a1a1a"}
          emissive="#1a1a1a"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Gold border */}
      <RoundedBox args={[2.5, 1.7, 0.02]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={1}
        />
      </RoundedBox>

      {/* Top half: logo — scale -1 on X so texture reads correctly (not mirrored) */}
      {texture ? (
        <mesh position={[0, 0.35, 0.04]}>
          <planeGeometry args={[2.0, 0.7]} />
          <meshBasicMaterial
            map={texture}
            transparent
            depthWrite={true}
            toneMapped={false}
          />
        </mesh>
      ) : (
        <Text
          position={[0, 0.35, 0.04]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          fontWeight="bold"
        >
          {title}
        </Text>
      )}

      {/* Bottom half: description (tagline) */}
      <Text
        position={[0, -0.12, 0.04]}
        fontSize={0.11}
        color="rgba(255,255,255,0.9)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.1}
        textAlign="center"
      >
        {tagline}
      </Text>

      {/* Status badge */}
      <Text
        position={[0, -0.48, 0.04]}
        fontSize={0.088}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {status === "shipped" ? "SHIPPED" : "IN PROGRESS"}
      </Text>
    </group>
  );
}
