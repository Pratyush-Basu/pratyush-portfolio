"use client";

/**
 * BackgroundSequence
 *
 * A fixed full-viewport layer that shows the person sequence subtly in the
 * background of every section AFTER the Hero.  It is mounted once in the
 * layout (page.tsx) and uses GSAP ScrollTrigger to:
 *   - Stay invisible while Hero is fully in view
 *   - Fade in as Hero scrolls out
 *   - Continue scrubbing frames as the user scrolls through all sections
 *   - Fade back out when the user reaches the Contact section
 */

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 238;
const BASE_PATH = "/person-video-img/ezgif-frame-";

function frameSrc(n: number): string {
  return `${BASE_PATH}${String(n).padStart(3, "0")}.png`;
}

export default function BackgroundSequence() {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setFrame = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    if (clamped === frameIndexRef.current) return;
    frameIndexRef.current = clamped;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (imgRef.current) {
        imgRef.current.src = frameSrc(clamped + 1);
      }
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    // Initial state: fully transparent
    gsap.set(container, { opacity: 0 });
    img.src = frameSrc(1);

    // ── Fade in when Hero exits ────────────────────────────────────────────
    const fadeInTrigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top 85%",
      end: "top 30%",
      scrub: 1.5,
      onUpdate: (self) => {
        gsap.set(container, { opacity: self.progress * 0.18 });
      },
    });

    // ── Scrub frames across all middle sections ────────────────────────────
    const scrubTrigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
      onUpdate: (self) => {
        // Loop the sequence across the entire scroll extent
        const looped = (self.progress * (TOTAL_FRAMES - 1) * 1.5) % TOTAL_FRAMES;
        setFrame(looped);
      },
    });

    // ── Fade out at Contact section ────────────────────────────────────────
    const fadeOutTrigger = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 60%",
      end: "top 10%",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(container, { opacity: (1 - self.progress) * 0.18 });
      },
    });

    return () => {
      fadeInTrigger.kill();
      scrubTrigger.kill();
      fadeOutTrigger.kill();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, setFrame]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Gradient vignette so it doesn't overwhelm content */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#05070f]/90 via-transparent to-[#05070f]/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#05070f]/60 via-transparent to-[#05070f]/80" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        draggable={false}
        className="h-full w-full object-cover object-center opacity-60"
        src={frameSrc(1)}
        width={800}
        height={900}
      />
    </div>
  );
}
