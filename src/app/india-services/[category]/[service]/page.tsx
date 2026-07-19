import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, FileText, CheckCircle2, ListChecks, IndianRupee, Clock, AlertTriangle, ArrowRight, CalendarClock, Monitor } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/ui/accordion";
import { PremiumAd } from "@/components/ads/premium-ad";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { indiaServices, getIndiaService, relatedIndiaServices, popularIndiaServices } from "@/lib/india/services";
import { getIndiaCategory } from "@/lib/india/categories";
import { getTool } from "@/lib/tools";
import { getLanding } from "@/lib/landing/landing";
import { getPost } from "@/lib/blog/posts";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return indiaServices.map((s) => ({ category: s.category, service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const svc = getIndiaService(service);
  if (!svc) return {};
  const title = svc.seoTitle ?? `${svc.name} — Documents, Eligibility, Steps & Official Website | ${siteConfig.name}`;
  const description = svc.seoDescription ?? `${svc.name}: required documents, eligibility, step-by-step guide, fees, FAQs and the official ${svc.officialName} website. Educational guide — not a government website.`;
  return {
    title,
    description,
    keywords: svc.keywords,
    alternates: { canonical: `/india-services/${svc.category}/${svc.slug}` },
    openGraph: { type: "article", title, description, url: `${siteConfig.url}/india-services/${svc.category}/${svc.slug}` },
  };
}

function resolveTool(slug: string) {
  const t = getTool(slug);
  if (t) return { slug: t.slug, name: t.name, icon: t.icon };
  const l = getLanding(slug);
  if (l) return { slug: l.slug, name: l.h1, icon: getTool(l.core)?.icon ?? "Sparkles" };
  return null;
}

export default async function IndiaServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category, service } = await params;
  const svc = getIndiaService(service);
  if (!svc || svc.category !== category) notFound();

  const cat = getIndiaCategory(svc.category);
  const related = relatedIndiaServices(svc);
  const popular = popularIndiaServices().filter((s) => s.slug !== svc.slug).slice(0, 5);
  const tools = (svc.relatedTools ?? []).map(resolveTool).filter(Boolean);
  const blogs = (svc.relatedBlog ?? []).map(getPost).filter(Boolean);

  const url = `${siteConfig.url}/india-services/${svc.category}/${svc.slug}`;
  const schemas = [
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "India Services", url: "/india-services" },
      ...(cat ? [{ name: cat.name, url: `/india-services/${cat.slug}` }] : []),
      { name: svc.name, url: `/india-services/${svc.category}/${svc.slug}` },
    ]),
    faqPageFromItemsLd(svc.faq),
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to apply for ${svc.name}`,
      description: svc.overview,
      step: svc.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${svc.name} — Guide, Documents & Official Website`,
      description: svc.overview,
      url,
      author: { "@type": "Organization", name: siteConfig.name },
      publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: `${siteConfig.url}/favicon.svg` } },
      dateModified: svc.updatedOn ?? "2026-07-18",
    },
  ];

  return (
    <div className="container-tight py-12">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Breadcrumbs items={[
        { label: "India Services", href: "/india-services" },
        ...(cat ? [{ label: cat.name, href: `/india-services/${cat.slug}` }] : []),
        { label: svc.name },
      ]} />

      {/* Hero */}
      <header className="mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">🇮🇳 {cat?.name}</div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{svc.name}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">{svc.overview}</p>
      </header>

      {/* Official website card + big CTA */}
      <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
        <p className="text-sm text-muted-foreground">Official website</p>
        <p className="mt-1 font-semibold">{svc.officialName}</p>
        <p className="mt-0.5 break-all text-sm text-primary">{svc.officialUrl}</p>
        <a href={svc.officialUrl} target="_blank" rel="noopener noreferrer nofollow"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Continue on Official Government Website <ExternalLink className="size-4" />
        </a>
        <p className="mt-3 text-xs text-muted-foreground">You are leaving TechToolsCenter and going to the official government site. We never ask for your details.</p>
      </div>

      <div className="mt-8"><IndiaDisclaimer /></div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-10">
          {/* Documents */}
          {svc.documents.length > 0 && (
            <Section icon={<FileText className="size-5 text-primary" />} title="Required documents">
              <ul className="grid gap-2 sm:grid-cols-2">
                {svc.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /><span>{d}</span></li>
                ))}
              </ul>
            </Section>
          )}

          {/* Eligibility */}
          {svc.eligibility.length > 0 && (
            <Section icon={<ListChecks className="size-5 text-primary" />} title="Eligibility">
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {svc.eligibility.map((e) => <li key={e} className="flex items-start gap-2"><span className="text-primary">•</span> {e}</li>)}
              </ul>
            </Section>
          )}

          {/* Steps */}
          <Section icon={<ListChecks className="size-5 text-primary" />} title="Step-by-step guide">
            <ol className="space-y-4">
              {svc.steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                  <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{s}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* Quick facts: fees, processing, validity, modes */}
          {(svc.fees || svc.processingTime || svc.validity || svc.applyModes?.length) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {svc.fees && (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold"><IndianRupee className="size-4 text-primary" /> Official fees</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{svc.fees}</p>
                </div>
              )}
              {svc.processingTime && (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold"><Clock className="size-4 text-primary" /> Processing time</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{svc.processingTime}</p>
                </div>
              )}
              {svc.validity && (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold"><CalendarClock className="size-4 text-primary" /> Validity</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{svc.validity}</p>
                </div>
              )}
              {svc.applyModes?.length ? (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold"><Monitor className="size-4 text-primary" /> How to apply</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{svc.applyModes.join(" · ")}</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Official quick links + helpline */}
          {(svc.officialLinks?.length || svc.helpline) && (
            <div className="rounded-2xl border border-border bg-card p-5">
              {svc.officialLinks?.length ? (
                <>
                  <p className="mb-2 text-sm font-semibold">Official quick links</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.officialLinks.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary/40 hover:text-primary">
                        {l.label} <ExternalLink className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </>
              ) : null}
              {svc.helpline && (
                <p className={`text-sm text-muted-foreground ${svc.officialLinks?.length ? "mt-3" : ""}`}>
                  <span className="font-medium text-foreground">Helpline:</span> {svc.helpline}
                </p>
              )}
            </div>
          )}

          {/* Ad — after the core guide, before FAQ */}
          <PremiumAd className="!px-0" />

          {/* FAQ */}
          <Section title="Frequently asked questions">
            <Accordion items={svc.faq} />
          </Section>

          {/* Common mistakes */}
          {svc.mistakes.length > 0 && (
            <Section icon={<AlertTriangle className="size-5 text-amber-500" />} title="Common mistakes to avoid">
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {svc.mistakes.map((m) => <li key={m} className="flex items-start gap-2"><span className="text-amber-500">•</span> {m}</li>)}
              </ul>
            </Section>
          )}

          {/* Related tools */}
          {tools.length > 0 && (
            <Section title="Helpful TechToolsCenter tools">
              <div className="grid gap-3 sm:grid-cols-2">
                {tools.map((t) => t && (
                  <Link key={t.slug} href={`/tools/${t.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <span className="flex items-center gap-3"><Icon name={t.icon} className="size-5 text-primary" /><span className="text-sm font-medium">{t.name}</span></span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </Section>
          )}

          {/* Related blogs */}
          {blogs.length > 0 && (
            <Section title="Related reading">
              <div className="grid gap-3 sm:grid-cols-2">
                {blogs.map((p) => p && (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <h3 className="text-sm font-semibold group-hover:text-primary">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {popular.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-semibold">Popular services</p>
                <ul className="space-y-2 text-sm">
                  {popular.map((s) => (
                    <li key={s.slug}><Link href={`/india-services/${s.category}/${s.slug}`} className="text-muted-foreground hover:text-primary">{s.name}</Link></li>
                  ))}
                </ul>
              </div>
            )}
            {related.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-semibold">Related services</p>
                <ul className="space-y-2 text-sm">
                  {related.map((s) => (
                    <li key={s.slug}><Link href={`/india-services/${s.category}/${s.slug}`} className="text-muted-foreground hover:text-primary">{s.name}</Link></li>
                  ))}
                </ul>
              </div>
            )}
            <PremiumAd variant="vertical" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">{icon} {title}</h2>
      {children}
    </section>
  );
}
