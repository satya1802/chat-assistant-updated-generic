"""Application entrypoint.

Generated from the approved architecture: one router per component that owns
endpoints, one route per endpoint the API spec declares. Every generated route
is a stub that returns a typed placeholder, so the service starts, serves its
OpenAPI document and passes its tests before a single handler is implemented.
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.database import Base, engine

app = FastAPI(
    title="Chat Assistant - Updated Generic",
    description="Chat Assistant - Updated Generic Full-Stack Chatbot Specification Page 1 Chat Assistant Generic Full-Stack AI Chatbot Build Specification - Updated UI + PostgreSQL/pgvector Category Specification Application Type Full-stack conversational AI chatbot with persistent chat history AI Provider Any LLM provider through a pluggable backend adapter; selected by configuration Answer Source Configured LLM general knowledge plus current conversation context Persistence Users, sessions, conversations, messages and settings survive refresh/restart Streaming Token-by-token streaming responses to the UI Reference Stack FastAPI + React/TypeScript + PostgreSQL + pgvector Database Rule PostgreSQL is mandatory. Do not use SQLite in local, test or production environments. Core rule: Every user message and assistant reply is saved on the server before it is shown as final. Conversations belong to the signed-in user and remain available until explicitly deleted. PostgreSQL is the persistent system of record. 1. Product Goal \u007f Build a full-stack AI chatbot called Chat Assistant. Signed-in users hold multi-turn conversations with an LLM, with streaming replies, Markdown rendering and persistent conversation history. \u007f Store users, sessions, conversations, messages and settings in PostgreSQL so application state does not depend on browser memory. \u007f Keep the LLM provider behind a single adapter interface so providers or models can be changed through configuration without frontend or database redesign. \u007f Use pgvector in PostgreSQL as the vector extension so the same database is ready for embeddings/vector search when knowledge-base or RAG functionality is enabled. 2. Authentication and Default Login Field Default Value Login URL http://localhost:5173/login Username admin Password Admin@123 Role Administrator \u007f Before authentication, show only the login page. Do not show the dashboard sidebar, chat history, admin navigation, settings, or any authenticated application content. \u007f After",
    version="0.1.0",
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The scaffold ships no migrations, so the tables are created from the models on
# startup. Replace this with Alembic before anything holds data worth keeping.
Base.metadata.create_all(bind=engine)


@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe, and the only route here that is not a stub."""
    return {"status": "ok"}
