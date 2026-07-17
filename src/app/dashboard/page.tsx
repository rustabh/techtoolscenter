import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Dashboard } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal TechToolsCenter dashboard — favorites, recently used tools, trending picks and collections.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Dashboard" }]} />
      <div className="mt-6 mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Your dashboard</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Everything in one place — pinned favorites, your recent tools, what&apos;s trending, and all collections.
        </p>
      </div>
      <Dashboard />
    </div>
  );
}
