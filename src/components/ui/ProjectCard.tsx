"use client";

import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/** Map project id → gradient + emoji for the placeholder banner */
const PROJECT_VISUALS: Record<
  string,
  { gradient: string; emoji: string; label: string }
> = {
  "krishi-sahayak": {
    gradient: "from-green-600/30 via-emerald-900/40 to-teal-600/20",
    emoji: "🌾",
    label: "AI Farming",
  },
  "multi-agent-travel": {
    gradient: "from-sky-600/30 via-indigo-900/40 to-blue-600/20",
    emoji: "✈️",
    label: "Agentic AI",
  },
  "genai-pdf-assistant": {
    gradient: "from-orange-600/30 via-amber-900/40 to-yellow-600/20",
    emoji: "📄",
    label: "GenAI · RAG",
  },
  "customer-churn": {
    gradient: "from-rose-600/30 via-pink-900/40 to-fuchsia-600/20",
    emoji: "📊",
    label: "Machine Learning",
  },
  "virtual-try-on": {
    gradient: "from-purple-600/30 via-violet-900/40 to-indigo-600/20",
    emoji: "👗",
    label: "Diffusion Models",
  },
  "smart-parking": {
    gradient: "from-cyan-600/30 via-blue-900/40 to-sky-600/20",
    emoji: "🅿️",
    label: "IoT · CV",
  },
};

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const visual = PROJECT_VISUALS[project.id] ?? {
    gradient: "from-violet-600/30 via-indigo-900/40 to-electric-blue/20",
    emoji: "💡",
    label: project.category,
  };

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-white/[0.03] backdrop-blur-md transition duration-300",
        "hover:border-violet-400/35 hover:bg-white/[0.05]",
      )}
    >
      {/* ── Project thumbnail / banner ────────────────────────────────── */}
      <div
        className={cn(
          "relative mb-0 h-40 w-full overflow-hidden",
          "bg-gradient-to-br",
          visual.gradient,
        )}
      >
        {/* If a real thumbnail is provided, show it */}
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            unoptimized
            className="object-cover object-center transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          /* Decorative placeholder */
          <div className="flex h-full flex-col items-center justify-center gap-2 select-none">
            <span
              className="text-5xl drop-shadow-lg transition duration-300 group-hover:scale-110"
              role="img"
              aria-hidden
            >
              {visual.emoji}
            </span>
            {/* Animated glow orb */}
            <div
              className="absolute -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full blur-2xl opacity-50"
              style={{
                background: `radial-gradient(ellipse at center, rgba(139,92,246,0.5) 0%, transparent 70%)`,
              }}
            />
          </div>
        )}

        {/* Overlay gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0b1020]/80 to-transparent" />

        {/* Category badge */}
        <span className="absolute bottom-3 left-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wider text-violet-200 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* ── Card body ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
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
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-medium text-white hover:bg-violet-500/30 transition"
          >
            View Details <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition"
            >
              <GitHubIcon className="h-3.5 w-3.5" /> GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
