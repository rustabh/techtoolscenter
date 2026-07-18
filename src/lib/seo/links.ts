import { tools, getTool, getPopularTools, type Tool } from "../tools";
import { collectionForTool, collectionOf, getToolsByCollection, type Collection } from "../collections";

/**
 * Internal-link engine — every set of links is generated from the registry, so
 * there are no hardcoded links anywhere and new tools are woven into the link
 * graph automatically.
 */
export interface ToolLinks {
  parent: Collection;
  related: Tool[];
  alternatives: Tool[];
  popular: Tool[];
  newest: Tool[];
}

function byNewest(a: Tool, b: Tool) {
  return new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime();
}

export function internalLinks(tool: Tool, limit = 6): ToolLinks {
  const parent = collectionForTool(tool);
  const colSlug = collectionOf(tool);

  // Explicit related first, then same-collection tools.
  const explicit = (tool.relatedSlugs ?? []).map(getTool).filter((t): t is Tool => !!t && t.slug !== tool.slug);
  const sameCollection = getToolsByCollection(colSlug).filter((t) => t.slug !== tool.slug);
  const related = dedupe([...explicit, ...sameCollection]).slice(0, limit);

  // Alternatives: same category but a different collection (true substitutes).
  const alternatives = tools
    .filter((t) => t.category === tool.category && collectionOf(t) !== colSlug && t.slug !== tool.slug)
    .slice(0, limit);

  const popular = getPopularTools()
    .filter((t) => t.slug !== tool.slug)
    .slice(0, limit);

  const newest = [...tools]
    .filter((t) => t.slug !== tool.slug)
    .sort(byNewest)
    .slice(0, limit);

  return { parent, related, alternatives, popular, newest };
}

function dedupe(list: Tool[]): Tool[] {
  const seen = new Set<string>();
  return list.filter((t) => (seen.has(t.slug) ? false : (seen.add(t.slug), true)));
}
