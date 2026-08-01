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

function score(entry: CatalogEntry, terms: string[]): number {
  let s = 0;
  const title = entry.title.toLowerCase();
  for (const term of terms) {
    if (!term) continue;
    if (title === term) s += 12;
    else if (title.includes(term)) s += 6;
    if (entry.keywords.includes(term)) s += 2;
  }
  return s;
}

export function searchCatalog(query: string, limit = 8, sources?: CatalogSource[]): CatalogEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  if (!terms.length) return [];
  const pool = sources ? getCatalog().filter((e) => sources.includes(e.source)) : getCatalog();
  return pool
    .map((entry) => ({ entry, s: score(entry, terms) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.entry);
}
