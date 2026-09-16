# Superteam Earn — submission field drafts

**Listing:** https://earn.superteam.fun/listing/t3n-agent-build-challenge/  
**Submit before:** 2026-09-16 15:59:59.999Z (23:59 HKT)

Earn eligibility questions (all required) + typical link field:

---

## 1. Email address

```
REPLACE_WITH_YOUR_EMAIL
```

Use the same email you can receive winner / KYC comms on.

---

## 2. What is your DID generated from the page?

```
did:t3n:REPLACE_AFTER_CLAIM
```

Source: DID shown after SSO at https://go.terminal3.io/adk-community (also printed by `npm run quickstart` as tenant DID).  
If the form expects the **agent** DID instead, put the agent DID from `npm run agent:auth` / `t3n whoami` and note both in the Google Doc.

---

## 3. Would you want to continue running this / pass it to us to run it?

**Recommended draft (hand off — matches bounty “distribute / host” framing):**

```
Prefer to hand this over to Terminal 3 Network to maintain and host after the challenge.
Repo will be public under @Jusiu with MIT license, README runbook, FAQ JSON, and agent-card registration scripts.
Handover: transfer/grant repo access, rotate tenant+agent keys into T3 secrets, deliver DIDs + card URL + this Google Doc; available for one async Q&A within 7 days of winner announcement.
Open to T3 startup program if you prefer we keep operating it instead.
```

**Alternate draft (continue running):**

```
We want to continue running it under @Jusiu (public repo + maintained FAQ).
Interested in Terminal 3's startup program / listing page mentioned in the bounty.
Happy to coordinate distribution/hosting with T3 if useful.
```

---

## 4. Submission link (Google Doc)

```
REPLACE_WITH_PUBLIC_GOOGLE_DOC_URL
```

Doc must be **Anyone with the link → Viewer** (or public).  
Must contain: public GitHub repo URL, screenshots, bugs faced, handoff choice.  
Draft content ready at `/workspace/t3n/SUBMISSION_DOC.md` — paste into Google Docs, insert screenshots, then publish.

---

## 5. Optional checklist before clicking Submit

- [ ] Keys claimed & saved offline (tenant + agent)
- [ ] `npm run quickstart` + `agent:triage` screenshots captured (redact keys)
- [ ] Repo public under @Jusiu
- [ ] Google Doc public + link tested in incognito
- [ ] Form fields filled
- [ ] Bonus: X post tagging @terminal3io with repo/doc link
- [ ] Submit with time buffer before 23:59 HKT

## Suggested X post (bonus)

```
Built a small-business FAQ/support triage agent on @terminal3io T3N ADK for the Superteam Earn challenge.
Verifiable agent DID + maintainable FAQ KB — designed to hand off for T3 to host.
Repo: REPLACE
Doc: REPLACE
#T3N #Superteam
```
