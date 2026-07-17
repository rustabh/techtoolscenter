import type { Generator, Inputs } from "./types";

/* ---------------- shared helpers ---------------- */
const lines = (...xs: (string | false | null | undefined)[]) =>
  xs.filter((x): x is string => typeof x === "string" && x !== "").join("\n");

function slugify(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function words(s: string) {
  return (s || "").split(/[\s,]+/).map((w) => w.trim()).filter(Boolean);
}

/* ---------------- Prompt Generator ---------------- */
const prompt: Generator = {
  id: "prompt",
  name: "Prompt Generator",
  description: "Craft a structured, high-quality LLM prompt.",
  icon: "Sparkles",
  output: "text",
  fields: [
    { name: "role", label: "Act as…", type: "text", default: "an expert copywriter" },
    { name: "task", label: "Task", type: "textarea", default: "write a product launch announcement" },
    { name: "audience", label: "Audience", type: "text", default: "startup founders" },
    { name: "tone", label: "Tone", type: "select", options: ["professional", "friendly", "persuasive", "casual", "formal", "playful", "authoritative"], default: "professional" },
    { name: "format", label: "Output format", type: "select", options: ["Markdown", "Plain text", "Bullet list", "JSON", "Table", "Numbered steps"], default: "Markdown" },
    { name: "constraints", label: "Constraints (one per line)", type: "textarea", default: "Keep it under 200 words.\nAvoid jargon." },
  ],
  local: (i) =>
    lines(
      `You are ${i.role || "a helpful assistant"}.`,
      "",
      `Your task: ${i.task || "help the user"}.`,
      i.audience && `Target audience: ${i.audience}.`,
      `Tone: ${i.tone || "professional"}.`,
      `Output format: ${i.format || "Markdown"}.`,
      i.constraints && "",
      i.constraints && `Constraints:\n${words(i.constraints).length ? i.constraints.split("\n").filter(Boolean).map((c) => `- ${c}`).join("\n") : ""}`,
      "",
      "Think step by step, then produce only the final result.",
    ),
  toPrompt: (i) => `Write an optimised system prompt for an AI that acts as ${i.role} to ${i.task} for ${i.audience}. Tone: ${i.tone}. Format: ${i.format}.`,
};

/* ---------------- Meta Generator ---------------- */
const meta: Generator = {
  id: "meta",
  name: "Meta Generator",
  description: "SEO title, description & Open Graph tags.",
  icon: "Tags",
  output: "code",
  fields: [
    { name: "title", label: "Page title", type: "text", default: "Free Online Tools" },
    { name: "description", label: "Description", type: "textarea", default: "A fast, private suite of everyday tools that run in your browser." },
    { name: "keywords", label: "Keywords (comma separated)", type: "text", default: "online tools, free tools, utilities" },
    { name: "url", label: "Canonical URL", type: "text", default: "https://example.com" },
    { name: "image", label: "OG image URL", type: "text", default: "https://example.com/og.png" },
  ],
  local: (i) => {
    const t = i.title || "Page title";
    const d = (i.description || "").slice(0, 160);
    return lines(
      `<title>${t}</title>`,
      `<meta name="description" content="${d}" />`,
      i.keywords && `<meta name="keywords" content="${i.keywords}" />`,
      i.url && `<link rel="canonical" href="${i.url}" />`,
      "",
      `<meta property="og:title" content="${t}" />`,
      `<meta property="og:description" content="${d}" />`,
      i.url && `<meta property="og:url" content="${i.url}" />`,
      i.image && `<meta property="og:image" content="${i.image}" />`,
      `<meta property="og:type" content="website" />`,
      "",
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${t}" />`,
      `<meta name="twitter:description" content="${d}" />`,
      i.image && `<meta name="twitter:image" content="${i.image}" />`,
    );
  },
  toPrompt: (i) => `Generate SEO meta and Open Graph tags for a page titled "${i.title}" about: ${i.description}.`,
};

/* ---------------- Email Generator ---------------- */
const email: Generator = {
  id: "email",
  name: "Email Generator",
  description: "Draft a polished email from a few notes.",
  icon: "Mail",
  output: "text",
  fields: [
    { name: "purpose", label: "Purpose", type: "text", default: "follow up after a sales call" },
    { name: "recipient", label: "Recipient name", type: "text", default: "Alex" },
    { name: "sender", label: "Your name", type: "text", default: "Sam" },
    { name: "tone", label: "Tone", type: "select", options: ["professional", "friendly", "concise", "warm", "formal"], default: "professional" },
    { name: "points", label: "Key points (one per line)", type: "textarea", default: "Thanks for your time today\nSharing the pricing we discussed\nHappy to set up a trial" },
  ],
  local: (i) => {
    const pts = (i.points || "").split("\n").filter(Boolean);
    const greet = i.recipient ? `Hi ${i.recipient},` : "Hello,";
    const body =
      pts.length > 1
        ? `${pts[0]}.\n\n` + pts.slice(1).map((p) => `• ${p}`).join("\n")
        : pts.join(" ");
    return lines(
      `Subject: ${cap(i.purpose || "Quick note")}`,
      "",
      greet,
      "",
      body || "I wanted to reach out regarding the below.",
      "",
      i.tone === "warm" ? "Looking forward to hearing from you soon!" : "Please let me know if you have any questions.",
      "",
      "Best regards,",
      i.sender || "",
    );
  },
  toPrompt: (i) => `Write a ${i.tone} email to ${i.recipient} to ${i.purpose}. Key points: ${i.points}. Sign as ${i.sender}.`,
};

/* ---------------- Regex Generator ---------------- */
const REGEX_MAP: { key: RegExp; pattern: string; note: string }[] = [
  { key: /\bemail/, pattern: "[\\w.+-]+@[\\w-]+\\.[\\w.-]+", note: "email address" },
  { key: /\b(url|link|website)/, pattern: "https?:\\/\\/[^\\s]+", note: "URL" },
  { key: /\b(phone|mobile|number)/, pattern: "\\+?\\d{1,3}[\\s-]?\\d{6,12}", note: "phone number" },
  { key: /\bip\b/, pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", note: "IPv4 address" },
  { key: /\b(date)/, pattern: "\\d{4}-\\d{2}-\\d{2}", note: "date (YYYY-MM-DD)" },
  { key: /\b(time)/, pattern: "([01]?\\d|2[0-3]):[0-5]\\d", note: "24-hour time" },
  { key: /\b(hex|colou?r)/, pattern: "#(?:[0-9a-fA-F]{3}){1,2}", note: "hex colour" },
  { key: /\b(zip|postal|pincode)/, pattern: "\\d{5,6}", note: "postal / ZIP code" },
  { key: /\b(username|handle)/, pattern: "@?[A-Za-z0-9_]{3,20}", note: "username" },
  { key: /\b(word|letters)/, pattern: "[A-Za-z]+", note: "word" },
  { key: /\b(digit|numeric|integer)/, pattern: "\\d+", note: "integer" },
  { key: /\b(decimal|float|price|amount)/, pattern: "\\d+(?:\\.\\d+)?", note: "decimal number" },
];
const regex: Generator = {
  id: "regex",
  name: "Regex Generator",
  description: "Describe what to match, get a regex + explanation.",
  icon: "Regex",
  output: "code",
  fields: [
    { name: "description", label: "What should it match?", type: "textarea", default: "an email address" },
    { name: "anchor", label: "Match", type: "select", options: ["anywhere", "whole string"], default: "anywhere" },
    { name: "flags", label: "Flags", type: "select", options: ["g", "gi", "i", "gm", "none"], default: "gi" },
  ],
  local: (i) => {
    const d = (i.description || "").toLowerCase();
    const hits = REGEX_MAP.filter((m) => m.key.test(d));
    const core = hits.length ? hits.map((h) => h.pattern).join("|") : "[\\w-]+";
    const anchored = i.anchor === "whole string" ? `^(?:${core})$` : core;
    const flags = i.flags === "none" ? "" : i.flags || "";
    const notes = hits.length ? hits.map((h) => `• ${h.note}`).join("\n") : "• generic token (refine your description for a tighter match)";
    return lines(
      `/${anchored}/${flags}`,
      "",
      "Matches:",
      notes,
    );
  },
  toPrompt: (i) => `Write a single regular expression that matches ${i.description}. Match ${i.anchor}. Explain each part.`,
};

/* ---------------- SQL Generator ---------------- */
const sql: Generator = {
  id: "sql",
  name: "SQL Generator",
  description: "Build a SQL query from plain fields.",
  icon: "Database",
  output: "code",
  fields: [
    { name: "operation", label: "Operation", type: "select", options: ["SELECT", "COUNT", "INSERT", "UPDATE", "DELETE"], default: "SELECT" },
    { name: "table", label: "Table", type: "text", default: "users" },
    { name: "columns", label: "Columns (comma separated)", type: "text", default: "id, name, email" },
    { name: "condition", label: "Condition (WHERE)", type: "text", default: "status = 'active'" },
    { name: "order", label: "Order by", type: "text", default: "created_at DESC" },
  ],
  local: (i) => {
    const table = i.table || "table_name";
    const cols = i.columns?.trim() || "*";
    const where = i.condition ? ` WHERE ${i.condition}` : "";
    const order = i.order ? ` ORDER BY ${i.order}` : "";
    switch (i.operation) {
      case "COUNT":
        return `SELECT COUNT(*) FROM ${table}${where};`;
      case "INSERT": {
        const list = words(cols.replace(/\*/g, ""));
        const c = list.length ? list.join(", ") : "column1, column2";
        const v = list.map(() => "?").join(", ") || "?, ?";
        return `INSERT INTO ${table} (${c})\nVALUES (${v});`;
      }
      case "UPDATE": {
        const sets = words(cols).map((c) => `${c} = ?`).join(", ") || "column = ?";
        return `UPDATE ${table}\nSET ${sets}${where};`;
      }
      case "DELETE":
        return `DELETE FROM ${table}${where};`;
      default:
        return `SELECT ${cols}\nFROM ${table}${where}${order};`;
    }
  },
  toPrompt: (i) => `Write a SQL ${i.operation} query on table ${i.table}, columns ${i.columns}, condition ${i.condition}.`,
};

/* ---------------- Hashtag Generator ---------------- */
const HASH_GENERIC = ["trending", "viral", "explore", "instagood", "reels", "fyp"];
const hashtag: Generator = {
  id: "hashtag",
  name: "Hashtag Generator",
  description: "Turn a topic into a set of hashtags.",
  icon: "Hash",
  output: "text",
  fields: [
    { name: "topic", label: "Topic / keywords", type: "textarea", default: "sustainable coffee brewing" },
    { name: "count", label: "How many", type: "select", options: ["10", "15", "20", "30"], default: "20" },
  ],
  local: (i) => {
    const base = words(i.topic).map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""));
    const combos: string[] = [];
    base.forEach((w) => combos.push(w));
    for (let a = 0; a < base.length - 1; a++) combos.push(base[a] + base[a + 1]);
    if (base.length) combos.push(base.join(""));
    const set = Array.from(new Set([...combos, ...HASH_GENERIC.map((g) => base[0] ? base[0] + g : g)]));
    const n = parseInt(i.count || "20", 10);
    return set.slice(0, n).map((h) => `#${h}`).join(" ");
  },
  toPrompt: (i) => `Generate ${i.count} relevant, high-reach hashtags for: ${i.topic}.`,
};

