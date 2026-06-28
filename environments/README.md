# Environments — BeeAX CRM

Multi-environment configuration for **development**, **staging**, and **production**.
The Nx packages are unchanged; this folder holds per-environment config and deploy wiring.

```
environments/
├── deploy.sh                 # helm + kubectl deploy helper
├── development/
│   ├── server.env            # beeax-server app config (local/Docker + secret source)
│   ├── front.env             # beeax-front build/runtime config
│   └── values.yaml           # Helm overrides for the beeax-development namespace
├── staging/      … same three files (beeax-staging namespace)
└── production/   … same three files (beeax-production namespace)
```

## What drives what

| Layer | Source of truth | Used by |
| --- | --- | --- |
| App behaviour (flags, URLs, drivers) | `<env>/server.env`, `<env>/front.env` | Local dev, Docker, and as the Secret source in k8s |
| Kubernetes infra (replicas, resources, ingress, storage, db/redis, app `env`) | `<env>/values.yaml` | Helm chart `packages/beeax-docker/helm/beeax` |

Each environment maps to its own **namespace**: `beeax-development`, `beeax-staging`,
`beeax-production`.

## Environment differences (summary)

| | development | staging | production |
| --- | --- | --- | --- |
| `NODE_ENV` | development | production | production |
| Image tag | `latest` | `staging` | pinned `vX.Y.Z` |
| Server replicas | 1 | 2 | 3 |
| Worker replicas | 1 | 1 | 2 |
| Postgres / Redis | in-cluster | managed | managed |
| Storage | local | S3 | S3 |
| Sign-in prefilled | yes | no | no |
| Email verification | off | on | on |
| Log level | debug | info | warn |
| Errors | console | Sentry | Sentry |

## Deploy (Kubernetes + Helm)

```bash
# preview
environments/deploy.sh staging --dry-run

# apply
environments/deploy.sh development
environments/deploy.sh staging
environments/deploy.sh production
```

This creates the namespace, loads `server.env` as the `beeax-server-env` Secret, and runs
`helm upgrade --install beeax <chart> -f environments/<env>/values.yaml`.

## Local development

```bash
cp environments/development/server.env packages/beeax-server/.env
cp environments/development/front.env  packages/beeax-front/.env
yarn start
```

## Secrets ⚠️

The `REPLACE_ME` values in `staging/` and `production/` are **placeholders**. Never commit
real secrets. Use a secret manager (sealed-secrets, External Secrets, cloud KMS) and inject
`APP_SECRET`, DB/Redis credentials, SMTP, and S3 keys at deploy time — not from these files.
