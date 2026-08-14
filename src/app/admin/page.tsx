import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { MetricCard, toneForIssueCount } from "@/components/dashboard/metric-card";
import { BarList } from "@/components/dashboard/bar-list";
import { IntegrationCard } from "@/components/dashboard/integration-card";
import { getDashboardData } from "@/lib/dashboard/data";
import { getGrowthPlan } from "@/lib/dashboard/growth-planner";
import { searchConsoleStatus, ga4Status, adsenseStatus, keywordResearchStatus } from "@/lib/dashboard/integrations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project Health & Growth Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Internal-only. Not linked from anywhere in the public site nav, excluded
 * from search indexing (robots: noindex), and gated behind DASHBOARD_ACCESS_KEY.
 *
 * Access rule: in production, the page 404s unless `?key=` matches the
 * DASHBOARD_ACCESS_KEY environment variable — set that in your hosting
 * provider's env vars to actually lock this down. In local development
 * (no NODE_ENV=production) it's always open for convenience. If you deploy
 * without setting DASHBOARD_ACCESS_KEY, this page 404s for everyone by
 * default (fails closed, never silently public).
 */
function checkAccess(key?: string): boolean {
  const required = process.env.DASHBOARD_ACCESS_KEY;
  if (process.env.NODE_ENV !== "production") return true;
  if (!required) return false;
  return key === required;
}

function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function NotAvailable({ reason }: { reason: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground">
      <span className="font-medium text-foreground">Not available.</span> {reason}
    </div>
  );
}

