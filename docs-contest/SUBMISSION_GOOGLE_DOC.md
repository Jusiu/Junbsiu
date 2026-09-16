# T3N Agent Build Challenge — Submission

**Bounty:** Try out new docs to build a trusted agent with T3N that we can distribute / host  
**Listing:** https://earn.superteam.fun/listing/t3n-agent-build-challenge/  
**Submitter GitHub:** @Jusiu / Junbsiu  
**Deadline:** 2026-09-16 15:59 UTC / 23:59 HKT

---

## 1. Overview

### Agent name
**Acme Support Triage Agent** — FAQ / support inbox triage for a small retail business.

### Problem
Small businesses drown in repetitive support messages (shipping, returns, billing, account lockouts) while still needing safe escalation for fraud / GDPR / account-takeover cases. They need something useful on day one and easy to maintain after a hackathon (edit a FAQ JSON file, not a model farm).

### Solution
A Terminal 3 (T3N) ADK agent that:

1. Obtains a verifiable agent DID via the official SDK (`@terminal3/t3n-sdk@5.2.0`).
2. Publishes a public agent card on T3N (`t3n agent create-card` / `host-card`).
3. Triages inbound tickets against `data/faq.json` (category, confidence, auto-reply vs human review vs escalate).
4. Binds triage output to the agent DID for a simple audit trail in the console report.

### Why T3N
- Identity + discoverability on T3N (DID + hosted card) without inventing storage.
- Clear separation of tenant vs agent keys/credits (per docs).
- Path to TEE contracts + member delegation later without rewriting the triage core.

### Tech stack
- Node.js ESM + `tsx`
- `@terminal3/t3n-sdk@5.2.0` (pinned to official Quickstart)
- Deterministic FAQ triage (no third-party LLM required for the demo)

### How to run (reviewer)
```bash
git clone https://github.com/Jusiu/Junbsiu.git
cd Junbsiu
npm install
export T3N_API_KEY="0x..."   # tenant key from claim page
export AGENT_KEY="0x..."     # second key for the agent
npm run quickstart
npm run agent:auth
npm run agent:triage
./scripts/register-agent.sh  # optional public card
```

Offline (no keys): `npm run offline:triage`

---

## 2. Public GitHub repo

**Repo URL:** https://github.com/Jusiu/Junbsiu  
**Owner:** @Jusiu  
**License:** MIT  
**Notes:** `.env` is gitignored; only `.env.example` is committed. No secrets in history for this publish.

---

## 3. Screenshots / evidence

> Terminal captures below (API keys redacted). Paste screenshots into this Doc if preferred.

### A — Tenant Quickstart
Connected tenant DID from `npm run quickstart` (see evidence log). Keys redacted.

### B — Agent auth
```
Agent connected as: did:t3n:a1a1650a7ddc2a4d4b33dcbfbf245f20163a2e8f
```
Agent DID ≠ tenant DID (separate AGENT_KEY).

### C — Triage demo (`npm run agent:triage`)
- ticket shipping → auto_reply (Orders & shipping)
- double charge → human_review (Billing)
- password reset → auto_reply (Account)
- hacked + GDPR delete → escalate_now
- unknown product → human_review

### D — Repo
https://github.com/Jusiu/Junbsiu

---

## 4. Bugs / docs friction found

| # | Area | Symptom | Expected | Repro / notes | Severity |
|---|------|---------|----------|---------------|----------|
| 1 | Docs consistency | Community landing sample uses `setEnvironment("sandbox")` while Quickstart uses `"testnet"` and `fetchTrustedManifest("testnet")`. | One canonical env name for first-time builders. | Used **testnet** per Quickstart. | Medium (docs) |
| 2 | Claim UX | API key shown once and cannot be retrieved later. | Expected per docs, but easy to lose mid-hackathon. | Leave claim page without copying → blocked. | High impact if lost |
| 3 | Agent credits | Reusing tenant key as agent identity fails metered agent calls. | Docs warn not to reuse keys; still a common footgun. | Attempted agent flow with single key before claiming a second. | Medium |
| 4 | Bundlers | SDK WASM + Next/Vite/Webpack known rough edge (documented). | Plain `tsx` Node path works. | Stayed on `tsx`. | Low |

**Platform contact:** https://t.me/terminal3developer / https://t.me/wardumb (quote Superteam)

---

## 5. Continue running vs hand off to T3N

**Choice:** Prefer to hand this over to Terminal 3 Network to maintain and host after the challenge.

Repo is public under @Jusiu with MIT license, README runbook, FAQ JSON, and agent-card registration scripts.

Handover: transfer/grant repo access, rotate tenant+agent keys into T3 secrets, deliver DIDs + card URL + this Google Doc; available for one async Q&A within 7 days of winner announcement.

Open to T3 startup program if you prefer we keep operating it instead.

### DIDs
- **Agent DID:** `did:t3n:a1a1650a7ddc2a4d4b33dcbfbf245f20163a2e8f`
- **Tenant DID:** (from Quickstart — fill from evidence)

---

## 6. Links
- Listing: https://earn.superteam.fun/listing/t3n-agent-build-challenge/
- Repo: https://github.com/Jusiu/Junbsiu
- Claim page: https://go.terminal3.io/adk-community
