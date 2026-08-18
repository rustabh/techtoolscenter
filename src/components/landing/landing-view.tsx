import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { PremiumAd } from "@/components/ads/premium-ad";
import { ToolRenderer } from "@/components/tools/registry";
import { getTool, getCategoryMeta } from "@/lib/tools";
import { collectionForTool } from "@/lib/collections";
import { getPost } from "@/lib/blog/posts";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { relatedLandingsForCore, type LandingPage } from "@/lib/landing/landing";
import { siteConfig } from "@/lib/site";

export function LandingView({ page }: { page: LandingPage }) {
  const core = getTool(page.core);
  const cat = core ? getCategoryMeta(core.category) : null;
  const col = core ? collectionForTool(core) : null;
  const siblings = relatedLandingsForCore(page.core, page.slug);
  const relatedTools = page.relatedTools.map(getTool).filter(Boolean);
  const relatedBlog = (page.relatedBlog ?? []).map(getPost).filter(Boolean);

  const url = `${siteConfig.url}/tools/${page.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: page.h1,
      url,
      description: page.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web-based)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${page.h1}`,
      description: page.description,
      step: page.howTo.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    },
    faqPageFromItemsLd(page.faq),
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Tools", url: "/tools" },
      ...(col ? [{ name: col.name, url: `/collections/${col.slug}` }] : []),
      { name: page.h1, url: `/tools/${page.slug}` },
    ]),
  ];

  return (
    <div className="container-tight py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          ...(cat ? [{ label: cat.label, href: `/category/${core!.category.toLowerCase()}` }] : []),
          { label: page.h1 },
        ]}
      />

      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {core && (
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name={core.icon} className="size-7" />
          </span>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{page.h1}</h1>
            {cat && <Badge variant="secondary">{cat.label}</Badge>}
          </div>
          <p className="mt-1 max-w-2xl text-muted-foreground">{page.intro}</p>
        </div>
      </header>

      {/* The SAME core tool, pre-configured with this landing page's preset */}
      <section className="mt-10" aria-label={page.h1}>
        <ToolRenderer slug={page.core} preset={page.preset} />
      </section>

      <section className="mx-auto max-w-3xl space-y-12">
        {/* Benefits */}
        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Why use the {page.h1}?</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How to */}
        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">How to use it</h2>
          <ol className="space-y-4">
            {page.howTo.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{s}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Examples */}
        {page.examples.length > 0 && (
          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Example</h2>
            <div className="space-y-3">
              {page.examples.map((ex, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="mb-2 font-semibold">{ex.title}</h3>
                  <div className="grid gap-3 sm:grid-cols-2 text-sm">
                    <div><p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Input</p><p className="rounded-lg bg-secondary/50 p-3 text-xs">{ex.input}</p></div>
                    <div><p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Output</p><p className="rounded-lg bg-secondary/50 p-3 text-xs">{ex.output}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ad — before the FAQ, well away from the tool & download */}
        <PremiumAd className="!px-0" />

        {/* FAQ */}
        <div>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <Accordion items={page.faq} />
        </div>

        {/* Core + collection links */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
          <h2 className="text-lg font-bold tracking-tight">Full tool & more</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {core && <Link href={`/tools/${core.slug}`} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open the full {core.name} →</Link>}
            {col && <Link href={`/collections/${col.slug}`} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Browse {col.name} →</Link>}
          </div>
        </div>
      </section>

      {/* Related landing pages (same core) */}
      {siblings.length > 0 && (
        <LinkRow title="Related pages" links={siblings.map((s) => ({ href: `/tools/${s.slug}`, label: s.h1, icon: core?.icon ?? "Sparkles" }))} />
      )}
      {/* Related tools */}
      {relatedTools.length > 0 && (
        <LinkRow title="Related tools" links={relatedTools.map((t) => ({ href: `/tools/${t!.slug}`, label: t!.name, icon: t!.icon }))} />
      )}
      {/* Related blog */}
      {relatedBlog.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Related reading</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedBlog.map((p) => p && (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <h3 className="font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ad — at the very bottom, before the footer */}
      <PremiumAd variant="rectangle" />
    </div>
  );
}

function LinkRow({ title, links }: { title: string; links: { href: string; label: string; icon: string }[] }) {
  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <span className="flex items-center gap-3">
              <Icon name={l.icon} className="size-5 text-primary" />
              <span className="text-sm font-medium">{l.label}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
