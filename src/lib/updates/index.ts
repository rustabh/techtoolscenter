import { updates } from "./updates";
import { updateCategories, getUpdateCategory } from "./categories";
import type { Update } from "./types";

export { updates, updateCategories, getUpdateCategory };
export type { Update };
export type { UpdateCategory } from "./types";

export function getUpdate(slug: string): Update | undefined {
  return updates.find((u) => u.slug === slug);
}

export function allUpdates(): Update[] {
  return [...updates].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export function updatesByCategory(category: string): Update[] {
  return allUpdates().filter((u) => u.category === category);
}

export function latestUpdates(limit = 6): Update[] {
  return allUpdates().slice(0, limit);
}

export function popularUpdates(limit = 6): Update[] {
  const p = allUpdates().filter((u) => u.popular);
  return (p.length ? p : allUpdates()).slice(0, limit);
}

export function featuredUpdates(limit = 3): Update[] {
  const f = allUpdates().filter((u) => u.featured);
  return (f.length ? f : allUpdates()).slice(0, limit);
}

export function relatedUpdatesOf(update: Update, limit = 3): Update[] {
  const explicit = (update.relatedUpdates ?? []).map(getUpdate).filter((u): u is Update => !!u);
  const sameCat = updatesByCategory(update.category).filter((u) => u.slug !== update.slug);
  const seen = new Set<string>();
  return [...explicit, ...sameCat]
    .filter((u) => (seen.has(u.slug) ? false : (seen.add(u.slug), true)))
    .slice(0, limit);
}

export function estimateReadingMinutes(u: Update): number {
  if (u.readingMinutes) return u.readingMinutes;
  const words =
    (u.body ?? []).join(" ").split(/\s+/).length +
    (u.keyChanges ?? []).join(" ").split(/\s+/).length +
    u.summary.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export interface UpdateSearchResult {
  slug: string;
  title: string;
  category: string;
}

export function searchUpdates(query: string, limit = 12): UpdateSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return allUpdates()
    .map((u) => {
      const cat = getUpdateCategory(u.category)?.name ?? "";
      const hay = `${u.title} ${u.summary} ${u.tags.join(" ")} ${cat}`.toLowerCase();
      const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
      return { u, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ u }) => ({ slug: u.slug, title: u.title, category: u.category }));
}
