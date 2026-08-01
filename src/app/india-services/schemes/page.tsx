import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SchemesBrowser } from "@/components/india/schemes-browser";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { PremiumAd } from "@/components/ads/premium-ad";
import { schemes, schemeAudiences } from "@/lib/india/schemes";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Government Schemes List 2026 — Sarkari Yojana Guide",
  description: "A simple, up-to-date list of major Indian government schemes (sarkari yojana) for women, farmers, workers, students, seniors and businesses — Ujjwala, PM Awas, Mudra, Atal Pension, Ayushman, Jan Dhan and more. Benefits, eligibility, documents and official links.",
  alternates: { canonical: "/india-services/schemes" },
};

export default function SchemesPage() {
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "India Services", url: "/india-services" },
    { name: "Government Schemes", url: "/india-services/schemes" },
  ]);
  const faq = [
    { question: "What are the major government schemes in India?", answer: "Popular schemes include PM Ujjwala (free LPG), PM Awas (housing), PM-KISAN (farmer income), Ayushman Bharat (health cover), Jan Dhan (bank account), Mudra (business loans), Atal Pension, Sukanya Samriddhi and many more — grouped here by who they help." },
    { question: "How do I apply for a government scheme?", answer: "Each scheme has its own official portal and process. Open the scheme's guide here to see its benefits, eligibility and documents, then apply on the official government website we link to." },
    { question: "Are these official government pages?", answer: "No. This is a free educational directory that explains schemes and links you to the official government websites. We don't collect applications or take payments." },
  ];
  const faqLd = faqPageFromItemsLd(faq);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: "Government Schemes" }]} />

      <header className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🏆 Government Schemes</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Government Schemes List (Sarkari Yojana) 2026
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          The major Indian government schemes explained simply — pick who it&apos;s for and see benefits, eligibility, documents and the official link for each.
        </p>
      </header>

      <div className="mt-10"><SchemesBrowser /></div>

      <div className="mt-12"><PremiumAd className="!px-0" /></div>

      {/* SEO: crawlable audience index */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Schemes by who they help</h2>
        <div className="space-y-8">
          {schemeAudiences.map((a) => {
            const list = schemes.filter((s) => s.audiences.includes(a.slug));
            if (!list.length) return null;
            return (
              <div key={a.slug}>
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold"><span>{a.icon}</span> {a.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <Link key={s.slug} href={`/india-services/schemes/${s.slug}`}
                      className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-14"><IndiaDisclaimer /></div>
    </div>
  );
}
