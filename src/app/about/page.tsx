import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Accessibility, Gem, Feather, Eye, Lightbulb, HeartHandshake } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PrivacyFirst } from "@/components/privacy-first";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About TechToolsCenter",
  description: "The fastest all-in-one online toolkit that respects your privacy. No sign-up, no installation — just instant tools that work, for creators, developers, businesses and students.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Privacy First", desc: "Your files are processed in your browser whenever possible — never uploaded, never sold." },
  { icon: Zap, title: "Speed", desc: "Instant results with no uploads and no waiting." },
  { icon: Accessibility, title: "Accessibility", desc: "Keyboard-friendly, screen-reader aware, and usable by everyone." },
  { icon: Gem, title: "Quality", desc: "Polished, reliable tools that just work." },
  { icon: Feather, title: "Simplicity", desc: "Clean interfaces with no unnecessary complexity." },
  { icon: Eye, title: "Transparency", desc: "No hidden charges, no dark patterns, no tracking." },
  { icon: Lightbulb, title: "Innovation", desc: "New tools and improvements ship regularly." },
  { icon: HeartHandshake, title: "Trust", desc: "Built to earn your trust every single day." },
];

export default function AboutPage() {
  return (
    <div className="container-tight max-w-3xl py-12">
      <Breadcrumbs items={[{ label: "About" }]} />

      <header className="mt-6">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">The Fastest All-in-One Online Toolkit.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {siteConfig.name} is designed for creators, developers, businesses, students, freelancers and professionals
          who need powerful online tools without unnecessary complexity.
        </p>
        <p className="mt-4 text-base font-medium">
          The fastest all-in-one online toolkit that respects your privacy. No sign-up. No installation. Just instant tools that work.
        </p>
      </header>

      <PrivacyFirst className="mt-8" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Our mission</h2>
        <p className="mt-3 text-muted-foreground">Our mission is simple: build high-quality online tools that anyone can use instantly.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {["No sign-up", "No software installation", "No complicated interfaces", "No unnecessary barriers"].map((x) => (
            <li key={x} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-sm">
              <span className="text-primary">✓</span> {x}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Our vision</h2>
        <p className="mt-3 text-muted-foreground">
          Become the world&apos;s most trusted productivity toolkit — where anyone can solve everyday digital tasks in seconds.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Core values</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><v.icon className="size-5" /></span>
              <h3 className="mt-3 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 text-center">
        <p className="text-lg font-bold tracking-tight">No Sign-Up Required. No Watermarks. No Hidden Charges.</p>
        <p className="mt-1 text-muted-foreground">Just Open. Use. Done. Explore {tools.length}+ free tools.</p>
        <Link href="/tools" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Explore all tools →</Link>
      </section>
    </div>
  );
}
