"use client";

/**
 * Shared scroll-reveal primitives built on motion.
 *
 * Markup is identical on server and client (no reduced-motion branching), so
 * hydration stays consistent. Each element animates once when it scrolls in.
 *
 *   <Reveal>…</Reveal>                         single fade-up
 *   <RevealGroup as="ul"><RevealItem as="li"/></RevealGroup>   staggered list
 */

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const VIEWPORT = { once: true, margin: "-60px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

type Tag = "div" | "ul" | "ol" | "li" | "article" | "section";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
};

export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: GroupProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
};

export function RevealItem({ children, className, as = "div" }: ItemProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
