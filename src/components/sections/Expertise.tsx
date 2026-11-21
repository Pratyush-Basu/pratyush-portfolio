"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

export default function Expertise() {
  const [activeId, setActiveId] = useState(skillCategories[0]?.id ?? "");
  const active =
    skillCategories.find((category) => category.id === activeId) ??
    skillCategories[0];
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="expertise" ref={ref} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expertise"
          title="My Technical Universe"
          description="Interactive skill categories spanning AI/ML, Generative AI, backend systems and deployment tooling."
        />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "whitespace-nowrap rounded-xl border px-4 py-3 text-left text-sm transition",
                  activeId === category.id
                    ? "border-violet-400/40 bg-violet-500/15 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white",
                )}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            <h3 className="font-display text-2xl text-white">{active.title}</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-xl border border-white/10 bg-[#0b1020]/70 px-4 py-3 text-sm text-white/75 transition hover:border-electric-blue/40 hover:text-white"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
