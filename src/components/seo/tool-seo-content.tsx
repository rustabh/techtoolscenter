import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb, AlertTriangle, ThumbsUp, FileInput, FileOutput, FileType2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/icon";
import { siteConfig } from "@/lib/site";
import type { Tool } from "@/lib/tools";
import {
  toolIntro, toolFeatures, toolBenefits, toolUseCases, toolFormats, toolDifficulty,
  toolHowToSteps, toolTips, toolMistakes, toolBestPractices, toolExamples, toolFaqs,
} from "@/lib/seo/content";
import { internalLinks } from "@/lib/seo/links";

/**
 * Reusable Tool SEO layout. Every tool page renders this to get its About,
 * Features, Use Cases, How-To (with tips, mistakes and best practices),
 * Examples, Benefits, FAQ (≥8), internal links and CTA — all generated from
 * the registry, so no page needs manual SEO coding.
 */
export function ToolSeoContent({ tool, totalTools }: { tool: Tool; totalTools: number }) {
  const howTo = toolHowToSteps(tool);
  const tips = toolTips(tool);
  const mistakes = toolMistakes(tool);
  const best = toolBestPractices(tool);
  const features = toolFeatures(tool);
  const benefits = toolBenefits(tool);
  const useCases = toolUseCases(tool);
  const examples = toolExamples(tool);
  const faqs = toolFaqs(tool);
  const { formats, inputs, outputs } = toolFormats(tool);
  const links = internalLinks(tool);

  return (
    <>
      <section className="mx-auto max-w-3xl space-y-12">
        {/* About */}
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">About the {tool.name}</h2>
          <p className="leading-relaxed text-muted-foreground">{tool.longDescription}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{toolIntro(tool)}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The {tool.name} is part of {siteConfig.name} — a free, privacy-first collection of {totalTools}+ online
            tools. Everything runs 100% in your browser, so your data stays private and results are instant.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-secondary px-3 py-1 font-medium">Difficulty: {toolDifficulty(tool)}</span>
            <span className="rounded-full bg-secondary px-3 py-1 font-medium">Free · No sign-up</span>
            <span className="rounded-full bg-secondary px-3 py-1 font-medium">Runs in your browser</span>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Key features</h2>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span key={f} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* Formats / IO */}
        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Supported formats</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <IoCard icon={<FileInput className="size-4" />} title="Input" items={inputs} />
            <IoCard icon={<FileOutput className="size-4" />} title="Output" items={outputs} />
            <IoCard icon={<FileType2 className="size-4" />} title="Formats" items={formats} />
          </div>
        </div>

        {/* How to */}
        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">How to use the {tool.name}</h2>
          <ol className="space-y-4">
            {howTo.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ListCard icon={<Lightbulb className="size-4 text-amber-500" />} title="Tips" items={tips} />
            <ListCard icon={<AlertTriangle className="size-4 text-rose-500" />} title="Common mistakes" items={mistakes} />
            <ListCard icon={<ThumbsUp className="size-4 text-emerald-500" />} title="Best practices" items={best} />
          </div>
        </div>

        {/* Examples */}
        {examples.length > 0 && (
          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Examples</h2>
            <div className="space-y-3">
              {examples.map((ex, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="mb-2 font-semibold">{ex.title}</h3>
                  <div className="grid gap-3 sm:grid-cols-2 text-sm">
                    <div><p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Input</p><p className="rounded-lg bg-secondary/50 p-3 font-mono text-xs">{ex.input}</p></div>
                    <div><p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Output</p><p className="rounded-lg bg-secondary/50 p-3 font-mono text-xs">{ex.output}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use cases */}
        {useCases.length > 0 && (
          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Popular use cases</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {useCases.map((u) => (
                <li key={u} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /><span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        <div>
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Why use our {tool.name}?</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <Accordion items={faqs} />
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 text-center">
          <h2 className="text-xl font-bold tracking-tight">Ready to try the {tool.name}?</h2>
          <p className="mt-1 text-sm text-muted-foreground">It&apos;s free, private and works instantly — no sign-up required.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href={`#`} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Use it now ↑</Link>
            <Link href={`/collections/${links.parent.slug}`} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">More {links.parent.name} →</Link>
          </div>
        </div>
      </section>

      {/* Internal-link engine */}
      <LinkSection title={`Related ${links.parent.name} tools`} tools={links.related} />
      <LinkSection title="Alternative tools" tools={links.alternatives} />
      <LinkSection title="Popular tools" tools={links.popular} />
      <LinkSection title="Newest tools" tools={links.newest} />
    </>
  );
}

function IoCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold">{icon} {title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((i) => <span key={i} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{i}</span>)}
      </div>
    </div>
  );
}

function ListCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold">{icon} {title}</p>
      <ul className="space-y-1.5 text-xs text-muted-foreground">
        {items.map((t) => <li key={t} className="leading-relaxed">• {t}</li>)}
      </ul>
    </div>
  );
}

function LinkSection({ title, tools }: { title: string; tools: Tool[] }) {
  if (!tools.length) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {tools.slice(0, 6).map((r) => (
          <Link key={r.slug} href={`/tools/${r.slug}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <span className="flex items-center gap-3">
              <Icon name={r.icon} className="size-5 text-primary" />
              <span className="text-sm font-medium">{r.name}</span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
