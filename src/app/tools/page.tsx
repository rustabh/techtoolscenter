import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolsExplorer } from "@/components/tools-explorer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "All Tools — Browse the Complete Toolbox",
  description:
    "Browse every free TechToolsCenter tool. Invoice makers, PDF utilities, calculators, generators and text tools — all running privately in your browser.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <div className="mt-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">All tools</h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Search and filter the complete collection of free, privacy-first tools.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="h-40 skeleton rounded-2xl" />}>
          <ToolsExplorer />
        </Suspense>
      </div>
    </div>
  );
}
