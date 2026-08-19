#!/usr/bin/env bash
set -euo pipefail

git rev-parse --short=12 HEAD 2>/dev/null || echo "dev"
