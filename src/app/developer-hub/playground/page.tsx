import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ResourceCard } from "@/components/devhub/resource-card";
import { playgroundResources } from "@/lib/devhub/playground";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Developer Playground — Live CSS & Code Tools | ${siteConfig.name}`,
  description:
    "Interactive, in-browser developer tools — a live HTML/CSS/JS editor, Tailwind playground, Flexbox/Grid/box-shadow/glassmorphism generators, a sitemap builder and more. Free, private, no sign-up.",
  alternates: { canonical: "/developer-hub/playground" },
  openGraph: { title: `Developer Playground | ${siteConfig.name}`, description: "Interactive, in-browser developer tools — free and private." },
};

export default function DeveloperPlaygroundPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Developer Hub", href: "/developer-hub" }, { label: "Playground" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Developer Playground</h1>
        <p className="mt-3 text-muted-foreground">
          Interactive, in-browser tools for everyday frontend work — live code editing, CSS generators and SEO
          essentials. Everything here runs in your browser, free, with no sign-up.
        </p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playgroundResources.map((r) => <ResourceCard key={r.slug} resource={r} />)}
      </div>
    </div>
  );
}
