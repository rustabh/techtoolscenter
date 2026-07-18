"use client";

import Link from "next/link";
import { TrendingUp, Sparkles, Clock, ChevronUp } from "lucide-react";
import { useCommunity } from "@/lib/community/store";
import type { CommunityPost } from "@/lib/community/types";

/** Homepage widget: Most Requested, Recently Released, Recently Requested. */
export function CommunityWidget() {
  const { posts, score } = useCommunity();

  const mostRequested = [...posts]
    .filter((p) => p.type === "tool-request" || p.type === "feature")
    .sort((a, b) => score(b) - score(a))
    .slice(0, 4);
  const recentlyReleased = [...posts]
    .filter((p) => p.status === "released")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);
  const recentlyRequested = [...posts]
    .filter((p) => p.type === "tool-request")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  return (
    <section className="container-tight py-14">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Shaped by the community</h2>
          <p className="mt-1 text-muted-foreground">Vote on what we build next, or request the tool you&apos;re missing.</p>
        </div>
        <Link href="/community" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open the community board →</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <WidgetCol title="Most requested" icon={<TrendingUp className="size-4 text-primary" />} posts={mostRequested} score={score} showVotes />
        <WidgetCol title="Recently released" icon={<Sparkles className="size-4 text-primary" />} posts={recentlyReleased} score={score} />
        <WidgetCol title="Recently requested" icon={<Clock className="size-4 text-primary" />} posts={recentlyRequested} score={score} />
      </div>
    </section>
  );
}

function WidgetCol({ title, icon, posts, score, showVotes }: {
  title: string; icon: React.ReactNode; posts: CommunityPost[]; score: (p: CommunityPost) => number; showVotes?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">{icon} {title}</p>
      <ul className="space-y-2.5">
        {posts.map((p) => (
          <li key={p.id}>
            <Link href="/community" className="group flex items-start gap-2 text-sm">
              {showVotes && (
                <span className="mt-0.5 inline-flex min-w-[34px] items-center justify-center gap-0.5 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold">
                  <ChevronUp className="size-3" />{score(p)}
                </span>
              )}
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">{p.title}</span>
            </Link>
          </li>
        ))}
        {posts.length === 0 && <li className="text-sm text-muted-foreground">Nothing yet.</li>}
      </ul>
    </div>
  );
}
