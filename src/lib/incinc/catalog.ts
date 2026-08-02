import { tools } from "@/lib/tools";
import { aiTools } from "@/lib/aihub/tools";
import { indiaServices } from "@/lib/india/services";
import { schemes } from "@/lib/india/schemes";
import { allDevResources } from "@/lib/devhub/resources";
import { posts } from "@/lib/blog/posts";
import { updates } from "@/lib/updates/updates";

export type CatalogSource = "tool" | "ai-tool" | "india-service" | "scheme" | "dev-resource" | "blog" | "update";

export interface CatalogEntry {
  id: string;
  title: string;
  description: string;
  keywords: string;
  href: string;
  kind: "internal" | "external";
  source: CatalogSource;
  meta?: string;
}

function buildCatalog(): CatalogEntry[] {
  const entries: CatalogEntry[] = [];

  // NOTE: `keywords` intentionally holds only curated, deliberate fields
  // (name, official name/developer, category, explicit keywords/tags) — never
  // the long-form overview/description text. An overview inevitably mentions
  // supporting concepts in passing (e.g. Ayushman's overview mentions
  // "Aadhaar" as the reference document for corrections), and if that text
  // were mixed into `keywords` at full weight, an incidental mention would
  // score the same as an entry whose actual subject is that concept. The
  // long-form text still lives in `description` and is searched — just at a
  // deliberately lower weight in score(), see catalog.ts's score().
  for (const t of tools) {
    entries.push({
      id: `tool:${t.slug}`,
      title: t.name,
      description: t.description,
      keywords: [t.name, t.category, ...(t.keywords ?? []), ...(t.tags ?? [])].join(" ").toLowerCase(),
      href: `/tools/${t.slug}`,
      kind: "internal",
      source: "tool",
      meta: t.category,
    });
  }

  for (const t of aiTools) {
    entries.push({
      id: `ai-tool:${t.slug}`,
      title: t.name,
      description: t.overview,
      keywords: [t.name, t.developer, t.category, ...t.tags].join(" ").toLowerCase(),
      href: t.officialUrl,
      kind: "external",
      source: "ai-tool",
      meta: t.pricing,
    });
  }

  for (const s of indiaServices) {
    entries.push({
      id: `india-service:${s.slug}`,
      title: s.name,
      description: s.overview,
      keywords: [s.name, s.officialName, s.category, ...s.keywords].join(" ").toLowerCase(),
      href: `/india-services/${s.category}/${s.slug}`,
      kind: "internal",
      source: "india-service",
      meta: s.category,
    });
  }

  for (const s of schemes) {
    entries.push({
      id: `scheme:${s.slug}`,
      title: s.name,
      description: `${s.tagline} ${s.overview}`,
      keywords: [s.name, s.fullName ?? "", ...s.keywords].join(" ").toLowerCase(),
      href: `/india-services/schemes/${s.slug}`,
      kind: "internal",
      source: "scheme",
    });
  }

  for (const r of allDevResources) {
    entries.push({
      id: `dev-resource:${r.slug}`,
      title: r.name,
      description: r.description,
      keywords: [r.name, r.category, ...r.tags].join(" ").toLowerCase(),
      href: r.internalToolSlug ? `/tools/${r.internalToolSlug}` : r.officialUrl,
      kind: r.internalToolSlug ? "internal" : "external",
      source: "dev-resource",
      meta: r.pricing,
    });
  }

  for (const p of posts) {
    entries.push({
      id: `blog:${p.slug}`,
      title: p.title,
      description: p.excerpt,
      keywords: [p.title, p.category, ...p.tags].join(" ").toLowerCase(),
      href: `/blog/${p.slug}`,
      kind: "internal",
      source: "blog",
    });
  }

  for (const u of updates) {
    entries.push({
      id: `update:${u.slug}`,
      title: u.title,
      description: u.summary,
      keywords: [u.title, u.category, ...u.tags].join(" ").toLowerCase(),
      href: `/updates/${u.slug}`,
      kind: "internal",
      source: "update",
    });
  }

  return entries;
}

let cache: CatalogEntry[] | null = null;
export function getCatalog(): CatalogEntry[] {
  if (!cache) cache = buildCatalog();
  return cache;
}

