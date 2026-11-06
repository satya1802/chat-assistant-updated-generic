# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| username | varchar | False | — | False |
| password_hash | varchar | False | — | False |
| role | varchar | False | — | False |
| must_change_password | boolean | False | — | False |
| is_active | boolean | False | — | False |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### sessions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| token_hash | varchar | False | — | False |
| remember_me | boolean | False | — | False |
| expires_at | timestamptz | False | — | False |
| created_at | timestamptz | False | — | False |

### conversations

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| title | varchar | False | — | False |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### messages

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| conversation_id | uuid | False | conversations.id | False |
| role | varchar | False | — | False |
| content | text | False | — | False |
| status | varchar | False | — | False |
| model | varchar | False | — | True |
| prompt_tokens | integer | False | — | True |
| completion_tokens | integer | False | — | True |
| embedding | vector | False | — | True |
| created_at | timestamptz | False | — | False |

### settings

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| theme | varchar | False | — | False |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### login_attempts

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| username | varchar | False | — | False |
| outcome | varchar | False | — | False |
| ip_address | varchar | False | — | True |
| created_at | timestamptz | False | — | False |

### audit_logs

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | True |
| action | varchar | False | — | False |
| detail | jsonb | False | — | True |
| created_at | timestamptz | False | — | False |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | sessions | one-to-many |
| users | conversations | one-to-many |
| conversations | messages | one-to-many |
| users | settings | one-to-one |
| users | audit_logs | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    varchar username
    varchar password_hash
    varchar role
    boolean must_change_password
    boolean is_active
    timestamptz created_at
    timestamptz updated_at
  }
  sessions {
    uuid id PK
    uuid user_id FK
    varchar token_hash
    boolean remember_me
    timestamptz expires_at
    timestamptz created_at
  }
  conversations {
    uuid id PK
    uuid user_id FK
    varchar title
    timestamptz created_at
    timestamptz updated_at
  }
  messages {
    uuid id PK
    uuid conversation_id FK
    varchar role
    text content
    varchar status
    varchar model
    integer prompt_tokens
    integer completion_tokens
    vector embedding
    timestamptz created_at
  }
  settings {
    uuid id PK
    uuid user_id FK
    varchar theme
    timestamptz created_at
    timestamptz updated_at
  }
  login_attempts {
    uuid id PK
    varchar username
    varchar outcome
    varchar ip_address
    timestamptz created_at
  }
  audit_logs {
    uuid id PK
    uuid user_id FK
    varchar action
    jsonb detail
    timestamptz created_at
  }
  users ||--o{ sessions : "one-to-many"
  users ||--o{ conversations : "one-to-many"
  conversations ||--o{ messages : "one-to-many"
  users ||--|| settings : "one-to-one"
  users ||--o{ audit_logs : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
