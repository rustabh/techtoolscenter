import type { BlogCategory } from "./types";

export const blogCategories: BlogCategory[] = [
  { slug: "guides", name: "Guides", description: "In-depth how-to guides for getting things done online.", icon: "BookOpen" },
  { slug: "business", name: "Business", description: "Invoicing, GST, quotations and running a small business.", icon: "Briefcase" },
  { slug: "productivity", name: "Productivity", description: "Work faster with the right tools and workflows.", icon: "Zap" },
  { slug: "design", name: "Design", description: "Mockups, branding, images and everything visual.", icon: "Palette" },
  { slug: "developer", name: "Developer", description: "Tips and references for developers and makers.", icon: "Code2" },
  { slug: "seo", name: "SEO", description: "On-page SEO, metadata and getting found on Google.", icon: "Rocket" },
];

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}