/**
 * Document-frequency map: how many catalog entries contain each word, across
 * every entry's title + keywords. Used to down-weight generic words ("card",
 * "update", "reprint", "correction" — present in dozens of entries) relative
 * to specific ones ("voter", "ayushman", "epic") so a single generic-word
 * overlap can't outrank an entry that shares zero specific terms with the
 * query. Without this, a query like "voter id reprint" could rank an
 * unrelated "X Card ... Reprint" entry above every actual voter-ID page,
 * since "reprint" alone was worth as much as any other matched word.
 */
let docFreqCache: Map<string, number> | null = null;
function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}
function getDocFreq(): Map<string, number> {
  if (docFreqCache) return docFreqCache;
  const df = new Map<string, number>();
  for (const entry of getCatalog()) {
    // Includes description here (unlike scoring) so typo-correction and IDF
    // weighting both see the full vocabulary — only score() treats
    // description matches as lower-confidence than curated keyword matches.
    const seen = new Set(tokenize(`${entry.title} ${entry.keywords} ${entry.description}`));
    for (const t of seen) df.set(t, (df.get(t) ?? 0) + 1);
  }
  docFreqCache = df;
  return df;
}
/** Inverse-document-frequency weight, clamped to a sane range so no term is ever worth zero or extreme. */
function idfWeight(term: string, totalEntries: number): number {
  const df = getDocFreq().get(term) ?? 1;
  const raw = Math.log((totalEntries + 1) / (df + 1)) + 1;
  return Math.min(3, Math.max(0.3, raw));
}

// Short terms (<=2 chars, e.g. "id", "rc", "pf") must match as a whole word —
// plain substring matching would let "id" match inside "grid", "uuid",
// "glide", "midjourney" etc., flooding results with noise. Longer terms keep
// substring matching, since that's what makes "compress" find "Compressor".
function isMatch(haystack: string, term: string): boolean {
  if (term.length <= 2) return new RegExp(`(^|[^a-z0-9])${term}([^a-z0-9]|$)`).test(haystack);
  return haystack.includes(term);
}

/**
 * Synonym groups so different people's wording for the same idea all resolve
 * the same way — e.g. someone searching a document's "reprint" and someone
 * searching its "duplicate" or "reissue" should land on the same result.
 * Kept intentionally narrow and semantically tight (no broad groups like
 * card/certificate/document, which would blur genuinely different things
 * together) — covers both document actions and common tool actions, since
 * this applies to every catalog source, not just India Hub services.
 */
