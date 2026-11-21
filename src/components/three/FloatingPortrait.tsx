"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import type { Group, Mesh } from "three";
import { assets } from "@/data/profile";

type FloatingPortraitProps = {
  reducedMotion?: boolean;
};

export default function FloatingPortrait({
  reducedMotion = false,
}: FloatingPortraitProps) {
  const groupRef = useRef<Group>(null);
  const platformRef = useRef<Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, assets.heroPortrait);

  const material = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.55,
      metalness: 0.08,
    });
  }, [texture]);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    const t = clock.elapsedTime;
    const floatY = reducedMotion ? 0 : Math.sin(t * 0.9) * 0.08;
    group.position.y = floatY;
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      pointer.x * 0.25,
      0.05,
    );
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      -pointer.y * 0.12,
      0.05,
    );

    if (platformRef.current && !reducedMotion) {
      platformRef.current.rotation.z = t * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.25, 0]} material={material}>
        <planeGeometry args={[2.35, 1.32]} />
      </mesh>

      <mesh position={[0, 0.25, -0.04]}>
        <planeGeometry args={[2.45, 1.4]} />
        <meshBasicMaterial color="#6d5cff" transparent opacity={0.18} />
      </mesh>

      <mesh
        ref={platformRef}
        position={[0, -0.75, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.55, 1.15, 64]} />
        <meshBasicMaterial color="#4f8cff" transparent opacity={0.35} />
      </mesh>

      <mesh position={[0, -0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 48]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.2} />
      </mesh>

      <pointLight position={[1.2, 1.2, 1.5]} intensity={1.2} color="#8b7cff" />
      <pointLight position={[-1.4, 0.4, 1]} intensity={0.7} color="#4f8cff" />
    </group>
  );
}
