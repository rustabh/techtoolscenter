import Link from "next/link";
import {
  Shield, Zap, Lock, Cpu, Heart, Gauge, ArrowRight, Star, CheckCircle2,
} from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { ToolCard } from "@/components/tool-card";
import { Newsletter } from "@/components/newsletter";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ad-slot";
import { buttonVariants } from "@/components/ui/button";
import { categories, getPopularTools, getRecentTools, tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

const whyChoose = [
  { icon: Lock, title: "100% Private", desc: "Every tool runs in your browser. Your files and data never touch a server." },
  { icon: Zap, title: "Blazing Fast", desc: "No uploads, no waiting. Results are instant, even offline after first load." },
  { icon: Heart, title: "Always Free", desc: "No sign-up, no paywalls, no limits. Every tool is free to use, forever." },
  { icon: Gauge, title: "Lighthouse 95+", desc: "Optimized for speed, accessibility, best practices and SEO out of the box." },
  { icon: Cpu, title: "Works Offline", desc: "Client-side by design — many tools keep working with no connection at all." },
  { icon: Shield, title: "No Tracking", desc: "We don't sell your data. Your work stays on your device via local storage." },
];

const testimonials = [
  { name: "Aarav Sharma", role: "Freelance Designer", quote: "The invoice maker saved me hours every month. It looks more professional than the paid app I used before." },
  { name: "Priya Nair", role: "Small Business Owner", quote: "GST and EMI calculators are spot on, and I love that nothing gets uploaded. Total peace of mind." },
  { name: "Daniel Okoro", role: "Product Manager", quote: "The PDF merge and split tools are lightning fast. TechToolsCenter is now my default toolbox." },
  { name: "Meera Iyer", role: "Student", quote: "Resume builder + word counter got me through my whole application season. Clean and simple." },
];

const homeFaq = [
  { question: "Is TechToolsCenter really free?", answer: "Yes. Every tool is completely free with no sign-up, no hidden fees and no usage limits." },
  { question: "Do my files get uploaded anywhere?", answer: "No. All processing happens locally in your browser. Your documents, images and data never leave your device." },
  { question: "Do I need to create an account?", answer: "Never. Your work is optionally saved to your browser's local storage so you can pick up where you left off." },
  { question: "Can I use the generated documents commercially?", answer: "Yes. Invoices, QR codes, resumes and everything else you create are yours to use however you like." },
  { question: "Does TechToolsCenter work on mobile?", answer: "Absolutely. The entire site is mobile-first and fully responsive, so every tool works great on phones and tablets." },
];

const stats = [
  { value: `${tools.length}+`, label: "Free tools" },
  { value: "100%", label: "Client-side" },
  { value: "0", label: "Uploads" },
  { value: "∞", label: "Free forever" },
];

export default function HomePage() {
  const popular = getPopularTools();
  const recent = getRecentTools(6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="container-tight pt-16 pb-14 text-center sm:pt-24">
        <Reveal>
          <Badge variant="outline" className="mx-auto mb-6 gap-1.5 py-1">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {tools.length}+ premium tools, 100% in your browser
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Every everyday tool, <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">beautifully simple</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
            Invoices, PDFs, calculators and generators — fast, private, and free. No sign-up, nothing ever uploaded.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No sign-up", "No uploads", "Free forever"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" /> {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <dt className="text-2xl font-bold tracking-tight">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Popular tools */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Most loved" title="Popular tools" subtitle="Hand-picked favourites used by thousands every day." href="/tools" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </section>

      <div className="container-tight my-4">
        <AdSlot />
      </div>

      {/* Categories */}
      <section id="categories" className="container-tight py-14">
        <SectionHeading eyebrow="Browse" title="Explore by category" subtitle="Find the right tool for the job in seconds." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const count = tools.filter((t) => t.category === c.id).length;
            return (
              <Reveal key={c.id} delay={i * 0.04}>
                <Link
                  href={`/category/${c.id.toLowerCase()}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Icon name={c.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{c.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                    <span className="mt-2 inline-block text-xs font-medium text-primary">{count} tools →</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Recently added */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Fresh" title="Recently added" subtitle="The newest additions to the TechToolsCenter toolbox." href="/tools" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Why TechToolsCenter" title="Built for speed and privacy" subtitle="A premium experience that respects your data and your time." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="glass h-full rounded-2xl p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Loved by makers" title="What people say" subtitle="Trusted by freelancers, founders and students worldwide." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="glass h-full rounded-2xl p-6">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-tight py-14">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" subtitle="Everything you need to know about TechToolsCenter." />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={homeFaq} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-tight py-14">
        <Reveal>
          <Newsletter />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-tight py-14">
        <div className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
          <div className="glow absolute inset-0" aria-hidden />
          <h2 className="relative text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get more done?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
            Jump into any of our {tools.length} free tools — no account needed.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Link href="/tools" className={cn(buttonVariants({ size: "lg" }))}>
              Explore all tools <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow, title, subtitle, href,
}: {
  eyebrow: string; title: string; subtitle: string; href?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-3 text-center">
        <Badge variant="secondary">{eyebrow}</Badge>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-balance text-muted-foreground">{subtitle}</p>
        {href && (
          <Link href={href} className="mt-1 text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        )}
      </div>
    </Reveal>
  );
}
