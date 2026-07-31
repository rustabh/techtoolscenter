export interface DevCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export type PricingModel = "Free" | "Freemium" | "Paid";

export interface DevResource {
  slug: string;
  name: string;
  category: string; // DevCategory slug
  description: string; // short, original description — never copied from the resource's own site
  officialUrl: string;
  docsUrl?: string;
  tags: string[];
  pricing: PricingModel;
  openSource?: boolean; // only set true when confidently known
  badge?: "Trending" | "Popular" | "New"; // qualitative badge, not a fabricated stat
  internalToolSlug?: string; // if TechToolsCenter already has this tool, link here instead of an external site
  icon: string; // lucide-react icon name, standing in for a logo (no third-party logo assets are embedded)
  addedOn: string; // ISO date
}
