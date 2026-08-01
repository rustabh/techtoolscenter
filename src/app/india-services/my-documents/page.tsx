import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MyDocuments } from "@/components/india/my-documents";

export const metadata: Metadata = {
  title: "My Documents — Your Saved India Services Checklist",
  description: "Your personal checklist of saved India government services. Track the documents you've collected for each application — Aadhaar, PAN, passport, certificates and more. Saved privately in your browser.",
  alternates: { canonical: "/india-services/my-documents" },
  robots: { index: false }, // personal, per-device page
};

export default function MyDocumentsPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "India Services", href: "/india-services" }, { label: "My Documents" }]} />

      <header className="mt-8 max-w-2xl">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">My Documents</h1>
        <p className="mt-3 text-muted-foreground">
          Your saved services and a tick-off checklist for the documents you need. Everything is stored privately in your
          browser — no login, nothing uploaded.
        </p>
      </header>

      <MyDocuments />
    </div>
  );
}
