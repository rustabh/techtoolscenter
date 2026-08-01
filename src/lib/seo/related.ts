import { tools, getTool, type Tool } from "../tools";

/**
 * Internal-linking engine (cross-content-type) — the generic counterpart to
 * `lib/seo/links.ts` (which only handles tool→tool relations). Any content
 * type with tags/keywords/a category (blog posts, India services, and any
 * future content type) can call `relatedToolsFor()` to get a same-topic set
 * of tools without maintaining a hand-picked list — and any explicit picks
 * that ARE provided are always kept and simply topped up, never replaced.
 *
 * This is additive by design: it only fills gaps, so wiring it into an
 * existing page can't remove or change any currently-working manual link.
 */

interface RelatedInput {
  category?: string;
  tags?: string[];
  keywords?: string[];
}

function scoreTool(tool: Tool, terms: string[], category?: string): number {
  let score = category && tool.category.toLowerCase() === category.toLowerCase() ? 2 : 0;
  const haystack = [...tool.keywords, ...(tool.tags ?? [])].map((k) => k.toLowerCase());
  for (const term of terms) {
    if (!term) continue;
    if (haystack.some((h) => h === term)) score += 3;
    else if (haystack.some((h) => h.includes(term) || term.includes(h))) score += 1;
  }
  return score;
}

/** Auto-matched tools for a piece of content, ranked by topical overlap. */
export function autoRelatedTools(input: RelatedInput, limit = 4): Tool[] {
  const terms = [...(input.tags ?? []), ...(input.keywords ?? [])].map((t) => t.toLowerCase());
  return tools
    .map((t) => ({ t, score: scoreTool(t, terms, input.category) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.t);
}

/**
 * Explicit picks first (always kept, in order), auto-matched tools fill any
 * remaining slots up to `limit`. Pass the content's own tags/category so the
 * auto-fill is topical rather than generic.
 */
export function relatedToolsFor(explicitSlugs: string[] | undefined, input: RelatedInput, limit = 4): Tool[] {
  const explicit = (explicitSlugs ?? []).map(getTool).filter((t): t is Tool => !!t);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const explicitSlugSet = new Set(explicit.map((t) => t.slug));
  const auto = autoRelatedTools(input, limit).filter((t) => !explicitSlugSet.has(t.slug));
  return [...explicit, ...auto].slice(0, limit);
}
