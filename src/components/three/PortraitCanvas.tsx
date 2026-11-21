"use client";

/**
 * PortraitCanvas — scroll-driven sequence with a bounded loader.
 *
 * One persistent canvas. GSAP ScrollTrigger maps document progress to
 * frameIndex = round(progress * 237). Frames never load all at once:
 * a small queue (max 3 concurrent) fetches the current frame first, then
 * a few ahead in the scroll direction and a few behind for reverse scroll.
 * Far-away frames are released to cap memory. decode() runs before draw.
 * The last painted frame stays on the canvas until the requested frame is ready.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = 238;
const LAST = TOTAL - 1;
const PATH = "/images/portrait/sequence-webp/ezgif-frame-";
const BACKGROUND_OPACITY = 0.22;

const MAX_CONCURRENT = 3;
const INITIAL_BATCH = 8;
const AHEAD = 10;
const BEHIND = 6;
const MAX_CACHED = 36;

function src(frameNumber1: number): string {
  return `${PATH}${String(frameNumber1).padStart(3, "0")}.webp`;
}

function frameFromProgress(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.round(clamped * LAST);
}

type Slot = {
  img: HTMLImageElement;
  decoded: boolean;
};

type LoaderOptions = {
  onReady: (index: number, img: HTMLImageElement) => void;
};

function createLoader(options: LoaderOptions) {
  const cache = new Map<number, Slot>();
  const queued = new Set<number>();
  const queue: number[] = [];
  let inflight = 0;
  let current = 0;
  let direction = 1;
  let disposed = false;

  function desiredWindow(): number[] {
    const ordered: number[] = [current];
    for (let step = 1; step <= Math.max(AHEAD, BEHIND); step += 1) {
      if (step <= AHEAD) {
        const ahead = current + direction * step;
        if (ahead >= 0 && ahead <= LAST) ordered.push(ahead);
      }
      if (step <= BEHIND) {
        const behind = current - direction * step;
        if (behind >= 0 && behind <= LAST) ordered.push(behind);
      }
    }
    return ordered;
  }

  function enqueue(index: number, front = false) {
    if (disposed || index < 0 || index > LAST) return;
    if (cache.get(index)?.decoded) return;
    if (queued.has(index)) {
      if (front) {
        const at = queue.indexOf(index);
        if (at > 0) {
          queue.splice(at, 1);
          queue.unshift(index);
        }
      }
      return;
    }
    queued.add(index);
    if (front) queue.unshift(index);
    else queue.push(index);
  }

  function evict() {
    if (cache.size <= MAX_CACHED) return;
    const keep = new Set(desiredWindow());
    const victims: number[] = [];
    cache.forEach((_slot, index) => {
      if (!keep.has(index)) victims.push(index);
    });
    victims.sort(
      (a, b) => Math.abs(b - current) - Math.abs(a - current),
    );
    while (cache.size > MAX_CACHED && victims.length) {
      const index = victims.shift();
      if (index === undefined || index === current) continue;
      const slot = cache.get(index);
      if (!slot) continue;
      cache.delete(index);
    }
  }

  async function loadOne(index: number) {
    inflight += 1;
    try {
      let slot = cache.get(index);

      if (!slot) {
        const img = new window.Image();
        img.decoding = "async";

        slot = { img, decoded: false };
        cache.set(index, slot);
      }

      // Always ensure that the image has a real source URL.
      if (!slot.img.getAttribute("src")) {
        slot.img.src = src(index + 1);
      }

      if (!slot.img.complete) {
        await new Promise<void>((resolve, reject) => {
          const onLoad = () => {
            cleanup();
            resolve();
        };

        const onError = () => {
          console.error("[Frame Load Error]", {
            frame: index + 1,
            requestedURL: slot!.img.src,
            complete: slot!.img.complete,
            naturalWidth: slot!.img.naturalWidth,
            naturalHeight: slot!.img.naturalHeight,
          });
        
          cleanup();
          reject(new Error(`Failed to load ${slot!.img.src}`));
        };

    const cleanup = () => {
      slot!.img.removeEventListener("load", onLoad);
      slot!.img.removeEventListener("error", onError);
    };

    slot!.img.addEventListener("load", onLoad);
    slot!.img.addEventListener("error", onError);

    // Check again after registering listeners to avoid a loading race.
    if (slot!.img.complete) {
      cleanup();

      if (slot!.img.naturalWidth > 0) resolve();
      else reject(new Error(`frame ${index + 1}`));
    }
  });
}


      if (slot.img.naturalWidth === 0) return;

      try {
        await slot.img.decode();
      } catch {
        /* decode() can reject on some browsers; load is enough to draw */
      }

      if (disposed) return;
      slot.decoded = true;
      options.onReady(index, slot.img);
    } catch (error) {
      cache.delete(index);
      if (process.env.NODE_ENV !== "production") {
        console.warn("[PortraitCanvas] failed to load frame", index + 1, error);
      }
    } finally {
      queued.delete(index);
      inflight -= 1;
      pump();
    }
  }

  function pump() {
    if (disposed) return;
    while (inflight < MAX_CONCURRENT && queue.length) {
      const index = queue.shift();
      if (index === undefined) break;
      if (cache.get(index)?.decoded) {
        queued.delete(index);
        continue;
      }
      void loadOne(index);
    }
    evict();
  }

  function prefetch(index: number, nextDirection: number) {
    current = index;
    direction = nextDirection === 0 ? direction : Math.sign(nextDirection);
    const window = desiredWindow();
    window.forEach((frame, order) => enqueue(frame, order === 0));
    pump();
  }

  function getDecoded(index: number): HTMLImageElement | null {
    const slot = cache.get(index);
    if (!slot?.decoded || slot.img.naturalWidth === 0) return null;
    return slot.img;
  }

  function boot() {
    for (let i = 0; i < INITIAL_BATCH; i += 1) enqueue(i);
    pump();
  }

  function dispose() {
    disposed = true;
    queue.length = 0;
    queued.clear();
    cache.clear();
  }

  return { prefetch, getDecoded, boot, dispose };
}

