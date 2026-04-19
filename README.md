# Portfolio Platform (Next.js App Router)

Production-oriented portfolio platform with:
- Public portfolio frontend (server-rendered, DB-backed)
- Admin CMS (authenticated CRUD)
- Chat assistant v1 (grounded on structured portfolio data)
- Optional RAG indexing scaffolding

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 + custom design tokens
- PostgreSQL + Prisma ORM
- NextAuth (credentials provider + role checks)
- Zustand + TanStack Query
- Vitest (unit tests)

## Current Coverage vs Plan

Implemented:
- Phase 1: foundation shell, metadata, design tokens, app-level error/loading states
- Phase 2: public portfolio migration from static content to composable sections
- Phase 3: Prisma schema, seeding, service layer, PostgreSQL-backed entities
- Phase 4: NextAuth credentials flow, middleware protection, admin role checks
- Phase 5: admin CRUD modules for profile/projects/skills/experience/services/messages
- Phase 6: public APIs + contact endpoint with validation, rate limit, and spam checks
- Phase 7: chatbot v1 with grounded context, guardrails, feedback capture
- Phase 8 (partial): RAG document/chunk indexing endpoint and reindex orchestration

Partially implemented / next steps:
- Full vector retrieval and citation-confidence gating for RAG answering
- Background job pipeline for email and embedding workloads
- E2E tests and deeper API integration tests
- CI/CD migration gate + deployment rollback automation

## Project Layout

- `app/(public)` public routes and sections
- `app/(admin)` protected admin dashboard pages
- `app/api/public` read APIs and contact endpoint
- `app/api/admin` authenticated CRUD endpoints
- `app/api/chat` chatbot query + feedback
- `components/public` landing sections + chat widget + contact form
- `components/admin` CMS views/forms
- `services` business logic for content and chat orchestration
- `lib` shared auth, prisma, validation, rate-limit, helpers
- `prisma` schema and seed
- `tests` unit tests

## Environment Variables

Copy `.env.example` to `.env.local` and set values.

Required for local development:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Optional:
- `GOOGLE_GENERATIVE_AI_API_KEY` (enables Gemini responses)
- `CHAT_MODEL`
- `CONTACT_WEBHOOK_URL` (outbound contact notifications)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL and configure `DATABASE_URL`.

3. Generate Prisma client and apply schema:

```bash
npm run db:generate
npm run db:push
```

4. Seed initial content/admin user:

```bash
npm run db:seed
```

5. Run dev server:

```bash
npm run dev
```

## Auth and Admin Access

- Login route: `/admin/login`
- Admin routes are protected by:
  - middleware check (`/admin/*`)
  - server-side role check in route handlers
- Seeded admin credentials come from `ADMIN_EMAIL` and `ADMIN_PASSWORD`

## API Overview

Public:
- `GET /api/public/profile`
- `GET /api/public/skills`
- `GET /api/public/experience`
- `GET /api/public/projects`
- `GET /api/public/projects/:slug`
- `GET /api/public/services`
- `POST /api/public/contact`

Admin:
- `GET /api/admin/dashboard-metrics`
- CRUD for `/api/admin/projects`, `/api/admin/experience`, `/api/admin/skills`, `/api/admin/profile`, `/api/admin/services`
- `GET/PATCH /api/admin/contact-messages`
- `POST /api/admin/rag/reindex`

Chat:
- `POST /api/chat/query`
- `POST /api/chat/feedback`

## Security Baseline

- Secure route protection with middleware + role checks
- Zod validation for request payloads
- In-memory rate limiting for chat and contact endpoints
- Contact spam mitigation: honeypot + minimum form fill time
- Security headers set in `next.config.ts`

## Testing

Run unit tests:

```bash
npm test
```

Current test focus:
- Rate-limit behavior
- Validator contracts

## Deploy Notes

Recommended baseline:
- App/API: Vercel
- PostgreSQL: Railway or Render

Deploy checklist:
1. Configure production env vars
2. Run `prisma migrate deploy` (or equivalent migration gate)
3. Seed admin/profile if needed
4. Verify admin auth and protected routes
5. Run smoke tests for public APIs and chat endpoint

## Scale-Out Path

When load/latency requires separation:
- Keep frontend contracts stable
- Extract heavy chat/retrieval endpoints into dedicated Node service
- Move slow tasks (reindex, notifications) to queued background workers
