"use client";

/**
 * Brand logos for skills, served as SVG from the Simple Icons CDN
 * (https://simpleicons.org — brand marks in official brand colours; marks that
 * are near-black are shown white so they stay visible on the dark theme).
 *
 * Each skill lists candidate slugs; if one fails to load the next is tried, and
 * if all fail a lucide icon is shown instead. Concept skills that have no brand
 * (RAG, REST APIs, …) use a lucide icon directly.
 */

import Image from "next/image";
import { useState } from "react";
import {
  Bot,
  Boxes,
  Brain,
  Cpu,
  Eye,
  Layers,
  Link2,
  Network,
  Pencil,
  Plug,
  Search,
  Lightbulb, 
  MessageSquare,
  Target,
  Users,
  Server,
  Workflow,
  Sparkles,
  Bug,
  Terminal,
  type LucideIcon,
} from "lucide-react";

type SkillMeta = {
  /** Simple Icons slugs to try, in order. Omit for concept skills. */
  slugs?: string[];
  /** Hex colour without "#". */
  color: string;
  fallback: LucideIcon;
};

const WHITE = "ffffff";

export const SKILL_META: Record<string, SkillMeta> = {
  // AI / ML
  Python: { slugs: ["python"], color: "3776AB", fallback: Brain },
  TensorFlow: { slugs: ["tensorflow"], color: "FF6F00", fallback: Brain },
  Keras: { slugs: ["keras"], color: "D00000", fallback: Brain },
  PyTorch: { slugs: ["pytorch"], color: "EE4C2C", fallback: Brain },
  "Scikit-learn": { slugs: ["scikitlearn"], color: "F7931E", fallback: Brain },
  OpenCV: { slugs: ["opencv"], color: "5C3EE8", fallback: Eye },
  YOLO: { slugs: ["ultralytics"], color: WHITE, fallback: Eye },
  "Computer Vision": { color: "38BDF8", fallback: Eye },
  "Deep Learning": { color: "A78BFA", fallback: Brain },
  NumPy: { slugs: ["numpy"], color: "4DABCF", fallback: Brain },
  Pandas: { slugs: ["pandas"], color: WHITE, fallback: Brain },
  Matplotlib: { slugs: ["matplotlib"], color: "8CB8E0", fallback: Brain },
  Seaborn: { slugs: ["seaborn"], color: "4C9BC9", fallback: Brain },
  NLP: { color: "F9A8D4", fallback: MessageSquare },
  SHAP: { color: "FBBF24", fallback: Lightbulb },
  "Model Evaluation": { color: "34D399", fallback: Target },

  // GenAI / agents
  "Large Language Models": { color: "E879F9", fallback: Bot },
  RAG: { color: "F0ABFC", fallback: Search },
  LangChain: { slugs: ["langchain"], color: WHITE, fallback: Link2 },
  LangGraph: { slugs: ["langgraph"], color: WHITE, fallback: Network },
  CrewAI: { slugs: ["crewai"], color: "FF5A50", fallback: Users },
  "Hugging Face Transformers": {
    slugs: ["huggingface"],
    color: "FFD21E",
    fallback: Bot,
  },
  "Prompt Engineering": { color: "F9A8D4", fallback: Pencil },
  Ollama: { slugs: ["ollama"], color: WHITE, fallback: Bot },
  "Multi-Agent Systems": { color: "C084FC", fallback: Network },
  LiteLLM: { slugs: ["litellm"], color: WHITE, fallback: Network },
  OpenRouter: { slugs: ["openrouter"], color: WHITE, fallback: Network },

  // Backend
  FastAPI: { slugs: ["fastapi"], color: "009688", fallback: Cpu },
  Flask: { slugs: ["flask"], color: WHITE, fallback: Cpu },
  "REST APIs": { color: "38BDF8", fallback: Link2 },
  SQLAlchemy: { slugs: ["sqlalchemy"], color: "D71F00", fallback: Layers },
  "API Integration": { color: "7DD3FC", fallback: Plug },
  Pydantic: { slugs: ["pydantic"], color: "E92063", fallback: Layers },
  Uvicorn: { slugs: ["uvicorn"], color: WHITE, fallback: Server },
  "Swagger / OpenAPI": {
    slugs: ["swagger", "openapiinitiative"],
    color: "85EA2D",
    fallback: Link2,
  },
  "Database Design": { color: "67E8F9", fallback: Layers },

  // Databases
  PostgreSQL: { slugs: ["postgresql"], color: "4169E1", fallback: Layers },
  MySQL: { slugs: ["mysql"], color: "4479A1", fallback: Layers },
  MongoDB: { slugs: ["mongodb"], color: "47A248", fallback: Layers },
  Firebase: { slugs: ["firebase"], color: "FFCA28", fallback: Layers },
  SQLite: { slugs: ["sqlite"], color: "0F80CC", fallback: Layers },
  "Vector Databases": { color: "6EE7B7", fallback: Boxes },
  DBeaver: { slugs: ["dbeaver"], color: WHITE, fallback: Layers },
  Milvus: { slugs: ["milvus"], color: "00A1EA", fallback: Boxes },
  FAISS: { color: "60A5FA", fallback: Boxes },
  ChromaDB: { slugs: ["chroma", "chromadb"], color: "FFDE2D", fallback: Boxes },

  // Frontend
  HTML: { slugs: ["html5"], color: "E34F26", fallback: Cpu },
  CSS: { slugs: ["css", "css3"], color: "1572B6", fallback: Cpu },
  JavaScript: { slugs: ["javascript"], color: "F7DF1E", fallback: Cpu },
  React: { slugs: ["react"], color: "61DAFB", fallback: Cpu },
  "Next.js": { slugs: ["nextdotjs"], color: WHITE, fallback: Cpu },
  "Tailwind CSS": { slugs: ["tailwindcss"], color: "06B6D4", fallback: Cpu },
  Bootstrap: { slugs: ["bootstrap"], color: "7952B3", fallback: Cpu },

  // Cloud / DevOps / MLOps
  Git: { slugs: ["git"], color: "F05032", fallback: Cpu },
  GitHub: { slugs: ["github"], color: WHITE, fallback: Cpu },
  Docker: { slugs: ["docker"], color: "2496ED", fallback: Cpu },
  MLflow: { slugs: ["mlflow"], color: "0194E2", fallback: Cpu },
  DVC: { slugs: ["dvc"], color: "945DD6", fallback: Cpu },
  AWS: { slugs: ["amazonaws", "amazonwebservices"], color: "FF9900", fallback: Cpu },
  Vercel: { slugs: ["vercel"], color: WHITE, fallback: Cpu },
  Render: { slugs: ["render"], color: "46E3B7", fallback: Cpu },
  "CI/CD": { slugs: ["githubactions"], color: "2088FF", fallback: Workflow },


    // Tools
    "VS Code": { slugs: ["visualstudiocode"], color: "007ACC", fallback: Terminal },
    Cursor: { slugs: ["cursor"], color: WHITE, fallback: Terminal },
    "Google Antigravity": {
      slugs: ["googleantigravity", "antigravity"],
      color: "4285F4",
      fallback: Sparkles,
    },
    "Chrome DevTools": { slugs: ["googlechrome"], color: "4285F4", fallback: Bug },
    "Jupyter Notebook": { slugs: ["jupyter"], color: "F37626", fallback: Cpu },
    "Google Colab": { slugs: ["googlecolab"], color: "F9AB00", fallback: Cpu },
    Postman: { slugs: ["postman"], color: "FF6C37", fallback: Cpu },
    k6: { slugs: ["k6"], color: "7D64FF", fallback: Terminal },

  // Extra technologies used by projects
  Dialogflow: { slugs: ["dialogflow"], color: "FF9800", fallback: Bot },
  Streamlit: { slugs: ["streamlit"], color: "FF4B4B", fallback: Cpu },
  "Groq API": { slugs: ["groq"], color: "F55036", fallback: Cpu },
  "ESP32-CAM": { slugs: ["espressif"], color: "E7352C", fallback: Cpu },
};

