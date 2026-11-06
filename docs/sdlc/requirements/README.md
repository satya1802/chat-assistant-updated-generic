# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:technology stack

Product owner mandated an exact technology stack; no substitutions permitted.

- Backend: FastAPI 0.115 -- matches the mandated chat flow (validate, persist, trim, prepend system prompt, call adapter, stream SSE, persist); async handling keeps streaming cheap for a team of 5-50; first-class Gemini/OpenAI/Anthropic SDKs enable the swap-by-configuration adapter.
- Cloud: AWS -- containerised FastAPI + built React app plus RDS for PostgreSQL with pgvector enabled by one extension command; managed backups/point-in-time restore since the DB is the only copy of conversations; Secrets Manager keeps LLM_API_KEY and SESSION_SECRET backend-only.
- Database: PostgreSQL 16 -- backbone of the persist-before-final rule; one database for users, sessions, conversations, messages, settings, login attempts, audit logs; carries pgvector for free embedding columns until Knowledge Base ships.
- Frontend: React 19 -- fits the two-state (login-only vs full dashboard) app-shell model; handles token streaming, Stop/Regenerate/Edit-and-resend (later two out of MVP scope) and theming client-side.

**Related:** EPIC-005

### REQ-SERVICES · approved · source: requirements:runtime_needs

Approved external/runtime services: Google Gemini as the chat provider and pgvector for vector-readiness.

- AI provider: Google Gemini (SaaS, env GEMINI_API_KEY) -- default per LLM_PROVIDER=gemini; key stays backend-only; adapter lets provider/model be switched via configuration.
- Vector store: pgvector inside PostgreSQL (known) -- vector-readiness only; embedding columns ship with Alembic migrations now, no extra service until Knowledge Base is enabled.
- Required API key: GEMINI_API_KEY.

**Related:** EPIC-003, EPIC-005

### REQ-SCOPE · approved · source: requirements:scope

Lightweight MVP delivery scope (requirements v1): in-scope capabilities and explicit exclusions.

In scope: standalone login; multi-turn chat with Gemini; token-by-token streaming; server-side persist-before-final for every message; history surviving refresh/reopen/restart; conversation sidebar with New Chat/rename/delete; Markdown with copyable code; Enter-to-send composer (Shift+Enter newline); context-window history trimming with prepended system prompt; Stop generating; dashboard shell with branding/user controls/sidebar; seeded admin account; self-service change password; logged-out redirect to login; Knowledge Base placeholder with vector-ready storage; versioned migrations; setup/config/API docs; backend-only Gemini key; SSE streaming on /chat; auto-generated conversation titles; newest-updated-first ordering; 8h sessions extended to 30 days with Remember me; no payments/subscriptions.
Out of scope: document upload and RAG retrieval with citations; public self-registration and self-service email password reset; native mobile/desktop apps; voice input/output, image generation, file/image attachments in chat.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005

### EPIC-001 · approved · source: requirements:EPIC-001

Username/password sign-in for a closed internal user base, with a strictly isolated login page pre-auth and full dashboard only post-auth.

Covers seeded admin account, server-side sessions, forced first-login password change, self-service change-password, lockout, generic sign-in errors.
Assumptions: sessions stored server-side in PostgreSQL with HttpOnly/Secure/SameSite cookie (8h default, 30d with Remember me); no public self-registration/self-service reset email -- Forgot Password raises a request for an admin; at Lightweight MVP scope the admin Users page and admin LLM settings page are not built -- seeded admin is the entry point, further accounts provisioned out-of-band; must_change_password and role field are shipped now so admin provisioning can be added without schema change.
Stories:
- US-001 [critical] Standalone login page before authentication (AC-001..AC-003)
- US-002 [critical] Sign in and reach the dashboard (AC-004..AC-006)
- US-003 [high] Session survives refresh, Remember me extends life (AC-007..AC-010)
- US-004 [critical] Protected routes redirect logged-out visitors (AC-011..AC-012)
- US-005 [high] Log out back to the standalone login page (AC-013..AC-014)
- US-006 [critical] Generic sign-in errors and failed-attempt lockout -- 5 failures/15 min (AC-015..AC-018)
- US-007 [critical] Seeded administrator account (admin/Admin@123) for first sign-in (AC-019..AC-021)
- US-008 [high] Forced password change on first sign-in (AC-022..AC-024)
- US-009 [high] Change own password from Settings (AC-025..AC-027)

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009

### EPIC-002 · approved · source: requirements:EPIC-002

Post-login application shell: top bar, persistent sidebar, light/dark theme, responsive layout, Knowledge Base placeholder.

Assumptions: sidebar collapses on narrow screens -- responsive web is the mobile experience, no native app; Users nav item shown only to administrators and links to a placeholder (admin user management deferred); Settings offers theme and change-password only -- admin-only global LLM config (provider/model/temperature/max tokens/system prompt/history window) deferred to backend env configuration.
Stories:
- US-010 [critical] Role-aware dashboard shell with branding and navigation (AC-028..AC-031)
- US-011 [medium] Light and dark theme (AC-032..AC-033)
- US-012 [medium] Responsive layout on narrow screens (AC-034..AC-035)
- US-013 [medium] Knowledge Base placeholder page, no upload/retrieval UI (AC-036..AC-037)

