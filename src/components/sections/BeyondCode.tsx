"use client";

import { BookOpen, FlaskConical, Trophy, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

/** Icons follow the order of profile.beyondCode (learning, experimenting, hackathons). */
const ICONS: LucideIcon[] = [BookOpen, FlaskConical, Trophy];

export default function BeyondCode() {
  return (
    <section id="beyond" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond Engineering"
          title="Beyond the Code"
          description="A concise look at learning, experimentation and hackathon experiences."
        />

        <RevealGroup as="ul" stagger={0.12} className="grid gap-4 md:grid-cols-3">
          {profile.beyondCode.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <RevealItem as="li" key={item} className="h-full">
                <SpotlightCard className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-violet-400/30 hover:shadow-[0_20px_50px_-25px_rgba(139,92,246,0.5)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-violet-300 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-violet-400/40">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/85">
                    {item}
                  </p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
