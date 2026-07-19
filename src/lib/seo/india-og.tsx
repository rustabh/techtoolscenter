import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared OG image renderer for India Services pages (services, states, cities,
 * schemes). Keeps a consistent, branded look for social shares.
 */
// The OG renderer's dynamic font can't fetch a glyph for ₹; use "Rs" instead
// so no character renders as a blank box in the shared image.
const ogSafe = (text?: string) => text?.replace(/₹/g, "Rs ").replace(/\s+/g, " ").trim();

export function renderIndiaOg({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  title = ogSafe(title) ?? "India Services";
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
          background: "linear-gradient(135deg, #062a1e 0%, #0b3d2b 55%, #0b1020 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40 }}>🇮🇳</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#6ee7b7" }}>{badge}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000 }}>{title}</div>
          {subtitle ? (
            <div style={{ fontSize: 30, color: "#a7f3d0", lineHeight: 1.3, maxWidth: 980 }}>{subtitle}</div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 24, color: "#9ca3af" }}>Educational directory · Official links inside</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
