"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  Brain,
  Cloud,
  Code2,
  Database,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SkillLogo, { brandRgba } from "@/components/ui/SkillLogo";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<
  string,
  { icon: LucideIcon; accent: string; blurb: string }
> = {
  "ai-ml": {
    icon: Brain,
    accent: "text-violet-300",
    blurb: "Models, vision and experimentation.",
  },
  genai: {
    icon: Sparkles,
    accent: "text-fuchsia-300",
    blurb: "LLM applications and agent workflows.",
  },
  backend: {
    icon: Server,
    accent: "text-sky-300",
    blurb: "APIs and services that serve intelligence.",
  },
  databases: {
    icon: Database,
    accent: "text-emerald-300",
    blurb: "Storage for structured, document and vector data.",
  },
  frontend: {
    icon: Code2,
    accent: "text-orange-300",
    blurb: "Interfaces for AI-powered products.",
  },
  cloud: {
    icon: Cloud,
    accent: "text-cyan-300",
    blurb: "Shipping, tracking and deploying models.",
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Expertise() {
  const [activeId, setActiveId] = useState(skillCategories[0]?.id ?? "");
  const active =
    skillCategories.find((category) => category.id === activeId) ??
    skillCategories[0];
  const meta = CATEGORY_META[active.id] ?? CATEGORY_META["ai-ml"];
  const ActiveIcon = meta.icon;

  return (
    <section id="expertise" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expertise"
          title="My Technical Universe"
          description="Interactive skill categories spanning AI/ML, Generative AI, backend systems and deployment tooling."
        />

        <Reveal className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* ── Category tabs ─────────────────────────── */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {skillCategories.map((category) => {
              const item = CATEGORY_META[category.id] ?? CATEGORY_META["ai-ml"];
              const Icon = item.icon;
              const isActive = category.id === active.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(category.id)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200",
                    isActive
                      ? "border-transparent text-white"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/25 hover:bg-white/[0.05] hover:text-white",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="expertise-active-tab"
                      aria-hidden
                      className="absolute inset-0 rounded-xl border border-violet-400/50 bg-gradient-to-r from-violet-500/25 to-electric-blue/15 shadow-[0_0_30px_rgba(139,92,246,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <Icon
                    className={cn(
                      "relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? item.accent : "text-white/40",
                    )}
                  />
                  <span className="relative flex-1 whitespace-nowrap lg:whitespace-normal">
                    {category.title}
                  </span>
                  <span
                    className={cn(
                      "relative rounded-full px-2 py-0.5 text-[11px] tabular-nums",
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white/5 text-white/40",
                    )}
                  >
                    {category.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Skill panel ───────────────────────────── */}
          <SpotlightCard className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl"
            />

            <div className="relative mb-7 flex flex-wrap items-center gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]",
                  meta.accent,
                )}
              >
                <ActiveIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl text-white">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm text-white/55">{meta.blurb}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                {active.skills.length} technologies
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={active.id}
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {active.skills.map((skill) => (
                  <motion.li key={skill} variants={tileVariants}>
                    <SpotlightCard
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1020]/70 px-3.5 py-3 text-sm text-white/80 transition duration-300 hover:-translate-y-1 hover:text-white"
                      style={
                        {
                          "--spot": brandRgba(skill, 0.2),
                          "--spot-border": brandRgba(skill, 0.85),
                        } as CSSProperties
                      }
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/10">
                        <SkillLogo name={skill} size={22} />
                      </span>
                      <span className="leading-snug">{skill}</span>
                    </SpotlightCard>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
