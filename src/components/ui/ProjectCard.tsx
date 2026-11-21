"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-white/[0.03] p-6 backdrop-blur-md transition duration-300",
        "hover:border-violet-400/35 hover:bg-white/[0.05]",
      )}
    >
      <div className="mb-5 h-36 overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/30 via-indigo-900/40 to-electric-blue/20">
        <div className="flex h-full items-end p-4">
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-wider text-violet-200">
            {project.category}
          </span>
        </div>
      </div>

      <h3 className="font-display text-xl text-white transition group-hover:text-violet-200">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
        {project.shortDescription}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-medium text-white hover:bg-violet-500/30"
        >
          View Details <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white"
          >
            <GitHubIcon className="h-3.5 w-3.5" /> GitHub
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live
          </a>
        ) : null}
      </div>
    </article>
  );
}