function drawImage(canvas: HTMLCanvasElement, img: HTMLImageElement): boolean {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx || img.naturalWidth === 0) return false;

  const cw = canvas.width;
  const ch = canvas.height;
  if (cw === 0 || ch === 0) return false;

  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) * 0.3;

  ctx.drawImage(img, dx, dy, dw, dh);
  return true;
}

export default function PortraitCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;
    const cv = canvas;

    const loader = createLoader({
      onReady(index, img) {
        if (frameRef.current !== index) return;
        drawImage(cv, img);
      },
    });

    function paint(index: number) {
      const ready = loader.getDecoded(index);
      if (ready) {
        drawImage(cv, ready);
        return;
      }
      loader.prefetch(index, 0);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
      paint(frameRef.current);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    loader.boot();
    loader.prefetch(0, 1);

    /*
     * The frame sequence is a 1:1 mapping of the user's own scroll position
     * (no autoplay, no smoothing, no parallax), so it is NOT gated on
     * prefers-reduced-motion. Only the eased opacity fade is simplified
     * for reduced-motion users. Read once here so a late change of the
     * media query never tears down and rebuilds the sequence trigger.
     */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lastIndex = 0;

    const applyFrame = (progress: number) => {
      const next = frameFromProgress(progress);
      const direction = next - lastIndex;

      lastIndex = next;
      frameRef.current = next;

      loader.prefetch(next, direction);

      const ready = loader.getDecoded(next);
      if (ready) drawImage(cv, ready);
    };

    /*
     * Progress is measured against the real scroll range of the window,
     * re-evaluated on every refresh. Using documentElement as the trigger
     * with end:"max" measured the range once at creation; <html> is h-full
     * here, so any later layout growth (fonts, images, lazy sections) left
     * a stale, too-short range and progress hit 1 early.
     */
    const sequenceTrigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      invalidateOnRefresh: true,
      onUpdate: (self) => applyFrame(self.progress),
      onRefresh: (self) => applyFrame(self.progress),
    });
    triggersRef.current.push(sequenceTrigger);
    applyFrame(sequenceTrigger.progress);

    if (container) {
      gsap.set(container, { opacity: 1 });
      const home = document.getElementById("home");
      if (home) {
        const fade = ScrollTrigger.create({
          trigger: home,
          start: "bottom 85%",
          end: "bottom 10%",
          scrub: reduceMotion ? true : 1.2,
          onUpdate(self) {
            gsap.set(container, {
              opacity: 1 - self.progress * (1 - BACKGROUND_OPACITY),
            });
          },
        });
        triggersRef.current.push(fade);
      }
    }

    /*
     * Keep the scroll range in sync with the document height. ScrollTrigger
     * only auto-refreshes on window resize/load, not when content grows.
     */
    let refreshRaf = 0;
    let lastHeight = document.documentElement.scrollHeight;
    const scheduleRefresh = () => {
      cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight;
        if (h === lastHeight) return;
        lastHeight = h;
        ScrollTrigger.refresh();
      });
    };
    const resizeObserver = new ResizeObserver(scheduleRefresh);
    resizeObserver.observe(document.body);
    void document.fonts?.ready.then(scheduleRefresh);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimers = [150, 600, 1500].map((ms) =>
      window.setTimeout(refresh, ms),
    );

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(refreshRaf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", refresh);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      loader.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="portrait-canvas-container" aria-hidden>
      <div className="portrait-vignette-left" />
      <div className="portrait-vignette-top" />
      <div className="portrait-vignette-bottom" />
      <div className="portrait-tint" />
      <canvas ref={canvasRef} className="portrait-canvas" />
    </div>
  );
}