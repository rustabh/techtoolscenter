import Link from "next/link";
import {
  Zap, ArrowRight, CheckCircle2,
  ShieldCheck, MonitorSmartphone, Globe, BadgeCheck, Rocket, Droplet, Wallet,
  Briefcase, Building2, GraduationCap, Code2,
} from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { ToolCard } from "@/components/tool-card";
import { Newsletter } from "@/components/newsletter";
import { CommunityWidget } from "@/components/community/community-widget";
import { LiveStats } from "@/components/stats/live-stats";
import { MostUsedTools } from "@/components/stats/most-used-tools";
import { ForYou } from "@/components/home/for-you";
import { DailyGreeting } from "@/components/home/daily-greeting";
import { DailyInspiration } from "@/components/home/daily-inspiration";
import { TodaysChallenge } from "@/components/home/todays-challenge";
import { WhatsNewBanner } from "@/components/home/whats-new-banner";
import { QuickActions } from "@/components/home/quick-actions";
import { ThisWeek } from "@/components/home/this-week";
import { StatsStrip } from "@/components/home/stats-strip";
import { LatestUpdates } from "@/components/home/latest-updates";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PremiumAd } from "@/components/ads/premium-ad";
import { buttonVariants } from "@/components/ui/button";
import { getPopularTools, getRecentTools, tools } from "@/lib/tools";
import { collectionsWithCounts } from "@/lib/collections";
import { cn } from "@/lib/utils";

const premiumPromise = [
  { icon: BadgeCheck, title: "No Sign-Up Required", desc: "Use every tool instantly." },
  { icon: Droplet, title: "No Watermarks", desc: "Your files stay clean." },
  { icon: ShieldCheck, title: "Privacy First", desc: "Processed securely." },
  { icon: Wallet, title: "No Hidden Charges", desc: "No surprises." },
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed." },
  { icon: MonitorSmartphone, title: "Works Everywhere", desc: "Desktop, tablet & mobile." },
];

const whyChoose = [
  { icon: ShieldCheck, emoji: "🔒", title: "Privacy First", desc: "Files are processed securely in your browser — nothing is ever uploaded to a server.", tint: "from-emerald-500/15" },
  { icon: Zap, emoji: "⚡", title: "Lightning Fast", desc: "Optimized for speed — no uploads, no waiting, results appear instantly.", tint: "from-amber-500/15" },
  { icon: MonitorSmartphone, emoji: "📱", title: "Works Everywhere", desc: "Fully responsive on desktop, tablet and mobile — use any tool anywhere.", tint: "from-blue-500/15" },
  { icon: Globe, emoji: "🌍", title: "No Installation", desc: "Everything works in your browser. Nothing to download, nothing to set up.", tint: "from-cyan-500/15" },
  { icon: BadgeCheck, emoji: "🎯", title: "Free to Use", desc: "Most tools are completely free — no sign-up, no paywalls, no limits.", tint: "from-violet-500/15" },
  { icon: Rocket, emoji: "🚀", title: "Always Improving", desc: "New tools and updates ship regularly, guided by the community.", tint: "from-rose-500/15" },
];

// Real capability, no fabricated names or star ratings — every claim here is
// something the linked tool actually does, not a review nobody actually wrote.
const useCases = [
  { icon: Briefcase, title: "Freelancers", desc: "Generate professional invoices and quotations, track GST, and get paid without a paid app.", href: "/tools/invoice-maker" },
  { icon: Building2, title: "Small businesses", desc: "GST, EMI and CTC calculators built to Indian rules, plus purchase orders and delivery challans — all private, all free.", href: "/collections/business-toolkit" },
  { icon: Code2, title: "Developers", desc: "JSON formatting, JWT decoding, hashing, cron helpers and a code playground — the utilities you reach for daily.", href: "/developer-hub" },
  { icon: GraduationCap, title: "Students", desc: "Build a resume, count words for an assignment, compress a PDF for submission — no sign-up required.", href: "/tools/resume-builder" },
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
  const homeCollections = collectionsWithCounts();

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

      {/* What's New banner (dismissible) */}
      <WhatsNewBanner />

      {/* Hero */}
      <section className="container-tight pt-10 pb-14 text-center sm:pt-16">
        <DailyGreeting />
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
        <Reveal delay={0.18}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Trending:</span>
            {popular.slice(0, 6).map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {t.name}
              </Link>
            ))}
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

      {/* Daily Inspiration + Today's Challenge */}
      <section className="container-tight pb-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal><DailyInspiration className="h-full" /></Reveal>
          <Reveal delay={0.05}><TodaysChallenge className="h-full" /></Reveal>
        </div>
      </section>

      {/* Quick actions */}
      <QuickActions />

      {/* Premium Promise */}
      <section className="container-tight pb-4 pt-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">The productivity platform built around simplicity</h2>
          <p className="mt-2 text-muted-foreground">No Sign-Up Required. No Watermarks. No Hidden Charges. Just Open. Use. Done.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {premiumPromise.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <span className="mx-auto grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <p.icon className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold">{p.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Continue working + Recommended (only shows with local history) */}
      <ForYou />

      {/* Popular tools */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Most loved" title="Popular tools" subtitle="Hand-picked favourites used by thousands every day." href="/tools" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </section>

      {/* Ad — after the first major content section (Popular tools) */}
      <PremiumAd />

      {/* Collections */}
      <section id="collections" className="container-tight py-14">
        <SectionHeading eyebrow="Browse" title="Explore collections" subtitle="Every tool, neatly organised into focused hubs." href="/collections" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeCollections.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <Link
                href={`/collections/${c.slug}`}
                className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon name={c.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                  <span className="mt-2 inline-block text-xs font-medium text-primary">{c.count} tools →</span>
                </div>
              </Link>
            </Reveal>
          ))}
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

      {/* Latest updates preview */}
      <LatestUpdates />

      {/* This week at TechToolsCenter */}
      <ThisWeek />

      {/* Ad — mid-page rectangle, well spaced from the others */}
      <PremiumAd variant="rectangle" />

      {/* Trust & social proof */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Why TechToolsCenter" title="Trusted, private and always free" subtitle="A premium experience that respects your data and your time." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className={`group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg`}>
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.tint} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 flex items-center gap-2 font-semibold">
                    <span aria-hidden>{f.emoji}</span> {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Most used tools (real stats — hidden until data exists) */}
      <MostUsedTools />

      {/* Who it's built for */}
      <section className="container-tight py-14">
        <SectionHeading eyebrow="Built for how you work" title="Whoever you are, there's a tool for that" subtitle="No fabricated reviews here — just what the tools actually do." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {useCases.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.05}>
              <Link href={u.href} className="glass group flex h-full items-start gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <u.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{u.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{u.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live activity stats (only shows once real data exists) */}
      <LiveStats />

      {/* Community */}
      <CommunityWidget />

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

      {/* Homepage stats strip */}
      <StatsStrip />

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

      {/* Ad — near the bottom, before the footer */}
      <PremiumAd />
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
