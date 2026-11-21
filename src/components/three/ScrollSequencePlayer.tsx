"use client";

/**
 * ScrollSequencePlayer
 *
 * Plays the 238-frame ezgif PNG sequence driven by GSAP ScrollTrigger.
 *
 * - On the Hero section (home): displayed prominently in-layout, full visible.
 * - As the user scrolls past Hero: the element transitions to a fixed,
 *   full-viewport background layer (opacity reduced, scale larger) so the
 *   animation continues running subtly across all other sections.
 * - On scroll back up the frames reverse correctly.
 *
 * The component preloads every frame with <link rel="preload"> so the first
 * swap feels instant, then uses a single <img> tag whose src is swapped on
 * rAF — far cheaper than multiple canvas operations.
 */

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 238;
const BASE_PATH = "/person-video-img/ezgif-frame-";

/** Zero-pad frame index to 3 digits */
function frameSrc(n: number): string {
  return `${BASE_PATH}${String(n).padStart(3, "0")}.png`;
}

/** Preload all frames so swaps are instant */
function preloadFrames() {
  if (typeof window === "undefined") return;
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = frameSrc(i);
    document.head.appendChild(link);
  }
}

export default function ScrollSequencePlayer() {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
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
        imgRef.current.src = frameSrc(clamped + 1); // 1-indexed filenames
      }
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Preload all frames immediately
    preloadFrames();

    const img = imgRef.current;
    const wrapper = wrapperRef.current;
    if (!img || !wrapper) return;

    // Set initial frame
    img.src = frameSrc(1);

    // ── Phase 1: Sequence plays while Hero section is in view ──────────────
    // The pinned scrollTrigger scrubs through frames 0→237
    const heroTrigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "+=300%",           // 3 × viewport heights of scroll room
      pin: false,
      scrub: 1,                // 1 s smoothing lag for buttery feel
      onUpdate: (self) => {
        setFrame(self.progress * (TOTAL_FRAMES - 1));
      },
    });

    // ── Phase 2: Background drift as user scrolls past Hero ────────────────
    // Fade the wrapper into the page background
    const bgTrigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(wrapper, {
          opacity: 0.08 + (1 - self.progress) * 0.22,
        });
      },
    });

    return () => {
      heroTrigger.kill();
      bgTrigger.kill();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, setFrame]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={wrapperRef}
      className="sequence-player pointer-events-none select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt=""
        draggable={false}
        className="h-full w-full object-contain"
        // first frame shown immediately (before JS runs)
        src={frameSrc(1)}
        // tell browser the image dimensions to avoid layout shift
        width={800}
        height={900}
      />
    </div>
  );
}
