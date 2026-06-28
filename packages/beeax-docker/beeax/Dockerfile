# ===========================================================================
# Dependency stages
# ===========================================================================

FROM node:24.16.0-alpine3.23@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14 AS front-deps

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./tsconfig.base.json ./nx.json /app/
COPY ./.yarn/releases /app/.yarn/releases
COPY ./.yarn/patches /app/.yarn/patches

COPY ./packages/beeax-ui/package.json /app/packages/beeax-ui/
COPY ./packages/beeax-shared/package.json /app/packages/beeax-shared/
COPY ./packages/beeax-front/package.json /app/packages/beeax-front/
COPY ./packages/beeax-front-component-renderer/package.json /app/packages/beeax-front-component-renderer/
COPY ./packages/beeax-sdk/package.json /app/packages/beeax-sdk/
COPY ./packages/beeax-client-sdk/package.json /app/packages/beeax-client-sdk/

RUN yarn workspaces focus beeax beeax-front beeax-front-component-renderer beeax-ui beeax-shared beeax-sdk beeax-client-sdk && yarn cache clean && npx nx reset


FROM node:24.16.0-alpine3.23@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14 AS server-deps

WORKDIR /app

COPY ./package.json ./yarn.lock ./.yarnrc.yml ./tsconfig.base.json ./nx.json /app/
COPY ./.yarn/releases /app/.yarn/releases
COPY ./.yarn/patches /app/.yarn/patches

COPY ./packages/beeax-emails/package.json /app/packages/beeax-emails/
COPY ./packages/beeax-server/package.json /app/packages/beeax-server/
COPY ./packages/beeax-server/patches /app/packages/beeax-server/patches
COPY ./packages/beeax-shared/package.json /app/packages/beeax-shared/
COPY ./packages/beeax-client-sdk/package.json /app/packages/beeax-client-sdk/

RUN yarn workspaces focus beeax beeax-server beeax-emails beeax-shared beeax-client-sdk && yarn cache clean && npx nx reset


FROM server-deps AS beeax-server-build

COPY ./packages/beeax-emails /app/packages/beeax-emails
COPY ./packages/beeax-shared /app/packages/beeax-shared
COPY ./packages/beeax-client-sdk /app/packages/beeax-client-sdk
COPY ./packages/beeax-server /app/packages/beeax-server

RUN npx nx run beeax-server:lingui:extract && \
    npx nx run beeax-server:lingui:compile && \
    npx nx run beeax-emails:lingui:extract && \
    npx nx run beeax-emails:lingui:compile

RUN npx nx run beeax-server:build

# Clean server build output (type declarations and compiled tests are not needed at runtime;
# source maps are kept because beeax-infra extracts them from the image for Sentry uploads)
RUN find /app/packages/beeax-server/dist -name '*.d.ts' -delete \
 && rm -rf /app/packages/beeax-server/dist/packages/beeax-server/test

RUN yarn workspaces focus --production beeax-emails beeax-shared beeax-client-sdk beeax-server


FROM front-deps AS beeax-front-build

COPY ./packages/beeax-front /app/packages/beeax-front
COPY ./packages/beeax-front-component-renderer /app/packages/beeax-front-component-renderer
COPY ./packages/beeax-ui /app/packages/beeax-ui
COPY ./packages/beeax-shared /app/packages/beeax-shared
COPY ./packages/beeax-sdk /app/packages/beeax-sdk
COPY ./packages/beeax-client-sdk /app/packages/beeax-client-sdk
RUN npx nx run beeax-front:lingui:extract && \
    npx nx run beeax-front:lingui:compile
# To skip the memory-intensive frontend build, pre-build on the host:
#   npx nx build beeax-front
# The check below will use packages/beeax-front/build/ if it already exists.
RUN if [ -d /app/packages/beeax-front/build ]; then \
      echo "Using pre-built frontend from host"; \
    else \
      NODE_OPTIONS="--max-old-space-size=8192" npx nx build beeax-front; \
    fi


# ===========================================================================
# Target: beeax-server (server only, no frontend)
#   docker build --target beeax-server -f packages/beeax-docker/beeax/Dockerfile .
# ===========================================================================

FROM node:24.16.0-alpine3.23@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14 AS beeax-server

# Force the patched Alpine OpenSSL libs (base bakes 3.5.6-r0; repo ships
# 3.5.7-r0). Node bundles its own OpenSSL, but psql/curl link these system
# libs, so the upgrade hardens runtime TLS and clears the scanner.
RUN apk add --no-cache \
    'curl>=8.19.0-r0' \
    'nghttp2-libs>=1.69.0-r0' \
    'libcrypto3>=3.5.7-r0' \
    'libssl3>=3.5.7-r0' \
    'postgresql18-client>=18.4-r0' \
    jq