**Related:** US-010, US-011, US-012, US-013

### EPIC-003 · approved · source: requirements:EPIC-003

Core multi-turn chat experience: send, stream token-by-token from Gemini via adapter, render Markdown with copyable code, enforce the mandated persist/trim/prepend flow.

Assumptions: default provider Google Gemini (LLM_PROVIDER=gemini), key backend-only; adapter keeps OpenAI/Anthropic swappable; streaming is SSE over POST /chat; token counts recorded for visibility only, no billing/plan/subscription; Regenerate and Edit-and-resend described in the source spec are NOT in this MVP -- only Stop generating and Retry after failure ship.
Stories:
- US-014 [critical] Send a message and receive a streamed reply (AC-038..AC-041)
- US-015 [critical] Messages persisted server-side before shown as final (AC-042..AC-044)
- US-016 [high] Stop generating a streaming reply (AC-045..AC-047)
- US-017 [high] Markdown replies with copy-able code blocks, sanitised against script/HTML injection (AC-048..AC-050)
- US-018 [high] Composer: Enter to send, Shift+Enter newline, disabled while streaming, empty-message guard (AC-051..AC-054)
- US-019 [high] History trimmed to context window with system prompt prepended; provider/model/temperature/etc. read from backend config (admin UI deferred) (AC-055..AC-058)
- US-020 [critical] Failure during generation keeps data intact and offers Retry; no secrets ever surfaced (AC-059..AC-062)
- US-021 [medium] Per-user chat rate limiting (AC-063..AC-064)

**Related:** US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021

### EPIC-004 · approved · source: requirements:EPIC-004

Private, permanently stored conversations per user: creation, auto-titling, ordering, rename, explicit delete, durability, ownership enforcement.

Assumptions: titles auto-generated from first user message, renamable by owner; sidebar orders newest-updated first; only explicit delete removes a conversation and its messages.
Stories:
- US-022 [critical] Start a new conversation; no empty conversations persisted until first message (AC-065..AC-067)
- US-023 [high] Conversation titled automatically from first message, not overwritten later (AC-068..AC-069)
- US-024 [high] Conversation list ordered newest-updated first (AC-070..AC-072)
- US-025 [medium] Rename a conversation, empty titles rejected (AC-073..AC-075)
- US-026 [high] Explicitly delete a conversation with confirmation (AC-076..AC-078)
- US-027 [critical] History survives refresh, browser reopen and backend restart, independent of localStorage/sessionStorage (AC-079..AC-082)
- US-028 [critical] Conversations are private to their owner; ownership validated server-side only (AC-083..AC-085)

**Related:** US-022, US-023, US-024, US-025, US-026, US-027, US-028

### EPIC-005 · approved · source: requirements:EPIC-005

PostgreSQL + pgvector foundation, versioned migrations with vector-ready columns, backend-only provider configuration, health endpoint, platform security, docs, automated test suite.

Assumptions: containerised web app (FastAPI + built React) against managed PostgreSQL with pgvector; localhost URLs in the source spec are dev defaults; Gemini default via backend-only LLM_PROVIDER/LLM_MODEL/LLM_API_KEY with adapter keeping OpenAI/Anthropic swappable; login attempts recorded and an audit_logs table migrated, but no admin audit-viewer UI at this scope; no payments/plans/subscriptions anywhere.
Stories:
- US-029 [critical] PostgreSQL only, pgvector enabled everywhere, no SQLite (AC-086..AC-088)
- US-030 [critical] Versioned Alembic migrations for full schema incl. vector-ready embedding columns, non-destructive re-apply (AC-089..AC-091)
- US-031 [critical] Gemini configured through backend-only adapter exposing generate()/stream(), timeout+retry/backoff, no key exposure (AC-092..AC-095)
- US-032 [medium] GET /health reports DB and provider reachability without exposing secrets (AC-096..AC-097)
- US-033 [critical] Platform security: CSRF protection, CORS allow-list, bcrypt/Argon2 hashing only (AC-098..AC-100)
- US-034 [high] Automated acceptance test suite against PostgreSQL with mocked provider; failing tests block release (AC-101..AC-103)
- US-035 [medium] Setup, configuration and API reference documentation (AC-104..AC-106)

**Related:** US-029, US-030, US-031, US-032, US-033, US-034, US-035
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-16

