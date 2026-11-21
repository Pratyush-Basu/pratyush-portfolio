"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          description="Selected AI/ML, Generative AI and systems projects from applied engineering work."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
