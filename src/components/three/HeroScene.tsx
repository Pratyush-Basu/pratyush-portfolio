"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import FloatingPortrait from "@/components/three/FloatingPortrait";
import OrbitalRings from "@/components/three/OrbitalRings";
import FloatingCards from "@/components/three/FloatingCards";
import ParticleBackground from "@/components/three/ParticleBackground";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HeroScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="h-full min-h-[320px] w-full">
      <Canvas
        camera={{ position: [0, 0.15, isMobile ? 5.8 : 5.1], fov: 42 }}
        dpr={[1, isMobile ? 1.25 : 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.05} />
        <Suspense fallback={null}>
          <ParticleBackground count={prefersReducedMotion || isMobile ? 80 : 220} />
          <OrbitalRings />
          <FloatingPortrait reducedMotion={prefersReducedMotion} />
          {!prefersReducedMotion && !isMobile ? <FloatingCards /> : null}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={0.25}
          maxPolarAngle={Math.PI / 1.65}
          minPolarAngle={Math.PI / 3.1}
        />
      </Canvas>
    </div>
  );
}
