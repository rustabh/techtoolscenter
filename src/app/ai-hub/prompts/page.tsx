import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PromptLibrary } from "@/components/aihub/prompt-library";
import { prompts } from "@/lib/aihub/prompts";
import { breadcrumbLd } from "@/lib/seo/schema";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Prompt Library — Ready-to-Use AI Prompts, Free",
  description:
    "A curated library of ready-to-use AI prompts for writing, business, coding, marketing, career and more — copy, fill in the blanks, and paste into any chatbot.",
  ogDescription: "Ready-to-use AI prompts for writing, business, coding, marketing, career and more.",
  canonical: "/ai-hub/prompts",
});

export default function PromptLibraryPage() {
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "AI Hub", url: "/ai-hub" },
    { name: "Prompt Library", url: "/ai-hub/prompts" },
  ]);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "AI Hub", href: "/ai-hub" }, { label: "Prompt Library" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Prompt Library</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {prompts.length} ready-to-use prompts for writing, business, coding, marketing, career, productivity and
          more. Copy one, fill in the [bracketed] parts, and paste it into ChatGPT, Claude, Gemini or any chatbot on{" "}
          <Link href="/ai-hub/chatbots" className="text-primary hover:underline">AI Hub</Link>.
        </p>
      </header>

      <div className="mt-10">
        <PromptLibrary prompts={prompts} />
      </div>
    </div>
  );
}
