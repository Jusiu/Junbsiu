/**
 * Support Triage Agent demo
 *
 * 1) Authenticates as the agent identity (official T3nClient flow).
 * 2) Runs local FAQ triage on sample (or CLI) tickets.
 * 3) Prints a structured triage report bound to the agent DID.
 *
 * Does NOT invent TEE contract calls. Outbound HTTP / contract invoke needs
 * Member Delegation grants — see docs.
 *
 * Usage:
 *   export AGENT_KEY="0x..."
 *   npm run agent:triage
 *   npm run agent:triage -- "Where is my package tracking?"
 */
import { connectWithKey } from "./lib/session.js";
import { loadFaq, triageMessage } from "./lib/triage.js";

const demos = [
  "Hi — my order #4521 shipping is late, can I get tracking?",
  "I was charged twice on my card this week, need a refund receipt.",
  "How do I reset my password? Account login keeps failing.",
  "This is urgent — I think my account was hacked and I want GDPR delete my data.",
  "Do you sell left-handed smoke detectors?",
];

async function main() {
  const agentKey = process.env.AGENT_KEY!;
  if (!agentKey) {
    console.error("Set AGENT_KEY (separate claim from tenant T3N_API_KEY).");
    process.exit(1);
  }

  const { did: agentDid, address, env } = await connectWithKey(agentKey, "AGENT_KEY");
  const kb = loadFaq();
  const custom = process.argv.slice(2).join(" ").trim();
  const tickets = custom ? [custom] : demos;

  console.log("=== T3N Support Triage Agent ===");
  console.log(`env: ${env}`);
  console.log(`agentDid: ${agentDid}`);
  console.log(`agentAddress: ${address}`);
  console.log(`business KB: ${kb.business} (${kb.categories.length} categories)`);
  console.log("");

  const results = tickets.map((t) => triageMessage(t, kb));
  for (const [i, r] of results.entries()) {
    console.log(`--- ticket ${i + 1} ---`);
    console.log(`in: ${r.input}`);
    console.log(
      `out: category=${r.categoryLabel ?? "unclassified"} priority=${r.priority} confidence=${r.confidence} action=${r.nextAction}`,
    );
    console.log(`matched: ${r.matchedKeywords.join(", ") || "(none)"}`);
    console.log(`reply: ${r.suggestedReply}`);
    console.log("");
  }

  console.log(
    JSON.stringify(
      {
        agentDid,
        business: kb.business,
        ticketCount: results.length,
        escalations: results.filter((r) => r.escalate).length,
        autoReplies: results.filter((r) => r.nextAction === "auto_reply").length,
        humanReview: results.filter((r) => r.nextAction === "human_review").length,
        results,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
