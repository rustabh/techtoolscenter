import React from "react";
import Link from "next/link";
import type { Block } from "@/lib/blog/types";
import { headingSlug } from "@/lib/blog/posts";

/** Renders inline **bold** and [text](href) inside a paragraph or list item. */
function inline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2]) {
      nodes.push(<strong key={`${keyBase}-b${i}`}>{m[2]}</strong>);
    } else if (m[4]) {
      const href = m[5];
      const internal = href.startsWith("/");
      nodes.push(
        internal ? (
          <Link key={`${keyBase}-l${i}`} href={href} className="font-medium text-primary underline underline-offset-2">{m[4]}</Link>
        ) : (
          <a key={`${keyBase}-l${i}`} href={href} className="font-medium text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">{m[4]}</a>
        ),
      );
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function PostContent({ content }: { content: Block[] }) {
  return (
    <div className="space-y-5 leading-relaxed text-muted-foreground">
      {content.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} id={headingSlug(b.text)} className="scroll-mt-24 pt-4 text-2xl font-bold tracking-tight text-foreground">{b.text}</h2>;
          case "h3":
            return <h3 key={i} id={headingSlug(b.text)} className="scroll-mt-24 text-xl font-semibold text-foreground">{b.text}</h3>;
          case "p":
            return <p key={i}>{inline(b.text, `p${i}`)}</p>;
          case "ul":
            return <ul key={i} className="ml-5 list-disc space-y-1.5">{b.items.map((it, j) => <li key={j}>{inline(it, `p${i}-${j}`)}</li>)}</ul>;
          case "ol":
            return <ol key={i} className="ml-5 list-decimal space-y-1.5">{b.items.map((it, j) => <li key={j}>{inline(it, `p${i}-${j}`)}</li>)}</ol>;
          case "callout":
            return <div key={i} className="rounded-xl border-l-4 border-primary bg-primary/5 p-4 text-foreground">{inline(b.text, `c${i}`)}</div>;
          case "code":
            return <pre key={i} className="overflow-x-auto rounded-xl bg-secondary/60 p-4 font-mono text-sm text-foreground">{b.text}</pre>;
          default:
            return null;
        }
      })}
    </div>
  );
}
