/**
 * Major Indian cities → local government-service context.
 * Powers city landing pages targeting high-volume local queries like
 * "passport office mumbai", "rto pune", "birth certificate delhi".
 *
 * Educational navigation only — we link to national service guides and the
 * parent state's official portal; we are not a government body.
 */
export interface IndiaCity {
  slug: string;
  name: string;
  state: string; // matching indiaStates slug
  stateName: string;
  note?: string; // short local context
}

/** Services people most often need at a city / local-office level. */
export const CITY_SERVICE_SLUGS = [
  "passport",
  "driving-licence",
  "vehicle-rc",
  "birth-certificate",
  "death-certificate",
  "marriage-certificate",
  "income-certificate",
  "ration-card",
  "aadhaar-card",
] as const;

export const indiaCities: IndiaCity[] = [
  { slug: "mumbai", name: "Mumbai", state: "maharashtra", stateName: "Maharashtra", note: "Passport work is handled at the Mumbai PSKs; certificates come from the BMC (Municipal Corporation of Greater Mumbai)." },
  { slug: "delhi", name: "Delhi", state: "delhi", stateName: "Delhi", note: "Delhi has multiple PSKs and RTOs; birth, death and other certificates are issued via e-District Delhi and the MCD." },
  { slug: "bengaluru", name: "Bengaluru", state: "karnataka", stateName: "Karnataka", note: "Bengaluru certificates come through Nadakacheri and BBMP; RTO services via the Karnataka Parivahan portal." },
  { slug: "hyderabad", name: "Hyderabad", state: "telangana", stateName: "Telangana", note: "Hyderabad services run through MeeSeva centres and the GHMC for civic certificates." },
  { slug: "chennai", name: "Chennai", state: "tamil-nadu", stateName: "Tamil Nadu", note: "Chennai certificates are issued via e-Sevai and the Greater Chennai Corporation." },
  { slug: "kolkata", name: "Kolkata", state: "west-bengal", stateName: "West Bengal", note: "Kolkata civic certificates come from the KMC; state services via e-District West Bengal." },
  { slug: "pune", name: "Pune", state: "maharashtra", stateName: "Maharashtra", note: "Pune uses Aaple Sarkar for certificates and the PMC for civic records; several PSKs serve the city." },
  { slug: "ahmedabad", name: "Ahmedabad", state: "gujarat", stateName: "Gujarat", note: "Ahmedabad services run through Digital Gujarat and the AMC for civic certificates." },
  { slug: "jaipur", name: "Jaipur", state: "rajasthan", stateName: "Rajasthan", note: "Jaipur services are accessed through e-Mitra kiosks and the SSO Rajasthan portal." },
  { slug: "lucknow", name: "Lucknow", state: "uttar-pradesh", stateName: "Uttar Pradesh", note: "Lucknow certificates come via e-District UP and Jan Seva Kendras; the city has its own PSK and RTOs." },
  { slug: "kanpur", name: "Kanpur", state: "uttar-pradesh", stateName: "Uttar Pradesh", note: "Kanpur services run through e-District UP and the Nagar Nigam for civic certificates." },
  { slug: "nagpur", name: "Nagpur", state: "maharashtra", stateName: "Maharashtra", note: "Nagpur uses Aaple Sarkar and the NMC; it has a Passport Seva Kendra and RTOs." },
  { slug: "indore", name: "Indore", state: "madhya-pradesh", stateName: "Madhya Pradesh", note: "Indore certificates come via MP e-District and Lok Seva Kendras." },
  { slug: "bhopal", name: "Bhopal", state: "madhya-pradesh", stateName: "Madhya Pradesh", note: "Bhopal services run through MP e-District and the Municipal Corporation." },
  { slug: "patna", name: "Patna", state: "bihar", stateName: "Bihar", note: "Patna services are delivered through Bihar's Service Plus (RTPS) portal and RTPS counters." },
  { slug: "surat", name: "Surat", state: "gujarat", stateName: "Gujarat", note: "Surat uses Digital Gujarat and the SMC for civic certificates." },
  { slug: "vadodara", name: "Vadodara", state: "gujarat", stateName: "Gujarat", note: "Vadodara services run through Digital Gujarat and the VMC." },
  { slug: "ghaziabad", name: "Ghaziabad", state: "uttar-pradesh", stateName: "Uttar Pradesh", note: "Ghaziabad certificates come via e-District UP and the Nagar Nigam." },
  { slug: "noida", name: "Noida", state: "uttar-pradesh", stateName: "Uttar Pradesh", note: "Noida (Gautam Buddh Nagar) services run through e-District UP and local Jan Seva Kendras." },
  { slug: "coimbatore", name: "Coimbatore", state: "tamil-nadu", stateName: "Tamil Nadu", note: "Coimbatore certificates are issued via e-Sevai and the City Municipal Corporation." },
  { slug: "kochi", name: "Kochi", state: "kerala", stateName: "Kerala", note: "Kochi services run through e-District Kerala and Akshaya centres." },
  { slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "kerala", stateName: "Kerala", note: "Thiruvananthapuram certificates come via e-District Kerala and Akshaya centres." },
  { slug: "chandigarh", name: "Chandigarh", state: "punjab", stateName: "Punjab", note: "Chandigarh has its own Passport Seva Kendra and Sampark centres for civic services." },
  { slug: "ludhiana", name: "Ludhiana", state: "punjab", stateName: "Punjab", note: "Ludhiana services run through Punjab Sewa Kendras and the e-Services portal." },
  { slug: "gurugram", name: "Gurugram", state: "haryana", stateName: "Haryana", note: "Gurugram services are delivered through the Antyodaya-SARAL portal and centres." },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "andhra-pradesh", stateName: "Andhra Pradesh", note: "Visakhapatnam services run through MeeSeva and the Grama-Ward Sachivalayam system." },
];

export function getIndiaCity(slug: string): IndiaCity | undefined {
  return indiaCities.find((c) => c.slug === slug);
}
