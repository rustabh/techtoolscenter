import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CommunityClient } from "@/components/community/community-client";

export const metadata: Metadata = {
  title: "Community & Feature Requests",
  description: "Request a tool, report a bug, suggest ideas and vote on what we build next. See the public roadmap and recently released tools on the TechToolsCenter community board.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <div className="container-tight py-12">
      <Breadcrumbs items={[{ label: "Community" }]} />
      <header className="mt-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Community & Feedback</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Can&apos;t find the tool you need? Request it. Found a bug or have an idea? Tell us. Vote on requests and
          follow the public roadmap — the community decides what we build next.
        </p>
      </header>
      <CommunityClient />
    </div>
  );
}
