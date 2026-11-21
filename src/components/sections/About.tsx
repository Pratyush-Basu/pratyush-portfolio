"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { assets, profile } from "@/data/profile";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function About() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Section backdrop — darkens the portrait canvas behind this section */}
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="A Little About Me" />

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src={assets.aboutPortrait}
              alt={`Portrait of ${profile.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 34vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/70 via-transparent to-transparent" />
          </div>

          <div>
            <div className="space-y-4 text-base leading-relaxed text-white/70">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                Core focus
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/75"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button href={profile.resumePath} download>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
