import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ExternalLink, ArrowRight, CheckCircle2, CalendarClock, ListChecks, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/ui/accordion";
import { PremiumAd } from "@/components/ads/premium-ad";
import { CategoryView } from "@/components/updates/category-view";
import { UpdateActions } from "@/components/updates/update-actions";
import { UpdateCard } from "@/components/updates/update-card";
import { updates, getUpdate, relatedUpdatesOf, estimateReadingMinutes } from "@/lib/updates";
import { updateCategories, getUpdateCategory } from "@/lib/updates/categories";
import { getIndiaService } from "@/lib/india/services";
import { getTool } from "@/lib/tools";
import { getLanding } from "@/lib/landing/landing";
import { getPost } from "@/lib/blog/posts";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";
import { buildSimpleMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return [...updateCategories.map((c) => ({ slug: c.slug })), ...updates.map((u) => ({ slug: u.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getUpdateCategory(slug);
  if (cat) {
    return buildSimpleMetadata({
      title: `${cat.name} — Updates`,
      description: cat.description,
      canonical: `/updates/${cat.slug}`,
    });
  }
  const u = getUpdate(slug);
  if (!u) return {};
  return buildSimpleMetadata({
    title: u.title,
    description: u.summary,
    canonical: `/updates/${u.slug}`,
    type: "article",
  });
}

function resolveTool(slug: string) {
  const t = getTool(slug);
  if (t) return { slug: t.slug, name: t.name };
  const l = getLanding(slug);
  if (l) return { slug: l.slug, name: l.h1 };
  return null;
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Friendly category landing at /updates/<category>.
  if (getUpdateCategory(slug)) return <CategoryView slug={slug} />;

  const u = getUpdate(slug);
  if (!u) notFound();

  const cat = getUpdateCategory(u.category);
  const related = relatedUpdatesOf(u);
  const tools = (u.relatedTools ?? []).map(resolveTool).filter(Boolean) as { slug: string; name: string }[];
  const indiaSvcs = (u.relatedIndia ?? []).map(getIndiaService).filter((s): s is NonNullable<typeof s> => !!s);
  const blogs = (u.relatedBlog ?? []).map(getPost).filter((b): b is NonNullable<typeof b> => !!b);
  const reading = estimateReadingMinutes(u);
  const date = new Date(u.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "Updates", url: "/updates" },
    ...(cat ? [{ name: cat.name, url: `/updates/${cat.slug}` }] : []),
    { name: u.title, url: `/updates/${u.slug}` },
  ]);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: u.title,
    description: u.summary,
    datePublished: u.publishedOn,
    dateModified: u.updatedOn ?? u.publishedOn,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/updates/${u.slug}`,
  };
  const faqLd = u.faq && u.faq.length ? faqPageFromItemsLd(u.faq) : null;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <Breadcrumbs items={[{ label: "Updates", href: "/updates" }, ...(cat ? [{ label: cat.name, href: `/updates/${cat.slug}` }] : []), { label: u.title }]} />

      {/* Hero */}
      <header className="mt-8">
        <div className="flex items-center gap-3">
          {cat && (
            <Link href={`/updates/${cat.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {cat.emoji} {cat.name}
            </Link>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarClock className="size-3.5" /> {date} · <Clock className="size-3.5" /> {reading} min read
          </span>
        </div>
        <h1 className="mt-4 flex items-start gap-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon name={u.icon} className="size-6" /></span>
          <span>{u.title}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{u.summary}</p>
        <div className="mt-5"><UpdateActions slug={u.slug} title={u.title} summary={u.summary} /></div>
      </header>

      {u.body && u.body.length > 0 && (
        <div className="mt-8 space-y-4">
          {u.body.map((p, i) => <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">{p}</p>)}
        </div>
      )}

      {u.whyItMatters && <Section title="Why it matters"><p className="text-[15px] leading-relaxed text-muted-foreground">{u.whyItMatters}</p></Section>}
      {u.whoIsAffected && <Section title="Who is affected"><p className="text-[15px] leading-relaxed text-muted-foreground">{u.whoIsAffected}</p></Section>}

      {u.keyChanges && u.keyChanges.length > 0 && (
        <Section title="Key changes">
          <ul className="space-y-2">
            {u.keyChanges.map((k) => <li key={k} className="flex items-start gap-2 text-[15px]"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {k}</li>)}
          </ul>
        </Section>
      )}

      {(u.before || u.after) && (
        <Section title="What changed">
          <div className="grid gap-4 sm:grid-cols-2">
            {u.before && <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Before</p><p className="mt-1.5 text-sm">{u.before}</p></div>}
            {u.after && <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-primary">After</p><p className="mt-1.5 text-sm">{u.after}</p></div>}
          </div>
        </Section>
      )}

      {u.benefits && u.benefits.length > 0 && (
        <Section title="Benefits">
          <ul className="space-y-2">
            {u.benefits.map((b) => <li key={b} className="flex items-start gap-2 text-[15px]"><Sparkles className="mt-0.5 size-4 shrink-0 text-primary" /> {b}</li>)}
          </ul>
        </Section>
      )}

      {u.howToUse && u.howToUse.length > 0 && (
        <Section title="How to use it">
          <ol className="space-y-3">
            {u.howToUse.map((s, i) => <li key={i} className="flex items-start gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">{i + 1}</span><span className="text-[15px]">{s}</span></li>)}
          </ol>
        </Section>
      )}

      {u.importantDates && u.importantDates.length > 0 && (
        <Section title="Important dates">
          <ul className="space-y-2">
            {u.importantDates.map((d) => <li key={d.label} className="flex items-center gap-2 text-[15px]"><CalendarClock className="size-4 text-primary" /> <span className="font-medium">{d.date}</span> — {d.label}</li>)}
          </ul>
        </Section>
      )}

      {u.nextSteps && u.nextSteps.length > 0 && (
        <Section title="Next steps">
          <ol className="space-y-2">
            {u.nextSteps.map((s, i) => <li key={i} className="flex items-start gap-2 text-[15px]"><ListChecks className="mt-0.5 size-4 shrink-0 text-primary" /> {s}</li>)}
          </ol>
        </Section>
      )}

      {u.officialSource && (
        <a href={u.officialSource.url} target="_blank" rel="noopener noreferrer nofollow" className="mt-8 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/60">
          <span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Official source</span><span className="block truncate font-semibold">{u.officialSource.label}</span></span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Visit <ExternalLink className="size-4" /></span>
        </a>
      )}

      {u.resources && u.resources.length > 0 && (
        <Section title="Useful resources">
          <div className="flex flex-wrap gap-2">
            {u.resources.map((r) => {
              const ext = r.url.startsWith("http");
              return ext ? (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">{r.label} <ExternalLink className="size-3.5" /></a>
              ) : (
                <Link key={r.url} href={r.url} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">{r.label} <ArrowRight className="size-3.5" /></Link>
              );
            })}
          </div>
        </Section>
      )}

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {u.faq && u.faq.length > 0 && (
        <Section title="FAQ"><Accordion items={u.faq} /></Section>
      )}

      {/* Related India Hub services */}
      {indiaSvcs.length > 0 && (
        <Section title="Related India Hub services">
          <div className="flex flex-wrap gap-2">
            {indiaSvcs.map((s) => <Link key={s.slug} href={`/india-services/${s.category}/${s.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">{s.name}</Link>)}
          </div>
        </Section>
      )}

      {/* Related tools */}
      {tools.length > 0 && (
        <Section title="Related tools">
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => <Link key={t.slug} href={`/tools/${t.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">{t.name}</Link>)}
          </div>
        </Section>
      )}

      {/* Related blogs */}
      {blogs.length > 0 && (
        <Section title="Related blogs">
          <div className="grid gap-4 sm:grid-cols-2">
            {blogs.map((b) => <Link key={b.slug} href={`/blog/${b.slug}`} className="group rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40"><h3 className="font-medium group-hover:text-primary">{b.title}</h3><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p></Link>)}
          </div>
        </Section>
      )}

      {/* Related updates */}
      {related.length > 0 && (
        <Section title="Related updates">
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <UpdateCard key={r.slug} update={{ slug: r.slug, title: r.title, summary: r.summary, icon: r.icon, category: r.category, publishedOn: r.publishedOn, readingMinutes: estimateReadingMinutes(r) }} />
            ))}
          </div>
        </Section>
      )}

      {/* Honest disclaimer for external-news categories */}
      {(u.category === "google" || u.category === "government") && (
        <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
          ⚠️ This is an educational summary by {siteConfig.name}. We are independent and not affiliated with Google or any government body. Always confirm the latest details on the official source linked above.
        </div>
      )}
    </div>
  );
}
