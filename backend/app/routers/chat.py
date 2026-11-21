from pathlib import Path

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.settings import get_settings

router = APIRouter(tags=["chat"])

KNOWLEDGE_PATH = Path(__file__).resolve().parents[2] / "knowledge" / "portfolio.md"

SYSTEM_PROMPT = """You are Pratyush AI, an assistant that introduces Pratyush Basu using only verified portfolio knowledge.

Rules:
- Answer only from the provided knowledge base.
- Never invent experience, metrics, URLs, employers, dates or achievements.
- If asked something unknown, say you do not have that detail and suggest a related verified topic.
- Keep answers concise, professional and technically clear.
- You may discuss projects with technical depth using only listed facts.
"""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str


def load_knowledge() -> str:
    if not KNOWLEDGE_PATH.exists():
        return "No knowledge base available."
    return KNOWLEDGE_PATH.read_text(encoding="utf-8")


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    settings = get_settings()
    knowledge = load_knowledge()

    if not settings.openrouter_api_key:
        last_user = next(
            (message.content for message in reversed(payload.messages) if message.role == "user"),
            "",
        )
        return ChatResponse(reply=_offline_reply(last_user, knowledge))

    messages = [
        {
            "role": "system",
            "content": f"{SYSTEM_PROMPT}\n\nKnowledge base:\n{knowledge}",
        },
        *[message.model_dump() for message in payload.messages[-12:]],
    ]

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.openrouter_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": settings.openrouter_model,
                    "messages": messages,
                },
            )
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Upstream request failed: {exc}") from exc

    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail=response.text)

    data = response.json()
    try:
        reply = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise HTTPException(status_code=502, detail="Unexpected OpenRouter response") from exc

    return ChatResponse(reply=reply)


def _offline_reply(question: str, knowledge: str) -> str:
    q = question.lower()
    if "project" in q:
        return (
            "Featured projects include Krishi-Sahayak, AI Multi-Agent Travel Planner, "
            "GenAI PDF Assistant, Customer Churn Prediction, AI Virtual Try-On and Smart Parking Management. "
            "Set OPENROUTER_API_KEY for richer LLM answers grounded in the Markdown knowledge base."
        )
    if "experience" in q or "intern" in q:
        return (
            "Pratyush is a Software Consultant Trainee at TuTeck Technologies, and previously interned "
            "at SenseGrid AI Systems and Capsitech IT Services."
        )
    if "who" in q or "pratyush" in q:
        return (
            "Pratyush Basu is an AI/ML Engineer focused on Generative AI, Agentic systems, "
            "Machine Learning and FastAPI backend engineering."
        )
    return (
        "Backend is running in offline mode without OPENROUTER_API_KEY. "
        "I can still share high-level verified facts from the portfolio knowledge base."
    )
