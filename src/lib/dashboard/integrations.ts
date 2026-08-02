/**
 * External-data integration points for the Growth Dashboard — Search
 * Console (SEO rankings/keywords), GA4 (Users), AdSense/affiliate (Revenue),
 * and keyword-research (Content Opportunities).
 *
 * None of these are implemented against a live API yet: this build
 * environment has no outbound network access and no credentials, so any
 * fetch logic here couldn't be tested against the real API shape — shipping
 * unverified integration code would be worse than being honest that it
 * isn't connected. Each function below only checks whether the required
 * env vars are present and returns a typed "not connected" status with
 * exact setup instructions; wiring in the real API call is a follow-up
 * task once credentials exist and can be tested against them.
 */

export interface IntegrationStatus {
  connected: boolean;
  name: string;
  missingEnvVars: string[];
  setupSteps: string[];
  docsUrl: string;
}

export function searchConsoleStatus(): IntegrationStatus {
  const required = ["GOOGLE_SEARCH_CONSOLE_SITE_URL", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"];
  const missing = required.filter((k) => !process.env[k]);
  return {
    connected: missing.length === 0,
    name: "Google Search Console",
    missingEnvVars: missing,
    setupSteps: [
      "In Google Search Console, confirm techtoolscenter.com is a verified property.",
      "In Google Cloud Console, create (or reuse) a project, enable the 'Search Console API'.",
      "Create a service account, download its JSON key.",
      "In Search Console → Settings → Users and permissions, add the service account's email as a Restricted or Full user.",
      "Set env vars: GOOGLE_SEARCH_CONSOLE_SITE_URL (e.g. https://techtoolscenter.com/), GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY (from the JSON key).",
      "Add the 'googleapis' npm package and implement searchanalytics.query in a new src/lib/dashboard/integrations/search-console.ts — this file only checks configuration today.",
    ],
    docsUrl: "https://developers.google.com/webmaster-tools/v1/searchanalytics/query",
  };
}

export function ga4Status(): IntegrationStatus {
  const required = ["GA4_PROPERTY_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"];
  const missing = required.filter((k) => !process.env[k]);
  return {
    connected: missing.length === 0,
    name: "Google Analytics 4 (Data API)",
    missingEnvVars: missing,
    setupSteps: [
      "Find your GA4 property ID (Admin → Property Settings).",
      "In Google Cloud Console (same project as Search Console works fine), enable the 'Google Analytics Data API'.",
      "In GA4 Admin → Property Access Management, add the service account email as a Viewer.",
      "Set env vars: GA4_PROPERTY_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY (can reuse the same service account as Search Console).",
      "Add '@google-analytics/data' npm package and implement a runReport call for country/device/browser/session/bounce-rate dimensions.",
    ],
    docsUrl: "https://developers.google.com/analytics/devguides/reporting/data/v1",
  };
}

export function adsenseStatus(): IntegrationStatus {
  const required = ["ADSENSE_ACCOUNT_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"];
  const missing = required.filter((k) => !process.env[k]);
  return {
    connected: missing.length === 0,
    name: "AdSense Management API",
    missingEnvVars: missing,
    setupSteps: [
      "In Google Cloud Console, enable the 'AdSense Management API'.",
      "AdSense reporting access via service account requires the account be added as a user on the AdSense account (Admin → Access and authorization), or use OAuth with your own AdSense login instead — service accounts have limited AdSense support, check current Google docs before choosing an auth path.",
      "Find your AdSense publisher/account ID (starts with pub- or ca-pub-).",
      "Affiliate and sponsored-listing revenue have no public API — those numbers would need to come from wherever you already track them (a spreadsheet, an affiliate network's own dashboard export) fed in manually or via their specific network's API if one exists.",
      "Set env vars: ADSENSE_ACCOUNT_ID, plus the shared Google service account vars above once the auth path is confirmed.",
    ],
    docsUrl: "https://developers.google.com/adsense/management/reporting",
  };
}

export function keywordResearchStatus(): IntegrationStatus {
  const configured = !!process.env.KEYWORD_RESEARCH_API_KEY;
  return {
    connected: configured,
    name: "Keyword research (volume & competition)",
    missingEnvVars: configured ? [] : ["KEYWORD_RESEARCH_API_KEY"],
    setupSteps: [
      "There is no free API for real search-volume/competition numbers. Search Console tells you impressions/clicks for keywords you already rank for, but not volume for keywords you don't rank for yet.",
      "Realistic options: (a) Google Ads API's Keyword Planner endpoint — requires an active Google Ads account with billing set up, even if you never run an ad; (b) a paid third-party API — Ahrefs, SEMrush, or Ubersuggest all offer one with a subscription.",
      "Once you pick one, set KEYWORD_RESEARCH_API_KEY (and any account/customer ID it needs) and this section will need its own fetch implementation — the shape of 'suggested articles/comparison/programmatic pages' depends entirely on which provider you choose.",
    ],
    docsUrl: "https://developers.google.com/google-ads/api/docs/keyword-planning/overview",
  };
}
