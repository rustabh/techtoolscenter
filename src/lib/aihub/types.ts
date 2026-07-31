export interface AiCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export type AiPricing = "Free" | "Freemium" | "Paid" | "Enterprise";
export type AiPlatform = "Web" | "Mobile" | "Desktop" | "Chrome Extension";

export interface AiTool {
  slug: string;
  name: string;
  category: string; // AiCategory slug
  developer: string; // company / creator
  officialUrl: string;
  docsUrl?: string;
  overview: string; // 1-2 sentence original description, never copied
  pricing: AiPricing;
  apiAvailable?: boolean;
  platforms?: AiPlatform[];
  openSource?: boolean;
  tags: string[];
  badge?: "Trending" | "Popular" | "New";
  relatedTools?: string[]; // TechToolsCenter internal tool slugs
  icon: string; // lucide-react icon name — stands in for a logo, no third-party logos embedded
  addedOn: string;
}
