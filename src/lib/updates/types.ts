import type { FaqItem } from "../tools";

export interface UpdateCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  emoji: string;
}

/**
 * A single Update entry. One flexible, reusable shape covers every category
 * (Google, Government, Platform changelog, Tool improvements, New features …).
 * Only the sections that are present render on the page, so adding a new update
 * never requires touching the layout — just append an object here (or later,
 * load from a CMS/JSON with the same shape).
 */
export interface Update {
  slug: string;
  title: string;
  category: string; // UpdateCategory slug
  summary: string;
  icon: string; // lucide icon name for the cover
  publishedOn: string; // ISO date
  updatedOn?: string;
  readingMinutes?: number;
  tags: string[];
  featured?: boolean;
  popular?: boolean;

  // Rich, optional sections — render only when provided.
  body?: string[]; // intro paragraphs
  whyItMatters?: string;
  whoIsAffected?: string;
  keyChanges?: string[];
  importantDates?: { label: string; date: string }[];
  nextSteps?: string[];
  officialSource?: { label: string; url: string };
  resources?: { label: string; url: string }[];

  // Tool-improvement specific
  before?: string;
  after?: string;
  benefits?: string[];

  // New-feature specific
  howToUse?: string[];

  // Cross-links
  relatedTools?: string[]; // tool/landing slugs
  relatedIndia?: string[]; // india service slugs
  relatedBlog?: string[]; // blog slugs
  relatedUpdates?: string[]; // update slugs

  faq?: FaqItem[];
}