/* ---------------- Caption Generator ---------------- */
const CAPTION_HOOKS: Record<string, string> = {
  Instagram: "✨",
  LinkedIn: "🚀",
  "X / Twitter": "🔥",
  Facebook: "👋",
  TikTok: "🎬",
};
const caption: Generator = {
  id: "caption",
  name: "Caption Generator",
  description: "Social captions with hooks, emojis & CTA.",
  icon: "MessageSquare",
  output: "text",
  fields: [
    { name: "topic", label: "What's the post about?", type: "textarea", default: "our new eco-friendly coffee blend" },
    { name: "platform", label: "Platform", type: "select", options: ["Instagram", "LinkedIn", "X / Twitter", "Facebook", "TikTok"], default: "Instagram" },
    { name: "tone", label: "Tone", type: "select", options: ["excited", "professional", "witty", "inspirational", "casual"], default: "excited" },
    { name: "cta", label: "Call to action", type: "text", default: "Tap the link in bio" },
  ],
  local: (i) => {
    const hook = CAPTION_HOOKS[i.platform || "Instagram"] || "✨";
    const topic = i.topic || "something new";
    const tags = words(topic).slice(0, 4).map((w) => `#${w.toLowerCase().replace(/[^a-z0-9]/g, "")}`).join(" ");
    const opener =
      i.tone === "professional" ? `Introducing ${topic}.` :
      i.tone === "witty" ? `Plot twist: ${topic}. 😏` :
      i.tone === "inspirational" ? `Every big change starts small — like ${topic}.` :
      `${hook} Say hello to ${topic}!`;
    return lines(
      opener,
      "",
      i.tone === "casual" ? "Honestly? We're a little obsessed. 💛" : "Here's why it matters — and why you'll love it.",
      "",
      i.cta ? `👉 ${i.cta}` : "",
      "",
      tags,
    );
  },
  toPrompt: (i) => `Write a ${i.tone} ${i.platform} caption about ${i.topic} with emojis, ending with CTA "${i.cta}".`,
};