**Capabilities in scope:** Standalone login page with username and password sign-in, Multi-turn chat with Google Gemini for the signed-in user, Token-by-token streaming of replies into the chat pane, Every message saved server-side before it is shown as final, History surviving refresh, browser reopen and backend restart, Conversation sidebar with New Chat, rename and explicit delete, Markdown replies with copy-able code blocks, Composer with Enter to send and Shift+Enter for a new line, History trimmed to the context window with system prompt prepended, Stop generating during a streaming reply, Dashboard shell with branding, user controls and sidebar nav, Seeded administrator account for first sign-in, Change own password from the signed-in account, Logged-out visitors redirected from protected pages to login, Knowledge Base placeholder page with vector-ready message storage, Conversation and message schema managed by versioned migrations, Setup, configuration and API reference documentation, Google Gemini as the chat model, API key held backend-only, Streaming delivered as server-sent events over the chat endpoint, Conversation titles auto-generated from the first user message, Conversation list ordered newest-updated first, Sessions of 8 hours, extended to 30 days with "Remember me", No payments or subscriptions — cost on the org's own Gemini account

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | Mandated by your document, and it matches the chat flow you specified step for step: validate, persist the user message, trim history, prepend the system prompt, call the provider adapter, stream tokens over server-sent events, then persist the assistant message. Python's async handling keeps long-lived streaming connections cheap for a team of 5–50, and the Gemini/OpenAI/Anthropic SDKs are all first-class in Python, which is what makes your swap-by-configuration adapter realistic. |
| cloud | AWS | Your deployment picture is a containerised FastAPI + built React app plus a managed PostgreSQL with pgvector available — exactly what RDS for PostgreSQL and a container service give you, with pgvector enabled by a single extension command. Managed backups and point-in-time restore matter here because the database is the only copy of every conversation; browser state is deliberately never the source of truth. Secrets Manager keeps LLM_API_KEY and SESSION_SECRET backend-only, as your spec demands. |
| database | PostgreSQL | Mandated, and it is the backbone of your defining rule: every message saved server-side before it is shown as final, surviving refresh, logout and backend restart. One database holds users, sessions, conversations, messages, settings, login attempts and audit logs, so ownership checks and the five-failures-in-15-minutes lockout are enforced against the same system of record. It also carries pgvector, so the embedding columns you want migrated now cost you nothing until Knowledge Base is switched on. |
| frontend | React | Your specification names React + TypeScript outright, and it is the right fit for what this app actually is: one logged-in workspace, not a public website. The two-state rule you insist on — only a centred login page before authentication, the full sidebar dashboard after — is cleanest when a single app shell decides what to render after the session is validated, with no server-rendered page accidentally shipping protected markup. Token-by-token streaming, Stop/Regenerate/Edit-and-resend and light/dark theming are all plain client-side behaviour here. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Authentication and the Two-State Experience

Username/password sign-in for a closed internal user base, with a strictly isolated login page before authentication and the full dashboard only after it. Covers the seeded administrator account, server-side sessions, forced first-login password change, self-service change-password, lockout and generic sign-in errors.

Assumptions surfaced here: (1) Sessions are stored server-side in PostgreSQL with an HTTP-only / Secure / SameSite cookie, defaulting to 8 hours and extending to 30 days when "Remember me" is ticked. (2) There is no public self-registration and no self-service email password-reset link — the Forgot Password link raises a request for an administrator to resolve. (3) At this Lightweight MVP scope the admin-only Users page for creating accounts and the admin LLM settings page are not built; the seeded administrator is the entry point and additional accounts are provisioned by the administrator out-of-band. The must_change_password mechanism and role field are delivered so admin provisioning can be added without schema change.

### US-001: Standalone login page before authentication

**Priority:** critical

> As a logged-out visitor, I want to see only a standalone Chat Assistant login page, so that no protected application content is exposed before I am authenticated.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I have no valid session | I open /login | a centred login card renders with Chat Assistant branding, a username field, a password field, a "Remember me" checkbox, a "Forgot Password" link and a Login button |
| AC-002 | I am on the login page | the page has finished rendering | no dashboard sidebar, navigation, conversation list, admin menu or other protected content is present in the rendered page — behind, beside or beneath the form |
| AC-003 | I am on the login page | I click "Forgot Password" | I am shown instructions to contact an administrator to have my password reset, and no self-service reset email is sent |

### US-002: Sign in and reach the dashboard

**Priority:** critical

> As a internal team member with an account, I want to sign in with my username and password, so that I can use the chat workspace.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I am on /login with an active account | I submit my correct username and password | the server creates a session, sets an HTTP-only Secure SameSite session cookie, and the browser replaces the login page with the full authenticated dashboard |
| AC-005 | I have signed in successfully | the dashboard loads | only menu items authorised for my role are rendered, and GET /auth/me returns my username and role |
| AC-006 | my account has been marked inactive | I submit otherwise correct credentials | sign-in is refused with the same generic error used for bad credentials and no session is created |

### US-003: Session survives refresh, with Remember me extending its life

**Priority:** high

> As a signed-in user, I want my session to persist across refreshes and browser restarts according to the Remember me choice, so that I am not forced to log in repeatedly during the working day.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I am signed in with a valid session | I refresh the browser or reopen it at a protected URL | the authenticated dashboard remains available without re-entering credentials and the active conversation is reloaded from the backend |
| AC-008 | I signed in without ticking "Remember me" | the session record is inspected | its expiry is 8 hours from creation (assumption: 8-hour default) |
| AC-009 | I signed in with "Remember me" ticked | the session record is inspected | its expiry is 30 days from creation (assumption: 30-day extended session) |
| AC-010 | my session has expired or the cookie is invalid | I request any protected page or API | I am redirected to /login, the API returns 401, and no protected content or data is returned |

