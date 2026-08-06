/**
 * Curated topic pages — a small, deliberate set of cross-category tag
 * filters (unlike the full blogCategories list, which is exhaustive).
 * Each maps a real BlogPost.tags value to a dedicated /blog/tag/[slug]
 * page, kept short so we never expose a thin, near-empty tag page.
 */
export interface BlogTopic {
  slug: string; // URL slug for /blog/tag/[slug]
  tag: string; // exact tag value to match against BlogPost.tags
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export const blogTopics: BlogTopic[] = [
  { slug: "pdf", tag: "pdf", name: "PDF Guides", description: "Compressing, merging, splitting and converting PDF files.", icon: "FileText" },
  { slug: "ai", tag: "ai", name: "AI Guides", description: "AI chatbots, tools and how to get better results from them.", icon: "Bot" },
  { slug: "india", tag: "india", name: "Government Guides", description: "Indian government services, documents and certificates.", icon: "Landmark" },
];

export function getBlogTopic(slug: string): BlogTopic | undefined {
  return blogTopics.find((t) => t.slug === slug);
}