COPY ./packages/beeax-docker/beeax/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
WORKDIR /app/packages/beeax-server

ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION
ENV NODE_ENV=production

# Workspace root config
COPY --chown=1000 --from=beeax-server-build /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/
COPY --chown=1000 --from=beeax-server-build /app/tsconfig.base.json /app/nx.json /app/
COPY --chown=1000 --from=beeax-server-build /app/.yarn /app/.yarn
COPY --chown=1000 --from=beeax-server-build /app/node_modules /app/node_modules

# Server package (compiled dist + package.json only, no src/)
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-server/package.json /app/packages/beeax-server/
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-server/dist /app/packages/beeax-server/dist
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-server/patches /app/packages/beeax-server/patches

# Workspace packages (dist + package.json; node_modules symlinks resolve to these)
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-shared/package.json /app/packages/beeax-shared/
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-shared/dist /app/packages/beeax-shared/dist
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-emails/package.json /app/packages/beeax-emails/
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-emails/dist /app/packages/beeax-emails/dist
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-client-sdk/package.json /app/packages/beeax-client-sdk/
COPY --chown=1000 --from=beeax-server-build /app/packages/beeax-client-sdk/dist /app/packages/beeax-client-sdk/dist

LABEL org.opencontainers.image.source=https://github.com/beeax/beeax
LABEL org.opencontainers.image.description="BeeAX server image (no frontend)."

# Remove unused, unpatchable components the scanner flags (none are executed at
# runtime, and none can be fixed by upgrading our deps or Node):
#  - the bundled npm CLI: the app uses yarn via corepack and never invokes npm,
#    and npm's bundled ip-address has no patched release;
#  - example/ apps vendored inside dependencies, e.g. passport-microsoft's
#    example/login ships a package-lock.json for an old Express demo
#    (body-parser, ejs, express, ...) that is never installed or run.
#  - the Node dev headers: only node-gyp needs them and native addons are
#    compiled in the build stages; their vendored openssl/opensslv.h is what
#    scanners fingerprint whenever OpenSSL patches ahead of Node releases.
# TODO(2026-06-17): the node binary statically links OpenSSL 3.5.6 (June 9
# OpenSSL advisory fixed in 3.5.7). Bump the pinned node:24-alpine base once
# the announced June 17, 2026 Node security release ships a 24.x linking
# OpenSSL >= 3.5.7 — check deps/openssl/openssl/VERSION.dat on the release tag.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx \
      /usr/local/include/node && \
    find /app/node_modules -type d -name example -prune -exec rm -rf {} +

RUN mkdir -p /app/.local-storage /app/packages/beeax-server/.local-storage && \
    chown 1000:1000 /app/.local-storage /app/packages/beeax-server/.local-storage

USER 1000

CMD ["node", "dist/main"]
ENTRYPOINT ["/app/entrypoint.sh"]


# ===========================================================================
# Target: beeax-server-aws (server only + aws-cli, no frontend)
#   docker build --target beeax-server-aws -f packages/beeax-docker/beeax/Dockerfile .
# ===========================================================================

FROM beeax-server AS beeax-server-aws

USER root
RUN apk add --no-cache aws-cli
USER 1000


# ===========================================================================
# Target: beeax (server + frontend)
#   docker build --target beeax -f packages/beeax-docker/beeax/Dockerfile .
# ===========================================================================

FROM beeax-server AS beeax

COPY --chown=1000 --from=beeax-front-build /app/packages/beeax-front/build /app/packages/beeax-server/dist/front

LABEL org.opencontainers.image.description="BeeAX image with backend and frontend."


# ===========================================================================
# Target: beeax-aws (server + frontend + aws-cli)
#   docker build --target beeax-aws -f packages/beeax-docker/beeax/Dockerfile .
# ===========================================================================

FROM beeax AS beeax-aws

USER root
RUN apk add --no-cache aws-cli
USER 1000


# ===========================================================================
# Target: beeax-app-dev (all-in-one with Postgres + Redis)
#   docker build --target beeax-app-dev -f packages/beeax-docker/beeax/Dockerfile .
# ===========================================================================

FROM alpine:3.20 AS s6-fetch
ARG S6_OVERLAY_VERSION=3.2.0.2
ARG TARGETARCH
RUN if [ "$TARGETARCH" = "arm64" ]; then echo "aarch64" > /tmp/s6arch; \
    else echo "x86_64" > /tmp/s6arch; fi
