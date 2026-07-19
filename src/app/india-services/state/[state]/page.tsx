import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Building2, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { PremiumAd } from "@/components/ads/premium-ad";
import { indiaStates, getIndiaState, STATE_SERVICE_SLUGS } from "@/lib/india/states";
import { getIndiaService } from "@/lib/india/services";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return indiaStates.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const st = getIndiaState(state);
  if (!st) return {};
  const title = `${st.name} Government Services — Certificates & ${st.portalName} | ${siteConfig.name}`;
  const description = `How to apply for income, caste, domicile, EWS, birth, death, marriage certificates, ration card and more in ${st.name} through ${st.portalName}. Documents, steps, fees and the official portal link.`;
  return {
    title,
    description,
    alternates: { canonical: `/india-services/state/${st.slug}` },
    openGraph: { title, description, url: `/india-services/state/${st.slug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const st = getIndiaState(state);
  if (!st) notFound();

  const services = STATE_SERVICE_SLUGS.map(getIndiaService).filter((s): s is NonNullable<typeof s> => !!s);
  const otherStates = indiaStates.filter((s) => s.slug !== st.slug).slice(0, 8);

  const faq = [
    {
      question: `How do I apply for a certificate in ${st.name}?`,
      answer: `In ${st.name}, most certificates (income, caste, domicile, EWS, birth, death, marriage) are applied through ${st.portalName} or a nearby common service centre. Register on the portal, choose the service, upload your documents and submit for verification by the local Revenue/Registrar authority.`,
    },
    {
      question: `Which portal issues certificates in ${st.name}?`,
      answer: `${st.name} uses ${st.portalName} (${st.portalUrl}). Always apply on the official state portal and avoid third-party sites that charge extra for the same service.`,
    },
    {
      question: `How do I get a domicile / caste / income certificate in ${st.name}?`,
      answer: `Open ${st.portalName}, select the specific certificate, fill the application, upload identity, address and supporting proofs, and submit. After verification by the Tehsildar/Revenue office you can download the digitally-signed certificate.`,
    },
  ];

  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: st.name, url: `/india-services/state/${st.slug}` },
  ]);
  const faqLd = faqPageFromItemsLd(faq);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: st.name }]} />

      {/* Hero */}
      <header className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🇮🇳 {st.name}</span>
        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {st.name} Government Services & Certificates
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A simple guide to applying for common certificates and documents in {st.name} — income, caste, domicile,
          EWS, birth, death and marriage certificates, ration card and more. {st.note}
        </p>
      </header>

      {/* Official portal card */}
      <a
        href={st.portalUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 transition-colors hover:border-primary/60"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="size-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-muted-foreground">Official state portal</span>
          <span className="block truncate font-semibold">{st.portalName}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Visit portal <ExternalLink className="size-4" />
        </span>
      </a>

      <div className="mt-6"><IndiaDisclaimer /></div>

      {/* State-issued services */}
      <section className="mt-12">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Certificates & documents in {st.name}</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Tap any service for the full guide — documents, eligibility, step-by-step process, fees and FAQs. The application is completed on {st.portalName}.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/india-services/${s.category}/${s.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold group-hover:text-primary">{s.name} in {st.name}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{s.overview}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  View guide <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{st.name} — frequently asked questions</h2>
        <div className="space-y-4">
          {faq.map((f) => (
            <div key={f.question} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other states */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Other states</h2>
        <div className="flex flex-wrap gap-2">
          {otherStates.map((s) => (
            <Link
              key={s.slug}
              href={`/india-services/state/${s.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              {s.name} <ArrowUpRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
