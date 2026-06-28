<div align="center">
  <a href="https://beeax.com">
    <picture>
      <img alt="BeeAX logo" src="https://raw.githubusercontent.com/beeax/beeax/main/packages/beeax-website/public/images/core/logo.svg" height="128">
    </picture>
  </a>
  <h1>BeeAX SDK</h1>

<a href="https://www.npmjs.com/package/beeax-sdk"><img alt="NPM version" src="https://img.shields.io/npm/v/beeax-sdk.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/beeax/beeax/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/cx5n4Jzs57"><img alt="Join the community on Discord" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=BeeAX&labelColor=000000&logoWidth=20"></a>

</div>

A CLI and SDK to develop, build, and publish applications that extend [BeeAX CRM](https://beeax.com).

## Quick start

The recommended way to start is with [create-beeax-app](https://www.npmjs.com/package/create-beeax-app):

```bash
npx create-beeax-app@latest my-beeax-app
cd my-beeax-app
yarn beeax dev
```

## Documentation

Full documentation is available at **[docs.beeax.com/developers/extend/apps](https://docs.beeax.com/developers/extend/apps/getting-started)**:

- [Getting Started](https://docs.beeax.com/developers/extend/apps/getting-started) — scaffolding, local server, authentication, dev mode
- [Building Apps](https://docs.beeax.com/developers/extend/apps/building) — entity definitions, API clients, testing, CLI reference
- [Publishing](https://docs.beeax.com/developers/extend/apps/publishing) — deploy, npm publish, marketplace

Guides in this repository:

- [Logic function inputs](./docs/logic-function-inputs.md) — input schema inference, record-typed inputs, and the id contract

## Manual installation

If you are adding `beeax-sdk` to an existing project instead of using `create-beeax-app`:

```bash
yarn add beeax-sdk beeax-client-sdk
```

Then add a `beeax` script to your `package.json`:

```json
{
  "scripts": {
    "beeax": "beeax"
  }
}
```

Run `yarn beeax help` to see all available commands.

## Configuration

The CLI stores credentials per remote in `~/.beeax/config.json`. Run `yarn beeax remote:add` to configure a remote, or `yarn beeax remote:list` to see existing ones.

## Troubleshooting

- Auth errors: run `yarn beeax remote:add` to re-authenticate.
- Typings out of date: restart `yarn beeax dev` to refresh the client and types.
- Not seeing changes in dev: make sure dev mode is running (`yarn beeax dev`).

## Contributing

### Development setup

```bash
git clone https://github.com/beeax/beeax.git
cd beeax
yarn install
```

### Development mode

```bash
npx nx run beeax-sdk:dev
```

### Production build

```bash
npx nx run beeax-sdk:build
```

### Running the CLI locally

```bash
npx nx run beeax-sdk:start -- <command>
```

### Resources

- See our [GitHub](https://github.com/beeax/beeax)
- Join our [Discord](https://discord.gg/cx5n4Jzs57)
