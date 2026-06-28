# BeeAX Codex Plugin

Official Codex plugin for building, deploying, and querying BeeAX apps. Bundles five focused skills, the public BeeAX documentation MCP server, and a one-command workspace MCP setup helper.

This package is the source of the plugin published to the Codex marketplace.

## What This Plugin Does

The plugin teaches Codex how to work with the BeeAX CRM platform. After installation, Codex can:

- Scaffold a new BeeAX app with `create-beeax-app`.
- Add or modify app entities (objects, fields, logic functions, layouts, front components, workflows).
- Manage remotes, sync changes, build, deploy, view logs, and configure CI/CD.
- Prepare README, marketplace metadata, logos, and screenshots for npm/marketplace publication.
- Connect to a BeeAX workspace via MCP and present records as readable Markdown with linked record names.

## Installation

### From the Codex Marketplace

Search for "BeeAX" in the Codex plugin directory and install.

### Locally for Development

Copy the marketplace template to a local marketplace config:

```bash
cp packages/beeax-codex-plugin/templates/marketplace.example.json .agents/plugins/marketplace.json
```

Then enable it in Codex via the plugin manager. See [`templates/marketplace.example.json`](./templates/marketplace.example.json) for the exact entry shape.

## Skills

| Skill | Use it for |
|---|---|
| [`create-app`](./skills/create-app/SKILL.md) | Scaffold a new BeeAX app with `create-beeax-app`. |
| [`develop-app`](./skills/develop-app/SKILL.md) | Add or modify objects, fields, logic functions, layouts, front components, workflows. |
| [`manage-app`](./skills/manage-app/SKILL.md) | Manage remotes, sync, build, deploy, logs, troubleshooting, CI/CD. |
| [`publish-app`](./skills/publish-app/SKILL.md) | Prepare README, marketplace metadata, logos, screenshots, public assets. |
| [`use-beeax-mcp`](./skills/use-beeax-mcp/SKILL.md) | Configure BeeAX MCP and retrieve workspace records as readable Markdown. |

Cross-skill operating rules are in [`AGENTS.md`](./AGENTS.md). Reference docs are under [`references/`](./references/).

## MCP Setup

The plugin works in two layers:

- The bundled `beeax-docs` MCP server works immediately and lets Codex search public BeeAX documentation.
- Workspace data access is user-specific. Each user adds their own BeeAX workspace MCP endpoint to their private Codex MCP config using the helper below.

**Do not** add workspace-specific MCP URLs to this package. They are user-local and belong only in the user's machine-local Codex MCP configuration.

### Quick MCP Setup

```bash
bash packages/beeax-codex-plugin/scripts/setup-mcp.sh myworkspace.beeax.com
```

The helper names the server after the workspace host (`beeax-myworkspace`, `beeax-acme-example`, etc.). Codex may open OAuth automatically after the server is added; if it does not, run `codex mcp login <server-name>`. Use `--force-login` only for terminal-only setup.

Equivalent manual CLI setup:

```bash
codex mcp add beeax-myworkspace --url https://myworkspace.beeax.com/mcp
codex mcp login beeax-myworkspace
```

Supported workspace forms:

```text
myworkspace.beeax.com       -> https://myworkspace.beeax.com/mcp       name: beeax-myworkspace
acme.example.com             -> https://acme.example.com/mcp             name: beeax-acme-example
myworkspace.customdomain.com -> https://myworkspace.customdomain.com/mcp name: beeax-myworkspace-customdomain
myworkspace.localhost:3001   -> http://myworkspace.localhost:3001/mcp    name: beeax-myworkspace-localhost-3001
```

### App Declaration

Codex app declarations require a ChatGPT-created app or connector id. The plugin can reference that id, but it cannot create one from an MCP URL by itself.

For that reason, this package does not ship a default `.app.json`. A bundled app declaration would either point to the wrong workspace or expose an app id that is not valid for each user's ChatGPT Developer Mode setup. Keep app declarations local until there is an official shared BeeAX connector id.

After creating the BeeAX app in ChatGPT Developer Mode with your workspace MCP URL, add `packages/beeax-codex-plugin/.app.json`:

```json
{
  "apps": {
    "beeax": {
      "id": "asdk_app_OR_connector_ID_FROM_CHATGPT"
    }
  }
}
```

Then add `"apps": "./.app.json"` to `packages/beeax-codex-plugin/.codex-plugin/plugin.json` and include `.app.json` in this package's `files` array.

## Development

Want to improve the plugin itself? See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for skill authoring, reference editing, validation, and the release process.

### Common Commands

```bash
# Validate the plugin
npx nx run beeax-codex-plugin:validate

# Run validator unit tests
npx nx run beeax-codex-plugin:test
```

### Compliance

Best-practices compliance is tracked in [`CHECKLIST.md`](./CHECKLIST.md) — every official Codex requirement maps to either an automated `validate.js` assertion or a manual sign-off. Changes are recorded in [`CHANGELOG.md`](./CHANGELOG.md).
