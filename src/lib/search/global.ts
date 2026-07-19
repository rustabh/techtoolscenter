import { smartSearch } from "./intent";
import { searchIndiaServices, getIndiaService } from "../india/services";
import { indiaStates } from "../india/states";
import { indiaCities } from "../india/cities";
import { schemes } from "../india/schemes";
import { allPosts } from "../blog/posts";

/**
 * Unified global search across the whole site — tools & landing pages,
 * India Services, and blog posts. Powers the ⌘K command palette so every
 * section is discoverable from a single search box (not just from inside it).
 */
export type GlobalKind = "tool" | "india" | "blog";

export interface GlobalResult {
  key: string; // unique key + react key
  href: string; // route to navigate to
  name: string;
  icon: string; // lucide icon name (Icon component falls back safely)
  reason?: string; // subtitle / why it matched
  kind: GlobalKind;
}

const BLOG_ICON = "FileText";
const INDIA_ICON = "Landmark";

function blogSearch(query: string, limit: number): GlobalResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = allPosts()
    .map((p) => {
      const hay = `${p.title} ${p.excerpt} ${(p.tags ?? []).join(" ")} ${p.category}`.toLowerCase();
      const score = tokens.reduce((s, tok) => s + (hay.includes(tok) ? 1 : 0), 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map(({ p }) => ({
    key: `blog:${p.slug}`,
    href: `/blog/${p.slug}`,
    name: p.title,
    icon: BLOG_ICON,
    reason: "Guide · Blog",
    kind: "blog" as const,
  }));
}

function stateSearch(query: string, limit: number): GlobalResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return indiaStates
    .filter((s) => s.name.toLowerCase().includes(q) || s.slug.replace(/-/g, " ").includes(q) || s.portalName.toLowerCase().includes(q))
    .slice(0, limit)
    .map((s) => ({
      key: `state:${s.slug}`,
      href: `/india-services/state/${s.slug}`,
      name: `${s.name} — Government Services`,
      icon: INDIA_ICON,
      reason: `India Service · ${s.portalName}`,
      kind: "india" as const,
    }));
}

function finderMatch(query: string): GlobalResult[] {
  const q = query.trim().toLowerCase();
  const keys = ["which document", "which certificate", "what document", "what certificate", "finder", "document finder", "which paper", "kaunsa", "konsa"];
  if (!keys.some((k) => q.includes(k))) return [];
  return [{
    key: "india:finder",
    href: "/india-services/finder",
    name: "Which document do I need? — Finder",
    icon: INDIA_ICON,
    reason: "India Service · Interactive finder",
    kind: "india" as const,
  }];
}

function schemeSearch(query: string, limit: number): GlobalResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = schemes
    .map((s) => {
      const hay = `${s.name} ${s.fullName ?? ""} ${s.keywords.join(" ")} ${s.tagline}`.toLowerCase();
      const score = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map(({ s }) => ({
    key: `scheme:${s.slug}`,
    href: `/india-services/schemes/${s.slug}`,
    name: s.name,
    icon: INDIA_ICON,
    reason: `Scheme · ${s.tagline}`,
    kind: "india" as const,
  }));
}

function citySearch(query: string, limit: number): GlobalResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return indiaCities
    .filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q))
    .slice(0, limit)
    .map((c) => ({
      key: `city:${c.slug}`,
      href: `/india-services/city/${c.slug}`,
      name: `${c.name} — Government Services`,
      icon: INDIA_ICON,
      reason: `India Service · ${c.stateName}`,
      kind: "india" as const,
    }));
}

function indiaSearch(query: string, limit: number): GlobalResult[] {
  return searchIndiaServices(query, limit).map((r) => {
    const svc = getIndiaService(r.slug);
    return {
      key: `india:${r.slug}`,
      href: `/india-services/${r.category}/${r.slug}`,
      name: r.name,
      icon: INDIA_ICON,
      reason: svc ? `India Service · ${svc.officialName}` : "India Service",
      kind: "india" as const,
    };
  });
}

/**
 * Blend results so nothing is buried: tools first (it's a tools platform),
 * then India Services and blog guides, de-duplicated and capped.
 */
export function globalSearch(query: string, limit = 12): GlobalResult[] {
  const q = query.trim();
  if (!q) return [];

  const toolHits: GlobalResult[] = smartSearch(q, 8).map((r) => ({
    key: `tool:${r.slug}`,
    href: `/tools/${r.slug}`,
    name: r.name,
    icon: r.icon,
    reason: r.reason,
    kind: "tool" as const,
  }));
  const indiaHits = [...finderMatch(q), ...schemeSearch(q, 4), ...indiaSearch(q, 5), ...stateSearch(q, 3), ...citySearch(q, 3)];
  const blogHits = blogSearch(q, 4);

  const seen = new Set<string>();
  const out: GlobalResult[] = [];
  const push = (list: GlobalResult[]) => {
    for (const r of list) {
      if (seen.has(r.href)) continue;
      seen.add(r.href);
      out.push(r);
    }
  };
  // Tools first, but always leave room for at least a couple of India/blog hits.
  push(toolHits.slice(0, indiaHits.length || blogHits.length ? 6 : 8));
  push(indiaHits);
  push(blogHits);
  push(toolHits); // any remaining tool hits fill the rest

  return out.slice(0, limit);
}
