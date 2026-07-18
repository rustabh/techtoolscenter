import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ad-slot";
import { ToolRenderer } from "@/components/tools/registry";
import { TrackRecent } from "@/components/tools/track-recent";
import { getTool, getCategoryMeta, tools } from "@/lib/tools";
import { collectionOf, collectionForTool } from "@/lib/collections";
import { toolHowTo, toolBenefits, toolFaqs, toolFeatures, toolIntro } from "@/lib/tool-content";
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
  const col = collectionForTool(tool);
  const related = tools
    .filter((t) => collectionOf(t) === col.slug && t.slug !== tool.slug)
    .slice(0, 3);

  const howToSteps = toolHowTo(tool);
  const benefits = toolBenefits(tool);
  const features = toolFeatures(tool);
  const faqs = toolFaqs(tool);
  const intro = toolIntro(tool);

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
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.name}`,
    description: tool.description,
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <div className="container-tight py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

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

      <section className="mx-auto max-w-3xl space-y-12">
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">About the {tool.name}</h2>
          <p className="leading-relaxed text-muted-foreground">{tool.longDescription}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The {tool.name} is part of {siteConfig.name} — a free, privacy-first collection of {tools.length}+ online
            tools. Like every tool here, it runs 100% in your browser, so your data stays private and results are
            instant. There is no sign-up, no watermark and no limit on how many times you can use it.
          </p>
        </div>

        {features.length > 0 && (
          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Key features</h2>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span key={f} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">{f}</span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">How to use the {tool.name}</h2>
          <ol className="space-y-4">
            {howToSteps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Why use our {tool.name}?</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <Accordion items={faqs} />
        </div>
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
