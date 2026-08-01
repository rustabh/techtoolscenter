import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";
import type { LinkItem } from "./types";

export interface KnowledgeEntry {
  id: string;
  aliases: string[];
  answer: string;
  relatedTools?: LinkItem[];
  officialResources?: LinkItem[];
  nextStep?: string;
}

/**
 * Every fact here traces to something actually published on this site
 * (siteConfig, /about, /contact, /privacy, footer credit). Nothing about
 * the company is invented. If a user asks something not covered here
 * (e.g. a founder's name — not published anywhere on the site), the
 * intent handler says so explicitly rather than guessing.
 */
export function buildKnowledgeBase(): KnowledgeEntry[] {
  return [
    {
      id: "company-overview",
      aliases: ["techtoolscenter", "tech tools center", "about techtoolscenter", "what is techtoolscenter", "tell me about techtoolscenter"],
      answer: `${siteConfig.name} — "${siteConfig.tagline}". ${siteConfig.description} It's built by Incinc Media.`,
      officialResources: [{ label: "About TechToolsCenter", href: "/about", kind: "internal" }],
      nextStep: "Ask about our mission, services, privacy policy, or how to get in touch.",
    },
    {
      id: "mission",
      aliases: ["mission", "your mission", "techtoolscenter mission", "vision", "goal", "why does techtoolscenter exist"],
      answer:
        "Our mission is simple: build high-quality online tools that anyone can use instantly — no sign-up, no software installation, no complicated interfaces, no unnecessary barriers. Our vision is to become the world's most trusted productivity toolkit, where anyone can solve everyday digital tasks in seconds.",
      officialResources: [{ label: "About TechToolsCenter", href: "/about", kind: "internal" }],
    },
    {
      id: "values",
      aliases: ["values", "core values", "what do you stand for", "principles"],
      answer:
        "Eight core values guide everything we build: Privacy First (your files are processed in your browser, never uploaded or sold), Speed, Accessibility, Quality, Simplicity, Transparency (no hidden charges, no dark patterns, no tracking), Innovation, and Trust.",
      officialResources: [{ label: "About TechToolsCenter", href: "/about", kind: "internal" }],
    },
    {
      id: "services-products",
      aliases: ["services", "products", "what do you offer", "what can i do here", "what does techtoolscenter offer", "features"],
      answer: `TechToolsCenter offers ${tools.length}+ free browser-based tools (invoices, PDFs, images, calculators, generators and more), an AI Hub with 250+ AI tools, a Developer Hub of coding resources, an India Hub for government service guides, a blog, a community section, and a rolling log of product updates.`,
      officialResources: [
        { label: "All Tools", href: "/tools", kind: "internal" },
        { label: "AI Hub", href: "/ai-hub", kind: "internal" },
        { label: "Developer Hub", href: "/developer-hub", kind: "internal" },
        { label: "India Hub", href: "/india-services", kind: "internal" },
      ],
    },
    {
      id: "privacy-policy",
      aliases: ["privacy policy", "privacy", "is my data safe", "do you store my data", "do you upload my files"],
      answer:
        "Every tool processes your data entirely inside your browser — documents, images and text you enter are never uploaded to or stored on any server we control. Some tools save your most recent input to your browser's local storage purely so you can resume work; that stays on your device and you can clear it anytime. TechToolsCenter may show ads (e.g. Google AdSense), and ad partners can use cookies per their own privacy policies.",
      officialResources: [{ label: "Full Privacy Policy", href: "/privacy", kind: "internal" }],
    },
    {
      id: "contact",
      aliases: ["contact", "contact us", "how do i reach you", "support", "get in touch", "report a bug", "suggest a tool"],
      answer: `You can reach the team at ${siteConfig.email}, or use the contact form on the site. Messages are usually answered within 1-2 business days.`,
      officialResources: [{ label: "Contact Us", href: "/contact", kind: "internal" }],
    },
    {
      id: "incinc-media",
      aliases: ["incinc media", "incinc", "who built this", "who made this", "who owns techtoolscenter", "parent company", "developer of techtoolscenter"],
      answer: `TechToolsCenter is built and operated by Incinc Media (${siteConfig.developer.url}). Beyond that credit, no further public company details are published on this site — I won't guess beyond what's actually listed.`,
    },
    {
      id: "founder",
      aliases: ["founder", "who is the founder", "ceo", "who founded", "who created techtoolscenter", "who is behind techtoolscenter"],
      answer:
        "That information isn't publicly listed on this site — TechToolsCenter's About and Contact pages credit Incinc Media as the company behind it, but no individual founder name is published. I'd rather say that plainly than guess.",
    },
  ];
}

let cache: KnowledgeEntry[] | null = null;
export function getKnowledgeBase(): KnowledgeEntry[] {
  if (!cache) cache = buildKnowledgeBase();
  return cache;
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

export function lookupKnowledge(query: string): KnowledgeEntry | undefined {
  const q = normalize(query);
  if (!q) return undefined;
  const kb = getKnowledgeBase();
  return (
    kb.find((e) => e.aliases.some((a) => normalize(a) === q)) ??
    kb.find((e) => e.aliases.some((a) => q.includes(normalize(a))))
  );
}
