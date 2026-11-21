export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "email" | "github" | "linkedin" | "website";
};

export type StatItem = {
  label: string;
  value: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: string[];
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
  details: {
    problem: string;
    solution: string;
    architecture: string;
    contributions: string[];
    challenges: string[];
    results: string[];
  };
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  period: string;
  highlights: string[];
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  period: string;
  meta?: string;
  details?: string[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
