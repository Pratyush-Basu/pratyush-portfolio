"use client";

import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SkillLogo, { hasBrandLogo } from "@/components/ui/SkillLogo";
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
  index?: number;
  onOpen: (project: Project) => void;
};

const MAX_TECH = 5;

export default function ProjectCard({
  project,
  index = 0,
  onOpen,
}: ProjectCardProps) {
  const visual = PROJECT_VISUALS[project.id] ?? {
    gradient: "from-violet-600/30 via-indigo-900/40 to-electric-blue/20",
    emoji: "💡",
    label: project.category,
  };
  const extra = project.technologies.length - MAX_TECH;

  return (
    <SpotlightCard
      as="article"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-white/[0.03] backdrop-blur-md",
        "transition duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-violet-400/30 hover:bg-white/[0.05]",
        "hover:shadow-[0_24px_60px_-24px_rgba(139,92,246,0.55)]",
      )}
    >
      {/* ── Banner ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative h-44 w-full overflow-hidden bg-gradient-to-br",
          visual.gradient,
        )}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            unoptimized
            className="object-cover object-center transition duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full select-none flex-col items-center justify-center gap-2">
            <span
              className="text-5xl drop-shadow-lg transition duration-500 group-hover:scale-125 group-hover:-rotate-6"
              role="img"
              aria-hidden
            >
              {visual.emoji}
            </span>
            <div
              className="absolute -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-50 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(139,92,246,0.5) 0%, transparent 70%)",
              }}
            />
          </div>
        )}

        {/* readability gradient + light sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020]/85 via-transparent to-[#0b1020]/20" />
        <div className="card-shine" aria-hidden />

        {/* index */}
        <span className="absolute left-4 top-3 font-display text-sm tabular-nums text-white/70 transition group-hover:text-white">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* arrow badge */}
        <span
          aria-hidden
          className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>

        {/* category */}
        <span className="absolute bottom-3 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-wider text-violet-200 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-snug text-white transition-colors duration-300 group-hover:text-violet-200">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/75">
          {project.shortDescription}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, MAX_TECH).map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65 transition duration-300 group-hover:border-white/20"
            >
              {hasBrandLogo(tech) ? (
                <SkillLogo name={tech} size={12} brandOnly />
              ) : null}
              {tech}
            </li>
          ))}
          {extra > 0 ? (
            <li className="rounded-full border border-dashed border-white/15 px-2.5 py-1 text-[11px] text-white/45">
              +{extra}
            </li>
          ) : null}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition duration-300 hover:bg-gradient-to-r hover:from-violet-500 hover:to-electric-blue hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 transition hover:text-white"
            >
              <GitHubIcon className="h-3.5 w-3.5" /> GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 transition hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </a>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
}
