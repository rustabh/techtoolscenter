/**
 * "Check status" registry — the things Indians look up again and again.
 * Each links to the official tracker and (where relevant) a detailed guide.
 * Educational navigation only.
 */
export interface StatusCheck {
  slug: string;
  name: string; // e.g. "PAN Card Status"
  what: string; // one line
  officialUrl: string;
  need: string; // what you need to check (e.g. "Acknowledgement / PAN number")
  steps: string[];
  relatedService?: string; // india service slug
  keywords: string[];
}

export const statusChecks: StatusCheck[] = [
  {
    slug: "pan-card-status",
    name: "PAN Card Status",
    what: "Track a new PAN or correction application.",
    officialUrl: "https://www.incometax.gov.in",
    need: "Acknowledgement number (or PAN + details)",
    steps: [
      "Go to the Income Tax portal (or your applying agency — Protean/UTIITSL).",
      "Open the PAN application status / track option.",
      "Enter your acknowledgement number and details.",
      "View the current status of your PAN application.",
    ],
    relatedService: "pan-card",
    keywords: ["pan card status", "pan status", "check pan application", "epan status"],
  },
  {
    slug: "pan-aadhaar-link-status",
    name: "PAN–Aadhaar Link Status",
    what: "See if your PAN and Aadhaar are already linked.",
    officialUrl: "https://www.incometax.gov.in/iec/foportal/help/individual/link-aadhaar-status",
    need: "PAN + Aadhaar number",
    steps: [
      "Open the Income Tax portal and choose 'Link Aadhaar Status'.",
      "Enter your PAN and Aadhaar number.",
      "View whether they're linked or the request is pending.",
    ],
    relatedService: "pan-aadhaar-link",
    keywords: ["pan aadhaar link status", "link aadhaar status", "check pan aadhaar linked"],
  },
  {
    slug: "passport-status",
    name: "Passport Status",
    what: "Track your passport application and police verification.",
    officialUrl: "https://www.passportindia.gov.in",
    need: "Application / file number + DOB",
    steps: [
      "Open the Passport Seva portal.",
      "Use 'Track Application Status'.",
      "Enter your file number and date of birth.",
      "View application and police verification status.",
    ],
    relatedService: "passport",
    keywords: ["passport status", "track passport", "passport application status", "police verification status"],
  },
  {
    slug: "pf-claim-status",
    name: "PF / EPF Claim Status",
    what: "Track your PF withdrawal or transfer claim.",
    officialUrl: "https://www.epfindia.gov.in",
    need: "UAN + password (or via UMANG)",
    steps: [
      "Sign in to the EPFO member portal with your UAN.",
      "Open 'Online Services → Track Claim Status'.",
      "View your claim (Form 19/10C/31) status.",
      "You can also check the passbook via the official UMANG app.",
    ],
    relatedService: "epfo",
    keywords: ["pf claim status", "epf status", "pf withdrawal status", "uan claim status"],
  },
  {
    slug: "pm-kisan-status",
    name: "PM-KISAN Beneficiary Status",
    what: "Check your PM-KISAN instalment / beneficiary status.",
    officialUrl: "https://pmkisan.gov.in",
    need: "Registered mobile / Aadhaar / account",
    steps: [
      "Open the PM-KISAN portal.",
      "Click 'Beneficiary Status'.",
      "Enter your registered number.",
      "View your instalment history and e-KYC status.",
    ],
    relatedService: "pm-kisan",
    keywords: ["pm kisan status", "pmkisan beneficiary status", "kisan installment status", "pm-kisan status"],
  },
  {
    slug: "ration-card-status",
    name: "Ration Card Status",
    what: "Track a new ration card or correction application.",
    officialUrl: "https://nfsa.gov.in",
    need: "Application / reference number (state portal)",
    steps: [
      "Open your state's Food & Civil Supplies / PDS portal (linked from NFSA).",
      "Find the ration-card application status option.",
      "Enter your reference/application number.",
      "View the current status.",
    ],
    relatedService: "ration-card",
    keywords: ["ration card status", "check ration card", "ration card application status", "nfsa status"],
  },
  {
    slug: "aadhaar-update-status",
    name: "Aadhaar Update Status",
    what: "Track an Aadhaar update (address, mobile, etc.).",
    officialUrl: "https://uidai.gov.in",
    need: "URN / SRN (update request number)",
    steps: [
      "Open the official UIDAI portal.",
      "Choose the 'Check Aadhaar Update Status' option.",
      "Enter your URN/SRN and details.",
      "View whether the update is processed.",
    ],
    relatedService: "aadhaar-card",
    keywords: ["aadhaar update status", "aadhar status", "check aadhaar update", "urn status"],
  },
  {
    slug: "traffic-challan-status",
    name: "Traffic Challan Status",
    what: "Check pending traffic e-challans on your vehicle.",
    officialUrl: "https://echallan.parivahan.gov.in",
    need: "Vehicle / challan / DL number",
    steps: [
      "Open the eChallan portal.",
      "Choose 'Check Challan Status'.",
      "Enter your vehicle/challan/DL number and verify via OTP.",
      "View and pay any pending challans.",
    ],
    relatedService: "e-challan",
    keywords: ["challan status", "e challan status", "traffic challan check", "echallan status"],
  },
  {
    slug: "voter-id-status",
    name: "Voter ID (EPIC) Status",
    what: "Track a new voter registration or correction (Form 6/8).",
    officialUrl: "https://voters.eci.gov.in",
    need: "Reference ID",
    steps: [
      "Open the Voter Services Portal.",
      "Use 'Track Application Status'.",
      "Enter your reference ID.",
      "View the status of your Form 6/8 application.",
    ],
    relatedService: "voter-id",
    keywords: ["voter id status", "epic status", "voter application status", "track voter id"],
  },
  {
    slug: "driving-licence-status",
    name: "Driving Licence / RC Status",
    what: "Track DL or vehicle RC application at your RTO.",
    officialUrl: "https://parivahan.gov.in",
    need: "Application number",
    steps: [
      "Open the Parivahan / Sarathi portal for your state.",
      "Use the application status option.",
      "Enter your application number.",
      "View DL/RC application status.",
    ],
    relatedService: "driving-licence",
    keywords: ["driving licence status", "dl status", "rc status", "parivahan status", "track dl"],
  },
  {
    slug: "income-tax-refund-status",
    name: "Income Tax Refund Status",
    what: "Track your ITR processing and refund.",
    officialUrl: "https://www.incometax.gov.in",
    need: "PAN + assessment year (login)",
    steps: [
      "Log in to the Income Tax e-filing portal.",
      "Open 'e-File → Income Tax Returns → View Filed Returns'.",
      "Select the assessment year to see processing and refund status.",
    ],
    relatedService: "itr-filing",
    keywords: ["income tax refund status", "itr refund status", "tax refund status", "refund status"],
  },
  {
    slug: "scholarship-status",
    name: "Scholarship (NSP) Status",
    what: "Track your National Scholarship Portal application.",
    officialUrl: "https://scholarships.gov.in",
    need: "Application ID",
    steps: [
      "Open the National Scholarship Portal.",
      "Log in with your application credentials.",
      "Open your dashboard to view the application status.",
    ],
    relatedService: "scholarship",
    keywords: ["scholarship status", "nsp status", "scholarship application status", "check scholarship"],
  },
];

export function getStatusCheck(slug: string): StatusCheck | undefined {
  return statusChecks.find((s) => s.slug === slug);
}
