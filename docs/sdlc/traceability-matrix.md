# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Standalone login page before authentication | US-001, US-001-T1, US-001-T2, US-001-T3 | 1 | frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Sign in and reach the dashboard | US-002, US-002-T1, US-002-T2, US-002-T3, US-002-T4 | 2 | GET /auth/me, POST /auth/login, backend_api, database, frontend, sessions, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Session survives refresh, with Remember me extending its life | US-003, US-003-T1, US-003-T2, US-003-T3 | 3 | GET /auth/me, backend_api, frontend, sessions | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-004 | EPIC-001 | Protected routes redirect logged-out visitors | US-004, US-004-T1, US-004-T2, US-004-T3 | 2 | GET /auth/me, frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-001 | Log out back to the standalone login page | US-005, US-005-T1, US-005-T2, US-005-T3 | 2 | POST /auth/logout, backend_api, frontend, sessions | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-001 | Generic sign-in errors and failed-attempt lockout | US-006, US-006-T1, US-006-T2, US-006-T3, US-006-T4 | 3 | POST /auth/login, backend_api, database, login_attempts, users | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-007 | EPIC-001 | Seeded administrator account for first sign-in | US-007, US-007-T1, US-007-T2, US-007-T3 | 1 | backend_api, database, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-001 | Forced password change on first sign-in | US-008, US-008-T1, US-008-T2, US-008-T3 | 4 | POST /auth/change-password, backend_api, frontend, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-001 | Change my own password from the signed-in account | US-009, US-009-T1, US-009-T2 | 3 | POST /auth/change-password, backend_api, frontend, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-002 | Role-aware dashboard shell with branding and navigation | US-010, US-010-T1, US-010-T2, US-010-T3, US-010-T4 | 4 | GET /auth/me, frontend | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-011 | EPIC-002 | Light and dark theme | US-011, US-011-T1, US-011-T2, US-011-T3 | 5 | frontend, settings | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-002 | Responsive layout on narrow screens | US-012, US-012-T1, US-012-T2, US-012-T3 | 5 | frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-002 | Knowledge Base placeholder page | US-013, US-013-T1, US-013-T2 | 4 | frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-003 | Send a message and receive a streamed reply | US-014, US-014-T1, US-014-T2, US-014-T3, US-014-T4 | 6 | POST /chat, backend_api, conversations, database, frontend, gemini, llm_adapter, messages | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-015 | EPIC-003 | Messages persisted server-side before being shown as final | US-015, US-015-T1, US-015-T2, US-015-T3 | 6 | POST /chat, backend_api, database, frontend, messages | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-016 | EPIC-003 | Stop generating a streaming reply | US-016, US-016-T1, US-016-T2, US-016-T3 | 7 | POST /chat, backend_api, frontend, messages | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-017 | EPIC-003 | Markdown replies with copy-able code blocks | US-017, US-017-T1, US-017-T2, US-017-T3 | 7 | frontend, messages | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-018 | EPIC-003 | Message composer with Enter to send | US-018, US-018-T1, US-018-T2, US-018-T3 | 6 | frontend | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-019 | EPIC-003 | History trimmed to the context window with system prompt prepended | US-019, US-019-T1, US-019-T2, US-019-T3 | 6 | POST /chat, backend_api, llm_adapter, messages, settings | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-020 | EPIC-003 | Failure during generation keeps data intact and offers Retry | US-020, US-020-T1, US-020-T2, US-020-T3, US-020-T4 | 7 | POST /chat, backend_api, frontend, llm_adapter, messages | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-021 | EPIC-003 | Per-user chat rate limiting | US-021, US-021-T1, US-021-T2, US-021-T3 | 7 | POST /chat, backend_api | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-022 | EPIC-004 | Start a new conversation | US-022, US-022-T1, US-022-T2, US-022-T3 | 4 | POST /conversations, backend_api, conversations, database, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-023 | EPIC-004 | Conversation titled automatically from the first message | US-023, US-023-T1, US-023-T2 | 7 | backend_api, conversations | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-024 | EPIC-004 | Conversation list ordered newest-updated first | US-024, US-024-T1, US-024-T2, US-024-T3 | 5 | GET /conversations, backend_api, conversations, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-025 | EPIC-004 | Rename a conversation | US-025, US-025-T1, US-025-T2 | 5 | PATCH /conversations/{id}, backend_api, conversations, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-026 | EPIC-004 | Explicitly delete a conversation | US-026, US-026-T1, US-026-T2, US-026-T3 | 5 | DELETE /conversations/{id}, backend_api, conversations, frontend, messages | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-027 | EPIC-004 | History survives refresh, browser reopen and backend restart | US-027, US-027-T1, US-027-T2, US-027-T3 | 8 | GET /conversations, GET /conversations/{id}, backend_api, conversations, database, frontend, messages | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-028 | EPIC-004 | Conversations are private to their owner | US-028, US-028-T1, US-028-T2, US-028-T3 | 5 | DELETE /conversations/{id}, GET /conversations/{id}, PATCH /conversations/{id}, POST /chat, backend_api, conversations, messages | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-029 | EPIC-005 | PostgreSQL only, with pgvector enabled | US-029, US-029-T1, US-029-T2, US-029-T3 | 1 | database | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-030 | EPIC-005 | Versioned migrations for the full schema including vector-ready columns | US-030, US-030-T1, US-030-T2, US-030-T3 | 1 | audit_logs, backend_api, conversations, database, login_attempts, messages, sessions, settings, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-031 | EPIC-005 | Gemini configured through a backend-only adapter | US-031, US-031-T1, US-031-T2, US-031-T3, US-031-T4 | 2 | backend_api, gemini, llm_adapter | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-032 | EPIC-005 | Health endpoint reporting database and provider reachability | US-032, US-032-T1, US-032-T2, US-032-T3 | 4 | GET /health, backend_api, database, gemini | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-033 | EPIC-005 | Platform security controls for the web app | US-033, US-033-T1, US-033-T2, US-033-T3 | 3 | DELETE /conversations/{id}, PATCH /conversations/{id}, POST /auth/change-password, POST /auth/login, POST /chat, backend_api, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-034 | EPIC-005 | Automated tests proving the mandatory acceptance behaviour | US-034, US-034-T1, US-034-T2, US-034-T3, US-034-T4, US-034-T5 | 8 | GET /auth/me, GET /conversations, POST /auth/login, POST /auth/logout, POST /chat, backend_api, conversations, database, frontend, login_attempts, messages, sessions, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-035 | EPIC-005 | Setup, configuration and API reference documentation | US-035, US-035-T1, US-035-T2, US-035-T3 | 8 | DELETE /conversations/{id}, GET /auth/me, GET /conversations, GET /conversations/{id}, GET /health, PATCH /conversations/{id}, POST /auth/change-password, POST /auth/login, POST /auth/logout, POST /chat, POST /conversations, backend_api, database, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
<!-- sdlc:auto:end matrix -->
