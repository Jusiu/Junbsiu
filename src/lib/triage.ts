import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export type FaqCategory = {
  id: string;
  label: string;
  keywords: string[];
  priority: "low" | "normal" | "high";
  answer: string;
};

export type FaqKb = {
  business: string;
  categories: FaqCategory[];
  escalate_keywords: string[];
  escalate_message: string;
};

export type TriageResult = {
  business: string;
  input: string;
  escalate: boolean;
  categoryId: string | null;
  categoryLabel: string | null;
  priority: "low" | "normal" | "high" | "escalate";
  confidence: number;
  matchedKeywords: string[];
  suggestedReply: string;
  nextAction: "auto_reply" | "human_review" | "escalate_now";
};

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadFaq(path?: string): FaqKb {
  const p = path ?? join(__dirname, "../../data/faq.json");
  return JSON.parse(readFileSync(p, "utf8")) as FaqKb;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Deterministic FAQ / support triage for a small business inbox.
 * Easy to maintain: edit data/faq.json — no invented platform APIs.
 */
export function triageMessage(message: string, kb: FaqKb = loadFaq()): TriageResult {
  const tokens = new Set(tokenize(message));
  const escalateHits = kb.escalate_keywords.filter((k) =>
    message.toLowerCase().includes(k.toLowerCase()),
  );

  if (escalateHits.length > 0) {
    return {
      business: kb.business,
      input: message,
      escalate: true,
      categoryId: null,
      categoryLabel: null,
      priority: "escalate",
      confidence: 1,
      matchedKeywords: escalateHits,
      suggestedReply: kb.escalate_message,
      nextAction: "escalate_now",
    };
  }

  let best: { cat: FaqCategory; score: number; hits: string[] } | null = null;
  for (const cat of kb.categories) {
    const hits = cat.keywords.filter((k) => {
      const parts = k.toLowerCase().split(/\s+/);
      return parts.every((p) => tokens.has(p) || message.toLowerCase().includes(k.toLowerCase()));
    });
    const score = hits.length;
    if (score > 0 && (!best || score > best.score)) {
      best = { cat, score, hits };
    }
  }

  if (!best) {
    return {
      business: kb.business,
      input: message,
      escalate: false,
      categoryId: null,
      categoryLabel: null,
      priority: "normal",
      confidence: 0,
      matchedKeywords: [],
      suggestedReply:
        "Thanks for reaching out. A teammate will review this shortly. Please include your order ID or account email if you have one.",
      nextAction: "human_review",
    };
  }

  const confidence = Math.min(1, best.score / Math.max(2, best.cat.keywords.length / 3));
  const nextAction =
    best.cat.priority === "high" || confidence < 0.4 ? "human_review" : "auto_reply";

  return {
    business: kb.business,
    input: message,
    escalate: false,
    categoryId: best.cat.id,
    categoryLabel: best.cat.label,
    priority: best.cat.priority,
    confidence: Number(confidence.toFixed(2)),
    matchedKeywords: best.hits,
    suggestedReply: best.cat.answer,
    nextAction,
  };
}
