#!/usr/bin/env bash
set -euo pipefail

APP="${1:?Usage: docker-build.sh <api|worker|web> [tag]}"
TAG="${2:-aura-${APP}:local}"

case "$APP" in
  api|worker|web) ;;
  *)
    echo "Unknown app: $APP (expected api, worker, or web)" >&2
    exit 1
    ;;
esac

GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"

docker build \
  -f "infrastructure/docker/Dockerfile.${APP}" \
  --build-arg "GIT_SHA=${GIT_SHA}" \
  -t "${TAG}" \
  .

echo "Built ${TAG} (GIT_SHA=${GIT_SHA})"
