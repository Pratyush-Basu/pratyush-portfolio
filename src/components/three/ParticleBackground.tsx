"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Points } from "three";

type ParticleBackgroundProps = {
  count?: number;
};

export default function ParticleBackground({
  count = 220,
}: ParticleBackgroundProps) {
  const ref = useRef<Points>(null);

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      data[i3] = (Math.random() - 0.5) * 10;
      data[i3 + 1] = (Math.random() - 0.5) * 7;
      data[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    return data;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#8b7cff"
        transparent
        opacity={0.65}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
