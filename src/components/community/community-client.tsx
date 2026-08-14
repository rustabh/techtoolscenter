"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronUp, ChevronDown, Lightbulb, Bug, Wrench, Megaphone, Map as MapIcon, Plus, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCommunity } from "@/lib/community/store";
import type { CommunityPost, PostStatus, Section, SortMode } from "@/lib/community/types";

const SECTIONS: { id: Section; label: string; icon: React.ReactNode; types: CommunityPost["type"][] }[] = [
  { id: "feature", label: "Feature Requests", icon: <Wrench className="size-4" />, types: ["feature", "tool-request"] },
  { id: "bug", label: "Bug Reports", icon: <Bug className="size-4" />, types: ["bug"] },
  { id: "idea", label: "Ideas", icon: <Lightbulb className="size-4" />, types: ["idea"] },
  { id: "roadmap", label: "Roadmap", icon: <MapIcon className="size-4" />, types: [] },
  { id: "announcement", label: "Announcements", icon: <Megaphone className="size-4" />, types: ["announcement"] },
];

const STATUS_STYLE: Record<PostStatus, string> = {
  open: "bg-secondary text-secondary-foreground",
  planned: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "in-progress": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  released: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};
const STATUS_LABEL: Record<PostStatus, string> = {
  open: "Open", planned: "Planned", "in-progress": "In Progress", released: "Released", rejected: "Rejected",
};

const CATEGORIES = ["Business", "Documents", "Image", "PDF", "Text", "Calculators", "Developer", "AI", "SEO", "Creative", "Everyday", "Other"];

export function CommunityClient() {
  const { posts, ready, score, myVote, vote, addPost, sortPosts } = useCommunity();
  const [section, setSection] = useState<Section>("feature");
  const [sort, setSort] = useState<SortMode>("popular");
  const [compose, setCompose] = useState<null | "tool" | "bug" | "idea">(null);

  // Open the tool-request form if linked from the footer (?compose=tool).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("compose") === "tool") setCompose("tool");
  }, []);

  const visible = useMemo(() => {
    const inSection = posts.filter((p) => {
      if (section === "roadmap") return p.status === "planned" || p.status === "in-progress";
      const s = SECTIONS.find((x) => x.id === section)!;
      return s.types.includes(p.type);
    });
    return sortPosts(inSection, section === "announcement" ? "newest" : sort);
  }, [posts, section, sort, sortPosts]);

  return (
    <div className="space-y-8">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setCompose(compose === "tool" ? null : "tool")}><Plus className="size-4" /> Request a tool</Button>
        <Button variant="outline" onClick={() => setCompose(compose === "bug" ? null : "bug")}><Bug className="size-4" /> Report a bug</Button>
        <Button variant="outline" onClick={() => setCompose(compose === "idea" ? null : "idea")}><Lightbulb className="size-4" /> Suggest an idea</Button>
      </div>

      {compose && <ComposeForm kind={compose} onDone={() => setCompose(null)} add={addPost} onSubmitted={(sec) => setSection(sec)} />}

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${section === s.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      {section !== "announcement" && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by</span>
          {(["popular", "newest", "most-requested"] as SortMode[]).map((m) => (
            <button key={m} onClick={() => setSort(m)}
              className={`rounded-lg border px-3 py-1 capitalize transition-colors ${sort === m ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
              {m.replace("-", " ")}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {ready && visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">Nothing here yet — be the first to post!</p>
        )}
        {visible.map((p) => (
          <PostRow key={p.id} post={p} score={score(p)} mine={myVote(p.id)} onVote={(d) => vote(p.id, d)} />
        ))}
      </div>
    </div>
  );
}

function PostRow({ post, score, mine, onVote }: { post: CommunityPost; score: number; mine: number; onVote: (d: 1 | -1) => void }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col items-center gap-0.5">
        <button aria-label="Upvote" onClick={() => onVote(1)}
          className={`rounded-lg p-1 transition-colors hover:bg-secondary ${mine === 1 ? "text-primary" : "text-muted-foreground"}`}>
          <ChevronUp className="size-5" />
        </button>
        <span className="text-sm font-bold tabular-nums">{score}</span>
        <button aria-label="Downvote" onClick={() => onVote(-1)}
          className={`rounded-lg p-1 transition-colors hover:bg-secondary ${mine === -1 ? "text-rose-500" : "text-muted-foreground"}`}>
          <ChevronDown className="size-5" />
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{post.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[post.status]}`}>{STATUS_LABEL[post.status]}</span>
          {post.priority && <Badge variant="outline" className="text-[11px] capitalize">{post.priority} priority</Badge>}
          {post.category && <Badge variant="secondary" className="text-[11px]">{post.category}</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
        {post.useCase && <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium">Use case:</span> {post.useCase}</p>}
        <p className="mt-2 text-xs text-muted-foreground">{post.author ?? "Anonymous"} · {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function ComposeForm({ kind, onDone, add, onSubmitted }: {
  kind: "tool" | "bug" | "idea";
  onDone: () => void;
  add: ReturnType<typeof useCommunity>["addPost"];
  onSubmitted: (s: Section) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [useCase, setUseCase] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const heading = kind === "tool" ? "Request a tool" : kind === "bug" ? "Report a bug" : "Suggest an improvement";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    add({
      type: kind === "tool" ? "tool-request" : kind === "bug" ? "bug" : "idea",
      title: title.trim(),
      description: description.trim(),
      ...(kind === "tool" ? { category, useCase: useCase.trim() || undefined, priority, email: email.trim() || undefined } : {}),
    });
    setDone(true);
    onSubmitted(kind === "tool" ? "feature" : kind === "bug" ? "bug" : "idea");
    import("@/lib/confetti").then((m) => m.confetti(60)).catch(() => {});
    setTimeout(onDone, 1400);
  };

  if (done) {
    return (
      <Card><CardContent className="flex items-center gap-3 pt-6 text-emerald-600 dark:text-emerald-400">
        <Check className="size-5" /> <span className="font-medium">Thanks! Your {kind === "tool" ? "tool request" : kind === "bug" ? "bug report" : "idea"} has been posted.</span>
      </CardContent></Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle>{heading}</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="community-title">{kind === "tool" ? "Tool name" : "Title"}</Label>
            <Input id="community-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === "tool" ? "e.g. AI background remover" : "Short summary"} required />
          </div>
          {kind === "tool" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="community-category">Category</Label>
                <Select id="community-category" value={category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</Select>
              </div>
              <div className="space-y-1.5"><Label htmlFor="community-priority">Priority</Label>
                <Select id="community-priority" value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                </Select>
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="community-description">Description</Label>
            <Textarea id="community-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={kind === "bug" ? "What happened? Which tool, and what did you expect?" : "Describe it in a sentence or two"} required />
          </div>
          {kind === "tool" && (
            <>
              <div className="space-y-1.5"><Label htmlFor="community-usecase">Use case (optional)</Label><Input id="community-usecase" value={useCase} onChange={(e) => setUseCase(e.target.value)} placeholder="What would you use it for?" /></div>
              <div className="space-y-1.5"><Label htmlFor="community-email">Email (optional)</Label><Input id="community-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Get notified when it ships" /></div>
            </>
          )}
          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>
          </div>
          <p className="text-xs text-muted-foreground">Posts and votes are saved in your browser. We review the community board regularly.</p>
        </form>
      </CardContent>
    </Card>
  );
}
