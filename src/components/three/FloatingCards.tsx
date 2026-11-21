"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { Group } from "three";
import { floatingTechLabels } from "@/data/skills";

export default function FloatingCards() {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={ref}>
      {floatingTechLabels.map((label, index) => {
        const angle = (index / floatingTechLabels.length) * Math.PI * 2;
        const radius = 2.45;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.4;

        return (
          <group key={label} position={[x, y, z]}>
            <mesh>
              <planeGeometry args={[1.35, 0.42]} />
              <meshStandardMaterial
                color="#14182b"
                transparent
                opacity={0.85}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[1.4, 0.47]} />
              <meshBasicMaterial color="#7c5cff" transparent opacity={0.25} />
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.12}
              color="#e9e7ff"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.2}
            >
              {label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
