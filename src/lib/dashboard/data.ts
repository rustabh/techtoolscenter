import { execSync } from "node:child_process";
import { tools, categories } from "../tools";
import { posts as blogPosts } from "../blog/posts";
import { blogCategories } from "../blog/categories";
import { indiaServices } from "../india/services";
import { indiaCategories } from "../india/categories";
import { schemes } from "../india/schemes";
import { hindiServices } from "../india/hindi";
import { externalDevResources } from "../devhub/resources";
import { builtinDevTools } from "../devhub/builtin";
import { devCategories } from "../devhub/categories";
import { aiTools } from "../aihub/tools";
import { aiCategories } from "../aihub/categories";
import { landingPages } from "../landing/landing";
import { collections } from "../collections";
import { fastPathCount } from "../incinc/intents";
import { getKnowledgeBase } from "../incinc/knowledge";
import { blogWordCount } from "../qa/checks";
import healthSnapshot from "./health-snapshot.json";

/**
 * Single data source for the internal Project Health Dashboard. Every number
 * here is either computed live from the site's own content/registry files
 * (accurate as of this request) or read from the health-check snapshot
 * (accurate as of whenever `npm run health-check` last ran — the dashboard
 * always shows that timestamp so nothing is presented as more live than it
 * actually is). Nothing is fabricated: a metric this codebase genuinely can't
 * measure (Lighthouse, live external-link checks, cross-user Incinc AI query
 * volume — there's no backend/database to log them) is returned as `null`
 * with an explanation, not a guessed number.
 */

function daysAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function gitLogSummary(days: number) {
  try {
    const since = new Date(Date.now() - days * 86400000).toISOString();
    const raw = execSync(`git log --since="${since}" --pretty=format:"%h|%ad|%s" --date=format:"%Y-%m-%d"`, {
      cwd: process.cwd(),
    }).toString();
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, date, ...rest] = line.split("|");
        return { hash, date, subject: rest.join("|") };
      });
  } catch {
    return [];
  }
}

