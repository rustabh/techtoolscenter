import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "About UtilityHub",
  description: "Learn about UtilityHub — a free, privacy-first collection of online tools that run entirely in your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-tight max-w-3xl py-12">
      <Breadcrumbs items={[{ label: "About" }]} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">About UtilityHub</h1>
      <div className="prose prose-slate mt-6 space-y-4 text-muted-foreground dark:prose-invert">
        <p>
          UtilityHub is a growing collection of {tools.length}+ free, fast and privacy-first tools for everyday work.
          From invoices and receipts to PDF utilities and calculators, every tool is designed to be beautiful,
          accessible and effortless to use.
        </p>
        <p>
          Our guiding principle is simple: <strong className="text-foreground">your data is yours</strong>. Every tool
          runs entirely in your browser. Nothing is uploaded to a server, and your work is optionally saved to your
          own device using local storage.
        </p>
        <p>
          No sign-ups, no paywalls, no tracking — just genuinely useful tools that respect your time and privacy.
        </p>
      </div>
    </div>
  );
}
