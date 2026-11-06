<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-16

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Its async model keeps long-lived SSE streaming connections cheap and maps cleanly onto the mandated flow (validate, persist, trim, prepend system prompt, call adapter, stream, persist). The Gemini/OpenAI/Anthropic Python SDKs make the swap-by-configuration adapter realistic.

## Consequences

Streaming cancellation and server-side session management are hand-rolled rather than framework batteries-included, which is acceptable for this lightweight scope.
<!-- sdlc:auto:end adr -->