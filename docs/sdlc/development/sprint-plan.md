# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Establish the PostgreSQL+pgvector data foundation, run initial schema migrations, seed the administrator account, and ship the standalone login page UI.

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Standalone login page before authentication | 3 | frontend-agent | — |
| ↳ US-001-T1 | Task | Build login page UI | — | frontend-agent | — |
| ↳ US-001-T2 | Task | Enforce pre-auth isolation | — | frontend-agent | — |
| ↳ US-001-T3 | Task | Forgot Password instructional modal | — | frontend-agent | — |
| US-007 | Story | Seeded administrator account for first sign-in | 3 | backend-agent | US-030 |
| ↳ US-007-T1 | Task | Startup seed check | — | backend-agent | — |
| ↳ US-007-T2 | Task | Env-driven credentials | — | backend-agent | — |
| ↳ US-007-T3 | Task | Secrets wiring | — | devops-agent | — |
| US-029 | Story | PostgreSQL only, with pgvector enabled | 5 | devops-agent | — |
| ↳ US-029-T1 | Task | Provision PostgreSQL + pgvector | — | devops-agent | — |
| ↳ US-029-T2 | Task | Standardize DATABASE_URL | — | devops-agent | — |
| ↳ US-029-T3 | Task | Verify extension | — | backend-agent | — |
| US-030 | Story | Versioned migrations for the full schema including vector-ready columns | 5 | backend-agent | US-029 |
| ↳ US-030-T1 | Task | Full schema migration | — | backend-agent | — |
| ↳ US-030-T2 | Task | Vector-ready embedding column | — | backend-agent | — |
| ↳ US-030-T3 | Task | Non-destructive re-apply check | — | backend-agent | — |

## Sprint 2: Sprint 2

Wire up the Gemini provider adapter and deliver working username/password sign-in with logout and protected-route redirects.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-002 | Story | Sign in and reach the dashboard | 5 | backend-agent | US-001, US-030 |
| ↳ US-002-T1 | Task | Implement POST /auth/login | — | backend-agent | — |
| ↳ US-002-T2 | Task | Implement GET /auth/me | — | backend-agent | — |
| ↳ US-002-T3 | Task | Issue HTTP-only Secure SameSite session cookie | — | backend-agent | — |
| ↳ US-002-T4 | Task | Wire frontend login flow | — | frontend-agent | — |
| US-004 | Story | Protected routes redirect logged-out visitors | 3 | frontend-agent | US-002 |
| ↳ US-004-T1 | Task | Auth context/provider | — | frontend-agent | — |
| ↳ US-004-T2 | Task | Protected route guard | — | frontend-agent | — |
| ↳ US-004-T3 | Task | Neutral loading state | — | frontend-agent | — |
| US-005 | Story | Log out back to the standalone login page | 2 | backend-agent | US-002 |
| ↳ US-005-T1 | Task | Implement POST /auth/logout | — | backend-agent | — |
| ↳ US-005-T2 | Task | Clear session cookie | — | backend-agent | — |
| ↳ US-005-T3 | Task | Wire logout control | — | frontend-agent | — |
| US-031 | Story | Gemini configured through a backend-only adapter | 8 | integration-agent | US-029 |
| ↳ US-031-T1 | Task | Define adapter interface | — | integration-agent | — |
| ↳ US-031-T2 | Task | Implement Gemini adapter | — | integration-agent | — |
| ↳ US-031-T3 | Task | Timeout and retry/backoff | — | integration-agent | — |
| ↳ US-031-T4 | Task | Secret exposure audit | — | security-agent | — |

## Sprint 3: Sprint 3

Harden authentication: session expiry/remember-me, lockout and generic errors, platform security controls (CSRF/CORS), and self-service password change.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-003 | Story | Session survives refresh, with Remember me extending its life | 5 | backend-agent | US-002 |
| ↳ US-003-T1 | Task | Add remember_me expiry handling | — | backend-agent | — |
| ↳ US-003-T2 | Task | Session validation middleware | — | backend-agent | — |
| ↳ US-003-T3 | Task | Restore session and conversation on load | — | frontend-agent | — |
| US-006 | Story | Generic sign-in errors and failed-attempt lockout | 5 | backend-agent | US-002 |
| ↳ US-006-T1 | Task | Record login attempts | — | backend-agent | — |
| ↳ US-006-T2 | Task | Lockout logic | — | backend-agent | — |
| ↳ US-006-T3 | Task | Generic error messaging | — | backend-agent | — |
| ↳ US-006-T4 | Task | Lockout/reset tests | — | qa-agent | — |
| US-009 | Story | Change my own password from the signed-in account | 3 | backend-agent | US-002 |
| ↳ US-009-T1 | Task | Implement POST /auth/change-password | — | backend-agent | — |
| ↳ US-009-T2 | Task | Settings change-password form | — | frontend-agent | — |
| US-033 | Story | Platform security controls for the web app | 5 | security-agent | US-002, US-029 |
| ↳ US-033-T1 | Task | CSRF protection | — | security-agent | — |
| ↳ US-033-T2 | Task | CORS allow-list | — | security-agent | — |
| ↳ US-033-T3 | Task | Password hashing audit | — | security-agent | — |

