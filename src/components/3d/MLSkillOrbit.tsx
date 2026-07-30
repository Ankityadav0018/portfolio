"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingNode({ radius, speed, angle, color }: { radius: number, speed: number, angle: number, color: string }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * (radius * 0.1);
  });

  return (
    <group ref={ref}>
      <Sphere args={[0.1, 16, 16]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} roughness={0.2} metalness={0.8} />
      </Sphere>
      {/* Small glow halo */}
      <Sphere args={[0.2, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Sphere>
    </group>
  );
}

export default function MLSkillOrbit() {
  const nodes = useMemo(() => {
    const colors = ["#6366F1", "#8B5CF6", "#06B6D4", "#22D3EE"];
    return Array.from({ length: 18 }).map(() => ({
      radius: 1.5 + Math.random() * 2.5,
      speed: 0.1 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {/* Central Core */}
      <Sphere args={[0.5, 64, 64]}>
        <MeshDistortMaterial
          color="#06B6D4"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          emissive="#6366F1"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Orbit Rings (visual guides) */}
      {[1.5, 2.5, 3.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.01, 64]} />
          <meshBasicMaterial color="#6366F1" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Orbiting skill nodes */}
      {nodes.map((node, i) => (
        <OrbitingNode key={i} {...node} />
      ))}
    </Float>
  );
}
