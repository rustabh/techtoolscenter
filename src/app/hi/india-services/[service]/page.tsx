import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, FileText, ListChecks, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { PremiumAd } from "@/components/ads/premium-ad";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { TrustStrip } from "@/components/india/trust-strip";
import { LangToggle } from "@/components/india/lang-toggle";
import { hindiServices, getHindiService } from "@/lib/india/hindi";
import { getIndiaService } from "@/lib/india/services";
import { getTool } from "@/lib/tools";
import { getLanding } from "@/lib/landing/landing";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return hindiServices.map((h) => ({ service: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const h = getHindiService(service);
  const en = getIndiaService(service);
  if (!h || !en) return {};
  return {
    title: `${h.seoTitle} | ${siteConfig.name}`,
    description: h.seoDescription,
    alternates: {
      canonical: `/hi/india-services/${h.slug}`,
      languages: {
        "en-IN": `/india-services/${en.category}/${en.slug}`,
        "hi-IN": `/hi/india-services/${h.slug}`,
      },
    },
    openGraph: { title: h.seoTitle, description: h.seoDescription, url: `/hi/india-services/${h.slug}`, locale: "hi_IN" },
  };
}

function resolveTool(slug: string) {
  const t = getTool(slug);
  if (t) return { slug: t.slug, name: t.name };
  const l = getLanding(slug);
  if (l) return { slug: l.slug, name: l.h1 };
  return null;
}

export default async function HindiServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const h = getHindiService(service);
  const en = getIndiaService(service);
  if (!h || !en) notFound();

  const enHref = `/india-services/${en.category}/${en.slug}`;
  const tools = (en.relatedTools ?? []).map(resolveTool).filter(Boolean).slice(0, 4) as { slug: string; name: string }[];

  const crumb = breadcrumbLd([
    { name: "होम", url: "/" },
    { name: "इंडिया सेवाएं", url: "/hi/india-services" },
    { name: h.name, url: `/hi/india-services/${h.slug}` },
  ]);
  const faqLd = faqPageFromItemsLd(h.faq);

  return (
    <div className="container-tight py-12" lang="hi">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "इंडिया सेवाएं", href: "/hi/india-services" }, { label: h.name }]} />

      <div className="mt-6"><LangToggle current="hi" enHref={enHref} hiHref={`/hi/india-services/${h.slug}`} /></div>

      <header className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🇮🇳 इंडिया सेवाएं</span>
        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{h.name} कैसे बनवाएं</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{h.overview}</p>
      </header>

      {/* Official website card */}
      <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <p className="text-sm text-muted-foreground">आधिकारिक वेबसाइट</p>
        <p className="mt-1 font-semibold">{en.officialName}</p>
        <p className="mt-0.5 break-all text-sm text-primary">{en.officialUrl}</p>
        <a href={en.officialUrl} target="_blank" rel="noopener noreferrer nofollow"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          आधिकारिक सरकारी वेबसाइट पर जारी रखें → <ExternalLink className="size-4" />
        </a>
      </div>

      <TrustStrip className="mt-6" updatedOn={en.updatedOn} sourceName={en.officialName} sourceUrl={en.officialUrl} />

      <div className="mt-6"><IndiaDisclaimer /></div>

      {/* Documents */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight"><FileText className="size-5 text-primary" /> ज़रूरी दस्तावेज़</h2>
        <div className="flex flex-wrap gap-2">
          {h.documents.map((d) => (
            <span key={d} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">{d}</span>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight"><ListChecks className="size-5 text-primary" /> पात्रता</h2>
        <ul className="space-y-2">
          {h.eligibility.map((e) => (
            <li key={e} className="flex items-start gap-2 text-sm"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" /> {e}</li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold tracking-tight">प्रक्रिया — स्टेप बाय स्टेप</h2>
        <ol className="space-y-3">
          {h.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">{i + 1}</span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">अक्सर पूछे जाने वाले सवाल</h2>
        <Accordion items={h.faq} />
      </section>

      {/* Related tools */}
      {tools.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold tracking-tight">काम आने वाले टूल्स</h2>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer note */}
      <div className="mt-10 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
        यह एक शैक्षिक गाइड है, सरकारी वेबसाइट नहीं। आवेदन हमेशा ऊपर दी गई आधिकारिक सरकारी वेबसाइट पर ही पूरा करें।
      </div>
    </div>
  );
}
