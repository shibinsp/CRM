# BeeAX CRM

BeeAX CRM is an open-source, customizable CRM platform. It gives technical teams the
building blocks of a modern CRM — objects, fields, views, workflows, and AI agents — and
lets you extend everything as code.

The data model is fully metadata-driven: standard objects (companies, people, opportunities,
notes, tasks) and any custom objects you define are first-class, each backed by real database
tables and a generated GraphQL API.

- **Repository:** https://github.com/shibinsp/CRM
- **License:** AGPL-3.0 (see [LICENSE](./LICENSE))

## Features

- **Metadata-driven data model** — custom objects and fields with real tables, indexes, and APIs
- **Multiple views** — table, kanban, and calendar with filters, sorts, and grouping
- **Workflows & automation** — triggers, actions, and a visual builder
- **AI agents** — assistants and automation powered by the latest models
- **Email & calendar sync** — Gmail / Microsoft via OAuth
- **Granular permissions** — object-, field-, and row-level access control
- **REST & GraphQL APIs** — plus API keys and webhooks
- **Multi-tenant** — isolated per-workspace schemas

## Tech stack

- **Frontend:** React, TypeScript, Jotai, Linaria, Vite, Apollo Client
- **Backend:** NestJS, TypeORM, PostgreSQL, Redis, GraphQL (GraphQL Yoga), BullMQ
- **Monorepo:** Nx workspace managed with Yarn 4 (Node 24)

## Monorepo structure

```
packages/
├── beeax-front/      # React frontend application
├── beeax-server/     # NestJS backend API + worker
├── beeax-ui/         # Shared UI component library
├── beeax-shared/     # Common types and utilities
├── beeax-emails/     # Transactional email templates (React Email)
├── beeax-sdk/        # CLI + SDK for building apps as code
├── beeax-docker/     # Docker, Compose, and Kubernetes manifests
├── beeax-docs/       # Documentation
└── beeax-website/    # Marketing website
```

## Getting started (local development)

**Prerequisites:** Node `^24.5.0`, Yarn `>=4`, and either local PostgreSQL + Redis or Docker.

```bash
# 1. Clone
git clone https://github.com/shibinsp/CRM.git
cd CRM

# 2. Install dependencies
yarn install

# 3. Set up the dev environment
#    (starts Postgres + Redis, copies .env files, initializes the database)
bash packages/beeax-utils/setup-dev-env.sh

# 4. Start frontend + backend + worker
yarn start
```

The frontend runs on http://localhost:3001 and the server on http://localhost:3000.
On the sign-in screen, click **Continue with Email** to use the prefilled local credentials.

## Running with Docker

```bash
cd packages/beeax-docker
cp .env.example .env   # set ENCRYPTION_KEY, APP_SECRET, etc.
docker compose up -d
```

## Common commands

```bash
# Run a single test file
npx jest path/to/test.test.ts --config=packages/<package>/jest.config.mjs

# Lint / typecheck a package
npx nx lint beeax-front
npx nx typecheck beeax-server

# Build (build beeax-shared first)
npx nx build beeax-shared
npx nx build beeax-front
npx nx build beeax-server

# Reset the database
npx nx database:reset beeax-server
```

See [CLAUDE.md](./CLAUDE.md) for the full development guide and conventions.

## License

BeeAX CRM is released under the **AGPL-3.0** license. See [LICENSE](./LICENSE) for details.
