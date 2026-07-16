import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ad-slot";
import { ToolRenderer } from "@/components/tools/registry";
import { getTool, getCategoryMeta, tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `/tools/${tool.slug}`;
  return {
    title: `${tool.name} — Free Online ${tool.name}`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${tool.name} | ${siteConfig.name}`,
      description: tool.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | ${siteConfig.name}`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const cat = getCategoryMeta(tool.category);
  const related = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: `${siteConfig.url}/tools/${tool.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="container-tight py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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

      <section className="mt-10" aria-label={`${tool.name} tool`}>
        <ToolRenderer slug={tool.slug} />
      </section>

      <div className="my-12">
        <AdSlot />
      </div>

      <section className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <Accordion items={tool.faq} />
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Related tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/tools/${r.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <Icon name={r.icon} className="size-5 text-primary" />
                  <span className="text-sm font-medium">{r.name}</span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
