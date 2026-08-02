import { posts as blogPosts } from "../blog/posts";
import { indiaServices } from "../india/services";
import { runQaChecks } from "../qa/checks";
import { getDashboardData } from "./data";

/**
 * "Today's Best Growth Tasks" — the one part of the requested Growth
 * Dashboard that's genuinely buildable without an external API: every task
 * here comes from a real, computable signal already in this codebase
 * (stale content, missing FAQ, broken links, thin categories). Nothing about
 * keyword volume, rankings, or competition is guessed — those need Search
 * Console / a keyword-research API and are surfaced separately as
 * "not connected" rather than invented.
 */

export interface GrowthTask {
  title: string;
  items: string[];
  priority: "high" | "medium";
}

const STALE_DAYS = 120;

function daysAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

export function getGrowthPlan() {
  const findings = runQaChecks();
  const d = getDashboardData();

  const brokenLinks = findings.filter((f) => f.category === "broken-link");
  const missingFaqServices = findings.filter((f) => f.category === "missing-faq" && f.location.startsWith("india-services/"));
  const missingFaqBlogs = findings.filter((f) => f.category === "missing-faq" && f.location.startsWith("blog/"));
  const thinContent = findings.filter((f) => f.category === "thin-content");

  const staleBlogs = blogPosts
    .filter((p) => daysAgo(p.updatedOn ?? p.publishedOn) > STALE_DAYS)
    .map((p) => `${p.title} (${daysAgo(p.updatedOn ?? p.publishedOn)}d old)`);

  const staleServices = indiaServices
    .filter((s) => s.updatedOn && daysAgo(s.updatedOn) > STALE_DAYS)
    .map((s) => `${s.name} (${daysAgo(s.updatedOn!)}d old)`);

  const thinDevCategories = d.developerHub.thinnestCategories.filter((c) => c.count < 6).map((c) => `${c.name} (${c.count} resources)`);

  const candidateTasks: GrowthTask[] = [
    { title: "Fix broken internal links", items: brokenLinks.map((f) => `${f.location}: ${f.detail}`), priority: "high" as const },
    { title: "Add FAQ to India services missing one", items: missingFaqServices.map((f) => f.location.replace("india-services/", "")), priority: "high" as const },
    { title: "Refresh government guides over 120 days old", items: staleServices, priority: "medium" as const },
    { title: "Refresh blog posts over 120 days old", items: staleBlogs, priority: "medium" as const },
    { title: "Expand thin blog posts (under 300 words)", items: thinContent.map((f) => f.location.replace("blog/", "")), priority: "medium" as const },
    { title: "Add FAQ to blog posts missing one", items: missingFaqBlogs.map((f) => f.location.replace("blog/", "")), priority: "medium" as const },
    { title: "Expand thin Developer Hub categories", items: thinDevCategories, priority: "medium" as const },
  ];
  const tasks = candidateTasks.filter((t) => t.items.length > 0);

  return {
    tasks,
    notConnected: [
      "Trending keywords — needs Google Search Console API (or Google Trends)",
      "Suggested articles/comparison/programmatic pages by search volume & competition — needs a keyword-research API (Search Console alone doesn't give volume/competition)",
      "\"6 keywords are trending\" style signals — same, needs Search Console + a trends data source",
    ],
  };
}
