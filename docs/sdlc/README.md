# Chat Assistant - Updated Generic — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Chat Assistant - Updated Generic Full-Stack Chatbot Specification Page 1 Chat Assistant Generic Full-Stack AI Chatbot Build Specification - Updated UI + PostgreSQL/pgvector Category Specification Application Type Full-stack conversational AI chatbot with persistent chat history AI Provider Any LLM provider through a pluggable backend adapter; selected by configuration Answer Source Configured LLM general knowledge plus current conversation context Persistence Users, sessions, conversations, messages and settings survive refresh/restart Streaming Token-by-token streaming responses to the UI Reference Stack FastAPI + React/TypeScript + PostgreSQL + pgvector Database Rule PostgreSQL is mandatory. Do not use SQLite in local, test or production environments. Core rule: Every user message and assistant reply is saved on the server before it is shown as final. Conversations belong to the signed-in user and remain available until explicitly deleted. PostgreSQL is the persistent system of record. 1. Product Goal  Build a full-stack AI chatbot called Chat Assistant. Signed-in users hold multi-turn conversations with an LLM, with streaming replies, Markdown rendering and persistent conversation history.  Store users, sessions, conversations, messages and settings in PostgreSQL so application state does not depend on browser memory.  Keep the LLM provider behind a single adapter interface so providers or models can be changed through configuration without frontend or database redesign.  Use pgvector in PostgreSQL as the vector extension so the same database is ready for embeddings/vector search when knowledge-base or RAG functionality is enabled. 2. Authentication and Default Login Field Default Value Login URL http://localhost:5173/login Username admin Password Admin@123 Role Administrator  Before authentication, show only the login page. Do not show the dashboard sidebar, chat history, admin navigation, settings, or any authenticated application content.  After

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 8 entries |
| [Development](development/README.md) | 6 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 8 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 35 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->
