"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <section id="experience" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="A timeline of professional roles across AI systems and software engineering."
        />

        <div ref={listRef} className="relative pl-8 sm:pl-10">
          {/* track + scroll-drawn progress line */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[6px] top-0 w-px bg-white/10"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-[6px] top-0 w-px origin-top bg-gradient-to-b from-violet-400 via-electric-blue to-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          />

          <RevealGroup as="ol" stagger={0.15} className="space-y-8">
            {experience.map((item, index) => (
              <RevealItem as="li" key={item.id} className="relative">
                {/* timeline node */}
                <span
                  aria-hidden
                  className="absolute -left-[2.03rem] top-7 flex h-3.5 w-3.5 items-center justify-center sm:-left-[2.53rem]"
                >
                  {index === 0 ? (
                    <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-violet-400/60" />
                  ) : null}
                  <span className="relative h-3.5 w-3.5 rounded-full border border-violet-300/80 bg-violet-500 shadow-glow" />
                </span>

                <SpotlightCard className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_20px_50px_-25px_rgba(139,92,246,0.5)] sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-violet-300 transition duration-300 group-hover:scale-110 group-hover:border-violet-400/40">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-white sm:text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm text-white/70">
                          {item.company}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-violet-200">
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-white/60">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 transition-colors duration-300 group-hover:text-white/75"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
