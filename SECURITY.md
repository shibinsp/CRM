# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in BeeAX CRM, please report it
**privately** — do not open a public issue.

- Email: **security@beeax.app** (replace with your real security contact)
- Include: a description, steps to reproduce, affected version/commit, and impact.

We aim to acknowledge reports within 3 business days and to provide a remediation
timeline after triage. Please give us a reasonable window to fix the issue before any
public disclosure.

## Supported versions

Security fixes are applied to the `main` branch and the latest released version.

## Handling secrets

- Never commit real secrets. The `environments/staging` and `environments/production`
  config files contain `REPLACE_ME` placeholders only.
- Inject `APP_SECRET`, database/Redis credentials, SMTP, and S3 keys at deploy time via a
  secret manager (sealed-secrets, External Secrets, or a cloud KMS) — see
  [`environments/README.md`](./environments/README.md).
- Local `.env` files are git-ignored.
