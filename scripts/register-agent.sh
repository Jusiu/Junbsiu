#!/usr/bin/env bash
# Register a public agent per:
# https://docs.terminal3.io/developers/agents/register-agent
set -euo pipefail

ENV="${T3N_ENV:-testnet}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -z "${AGENT_KEY:-}" ]]; then
  echo "Export AGENT_KEY first (separate claim page key for the agent)."
  exit 1
fi

# CLI reads T3N_API_KEY for signing — for agent registration that must be the agent key.
export T3N_API_KEY="$AGENT_KEY"

echo "==> whoami ($ENV)"
AGENT_DID="$(npx --yes @terminal3/t3n-sdk@5.2.0 whoami --env "$ENV")"
echo "AGENT_DID=$AGENT_DID"
export AGENT_DID

echo "==> create-card"
npx --yes @terminal3/t3n-sdk@5.2.0 agent create-card \
  --did "$AGENT_DID" \
  --name "Acme Support Triage Agent" \
  --description "FAQ / support triage for a small retail business. Classifies tickets, suggests FAQ answers, escalates sensitive cases. Easy to maintain post-challenge." \
  --out agent-card.json \
  --force

echo "==> host-card"
npx --yes @terminal3/t3n-sdk@5.2.0 agent host-card --file agent-card.json --env "$ENV"

echo "==> registry"
npx --yes @terminal3/t3n-sdk@5.2.0 agent registry "$AGENT_DID" --env "$ENV" || true

echo "Done. Save AGENT_DID and the printed card URL for your Google Doc / screenshots."