## Sprint 4: Sprint 4

Deliver the authenticated dashboard shell, forced first-login password change, new-conversation creation, the health endpoint, and the Knowledge Base placeholder.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | Forced password change on first sign-in | 5 | backend-agent | US-007, US-002 |
| ↳ US-008-T1 | Task | must_change_password gating | — | backend-agent | — |
| ↳ US-008-T2 | Task | Forced change-password screen | — | frontend-agent | — |
| ↳ US-008-T3 | Task | Password strength validation | — | backend-agent | — |
| US-010 | Story | Role-aware dashboard shell with branding and navigation | 5 | frontend-agent | US-002 |
| ↳ US-010-T1 | Task | Top bar | — | frontend-agent | — |
| ↳ US-010-T2 | Task | Persistent sidebar nav | — | frontend-agent | — |
| ↳ US-010-T3 | Task | Role-aware Users nav item | — | frontend-agent | — |
| ↳ US-010-T4 | Task | Chat workspace empty state | — | frontend-agent | — |
| US-013 | Story | Knowledge Base placeholder page | 2 | frontend-agent | US-010 |
| ↳ US-013-T1 | Task | Knowledge Base placeholder page | — | frontend-agent | — |
| ↳ US-013-T2 | Task | Wire sidebar route | — | frontend-agent | — |
| US-022 | Story | Start a new conversation | 5 | backend-agent | US-002 |
| ↳ US-022-T1 | Task | Implement POST /conversations | — | backend-agent | — |
| ↳ US-022-T2 | Task | New Chat action | — | frontend-agent | — |
| ↳ US-022-T3 | Task | Defer persistence until first message | — | backend-agent | — |
| US-032 | Story | Health endpoint reporting database and provider reachability | 2 | backend-agent | US-029, US-031 |
| ↳ US-032-T1 | Task | DB reachability check | — | backend-agent | — |
| ↳ US-032-T2 | Task | Provider reachability check | — | backend-agent | — |
| ↳ US-032-T3 | Task | Degraded-status response | — | backend-agent | — |

## Sprint 5: Sprint 5

Round out the dashboard with theming and responsive layout, and complete conversation management: listing, rename, delete, and ownership privacy.

Capacity: 20 points · Committed: 17

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-011 | Story | Light and dark theme | 3 | frontend-agent | US-010 |
| ↳ US-011-T1 | Task | Theme context | — | frontend-agent | — |
| ↳ US-011-T2 | Task | Theme toggle in Settings | — | frontend-agent | — |
| ↳ US-011-T3 | Task | Persist theme choice | — | frontend-agent | — |
| US-012 | Story | Responsive layout on narrow screens | 3 | frontend-agent | US-010 |
| ↳ US-012-T1 | Task | Responsive breakpoint styles | — | frontend-agent | — |
| ↳ US-012-T2 | Task | Sidebar toggle behavior | — | frontend-agent | — |
| ↳ US-012-T3 | Task | Full-width chat pane on narrow screens | — | frontend-agent | — |
| US-024 | Story | Conversation list ordered newest-updated first | 3 | backend-agent | US-022 |
| ↳ US-024-T1 | Task | Implement GET /conversations ordering | — | backend-agent | — |
| ↳ US-024-T2 | Task | Refresh updated_at on activity | — | backend-agent | — |
| ↳ US-024-T3 | Task | Sidebar ordering/reorder UI | — | frontend-agent | — |
| US-025 | Story | Rename a conversation | 2 | backend-agent | US-022 |
| ↳ US-025-T1 | Task | Implement PATCH /conversations/{id} | — | backend-agent | — |
| ↳ US-025-T2 | Task | Rename UI control | — | frontend-agent | — |
| US-026 | Story | Explicitly delete a conversation | 3 | backend-agent | US-022 |
| ↳ US-026-T1 | Task | Implement DELETE /conversations/{id} | — | backend-agent | — |
| ↳ US-026-T2 | Task | Delete confirmation dialog | — | frontend-agent | — |
| ↳ US-026-T3 | Task | Post-delete state update | — | frontend-agent | — |
| US-028 | Story | Conversations are private to their owner | 3 | backend-agent | US-022 |
| ↳ US-028-T1 | Task | Ownership enforcement | — | backend-agent | — |
| ↳ US-028-T2 | Task | Non-disclosure on denial | — | backend-agent | — |
| ↳ US-028-T3 | Task | Cross-user access tests | — | security-agent | — |

## Sprint 6: Sprint 6

