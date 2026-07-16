import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Free Online Tools`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1020 0%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
            ✦
          </div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Every everyday tool, beautifully simple.
        </div>
        <div style={{ fontSize: 30, color: "#a5b4fc", marginTop: 30 }}>
          Invoices · PDFs · Calculators · Generators — 100% in your browser
        </div>
      </div>
    ),
    { ...size }
  );
}
