"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function AbstractDataSphere() {
  const meshRef = useRef<THREE.Group>(null);
  
  // A complex shape resembling an abstract brain/data node
  const sphereGeo = useMemo(() => new THREE.IcosahedronGeometry(2, 2), []);
  const wireGeo = useMemo(() => new THREE.WireframeGeometry(sphereGeo), [sphereGeo]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    
    // Pulse scale slightly
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef}>
        {/* Core solid slightly smaller */}
        <mesh geometry={sphereGeo}>
          <meshStandardMaterial 
            color="#0B0F1A" 
            emissive="#6366F1" 
            emissiveIntensity={0.2}
            roughness={0.2} 
            metalness={0.8}
            wireframe={false}
          />
        </mesh>
        
        {/* Glowing wireframe outside */}
        <lineSegments geometry={wireGeo} scale={1.02}>
          <lineBasicMaterial color="#22D3EE" transparent opacity={0.4} />
        </lineSegments>

        {/* Inner intense core */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
