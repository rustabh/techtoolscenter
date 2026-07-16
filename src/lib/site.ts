export const siteConfig = {
  name: "UtilityHub",
  shortName: "UtilityHub",
  description:
    "UtilityHub is a premium collection of free, fast, privacy-first online tools — invoice makers, PDF utilities, calculators, generators and more. Everything runs in your browser.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://utilityhub.app",
  ogImage: "/opengraph-image.png",
  twitter: "@utilityhub",
  keywords: [
    "online tools",
    "free tools",
    "invoice maker",
    "gst calculator",
    "emi calculator",
    "pdf tools",
    "qr generator",
    "resume builder",
    "utility tools",
  ],
  author: "UtilityHub",
};

export type SiteConfig = typeof siteConfig;
