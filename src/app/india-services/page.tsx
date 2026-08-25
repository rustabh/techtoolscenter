import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { IndiaSearch } from "@/components/india/india-search";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { indiaCategories } from "@/lib/india/categories";
import { indiaServices, popularIndiaServices, servicesByCategory, getIndiaService } from "@/lib/india/services";
import { indiaStates } from "@/lib/india/states";
import { indiaCities } from "@/lib/india/cities";
import { allPosts } from "@/lib/blog/posts";
import { updatesByCategory } from "@/lib/updates";
import { breadcrumbLd } from "@/lib/seo/schema";

// Popular searches shown as quick chips (deep-linked to the guide).
const POPULAR_SEARCHES: { label: string; slug: string }[] = [
  { label: "Passport", slug: "passport" },
  { label: "Lost Aadhaar", slug: "aadhaar-card" },
  { label: "Instant e-PAN", slug: "pan-card" },
  { label: "PAN–Aadhaar link", slug: "pan-aadhaar-link" },
  { label: "GST registration", slug: "gst-registration" },
  { label: "Driving licence", slug: "driving-licence" },
  { label: "Marriage certificate", slug: "marriage-certificate" },
  { label: "New ration card", slug: "ration-card" },
  { label: "Check e-challan", slug: "e-challan" },
  { label: "CIBIL score", slug: "cibil-score" },
];

// Curated "trending" set (high-interest, distinct from the popular flag).
const TRENDING_SLUGS = ["pan-aadhaar-link", "e-challan", "cibil-score", "marriage-certificate", "ration-card", "fastag", "sukanya-samriddhi-yojana", "pm-kisan"];

export const metadata: Metadata = {
  title: "India Services — Official Government Services Guide",
  description: "Find official Indian government services in one place — Aadhaar, PAN, Passport, Driving Licence, GST, EPFO, DigiLocker and more. Guides, required documents, steps, FAQs and official website links. Educational directory, not a government site.",
  alternates: { canonical: "/india-services" },
};

export default function IndiaServicesPage() {
  const popular = popularIndiaServices();
  const trending = TRENDING_SLUGS.map(getIndiaService).filter((s): s is NonNullable<typeof s> => !!s);
  const recentlyUpdated = [...indiaServices]
    .sort((a, b) => (b.updatedOn ?? "").localeCompare(a.updatedOn ?? ""))
    .slice(0, 6);
  const popularGuides = allPosts()
    .filter((p) => (p.tags ?? []).includes("india services"))
    .slice(0, 4);
  const governmentUpdates = updatesByCategory("government").slice(0, 4);
  const crumb = breadcrumbLd([{ name: "Home", url: "/" }, { name: "India Services", url: "/india-services" }]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "India Services" }]} />

      {/* Hero */}
      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🇮🇳 India Services</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Find Official Indian Government Services in One Place
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Access trusted guides, official government websites, required documents, application steps, FAQs and useful
          tools — all in one organized place.
        </p>
      </header>

      <div className="mt-8"><IndiaSearch /></div>

      {/* Popular searches */}
      <div className="mt-5">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">Popular searches</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {POPULAR_SEARCHES.map((s) => {
            const svc = getIndiaService(s.slug);
            if (!svc) return null;
            return (
              <Link key={s.slug} href={`/india-services/${svc.category}/${svc.slug}`}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-primary/40 hover:text-primary">
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/india-services/finder"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60">
          🧭 Document Finder <ArrowRight className="size-4" />
        </Link>
        <Link href="/india-services/schemes"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60">
          🏆 Government Schemes List <ArrowRight className="size-4" />
        </Link>
        <Link href="/india-services/status"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60">
          🔎 Check Status <ArrowRight className="size-4" />
        </Link>
        <Link href="/india-services/my-documents"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60">
          📁 My Documents <ArrowRight className="size-4" />
        </Link>
        <Link href="/india-services/official-websites"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60">
          🔗 Official Websites Directory <ArrowRight className="size-4" />
        </Link>
        <Link href="/hi/india-services"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/60">
          🇮🇳 हिंदी में देखें <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Categories */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {indiaCategories.map((c) => (
            <Link key={c.slug} href={`/india-services/${c.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold group-hover:text-primary">{c.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-1 inline-block text-xs font-medium text-primary">{servicesByCategory(c.slug).length} services →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular services */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Popular services</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((s) => (
            <Link key={s.slug} href={`/india-services/${s.category}/${s.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <span>
                <span className="block text-sm font-medium">{s.name}</span>
                <span className="block text-xs text-muted-foreground">{s.officialName}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{indiaServices.length} services across {indiaCategories.length} categories — and growing.</p>
      </section>

      {/* Trending services */}
      <section className="mt-16">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">🔥 Trending now</h2>
        <p className="mb-6 text-sm text-muted-foreground">What people are checking most right now.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((s) => (
            <Link key={s.slug} href={`/india-services/${s.category}/${s.slug}`}
              className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <span className="block text-sm font-medium group-hover:text-primary">{s.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{s.officialName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently updated */}
      <section className="mt-16">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Recently updated</h2>
        <p className="mb-6 text-sm text-muted-foreground">Guides we&apos;ve reviewed and refreshed most recently.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyUpdated.map((s) => (
            <Link key={s.slug} href={`/india-services/${s.category}/${s.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <span>
                <span className="block text-sm font-medium group-hover:text-primary">{s.name}</span>
                {s.updatedOn && (
                  <span className="block text-xs text-muted-foreground">
                    Updated {new Date(s.updatedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                )}
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by state */}
      <section className="mt-16">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Browse by state</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          State certificates (income, caste, domicile, EWS, birth, marriage, ration card) with the official e-District portal for your state.
        </p>
        <div className="flex flex-wrap gap-2">
          {indiaStates.map((s) => (
            <Link key={s.slug} href={`/india-services/state/${s.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
              {s.name} <ArrowRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by city */}
      <section className="mt-16">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Browse by city</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Local guides for passport (PSK), RTO, and municipal certificates in India&apos;s major cities.
        </p>
        <div className="flex flex-wrap gap-2">
          {indiaCities.map((c) => (
            <Link key={c.slug} href={`/india-services/city/${c.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
              {c.name} <ArrowRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Popular guides */}
      {popularGuides.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-1 text-2xl font-bold tracking-tight">Popular guides</h2>
          <p className="mb-6 text-sm text-muted-foreground">Step-by-step reads for the most common India services.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {popularGuides.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <h3 className="font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">Read guide <ArrowRight className="size-3" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest government updates */}
      {governmentUpdates.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Latest government updates</h2>
              <p className="mt-1 text-sm text-muted-foreground">Notices worth knowing about — each links to the official source.</p>
            </div>
            <Link href="/updates/category/government"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {governmentUpdates.map((u) => (
              <Link key={u.slug} href={`/updates/${u.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name={u.icon} className="size-4 text-primary" />
                  <time dateTime={u.publishedOn}>{new Date(u.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time>
                </div>
                <h3 className="mt-2 font-semibold group-hover:text-primary">{u.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{u.summary}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">Read more <ArrowRight className="size-3" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Every guide also shows a <span className="font-medium text-foreground">&ldquo;Last updated&rdquo;</span> date, and the official
            website linked on each page is always the final authority for current details.
          </p>
        </section>
      )}

      <div className="mt-14"><IndiaDisclaimer /></div>
    </div>
  );
}