const SYNONYM_GROUPS: string[][] = [
  ["reprint", "duplicate", "reissue", "redownload"],
  ["correction", "correct", "fix", "amend", "mistake", "wrong"],
  ["update", "change", "modify", "edit"],
  ["renewal", "renew", "extend", "extension"],
  ["lost", "missing", "misplaced", "stolen", "damaged"],
  ["status", "track", "verify"],
  ["apply", "register", "enrol", "enroll"],
  ["compress", "reduce", "shrink", "optimize", "optimise", "minimize", "minimise", "minify"],
  ["convert", "transform"],
  ["remove", "delete", "erase", "eliminate"],
  ["generate", "create", "make", "build"],
  ["merge", "combine", "join"],
  ["split", "separate", "divide"],
  ["resize", "scale"],
  ["encrypt", "protect", "lock"],
  ["decrypt", "unlock"],
  ["format", "beautify", "prettify"],
];
const synonymMap = new Map<string, string[]>();
for (const group of SYNONYM_GROUPS) for (const word of group) synonymMap.set(word, group);
function synonymsOf(term: string): string[] {
  return synonymMap.get(term) ?? [term];
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

let vocabCache: string[] | null = null;
function getVocabulary(): string[] {
  if (!vocabCache) vocabCache = [...getDocFreq().keys()];
  return vocabCache;
}

/**
 * Typo tolerance — finds the closest real catalog word to a query term (e.g.
 * "votor" -> "voter") so a query never goes empty just because the user (or
 * their keyboard's autocorrect) mistyped one word. Runs even when the term
 * already exists in the vocabulary — a rare word can itself be a minor
 * misspelling kept alive elsewhere as a deliberate SEO keyword (e.g. "aadhar
 * card" written once as a variant spelling on the flagship Aadhaar page),
 * so existence alone doesn't prove it's the "real" word. Skips very short
 * terms where "closest word" is too ambiguous to be meaningful.
 */
function closestVocabWord(term: string): string | null {
  if (term.length < 4) return null;
  const maxDist = term.length <= 5 ? 1 : 2;
  let best: string | null = null;
  let bestDist = maxDist + 1;
  for (const word of getVocabulary()) {
    if (word === term) continue;
    if (Math.abs(word.length - term.length) > maxDist) continue;
    const d = levenshtein(term, word);
    if (d < bestDist) { bestDist = d; best = word; if (d === 0) break; }
  }
  return bestDist <= maxDist ? best : null;
}

/**
 * Expands one raw query word into every term-variant it should be searched
 * as: itself, plus — if a near-neighbor word (edit-distance 1-2) is
 * substantially more common in the catalog — that neighbor too, plus each
 * variant's synonym group. The "substantially more common" gate (nearDf >
 * ownDf, not just nearDf > 0) is what stops correction from firing on two
 * roughly-equally-real words that happen to be a typo apart; it only kicks
 * in when one spelling is clearly the outlier (e.g. "aadhar", df=1, next to
 * "aadhaar", df=26).
 */
function expandTerm(term: string, df: Map<string, number>): string[] {
  const ownDf = df.get(term) ?? 0;
  const near = closestVocabWord(term);
  const nearDf = near ? (df.get(near) ?? 0) : 0;
  const base = near && nearDf > ownDf ? near : term;
  return Array.from(new Set([term, base, ...synonymsOf(base)]));
}

function score(entry: CatalogEntry, termGroups: string[][], totalEntries: number): number {
  let s = 0;
  const title = entry.title.toLowerCase();
  const desc = entry.description.toLowerCase();
  for (const variants of termGroups) {
    const w = idfWeight(variants[0], totalEntries);
    let titleScore = 0;
    let keywordHit = false;
    let descHit = false;
    for (const term of variants) {
      if (title === term) titleScore = Math.max(titleScore, 12);
      else if (isMatch(title, term)) titleScore = Math.max(titleScore, 6);
      if (isMatch(entry.keywords, term)) keywordHit = true;
      if (isMatch(desc, term)) descHit = true;
    }
    s += titleScore * w;
    // A curated keyword match is a deliberate signal; a description-only hit
    // is just an incidental mention in flowing prose (e.g. Ayushman's
    // overview mentions "Aadhaar" as a supporting document, which shouldn't
    // score like an entry whose actual subject is Aadhaar) — so it counts,
    // but for much less, and never both for the same term.
    if (keywordHit) s += 2 * w;
    else if (descHit) s += 1 * w;
  }
  return s;
}

export function searchCatalog(query: string, limit = 8, sources?: CatalogSource[]): CatalogEntry[] {
  // Strip apostrophes before splitting — mobile autocorrect routinely mangles
  // "voter id" into "voter i'd", and without this the term never matches "id"
  // anywhere, silently dropping every voter-ID-related result. Allowing
  // 2-letter terms (not just 3+) is what makes "id" usable at all, so a
  // small stopword list keeps that from reintroducing noise from filler
  // words like "of"/"is"/"an" that would otherwise pass the shorter length check.
  const STOPWORDS = new Set(["the", "of", "in", "is", "an", "to", "and", "for", "on", "at", "by", "or", "as", "it", "be", "my", "do", "if"]);
  const rawTerms = query.toLowerCase().replace(/'/g, "").split(/\s+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
  if (!rawTerms.length) return [];

  const df = getDocFreq();
  // For each query word: pull in a much-more-common near-neighbor spelling if
  // one exists (typo tolerance), then expand to its synonym group — so
  // "votor" resolves to "voter", "aadhar" resolves toward "aadhaar", and
  // "reprint" also searches as "duplicate"/"reissue" etc.
  const termGroups = rawTerms.map((t) => expandTerm(t, df));

  const totalEntries = getCatalog().length;
  const pool = sources ? getCatalog().filter((e) => sources.includes(e.source)) : getCatalog();
  return pool
    .map((entry) => ({ entry, s: score(entry, termGroups, totalEntries) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.entry);
}