export function getDashboardData() {
  const now = Date.now();
  const weekAgo = now - 7 * 86400000;
  const monthAgo = now - 30 * 86400000;

  // --- Platform Overview ---------------------------------------------------
  const overview = {
    totalTools: tools.length,
    totalBlogs: blogPosts.length,
    totalCategories: categories.length + blogCategories.length + indiaCategories.length + devCategories.length + aiCategories.length,
    totalAiTools: aiTools.length,
    totalGovernmentGuides: indiaServices.length,
    totalDeveloperResources: externalDevResources.length + builtinDevTools.length,
    totalTemplates: landingPages.length,
    totalCollections: collections.length,
    totalIndexedPages: healthSnapshot.build?.totalStaticPages ?? null,
    git: healthSnapshot.git,
    buildSnapshotAt: healthSnapshot.generatedAt,
  };

  // --- SEO Health (from the post-build crawl) ------------------------------
  const seo = healthSnapshot.seo;

  // --- Performance ----------------------------------------------------------
  const performance = {
    sharedFirstLoadKb: healthSnapshot.build?.sharedFirstLoadKb ?? null,
    largestRoutes: healthSnapshot.build?.largestRoutes ?? [],
    lighthouse: null as null, // not measurable from this environment — see note in UI
    coreWebVitals: null as null, // requires field data (CrUX/RUM) — not configured
  };

  // --- Content ---------------------------------------------------------------
  const todayStr = new Date().toISOString().slice(0, 10);
  const blogsToday = blogPosts.filter((p) => p.publishedOn === todayStr);
  const blogsThisWeek = blogPosts.filter((p) => new Date(p.publishedOn).getTime() >= weekAgo);
  const blogsThisMonth = blogPosts.filter((p) => new Date(p.publishedOn).getTime() >= monthAgo);
  const totalWords = blogPosts.reduce((sum, p) => sum + blogWordCount(p), 0);
  const averageWordCount = blogPosts.length ? Math.round(totalWords / blogPosts.length) : 0;
  // Honest proxy for "human review pending": posts still running on both generated
  // defaults (no seoTitle AND no seoDescription override) haven't had an SEO pass yet.
  const notSeoReviewed = blogPosts.filter((p) => !p.seoTitle && !p.seoDescription).length;
  const recentlyUpdatedItems: { title: string; slug: string; updatedOn: string; type: "blog" | "india-service" }[] = [
    ...blogPosts.map((p) => ({ title: p.title, slug: p.slug, updatedOn: p.updatedOn ?? p.publishedOn, type: "blog" as const })),
    ...indiaServices.filter((s) => s.updatedOn).map((s) => ({ title: s.name, slug: s.slug, updatedOn: s.updatedOn!, type: "india-service" as const })),
  ];
  const recentlyUpdated = recentlyUpdatedItems
    .sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime())
    .slice(0, 8);
  const STALE_DAYS = 120;
  const needsRefresh = [...blogPosts]
    .filter((p) => daysAgo(p.updatedOn ?? p.publishedOn) > STALE_DAYS)
    .sort((a, b) => daysAgo(b.updatedOn ?? b.publishedOn) - daysAgo(a.updatedOn ?? a.publishedOn))
    .slice(0, 8)
    .map((p) => ({ slug: p.slug, title: p.title, daysSinceUpdate: daysAgo(p.updatedOn ?? p.publishedOn) }));

  const content = {
    blogsToday: blogsToday.length,
    blogsThisWeek: blogsThisWeek.length,
    blogsThisMonth: blogsThisMonth.length,
    averageWordCount,
    humanReviewPending: notSeoReviewed,
    programmaticPagesTotal: landingPages.length,
    recentlyUpdated,
    needsRefresh,
    staleThresholdDays: STALE_DAYS,
  };

  // --- India Hub ---------------------------------------------------------
  const servicesByCategory = indiaCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: indiaServices.filter((s) => s.category === c.slug).length,
  })).sort((a, b) => b.count - a.count);
  const recentIndiaGuides = [...indiaServices]
    .filter((s) => s.updatedOn)
    .sort((a, b) => new Date(b.updatedOn!).getTime() - new Date(a.updatedOn!).getTime())
    .slice(0, 6)
    .map((s) => ({ slug: s.slug, name: s.name, updatedOn: s.updatedOn }));

  const indiaHub = {
    totalGuides: indiaServices.length,
    totalSchemes: schemes.length,
    hindiTranslations: hindiServices.length,
    servicesByCategory,
    recentlyUpdated: recentIndiaGuides,
    officialUrlPopulated: indiaServices.filter((s) => !!s.officialUrl).length, // structural completeness, NOT a live-reachability check
  };

  // --- Developer Hub -------------------------------------------------------
  const devByCategory = devCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: externalDevResources.filter((r) => r.category === c.slug).length,
  })).sort((a, b) => a.count - b.count);
  const recentDevResources = [...externalDevResources]
    .sort((a, b) => new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime())
    .slice(0, 8)
    .map((r) => ({ name: r.name, addedOn: r.addedOn, category: r.category }));

  const developerHub = {
    totalResources: externalDevResources.length + builtinDevTools.length,
    resourcesAddedThisMonth: externalDevResources.filter((r) => new Date(r.addedOn).getTime() >= monthAgo).length,
    thinnestCategories: devByCategory.slice(0, 5),
    recentlyAdded: recentDevResources,
  };

  // --- AI Hub --------------------------------------------------------------
  const free = aiTools.filter((t) => t.pricing === "Free").length;
  const paid = aiTools.filter((t) => t.pricing === "Paid").length;
  const freemium = aiTools.filter((t) => t.pricing === "Freemium").length;
  const newAiToolsThisMonth = aiTools.filter((t) => new Date(t.addedOn).getTime() >= monthAgo).length;

  const aiHub = {
    total: aiTools.length,
    free,
    paid,
    freemium,
    newThisMonth: newAiToolsThisMonth,
    categoriesCovered: aiCategories.length,
  };

  // --- Incinc AI -----------------------------------------------------------
  // Incinc AI is stateless (no request logging / database), so cross-user query
  // volume, top questions, and unknown questions genuinely cannot be measured —
  // reported as null rather than invented. Intent/knowledge-base counts are a
  // real, honest proxy for "how much ground does it cover today."
  const incinc = {
    fastPathIntentCount: fastPathCount(),
    knowledgeBaseEntries: getKnowledgeBase().length,
    totalQueries: null as null,
    topQuestions: null as null,
    unknownQuestions: null as null,
  };

  // --- Errors ---------------------------------------------------------------
  const errors = {
    brokenRoutes: healthSnapshot.errors?.brokenRoutes ?? [],
    missingAssets: healthSnapshot.errors?.missingAssets ?? [],
    consoleSample: healthSnapshot.consoleSample ?? [],
  };

  // --- Weekly summary --------------------------------------------------------
  const commits = gitLogSummary(7);
  const featCommits = commits.filter((c) => /^feat/.test(c.subject));
  const fixCommits = commits.filter((c) => /^fix/.test(c.subject));
  const contentCommits = commits.filter((c) => /^content/.test(c.subject));

  const weeklySummary = {
    commitCount: commits.length,
    newTools: featCommits.filter((c) => /tool/i.test(c.subject)).map((c) => c.subject),
    newBlogs: [...featCommits, ...contentCommits].filter((c) => /blog|content|post/i.test(c.subject)).map((c) => c.subject),
    seoImprovements: fixCommits.filter((c) => /seo|title|meta|schema|canonical|og|sitemap/i.test(c.subject)).map((c) => c.subject),
    performanceImprovements: fixCommits.concat(featCommits).filter((c) => /perf|bundle|dedupe|refactor/i.test(c.subject)).map((c) => c.subject),
    remainingTasks: [
      "Soft-404 issue (notFound() returns HTTP 200) — needs an architectural decision",
      "Shared <FileDropzone> component still duplicated across 6+ tool files",
      `${content.needsRefresh.length} blog posts over ${STALE_DAYS} days without an update`,
    ],
  };

  return { overview, seo, performance, content, indiaHub, developerHub, aiHub, incinc, errors, weeklySummary };
}

export type DashboardData = ReturnType<typeof getDashboardData>;
