import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AiCompareTool } from "@/components/aihub/ai-compare-tool";
import { aiTools } from "@/lib/aihub/tools";
import { breadcrumbLd } from "@/lib/seo/schema";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "AI Tool Comparison — Compare ChatGPT, Claude, Gemini & More",
  description:
    "Compare any AI tools side by side — pricing, developer, category, API availability, platforms and tags. Pick from 250+ real AI tools, no fabricated ratings.",
  ogDescription: "Compare any two or three AI tools side by side — real pricing, features and platforms.",
  canonical: "/ai-hub/compare",
});

export default async function AiComparePage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string; c?: string }>;
}) {
  const { a, b, c } = await searchParams;
  const initialSlugs = [a, b, c].filter((s): s is string => !!s);
  const defaultSlugs = initialSlugs.length ? initialSlugs : ["chatgpt", "claude", "gemini"];
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "AI Hub", url: "/ai-hub" },
    { name: "Compare", url: "/ai-hub/compare" },
  ]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: "Compare" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Compare AI Tools</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick any two or three AI tools from our directory of 250+ and see them side by side — real pricing,
          developer, API availability, platforms and tags. No fabricated ratings, ever.
        </p>
      </header>

      <div className="mt-10">
        <AiCompareTool tools={aiTools} initialSlugs={defaultSlugs} />
      </div>
    </div>
  );
}