### US-004: Protected routes redirect logged-out visitors

**Priority:** critical

> As a logged-out visitor, I want any protected URL I open to send me to the login page, so that protected content is never rendered without a validated session.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I have no valid session | I open a protected dashboard URL directly (for example /chat, /conversations or /settings) | I am redirected to /login and the protected view is never rendered, not even momentarily |
| AC-012 | the frontend has not yet validated the session | a protected route is being resolved | a neutral loading state is shown rather than authenticated content |

### US-005: Log out back to the standalone login page

**Priority:** high

> As a signed-in user, I want to log out from the top bar, so that my session is ended on a shared machine.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I am signed in | I choose Logout from the user controls | the server-side session is invalidated, the session cookie is cleared, and the standalone login page is shown immediately with no dashboard content remaining |
| AC-014 | I have logged out | I press the browser Back button to a protected URL | I am redirected to /login and no cached protected content is displayed |

### US-006: Generic sign-in errors and failed-attempt lockout

**Priority:** critical

> As a security-conscious organisation, I want identical errors for wrong username and wrong password, with a lockout after repeated failures, so that accounts cannot be enumerated or brute-forced.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | I am on the login page | I submit a username that does not exist, or an existing username with the wrong password | the same generic error message is shown in both cases and no detail distinguishes which field was wrong |
| AC-016 | a username has had four failed sign-in attempts within the last 15 minutes | a fifth failed attempt is made | that username is locked for 15 minutes and further attempts are refused even when the correct password is supplied |
| AC-017 | a username was locked 15 minutes ago | the correct password is submitted after the lock window elapses | sign-in succeeds and the failed-attempt counter is reset |
| AC-018 | any sign-in attempt occurs | the attempt is recorded | the login attempt is stored server-side with username, outcome and UTC timestamp, and no plaintext password appears in storage or logs |

### US-007: Seeded administrator account for first sign-in

**Priority:** critical

> As a person installing Chat Assistant, I want an administrator account to exist on a fresh install, so that I can sign in and use the system immediately after deployment.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | a freshly migrated database with no users | the backend starts | a single user with username "admin", the Administrator role and the configured initial password (default Admin@123) is created with a bcrypt or Argon2 password hash |
| AC-020 | the admin user already exists | the backend restarts | the existing account and its current password are left untouched and no duplicate account is created |
| AC-021 | the seeded admin credentials are configured | the configuration is read | ADMIN_USERNAME and ADMIN_INITIAL_PASSWORD are supplied as backend environment variables and never appear in frontend code, API responses or logs |

### US-008: Forced password change on first sign-in

**Priority:** high

> As a user signing in with a temporary password, I want to be required to set my own password before using the app, so that no account keeps a shared or default password.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | my account has must_change_password set true | I sign in successfully | I am taken to a change-password screen and all other dashboard functions are blocked until a new password is set |
| AC-023 | I am on the forced change-password screen | I submit a new password that meets the configured minimum strength rules and confirm it | the new password hash is stored, must_change_password is cleared, and I continue to the dashboard |
| AC-024 | the seeded admin account is still using the default Admin@123 password | the administrator first signs in | the forced change-password flow applies in the same way (assumption: at this scope the seeded admin is the account exercising this flow, since the admin Users page for provisioning other accounts is deferred beyond the MVP) |

### US-009: Change my own password from the signed-in account

**Priority:** high

> As a signed-in user, I want to change my password from Settings, so that I can keep my account secure without an administrator.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | I am signed in and on the Settings page | I submit my current password plus a valid new password and confirmation | POST /auth/change-password stores the new hash and confirms success |
| AC-026 | I am changing my password | I supply an incorrect current password or a confirmation that does not match | the change is rejected with a clear message and my existing password remains valid |
| AC-027 | I have changed my password | I log out and sign in again | only the new password is accepted and the old one is refused |

## EPIC-002: Authenticated Dashboard Shell

The post-login application shell: top bar with branding and user controls, persistent sidebar navigation, light/dark theme, responsive layout, and the Knowledge Base placeholder page.

Assumptions surfaced here: (1) The sidebar collapses on narrow screens; the responsive web app is the mobile experience and no native app is built. (2) The Users nav item is rendered only for administrators; at Lightweight MVP scope it links to a placeholder because admin user management is deferred. (3) Settings at this scope offers theme and change-password only — the admin-only global LLM configuration screen (provider, model, temperature, max output tokens, system prompt, history window) is deferred, and those values are set through backend environment configuration in this release.

### US-010: Role-aware dashboard shell with branding and navigation

**Priority:** critical

> As a signed-in user, I want a consistent application shell with a top bar and sidebar, so that I can move between chat, conversations and settings.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I have signed in | the dashboard renders | a top bar shows Chat Assistant branding and signed-in user controls (my username and a Logout action), and a persistent left sidebar shows Chat, New Chat, Conversations, Knowledge Base and Settings |
| AC-029 | I am signed in as a non-administrator | the dashboard renders | the Users navigation item is not present in the rendered page and any admin-only endpoint returns 403 if called directly |
| AC-030 | I am signed in as an administrator | the dashboard renders | the Users navigation item is visible in addition to the standard items (assumption: at this scope it opens a placeholder noting that admin user management ships in a later release) |
| AC-031 | I have no conversations yet | I open the chat workspace | a welcome/empty state is shown with the message composer available |

