"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { achievements, education } from "@/data/education";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Journey() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="journey" ref={ref} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="My Journey"
          description="Education and selected milestones along the way."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ol className="space-y-6">
            {education.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-violet-300">
                  {item.period}
                </p>
                <h3 className="mt-2 font-display text-xl text-white">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-white/70">{item.school}</p>
                {item.meta ? (
                  <p className="mt-2 text-sm text-electric-blue/90">{item.meta}</p>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-electric-blue/10 p-6">
            <h3 className="font-display text-xl text-white">Achievements</h3>
            <ul className="mt-5 space-y-4">
              {achievements.map((item) => (
                <li key={item.id}>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/60">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
