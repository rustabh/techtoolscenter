import type { FaqItem } from "../tools";

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarInitials: string; // shown in a coloured chip (no external image needed)
  url?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

/** Structured content blocks — typed, so the Table of Contents and schema can
 *  be generated automatically and there is no external markdown dependency. */
export type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; text: string } // supports inline **bold** and [text](href)
  | { type: "ul" | "ol"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "code"; text: string };

export type BlogTemplate = "guide" | "listicle" | "comparison" | "tutorial";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // BlogCategory slug
  author: string; // Author slug
  template: BlogTemplate;
  publishedOn: string; // ISO date
  updatedOn?: string;
  readingMinutes?: number; // auto-estimated when omitted
  tags: string[];
  cover?: string;
  content: Block[];
  faq?: FaqItem[];
  relatedTools?: string[]; // tool slugs
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
