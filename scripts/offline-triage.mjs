#!/usr/bin/env node
/**
 * Offline triage smoke test (no API key). Useful before SSO/claim.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kb = JSON.parse(readFileSync(join(root, "data/faq.json"), "utf8"));

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function triage(message) {
  const tokens = new Set(tokenize(message));
  const escalateHits = kb.escalate_keywords.filter((k) =>
    message.toLowerCase().includes(k.toLowerCase()),
  );
  if (escalateHits.length) {
    return { escalate: true, category: null, reply: kb.escalate_message, matched: escalateHits };
  }
  let best = null;
  for (const cat of kb.categories) {
    const hits = cat.keywords.filter((k) => message.toLowerCase().includes(k.toLowerCase()));
    if (hits.length && (!best || hits.length > best.hits.length)) best = { cat, hits };
  }
  if (!best) return { escalate: false, category: null, reply: "(human review)", matched: [] };
  return { escalate: false, category: best.cat.label, reply: best.cat.answer, matched: best.hits };
}

const tickets = process.argv.slice(2).length
  ? [process.argv.slice(2).join(" ")]
  : [
      "Where is my shipping tracking?",
      "I need a refund on a double charge",
      "urgent hacked account GDPR delete my data",
    ];

for (const t of tickets) {
  console.log("---", t);
  console.log(triage(t));
}
