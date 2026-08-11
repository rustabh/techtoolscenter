import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { getTool } from "@/lib/tools";
import { landingsForCore } from "@/lib/landing/landing";
import { buildSimpleMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildSimpleMetadata({
  title: "Free Templates — Resumes, Invoices & Business Documents",
  description:
    "Every fillable, downloadable template on TechToolsCenter in one place — resume templates by profession, invoice templates by industry, and business documents like quotations, receipts and salary slips. Free, no sign-up.",
  ogDescription: "Resume templates by profession, invoice templates by industry, and free business document templates — all in one place.",
  canonical: "/templates",
});

const businessDocSlugs = [
  "quotation-generator",
  "receipt-generator",
  "salary-slip-generator",
  "letterhead-maker",
  "estimate-maker",
  "purchase-order-generator",
  "delivery-challan",
  "credit-note",
  "debit-note",
  "packing-slip",
  "rent-receipt-generator",
];

export default function TemplatesPage() {
  const resumeLandings = landingsForCore("resume-builder");
  const invoiceLandings = landingsForCore("invoice-maker");
  const businessDocs = businessDocSlugs.map(getTool).filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Templates" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Free Templates</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every fillable, downloadable template on TechToolsCenter in one place — resumes by profession, invoices by
          industry, and the everyday business documents that come after. No sign-up, export straight to PDF.
        </p>
      </header>

      {/* Resume templates */}
      <section className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Resume Templates by Profession</h2>
            <p className="mt-1 text-sm text-muted-foreground">A single-column, ATS-safe layout tuned to what each field actually needs to highlight.</p>
          </div>
          <Link href="/tools/resume-builder" className="text-sm font-medium text-primary hover:underline">
            Open Resume Builder →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {resumeLandings.map((l) => (
            <Link
              key={l.slug}
              href={`/tools/${l.slug}`}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              {l.h1.replace(/^Resume Builder for /, "")}
            </Link>
          ))}
        </div>
      </section>

      {/* Invoice templates */}
      <section className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Invoice Templates by Industry</h2>
            <p className="mt-1 text-sm text-muted-foreground">Itemised the way each industry actually bills, with GST/tax support built in.</p>
          </div>
          <Link href="/tools/invoice-maker" className="text-sm font-medium text-primary hover:underline">
            Open Invoice Maker →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {invoiceLandings.map((l) => (
            <Link
              key={l.slug}
              href={`/tools/${l.slug}`}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              {l.h1.replace(/^Invoice Template for /, "")}
            </Link>
          ))}
        </div>
      </section>

      {/* Other business documents */}
      <section className="mt-14 mb-4">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Business Document Templates</h2>
        <p className="mb-5 text-sm text-muted-foreground">Everything else that comes before and after the invoice — quotations, receipts, payroll and delivery paperwork.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {businessDocs.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={t.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{t.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
