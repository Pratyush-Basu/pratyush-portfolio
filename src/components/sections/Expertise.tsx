"use client";

import { useState } from "react";
import {
  Brain,
  Sparkles,
  Server,
  Database,
  Code2,
  Cloud,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

/** Map category id → lucide icon + accent colour */
const CATEGORY_META: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; accent: string }
> = {
  "ai-ml": {
    icon: Brain,
    accent: "text-violet-400",
  },
  genai: {
    icon: Sparkles,
    accent: "text-fuchsia-400",
  },
  backend: {
    icon: Server,
    accent: "text-sky-400",
  },
  databases: {
    icon: Database,
    accent: "text-emerald-400",
  },
  frontend: {
    icon: Code2,
    accent: "text-orange-400",
  },
  cloud: {
    icon: Cloud,
    accent: "text-cyan-400",
  },
};

/** Map individual skill name → emoji icon */
const SKILL_ICON: Record<string, string> = {
  Python: "🐍",
  TensorFlow: "🧠",
  Keras: "🔴",
  PyTorch: "🔥",
  "Scikit-learn": "📊",
  OpenCV: "👁️",
  YOLO: "🎯",
  "Computer Vision": "🔭",
  "Deep Learning": "🤖",
  "Large Language Models": "💬",
  RAG: "🔍",
  LangChain: "⛓️",
  LangGraph: "🕸️",
  CrewAI: "👥",
  "Hugging Face Transformers": "🤗",
  "Prompt Engineering": "✍️",
  Ollama: "🦙",
  "Multi-Agent Systems": "🤝",
  FastAPI: "⚡",
  Flask: "🧪",
  "REST APIs": "🔗",
  SQLAlchemy: "🗄️",
  "API Integration": "🔌",
  "Database Design": "📐",
  PostgreSQL: "🐘",
  MySQL: "🐬",
  MongoDB: "🍃",
  Firebase: "🔥",
  SQLite: "📦",
  "Vector Databases": "🔢",
  HTML: "🌐",
  CSS: "🎨",
  JavaScript: "🟡",
  React: "⚛️",
  "Next.js": "▲",
  "Tailwind CSS": "💨",
  Git: "🌿",
  GitHub: "🐙",
  Docker: "🐳",
  MLflow: "📈",
  DVC: "📂",
  AWS: "☁️",
  Vercel: "▲",
};

export default function Expertise() {
  const [activeId, setActiveId] = useState(skillCategories[0]?.id ?? "");
  const active =
    skillCategories.find((category) => category.id === activeId) ??
    skillCategories[0];
  const ref = useGsapReveal<HTMLElement>();

  const activeMeta = CATEGORY_META[activeId] ?? {
    icon: Brain,
    accent: "text-violet-400",
  };
  const ActiveIcon = activeMeta.icon;

  return (
    <section id="expertise" ref={ref} className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expertise"
          title="My Technical Universe"
          description="Interactive skill categories spanning AI/ML, Generative AI, backend systems and deployment tooling."
        />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* ── Sidebar tabs ───────────────────────────── */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillCategories.map((category) => {
              const meta = CATEGORY_META[category.id];
              const Icon = meta?.icon ?? Brain;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveId(category.id)}
                  className={cn(
                    "flex items-center gap-3 whitespace-nowrap rounded-xl border px-4 py-3 text-left text-sm transition duration-200",
                    activeId === category.id
                      ? "border-violet-400/40 bg-violet-500/15 text-white"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      activeId === category.id
                        ? (meta?.accent ?? "text-violet-400")
                        : "text-white/40",
                    )}
                  />
                  {category.title}
                </button>
              );
            })}
          </div>

          {/* ── Skill grid panel ───────────────────────── */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            {/* Panel heading with icon */}
            <div className="mb-6 flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]",
                  activeMeta.accent,
                )}
              >
                <ActiveIcon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl text-white">
                {active.title}
              </h3>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.skills.map((skill) => {
                const emoji = SKILL_ICON[skill];
                return (
                  <li
                    key={skill}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1020]/70 px-4 py-3 text-sm text-white/75 transition duration-200 hover:border-electric-blue/40 hover:text-white hover:bg-white/[0.06]"
                  >
                    {emoji ? (
                      <span
                        className="text-lg leading-none"
                        role="img"
                        aria-hidden
                      >
                        {emoji}
                      </span>
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-white/20 bg-white/10" />
                    )}
                    {skill}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
