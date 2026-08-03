import { indiaServices } from "./services";
import { schemes } from "./schemes";

export interface OfficialWebsiteEntry {
  slug: string;
  name: string;
  href: string;
}

export interface OfficialWebsite {
  name: string;
  url: string;
  category: string; // IndiaCategory slug, or "schemes" for scheme-only portals
  entries: OfficialWebsiteEntry[];
}

/**
 * Deduplicated directory of every real official government website already
 * cited across India Services and Schemes — many sub-pages (e.g. every
 * Aadhaar-related service) point to the same parent portal (uidai.gov.in),
 * so this groups by the official URL rather than listing 75+ near-duplicate
 * rows. Built entirely from officialUrl/officialName fields already present
 * on each entry — no new URLs are introduced here.
 */
export function officialWebsites(): OfficialWebsite[] {
  const map = new Map<string, OfficialWebsite>();

  for (const s of indiaServices) {
    if (!map.has(s.officialUrl)) {
      map.set(s.officialUrl, { name: s.officialName, url: s.officialUrl, category: s.category, entries: [] });
    }
    map.get(s.officialUrl)!.entries.push({ slug: s.slug, name: s.name, href: `/india-services/${s.category}/${s.slug}` });
  }

  for (const sc of schemes) {
    if (!map.has(sc.officialUrl)) {
      map.set(sc.officialUrl, { name: sc.ministry, url: sc.officialUrl, category: "schemes", entries: [] });
    }
    map.get(sc.officialUrl)!.entries.push({ slug: sc.slug, name: sc.name, href: `/india-services/schemes/${sc.slug}` });
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function officialWebsitesByCategory(): Map<string, OfficialWebsite[]> {
  const grouped = new Map<string, OfficialWebsite[]>();
  for (const w of officialWebsites()) {
    grouped.set(w.category, [...(grouped.get(w.category) ?? []), w]);
  }
  return grouped;
}
