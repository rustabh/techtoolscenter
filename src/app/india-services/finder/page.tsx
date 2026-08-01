import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceFinder } from "@/components/india/service-finder";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { PremiumAd } from "@/components/ads/premium-ad";
import { finderGoals } from "@/lib/india/finder";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Which Document or Certificate Do I Need? — India Finder",
  description: "Not sure which government document or certificate you need? Pick your goal — passport, college admission, government job, marriage, welfare scheme, business, vehicle — and get the exact India Services to apply for, with step-by-step guides.",
  alternates: { canonical: "/india-services/finder" },
};

export default function FinderPage() {
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: "Document Finder", url: "/india-services/finder" },
  ]);
  const faq = [
    { question: "How do I know which certificate I need?", answer: "Choose your real-life goal — such as a passport, college admission, a government job or a welfare scheme — and the finder lists the exact documents and certificates commonly required, each with a full guide and the official government link." },
    { question: "Is this an official government service?", answer: "No. This is a free educational directory that helps you find the right services and links you to the official government websites. We do not collect applications or take payments." },
  ];
  const faqLd = faqPageFromItemsLd(faq);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: "Document Finder" }]} />

      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🧭 Document Finder</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Which Document or Certificate Do You Need?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Tell us what you&apos;re trying to do and we&apos;ll show you the exact government documents to apply for — with step-by-step guides and official links.
        </p>
      </header>

      <div className="mt-10 rounded-3xl border border-border bg-secondary/30 p-5 sm:p-7">
        <ServiceFinder />
      </div>

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {/* SEO: crawlable list of all goals */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Common goals</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {finderGoals.map((g) => (
            <Link
              key={g.slug}
              href="/india-services/finder"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-lg">{g.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium group-hover:text-primary">{g.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{g.serviceSlugs.length} documents</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-14"><IndiaDisclaimer /></div>
    </div>
  );
}