/* ---------------- Blog Outline Generator ---------------- */
const blog: Generator = {
  id: "blog",
  name: "Blog Outline Generator",
  description: "A structured outline for any article.",
  icon: "ListTree",
  output: "text",
  fields: [
    { name: "topic", label: "Article topic", type: "text", default: "How to start freelancing in 2026" },
    { name: "audience", label: "Audience", type: "text", default: "beginners" },
    { name: "sections", label: "Main sections", type: "select", options: ["4", "5", "6", "7"], default: "5" },
  ],
  local: (i) => {
    const topic = i.topic || "Your topic";
    const n = parseInt(i.sections || "5", 10);
    const mids = [
      "Why it matters",
      "Getting started: the essentials",
      "Common mistakes to avoid",
      "Tools & resources",
      "Step-by-step walkthrough",
      "Real-world examples",
      "Advanced tips",
    ].slice(0, n);
    return lines(
      `# ${topic}`,
      i.audience && `_For ${i.audience}_`,
      "",
      "## Introduction",
      `- Hook: a surprising fact about ${topic.toLowerCase()}`,
      "- What the reader will learn",
      "",
      ...mids.flatMap((m, idx) => [`## ${idx + 1}. ${m}`, "- Key point", "- Supporting detail", ""]),
      "## Conclusion",
      "- Recap the main takeaways",
      "- Call to action",
      "",
      "## FAQ",
      `- Common question about ${topic.toLowerCase()}`,
    );
  },
  toPrompt: (i) => `Create a ${i.sections}-section blog outline on "${i.topic}" for ${i.audience}.`,
};

