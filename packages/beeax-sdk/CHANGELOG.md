# Changelog

All notable changes to the [BeeAX SDK](https://www.npmjs.com/package/beeax-sdk) are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **`beeax-client-sdk` should now be a dev dependency too.** Although app code imports it (`CoreApiClient`, `MetadataApiClient`, `RestApiClient`), BeeAX provides it at runtime — logic functions get it from a generated SDK layer and front components resolve it from server-served modules — so the installed copy is only needed for typechecking and the deploy-time build. Newly scaffolded apps now place it under `devDependencies`. Moving it is recommended (not required: the server already strips it from the deployed runtime), and keeps the installed app leaner:

  ```diff
    "dependencies": {
  -   "beeax-client-sdk": "^2.13.0"
    },
    "devDependencies": {
  +   "beeax-client-sdk": "^2.13.0"
    }
  ```

  `beeax build` now also emits a warning when `beeax-client-sdk` is still listed under `dependencies`.

## [2.8.0]

### Breaking Changes

- **`beeax-sdk` must now be a dev dependency.** It ships the `beeax` CLI and the build/scaffolding tooling, which only run at development and build time — it is never imported by a published app's runtime. Newly scaffolded apps already place it under `devDependencies`. Apps created before `2.8.0` must move it when upgrading:

  ```diff
    "dependencies": {
      "beeax-client-sdk": "^2.8.0"
  -   "beeax-sdk": "^2.8.0"
    },
    "devDependencies": {
  +   "beeax-sdk": "^2.8.0"
    }
  ```

  Then reinstall with `rm -rf node_modules && yarn install`. `beeax-client-sdk` stays under `dependencies` because app code imports it at runtime.

  `beeax build` now emits a warning when `beeax-sdk` is still listed under `dependencies`, so existing apps are flagged automatically.
