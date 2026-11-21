"use client";

/**
 * PortraitCanvasLoader
 *
 * "use client" shell that owns `dynamic(..., { ssr: false })`.
 * Mounted once in layout.tsx so the canvas persists across all sections.
 */

import dynamic from "next/dynamic";

const PortraitCanvas = dynamic(
  () => import("@/components/three/PortraitCanvas"),
  { ssr: false },
);

export default function PortraitCanvasLoader() {
  return <PortraitCanvas />;
}

