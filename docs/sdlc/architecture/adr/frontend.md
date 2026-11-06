<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-16

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because A single app shell validates the session and then decides whether to render only the centred login card or the full dashboard, satisfying the strict two-state rule with no protected markup shipped early. Handles token-by-token SSE rendering, Markdown, Stop and theme entirely client-side.

## Consequences

Client-side rendering means the shell must show a neutral loading state while the session is resolved; protected content is never server-rendered, which is exactly what this app wants.
<!-- sdlc:auto:end adr -->