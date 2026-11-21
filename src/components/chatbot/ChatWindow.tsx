"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import ChatMessages from "@/components/chatbot/ChatMessages";
import VoiceControls from "@/components/chatbot/VoiceControls";
import { SUGGESTED_QUESTIONS } from "@/lib/constants";
import { sendChatMessage } from "@/lib/api";
import type { ChatMessage } from "@/types";

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type ChatWindowProps = {
  onClose: () => void;
};

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi — I'm Pratyush AI. Ask about Pratyush's background, AI/ML expertise, projects or experience. I'll stick to verified portfolio information.",
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const speechSupported = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(
      window.speechSynthesis &&
        ((window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
          (window as unknown as { webkitSpeechRecognition?: unknown })
            .webkitSpeechRecognition),
    );
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  function speak(text: string) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  function toggleListen() {
    if (!speechSupported) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognitionCtor =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike })
        .webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) setInput((prev) => `${prev} ${transcript}`.trim());
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await sendChatMessage(
        nextMessages.map(({ role, content }) => ({ role, content })),
      );
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      speak(response.reply);
    } catch {
      const fallback: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: localFallbackReply(trimmed),
      };
      setMessages((prev) => [...prev, fallback]);
      speak(fallback.content);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <div className="flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Pratyush AI</p>
          <p className="text-xs text-white/50">
            Your AI-powered introduction to Pratyush.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1.5 text-white/60 hover:text-white"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ChatMessages messages={messages} />

      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => void ask(question)}
            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55 hover:border-violet-400/40 hover:text-white"
          >
            {question}
          </button>
        ))}
      </div>

      <VoiceControls
        listening={listening}
        speaking={speaking}
        supported={speechSupported}
        onToggleListen={toggleListen}
        onStopSpeaking={stopSpeaking}
      />

      <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Pratyush..."
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-violet-400/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-violet-500 px-3 py-2 text-white disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function localFallbackReply(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("who is") || q.includes("pratyush")) {
    return "Pratyush Basu is an AI/ML Engineer and Software Consultant Trainee at TuTeck Technologies, with experience across Machine Learning, Generative AI, Agentic systems, Computer Vision and backend engineering with FastAPI.";
  }
  if (q.includes("project")) {
    return "Featured projects include Krishi-Sahayak, an AI Multi-Agent Travel Planner, GenAI PDF Assistant, Customer Churn Prediction, AI Virtual Try-On and Smart Parking Management. Ask about any one for more depth.";
  }
  if (q.includes("experience") || q.includes("intern")) {
    return "He currently works at TuTeck Technologies as a Software Consultant Trainee, and previously interned at SenseGrid AI Systems and Capsitech IT Services in AI/ML roles.";
  }
  if (q.includes("agentic") || q.includes("technology") || q.includes("tech")) {
    return "His Agentic AI work includes multi-agent travel planning with CrewAI, plus broader experience with LLMs, RAG, LangChain/LangGraph concepts, FastAPI backends and applied ML systems.";
  }
  return "I can share verified details about Pratyush's background, skills, projects and experience. Try one of the suggested questions, or start the FastAPI backend for fuller LLM answers.";
}
