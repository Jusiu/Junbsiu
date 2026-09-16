# T3N Agent Build Challenge — Submission

**Bounty:** Try out new docs to build a trusted agent with T3N that we can distribute / host  
**Listing:** https://earn.superteam.fun/listing/t3n-agent-build-challenge/  
**Submitter GitHub:** @Jusiu  
**Deadline:** 2026-09-16 15:59 UTC / 23:59 HKT  

---

## 1. Overview

### Agent name
**Acme Support Triage Agent** — FAQ / support inbox triage for a small retail business.

### Problem
Small businesses drown in repetitive support messages (shipping, returns, billing, account lockouts) while still needing safe escalation for fraud / GDPR / account-takeover cases. They need something **useful on day one** and **easy to maintain** after a hackathon (edit a FAQ JSON file, not a model farm).

### Solution
A Terminal 3 (T3N) ADK agent that:

1. Obtains a verifiable **agent DID** via the official SDK / CLI (`@terminal3/t3n-sdk@5.2.0`).
2. Publishes a public **agent card** on T3N (`t3n agent create-card` / `host-card`).
3. Triages inbound tickets against `data/faq.json` (category, confidence, auto-reply vs human review vs escalate).
4. Binds triage output to the agent DID for a simple audit trail in the console report.

### Why T3N
- Identity + discoverability on T3N (DID + hosted card) without inventing storage.
- Clear separation of **tenant** vs **agent** keys/credits (per docs).
- Path to TEE contracts + member delegation later without rewriting the triage core.

### Tech stack
- Node.js ESM + `tsx`
- `@terminal3/t3n-sdk@5.2.0` (pinned to official Quickstart)
- Deterministic FAQ triage (no third-party LLM required for the demo)

### How to run (reviewer)
```bash
git clone <REPO_LINK>
cd <repo>
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

**Repo URL:** `REPLACE_WITH_PUBLIC_REPO_URL`  
**Owner:** @Jusiu  
**Suggested name:** `t3n-support-triage-agent`  
**Local scaffold path (pre-publish):** `/workspace/t3n/agent-scaffold/`

Checklist before making public:
- [ ] No secrets in git history (`.env` gitignored)
- [ ] README renders
- [ ] `npm run offline:triage` works on a clean clone
- [ ] License MIT

---

## 3. Screenshots

> Paste images into the published Google Doc. Filenames below are suggested capture order.

### Screenshot A — SSO / claim success
- **Placeholder:** `[SCREENSHOT: claim page showing DID issued — REDACT API KEY]`  
- Shows: tenant `did:t3n:…` provisioned from https://go.terminal3.io/adk-community  

### Screenshot B — Tenant Quickstart
- **Placeholder:** `[SCREENSHOT: terminal — npm run quickstart → Connected as: did:t3n:…]`

### Screenshot C — Agent auth
- **Placeholder:** `[SCREENSHOT: terminal — npm run agent:auth → Agent connected as: did:t3n:…]`  
- Confirm agent DID ≠ tenant DID

### Screenshot D — Triage demo
- **Placeholder:** `[SCREENSHOT: npm run agent:triage output — categories + escalate case]`

### Screenshot E — Public agent card (if registered)
- **Placeholder:** `[SCREENSHOT: host-card URL and/or curl of /api/agent-card/<did>]`

### Screenshot F — Repo
- **Placeholder:** `[SCREENSHOT: public GitHub repo page under @Jusiu]`

---

## 4. Bugs / docs friction found

> Judging explicitly values bug submission quality. Log real issues with repro steps. Remove any row you did not personally hit.

| # | Area | Symptom | Expected | Repro / notes | Severity |
|---|------|---------|----------|---------------|----------|
| 1 | Docs consistency | Community landing (`go.terminal3.io/adk-community`) sample uses `setEnvironment("sandbox")` while Quickstart uses `"testnet"` and `fetchTrustedManifest("testnet")`. | One canonical env name for first-time builders. | Side-by-side compare of landing snippet vs Quickstart. Recorded which env we used: **testnet (per Quickstart)**. | Medium (docs) |
| 2 | Claim UX | API key shown **once** and cannot be retrieved later. | Expected per docs, but easy to lose mid-hackathon. | Leave claim page without copying → blocked until new signup/email policy. | Low (by design) / High impact if lost |
| 3 | Agent credits | Using tenant key as agent identity → metered calls fail (`InsufficientCreditError` family). | Docs warn not to reuse keys; still a common footgun. | Attempt agent flow with single key. | Medium |
| 4 | Bundlers | SDK WASM + Next/Vite/Webpack known rough edge (documented). | Plain `tsx` Node path works. | N/A if we stayed on `tsx` (we did). | Low |
| 5 | REPLACE | _Add any live bug with `request_id` if you hit HTTP 500s_ | | | |

**Platform contact used:** https://t.me/terminal3developer / https://t.me/wardumb (quote Superteam)

---

## 5. Continue running vs hand off to T3N

**Choice:** `REPLACE — pick one`

### Option A — We continue running
- We keep the public repo under @Jusiu, respond to issues, and maintain `data/faq.json`.
- Interested in Terminal 3 startup program / listing page (as mentioned on the bounty).
- Ops: Node 18+, two secrets in a password manager / secret store, cron or inbox webhook later.

### Option B — Hand off to Terminal 3 Network (preferred for distribution/hosting)
**Handover process:**
1. Transfer or grant admin on the public GitHub repo to Terminal 3 maintainers.
2. Rotate / re-issue **tenant** and **agent** keys to T3-controlled secrets (old keys revoked after confirm).
3. Deliver: README runbook, FAQ JSON, agent DID + card URL, Earn/Google Doc link, known bugs table.
4. Confirm whether T3 will re-host the agent card and any future TEE contract under their org path ([org-owned agent](https://docs.terminal3.io/developers/agents/provision-org-agent) if applicable).
5. We remain available for one async Q&A pass within 7 days of winner announcement.

**Recommendation for this scaffold:** **Option B (hand off)** — designed for T3 to distribute/host; triage core is intentionally small.  
_(Change to Option A if Jusiu wants to keep operating it.)_

---

## 6. Links & IDs (fill after claim)

| Item | Value |
|------|-------|
| Tenant DID | `did:t3n:REPLACE` |
| Agent DID | `did:t3n:REPLACE` |
| Agent card URL | `REPLACE` |
| Google Doc (this doc, published) | `REPLACE` |
| X post (bonus) | `REPLACE` |
| Env used | `testnet` |

---

## 7. License / contact

MIT · GitHub @Jusiu · Earn submission email: `REPLACE`  
Sponsor POC: Ian Chong / https://t.me/wardumb  
