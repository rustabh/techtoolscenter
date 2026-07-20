import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { UpdateCard } from "@/components/updates/update-card";
import { latestUpdates, estimateReadingMinutes } from "@/lib/updates";

/** Homepage preview of the newest updates. */
export function LatestUpdates() {
  const list = latestUpdates(6);
  if (list.length === 0) return null;

  return (
    <section className="container-tight py-14">
      <Reveal>
        <div className="flex flex-col items-center gap-3 text-center">
          <Badge variant="secondary">📰 Fresh</Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Latest updates</h2>
          <p className="max-w-xl text-balance text-muted-foreground">Google, government and TechToolsCenter news — all in one place.</p>
          <Link href="/updates" className="mt-1 text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((u) => (
          <Reveal key={u.slug} delay={0.03}>
            <UpdateCard update={{
              slug: u.slug, title: u.title, summary: u.summary, icon: u.icon, category: u.category,
              publishedOn: u.publishedOn, readingMinutes: estimateReadingMinutes(u),
            }} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/updates" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
          Explore the Updates Center <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
