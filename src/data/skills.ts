import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    skills: [
      "Python",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "YOLO",
      "Computer Vision",
      "Deep Learning",
    ],
  },
  {
    id: "genai",
    title: "Generative AI & Agentic AI",
    skills: [
      "Large Language Models",
      "RAG",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Hugging Face Transformers",
      "Prompt Engineering",
      "Ollama",
      "Multi-Agent Systems",
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "REST APIs",
      "SQLAlchemy",
      "API Integration",
      "Database Design",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "SQLite",
      "Vector Databases",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    id: "cloud",
    title: "Cloud, DevOps & MLOps",
    skills: ["Git", "GitHub", "Docker", "MLflow", "DVC", "AWS", "Vercel"],
  },
];

export const floatingTechLabels = [
  "Generative AI",
  "Agentic AI",
  "Machine Learning",
  "Data Science",
  "Backend Engineering",
] as const;