const DEFAULT_META: SkillMeta = { color: "A78BFA", fallback: Cpu };

export function getSkillMeta(name: string): SkillMeta {
  return SKILL_META[name] ?? DEFAULT_META;
}

/** True when the skill has an official brand logo to try. */
export function hasBrandLogo(name: string): boolean {
  return Boolean(SKILL_META[name]?.slugs?.length);
}

/** Brand colour as rgba(), for glows and tinted borders. */
export function brandRgba(name: string, alpha: number): string {
  const hex = getSkillMeta(name).color;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type SkillLogoProps = {
  name: string;
  size?: number;
  className?: string;
  /** Render nothing (instead of a lucide icon) when no brand logo loads. */
  brandOnly?: boolean;
};

export default function SkillLogo({
  name,
  size = 24,
  className,
  brandOnly = false,
}: SkillLogoProps) {
  const meta = getSkillMeta(name);
  const [slugIndex, setSlugIndex] = useState(0);

  const slug = meta.slugs?.[slugIndex];
  if (!slug) {
    if (brandOnly) return null;
    const Fallback = meta.fallback;
    return (
      <Fallback
        className={className}
        style={{ color: `#${meta.color}`, width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    <Image
      key={slug}
      src={`https://cdn.simpleicons.org/${slug}/${meta.color}`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      unoptimized
      onError={() => setSlugIndex((index) => index + 1)}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
