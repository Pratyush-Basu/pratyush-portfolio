export const SITE_NAME = "Pratyush Basu";
export const SITE_DESCRIPTION =
  "AI/ML Engineer portfolio — Generative AI, Agentic Systems, Machine Learning and backend engineering.";

/**
 * FastAPI chatbot backend. Override with NEXT_PUBLIC_API_URL.
 * Trailing slashes are stripped so `${API_BASE_URL}/api/chat` can never
 * become `//api/chat` (a redirect there breaks CORS preflight requests).
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

export const SUGGESTED_QUESTIONS = [
  "Who is Pratyush?",
  "What AI/ML technologies does he work with?",
  "Tell me about his projects.",
  "What is his professional experience?",
  "What is his expertise in Agentic AI?",
] as const;