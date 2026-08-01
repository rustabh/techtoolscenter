import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { PremiumAd } from "@/components/ads/premium-ad";
import { statusChecks } from "@/lib/india/status-checks";
import { getIndiaService } from "@/lib/india/services";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Check Status Online — PAN, Passport, PF, Ration, PM-KISAN & More",
  description: "Quickly check the status of your PAN card, PAN–Aadhaar link, passport, PF/EPF claim, ration card, PM-KISAN, traffic challan, Aadhaar update, voter ID, driving licence, tax refund and scholarship — with direct official tracker links and simple steps.",
  alternates: { canonical: "/india-services/status" },
};

export default function StatusHubPage() {
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: "Check Status", url: "/india-services/status" },
  ]);
  const faq = [
    { question: "How do I check my PAN card or passport status?", answer: "Open the official tracker (Income Tax portal for PAN, Passport Seva for passport), enter your acknowledgement/file number, and view the status. Direct links and steps for each are on this page." },
    { question: "Is this the official status page?", answer: "No. This is a free directory that links you to the correct official government tracker for each service and explains what you need. We never ask for your login or OTP." },
  ];
  const faqLd = faqPageFromItemsLd(faq);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: "Check Status" }]} />

      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🔎 Check Status</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Check Your Application Status Online
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Track the status of your most common government applications — pick one below for the official tracker link and exactly what you need.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {statusChecks.map((s) => {
          const svc = s.relatedService ? getIndiaService(s.relatedService) : undefined;
          return (
            <div key={s.slug} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-semibold">{s.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.what}</p>
              <p className="mt-3 text-xs text-muted-foreground"><span className="font-medium text-foreground">You need:</span> {s.need}</p>
              <ol className="mt-3 space-y-1.5">
                {s.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-px grid size-4 shrink-0 place-items-center rounded bg-accent text-[10px] font-semibold text-accent-foreground">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={s.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  Official tracker <ExternalLink className="size-3.5" />
                </a>
                {svc && (
                  <Link
                    href={`/india-services/${svc.category}/${svc.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium hover:border-primary/40 hover:text-primary"
                  >
                    Full guide <ArrowRight className="size-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
        ⚠️ <span className="font-medium text-foreground">Safety tip:</span> Only check status on the official government sites linked here. We never ask for your password or OTP, and no genuine tracker needs you to pay a fee to “check status”.
      </div>

      <div className="mt-10"><IndiaDisclaimer /></div>
    </div>
  );
}
