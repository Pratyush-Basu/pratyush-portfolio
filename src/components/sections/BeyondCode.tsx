"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function BeyondCode() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="beyond" ref={ref} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond Engineering"
          title="Beyond the Code"
          description="A concise look at learning, experimentation and hackathon experiences."
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {profile.beyondCode.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/70 backdrop-blur-md"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