RUN S6_ARCH=$(cat /tmp/s6arch) && \
    wget -O /tmp/s6-overlay-noarch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" && \
    wget -O /tmp/s6-overlay-noarch.tar.xz.sha256 \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz.sha256" && \
    wget -O /tmp/s6-overlay-arch.tar.xz \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" && \
    wget -O /tmp/s6-overlay-arch.tar.xz.sha256 \
      "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz.sha256" && \
    cd /tmp && \
    NOARCH_SUM=$(awk '{print $1}' s6-overlay-noarch.tar.xz.sha256) && \
    ARCH_SUM=$(awk '{print $1}' s6-overlay-arch.tar.xz.sha256) && \
    echo "$NOARCH_SUM  s6-overlay-noarch.tar.xz" | sha256sum -c - && \
    echo "$ARCH_SUM  s6-overlay-arch.tar.xz" | sha256sum -c -

FROM node:24.16.0-alpine3.23@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14 AS beeax-app-dev

# s6-overlay
COPY --from=s6-fetch /tmp/s6-overlay-noarch.tar.xz /tmp/
COPY --from=s6-fetch /tmp/s6-overlay-arch.tar.xz /tmp/
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz \
 && tar -C / -Jxpf /tmp/s6-overlay-arch.tar.xz \
 && rm /tmp/s6-overlay-*.tar.xz

# See beeax-server above: patched Alpine OpenSSL libs (psql/curl/redis link
# these system libs; Node bundles its own).
RUN apk add --no-cache \
    postgresql18 postgresql18-contrib \
    redis \
    'libcrypto3>=3.5.7-r0' \
    'libssl3>=3.5.7-r0' \
    curl jq su-exec

# Workspace root config
COPY --from=beeax-server-build /app/package.json /app/yarn.lock /app/.yarnrc.yml /app/
COPY --from=beeax-server-build /app/tsconfig.base.json /app/nx.json /app/
COPY --from=beeax-server-build /app/.yarn /app/.yarn
COPY --from=beeax-server-build /app/node_modules /app/node_modules

# Server package (compiled dist + package.json only, no src/)
COPY --from=beeax-server-build /app/packages/beeax-server/package.json /app/packages/beeax-server/
COPY --from=beeax-server-build /app/packages/beeax-server/dist /app/packages/beeax-server/dist
COPY --from=beeax-server-build /app/packages/beeax-server/patches /app/packages/beeax-server/patches

# Workspace packages (dist + package.json; node_modules symlinks resolve to these)
COPY --from=beeax-server-build /app/packages/beeax-shared/package.json /app/packages/beeax-shared/
COPY --from=beeax-server-build /app/packages/beeax-shared/dist /app/packages/beeax-shared/dist
COPY --from=beeax-server-build /app/packages/beeax-emails/package.json /app/packages/beeax-emails/
COPY --from=beeax-server-build /app/packages/beeax-emails/dist /app/packages/beeax-emails/dist
COPY --from=beeax-server-build /app/packages/beeax-client-sdk/package.json /app/packages/beeax-client-sdk/
COPY --from=beeax-server-build /app/packages/beeax-client-sdk/dist /app/packages/beeax-client-sdk/dist

# Frontend static build
COPY --from=beeax-front-build /app/packages/beeax-front/build /app/packages/beeax-server/dist/front

# Source maps are not needed in the dev image (no Sentry). Node dev headers are
# dropped for the same scanner-hygiene reasons as in beeax-server above.
RUN find /app/packages/beeax-server/dist -name '*.js.map' -delete \
 && rm -rf /usr/local/include/node

# s6 service definitions
COPY packages/beeax-docker/beeax-app-dev/rootfs/ /

RUN mkdir -p /data/postgres /data/redis /app/packages/beeax-server/.local-storage \
 && chown -R postgres:postgres /data/postgres \
 && chown 1000:1000 /data/redis /app/packages/beeax-server/.local-storage

ARG APP_VERSION=0.0.0

ENV S6_KEEP_ENV=1
ENV PG_DATABASE_URL=postgres://beeax:beeax@localhost:5432/default \
    SERVER_URL=http://localhost:2020 \
    REDIS_URL=redis://localhost:6379 \
    STORAGE_TYPE=local \
    APP_SECRET=beeax-app-dev-secret-not-for-production \
    APP_VERSION=$APP_VERSION \
    NODE_ENV=development \
    NODE_PORT=2020 \
    DISABLE_DB_MIGRATIONS=true \
    DISABLE_CRON_JOBS_REGISTRATION=true \
    IS_BILLING_ENABLED=false \
    SIGN_IN_PREFILLED=true \
    APPLICATION_LOG_DRIVER=CONSOLE

EXPOSE 2020
VOLUME ["/data/postgres", "/app/packages/beeax-server/.local-storage"]

LABEL org.opencontainers.image.source=https://github.com/beeax/beeax
LABEL org.opencontainers.image.description="All-in-one BeeAX image for local development and SDK usage. Includes PostgreSQL, Redis, server, and worker."

ENTRYPOINT ["/init"]
