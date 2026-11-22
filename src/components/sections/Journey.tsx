"use client";

import {
  Award,
  BadgeCheck,
  GraduationCap,
  Medal,
  Rocket,
  Snowflake,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem, VIEWPORT } from "@/components/ui/Reveal";
import { achievements, certifications, education } from "@/data/education";

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  hackspire: Trophy,
  SparkHack: Rocket,
  FrostHack: Snowflake,
  sih: Medal,
};

type CertKind = "Hackathon" | "Completion" | "Course";

const CERT_STYLES: Record<
  CertKind,
  { icon: LucideIcon; badge: string; bar: string }
> = {
  Hackathon: {
    icon: Trophy,
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    bar: "from-amber-400 to-orange-500",
  },
  Completion: {
    icon: BadgeCheck,
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    bar: "from-emerald-400 to-teal-500",
  },
  Course: {
    icon: Award,
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    bar: "from-violet-400 to-electric-blue",
  },
};

/** Derives a display title and category from the raw certificate text. */
function describeCertificate(cert: string): { title: string; kind: CertKind } {
  const lower = cert.toLowerCase();
  if (lower.startsWith("certificate of completion:")) {
    return { title: cert.slice(cert.indexOf(":") + 1).trim(), kind: "Completion" };
  }
  if (lower.includes("hack")) return { title: cert, kind: "Hackathon" };
  return { title: cert, kind: "Course" };
}

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="My Journey"
          description="Education and selected milestones along the way."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ── Education ───────────────────────────── */}
          <RevealGroup as="ol" stagger={0.12} className="flex flex-col gap-5">
            {education.map((item) => (
              <RevealItem as="li" key={item.id} className="flex-1">
                <SpotlightCard className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_20px_50px_-25px_rgba(139,92,246,0.5)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-violet-300 transition duration-300 group-hover:scale-110 group-hover:border-violet-400/40">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-violet-300">
                      {item.period}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-white">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{item.school}</p>
                    {item.meta ? (
                      <p className="mt-2 text-sm text-electric-blue/90">
                        {item.meta}
                      </p>
                    ) : null}
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* ── Achievements (fills the column height) ── */}
          <SpotlightCard className="achievements-card flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-electric-blue/10 p-6 sm:p-7">
            <span className="achievements-orb achievements-orb-a" aria-hidden />
            <span className="achievements-orb achievements-orb-b" aria-hidden />

            <div className="relative flex items-center justify-between">
              <h3 className="font-display text-xl text-white">Achievements</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                {achievements.length} milestones
              </span>
            </div>

            <RevealGroup
              as="ul"
              stagger={0.15}
              className="relative mt-5 flex flex-1 flex-col justify-evenly gap-4"
            >
              {achievements.map((item, index) => {
                const Icon = ACHIEVEMENT_ICONS[item.id] ?? Award;
                return (
                  <RevealItem as="li" key={item.id}>
                    <div className="group flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/[0.06]">
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-electric-blue/20 text-violet-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm text-white/60">
                          {item.description}
                        </p>
                      </div>
                      <span className="ml-auto font-display text-2xl tabular-nums text-white/15 transition-colors duration-300 group-hover:text-violet-300/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </SpotlightCard>
        </div>

        {/* ── Certifications ──────────────────────────── */}
        <div className="mt-14">
          <h3 className="mb-6 flex items-center gap-3 font-display text-xl text-white">
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-r from-violet-400 to-transparent"
            />
            Certifications
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-normal text-white/55">
              {certifications.length}
            </span>
          </h3>

          {/*
            flex + justify-center keeps an incomplete last row centred.
            Each card reveals on its own (not via a parent stagger), so a card
            can never get stuck hidden because of its siblings.
          */}
          <ul className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => {
              const { title, kind } = describeCertificate(cert);
              const style = CERT_STYLES[kind];
              const Icon = style.icon;
              return (
                <motion.li
                  key={cert}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: (index % 3) * 0.1,
                  }}
                  className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
                >
                  <SpotlightCard className="group flex h-full items-start gap-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b1020]/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_18px_44px_-24px_rgba(139,92,246,0.55)]">
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-40 bg-gradient-to-b ${style.bar} opacity-70 transition duration-500 group-hover:scale-y-100 group-hover:opacity-100`}
                    />
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-violet-300 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${style.badge}`}
                      >
                        {kind}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white">
                        {title}
                      </p>
                    </div>
                    <span className="font-display text-lg tabular-nums text-white/15 transition-colors duration-300 group-hover:text-violet-300/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </SpotlightCard>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}