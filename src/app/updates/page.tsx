import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { PremiumAd } from "@/components/ads/premium-ad";
import { UpdatesBrowser } from "@/components/updates/updates-browser";
import { allUpdates, featuredUpdates, estimateReadingMinutes, updateCategories, updatesByCategory } from "@/lib/updates";
import { breadcrumbLd } from "@/lib/seo/schema";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Updates Center — Google, Government & Platform Updates",
  description: "Stay updated with the latest Google Search updates, government notifications, product improvements, new features and platform announcements from TechToolsCenter.",
  ogDescription: "Google, government and TechToolsCenter updates in one place.",
  canonical: "/updates",
});

function toItems(list: ReturnType<typeof allUpdates>) {
  return list.map((u) => ({
    slug: u.slug, title: u.title, summary: u.summary, icon: u.icon, category: u.category,
    publishedOn: u.publishedOn, readingMinutes: estimateReadingMinutes(u), tags: u.tags, popular: u.popular,
  }));
}

export default function UpdatesPage() {
  const all = allUpdates();
  const featured = featuredUpdates(3);
  const crumb = breadcrumbLd([{ name: "Home", url: "/" }, { name: "Updates", url: "/updates" }]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "Updates" }]} />

      {/* Hero */}
      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">📰 Updates Center</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Stay Updated with Google, Government &amp; TechToolsCenter
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Discover the latest product improvements, feature releases, Google Search updates, government notifications and platform announcements.
        </p>
      </header>

      {/* Categories */}
      <section className="mt-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {updateCategories.map((c) => (
            <Link key={c.slug} href={`/updates/${c.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold group-hover:text-primary">{c.emoji} {c.name}</span>
                <span className="block text-xs text-muted-foreground">{updatesByCategory(c.slug).length} updates</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browser: search + filters + list */}
      <section className="mt-12">
        <UpdatesBrowser items={toItems(all)} />
      </section>

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {featured.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Featured</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {featured.map((u) => (
              <Link key={u.slug} href={`/updates/${u.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon name={u.icon} className="size-5" /></span>
                <h3 className="mt-3 font-semibold group-hover:text-primary">{u.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{u.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