### US-011: Light and dark theme

**Priority:** medium

> As a signed-in user, I want to switch between light and dark themes, so that the interface suits my working environment.

| ID | Given | When | Then |
|---|---|---|---|
| AC-032 | I am on the Settings page | I select the light or dark theme | the whole dashboard, including the chat pane and sidebar, re-renders in the chosen theme immediately |
| AC-033 | I have chosen a theme | I refresh the browser or sign in again | my chosen theme is still applied |

### US-012: Responsive layout on narrow screens

**Priority:** medium

> As a user on a small screen or narrow browser window, I want the layout to adapt, so that I can chat comfortably without a native app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-034 | the viewport is narrower than the configured breakpoint | the dashboard renders | the sidebar collapses behind a toggle and the chat pane and composer occupy the full width (assumption: responsive web is the mobile experience; no native app is delivered) |
| AC-035 | the sidebar is collapsed | I open it via the toggle and select a conversation | the conversation opens and the sidebar closes again |

### US-013: Knowledge Base placeholder page

**Priority:** medium

> As a signed-in user, I want the Knowledge Base nav item to explain that the feature is coming, so that I understand answers come from the model's general knowledge and my current conversation only.

| ID | Given | When | Then |
|---|---|---|---|
| AC-036 | I am signed in | I select Knowledge Base in the sidebar | a placeholder page renders stating the feature is not yet available, with no upload control, document list or retrieval UI |
| AC-037 | the placeholder page is open | I inspect the available actions | no document upload, chunking, embedding or retrieval endpoint is exposed (document upload and RAG retrieval with citations are explicitly out of scope for this release) |

## EPIC-003: Multi-Turn Chat with Streaming Replies

The core chat experience: send a message, receive a token-by-token streamed reply from Google Gemini via the backend adapter, rendered as Markdown with copy-able code blocks. Enforces the mandated flow — validate, persist the user message, load history, trim to the context window, prepend the system prompt, call the adapter, stream tokens, persist the assistant message, update the conversation timestamp.

Assumptions surfaced here: (1) The default provider is Google Gemini (LLM_PROVIDER=gemini) with LLM_API_KEY held backend-only; the adapter interface keeps OpenAI/Anthropic swappable by configuration. (2) Streaming is delivered as server-sent events over POST /chat. (3) Per-message token counts are recorded for visibility only — there is no billing, plan or subscription of any kind, and cost sits on the organisation's own Gemini account. (4) Regenerate and Edit-and-resend were described in the source specification but are not part of the Lightweight MVP capability set; Stop generating and Retry after failure are delivered in this release.

### US-014: Send a message and receive a streamed reply

**Priority:** critical

> As a signed-in user, I want to send a message and watch the reply stream in token by token, so that I get a responsive multi-turn conversation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-038 | I am in a conversation | I send a message | POST /chat validates the input, persists my user message in PostgreSQL, and only then calls the Gemini adapter |
| AC-039 | the model has begun responding | tokens arrive from the provider | they are relayed to the browser as server-sent events over the POST /chat response and appended to the assistant bubble incrementally rather than appearing all at once |
| AC-040 | the stream has completed | the final token is received | the assistant message is persisted with status complete, its model name and prompt/completion token counts, and the conversation's updated_at timestamp is set to the current UTC time |
| AC-041 | I send a follow-up question referring to an earlier turn | the model replies | the reply reflects the prior turns in the conversation, confirming multi-turn context was supplied |

### US-015: Messages persisted server-side before being shown as final

**Priority:** critical

> As a signed-in user, I want every message stored on the server before it is treated as final, so that nothing I say or receive depends on browser memory.

| ID | Given | When | Then |
|---|---|---|---|
| AC-042 | I have sent a message and received a complete reply | the messages table is queried directly | both the user message and the assistant message exist with role, content, status, conversation_id and UTC created_at |
| AC-043 | a reply has rendered in the UI | the browser is closed before any further action | reopening the conversation shows both messages, proving they were persisted at the time of display and not only held in React state, localStorage or sessionStorage |
| AC-044 | an assistant message is persisted | its record is inspected | prompt and completion token counts are stored for visibility only, with no cost, plan or billing calculation attached |

### US-016: Stop generating a streaming reply

**Priority:** high

> As a signed-in user, I want to stop a reply while it is still streaming, so that I can cut short an answer that is going the wrong way.

| ID | Given | When | Then |
|---|---|---|---|
| AC-045 | a reply is streaming | I click Stop generating | the stream is closed, the provider call is cancelled server-side, and the partial text already received remains visible |
| AC-046 | I stopped a reply mid-stream | the assistant message is persisted | the partial content is saved with a stopped/incomplete status and my user message is left untouched |
| AC-047 | I stopped a reply and then refreshed the page | the conversation reloads from the backend | the same partial assistant message and its incomplete status are shown |

