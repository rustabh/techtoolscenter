import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ad-slot";
import { ToolRenderer } from "@/components/tools/registry";
import { TrackRecent } from "@/components/tools/track-recent";
import { ToolSeoContent } from "@/components/seo/tool-seo-content";
import { getTool, getCategoryMeta, tools } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { toolSchemas } from "@/lib/seo/schema";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

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
