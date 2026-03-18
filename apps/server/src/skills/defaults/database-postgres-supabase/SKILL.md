---
name: database-postgres-supabase
description: Design and implement PostgreSQL-backed data layers with Supabase, including schema design, migrations, row-level security, auth-aware queries, and app integration. Use when the user asks for Postgres or Supabase database work.
metadata:
  display-name: Database Postgres Supabase
  enabled: "true"
  version: "1.0"
---

# Database Postgres Supabase

Use this skill for database tasks involving PostgreSQL and Supabase.

## When to Apply

Activate when the user asks to:

- design a Postgres schema
- set up or use Supabase
- write SQL or migrations
- add Row Level Security (RLS) policies
- integrate app code with Supabase queries

## Workflow

### 1. Confirm Data Requirements

Capture:

- entities and relationships
- read and write patterns
- auth model (public, user-scoped, team-scoped, admin)
- reporting or analytics needs

If requirements are incomplete, make conservative assumptions and document them.

### 2. Model Schema for Postgres

Prefer:

- normalized core tables
- explicit foreign keys and indexes
- `created_at` / `updated_at` timestamps
- soft deletes only when needed

Use migrations for every schema change. Avoid editing production tables manually.

### 3. Apply Supabase Best Practices

- Enable RLS on user data tables
- Write least-privilege policies
- Keep service-role usage server-side only
- Keep anon key usage limited to allowed client paths
- Store secrets in environment variables

### 4. Implement Data Access Layer

In app code:

- centralize DB calls in server-side modules
- validate inputs before writes
- handle and surface database errors clearly
- paginate list endpoints and use indexes for filters/sorts

### 5. Migrations and Seeds

For every feature:

- add forward migration
- add safe rollback plan where feasible
- add seed data for local/dev when helpful

Never run destructive migration steps without explicit user approval.

### 6. Verify

After changes, verify:

- migrations apply cleanly
- RLS policies allow intended access and block unauthorized access
- key queries are correct and indexed
- app flows work end-to-end against the updated schema

## Output Expectations

Provide:

- schema changes and rationale
- SQL or migration files added
- RLS policies added/changed
- integration points in app code
- verification steps and any remaining risks

## Quick Decision Rules

- If user says "Supabase auth + data": design schema plus RLS first
- If user says "slow queries": inspect indexes and query shape before refactors
- If user says "multi-tenant": enforce tenant scoping in schema and RLS
- If uncertain between client/server DB access: prefer server-side access
