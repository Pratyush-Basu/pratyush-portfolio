from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.chat import router as chat_router
from app.settings import get_settings

load_dotenv()

settings = get_settings()

app = FastAPI(
    title="Pratyush AI Backend",
    version="0.1.0",
    description="Portfolio chatbot API powered by OpenRouter + Markdown knowledge base.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")


@app.get("/health")
def health() -> dict[str, str]:
    knowledge = Path(__file__).resolve().parents[1] / "knowledge" / "portfolio.md"
    return {
        "status": "ok",
        "knowledge_base": "present" if knowledge.exists() else "missing",
    }
