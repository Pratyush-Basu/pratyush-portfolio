"use client";

import { motion } from "motion/react";
import { VIEWPORT, fadeUp, staggerContainer } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={
        centered
          ? "mx-auto mb-12 max-w-3xl text-center"
          : "mb-12 max-w-3xl"
      }
    >
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          className={
            centered
              ? "mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300"
              : "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300"
          }
        >
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-r from-violet-400 to-transparent"
          />
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}

      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
        className={
          centered
            ? "mx-auto mt-6 block h-px w-24 origin-center bg-gradient-to-r from-transparent via-violet-400 to-transparent"
            : "mt-6 block h-px w-24 origin-left bg-gradient-to-r from-violet-400 to-electric-blue"
        }
      />
    </motion.div>
  );
}
