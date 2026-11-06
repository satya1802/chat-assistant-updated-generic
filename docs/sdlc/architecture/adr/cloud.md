<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-16

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because RDS for PostgreSQL gives pgvector via a single extension command plus managed backups and point-in-time restore for the only copy of every conversation; a container service runs the FastAPI + built React app, and Secrets Manager keeps GEMINI_API_KEY and SESSION_SECRET backend-only.

## Consequences

Managed services add cost over a single VM, but the backup/restore guarantees justify it for a conversation store with no second copy.
<!-- sdlc:auto:end adr -->