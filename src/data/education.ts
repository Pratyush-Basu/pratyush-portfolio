import type { Achievement, EducationItem } from "@/types";

export const education: EducationItem[] = [
  {
    id: "btech",
    school: "Future Institute of Engineering and Management, Kolkata",
    degree: "B.Tech — Computer Science & Engineering",
    period: "2022 — 2026",
    meta: "University: MAKAUT · CGPA: 7.90",
    details: [
      "Focus areas spanning Artificial Intelligence, Machine Learning and Backend Engineering.",
    ],
  },
  {
    id: "hs",
    school: "Harinavi D.V.A.S High School",
    degree: "Higher Secondary — PCMCS",
    period: "2020 — 2022",
    meta: "Percentage: 85%",
  },
  {
    id: "madhyamik",
    school: "Harinavi D.V.A.S High School",
    degree: "Madhyamik (Secondary Examination)",
    period: "2014 — 2020",
  },
];

export const achievements: Achievement[] = [
  {
    id: "hackspire",
    title: "Hackspire — 12-hour hackathon",
    description: "Participated as Team Leader.",
  },
  {
    id: "SparkHack",
    title: "SparkHack Hackathon (2025)",
    description: "Finalist (Top 10).",
  },
  {
    id: "FrostHack",
    title: "FrostHack S01 (2025)",
    description: "Finalist (Top 8).",
  },
  {
    id: "sih",
    title: "Smart India Hackathon",
    description: "Internal selection, 2023 & 2024.",
  },
];

export const certifications = [
  "Deep Learning, Generative AI and Prompt Engineering",
  "DS,AI,ML using Python",
  "PWskills certified DSA with C++",
  "SIH Internal Hackathon Participation Certificate",
  "HackTropica",
  "Hackspire",
  "Certificate of completion: Introduction to agent skills",
] as const;
