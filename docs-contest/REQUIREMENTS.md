# Superteam Earn — T3N Agent Build Challenge

**Listing:** https://earn.superteam.fun/listing/t3n-agent-build-challenge/  
**Sponsor:** Terminal 3 Network (`@terminal3io`)  
**POC / contact:** Ian Chong (`@iancrj`) · Telegram https://t.me/wardumb  
**DevRel:** devrel@terminal3.io · Builder TG https://t.me/terminal3developer  

## Deadline (hard)

| Zone | Instant |
|------|---------|
| UTC | **2026-09-16 15:59:59.999Z** |
| HKT (Asia/Taipei +8) | **2026-09-16 23:59:59 HKT** |
| Winner announcement by | 2026-09-23 (commitmentDate 2026-09-23T15:59:59.999Z) |

Status at fetch time: **OPEN** · Type: bounty · Region: Global · Skill: Backend / Javascript

## Prize pool — 290 USDC

| Place | Amount |
|-------|--------|
| 1st | 100 USDC |
| 2nd | 50 USDC |
| 3rd | 50 USDC |
| 4th | 30 USDC |
| 5th | 30 USDC |
| 6th | 30 USDC |

Extra sandbox credits: DM https://t.me/wardumb with your DID and quote “Superteam”.

## Scope (from listing description)

1. Sign up via SSO: https://go.terminal3.io/adk-community  
2. Obtain DID & API key; complete **Quickstart** and **Walkthrough** in docs:  
   https://docs.terminal3.io/developers/adk/get-started/quickstart  
3. Build and submit an **enterprise-useful agent** on T3N, with focus on **usefulness** and **ease of maintenance / running after the challenge**.  
4. State in the submission whether you will **continue running it** or **prefer to hand it over to Terminal 3** (include a handover process if handing off).  
   - Sponsor notes they have a startup program & listing page if you continue running.

## Exact submission requirement (completed submission)

> A **public Google Doc** with:
> - **public GitHub repo**
> - **screenshots**
> - **any bugs faced**
>
> …will be considered a completed submission.

There is no separate multi-file upload listed beyond that Google Doc + Earn form fields.

## Judging criteria (verbatim intent)

1. **Time to submit** — earlier / faster / more efficient is better.  
2. **VERY IMPORTANT** — build quality with focus on **usefulness** and **ease to maintain** post-challenge.  
3. Documentation quality.  
4. Bug submission quality.  
5. **Bonus:** share on social media and tag **@terminal3io** on X.

## Earn form fields (eligibility questions — all required)

When submitting on Earn, these three text fields are required:

1. **Email address**
2. **What is your DID generated from the page?** (`did:t3n:…`)
3. **Would you want to continue running this / pass it to us to run it?**

Also expect the usual Earn submission link field pointing at the **public Google Doc**.

## Official technical path (do not invent APIs)

| Step | Doc |
|------|-----|
| Claim key + credits (shown once) | https://docs.terminal3.io/developers/adk/get-started/prerequisites/request-test-tokens |
| Community / SSO claim | https://go.terminal3.io/adk-community |
| Quickstart (`@terminal3/t3n-sdk@5.2.0`, `setEnvironment("testnet")`, `fetchTrustedManifest`) | https://docs.terminal3.io/developers/adk/get-started/quickstart |
| Register public agent (separate agent key + CLI `t3n whoami` / `agent create-card` / `agent host-card`) | https://docs.terminal3.io/developers/agents/register-agent |
| Agent auth vs authorization (member delegation) | https://docs.terminal3.io/developers/adk/get-started/member-delegation |
| TEE walkthrough (Rust/WASM sibling crate) | https://docs.terminal3.io/developers/adk/get-started/walkthrough/write-contract |
| AI assistant skill file | https://docs.terminal3.io/developers/adk/support/ai-coding-assistants |
| Common errors | https://docs.terminal3.io/developers/adk/tips/common-errors |

### Critical SDK constraints from docs

- `"type": "module"` required for top-level `await`.
- Pin SDK: `@terminal3/t3n-sdk@5.2.0`.
- `trustAnchor: await fetchTrustedManifest("testnet")` is **required** on `T3nClient`.
- Never hardcode / derive tenant or agent DID — always read back from authenticated session / `t3n whoami`.
- Agent needs its **own** key + credits from the claim page — **never reuse** tenant `T3N_API_KEY`.
- Keys are shown **once** on claim; store offline / in a password manager, never in git.
- Public SDK defaults to testnet; set explicitly. Community landing also shows `setEnvironment("sandbox")` — for this challenge follow **docs Quickstart: `testnet`** unless your claimed node/cluster docs say otherwise; record which env you used in the Google Doc.
- Optional walkthrough contract reference: `git clone https://github.com/Terminal-3/z-tenant-flight.git` (sibling of Node app, not nested).

## Local deliverables prepared under `/workspace/t3n/`

| Path | Purpose |
|------|---------|
| `REQUIREMENTS.md` | This file |
| `agent-scaffold/` | Public-ready FAQ / support triage agent scaffold |
| `SUBMISSION_DOC.md` | Google Doc draft |
| `EARN_FORM.md` | Earn field answer drafts |
| `USER_ONLY.md` | Steps only the human can do |

## What “done” means for this bounty

1. Human SSO + two keys (tenant + agent) claimed and saved.  
2. `npm run quickstart` prints `did:t3n:…`.  
3. Agent registered / card hosted (CLI) and triage demo run with screenshots.  
4. Public GitHub under **@Jusiu**.  
5. Public Google Doc published (repo + screenshots + bugs + handoff choice).  
6. Earn submission before deadline + optional X post tagging `@terminal3io`.
