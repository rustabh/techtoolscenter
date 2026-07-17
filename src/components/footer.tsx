import Link from "next/link";
import { Logo } from "@/components/logo";
import { tools } from "@/lib/tools";
import { collectionsWithCounts } from "@/lib/collections";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-tight py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" aria-label="TechToolsCenter home">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.tagline} Free, fast, privacy-first online tools that run entirely in your browser.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Collections</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {collectionsWithCounts().slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="hover:text-foreground">
                    {c.name}
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
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-foreground">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            Copyright © 2026 {siteConfig.name}. All Rights Reserved.
          </p>
          <p className="text-xs">
            Designed &amp; Developed by{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {siteConfig.developer.name}
            </a>{" "}
            Team
          </p>
        </div>
      </div>
    </footer>
  );
}
