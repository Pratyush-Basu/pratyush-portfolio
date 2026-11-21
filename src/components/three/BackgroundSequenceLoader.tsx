"use client";

/**
 * BackgroundSequenceLoader
 *
 * Thin "use client" wrapper that owns the `dynamic(..., { ssr: false })` call.
 * Next.js requires dynamic imports with `ssr: false` to live inside a Client
 * Component; page.tsx is a Server Component so the import cannot live there.
 */

import dynamic from "next/dynamic";

const BackgroundSequence = dynamic(
  () => import("@/components/three/BackgroundSequence"),
  { ssr: false },
);

export default function BackgroundSequenceLoader() {
  return <BackgroundSequence />;
}
