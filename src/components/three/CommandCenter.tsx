"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";
import { ExhibitNode } from "./ExhibitNode";
import { PlaceholderNode } from "./PlaceholderNode";
import { ParticleField } from "./ParticleField";
import { useShowroomStore } from "./useShowroomStore";
import { useHeroDragHint } from "@/contexts/HeroDragHintContext";
import * as THREE from "three";

const PLACEHOLDER_SLOTS = [
  { label: "Coming Soon", sublabel: "New project in progress" },
  { label: "Coming Soon", sublabel: "Stay tuned" },
  { label: "Coming Soon", sublabel: "In the pipeline" },
  { label: "Coming Soon", sublabel: "Something exciting" },
];

export function CommandCenter() {
  const router = useRouter();
  const carouselRef = useRef<THREE.Group>(null);
  const hint = useHeroDragHint();

  const totalSlots = projects.length + PLACEHOLDER_SLOTS.length;
  const orbitRadius = 6.5;
  const angleStep = (Math.PI * 2) / totalSlots;

  const spinning = useShowroomStore((s) => s.spinning);

  useFrame(() => {
    if (!carouselRef.current) return;
    if (spinning) {
      carouselRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Central orb */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      {/* Inner glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.004, 16, 100]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.5}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Rotating carousel group — contains all tiles */}
      <group ref={carouselRef}>
        {/* Real project tiles */}
        {projects.map((project, i) => (
          <ExhibitNode
            key={project.id}
            angle={angleStep * i}
            radius={orbitRadius}
            title={project.title}
            tagline={project.tagline}
            status={project.status}
            logoUrl={project.heroImage}
            onClick={() => {
              hint?.dismissHint();
              router.push(`/work#${project.slug}`);
            }}
          />
        ))}

        {/* Placeholder tiles for future projects */}
        {PLACEHOLDER_SLOTS.map((slot, i) => (
          <PlaceholderNode
            key={`placeholder-${i}`}
            angle={angleStep * (projects.length + i)}
            radius={orbitRadius}
            label={slot.label}
            sublabel={slot.sublabel}
          />
        ))}
      </group>

      {/* Particles */}
      <ParticleField count={150} spread={20} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} color="#C9A84C" intensity={2.8} distance={12} />
      <pointLight position={[5, 5, 5]} color="#ffffff" intensity={0.42} />
      <pointLight position={[-5, -3, -5]} color="#C9A84C" intensity={0.7} />

      {/* Fog */}
      <fog attach="fog" args={["#0A0A0A", 8, 25]} />
    </group>
  );
}
