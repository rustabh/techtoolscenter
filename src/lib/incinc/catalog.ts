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

  for (const t of tools) {
    entries.push({
      id: `tool:${t.slug}`,
      title: t.name,
      description: t.description,
      keywords: [t.name, t.description, t.category, ...(t.keywords ?? []), ...(t.tags ?? [])].join(" ").toLowerCase(),
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
      keywords: [t.name, t.developer, t.overview, t.category, ...t.tags].join(" ").toLowerCase(),
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
      keywords: [s.name, s.officialName, s.overview, s.category, ...s.keywords].join(" ").toLowerCase(),
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
      description: s.tagline,
      keywords: [s.name, s.fullName ?? "", s.tagline, s.overview, ...s.keywords].join(" ").toLowerCase(),
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
      keywords: [r.name, r.description, r.category, ...r.tags].join(" ").toLowerCase(),
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
      keywords: [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase(),
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
      keywords: [u.title, u.summary, u.category, ...u.tags].join(" ").toLowerCase(),
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
    const seen = new Set(tokenize(`${entry.title} ${entry.keywords}`));
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

function score(entry: CatalogEntry, terms: string[], totalEntries: number): number {
  let s = 0;
  const title = entry.title.toLowerCase();
  for (const term of terms) {
    if (!term) continue;
    const w = idfWeight(term, totalEntries);
    if (title === term) s += 12 * w;
    else if (isMatch(title, term)) s += 6 * w;
    if (isMatch(entry.keywords, term)) s += 2 * w;
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
  const terms = query.toLowerCase().replace(/'/g, "").split(/\s+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
  if (!terms.length) return [];
  const totalEntries = getCatalog().length;
  const pool = sources ? getCatalog().filter((e) => sources.includes(e.source)) : getCatalog();
  return pool
    .map((entry) => ({ entry, s: score(entry, terms, totalEntries) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.entry);
}
