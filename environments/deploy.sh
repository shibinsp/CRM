#!/usr/bin/env bash
# BeeAX CRM — environment deploy helper (Kubernetes + Helm)
#
# Usage:
#   environments/deploy.sh <development|staging|production> [--dry-run]
#
# What it does:
#   1. Selects the namespace  beeax-<env>
#   2. Creates a Secret  beeax-server-env  from environments/<env>/server.env
#      (the chart reads APP_SECRET / DB / Redis from values; this Secret is for
#       any extra app vars you wire via server.extraEnv valueFrom.secretKeyRef)
#   3. Runs: helm upgrade --install beeax <chart> -n beeax-<env> -f <env>/values.yaml
set -euo pipefail

ENV="${1:-}"
DRY="${2:-}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHART="$ROOT/packages/beeax-docker/helm/beeax"
ENV_DIR="$ROOT/environments/$ENV"

case "$ENV" in
  development|staging|production) ;;
  *) echo "Usage: environments/deploy.sh <development|staging|production> [--dry-run]"; exit 1 ;;
esac

[ -d "$ENV_DIR" ] || { echo "Missing $ENV_DIR"; exit 1; }
NS="beeax-$ENV"

echo "==> Environment: $ENV   Namespace: $NS"

if [ "$DRY" = "--dry-run" ]; then
  helm upgrade --install beeax "$CHART" \
    --namespace "$NS" --create-namespace \
    -f "$ENV_DIR/values.yaml" --dry-run
  exit 0
fi

kubectl create namespace "$NS" --dry-run=client -o yaml | kubectl apply -f -

# App env as a Secret (do NOT rely on committed REPLACE_ME values in staging/prod)
kubectl create secret generic beeax-server-env \
  --from-env-file="$ENV_DIR/server.env" \
  --namespace "$NS" \
  --dry-run=client -o yaml | kubectl apply -f -

helm upgrade --install beeax "$CHART" \
  --namespace "$NS" --create-namespace \
  -f "$ENV_DIR/values.yaml"

echo "==> Deployed beeax to $NS"
