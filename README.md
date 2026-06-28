<div align="center">

<img src="images/brand/beeax-logo-source.jpeg" width="120" alt="BeeAX logo" />

# BeeAX CRM

### The AI-native CRM you build, ship & version like the rest of your stack.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-D4A017.svg?style=flat-square)](./LICENSE)
![React](https://img.shields.io/badge/React-18-1E2A3A?style=flat-square&logo=react)
![NestJS](https://img.shields.io/badge/NestJS-API-1E2A3A?style=flat-square&logo=nestjs)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-1E2A3A?style=flat-square&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-1E2A3A?style=flat-square&logo=typescript&logoColor=white)
![Nx](https://img.shields.io/badge/Nx-monorepo-1E2A3A?style=flat-square&logo=nx)

[**Repository**](https://github.com/shibinsp/CRM) · [Quick start](#-quick-start) · [Features](#-features) · [Architecture](#-architecture)

</div>

---

**BeeAX CRM** is an open-source, customizable CRM platform. It gives technical teams the
building blocks of a modern CRM — objects, fields, views, workflows, and AI agents — and lets
you extend everything as code.

The data model is fully **metadata-driven**: standard objects (companies, people, opportunities,
notes, tasks) and any custom objects you define are first-class, each backed by a real database
table and a generated GraphQL API.

## 📸 Screenshots

<table>
  <tr>
    <td width="50%"><img src="images/screenshots/beeax-landing.png" alt="Landing page" /></td>
    <td width="50%"><img src="images/screenshots/beeax-login-hero.png" alt="Sign in" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>Landing page</b></sub></td>
    <td align="center"><sub><b>Sign in</b></sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="images/screenshots/beeax-data.png" alt="Companies" /></td>
    <td width="50%"><img src="images/screenshots/beeax-dashboard.png" alt="Dashboard" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>Companies (CRM records)</b></sub></td>
    <td align="center"><sub><b>Dashboard</b></sub></td>
  </tr>
</table>

## 🧠 AI features

BeeAX ships AI directly on the data model. Each capability is a standard field + a
reproducible server command (rule-based today, with a clearly-marked hook to switch to an
LLM once `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` is set in `packages/beeax-server/.env`).

| Capability | What it does | Run |
| --- | --- | --- |
| **AI deal scoring** | 0–100 win-likelihood + reason on every Opportunity (sortable column) | `nx run beeax-server:command -- opportunity:score` |
| **AI record insights** | Summary + recommended next step + risk on each Opportunity (shown on the record) | `nx run beeax-server:command -- opportunity:score` |
| **AI inbox copilot** | Per-thread summary + suggested reply draft on message threads | `nx run beeax-server:command -- messageThread:summarize` |

New AI fields are rolled out to existing workspaces via versioned upgrade commands
(`upgrade:2-17:*`), so the schema stays in code and migrates cleanly.

## ✨ Features

### 🗂️ Data model & customization
- **Metadata-driven** — every object & field is metadata, backed by a real Postgres table
- **Custom objects & fields** — text, number, select/multi-select, date, currency, rating, relation, links, emails, phones, address, JSON, and more
- **Relationships** — one-to-many & many-to-many between any objects
- **Standard CRM objects** — Companies, People, Opportunities, Tasks, Notes, Attachments
- **Field-level settings** — labels, icons, descriptions, indexes, uniqueness

### 📊 Views & navigation
- **Table, Kanban & Calendar** views per object
- **Filters, sorts & grouping** with multi-condition advanced filters
- **Aggregations** in view footers (sum, average, count, min/max…)
- **Saved views** — public & private, with custom visible fields
- **Command menu** (⌘K) — jump anywhere, run actions, ask AI
- **Global search** — instant, cross-object (companies, people, opportunities…)
- **Record detail pages** — customizable layouts with tabs (Timeline, Tasks, Notes, Files, Emails, Calendar)

### 📈 Dashboards
- **Dashboards** with charts — number, bar, line widgets
- **Front components** embedded in dashboards

### ⚡ Automation & AI
- **Workflows** — event triggers + actions with a visual builder
- **AI agents** — native assistants that draft, summarize & act on CRM data
- **Ask AI** from the command menu, with chat history

### ✉️ Communication
- **Email & calendar sync** — Gmail / Microsoft via OAuth
- **Timeline** — every message, meeting & change logged on the record
- **Compose & send email** from a record

### 🔒 Security & access
- **Role-based access control** — object-, field-, and row-level permissions
- **SSO** — Google, Microsoft, SAML
- **Two-factor authentication** (TOTP)
- **Multi-tenant** — isolated per-workspace Postgres schemas

### 🔌 Developer & extensibility
- **REST & GraphQL APIs** auto-generated from your metadata
- **API keys & webhooks** for integrations
- **Apps as code** — define objects, views, agents & logic with the BeeAX SDK
- **Import / export** of records

### 🚀 Operations
- **Self-hostable** — Docker, Compose, Helm chart & Kubernetes manifests
- **Multi-environment** — development / staging / production config out of the box
- **i18n** — 20+ languages

## 🛠 Tech stack

- **Frontend** — React, TypeScript, Jotai, Linaria, Vite, Apollo Client
- **Backend** — NestJS, TypeORM, PostgreSQL, Redis, GraphQL (GraphQL Yoga), BullMQ
- **Monorepo** — Nx workspace managed with Yarn 4 (Node 24)

## 🚀 Quick start

**Prerequisites:** Node `^24.5.0`, Yarn `>= 4`, and either local PostgreSQL + Redis or Docker.

```bash
# 1. Clone
git clone https://github.com/shibinsp/CRM.git
cd CRM

# 2. Install dependencies
yarn install

# 3. Configure environment (development)
cp environments/development/server.env packages/beeax-server/.env
cp environments/development/front.env  packages/beeax-front/.env

# 4. Start Postgres + Redis and initialize the database
bash packages/beeax-utils/setup-dev-env.sh

# 5. Run frontend + backend + worker
yarn start
```

Frontend → http://localhost:3001 · API → http://localhost:3000

## 🧱 Architecture

```
packages/
├── beeax-front/      # React frontend (the CRM UI)
├── beeax-server/     # NestJS backend API + worker
├── beeax-ui/         # Shared UI component library + theme
├── beeax-shared/     # Common types and utilities
├── beeax-emails/     # Transactional email templates
├── beeax-sdk/        # CLI + SDK for building apps as code
├── beeax-docker/     # Docker, Compose, Helm chart, k8s manifests
├── beeax-docs/       # Documentation
└── beeax-website/    # Marketing website

environments/         # Per-env config (development / staging / production)
images/               # Brand assets + screenshots
```

## 🌍 Environments

Multi-environment config lives in [`environments/`](./environments) — per-env app config and
Helm values for **development**, **staging**, and **production** (Kubernetes namespaces
`beeax-development` / `beeax-staging` / `beeax-production`). See
[`environments/README.md`](./environments/README.md).

```bash
environments/deploy.sh staging --dry-run   # preview
environments/deploy.sh production           # deploy
```

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, conventions, and quality gates, and
[CLAUDE.md](./CLAUDE.md) for the full development guide. Security policy: [SECURITY.md](./SECURITY.md).

## 📄 License

BeeAX CRM is released under the **AGPL-3.0** license — see [LICENSE](./LICENSE).

<div align="center"><sub>© 2026 Beeax AI Tech Private Limited</sub></div>
