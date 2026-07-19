import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowRight, CheckCircle2, Gift, FileText, ListChecks } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { TrustStrip } from "@/components/india/trust-strip";
import { PremiumAd } from "@/components/ads/premium-ad";
import { schemes, getScheme, relatedSchemesOf, getSchemeAudience } from "@/lib/india/schemes";
import { getIndiaService } from "@/lib/india/services";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return schemes.map((s) => ({ scheme: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ scheme: string }> }): Promise<Metadata> {
  const { scheme } = await params;
  const s = getScheme(scheme);
  if (!s) return {};
  const title = `${s.name} — Benefits, Eligibility & How to Apply | ${siteConfig.name}`;
  const description = `${s.tagline} ${s.overview.slice(0, 110)}`.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/india-services/schemes/${s.slug}` },
    openGraph: { title, description, url: `/india-services/schemes/${s.slug}` },
  };
}

export default async function SchemePage({ params }: { params: Promise<{ scheme: string }> }) {
  const { scheme } = await params;
  const s = getScheme(scheme);
  if (!s) notFound();

  const related = relatedSchemesOf(s);
  const service = s.relatedService ? getIndiaService(s.relatedService) : undefined;

  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: "Government Schemes", url: "/india-services/schemes" },
    { name: s.name, url: `/india-services/schemes/${s.slug}` },
  ]);
  const faqLd = faqPageFromItemsLd(s.faq);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[
        { label: "India Services", href: "/india-services" },
        { label: "Schemes", href: "/india-services/schemes" },
        { label: s.name },
      ]} />

      <header className="mt-8">
        <div className="flex flex-wrap gap-2">
          {s.audiences.map((a) => {
            const aud = getSchemeAudience(a);
            return aud ? (
              <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <span>{aud.icon}</span> {aud.label}
              </span>
            ) : null;
          })}
        </div>
        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{s.name}</h1>
        {s.fullName && <p className="mt-1 text-sm text-muted-foreground">{s.fullName}</p>}
        <p className="mt-4 max-w-2xl text-muted-foreground">{s.overview}</p>
      </header>

      {/* Official portal CTA */}
      <a
        href={s.officialUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 transition-colors hover:border-primary/60"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-muted-foreground">Official portal · {s.ministry}</span>
          <span className="block truncate font-semibold">{s.officialUrl.replace(/^https?:\/\//, "")}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Visit official site <ExternalLink className="size-4" />
        </span>
      </a>

      <TrustStrip className="mt-6" updatedOn={s.updatedOn} sourceName={s.ministry} sourceUrl={s.officialUrl} />

      <div className="mt-6"><IndiaDisclaimer /></div>

      {/* Benefits */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight"><Gift className="size-5 text-primary" /> Benefits</h2>
        <ul className="space-y-2">
          {s.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {b}</li>
          ))}
        </ul>
      </section>

      {/* Eligibility */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight"><ListChecks className="size-5 text-primary" /> Eligibility</h2>
        <ul className="space-y-2">
          {s.eligibility.map((e) => (
            <li key={e} className="flex items-start gap-2 text-sm"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" /> {e}</li>
          ))}
        </ul>
      </section>

      {/* Documents */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight"><FileText className="size-5 text-primary" /> Documents needed</h2>
        <div className="flex flex-wrap gap-2">
          {s.documents.map((d) => (
            <span key={d} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">{d}</span>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold tracking-tight">How to apply</h2>
        <ol className="space-y-3">
          {s.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">{i + 1}</span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {service && (
        <Link href={`/india-services/${service.category}/${service.slug}`} className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-muted-foreground">Detailed step-by-step guide</span>
            <span className="block font-medium">{service.name} — full guide</span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-primary" />
        </Link>
      )}

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="space-y-4">
          {s.faq.map((f) => (
            <div key={f.question} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related schemes */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Related schemes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/india-services/schemes/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <h3 className="font-semibold group-hover:text-primary">{r.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
