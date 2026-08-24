import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WifiOff } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { PremiumAd } from "@/components/ads/premium-ad";
import { ToolRenderer } from "@/components/tools/registry";
import { TrackRecent } from "@/components/tools/track-recent";
import { ToolSeoContent } from "@/components/seo/tool-seo-content";
import { ToolHealth } from "@/components/seo/tool-health";
import { ToolUtilityBar } from "@/components/tools/tool-utility-bar";
import { PrivacyFirst } from "@/components/privacy-first";
import { LandingView } from "@/components/landing/landing-view";
import { getTool, getCategoryMeta, tools } from "@/lib/tools";
import { internalLinks } from "@/lib/seo/links";
import { buildToolMetadata, defaultOgImage, socialTitle } from "@/lib/seo/metadata";
import { toolSchemas } from "@/lib/seo/schema";
import { getLanding, landingPages } from "@/lib/landing/landing";
import { siteConfig } from "@/lib/site";

// Tools that need the network at runtime (so no offline badge).
const NETWORK_TOOLS = new Set(["website-mockup-generator", "brand-kit-generator", "app-screenshot-generator", "tailwind-playground"]);

// Every tool and landing-page slug is statically known at build time; an
// unmatched slug should be a real, correctly-coded 404 rather than an
// on-demand render that can race with the root loading.tsx Suspense
// boundary and report HTTP 200.
export const dynamicParams = false;

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
      openGraph: {
        type: "website",
        url: `${siteConfig.url}${path}`,
        siteName: siteConfig.name,
        title: socialTitle(landing.title),
        description: landing.description,
        images: [defaultOgImage()],
      },
      twitter: { card: "summary_large_image", title: socialTitle(landing.title), description: landing.description, images: [defaultOgImage()] },
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
  const related = internalLinks(tool, 6).related;

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
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
            <Badge variant="secondary">{cat.label}</Badge>
            {!NETWORK_TOOLS.has(tool.slug) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <WifiOff className="size-3" /> Works offline
              </span>
            )}
          </div>
          <p className="mt-1 max-w-2xl text-muted-foreground">{tool.longDescription}</p>
        </div>
        <div className="sm:ml-auto sm:self-start">
          <ToolUtilityBar slug={tool.slug} name={tool.name} />
        </div>
      </header>

      <TrackRecent slug={tool.slug} />
      <section className="mt-10" aria-label={`${tool.name} tool`}>
        <ToolRenderer slug={tool.slug} />
      </section>

      {/* Smart recommendations */}
      {related.length > 0 && (
        <div className="mt-8">
          <p className="mb-2 text-sm font-medium text-muted-foreground">You might also need</p>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <a key={r.slug} href={`/tools/${r.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary">
                <Icon name={r.icon} className="size-3.5 text-primary" /> {r.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Health panel + privacy */}
      <div className="mb-4 mt-12 grid gap-4 lg:grid-cols-2">
        <ToolHealth tool={tool} network={NETWORK_TOOLS.has(tool.slug)} />
        <PrivacyFirst />
      </div>

      {/* Ad — well below the tool & download area, before the deep content */}
      <PremiumAd />

      <ToolSeoContent tool={tool} totalTools={tools.length} />

      {/* Ad — at the very bottom, before the footer */}
      <PremiumAd variant="rectangle" />
    </div>
  );
}
