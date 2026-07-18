import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ad-slot";
import { ToolRenderer } from "@/components/tools/registry";
import { TrackRecent } from "@/components/tools/track-recent";
import { ToolSeoContent } from "@/components/seo/tool-seo-content";
import { LandingView } from "@/components/landing/landing-view";
import { getTool, getCategoryMeta, tools } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { toolSchemas } from "@/lib/seo/schema";
import { getLanding, landingPages } from "@/lib/landing/landing";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  const toolSlugs = new Set(tools.map((t) => t.slug));
  // Landing slugs that don't collide with a real tool.
  const landing = landingPages.filter((l) => !toolSlugs.has(l.slug)).map((l) => ({ slug: l.slug }));
  return [...tools.map((t) => ({ slug: t.slug })), ...landing];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (tool) return buildToolMetadata(tool);
  const landing = getLanding(slug);
  if (landing) {
    const path = `/tools/${landing.slug}`;
    return {
      title: landing.title,
      description: landing.description,
      keywords: landing.tags,
      alternates: { canonical: path },
      openGraph: { type: "website", url: `${siteConfig.url}${path}`, siteName: siteConfig.name, title: landing.title, description: landing.description },
      twitter: { card: "summary_large_image", title: landing.title, description: landing.description },
    };
  }
  return {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) {
    // Not a core tool — try the SEO landing page engine (reuses a core tool).
    const landing = getLanding(slug);
    if (landing) return <LandingView page={landing} />;
    notFound();
  }

  const cat = getCategoryMeta(tool.category);
  const schemas = toolSchemas(tool);

  return (
    <div className="container-tight py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: cat.label, href: `/category/${tool.category.toLowerCase()}` },
          { label: tool.name },
        ]}
      />

      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name={tool.icon} className="size-7" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
            <Badge variant="secondary">{cat.label}</Badge>
          </div>
          <p className="mt-1 max-w-2xl text-muted-foreground">{tool.longDescription}</p>
        </div>
      </header>

      <TrackRecent slug={tool.slug} />
      <section className="mt-10" aria-label={`${tool.name} tool`}>
        <ToolRenderer slug={tool.slug} />
      </section>

      <div className="my-12">
        <AdSlot />
      </div>

      <ToolSeoContent tool={tool} totalTools={tools.length} />
    </div>
  );
}
