import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToolCard } from "@/components/tool-card";
import { Accordion } from "@/components/ui/accordion";
import { getTool } from "@/lib/tools";
import { breadcrumbLd, faqPageFromItemsLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Business Templates — Every Business Document, Explained",
  description:
    "Invoice, quotation, estimate, purchase order, delivery challan, credit/debit note, receipt, packing slip and letterhead — a plain guide to which one you actually need, plus every template ready to fill in free.",
  alternates: { canonical: "/business-templates" },
};

const documentSlugs = [
  "quotation-generator",
  "estimate-maker",
  "purchase-order-generator",
  "delivery-challan",
  "invoice-maker",
  "receipt-generator",
  "credit-note",
  "debit-note",
  "packing-slip",
  "letterhead-maker",
] as const;

interface GuideEntry {
  slug: (typeof documentSlugs)[number];
  whenToUse: string;
}

// The order most business transactions actually follow — quote, then a
// purchase order from the buyer, goods shipped, billed, paid, and any
// after-the-fact adjustment. Letterhead sits outside that flow since it's
// used for general correspondence, not a single transaction.
const guide: GuideEntry[] = [
  { slug: "quotation-generator", whenToUse: "Before work starts — a formal price offer for the customer to accept or negotiate. Not yet a bill." },
  { slug: "estimate-maker", whenToUse: "Also before work starts, but framed as a rough cost preview rather than a fixed offer — common for jobs where the final scope may shift." },
  { slug: "purchase-order-generator", whenToUse: "Sent the other direction — from a buyer to a vendor, formally ordering goods or services at agreed terms." },
  { slug: "delivery-challan", whenToUse: "Travels with the goods when they're shipped — proves what was sent and received. It is not a tax invoice and doesn't request payment." },
  { slug: "invoice-maker", whenToUse: "Once goods are delivered or work is done — the formal bill requesting payment, with full GST breakdown." },
  { slug: "receipt-generator", whenToUse: "After payment is received — proof the invoice has actually been paid." },
  { slug: "credit-note", whenToUse: "Issued after an invoice, to reduce what the customer owes — for a return, discount or billing correction." },
  { slug: "debit-note", whenToUse: "Issued after an invoice, to increase what the customer owes — for an undercharge or extra cost discovered later." },
  { slug: "packing-slip", whenToUse: "Also travels with a shipment — an itemised list of exactly what's in the package, for the recipient to check off." },
  { slug: "letterhead-maker", whenToUse: "Not tied to a transaction at all — branded stationery for any general business letter or communication." },
];

const faq = [
  { question: "What's the actual difference between a quotation and an invoice?", answer: "A quotation is sent before work starts — it's a price offer the customer can accept or negotiate. An invoice is sent after goods are delivered or work is done — it's a formal bill requesting payment. A quotation is not a demand for money; an invoice is." },
  { question: "Do I need GST registration to create these documents?", answer: "No — you can create any of these templates whether or not you're GST-registered. If you are registered, the invoice, quotation, estimate, purchase order, delivery challan, credit note and debit note tools all support a full CGST/SGST/IGST tax breakdown; if you're not registered, just leave the tax fields at zero." },
  { question: "What's the difference between an estimate and a quotation?", answer: "They're similar, but an estimate is generally treated as a rough, non-binding cost preview — useful when the final scope of work might still change — while a quotation is a more formal, fixed price offer the customer can directly accept." },
  { question: "Is a delivery challan the same as an invoice?", answer: "No. A delivery challan travels with goods to prove what was shipped and received — it doesn't request payment and isn't a tax invoice. The invoice, billing the customer, is a separate document." },
  { question: "When would I use a credit note instead of just editing the original invoice?", answer: "Invoices shouldn't be edited after they're issued, since that breaks the paper trail. A credit note is the correct way to formally reduce what a customer owes after the fact — for a return, discount or billing error — while keeping the original invoice intact." },
  { question: "Are these templates legally valid documents?", answer: "They're properly structured, professional templates covering the standard fields businesses use (GSTIN, tax breakdown, itemised pricing, terms). They are not a substitute for legal or tax advice for your specific situation — check with an accountant if you're unsure what a given transaction requires." },
];

export default function BusinessTemplatesPage() {
  const crumb = breadcrumbLd([
    { name: "Home", url: "/" },
    { name: "Business Templates", url: "/business-templates" },
  ]);
  const faqLd = faqPageFromItemsLd(faq);
  const tools = documentSlugs.map(getTool).filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <div className="container-tight py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Breadcrumbs items={[{ label: "Business Templates" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Business Templates</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ten real business documents, free to fill in and export — and a plain guide to which one you actually need,
          since half of these get mixed up constantly (a quotation is not an invoice, a challan is not a bill).
        </p>
      </header>

      {/* Decision guide, in the order a real transaction usually flows */}
      <section className="mt-14">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">Which document do you need?</h2>
        <p className="mb-6 text-sm text-muted-foreground">Roughly the order a transaction actually follows, start to finish.</p>
        <ol className="relative ml-5 space-y-4 border-l border-border pl-8">
          {guide.map((entry, i) => {
            const tool = getTool(entry.slug);
            if (!tool) return null;
            return (
              <li key={entry.slug} className="relative">
                <span className="absolute -left-[calc(2rem+0.5rem)] top-0.5 grid size-7 place-items-center rounded-full border border-border bg-card text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span>
                    <span className="block font-semibold">{tool.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{entry.whenToUse}</span>
                  </span>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Every template */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">Every business template</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-14 mb-4">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <Accordion items={faq} />
      </section>
    </div>
  );
}
