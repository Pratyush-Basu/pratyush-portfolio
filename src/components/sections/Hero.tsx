"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { assets, heroStats, profile } from "@/data/profile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl">
        <Image
          src={assets.heroPortrait}
          alt={profile.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </div>
  ),
});

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const useLightweightVisual = isMobile || prefersReducedMotion;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-aurora" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-violet-300"
          >
            {profile.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-3 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {profile.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#projects">Explore My Work</Button>
            <Button href={profile.resumePath} variant="secondary" download>
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] uppercase tracking-wider text-white/45">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl text-white sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative h-[380px] w-full sm:h-[460px] lg:h-[540px]"
        >
          {useLightweightVisual ? (
            <div className="relative mx-auto h-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
              <Image
                src={assets.heroPortrait}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a14]/50 to-transparent" />
            </div>
          ) : (
            <HeroScene />
          )}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/45 hover:text-white/80"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
