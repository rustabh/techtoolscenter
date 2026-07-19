import type { FaqItem } from "../tools";

export interface IndiaCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export interface IndiaService {
  slug: string;
  name: string;
  category: string; // IndiaCategory slug
  officialName: string; // the authority / portal name
  officialUrl: string; // official government website
  overview: string;
  documents: string[];
  eligibility: string[];
  steps: string[];
  fees?: string; // only when publicly available
  processingTime?: string; // only when officially published
  faq: FaqItem[];
  mistakes: string[];
  relatedServices?: string[]; // service slugs
  relatedTools?: string[]; // TechToolsCenter tool/landing slugs
  relatedBlog?: string[]; // blog post slugs
  keywords: string[];
  popular?: boolean;
  updatedOn?: string;
  seoTitle?: string;
  seoDescription?: string;
}
