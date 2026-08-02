import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, ArrowUpRight, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { PremiumAd } from "@/components/ads/premium-ad";
import { indiaCities, getIndiaCity, CITY_SERVICE_SLUGS } from "@/lib/india/cities";
import { getIndiaState } from "@/lib/india/states";
import { getIndiaService } from "@/lib/india/services";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { defaultOgImage, socialTitle } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return indiaCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getIndiaCity(city);
  if (!c) return {};
  const title = `${c.name} Government Services — Passport, RTO, Certificates`;
  const description = `How to apply for a passport, driving licence, RC, birth, death & marriage certificates, ration card and more in ${c.name}, ${c.stateName}. Documents, steps and official links.`;
  return {
    title,
    description,
    alternates: { canonical: `/india-services/city/${c.slug}` },
    openGraph: { title: socialTitle(title), description, url: `/india-services/city/${c.slug}`, images: [defaultOgImage()] },
    twitter: { card: "summary_large_image", title: socialTitle(title), description, images: [defaultOgImage()] },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getIndiaCity(city);
  if (!c) notFound();

  const state = getIndiaState(c.state);
  const services = CITY_SERVICE_SLUGS.map(getIndiaService).filter((s): s is NonNullable<typeof s> => !!s);
  const otherCities = indiaCities.filter((x) => x.slug !== c.slug).slice(0, 10);

  const faq = [
    {
      question: `How do I apply for a passport in ${c.name}?`,
      answer: `Apply online on the Passport Seva portal, pay the fee and book an appointment at a Passport Seva Kendra (PSK) in ${c.name}. Carry your original documents for verification on the appointment day.`,
    },
    {
      question: `Where do I get a birth or death certificate in ${c.name}?`,
      answer: `In ${c.name}, birth and death certificates are issued by the local Municipal Corporation and the state's Civil Registration System. ${c.note ?? ""}`,
    },
    {
      question: `How do I get an RTO service (driving licence / RC) in ${c.name}?`,
      answer: `Driving licence and vehicle RC services for ${c.name} are handled online via the Parivahan (Sarathi/VAHAN) portal for ${c.stateName}, with tests and verification at the local RTO.`,
    },
  ];

  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: c.name, url: `/india-services/city/${c.slug}` },
  ]);
  const faqLd = faqPageFromItemsLd(faq);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: c.name }]} />

      <header className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">
          <MapPin className="size-3.5" /> {c.name}, {c.stateName}
        </span>
        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Government Services in {c.name}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A simple guide to the government services people apply for in {c.name} — passport, driving licence, vehicle RC,
          birth, death and marriage certificates, ration card and more. {c.note}
        </p>
      </header>

      {state && (
        <Link
          href={`/india-services/state/${state.slug}`}
          className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 transition-colors hover:border-primary/60"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm text-muted-foreground">State portal for {c.name}</span>
            <span className="block truncate font-semibold">{state.portalName}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
            {c.stateName} services <ArrowRight className="size-4" />
          </span>
        </Link>
      )}

      <div className="mt-6"><IndiaDisclaimer /></div>

      <section className="mt-12">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Services people apply for in {c.name}</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Tap any service for the full step-by-step guide, documents, fees and official links.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/india-services/${s.category}/${s.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold group-hover:text-primary">{s.name} in {c.name}</h3>
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

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{c.name} — frequently asked questions</h2>
        <div className="space-y-4">
          {faq.map((f) => (
            <div key={f.question} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Other cities</h2>
        <div className="flex flex-wrap gap-2">
          {otherCities.map((x) => (
            <Link
              key={x.slug}
              href={`/india-services/city/${x.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              {x.name} <ArrowUpRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
