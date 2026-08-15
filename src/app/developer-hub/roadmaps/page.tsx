import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { roadmaps, resolvedSteps } from "@/lib/devhub/roadmaps";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Developer Roadmaps — Frontend, Backend, Full-Stack & DevOps",
  description:
    "Role-based learning paths for Frontend, Backend, Full-Stack and DevOps — each step links straight to the real Developer Hub category you need at that point, in the order most developers actually learn it.",
  ogDescription: "Frontend, Backend, Full-Stack and DevOps roadmaps — every step links to a real resource.",
  canonical: "/developer-hub/roadmaps",
});

export default function RoadmapsPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Developer Hub", href: "/developer-hub" }, { label: "Roadmaps" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Developer Roadmaps</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Four role-based learning paths, built entirely from Developer Hub&apos;s own categories. Every step links straight
          to real frameworks, tools and resources — not a vague topic name with nothing behind it.
        </p>
      </header>

      <div className="mt-14 space-y-14">
        {roadmaps.map((roadmap) => {
          const steps = resolvedSteps(roadmap);
          return (
            <section key={roadmap.slug} id={roadmap.slug}>
              <div className="mb-6 flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon name={roadmap.icon} className="size-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{roadmap.name}</h2>
                  <p className="text-sm font-medium text-primary">{roadmap.tagline}</p>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{roadmap.description}</p>
                </div>
              </div>

              <ol className="relative ml-5 space-y-6 border-l border-border pl-8">
                {steps.map((step, i) => (
                  <li key={step.categorySlug} className="relative">
                    <span className="absolute -left-[calc(2rem+0.5rem)] top-0.5 grid size-7 place-items-center rounded-full border border-border bg-card text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <Link
                      href={`/developer-hub/${step.categorySlug}`}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    >
                      <span>
                        <span className="block font-semibold">{step.title}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{step.description}</span>
                        {step.category && (
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                            Browse {step.category.name} <ArrowRight className="size-3" />
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>

      <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Want a broader map of the whole ecosystem?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          These four roadmaps are deliberately scoped to what&apos;s built out on TechToolsCenter. For a more exhaustive,
          community-maintained map of any given field, see the{" "}
          <Link href="/developer-hub/learning" className="font-medium text-primary hover:underline">Useful Developer Websites</Link>{" "}
          section of Developer Hub.
        </p>
      </section>
    </div>
  );
}
