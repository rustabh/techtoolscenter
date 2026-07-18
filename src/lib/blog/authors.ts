import type { Author } from "./types";

export const authors: Author[] = [
  {
    slug: "techtoolscenter-team",
    name: "TechToolsCenter Team",
    role: "Product & Tools",
    bio: "The team behind TechToolsCenter — building fast, private, browser-based tools and writing practical guides on how to get the most out of them.",
    avatarInitials: "TC",
    url: "https://techtoolscenter.com/about",
  },
  {
    slug: "editorial",
    name: "TechToolsCenter Editorial",
    role: "How-to Guides",
    bio: "Our editorial desk publishes step-by-step tutorials, comparisons and productivity tips for everyday digital tasks.",
    avatarInitials: "ED",
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
