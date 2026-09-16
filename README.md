# Acme Support Triage Agent (T3N ADK)

Minimal, **maintainable** FAQ / support-triage agent for a small retail business, built on the official [Terminal 3 ADK](https://docs.terminal3.io/developers/adk/get-started/quickstart) (`@terminal3/t3n-sdk@5.2.0`).

**Challenge:** [Superteam Earn — T3N Agent Build Challenge](https://earn.superteam.fun/listing/t3n-agent-build-challenge/)  
**Focus:** usefulness + ease of maintenance after the challenge (edit `data/faq.json`, no heavy infra).

## What it does

1. Authenticates a **tenant** identity (Quickstart) and a separate **agent** identity (Member Delegation).
2. Optionally registers / hosts a public **agent card** on T3N via the official CLI.
3. Triages inbound support messages against a small FAQ knowledge base:
   - category match (orders, returns, billing, account, product)
   - auto-reply vs human review
   - hard escalate for sensitive keywords (fraud, GDPR, etc.)
4. Binds triage output to the agent `did:t3n:…` for an auditable console report.

This scaffold **does not invent** TEE contract or HTTP placeholder APIs. Those require completing the [Walkthrough](https://docs.terminal3.io/developers/adk/get-started/walkthrough/write-contract) and [Member Delegation](https://docs.terminal3.io/developers/adk/get-started/member-delegation) grants — documented under “Next steps”.

## Prerequisites

- Node.js ≥ 18 (SDK packages may warn for ≥ 22; Quickstart states ≥ 18 for CLI)
- Two keys from [claim / SSO](https://go.terminal3.io/adk-community) (keys shown **once**):
  - `T3N_API_KEY` — tenant / developer
  - `AGENT_KEY` — **separate** agent identity + credits (never reuse tenant key)

## Setup

```bash
git clone <THIS_REPO_URL>
cd agent-scaffold   # or repo root if published as this folder
npm install
cp .env.example .env   # optional; prefer exporting keys in your shell
export T3N_API_KEY="0x..."   # tenant key
export AGENT_KEY="0x..."     # agent key (second claim)
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run offline:triage` | FAQ triage smoke test **without** API keys |
| `npm run quickstart` | Official tenant handshake → prints `did:t3n:…` |
| `npm run agent:auth` | Agent handshake → prints agent DID |
| `npm run agent:triage` | Authenticate as agent + triage demo tickets |
| `npm run agent:triage -- "your message"` | Triage one custom message |
| `./scripts/register-agent.sh` | `whoami` → `create-card` → `host-card` (needs `AGENT_KEY`) |

## Project layout

```
├── data/faq.json              # maintainable knowledge base
├── src/quickstart.ts          # docs Quickstart (tenant)
├── src/agent-auth.ts          # docs Member Delegation auth
├── src/triage-agent.ts        # agent DID + triage demo
├── src/lib/triage.ts          # pure triage logic
├── src/lib/session.ts         # shared T3nClient helper
├── scripts/register-agent.sh  # official t3n CLI registration
├── agent-card.template.json   # ERC-8004-style card template
├── AGENTS.md / .cursorrules   # T3N ADK assistant skill (from docs)
└── package.json               # type:module + sdk@5.2.0
```

## Why this is easy to maintain post-challenge

- **No model hosting** — deterministic keyword triage; change answers in JSON.
- **Identity on T3N** — DID + hosted agent card via first-party CLI.
- **Clear secrets model** — keys only in env; never committed.
- **Handover-friendly** — one README, one FAQ file, three npm scripts, one register script.
- Optional later: add a TEE contract (official `z-tenant-flight` walkthrough) without rewriting triage.

## Next steps (optional Walkthrough)

1. Complete Quickstart + agent auth (above).
2. Clone sibling contract crate: `git clone https://github.com/Terminal-3/z-tenant-flight.git` (see [AI assistants skill](https://docs.terminal3.io/developers/adk/support/ai-coding-assistants)).
3. Follow Write / Build / Register / Invoke contract docs.
4. Grant the agent via `updateMemberDelegation` before any outbound HTTP.

## Security

- Never commit `T3N_API_KEY`, `AGENT_KEY`, or `.env`.
- Never reuse the tenant key as the agent key (`InsufficientCreditError` / wrong identity).
- Never hardcode DIDs — always read from session / `t3n whoami`.

## License

MIT
