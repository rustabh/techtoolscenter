import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnalyticsDashboard } from "@/components/stats/analytics-dashboard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Analytics Dashboard | ${siteConfig.name}`,
  description: "Your real activity analytics on TechToolsCenter — daily activity, top tools and growth, tracked privately in your browser.",
  alternates: { canonical: "/stats" },
  robots: { index: false, follow: true },
};

export default function StatsPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Analytics" }]} />
      <header className="mt-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics dashboard</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A live view of your real activity on TechToolsCenter — every number is an action you actually performed,
          tracked privately in your browser. No fake data, no analytics server.
        </p>
      </header>
      <AnalyticsDashboard />
    </div>
  );
}
