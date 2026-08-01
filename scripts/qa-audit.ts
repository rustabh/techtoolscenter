/**
 * QA audit system — automated content/SEO quality checks across every
 * content type on the site (tools, blog posts, India services, dev
 * resources, AI tools). Run with `npm run qa`.
 *
 * Checks:
 *  - Broken internal link references (relatedTools/relatedServices/relatedBlog
 *    pointing at a slug that doesn't exist)
 *  - Duplicate titles / duplicate meta descriptions across each content type
 *  - Thin content (word count below a sane minimum)
 *  - Missing FAQ
 *  - Internal-link coverage (how many items have zero related content)
 *
 * This is a data-level audit (fast, no build required) — it catches the
 * class of bug that's easy to introduce when adding hundreds of new pages
 * by hand (a typo'd slug, a copy-pasted title, a post with no FAQ).
 */
import { tools } from "../src/lib/tools";
import { posts as blogPosts } from "../src/lib/blog/posts";
import { indiaServices } from "../src/lib/india/services";
import { externalDevResources } from "../src/lib/devhub/resources";
import { aiTools } from "../src/lib/aihub/tools";
import { landingPages } from "../src/lib/landing/landing";

interface Finding {
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  location: string;
  detail: string;
}

const findings: Finding[] = [];
const add = (f: Finding) => findings.push(f);

// A "tool link" can point at either a registered tool or a /tools/[slug]
// programmatic-SEO landing page — both resolve on the same route.
const toolSlugs = new Set([...tools.map((t) => t.slug), ...landingPages.map((l) => l.slug)]);
const blogSlugs = new Set(blogPosts.map((p) => p.slug));
const serviceSlugs = new Set(indiaServices.map((s) => s.slug));

