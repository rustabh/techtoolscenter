import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IndiaDisclaimer } from "@/components/india/disclaimer";
import { LangToggle } from "@/components/india/lang-toggle";
import { hindiServices } from "@/lib/india/hindi";
import { getIndiaService } from "@/lib/india/services";
import { breadcrumbLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `इंडिया सेवाएं — सरकारी सेवाओं की गाइड (हिंदी में) | ${siteConfig.name}`,
  description: "आधार, पैन, पासपोर्ट, वोटर आईडी, मैरिज सर्टिफिकेट, राशन कार्ड और ड्राइविंग लाइसेंस जैसी सरकारी सेवाओं की आसान हिंदी गाइड — दस्तावेज़, स्टेप, FAQ और आधिकारिक लिंक। शैक्षिक डायरेक्टरी।",
  alternates: {
    canonical: "/hi/india-services",
    languages: { "en-IN": "/india-services", "hi-IN": "/hi/india-services" },
  },
};

export default function HindiIndiaHub() {
  const crumb = breadcrumbLd([
    { name: "होम", url: "/" },
    { name: "इंडिया सेवाएं", url: "/hi/india-services" },
  ]);

  return (
    <div className="container-tight py-12" lang="hi">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <Breadcrumbs items={[{ label: "इंडिया सेवाएं" }]} />

      <div className="mt-6"><LangToggle current="hi" enHref="/india-services" hiHref="/hi/india-services" /></div>

      <header className="mt-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">🇮🇳 इंडिया सेवाएं</span>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          सरकारी सेवाओं की आसान हिंदी गाइड
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          आधार, पैन, पासपोर्ट, मैरिज सर्टिफिकेट, राशन कार्ड और अन्य सरकारी सेवाओं के लिए भरोसेमंद गाइड, ज़रूरी दस्तावेज़,
          स्टेप और आधिकारिक सरकारी वेबसाइट के लिंक — सब एक जगह।
        </p>
      </header>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">लोकप्रिय सेवाएं</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {hindiServices.map((h) => {
            const en = getIndiaService(h.slug);
            return (
              <Link key={h.slug} href={`/hi/india-services/${h.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold group-hover:text-primary">{h.name}</h3>
                  <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{h.overview}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    गाइड देखें <ArrowRight className="size-3" />
                  </span>
                  {en && <span className="sr-only">{en.officialName}</span>}
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          और अधिक सेवाएं और श्रेणियाँ{" "}
          <Link href="/india-services" className="font-medium text-primary underline underline-offset-2">English में देखें</Link>।
        </p>
      </section>

      <div className="mt-14"><IndiaDisclaimer /></div>
    </div>
  );
}
