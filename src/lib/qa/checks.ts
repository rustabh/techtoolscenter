import { tools } from "../tools";
import { posts as blogPosts } from "../blog/posts";
import type { BlogPost } from "../blog/types";
import { indiaServices } from "../india/services";
import { landingPages } from "../landing/landing";
import { aiTools } from "../aihub/tools";
import { externalDevResources } from "../devhub/resources";

/**
 * The actual QA check logic — shared between `scripts/qa-audit.ts` (CLI,
 * `npm run qa`) and the internal dashboard's Growth Planner, so there's one
 * definition of "broken link" / "thin content" / "missing FAQ" instead of
 * two copies drifting apart.
 */

export interface QaFinding {
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  location: string;
  detail: string;
}

const MIN_BLOG_WORDS = 300;

function wordCount(post: BlogPost): number {
  return post.content.reduce((n, b) => {
    if (b.type === "ul" || b.type === "ol") return n + b.items.join(" ").split(/\s+/).length;
    if ("text" in b) return n + b.text.split(/\s+/).length;
    return n;
  }, 0);
}

function findDuplicates(items: { key: string; title: string }[], typeLabel: string, field: string, findings: QaFinding[]) {
  const seen = new Map<string, string[]>();
  for (const { key, title } of items) {
    const norm = title.trim().toLowerCase();
    if (!norm) continue;
    seen.set(norm, [...(seen.get(norm) ?? []), key]);
  }
  for (const [title, keys] of seen) {
    if (keys.length > 1) {
      findings.push({ severity: "high", category: `duplicate-${field}`, location: keys.join(", "), detail: `${typeLabel} share the same ${field}: "${title}"` });
    }
  }
}

export function runQaChecks(): QaFinding[] {
  const findings: QaFinding[] = [];

  // A "tool link" can point at either a registered tool or a /tools/[slug]
  // programmatic-SEO landing page — both resolve on the same route.
  const toolSlugs = new Set([...tools.map((t) => t.slug), ...landingPages.map((l) => l.slug)]);
  const blogSlugs = new Set(blogPosts.map((p) => p.slug));
  const serviceSlugs = new Set(indiaServices.map((s) => s.slug));

  // 1. Broken internal link references
  for (const post of blogPosts) {
    for (const slug of post.relatedTools ?? []) {
      if (!toolSlugs.has(slug)) findings.push({ severity: "critical", category: "broken-link", location: `blog/${post.slug}`, detail: `relatedTools references non-existent tool slug "${slug}"` });
    }
  }
  for (const svc of indiaServices) {
    for (const slug of svc.relatedTools ?? []) {
      if (!toolSlugs.has(slug)) findings.push({ severity: "critical", category: "broken-link", location: `india-services/${svc.slug}`, detail: `relatedTools references non-existent tool slug "${slug}"` });
    }
    for (const slug of svc.relatedServices ?? []) {
      if (!serviceSlugs.has(slug)) findings.push({ severity: "critical", category: "broken-link", location: `india-services/${svc.slug}`, detail: `relatedServices references non-existent service slug "${slug}"` });
    }
    for (const slug of svc.relatedBlog ?? []) {
      if (!blogSlugs.has(slug)) findings.push({ severity: "critical", category: "broken-link", location: `india-services/${svc.slug}`, detail: `relatedBlog references non-existent post slug "${slug}"` });
    }
  }
  // AI Hub tools link back to our own /tools/[slug] pages the same way blog
  // posts and India services do, but were never validated here — a stale or
  // typo'd slug would otherwise render as a silently dead link.
  for (const t of aiTools) {
    for (const slug of t.relatedTools ?? []) {
      if (!toolSlugs.has(slug)) findings.push({ severity: "critical", category: "broken-link", location: `ai-hub/${t.slug}`, detail: `relatedTools references non-existent tool slug "${slug}"` });
    }
  }
  // Same class of link, on Developer Hub resources.
  for (const r of externalDevResources) {
    if (r.internalToolSlug && !toolSlugs.has(r.internalToolSlug)) {
      findings.push({ severity: "critical", category: "broken-link", location: `developer-hub/${r.slug}`, detail: `internalToolSlug references non-existent tool slug "${r.internalToolSlug}"` });
    }
  }

  // 2. Duplicate titles/descriptions within a content type
  findDuplicates(tools.map((t) => ({ key: t.slug, title: t.seoTitle ?? t.name })), "Tools", "title", findings);
  findDuplicates(blogPosts.map((p) => ({ key: p.slug, title: p.seoTitle ?? p.title })), "Blog posts", "title", findings);
  findDuplicates(blogPosts.map((p) => ({ key: p.slug, title: p.seoDescription ?? p.excerpt })), "Blog posts", "description", findings);
  findDuplicates(indiaServices.map((s) => ({ key: s.slug, title: s.seoTitle ?? s.name })), "India services", "title", findings);
  findDuplicates(aiTools.map((t) => ({ key: t.slug, title: t.name })), "AI Hub tools", "name", findings);
  findDuplicates(externalDevResources.map((r) => ({ key: r.slug, title: r.name })), "Developer Hub resources", "name", findings);

  // 3. Thin content
  for (const post of blogPosts) {
    const words = wordCount(post);
    if (words < MIN_BLOG_WORDS) findings.push({ severity: "medium", category: "thin-content", location: `blog/${post.slug}`, detail: `only ~${words} words (below the ${MIN_BLOG_WORDS}-word floor)` });
  }

  // 4. Missing FAQ (tools always get one via the content.ts auto-generation engine, no check needed there)
  for (const post of blogPosts) {
    if (!post.faq || post.faq.length === 0) findings.push({ severity: "medium", category: "missing-faq", location: `blog/${post.slug}`, detail: "no FAQ block — no FAQPage schema will be emitted for this post" });
  }
  for (const svc of indiaServices) {
    if (!svc.faq || svc.faq.length === 0) findings.push({ severity: "high", category: "missing-faq", location: `india-services/${svc.slug}`, detail: "no FAQ — every other India service has one; this page loses FAQPage schema" });
  }

  return findings;
}

export function linkCoverage() {
  return {
    blogWithNoExplicitTools: blogPosts.filter((p) => !p.relatedTools?.length).length,
    servicesWithNoExplicitTools: indiaServices.filter((s) => !s.relatedTools?.length).length,
    totalBlogs: blogPosts.length,
    totalServices: indiaServices.length,
  };
}

export function blogWordCount(post: BlogPost): number {
  return wordCount(post);
}

export const MIN_BLOG_WORDS_THRESHOLD = MIN_BLOG_WORDS;
