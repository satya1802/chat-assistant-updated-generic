# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-001 · approved · source: dev:plan v1

Approved delivery plan v1: 8 sprints at 20-point capacity each, sequencing data foundation through chat core, resilience, and release hardening.

- Sprint 1: establish PostgreSQL+pgvector data foundation, run initial schema migrations, seed admin account, ship standalone login page UI.
- Sprint 2: wire up the Gemini provider adapter; deliver working username/password sign-in with logout and protected-route redirects.
- Sprint 3: harden authentication -- session expiry/remember-me, lockout and generic errors, CSRF/CORS, self-service password change.
- Sprint 4: authenticated dashboard shell, forced first-login password change, new-conversation creation, health endpoint, Knowledge Base placeholder.
- Sprint 5: dashboard theming and responsive layout; conversation management -- listing, rename, delete, ownership privacy.
- Sprint 6: core multi-turn chat -- streamed Gemini replies, persisted messages, context-window trimming, composer.
- Sprint 7: chat resilience and polish -- stop generating, Markdown with copyable code, failure/retry, rate limiting, auto-titles.
- Sprint 8: verify history durability across restarts, complete automated acceptance test suite, finalize setup/config/API docs.
Note: plan and backlog were provided; no implementation-completion status, commit history, or build results were included in this input.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005

### DEV-EPIC-001 · draft · source: dev:backlog EPIC-001

Planned backlog for Authentication and the Two-State Experience, split into 9 stories and their tasks across frontend-agent, backend-agent and qa-agent.

- US-001 (3 pts, frontend-agent): login page UI, pre-auth isolation, Forgot Password modal.
- US-002 (5 pts, backend-agent): POST /auth/login, GET /auth/me, session cookie issuance, frontend login wiring.
- US-003 (5 pts, backend-agent): remember_me expiry handling, session validation middleware, restore session/conversation on load.
- US-004 (3 pts, frontend-agent): auth context/provider, protected route guard, neutral loading state.
- US-005 (2 pts, backend-agent): POST /auth/logout, clear cookie, wire logout control.
- US-006 (5 pts, backend-agent): record login attempts, lockout logic, generic error messaging, lockout/reset tests (qa-agent).
- US-007 (3 pts, backend-agent): startup seed check, env-driven credentials, secrets wiring (devops-agent).
- US-008 (5 pts, backend-agent): must_change_password gating, forced change-password screen (frontend-agent), password strength validation.
- US-009 (3 pts, backend-agent): POST /auth/change-password, Settings change-password form (frontend-agent).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009

### DEV-EPIC-002 · draft · source: dev:backlog EPIC-002

Planned backlog for the Authenticated Dashboard Shell, 4 stories handled by frontend-agent.

- US-010 (5 pts): top bar, persistent sidebar nav, role-aware Users nav item, chat workspace empty state.
- US-011 (3 pts): theme context, theme toggle in Settings, persist theme choice.
- US-012 (3 pts): responsive breakpoint styles, sidebar toggle behavior, full-width chat pane on narrow screens.
- US-013 (2 pts): Knowledge Base placeholder page, sidebar route wiring.

**Related:** US-010, US-011, US-012, US-013

### DEV-EPIC-003 · draft · source: dev:backlog EPIC-003

Planned backlog for Multi-Turn Chat with Streaming Replies, 8 stories across backend-agent, integration-agent, frontend-agent, qa-agent and security-agent.

- US-014 (8 pts, integration-agent): POST /chat handling (backend-agent), stream Gemini tokens via adapter, persist completed assistant message (backend-agent), frontend SSE consumer.
- US-015 (3 pts, backend-agent): transactional commit guarantee, direct-DB persistence test and reopen-after-close verification (qa-agent).
- US-016 (5 pts, backend-agent): server-side stream cancellation, persist stopped/incomplete status, Stop generating control (frontend-agent).
- US-017 (5 pts, frontend-agent): sanitized Markdown renderer, copy button on code blocks, sanitisation verification (security-agent).
- US-018 (3 pts, frontend-agent): Enter/Shift+Enter handling, streaming state disable, empty-message guard.
- US-019 (5 pts, backend-agent): history trimming, prepend system prompt, read global LLM config.
- US-020 (5 pts, backend-agent): pre-stream failure handling, secret-safe error surfacing (security-agent), Retry action (frontend-agent), mid-stream failure handling.
- US-021 (3 pts, backend-agent): per-user rate limiter, slow-down response, rate-limit reset test (qa-agent).

**Related:** US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021

### DEV-EPIC-004 · draft · source: dev:backlog EPIC-004

Planned backlog for Conversations and Persistent History, 7 stories across backend-agent, frontend-agent, qa-agent and security-agent.

- US-022 (5 pts, backend-agent): POST /conversations, New Chat action (frontend-agent), defer persistence until first message.
- US-023 (2 pts, backend-agent): title derivation, prevent overwrite.
- US-024 (3 pts, backend-agent): GET /conversations ordering, refresh updated_at on activity, sidebar ordering UI (frontend-agent).
- US-025 (2 pts, backend-agent): PATCH /conversations/{id}, rename UI control (frontend-agent).
- US-026 (3 pts, backend-agent): DELETE /conversations/{id}, delete confirmation dialog and post-delete state update (frontend-agent).
- US-027 (3 pts, qa-agent): refresh/reopen repopulation test, backend restart survival test, no client-storage reliance (frontend-agent).
- US-028 (3 pts, backend-agent): ownership enforcement, non-disclosure on denial, cross-user access tests (security-agent).

**Related:** US-022, US-023, US-024, US-025, US-026, US-027, US-028

### DEV-EPIC-005 · draft · source: dev:backlog EPIC-005

Planned backlog for Data Platform, Security Foundations and Delivery Readiness, 7 stories across devops-agent, backend-agent, integration-agent, security-agent and qa-agent.

- US-029 (5 pts, devops-agent): provision PostgreSQL+pgvector, standardize DATABASE_URL, verify extension (backend-agent).
- US-030 (5 pts, backend-agent): full schema migration, vector-ready embedding column, non-destructive re-apply check.
- US-031 (8 pts, integration-agent): define adapter interface, implement Gemini adapter, timeout/retry-backoff, secret exposure audit (security-agent).
- US-032 (2 pts, backend-agent): DB reachability check, provider reachability check, degraded-status response.
- US-033 (5 pts, security-agent): CSRF protection, CORS allow-list, password hashing audit.
- US-034 (8 pts, qa-agent): test infrastructure, auth flow tests, chat and persistence tests, failure and lockout tests, CI release gate (devops-agent).
- US-035 (3 pts, devops-agent): setup documentation, configuration reference (backend-agent), API reference (backend-agent).

**Related:** US-029, US-030, US-031, US-032, US-033, US-034, US-035
<!-- sdlc:auto:end narrative -->
