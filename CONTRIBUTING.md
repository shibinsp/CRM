# Contributing to BeeAX CRM

Thanks for contributing! This is an Nx monorepo — all code lives under `packages/`.

## Prerequisites

- Node `^24.5.0`, Yarn `>= 4`
- PostgreSQL 16 + Redis (or Docker)

## Local setup

```bash
yarn install
cp environments/development/server.env packages/beeax-server/.env
cp environments/development/front.env  packages/beeax-front/.env
bash packages/beeax-utils/setup-dev-env.sh   # starts Postgres + Redis, inits the DB
yarn start                                    # frontend + backend + worker
```

Frontend → http://localhost:3001 · API → http://localhost:3000

## Where things live

| Area | Path |
| --- | --- |
| Frontend (React) | `packages/beeax-front` |
| Backend (NestJS) + worker | `packages/beeax-server` |
| Shared types/utils | `packages/beeax-shared` |
| UI library + theme | `packages/beeax-ui` |
| Docker / Helm / k8s | `packages/beeax-docker` |
| Environment config | `environments/` |

## Quality gates (run before opening a PR)

```bash
npx nx lint:diff-with-main beeax-front
npx nx typecheck beeax-front
npx nx typecheck beeax-server
npx nx test beeax-front       # or a single file: npx jest <path> --config=packages/<pkg>/jest.config.mjs
```

## Conventions

- Functional components, named exports, `types` over `interface`, no `any`.
- Follow the patterns in [`CLAUDE.md`](./CLAUDE.md) (full development guide).
- Commit one focused change at a time; keep messages clear and imperative.
- Entity changes require an instance command — see `packages/beeax-server/docs/UPGRADE_COMMANDS.md`.

## Branches & PRs

- Branch off `main`; open a PR with a clear description and screenshots for UI changes.
- CI must pass (lint, typecheck, tests, build) before merge.
