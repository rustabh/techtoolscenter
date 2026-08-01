import { smartSearch } from "./intent";
import { searchIndiaServices, getIndiaService } from "../india/services";
import { indiaStates } from "../india/states";
import { indiaCities } from "../india/cities";
import { schemes } from "../india/schemes";
import { allPosts } from "../blog/posts";
import { searchAiTools } from "../aihub/tools";
import { searchDevResources } from "../devhub/resources";
import { updates } from "../updates/updates";

/**
 * Unified global search across the whole site — tools & landing pages,
 * India Services, blog posts, AI Hub, Developer Hub and Updates. Powers the
 * ⌘K command palette so every section is discoverable from a single search
 * box (not just from inside it).
 */
export type GlobalKind = "tool" | "india" | "blog" | "ai" | "developer" | "update";

export interface GlobalResult {
  key: string; // unique key + react key
  href: string; // route to navigate to
  name: string;
  icon: string; // lucide icon name (Icon component falls back safely)
  reason?: string; // subtitle / why it matched
  kind: GlobalKind;
  external?: boolean;
}

const BLOG_ICON = "FileText";
const INDIA_ICON = "Landmark";
const AI_ICON = "Bot";
const DEV_ICON = "Code2";
const UPDATE_ICON = "Newspaper";

function aiSearch(query: string, limit: number): GlobalResult[] {
  return searchAiTools(query, limit).map((t) => ({
    key: `ai:${t.slug}`,
    href: t.officialUrl,
    name: t.name,
    icon: t.icon,
    reason: `AI Hub · ${t.pricing}`,
    kind: "ai" as const,
    external: true,
  }));
}

function devSearch(query: string, limit: number): GlobalResult[] {
  return searchDevResources(query, limit).map((r) => ({
    key: `dev:${r.slug}`,
    href: r.internalToolSlug ? `/tools/${r.internalToolSlug}` : r.officialUrl,
    name: r.name,
    icon: r.icon,
    reason: `Developer Hub · ${r.pricing}`,
    kind: "developer" as const,
    external: !r.internalToolSlug,
  }));
}

function updateSearch(query: string, limit: number): GlobalResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = updates
    .map((u) => {
      const hay = `${u.title} ${u.summary} ${u.tags.join(" ")} ${u.category}`.toLowerCase();
      const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
      return { u, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map(({ u }) => ({
    key: `update:${u.slug}`,
    href: `/updates/${u.slug}`,
    name: u.title,
    icon: UPDATE_ICON,
    reason: `Update · ${u.category}`,
    kind: "update" as const,
  }));
}

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
  const out: GlobalResult[] = [];
  const finderKeys = ["which document", "which certificate", "what document", "what certificate", "finder", "document finder", "which paper", "kaunsa", "konsa"];
  if (finderKeys.some((k) => q.includes(k))) {
    out.push({
      key: "india:finder",
      href: "/india-services/finder",
      name: "Which document do I need? — Finder",
      icon: INDIA_ICON,
      reason: "India Service · Interactive finder",
      kind: "india" as const,
    });
  }
  const statusKeys = ["status", "track", "check status", "beneficiary status"];
  if (statusKeys.some((k) => q.includes(k))) {
    out.push({
      key: "india:status",
      href: "/india-services/status",
      name: "Check application status — PAN, passport, PF & more",
      icon: INDIA_ICON,
      reason: "India Service · Status trackers",
      kind: "india" as const,
    });
  }
  const schemeKeys = ["yojana", "scheme", "sarkari", "sarkari yojana", "government scheme"];
  if (schemeKeys.some((k) => q.includes(k))) {
    out.push({
      key: "india:schemes",
      href: "/india-services/schemes",
      name: "Government Schemes List (Sarkari Yojana)",
      icon: INDIA_ICON,
      reason: "India Service · Schemes hub",
      kind: "india" as const,
    });
  }
  return out;
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
 * then AI Hub, Developer Hub, India Services, blog guides and updates,
 * de-duplicated and capped.
 */
export function globalSearch(query: string, limit = 24): GlobalResult[] {
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
  const aiHits = aiSearch(q, 6);
  const devHits = devSearch(q, 6);
  const indiaHits = [...finderMatch(q), ...schemeSearch(q, 4), ...indiaSearch(q, 5), ...stateSearch(q, 3), ...citySearch(q, 3)];
  const blogHits = blogSearch(q, 4);
  const updateHits = updateSearch(q, 3);

  const seen = new Set<string>();
  const out: GlobalResult[] = [];
  const push = (list: GlobalResult[]) => {
    for (const r of list) {
      if (seen.has(r.href)) continue;
      seen.add(r.href);
      out.push(r);
    }
  };
  push(toolHits);
  push(aiHits);
  push(devHits);
  push(indiaHits);
  push(blogHits);
  push(updateHits);

  return out.slice(0, limit);
}

/** Results grouped by kind, for a categorized command palette UI. */
export function globalSearchGrouped(query: string, perGroupLimit = 5): Record<GlobalKind, GlobalResult[]> {
  const all = globalSearch(query, 100);
  const groups: Record<GlobalKind, GlobalResult[]> = { tool: [], ai: [], developer: [], india: [], blog: [], update: [] };
  for (const r of all) {
    if (groups[r.kind].length < perGroupLimit) groups[r.kind].push(r);
  }
  return groups;
}