Deliver the core multi-turn chat experience: streamed Gemini replies, persisted messages, context-window trimming, and the message composer.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-014 | Story | Send a message and receive a streamed reply | 8 | integration-agent | US-022, US-031 |
| ↳ US-014-T1 | Task | Implement POST /chat request handling | — | backend-agent | — |
| ↳ US-014-T2 | Task | Stream Gemini tokens via adapter | — | integration-agent | — |
| ↳ US-014-T3 | Task | Persist completed assistant message | — | backend-agent | — |
| ↳ US-014-T4 | Task | Frontend SSE consumer | — | frontend-agent | — |
| US-015 | Story | Messages persisted server-side before being shown as final | 3 | backend-agent | US-014 |
| ↳ US-015-T1 | Task | Transactional commit guarantee | — | backend-agent | — |
| ↳ US-015-T2 | Task | Direct-DB persistence test | — | qa-agent | — |
| ↳ US-015-T3 | Task | Reopen-after-close verification | — | qa-agent | — |
| US-018 | Story | Message composer with Enter to send | 3 | frontend-agent | US-014, US-010 |
| ↳ US-018-T1 | Task | Enter/Shift+Enter handling | — | frontend-agent | — |
| ↳ US-018-T2 | Task | Streaming state disable | — | frontend-agent | — |
| ↳ US-018-T3 | Task | Empty-message guard | — | frontend-agent | — |
| US-019 | Story | History trimmed to the context window with system prompt prepended | 5 | backend-agent | US-014 |
| ↳ US-019-T1 | Task | History trimming | — | backend-agent | — |
| ↳ US-019-T2 | Task | Prepend system prompt | — | backend-agent | — |
| ↳ US-019-T3 | Task | Read global LLM config | — | backend-agent | — |

## Sprint 7: Sprint 7

Add chat resilience and polish: stop generating, Markdown rendering with copyable code, failure/retry handling, rate limiting, and auto-generated titles.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Stop generating a streaming reply | 5 | backend-agent | US-014 |
| ↳ US-016-T1 | Task | Server-side stream cancellation | — | backend-agent | — |
| ↳ US-016-T2 | Task | Persist stopped/incomplete status | — | backend-agent | — |
| ↳ US-016-T3 | Task | Stop generating control | — | frontend-agent | — |
| US-017 | Story | Markdown replies with copy-able code blocks | 5 | frontend-agent | US-014 |
| ↳ US-017-T1 | Task | Sanitized Markdown renderer | — | frontend-agent | — |
| ↳ US-017-T2 | Task | Copy button on code blocks | — | frontend-agent | — |
| ↳ US-017-T3 | Task | Verify sanitisation | — | security-agent | — |
| US-020 | Story | Failure during generation keeps data intact and offers Retry | 5 | backend-agent | US-014 |
| ↳ US-020-T1 | Task | Pre-stream failure handling | — | backend-agent | — |
| ↳ US-020-T2 | Task | Secret-safe error surfacing | — | security-agent | — |
| ↳ US-020-T3 | Task | Retry action | — | frontend-agent | — |
| ↳ US-020-T4 | Task | Mid-stream failure handling | — | backend-agent | — |
| US-021 | Story | Per-user chat rate limiting | 3 | backend-agent | US-014 |
| ↳ US-021-T1 | Task | Per-user rate limiter | — | backend-agent | — |
| ↳ US-021-T2 | Task | Slow-down response | — | backend-agent | — |
| ↳ US-021-T3 | Task | Rate-limit reset test | — | qa-agent | — |
| US-023 | Story | Conversation titled automatically from the first message | 2 | backend-agent | US-022, US-014 |
| ↳ US-023-T1 | Task | Title derivation | — | backend-agent | — |
| ↳ US-023-T2 | Task | Prevent overwrite | — | backend-agent | — |

## Sprint 8: Sprint 8

Verify history durability across restarts, complete the automated acceptance test suite, and finalize setup/configuration/API documentation.

Capacity: 20 points · Committed: 14

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-027 | Story | History survives refresh, browser reopen and backend restart | 3 | qa-agent | US-022, US-024 |
| ↳ US-027-T1 | Task | Refresh/reopen repopulation test | — | qa-agent | — |
| ↳ US-027-T2 | Task | Backend restart survival test | — | qa-agent | — |
| ↳ US-027-T3 | Task | No client-storage reliance | — | frontend-agent | — |
| US-034 | Story | Automated tests proving the mandatory acceptance behaviour | 8 | qa-agent | US-002, US-014, US-022, US-028, US-029, US-030, US-031, US-006 |
| ↳ US-034-T1 | Task | Test infrastructure | — | qa-agent | — |
| ↳ US-034-T2 | Task | Auth flow tests | — | qa-agent | — |
| ↳ US-034-T3 | Task | Chat and persistence tests | — | qa-agent | — |
| ↳ US-034-T4 | Task | Failure and lockout tests | — | qa-agent | — |
| ↳ US-034-T5 | Task | CI release gate | — | devops-agent | — |
| US-035 | Story | Setup, configuration and API reference documentation | 3 | devops-agent | US-029, US-030, US-031 |
| ↳ US-035-T1 | Task | Setup documentation | — | devops-agent | — |
| ↳ US-035-T2 | Task | Configuration reference | — | backend-agent | — |
| ↳ US-035-T3 | Task | API reference | — | backend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
