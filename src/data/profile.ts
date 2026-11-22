import type { NavLink, SocialLink, StatItem } from "@/types";

export const profile = {
  name: "Pratyush Basu",
  monogram: "PB.",
  title: "AI/ML Engineer · Generative AI · Backend Engineer",
  location: "Kolkata metropolitan area, West Bengal, India",
  headline: "Building Intelligence Into the Real World.",
  greeting: "Hi, I'm Pratyush Basu.",
  subheadline: "Building Intelligent Systems with AI/ML.",
  summary:
    "I'm Pratyush Basu, an AI/ML Engineer passionate about Generative AI, Agentic Systems, Machine Learning and scalable backend engineering. I build intelligent applications that solve practical problems.",
  about: [
    "I'm a Computer Science and Engineering graduate with a strong interest in Artificial Intelligence, Machine Learning and Backend Engineering.",
    "My journey involves building intelligent applications, experimenting with modern AI technologies and developing systems that connect machine learning models with real-world applications.",
    "I enjoy working across the AI development lifecycle, from model experimentation and LLM integration to API development and backend architecture.",
    "I'm particularly interested in Generative AI, Agentic AI, RAG systems and scalable AI-powered applications.",
  ],
  focusAreas: [
    "Generative AI & LLMs",
    "Agentic AI workflows",
    "Machine Learning & Deep Learning",
    "NLP & Computer Vision",
    "FastAPI & backend systems",
    "RAG & AI product MVPs",
  ],
  beyondCode: [
    "Continuously learning at the intersection of AI and software engineering.",
    "Experimenting with emerging Generative AI, Agentic workflows and RAG architectures through hands-on projects.",
    "Leading and participating in hackathons including Hackspire, Hackthonix and Smart India Hackathon internal selection.",
  ],
  email: "basupratyush76@gmail.com",
  resumePath: "/resume/Pratyush__Basu__CV.pdf",
  tagline: "AI/ML Engineer building intelligent, practical systems.",
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:basupratyush76@gmail.com",
    icon: "email",
  },
  {
    label: "GitHub",
    href: "https://github.com/Pratyush-Basu",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pratyush-basu-p19",
    icon: "linkedin",
  },
];

export const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

/** Verified counts only — derived from listed portfolio content. */
export const heroStats: StatItem[] = [
  { label: "AI/ML Projects", value: "20+" },
  { label: "Organizations Worked With", value: "3" },
  { label: "Technologies & Tools", value: "40+" },
];

export const assets = {
  heroPortrait: "/images/portrait/hero-still-80.png",
  heroPortraitAlt: "/images/portrait/hero-still-120.png",
  aboutPortrait: "/images/portrait/about-picture.png",
  sequenceBase: "/images/portrait/sequence",
  sequenceCount: 24,
  /** Full original sequence via junction (local); prefer sampled sequence in production. */
  fullSequenceBase: "/person-video-img",
  fullSequencePattern: "ezgif-frame-{n}.png",
  fullSequenceCount: 238,
} as const;
