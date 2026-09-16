#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
: "${AGENT_KEY:?Set AGENT_KEY}"
npm run agent:triage