### US-017: Markdown replies with copy-able code blocks

**Priority:** high

> As a signed-in user, I want replies rendered as Markdown with copyable code blocks, so that formatted answers and code are easy to read and reuse.

| ID | Given | When | Then |
|---|---|---|---|
| AC-048 | the assistant replies with Markdown containing headings, lists, bold text, inline code and a fenced code block | the message renders | each element renders as formatted output rather than raw Markdown characters |
| AC-049 | a reply contains a fenced code block | I hover or focus on it | a Copy button is available, and clicking it places the exact code block contents on the clipboard with confirmation feedback |
| AC-050 | a reply contains raw HTML, a script tag or a javascript: link | the message renders | the content is sanitised and no script executes and no unsafe link is produced |

### US-018: Message composer with Enter to send

**Priority:** high

> As a signed-in user, I want a composer where Enter sends and Shift+Enter adds a new line, so that I can write multi-line prompts quickly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-051 | the composer has text in it | I press Enter without a modifier | the message is sent and the composer clears |
| AC-052 | the composer has text in it | I press Shift+Enter | a new line is inserted and nothing is sent |
| AC-053 | a reply is currently streaming | I look at the composer | the send action is disabled and replaced by the Stop generating control until the stream ends |
| AC-054 | the composer is empty or contains only whitespace | I press Enter | nothing is sent and no empty message is persisted |

### US-019: History trimmed to the context window with system prompt prepended

**Priority:** high

> As a signed-in user, I want long conversations trimmed to the configured window with the system prompt always applied, so that replies stay consistent and provider limits are not exceeded.

| ID | Given | When | Then |
|---|---|---|---|
| AC-055 | a conversation has more turns than the configured history window | I send a new message | only the most recent turns up to the configured window are included in the provider request, with the oldest turns excluded |
| AC-056 | any chat request is built | the message list is assembled | the configured system prompt is prepended as the first message before the trimmed history |
| AC-057 | history has been trimmed for a provider call | I scroll back through the conversation in the UI | all stored messages are still displayed and nothing has been deleted from PostgreSQL |
| AC-058 | the deployment configuration sets provider, model, temperature, max output tokens, system prompt and history window | the backend starts | those values are read from backend configuration and applied globally (assumption: an admin UI for editing them is deferred beyond this scope) |

### US-020: Failure during generation keeps data intact and offers Retry

**Priority:** critical

> As a signed-in user, I want a clear error and a Retry option when the model call fails, so that a provider outage never costs me my conversation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-059 | the provider returns an authentication, quota, timeout, rate-limit or network error before any token arrives | the chat request fails | my user message remains persisted, an assistant message is recorded with status failed, and the UI shows a clear non-technical error with a Retry action |
| AC-060 | the provider fails midway through a stream | the connection drops | the partial assistant content is persisted with status incomplete, my user message is unchanged, and no conversation or message is deleted or altered |
| AC-061 | a failed reply is shown | I click Retry | the same user message is re-sent to the provider without creating a duplicate user message, and a fresh assistant reply streams in |
| AC-062 | a provider error has occurred | the error is surfaced to the browser or written to logs | no API key, credential or raw provider payload containing secrets is included |

### US-021: Per-user chat rate limiting

**Priority:** medium

> As a organisation paying for its own Gemini account, I want chat requests rate limited per user, so that a runaway client cannot exhaust the shared quota.

| ID | Given | When | Then |
|---|---|---|---|
| AC-063 | a configured per-user chat rate limit | a single signed-in user exceeds that limit within the configured window | further chat requests are refused with a clear "please slow down" message and no provider call is made |
| AC-064 | a user has been rate limited | the window elapses | chat requests succeed again and no stored messages or conversations were affected |

## EPIC-004: Conversations and Persistent History

Private, permanently stored conversations per user: New Chat, auto-generated titles, a newest-updated-first list, rename, explicit delete, survival across refresh and backend restart, and server-side ownership enforcement.

Assumptions surfaced here: (1) Conversation titles are auto-generated from the first user message and can be renamed by the owner. (2) The sidebar orders conversations newest-updated first. (3) Only an explicit delete removes a conversation and its messages.

### US-022: Start a new conversation

**Priority:** critical

> As a signed-in user, I want to start a new chat from the sidebar, so that I can keep separate topics apart.

| ID | Given | When | Then |
|---|---|---|---|
| AC-065 | I am on the dashboard | I click New Chat | an empty chat workspace with a welcome state opens and the composer is focused |
| AC-066 | I am in a new empty chat | I send my first message | a conversation row is created in PostgreSQL owned by me, with UTC created_at and updated_at, and it appears at the top of the sidebar list |
| AC-067 | I click New Chat but never send a message | I navigate away | no empty conversation is left cluttering the sidebar |

### US-023: Conversation titled automatically from the first message

**Priority:** high

> As a signed-in user, I want conversations named from my first message, so that I can recognise them in the sidebar without naming each one.