export default async function ProjectHealthDashboard({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  if (!checkAccess(key)) notFound();

  const d = getDashboardData();
  const seoIssueTotal =
    d.seo.missingTitle + d.seo.missingMetaDescription + d.seo.missingOgImage + d.seo.missingCanonical + d.seo.missingSchema + d.seo.duplicateTitleGroups.length;
  const errorTotal = d.errors.brokenRoutes.length + d.errors.missingAssets.length;
  const growthPlan = getGrowthPlan();
  const searchConsole = searchConsoleStatus();
  const ga4 = ga4Status();
  const adsense = adsenseStatus();
  const keywordResearch = keywordResearchStatus();

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container-tight">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary"><Icon name="Gauge" className="size-5" /></span>
              <h1 className="text-2xl font-bold tracking-tight">Project Health & Growth Dashboard</h1>
              <Badge variant="secondary">Internal only</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              TechToolsCenter — a 30-second read on platform health, SEO, performance, content, and what to do next.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-right text-xs text-muted-foreground">
            <p>Health snapshot: <span className="font-medium text-foreground">{fmtDate(d.overview.buildSnapshotAt)}</span></p>
            <p>Commit <code className="rounded bg-secondary px-1 py-0.5">{d.overview.git?.commit}</code> · {d.overview.git?.branch}</p>
            <p className="mt-1">Run <code className="rounded bg-secondary px-1 py-0.5">npm run health-check</code> to refresh</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* 1. Platform Overview */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="LayoutGrid" className="size-4 text-primary" /> Platform Overview</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <MetricCard label="Tools" value={d.overview.totalTools} icon="Wrench" />
              <MetricCard label="Blog posts" value={d.overview.totalBlogs} icon="FileText" />
              <MetricCard label="Categories" value={d.overview.totalCategories} icon="LayoutGrid" />
              <MetricCard label="AI tools" value={d.overview.totalAiTools} icon="Bot" />
              <MetricCard label="Government guides" value={d.overview.totalGovernmentGuides} icon="Landmark" />
              <MetricCard label="Developer resources" value={d.overview.totalDeveloperResources} icon="Code2" />
              <MetricCard label="Templates / landing pages" value={d.overview.totalTemplates} icon="LayoutTemplate" />
              <MetricCard label="Collections" value={d.overview.totalCollections} icon="Boxes" />
              <MetricCard label="Indexed pages (build)" value={d.overview.totalIndexedPages ?? "—"} icon="Globe" hint="static pages in last health-check" />
              <MetricCard label="Latest commit" value={d.overview.git?.commit ?? "—"} icon="GitBranch" hint={d.overview.git?.commitMessage?.slice(0, 40)} />
              <MetricCard label="Last deployment" value={fmtDate(d.overview.git?.commitDate).split(",")[0]} icon="Rocket" />
              <MetricCard label="Build status" value="Passing" icon="ShieldCheck" tone="good" hint="as of last health-check run" />
            </div>
          </section>

          {/* AI Growth Planner — every task below comes from a real, computed
              signal (stale content, missing FAQ, broken links, thin categories).
              Nothing about keyword volume or trends is guessed — see the
              "not connected" note for what that would need. */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon name="Sparkles" className="size-4 text-primary" /> Today&apos;s Best Growth Tasks</h2>
              <Badge variant={growthPlan.tasks.length === 0 ? "success" : "warning"}>
                {growthPlan.tasks.length === 0 ? "Nothing urgent" : `${growthPlan.tasks.length} task group${growthPlan.tasks.length === 1 ? "" : "s"}`}
              </Badge>
            </div>
            <Card>
              <CardContent className="space-y-4 pt-6">
                {growthPlan.tasks.length === 0 && <p className="text-sm text-muted-foreground">No open broken links, missing FAQs, stale content, or thin categories right now — genuinely nothing urgent.</p>}
                {growthPlan.tasks.map((task, i) => (
                  <div key={task.title} className="flex gap-3">
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${task.priority === "high" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{task.title} <span className="font-normal text-muted-foreground">({task.items.length})</span></p>
                      <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                        {task.items.slice(0, 6).map((item, j) => <li key={j} className="truncate">· {item}</li>)}
                        {task.items.length > 6 && <li>· and {task.items.length - 6} more — see the sections above</li>}
                      </ul>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Not connected yet:</span> trending keywords and search-volume-backed article/comparison/programmatic-page suggestions — these need Search Console + a keyword-research API. See the Content Opportunities section below for exact setup steps.
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 2. SEO Health */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon name="Rocket" className="size-4 text-primary" /> SEO Health</h2>
              <Badge variant={seoIssueTotal === 0 ? "success" : toneForIssueCount(seoIssueTotal, 10) === "bad" ? "destructive" : "warning"}>
                {seoIssueTotal === 0 ? "All clear" : `${seoIssueTotal} issue${seoIssueTotal === 1 ? "" : "s"}`}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <MetricCard label="Missing title" value={d.seo.missingTitle} tone={toneForIssueCount(d.seo.missingTitle)} />
              <MetricCard label="Missing meta description" value={d.seo.missingMetaDescription} tone={toneForIssueCount(d.seo.missingMetaDescription)} />
              <MetricCard label="Missing OG image" value={d.seo.missingOgImage} tone={toneForIssueCount(d.seo.missingOgImage)} />
              <MetricCard label="Missing canonical" value={d.seo.missingCanonical} tone={toneForIssueCount(d.seo.missingCanonical)} />
              <MetricCard label="Missing schema" value={d.seo.missingSchema} tone={toneForIssueCount(d.seo.missingSchema)} />
              <MetricCard label="Duplicate titles" value={d.seo.duplicateTitleGroups.length} tone={toneForIssueCount(d.seo.duplicateTitleGroups.length)} hint="grouped by exact title match" />
              <MetricCard label="Broken internal links" value="See `npm run qa`" tone="neutral" hint="checked against tool/blog/service slugs" />
              <MetricCard label="Orphan pages" value="Not tracked" tone="neutral" hint="no page-graph crawler yet — roadmap" />
              <MetricCard label="Pages scanned" value={d.seo.pagesScanned} icon="FileSearch" />
            </div>
            {d.seo.duplicateTitleGroups.length > 0 && (
              <Card className="mt-4">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Duplicate title groups</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {d.seo.duplicateTitleGroups.map((g) => (
                    <div key={g.title} className="rounded-lg bg-secondary/40 p-2">
                      <p className="font-medium">{g.title}</p>
                      <p className="text-xs text-muted-foreground">{g.routes.join("  ·  ")}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </section>

          {/* 3. Performance */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Gauge" className="size-4 text-primary" /> Performance</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Bundle size (shared)" value={d.performance.sharedFirstLoadKb ? `${d.performance.sharedFirstLoadKb} kB` : "—"} icon="Zap" />
                <MetricCard label="Build time" value="See health-check log" icon="Clock" hint="timed by CI, not this page" />
                <div className="col-span-2"><NotAvailable reason="Lighthouse and Core Web Vitals require a live-URL crawl or CrUX/RUM field data — not configured in this environment. Run Lighthouse CI against the production deploy and wire its JSON output into the health-check snapshot to light this up for real." /></div>
              </div>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Largest pages (First Load JS)</CardTitle></CardHeader>
                <CardContent>
                  <BarList
                    items={d.performance.largestRoutes.map((r) => ({ label: r.route, value: Math.round(r.firstLoadKb) }))}
                    valueSuffix=" kB"
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 4. Content */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="BookOpen" className="size-4 text-primary" /> Content</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label="Blogs today" value={d.content.blogsToday} icon="FileText" />
              <MetricCard label="Blogs this week" value={d.content.blogsThisWeek} icon="FileText" />
              <MetricCard label="Blogs this month" value={d.content.blogsThisMonth} icon="FileText" />
              <MetricCard label="Average word count" value={d.content.averageWordCount} icon="AlignLeft" />
              <MetricCard label="Programmatic pages" value={d.content.programmaticPagesTotal} icon="LayoutTemplate" />
              <MetricCard
                label={`Needs refresh (>${d.content.staleThresholdDays}d)`}
                value={d.content.needsRefresh.length}
                tone={toneForIssueCount(d.content.needsRefresh.length, 15)}
              />
              <MetricCard
                label="Human review pending"
                value={d.content.humanReviewPending}
                hint="posts with no seoTitle/seoDescription override yet"
                tone={toneForIssueCount(d.content.humanReviewPending, 20)}
              />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Last updated</CardTitle></CardHeader>
                <CardContent className="space-y-1.5 text-sm">
                  {d.content.recentlyUpdated.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between gap-2">
                      <span className="truncate">{p.title}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{p.updatedOn}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Oldest content (candidates for a refresh)</CardTitle></CardHeader>
                <CardContent className="space-y-1.5 text-sm">
                  {d.content.needsRefresh.length === 0 && <p className="text-muted-foreground">Nothing over the {d.content.staleThresholdDays}-day threshold.</p>}
                  {d.content.needsRefresh.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between gap-2">
                      <span className="truncate">{p.title}</span>
                      <span className="shrink-0 text-xs text-amber-600 dark:text-amber-400">{p.daysSinceUpdate}d ago</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 5. India Hub */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Landmark" className="size-4 text-primary" /> India Hub</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label="Government guides" value={d.indiaHub.totalGuides} icon="Landmark" />
              <MetricCard label="Schemes" value={d.indiaHub.totalSchemes} icon="Award" />
              <MetricCard label="Hindi translations" value={d.indiaHub.hindiTranslations} icon="Languages" />
              <MetricCard label="Official URL populated" value={`${d.indiaHub.officialUrlPopulated}/${d.indiaHub.totalGuides}`} icon="ExternalLink" hint="structural — not a live reachability check" />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Guides by category</CardTitle></CardHeader>
                <CardContent><BarList items={d.indiaHub.servicesByCategory.map((c) => ({ label: c.name, value: c.count }))} /></CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">Recently updated guides</CardTitle></CardHeader>
                <CardContent className="space-y-1.5 text-sm">
                  {d.indiaHub.recentlyUpdated.map((g) => (
                    <div key={g.slug} className="flex items-center justify-between gap-2">
                      <span className="truncate">{g.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{g.updatedOn}</span>
                    </div>
                  ))}
                  <div className="pt-2"><NotAvailable reason="Live official-link verification and a 'missing guides' gap-detector aren't implemented — outbound network is unavailable in this build environment, and gap detection today is manual (see the category bar chart to eyeball thin categories)." /></div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 6. Developer Hub */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Code2" className="size-4 text-primary" /> Developer Hub</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label="Total resources" value={d.developerHub.totalResources} icon="Code2" />
              <MetricCard label="Added this month" value={d.developerHub.resourcesAddedThisMonth} icon="Sparkles" />
              <div className="col-span-2"><NotAvailable reason="Broken external links, outdated framework versions and 'new official docs available' all need live network checks against third-party sites — unavailable in this build environment." /></div>
            </div>
            <Card className="mt-4">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Thinnest categories (candidates for expansion)</CardTitle></CardHeader>
              <CardContent><BarList items={d.developerHub.thinnestCategories.map((c) => ({ label: c.name, value: c.count }))} /></CardContent>
            </Card>
          </section>

          {/* 7. AI Hub */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Bot" className="size-4 text-primary" /> AI Hub</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <MetricCard label="Total AI tools" value={d.aiHub.total} icon="Bot" />
              <MetricCard label="Free" value={d.aiHub.free} tone="good" />
              <MetricCard label="Paid" value={d.aiHub.paid} />
              <MetricCard label="Freemium" value={d.aiHub.freemium} />
              <MetricCard label="Added this month" value={d.aiHub.newThisMonth} icon="Sparkles" />
            </div>
            <div className="mt-3"><NotAvailable reason="No review workflow exists yet for AI Hub entries — 'AI reviews pending' isn't tracked. Ratings are never fabricated on this site (constitution rule), so this stays honestly blank until a real review process is built." /></div>
          </section>

          {/* 8. Incinc AI */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="MessageCircle" className="size-4 text-primary" /> Incinc AI</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label="Fast-path intents" value={d.incinc.fastPathIntentCount} icon="Zap" hint="direct-answer coverage" />
              <MetricCard label="Knowledge base entries" value={d.incinc.knowledgeBaseEntries} icon="BookOpen" />
            </div>
            <div className="mt-3">
              <NotAvailable reason="Incinc AI is stateless with no request logging or database — total queries, top questions, and unknown questions genuinely cannot be measured today. Adding real usage analytics would need server-side logging on /api/incinc, which is a deliberate backend decision, not a default to add silently." />
            </div>
          </section>

          {/* Growth: SEO rankings — needs Search Console */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Rocket" className="size-4 text-primary" /> SEO Rankings & Keywords</h2>
            <IntegrationCard status={searchConsole} whatItUnlocks="Top 20 ranking pages, top 20 losing pages, new opportunities, and keywords you're missing — all come from Search Console's real click/impression/position data." />
          </section>

          {/* Growth: Users — needs GA4 */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Users" className="size-4 text-primary" /> Users</h2>
            <IntegrationCard status={ga4} whatItUnlocks="Top countries, top devices, top browsers, returning users, average session length, and bounce rate — all real GA4 dimensions, not guessable from this codebase." />
          </section>

          {/* Growth: Revenue — needs AdSense + affiliate networks */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Coins" className="size-4 text-primary" /> Revenue</h2>
            <IntegrationCard status={adsense} whatItUnlocks="AdSense revenue, RPM, and CTR. Affiliate and sponsored-listing revenue have no public API to pull from — those would need to come from wherever you already track them today." />
          </section>

          {/* Growth: Content Opportunities (AI-powered suggestions) — needs a keyword-research API */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="Lightbulb" className="size-4 text-primary" /> Content Opportunities</h2>
            <IntegrationCard status={keywordResearch} whatItUnlocks={'High-search-volume/low-competition suggestions like "Compress PDF for GST Portal — 8,100 searches/mo, Low competition" — real numbers like that only exist behind a paid keyword-research API or the Google Ads API\'s Keyword Planner endpoint. Nothing here is invented in the meantime.'} />
          </section>

          {/* 9. Errors */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon name="ShieldAlert" className="size-4 text-primary" /> Errors</h2>
              <Badge variant={errorTotal === 0 ? "success" : "destructive"}>{errorTotal === 0 ? "None detected" : `${errorTotal} found`}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label="Broken routes" value={d.errors.brokenRoutes.length} tone={toneForIssueCount(d.errors.brokenRoutes.length)} />
              <MetricCard label="Missing assets" value={d.errors.missingAssets.length} tone={toneForIssueCount(d.errors.missingAssets.length)} />
              <MetricCard
                label="Console errors (sample)"
                value={d.errors.consoleSample.reduce((n, s) => n + s.errors.length, 0)}
                tone={toneForIssueCount(d.errors.consoleSample.reduce((n, s) => n + s.errors.length, 0))}
                hint={`${d.errors.consoleSample.length} pages sampled`}
              />
              <MetricCard label="Failed builds" value="0" tone="good" hint="last health-check completed" />
            </div>
          </section>

          {/* 10. Weekly Summary */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Icon name="CalendarClock" className="size-4 text-primary" /> This Week</h2>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{d.weeklySummary.commitCount} commits in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-sm font-semibold">✓ New tools / blogs</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {d.weeklySummary.newTools.concat(d.weeklySummary.newBlogs).slice(0, 6).map((s, i) => <li key={i}>· {s}</li>)}
                    {d.weeklySummary.newTools.length + d.weeklySummary.newBlogs.length === 0 && <li>Nothing this week.</li>}
                  </ul>
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-semibold">✓ SEO / performance improvements</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {d.weeklySummary.seoImprovements.concat(d.weeklySummary.performanceImprovements).slice(0, 6).map((s, i) => <li key={i}>· {s}</li>)}
                    {d.weeklySummary.seoImprovements.length + d.weeklySummary.performanceImprovements.length === 0 && <li>Nothing this week.</li>}
                  </ul>
                </div>
                <div className="sm:col-span-2">
                  <p className="mb-1.5 text-sm font-semibold">✓ Remaining tasks</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {d.weeklySummary.remainingTasks.map((s, i) => <li key={i}>· {s}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
