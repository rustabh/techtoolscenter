/**
 * QA audit CLI — automated content/SEO quality checks across every content
 * type on the site. Run with `npm run qa`. The actual check logic lives in
 * src/lib/qa/checks.ts, shared with the internal dashboard's Growth Planner.
 */
import { tools } from "../src/lib/tools";
import { posts as blogPosts } from "../src/lib/blog/posts";
import { indiaServices } from "../src/lib/india/services";
import { externalDevResources } from "../src/lib/devhub/resources";
import { aiTools } from "../src/lib/aihub/tools";
import { runQaChecks, linkCoverage } from "../src/lib/qa/checks";

const findings = runQaChecks();
const coverage = linkCoverage();

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
console.log(`- Blog posts with no explicit relatedTools: ${coverage.blogWithNoExplicitTools}/${coverage.totalBlogs} (auto-fallback covers these via lib/seo/related.ts)`);
console.log(`- India services with no explicit relatedTools: ${coverage.servicesWithNoExplicitTools}/${coverage.totalServices} (auto-fallback covers these via lib/seo/related.ts)\n`);

const order: (typeof findings)[number]["severity"][] = ["critical", "high", "medium", "low"];
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
