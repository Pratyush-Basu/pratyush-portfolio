"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export default function OrbitalRings() {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.z += delta * 0.04;
  });

  const rings = [
    { radius: 1.55, color: "#7c5cff", opacity: 0.55 },
    { radius: 1.95, color: "#4f8cff", opacity: 0.4 },
    { radius: 2.35, color: "#a78bfa", opacity: 0.28 },
  ];

  return (
    <group ref={ref}>
      {rings.map((ring, index) => (
        <mesh
          key={ring.radius}
          rotation={[Math.PI / 2.35 + index * 0.18, index * 0.35, 0.1]}
        >
          <torusGeometry args={[ring.radius, 0.012, 16, 120]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}
