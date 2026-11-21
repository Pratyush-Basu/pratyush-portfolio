import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "krishi-sahayak",
    title: "Krishi-Sahayak — AI-Powered Smart Farming System",
    shortDescription:
      "An intelligent farming platform featuring crop recommendation, fertilizer optimization, plant disease detection, an AI chatbot, weather forecasting, mandi prices and farm expense/profit calculations.",
    category: "Applied AI · Full Stack",
    technologies: [
      "Python",
      "Flask",
      "TensorFlow",
      "MongoDB",
      "Dialogflow",
      "OpenWeatherMap API",
    ],
    details: {
      problem:
        "Farmers need practical decision support across crop selection, fertilizer use, disease detection and market/weather awareness in one place.",
      solution:
        "Built an AI-powered platform that combines classical ML recommendations, vision-based disease detection, chatbot assistance and live weather/mandi insights.",
      architecture:
        "Flask-backed application integrating TensorFlow models, MongoDB persistence, Dialogflow chatbot flows and external weather/market APIs.",
      contributions: [
        "Designed and implemented core farming intelligence features end-to-end.",
        "Integrated chatbot and LLM-powered explanations with domain workflows.",
        "Connected weather information and mandi price insights into the product experience.",
      ],
      challenges: [
        "Combining multiple AI features into a coherent farmer-facing workflow.",
        "Balancing model usefulness with practical application usability.",
      ],
      results: [
        "Delivered a unified smart-farming experience spanning recommendation, detection, chat and market insights.",
      ],
    },
  },
  {
    id: "multi-agent-travel",
    title: "AI Multi-Agent Travel Planner",
    shortDescription:
      "A multi-agent AI travel planning application where specialized agents collaborate to research destinations, forecast weather, estimate budgets and generate travel routes.",
    category: "Agentic AI",
    technologies: [
      "CrewAI",
      "Python",
      "FastAPI",
      "SerpAPI",
      "Tavily",
      "Open-Meteo",
    ],
    details: {
      problem:
        "Travel planning spans research, weather, logistics and budgeting — tasks that benefit from specialized collaboration rather than a single monolithic prompt.",
      solution:
        "Explored Agentic AI workflows with specialized agents for research, weather, transportation, accommodation, budgeting and itinerary planning.",
      architecture:
        "CrewAI multi-agent orchestration with FastAPI services and external search/weather tools (SerpAPI, Tavily, Open-Meteo).",
      contributions: [
        "Designed agent roles and collaboration flow for travel planning tasks.",
        "Integrated external research and weather tools into the agent pipeline.",
      ],
      challenges: [
        "Coordinating specialized agents without redundant or conflicting outputs.",
        "Keeping tool-augmented answers grounded in retrieved context.",
      ],
      results: [
        "Demonstrated a working multi-agent travel planning workflow across research, weather, budget and routing concerns.",
      ],
    },
  },
  {
    id: "genai-pdf-assistant",
    title: "GenAI PDF Assistant",
    shortDescription:
      "A document intelligence application supporting PDF summarization and conversational interaction with uploaded PDF documents.",
    category: "Generative AI · RAG",
    technologies: ["Python", "Streamlit", "PyMuPDF", "Groq API"],
    details: {
      problem:
        "Users need faster ways to summarize PDFs and ask grounded questions over document content.",
      solution:
        "Built a document intelligence app for PDF summarization and conversational interaction with uploaded documents.",
      architecture:
        "Streamlit interface with PyMuPDF extraction and Groq-powered generation for summarization and Q&A.",
      contributions: [
        "Implemented PDF ingestion and conversational document workflows.",
        "Connected generation APIs for practical document assistance.",
      ],
      challenges: [
        "Preserving useful context from long documents within generation limits.",
        "Keeping answers tied to the uploaded document content.",
      ],
      results: [
        "Enabled summarization and conversational PDF interaction in a lightweight app experience.",
      ],
    },
  },
  {
    id: "customer-churn",
    title: "Customer Churn Prediction",
    shortDescription:
      "A machine learning pipeline for customer churn prediction with model evaluation, experiment tracking and model explainability.",
    category: "Machine Learning",
    technologies: ["Python", "Scikit-learn", "MLflow", "SHAP", "Streamlit"],
    details: {
      problem:
        "Businesses need reliable churn risk prediction with transparent model behaviour and reproducible experimentation.",
      solution:
        "Developed a Logistic Regression pipeline with feature engineering, threshold tuning, SHAP interpretability, MLflow tracking and Streamlit deployment.",
      architecture:
        "Scikit-learn modelling pipeline with MLflow experiment tracking, SHAP explanations and a Streamlit interface for interaction.",
      contributions: [
        "Built feature engineering, training, evaluation and threshold-tuning workflow.",
        "Added SHAP-based explainability and MLflow tracking.",
        "Deployed an interactive Streamlit experience for the model.",
      ],
      challenges: [
        "Balancing recall-oriented decision thresholds with overall model quality.",
        "Making predictions interpretable for practical use.",
      ],
      results: [
        "Achieved 0.84 ROC-AUC and 0.87 recall on the churn prediction model.",
      ],
    },
  },
  {
    id: "virtual-try-on",
    title: "AI Virtual Try-On",
    shortDescription:
      "A diffusion-based virtual try-on system using CatVTON, with optimizations for lower-VRAM environments.",
    category: "Computer Vision · Generative AI",
    technologies: ["Python", "Diffusion Models", "CatVTON", "Computer Vision"],
    details: {
      problem:
        "Virtual try-on systems are compute-heavy and difficult to run in constrained GPU memory environments.",
      solution:
        "Implemented a diffusion-based virtual try-on flow using CatVTON, with practical optimizations for lower-VRAM setups.",
      architecture:
        "CatVTON-based diffusion pipeline with computer-vision preprocessing and memory-conscious runtime adjustments.",
      contributions: [
        "Worked on diffusion-based try-on generation using CatVTON.",
        "Explored lower-VRAM optimizations for practical experimentation.",
      ],
      challenges: [
        "Managing VRAM constraints during diffusion inference.",
        "Maintaining usable visual quality under resource limits.",
      ],
      results: [
        "Produced a working virtual try-on experiment path suitable for constrained environments.",
      ],
    },
  },
  {
    id: "smart-parking",
    title: "Smart Parking Management",
    shortDescription:
      "An IoT and computer vision-based smart parking system featuring vehicle detection and automatic number plate recognition.",
    category: "IoT · Computer Vision",
    technologies: [
      "ESP32-CAM",
      "NodeMCU",
      "YOLO",
      "EasyOCR",
      "OpenCV",
      "Firebase",
    ],
    details: {
      problem:
        "Parking systems need automated vehicle detection and plate recognition to reduce manual monitoring overhead.",
      solution:
        "Built an IoT + computer vision system for vehicle detection and automatic number plate recognition.",
      architecture:
        "ESP32-CAM / NodeMCU capture pipeline with YOLO detection, EasyOCR recognition, OpenCV processing and Firebase integration.",
      contributions: [
        "Integrated camera/IoT capture with vision-based detection and OCR.",
        "Connected recognition outputs into a Firebase-backed workflow.",
      ],
      challenges: [
        "Handling real-world lighting and plate readability for OCR.",
        "Coordinating embedded capture with vision inference reliably.",
      ],
      results: [
        "Demonstrated an end-to-end smart parking detection and ANPR-oriented pipeline.",
      ],
    },
  },
];
