"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Experience() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          description="A timeline of professional roles across AI systems and software engineering."
        />

        <ol className="relative space-y-10 border-l border-white/10 pl-6 sm:pl-8">
          {experience.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[1.91rem] top-1.5 h-3.5 w-3.5 rounded-full border border-violet-300/70 bg-violet-500 shadow-glow sm:-left-[2.41rem]" />
              <p className="text-xs uppercase tracking-[0.16em] text-violet-300">
                {item.period}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {item.company}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/60">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric-blue" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
