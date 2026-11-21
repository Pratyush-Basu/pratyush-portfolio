import os
from functools import lru_cache


class Settings:
    def __init__(self) -> None:
        self.openrouter_api_key = os.getenv("OPENROUTER_API_KEY", "")
        self.openrouter_model = os.getenv(
            "OPENROUTER_MODEL",
            "openai/gpt-4o-mini",
        )
        origins = os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000",
        )
        self.cors_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