/* ---------------- Slug Generator ---------------- */
const slug: Generator = {
  id: "slug",
  name: "Slug Generator",
  description: "Clean, SEO-friendly URL slugs.",
  icon: "Link",
  output: "code",
  fields: [
    { name: "title", label: "Title", type: "textarea", default: "10 Best Free Online Tools in 2026!" },
    { name: "words", label: "Max words", type: "select", options: ["all", "4", "5", "6", "8"], default: "all" },
  ],
  local: (i) => {
    let s = slugify(i.title || "");
    if (i.words && i.words !== "all") s = s.split("-").slice(0, parseInt(i.words, 10)).join("-");
    return s || "—";
  },
  toPrompt: (i) => `Create a short SEO slug for: ${i.title}.`,
};

/* ---------------- Excel Formula Generator ---------------- */
const excel: Generator = {
  id: "excel",
  name: "Excel Formula Generator",
  description: "Build spreadsheet formulas from fields.",
  icon: "Sigma",
  output: "code",
  fields: [
    { name: "operation", label: "Operation", type: "select", options: ["SUM", "AVERAGE", "COUNTIF", "SUMIF", "IF", "VLOOKUP", "CONCAT"], default: "SUM" },
    { name: "range", label: "Range / first arg", type: "text", default: "A2:A100" },
    { name: "criteria", label: "Criteria / second arg", type: "text", default: ">100" },
    { name: "extra", label: "Extra (value/column)", type: "text", default: "B2:B100" },
  ],
  local: (i) => {
    const r = i.range || "A2:A100";
    const c = i.criteria || "";
    const e = i.extra || "";
    switch (i.operation) {
      case "AVERAGE": return `=AVERAGE(${r})`;
      case "COUNTIF": return `=COUNTIF(${r}, "${c}")`;
      case "SUMIF": return `=SUMIF(${r}, "${c}"${e ? `, ${e}` : ""})`;
      case "IF": return `=IF(${r} ${c || ">0"}, "Yes", "No")`;
      case "VLOOKUP": return `=VLOOKUP(${r}, ${e || "Sheet2!A:B"}, 2, FALSE)`;
      case "CONCAT": return `=CONCATENATE(${r}, " ", ${e || "B2"})`;
      default: return `=SUM(${r})`;
    }
  },
  toPrompt: (i) => `Write an Excel formula to ${i.operation} over ${i.range} with criteria ${i.criteria}.`,
};

function cap(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export const GENERATORS: Generator[] = [
  prompt, meta, email, regex, sql, hashtag, caption, blog, slug, excel,
];

export function defaultInputs(g: Generator): Inputs {
  return Object.fromEntries(g.fields.map((f) => [f.name, f.default ?? ""]));
}