| ID | Given | When | Then |
|---|---|---|---|
| AC-068 | a new conversation | I send the first user message | the conversation title is derived from that message, truncated to a sensible length, and shown in the sidebar and top of the chat pane |
| AC-069 | a conversation already has a title | I send further messages | the title is not overwritten |

### US-024: Conversation list ordered newest-updated first

**Priority:** high

> As a signed-in user, I want my conversations listed with the most recently active first, so that what I am working on is always at the top.

| ID | Given | When | Then |
|---|---|---|---|
| AC-070 | I own several conversations | the sidebar loads from GET /conversations | they are ordered by updated_at descending |
| AC-071 | I send a message in an older conversation | the reply completes and updated_at is refreshed | that conversation moves to the top of the list |
| AC-072 | I select a conversation in the sidebar | it opens | its full message history is loaded from the backend and the conversation is highlighted as active |

### US-025: Rename a conversation

**Priority:** medium

> As a signed-in user, I want to rename my conversations, so that I can label them meaningfully.

| ID | Given | When | Then |
|---|---|---|---|
| AC-073 | I own a conversation | I use its rename action and save a new title | the new title is persisted and shown in the sidebar and chat header |
| AC-074 | I submit an empty or whitespace-only title | I save | the rename is rejected with a validation message and the previous title is retained |
| AC-075 | I renamed a conversation | I refresh the browser | the new title is still shown, loaded from the backend |

### US-026: Explicitly delete a conversation

**Priority:** high

> As a signed-in user, I want to delete a conversation deliberately, so that I control what is kept, and nothing disappears by accident.

| ID | Given | When | Then |
|---|---|---|---|
| AC-076 | I own a conversation | I choose Delete | I am asked to confirm before anything is removed |
| AC-077 | I confirm the deletion | the request completes | the conversation and all of its messages are removed from PostgreSQL, the item disappears from the sidebar, and if it was open the workspace returns to the empty state |
| AC-078 | I have not deleted a conversation | I refresh, log out and back in, or the backend restarts | the conversation and its messages are still present — only an explicit delete removes them |

### US-027: History survives refresh, browser reopen and backend restart

**Priority:** critical

> As a signed-in user, I want my conversations restored from the server every time, so that browser state is never the source of truth.

| ID | Given | When | Then |
|---|---|---|---|
| AC-079 | I have a conversation with several messages | I refresh the browser | the sidebar list and the active conversation are repopulated from backend APIs with identical content and ordering |
| AC-080 | I have a conversation with several messages | I close the browser entirely and reopen it with a valid session, or log out and log back in | all conversations and messages are still available |
| AC-081 | the backend process is stopped and restarted | I reload the dashboard | all conversations and messages remain intact, and startup has neither truncated nor recreated any table |
| AC-082 | browser localStorage and sessionStorage are cleared | I reload the dashboard | all conversations and messages are still shown, proving the server is the system of record |

### US-028: Conversations are private to their owner

**Priority:** critical

> As a signed-in user, I want ownership enforced on the server for every request, so that colleagues cannot see, rename or delete my conversations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-083 | User A owns a conversation | User B requests that conversation's detail or messages by its id | the request is refused (404/403) and no content, title or message is disclosed |
| AC-084 | User A owns a conversation | User B attempts to rename, delete or post a chat message into it | the request is refused server-side and User A's data is unchanged |
| AC-085 | any conversation or message API is called | the request is handled | ownership is validated against the session user on the server, never relying on a client-supplied user identifier |

## EPIC-005: Data Platform, Security Foundations and Delivery Readiness

The PostgreSQL + pgvector foundation, versioned Alembic migrations including vector-ready embedding columns, backend-only provider configuration, the health endpoint, platform security controls, documentation and the automated test suite covering the mandatory acceptance tests.

Assumptions surfaced here: (1) Deployment is a containerised web app (FastAPI backend plus built React frontend) against a managed PostgreSQL instance with pgvector available; the localhost URLs in the source specification are development defaults. (2) Google Gemini is the default provider, configured via backend-only LLM_PROVIDER, LLM_MODEL and LLM_API_KEY, with the adapter interface keeping OpenAI/Anthropic swappable by configuration. (3) Audit logging of authentication events and administrative actions was discussed; at Lightweight MVP scope login attempts are recorded and an audit log table is migrated, but no admin audit-viewer UI is built. (4) There are no payments, plans or subscriptions anywhere in the product.

### US-029: PostgreSQL only, with pgvector enabled

**Priority:** critical

> As a engineering team, I want PostgreSQL with pgvector used everywhere and SQLite nowhere, so that the same database backs development, test and production and is ready for future vector search.

| ID | Given | When | Then |
|---|---|---|---|
| AC-086 | the application is started in development, test or production | it connects to its database | the connection uses a PostgreSQL DATABASE_URL and no SQLite file is created, configured or referenced anywhere in code, configuration, migrations or tests |
| AC-087 | a freshly provisioned database | migrations have run | the pgvector extension is enabled and `SELECT extname FROM pg_extension` includes 'vector' |
| AC-088 | records are created | ids and timestamps are inspected | ids are PostgreSQL-compatible generated identifiers and all timestamps are stored in UTC |

