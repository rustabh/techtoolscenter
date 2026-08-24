import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { indiaCategories, getIndiaCategory } from "@/lib/india/categories";
import { servicesByCategory } from "@/lib/india/services";
import { breadcrumbLd } from "@/lib/seo/schema";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

// Every category is statically known at build time; an unmatched slug should
// be a real, correctly-coded 404 rather than an on-demand render that can
// race with the root loading.tsx Suspense boundary and report HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return indiaCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getIndiaCategory(category);
  if (!cat) return {};
  const count = servicesByCategory(category).length;
  return buildSimpleMetadata({
    title: `${cat.name} — Indian Government Services Guide`,
    description: `${cat.description} Official websites, required documents, steps and FAQs for ${count} services. Educational directory — not a government website.`,
    canonical: `/india-services/${cat.slug}`,
  });
}

export default async function IndiaCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getIndiaCategory(category);
  if (!cat) notFound();
  const services = servicesByCategory(category);

  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: cat.name, url: `/india-services/${cat.slug}` },
  ]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: cat.name }]} />

      <header className="mt-6 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name={cat.icon} className="size-7" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{cat.name}</h1>
          <p className="mt-1 text-muted-foreground">{cat.description}</p>
        </div>
      </header>

      {services.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/india-services/${cat.slug}/${s.slug}`}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold group-hover:text-primary">{s.name}</h2>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.overview}</p>
              <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><ExternalLink className="size-3" /> {s.officialName}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">More services in this category are coming soon.</p>
      )}

      {/* Other categories */}
      <section className="mt-14">
        <h2 className="mb-5 text-xl font-bold tracking-tight">Other categories</h2>
        <div className="flex flex-wrap gap-2">
          {indiaCategories.filter((c) => c.slug !== cat.slug).map((c) => (
            <Link key={c.slug} href={`/india-services/${c.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary">
              <Icon name={c.icon} className="size-3.5 text-primary" /> {c.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-14"><IndiaDisclaimer /></div>
    </div>
  );
}
