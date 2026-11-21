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
    id: "hackthonix",
    title: "Hackthonix",
    description: "GenAI Ed-Tech project.",
  },
  {
    id: "sih",
    title: "Smart India Hackathon",
    description: "Internal selection, 2024.",
  },
];

export const certifications = [
  "HackTropica",
  "Deep Learning, Generative AI and Prompt Engineering",
  "FIEM Certified SIH Internal Hackathon Participation Certificate",
  "PWskills certified DSA with C++",
  "Certificate of completion: Introduction to agent skills",
] as const;
