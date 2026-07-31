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
  validity?: string; // how long the document/registration stays valid
  applyModes?: string[]; // e.g. ["Online", "Offline (at office)", "CSC / Seva Kendra"]
  helpline?: string; // official toll-free / support (when publicly listed)
  officialLinks?: { label: string; url: string }[]; // quick official links (check status, download, etc.)
  partnerLinks?: { label: string; description: string; url: string }[]; // paid/affiliate recommendations — always rendered as "Sponsored", never official
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
