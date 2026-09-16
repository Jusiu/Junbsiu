# USER_ONLY steps (human required)

Local prep under `/workspace/t3n/` is done by the agent. Everything below needs **you** (SSO, secrets, GitHub @Jusiu, Google Doc, Earn, X). CloudAgent/SCM publish under Jusiu may also need confirmation in the chief-of-staff chat.

**Deadline:** 2026-09-16 **15:59 UTC** / **23:59 HKT** — submit early (judging includes time-to-submit).

---

## Priority order (do in this sequence)

### 1. SSO + claim keys (blocker for live demo)
1. Open https://go.terminal3.io/adk-community  
2. Sign in (Google / work email). Optional campaign code if you have one.  
3. **Copy tenant API key immediately** (shown once) → password manager.  
4. Note the **tenant DID** (`did:t3n:…`).  
5. Claim a **second** key for the agent (revisit claim page) → save as `AGENT_KEY`.  
6. Extra credits if needed: DM https://t.me/wardumb with DID + “Superteam”.

```bash
cd /workspace/t3n/agent-scaffold
export T3N_API_KEY="0xYOUR_TENANT_KEY"
export AGENT_KEY="0xYOUR_AGENT_KEY"
npm run quickstart
npm run agent:auth
npm run agent:triage
./scripts/register-agent.sh   # optional but strong for screenshots
```

### 2. Screenshots
Capture A–F listed in `SUBMISSION_DOC.md` (redact keys). Run offline triage only if keys delayed: `npm run offline:triage`.

### 3. Publish GitHub under @Jusiu
1. Create public repo on github.com/**Jusiu**/… (e.g. `t3n-support-triage-agent`).  
2. Push contents of `/workspace/t3n/agent-scaffold/` (include README, src, data, scripts; **exclude** `.env` / keys / `node_modules`).  
3. If using CloudAgent/SCM from chief-of-staff: **confirm the launch/publish card** when prompted.  
4. Verify clone + `npm install && npm run offline:triage` from a clean machine/path.

Suggested git commands (run as Jusiu):
```bash
cd /workspace/t3n/agent-scaffold
git init
git add .
git status   # ensure no .env
git commit -m "Initial T3N support triage agent for Superteam challenge"
gh repo create Jusiu/t3n-support-triage-agent --public --source=. --remote=origin --push
```

### 4. Google Doc
1. Create a Google Doc; paste `/workspace/t3n/SUBMISSION_DOC.md`.  
2. Insert screenshots; fill REPLACE fields (repo URL, DIDs, handoff choice).  
3. Share: **Anyone with the link → Viewer**.  
4. Copy public URL into `EARN_FORM.md`.

### 5. Earn submit
1. https://earn.superteam.fun/listing/t3n-agent-build-challenge/  
2. Fill fields from `EARN_FORM.md` (email, DID, handoff answer).  
3. Paste Google Doc URL as submission link.  
4. Submit — do not wait for perfect polish past ~22:30 HKT buffer.

### 6. Bonus X post
Post tagging **@terminal3io** (draft in `EARN_FORM.md`). Add link to Google Doc / repo.

---

## What the executor already prepared (no user action)

| Artifact | Path |
|----------|------|
| Requirements summary | `/workspace/t3n/REQUIREMENTS.md` |
| Agent scaffold | `/workspace/t3n/agent-scaffold/` |
| Google Doc draft | `/workspace/t3n/SUBMISSION_DOC.md` |
| Earn answers draft | `/workspace/t3n/EARN_FORM.md` |
| This checklist | `/workspace/t3n/USER_ONLY.md` |

Verified locally: `npm run offline:triage` OK · `npm run typecheck` OK · SDK `@terminal3/t3n-sdk@5.2.0` installed.

---

## Blockers the user must clear

1. **No API keys in the box** — live `quickstart` / `agent:triage` / `host-card` cannot run until you export keys.  
2. **GitHub @Jusiu credentials** — publish requires your account (or approved CloudAgent).  
3. **Google account** — public Doc.  
4. **Superteam Earn account** — submit the form.  
5. **X account** — bonus only.
