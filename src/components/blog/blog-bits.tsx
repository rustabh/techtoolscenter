import Link from "next/link";
import { Clock, ArrowRight, Scale } from "lucide-react";
import { Icon } from "@/components/icon";
import { getAuthor } from "@/lib/blog/authors";
import { getBlogCategory } from "@/lib/blog/categories";
import { estimateReadingMinutes } from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/types";
import type { Author } from "@/lib/blog/types";

export function ComparisonHeader({ subjects }: { subjects: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
      {subjects.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          {i > 0 && <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground">VS</span>}
          <span className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm">{s}</span>
        </span>
      ))}
    </div>
  );
}

export function ComparisonBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      <Scale className="size-3" /> Comparison
    </span>
  );
}

export function BlogCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  const cat = getBlogCategory(post.category);
  const author = getAuthor(post.author);
  return (
    <Link href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-center gap-2 text-xs">
        {cat && <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground"><Icon name={cat.icon} className="size-3" /> {cat.name}</span>}
        <span className="flex items-center gap-1 text-muted-foreground"><Clock className="size-3" /> {estimateReadingMinutes(post)} min</span>
      </div>
      <h3 className={`mt-3 font-bold tracking-tight transition-colors group-hover:text-primary ${featured ? "text-xl" : "text-lg"}`}>{post.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{author?.name}</span>
        <span className="flex items-center gap-1 font-medium text-primary">Read <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  );
}

export function AuthorBox({ author }: { author: Author }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{author.avatarInitials}</span>
      <div>
        <p className="font-semibold">{author.name}</p>
        <p className="text-xs text-primary">{author.role}</p>
        <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
      </div>
    </div>
  );
}

export function TableOfContents({ items }: { items: { id: string; text: string; level: 2 | 3 }[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-sm font-semibold">On this page</p>
      <ul className="space-y-1.5 text-sm">
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "ml-3" : ""}>
            <a href={`#${it.id}`} className="text-muted-foreground transition-colors hover:text-primary">{it.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Pagination({ base, current, total }: { base: string; current: number; total: number }) {
  if (total <= 1) return null;
  const href = (p: number) => (p === 1 ? base : `${base}/page/${p}`);
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {current > 1 && <Link href={href(current - 1)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">← Prev</Link>}
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={href(p)} aria-current={p === current ? "page" : undefined}
          className={`rounded-lg border px-3.5 py-2 text-sm ${p === current ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>{p}</Link>
      ))}
      {current < total && <Link href={href(current + 1)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">Next →</Link>}
    </nav>
  );
}
