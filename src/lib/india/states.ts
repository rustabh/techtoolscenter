/**
 * Indian states & their official e-District / citizen-service portals.
 * Powers state-level landing pages that target high-volume long-tail queries
 * like "domicile certificate up" or "caste certificate maharashtra".
 *
 * These pages are an educational navigation directory — we link out to the
 * official state portal and to our detailed national service guides. Always
 * verify the current portal on the official state government website.
 */
export interface IndiaState {
  slug: string;
  name: string;
  portalName: string; // official e-District / citizen-services portal
  portalUrl: string;
  note?: string; // short state-specific context
}

/** Certificates & documents that are issued at the STATE level (via e-District). */
export const STATE_SERVICE_SLUGS = [
  "income-certificate",
  "caste-certificate",
  "domicile-certificate",
  "ews-certificate",
  "birth-certificate",
  "death-certificate",
  "marriage-certificate",
  "ration-card",
  "disability-certificate",
] as const;

export const indiaStates: IndiaState[] = [
  { slug: "uttar-pradesh", name: "Uttar Pradesh", portalName: "e-District Uttar Pradesh", portalUrl: "https://edistrict.up.gov.in", note: "Most UP certificates are applied through the e-District UP portal or a nearby Jan Seva Kendra (CSC)." },
  { slug: "maharashtra", name: "Maharashtra", portalName: "Aaple Sarkar (Maharashtra)", portalUrl: "https://aaplesarkar.mahaonline.gov.in", note: "Maharashtra offers most citizen services through the Aaple Sarkar (RTS) portal." },
  { slug: "bihar", name: "Bihar", portalName: "Service Plus / RTPS Bihar", portalUrl: "https://serviceonline.bihar.gov.in", note: "Bihar's RTPS services are delivered through the Service Plus portal." },
  { slug: "madhya-pradesh", name: "Madhya Pradesh", portalName: "MP e-District", portalUrl: "https://mpedistrict.gov.in", note: "MP certificates are issued via the MP e-District portal and Lok Seva Kendras." },
  { slug: "rajasthan", name: "Rajasthan", portalName: "SSO Rajasthan / e-Mitra", portalUrl: "https://sso.rajasthan.gov.in", note: "Rajasthan services are accessed through the SSO portal and e-Mitra kiosks." },
  { slug: "west-bengal", name: "West Bengal", portalName: "e-District West Bengal", portalUrl: "https://edistrict.wb.gov.in", note: "West Bengal issues certificates through its e-District portal." },
  { slug: "tamil-nadu", name: "Tamil Nadu", portalName: "e-Sevai (TN e-District)", portalUrl: "https://tnedistrict.tn.gov.in", note: "Tamil Nadu certificates are applied through the e-Sevai / TN e-District portal." },
  { slug: "karnataka", name: "Karnataka", portalName: "Nadakacheri (Karnataka)", portalUrl: "https://nadakacheri.karnataka.gov.in", note: "Karnataka issues most certificates through the Nadakacheri (Atalji Janasnehi) portal." },
  { slug: "gujarat", name: "Gujarat", portalName: "Digital Gujarat", portalUrl: "https://www.digitalgujarat.gov.in", note: "Gujarat services are delivered through the Digital Gujarat portal." },
  { slug: "delhi", name: "Delhi", portalName: "e-District Delhi", portalUrl: "https://edistrict.delhigovt.nic.in", note: "Delhi certificates are applied through the e-District Delhi portal." },
  { slug: "telangana", name: "Telangana", portalName: "MeeSeva (Telangana)", portalUrl: "https://ts.meeseva.telangana.gov.in", note: "Telangana services are delivered through the MeeSeva portal and centres." },
  { slug: "andhra-pradesh", name: "Andhra Pradesh", portalName: "AP MeeSeva / Grama-Ward Sachivalayam", portalUrl: "https://ap.meeseva.gov.in", note: "Andhra Pradesh services are accessed through MeeSeva and the Sachivalayam system." },
  { slug: "kerala", name: "Kerala", portalName: "e-District Kerala", portalUrl: "https://edistrict.kerala.gov.in", note: "Kerala certificates are applied through the e-District Kerala portal and Akshaya centres." },
  { slug: "punjab", name: "Punjab", portalName: "Punjab e-Services", portalUrl: "https://eservices.punjab.gov.in", note: "Punjab services are delivered through the Punjab e-Services / Sewa Kendra network." },
  { slug: "haryana", name: "Haryana", portalName: "Antyodaya-SARAL (Haryana)", portalUrl: "https://saralharyana.gov.in", note: "Haryana services are delivered through the Antyodaya-SARAL portal." },
];

export function getIndiaState(slug: string): IndiaState | undefined {
  return indiaStates.find((s) => s.slug === slug);
}
