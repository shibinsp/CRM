<div align="center">
  <a href="https://beeax.com">
    <picture>
      <img alt="BeeAX logo" src="https://raw.githubusercontent.com/beeax/beeax/main/packages/beeax-website/public/images/core/logo.svg" height="128">
    </picture>
  </a>
  <h1>Create BeeAX App</h1>

<a href="https://www.npmjs.com/package/create-beeax-app"><img alt="NPM version" src="https://img.shields.io/npm/v/create-beeax-app.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/beeax/beeax/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/cx5n4Jzs57"><img alt="Join the community on Discord" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=BeeAX&labelColor=000000&logoWidth=20"></a>

</div>

The official scaffolding CLI for building apps on top of [BeeAX CRM](https://beeax.com). Sets up a ready-to-run project with [beeax-sdk](https://www.npmjs.com/package/beeax-sdk).

## Quick start

```bash
npx create-beeax-app@latest my-beeax-app
cd my-beeax-app
yarn beeax dev
```

The scaffolder will:

1. Create a new project with TypeScript, linting, tests, and a preconfigured `beeax` CLI
2. Start a local BeeAX server via Docker (pulls the latest image automatically)
3. Authenticate with the development API key

## Options

| Flag                               | Description                                                           |
| ---------------------------------- | --------------------------------------------------------------------- |
| `--name <name>`                    | Set the app name                                                      |
| `--display-name <displayName>`     | Set the display name                                                  |
| `--description <description>`      | Set the description                                                   |
| `--url <url>`                      | BeeAX workspace URL (default: `http://localhost:2020`)               |
| `--authentication-method <method>` | `oauth` or `apiKey` (default: `apiKey` for local, `oauth` for remote) |

## Documentation

Full documentation is available at **[docs.beeax.com/developers/extend/apps](https://docs.beeax.com/developers/extend/apps/getting-started/quick-start)**:

- [Quick Start](https://docs.beeax.com/developers/extend/apps/getting-started/quick-start) — scaffold, run a local server, sync your code
- [Concepts](https://docs.beeax.com/developers/extend/apps/getting-started/concepts) — how apps work: entity model, sandboxing, lifecycle
- [Operations](https://docs.beeax.com/developers/extend/apps/operations/overview) — CLI, testing, CI, deploy and publish

## Troubleshooting

- Server not starting: check Docker is running (`docker info`), then try `yarn beeax docker:logs`.
- Auth not working: run `yarn beeax remote:add` to re-authenticate.
- Types not generated: ensure `yarn beeax dev` is running — it auto-generates the typed client.

## Contributing

- See our [GitHub](https://github.com/beeax/beeax)
- Join our [Discord](https://discord.gg/cx5n4Jzs57)
