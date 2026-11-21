"use client";

/**
 * Hero — Homepage hero section.
 *
 * The PortraitCanvas (in layout.tsx) renders full-screen behind everything.
 * This component overlays text on the LEFT half; the right half stays open
 * so the portrait is unobstructed. The left vignette in globals.css ensures
 * text remains readable even with the portrait behind it.
 */

import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { heroStats, profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-20"
    >
      {/* Aurora colour accent — blends over canvas without hiding portrait */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(55% 65% at 0% 30%, rgba(124,92,255,0.20) 0%, transparent 60%)",
            "radial-gradient(35% 45% at 5% 80%, rgba(59,130,246,0.12) 0%, transparent 55%)",
          ].join(","),
        }}
        aria-hidden
      />

      {/* Two-column grid: text LEFT, transparent RIGHT */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-16">

        {/* ── LEFT: Text ─────────────────────────────────────────────────── */}
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
            className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
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

        {/* ── RIGHT: Empty — portrait shows through ─────────────────────── */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 transition hover:text-white/80"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
