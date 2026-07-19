import Script from "next/script";

// Default GA4 Measurement ID for TechToolsCenter. Override per-environment by
// setting NEXT_PUBLIC_GA_ID (e.g. a separate staging property) if ever needed.
const GA_ID_DEFAULT = "G-HRX6TPNMWF";

/**
 * Google Analytics 4 — loads after interaction so it never blocks paint.
 * Uses the built-in Measurement ID by default; NEXT_PUBLIC_GA_ID overrides it.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || GA_ID_DEFAULT;
  if (!gaId) return null;
  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
