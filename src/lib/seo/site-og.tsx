import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared OG image renderer for tool and blog pages — matches the site-wide
 * default (src/app/opengraph-image.tsx): dark indigo gradient, the same ✦
 * mark, same type scale — so a per-page image reads as "this site" at a
 * glance instead of a mismatched one-off design.
 */
// The OG renderer's dynamic font can't fetch a glyph for ₹; use "Rs" instead
// so no character renders as a blank box in the generated image.
const ogSafe = (text?: string) => text?.replace(/₹/g, "Rs ").replace(/\s+/g, " ").trim();

export function renderSiteOg({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  title = ogSafe(title) ?? siteConfig.name;
  subtitle = ogSafe(subtitle);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b1020 0%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
            ✦
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#a5b4fc" }}>{badge}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 1020 }}>{title}</div>
          {subtitle ? (
            <div style={{ fontSize: 28, color: "#c7d2fe", lineHeight: 1.35, maxWidth: 1000 }}>{subtitle}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 24, color: "#9ca3af" }}>Free · Private · No sign-up</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