### US-030: Versioned migrations for the full schema including vector-ready columns

**Priority:** critical

> As a engineering team, I want all schema managed by Alembic migrations, so that deployments are repeatable and never destroy data.

| ID | Given | When | Then |
|---|---|---|---|
| AC-089 | an empty PostgreSQL database | Alembic migrations are run to head | they complete without error and create tables for users, sessions, conversations, messages, settings, login attempts and audit logs with the fields described in the specification |
| AC-090 | migrations have run | the message-related schema is inspected | pgvector vector-typed embedding columns exist and are unused by application logic, ready for future knowledge-base work (no upload, chunking, embedding or retrieval ships in this release) |
| AC-091 | a database already holding users, conversations and messages | the application starts or migrations are re-applied | no table is truncated, dropped or recreated and all existing rows remain |

### US-031: Gemini configured through a backend-only adapter

**Priority:** critical

> As a engineering team, I want all model calls routed through one backend adapter with keys held server-side, so that credentials are never exposed and providers can be swapped by configuration.

| ID | Given | When | Then |
|---|---|---|---|
| AC-092 | the deployment sets LLM_PROVIDER=gemini, LLM_MODEL and LLM_API_KEY | a chat request is made | the backend adapter calls Google Gemini and the frontend never contacts the provider directly (assumption: Gemini is the shipped default) |
| AC-093 | the application is running | browser bundles, API responses, error messages and application logs are inspected | no provider API key or secret value appears in any of them |
| AC-094 | the adapter interface exposes generate(messages, settings) and stream(messages, settings) | LLM_PROVIDER is changed to another supported provider | no frontend or database change is required for the application to run (assumption: OpenAI/Anthropic remain swappable by configuration) |
| AC-095 | a provider call is issued | the provider is slow or transiently failing | a configured timeout and limited retry/backoff apply, and stored data is never altered by the failure |

### US-032: Health endpoint reporting database and provider reachability

**Priority:** medium

> As a operator of the deployment, I want a health endpoint, so that I can tell whether the database and the model provider are reachable.

| ID | Given | When | Then |
|---|---|---|---|
| AC-096 | the backend is running normally | I call GET /health | it returns a success status reporting database reachability and provider reachability |
| AC-097 | the database or provider is unreachable | I call GET /health | the response indicates the degraded component without exposing connection strings, credentials or API keys |

### US-033: Platform security controls for the web app

**Priority:** critical

> As a security-conscious organisation, I want CSRF protection, restricted CORS and safe hashing in place, so that an internal tool on the network is not trivially attacked.

| ID | Given | When | Then |
|---|---|---|---|
| AC-098 | a state-changing request (login, chat, rename, delete, change-password) arrives without a valid CSRF token | the backend handles it | the request is rejected and no state changes |
| AC-099 | a request originates from an origin not in the configured allow-list | CORS is evaluated | the request is refused; only the configured application origin(s) are permitted |
| AC-100 | a password is stored or verified | the user record is inspected | only a bcrypt or Argon2 hash is present and no plaintext password is stored or written to any log |

### US-034: Automated tests proving the mandatory acceptance behaviour

**Priority:** high

> As a engineering team, I want an automated suite running against PostgreSQL with a mocked provider, so that the mandated behaviours are verified on every change.

| ID | Given | When | Then |
|---|---|---|---|
| AC-101 | the test suite is executed | it runs | it connects to PostgreSQL with pgvector and uses a mocked LLM provider, with no SQLite database created or referenced |
| AC-102 | the suite runs | results are reviewed | it covers: login-only pre-auth state; valid login reaching the dashboard; protected-route redirect while logged out; logout returning to the login page; refresh keeping a valid session; pgvector enabled and migrations completing; a sent message producing a streamed reply with both messages stored; conversations surviving restart; User A unable to read, rename or delete User B's conversations; provider failure showing an error while erasing nothing; and five failed logins triggering lockout |
| AC-103 | any mandatory acceptance test fails | the build runs | the build fails and the release is blocked |

### US-035: Setup, configuration and API reference documentation

**Priority:** medium

> As a engineer deploying or maintaining Chat Assistant, I want written setup, configuration and API documentation, so that the system can be installed, configured and integrated with confidence.

| ID | Given | When | Then |
|---|---|---|---|
| AC-104 | a new engineer with repository access | they follow the setup documentation | they can provision PostgreSQL with pgvector, run migrations, start the backend and frontend, and sign in as the seeded admin without further help |
| AC-105 | the configuration documentation | it is read | every environment variable is listed with purpose and default — including LLM_PROVIDER, LLM_MODEL, LLM_API_KEY, ADMIN_USERNAME, ADMIN_INITIAL_PASSWORD, SESSION_SECRET and DATABASE_URL — with a clear statement that keys stay backend-only and that localhost URLs are development defaults for the containerised deployment |
| AC-106 | the API reference | it is read | it documents the authentication, conversation, message, chat-streaming and health endpoints with methods, paths, payloads, authorisation rules and error responses, including the server-sent-events format of POST /chat |
<!-- sdlc:auto:end epics -->
