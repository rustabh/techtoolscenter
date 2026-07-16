import Link from "next/link";
import { Sparkles } from "lucide-react";
import { categories, tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-tight py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              UtilityHub
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Free, fast, privacy-first online tools that run entirely in your browser.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.id.toLowerCase()}`} className="hover:text-foreground">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Popular tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {tools.filter((t) => t.popular).slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="hover:text-foreground">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools" className="hover:text-foreground">All tools</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-foreground">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made for the web. No data ever leaves your browser.</p>
        </div>
      </div>
    </footer>
  );
}
