"use client";

/**
 * Hero — Homepage hero section.
 *
 * The PortraitCanvas (in layout.tsx) renders full-screen behind everything.
 * This component overlays text on the LEFT half; the right half stays open
 * so the portrait is unobstructed. The left vignette in globals.css ensures
 * text remains readable even with the portrait behind it.
 */

import { Fragment } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { heroStats, profile } from "@/data/profile";

/**
 * Word-by-word reveal (fade + rise + de-blur). Full text is exposed to screen
 * readers through aria-label. The markup is identical on server and client
 * (no reduced-motion branch), which keeps hydration consistent.
 */
function RevealWords({
  text,
  delay = 0,
  stagger = 0.035,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.45, ease: "easeOut" },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.p>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col overflow-hidden pt-16"
    >
      {/* Aurora colour accent — blends over canvas without hiding portrait */}
      <div className="hero-aurora" aria-hidden />

      {/* Two-column grid: text LEFT, transparent RIGHT */}
      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-16">

        {/* ── LEFT: Text ─────────────────────────────────────────────────── */}
        <div className="hero-copy max-w-2xl lg:max-w-xl">
          <RevealWords
            text={profile.greeting}
            stagger={0.06}
            className="text-sm font-medium tracking-wide text-violet-300"
          />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-3 text-balance font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {profile.headline}
          </motion.h1>

          <RevealWords
            text={profile.summary}
            delay={0.35}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button href="#projects" className="w-full sm:w-auto">
              Explore My Work
            </Button>
            <Button
              href={profile.resumePath}
              variant="secondary"
              className="w-full sm:w-auto"
              download
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.65 }}
            className="mt-10 grid max-w-lg grid-cols-3 items-start gap-4 border-t border-white/10 pt-6"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-balance text-[11px] uppercase leading-snug tracking-wider text-white/55">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl tabular-nums text-white sm:text-3xl">
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
        transition={{ delay: 2.1, duration: 0.6 }}
        className="scroll-cue relative mx-auto flex w-fit flex-col items-center gap-2 pt-2 text-xs text-white/50 transition hover:text-white/80"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
