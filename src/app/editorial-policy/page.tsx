import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Search, RefreshCw, AlertTriangle, Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Editorial Policy & How We Research | ${siteConfig.name}`,
  description: "How TechToolsCenter researches, writes and keeps its guides accurate and up to date — our sourcing, verification and correction process. We are an independent educational directory, not a government body.",
  alternates: { canonical: "/editorial-policy" },
};

const principles = [
  {
    icon: Search,
    title: "How we research",
    body: "Every India Services guide and scheme page is written from official government sources — the relevant ministry, authority or portal (for example UIDAI for Aadhaar, the Income Tax Department for PAN, or the Passport Seva portal for passports). We summarise the official process in plain language and always link to the official website so you can verify and complete the actual application there.",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    body: "We include fees, validity and timelines only where they are officially or publicly published, and we mark the official source on each page. We do not invent numbers or make guarantees about approval, eligibility or outcomes — those are decided solely by the concerned government authority.",
  },
  {
    icon: RefreshCw,
    title: "Keeping content up to date",
    body: "Government processes change. Each guide shows a 'Last updated' date, and we review and refresh our most-used pages regularly. If a rule, fee or portal changes, the official website is always the final authority — please rely on it for the current details.",
  },
  {
    icon: AlertTriangle,
    title: "What we are (and are not)",
    body: "TechToolsCenter is an independent, educational navigation directory. We are not a government body, we are not affiliated with or endorsed by any government department, and we do not impersonate any official website. We never collect your application, take payments for government services, or ask for your passwords or OTPs.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Editorial Policy" }]} />

      <header className="mt-8 max-w-2xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight">Editorial Policy & How We Research</h1>
        <p className="mt-4 text-muted-foreground">
          Our guides help people understand and navigate official processes with confidence. Here&apos;s how we keep them
          accurate, honest and useful — and what you can always rely on.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {principles.map((p) => (
          <section key={p.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <p.icon className="size-5" />
            </div>
            <h2 className="font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6">
        <h2 className="flex items-center gap-2 font-semibold"><Mail className="size-5 text-primary" /> Spotted something out of date?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We want our guides to be right. If you find an error or an outdated detail, please tell us via our{" "}
          <Link href="/contact" className="font-medium text-primary underline underline-offset-2">contact page</Link> and
          we&apos;ll review and correct it. For the current official process, always refer to the government website linked on each guide.
        </p>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        {siteConfig.name} is an independent educational platform. All government service names, portals and trademarks belong to their respective owners.
      </p>
    </div>
  );
}
