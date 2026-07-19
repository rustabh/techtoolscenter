import Script from "next/script";

/**
 * Google Analytics 4 — loads only when NEXT_PUBLIC_GA_ID is set (e.g. G-XXXXXXX),
 * so local/dev builds stay clean. Set the env var in your host (Vercel) to turn
 * on traffic measurement. Loaded after interaction so it never blocks paint.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
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
