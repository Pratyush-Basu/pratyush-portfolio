"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { assets, profile } from "@/data/profile";
import {
  Bot,
  Brain,
  Download,
  Eye,
  Search,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const pop: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const stagger = (gap: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

/** Icons follow the order of profile.focusAreas and repeat if you add more. */
const FOCUS_ICONS: LucideIcon[] = [Sparkles, Bot, Brain, Eye, Server, Search];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Section backdrop — darkens the portrait canvas behind this section */}
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="A Little About Me" />

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Image with animated gradient border + glow (see .about-frame) */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="about-frame group mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-[#070a14]">
              <Image
                src={assets.aboutPortrait}
                alt={`Portrait of ${profile.name}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 90vw, 34vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/70 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className="space-y-4 text-base leading-relaxed text-white/70">
              {profile.about.map((paragraph) => (
                <motion.p key={paragraph} variants={fadeUp}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                Core focus
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {profile.focusAreas.map((area, index) => {
                  const Icon = FOCUS_ICONS[index % FOCUS_ICONS.length];
                  return (
                    <motion.li
                      key={area}
                      initial={{ opacity: 0, y: 14, scale: 0.92 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.45,
                          ease: "easeOut",
                          delay: index * 0.07,
                        },
                      }}
                      viewport={VIEWPORT}
                      whileHover={{
                        y: -3,
                        transition: { type: "spring", stiffness: 400, damping: 20 },
                      }}
                      className="group inline-flex max-w-full cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm leading-snug text-white/75 transition-colors duration-300 hover:border-violet-400/60 hover:bg-violet-500/15 hover:text-white hover:shadow-[0_0_22px_rgba(139,92,246,0.35)]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-violet-300 transition duration-300 group-hover:scale-110 group-hover:text-white" />
                      <span>{area}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Button
                href={profile.resumePath}
                className="group hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] active:translate-y-0"
                download
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
