import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { siteConfig } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo/metadata";
import { organizationLd, websiteLd } from "@/lib/seo/schema";
import { PwaProvider } from "@/components/pwa/pwa-provider";
import { FileDropProvider } from "@/components/files/file-drop-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { IncincLauncher } from "@/components/incinc/incinc-launcher";
import { WorkspaceSidebar } from "@/components/sidebar/workspace-sidebar";
import { latestPostSummary } from "@/lib/blog/posts";
import { MobileBottomNav } from "@/components/navbar/mobile-bottom-nav";
import { ChromeGate } from "@/components/chrome-gate";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free Online Tools for Everyday Work`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Free Online Tools`,
    description: siteConfig.description,
    images: [defaultOgImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Free Online Tools`,
    description: siteConfig.description,
    images: [defaultOgImage()],
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: siteConfig.shortName },
  other: {
    "google-adsense-account": "ca-pub-8948395080060177",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070a14" },
  ],
  width: "device-width",
  initialScale: 1,
  // Lets the page draw edge-to-edge on notched/home-indicator devices and
  // makes env(safe-area-inset-*) resolve to real values instead of always 0
  // — needed for the fixed mobile bottom nav to clear the home indicator.
  viewportFit: "cover",
};

const orgJsonLd = organizationLd();
const siteJsonLd = websiteLd();
const latestBlogPost = latestPostSummary();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-dvh font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ChromeGate>
            <div className="glow pointer-events-none fixed inset-x-0 top-0 h-[400px]" aria-hidden />
            <Navbar />
            <CommandPalette />
          </ChromeGate>
          <main id="main" className="relative">{children}</main>
          <ChromeGate>
            <Footer />
            {/* Reserves space so the fixed mobile bottom nav never covers the
                last bit of page content — matches the nav's own height plus
                the device's home-indicator inset. */}
            <div className="h-16 md:hidden" style={{ height: "calc(4rem + env(safe-area-inset-bottom))" }} aria-hidden />
            <PwaProvider />
            <FileDropProvider />
            <ConsentBanner />
            <WorkspaceSidebar latestBlogPost={latestBlogPost} />
            <IncincLauncher />
            <MobileBottomNav />
          </ChromeGate>
          <Toaster />
        </ThemeProvider>
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Script id="ld-site" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <Script
          id="adsbygoogle-init"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8948395080060177"
        />
        <Analytics />
      </body>
    </html>
  );
}
