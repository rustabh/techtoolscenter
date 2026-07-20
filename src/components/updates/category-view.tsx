import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { UpdateCard } from "@/components/updates/update-card";
import { PremiumAd } from "@/components/ads/premium-ad";
import { getUpdateCategory, updateCategories } from "@/lib/updates/categories";
import { updatesByCategory, estimateReadingMinutes } from "@/lib/updates";

/** Shared category hub — used by /updates/<category> and /updates/category/<slug>. */
export function CategoryView({ slug }: { slug: string }) {
  const cat = getUpdateCategory(slug)!;
  const list = updatesByCategory(slug);
  const others = updateCategories.filter((c) => c.slug !== slug);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Updates", href: "/updates" }, { label: cat.name }]} />

      <header className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">{cat.emoji} {cat.name}</span>
        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{cat.name}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{cat.description}</p>
      </header>

      {list.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/30 p-10 text-center text-sm text-muted-foreground">
          No updates in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((u) => (
            <UpdateCard key={u.slug} update={{
              slug: u.slug, title: u.title, summary: u.summary, icon: u.icon, category: u.category,
              publishedOn: u.publishedOn, readingMinutes: estimateReadingMinutes(u),
            }} />
          ))}
        </div>
      )}

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Other categories</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((c) => (
            <Link key={c.slug} href={`/updates/${c.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
              <Icon name={c.icon} className="size-4" /> {c.name} <ArrowRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
