import type { UpdateCategory } from "./types";

export const updateCategories: UpdateCategory[] = [
  { slug: "google", name: "Google Updates", description: "Google Search, Core Updates, Search Console and SEO best practices explained.", icon: "Globe", emoji: "🔍" },
  { slug: "government", name: "Government Notifications", description: "Important updates about Aadhaar, PAN, passport, GST, EPFO and other official services.", icon: "Landmark", emoji: "🏛️" },
  { slug: "platform", name: "TechToolsCenter Updates", description: "Our changelog — new tools, blogs, categories and platform improvements.", icon: "Rocket", emoji: "🚀" },
  { slug: "tool-improvements", name: "Tool Improvements", description: "What changed and improved across our PDF, image, developer and business tools.", icon: "Wrench", emoji: "🛠️" },
  { slug: "new-features", name: "New Features", description: "New capabilities on TechToolsCenter and how to use them.", icon: "Sparkles", emoji: "✨" },
  { slug: "announcements", name: "Announcements", description: "General news and announcements from TechToolsCenter.", icon: "Megaphone", emoji: "📢" },
  { slug: "security", name: "Security Updates", description: "Privacy and security improvements that keep your data safe.", icon: "ShieldCheck", emoji: "🔒" },
  { slug: "maintenance", name: "Maintenance", description: "Planned maintenance and infrastructure notes.", icon: "Settings", emoji: "🔧" },
];

export function getUpdateCategory(slug: string): UpdateCategory | undefined {
  return updateCategories.find((c) => c.slug === slug);
}

/** Friendly top-level aliases so /updates/google, /updates/platform, etc. work. */
export const categoryAliases: Record<string, string> = {
  google: "google",
  government: "government",
  platform: "platform",
  "tool-improvements": "tool-improvements",
  "new-features": "new-features",
  announcements: "announcements",
  security: "security",
  maintenance: "maintenance",
};
