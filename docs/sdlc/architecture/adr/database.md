<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-16

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- MongoDB

## Decision Outcome

Chosen option: PostgreSQL 16, because One system of record for users, sessions, conversations, messages, settings, login attempts and audit logs, so ownership checks and the five-failures lockout run against the same store. pgvector ships embedding columns now at no cost until Knowledge Base is enabled; SQLite is banned everywhere.

## Consequences

Requires a managed instance in every environment including tests, but that is the point — browser state is never the source of truth.
<!-- sdlc:auto:end adr -->