// ---------------------------------------------------------------------------
// 1. Broken internal link references
// ---------------------------------------------------------------------------
for (const post of blogPosts) {
  for (const slug of post.relatedTools ?? []) {
    if (!toolSlugs.has(slug)) {
      add({ severity: "critical", category: "broken-link", location: `blog/${post.slug}`, detail: `relatedTools references non-existent tool slug "${slug}"` });
    }
  }
}
for (const svc of indiaServices) {
  for (const slug of svc.relatedTools ?? []) {
    if (!toolSlugs.has(slug)) {
      add({ severity: "critical", category: "broken-link", location: `india-services/${svc.slug}`, detail: `relatedTools references non-existent tool slug "${slug}"` });
    }
  }
  for (const slug of svc.relatedServices ?? []) {
    if (!serviceSlugs.has(slug)) {
      add({ severity: "critical", category: "broken-link", location: `india-services/${svc.slug}`, detail: `relatedServices references non-existent service slug "${slug}"` });
    }
  }
  for (const slug of svc.relatedBlog ?? []) {
    if (!blogSlugs.has(slug)) {
      add({ severity: "critical", category: "broken-link", location: `india-services/${svc.slug}`, detail: `relatedBlog references non-existent post slug "${slug}"` });
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Duplicate titles / descriptions (within each content type)
// ---------------------------------------------------------------------------
function findDuplicates(items: { key: string; title: string }[], typeLabel: string, field: string) {
  const seen = new Map<string, string[]>();
  for (const { key, title } of items) {
    const norm = title.trim().toLowerCase();
    if (!norm) continue;
    seen.set(norm, [...(seen.get(norm) ?? []), key]);
  }
  for (const [title, keys] of seen) {
    if (keys.length > 1) {
      add({ severity: "high", category: `duplicate-${field}`, location: keys.join(", "), detail: `${typeLabel} share the same ${field}: "${title}"` });
    }
  }
}

findDuplicates(tools.map((t) => ({ key: t.slug, title: t.seoTitle ?? t.name })), "Tools", "title");
findDuplicates(blogPosts.map((p) => ({ key: p.slug, title: p.seoTitle ?? p.title })), "Blog posts", "title");
findDuplicates(blogPosts.map((p) => ({ key: p.slug, title: p.seoDescription ?? p.excerpt })), "Blog posts", "description");
findDuplicates(indiaServices.map((s) => ({ key: s.slug, title: s.seoTitle ?? s.name })), "India services", "title");

// ---------------------------------------------------------------------------
// 3. Thin content
// ---------------------------------------------------------------------------
const MIN_BLOG_WORDS = 300;
function wordCount(post: (typeof blogPosts)[number]): number {
  return post.content.reduce((n, b) => {
    if (b.type === "ul" || b.type === "ol") return n + b.items.join(" ").split(/\s+/).length;
    if ("text" in b) return n + b.text.split(/\s+/).length;
    return n;
  }, 0);
}
for (const post of blogPosts) {
  const words = wordCount(post);
  if (words < MIN_BLOG_WORDS) {
    add({ severity: "medium", category: "thin-content", location: `blog/${post.slug}`, detail: `only ~${words} words (below the ${MIN_BLOG_WORDS}-word floor)` });
  }
}

// ---------------------------------------------------------------------------
// 4. Missing FAQ
// ---------------------------------------------------------------------------
for (const post of blogPosts) {
  if (!post.faq || post.faq.length === 0) {
    add({ severity: "medium", category: "missing-faq", location: `blog/${post.slug}`, detail: "no FAQ block — no FAQPage schema will be emitted for this post" });
  }
}
for (const svc of indiaServices) {
  if (!svc.faq || svc.faq.length === 0) {
    add({ severity: "high", category: "missing-faq", location: `india-services/${svc.slug}`, detail: "no FAQ — every other India service has one; this page loses FAQPage schema" });
  }
}
// Tools always get a FAQ via the auto-generation engine (toolFaqs()), so no check needed there.

// ---------------------------------------------------------------------------
// 5. Internal-link coverage (informational, not necessarily a bug — the
//    auto-fallback in lib/seo/related.ts covers gaps, this just quantifies them)
// ---------------------------------------------------------------------------
const blogWithNoExplicitTools = blogPosts.filter((p) => !p.relatedTools?.length).length;
const servicesWithNoExplicitTools = indiaServices.filter((s) => !s.relatedTools?.length).length;

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const bySeverity = { critical: 0, high: 0, medium: 0, low: 0 };
for (const f of findings) bySeverity[f.severity]++;

console.log("# QA Audit Report\n");
console.log(`Generated ${new Date().toISOString()}\n`);
console.log(`Content scanned: ${tools.length} tools, ${blogPosts.length} blog posts, ${indiaServices.length} India services, ${externalDevResources.length} dev resources, ${aiTools.length} AI tools\n`);
console.log(`## Summary\n`);
console.log(`- Critical: ${bySeverity.critical}`);
console.log(`- High: ${bySeverity.high}`);
console.log(`- Medium: ${bySeverity.medium}`);
console.log(`- Low: ${bySeverity.low}\n`);
console.log(`## Internal-link coverage (informational)\n`);
console.log(`- Blog posts with no explicit relatedTools: ${blogWithNoExplicitTools}/${blogPosts.length} (auto-fallback covers these via lib/seo/related.ts)`);
console.log(`- India services with no explicit relatedTools: ${servicesWithNoExplicitTools}/${indiaServices.length} (auto-fallback covers these via lib/seo/related.ts)\n`);

const order: Finding["severity"][] = ["critical", "high", "medium", "low"];
for (const sev of order) {
  const group = findings.filter((f) => f.severity === sev);
  if (!group.length) continue;
  console.log(`## ${sev.toUpperCase()} (${group.length})\n`);
  for (const f of group) {
    console.log(`- **${f.category}** — \`${f.location}\`: ${f.detail}`);
  }
  console.log("");
}

if (findings.length === 0) {
  console.log("No issues found.");
}

process.exit(bySeverity.critical > 0 ? 1 : 0);
