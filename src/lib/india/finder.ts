/**
 * "Which document / certificate do I need?" — deterministic goal → services map.
 * Powers an interactive finder that turns a real-life goal (get a passport,
 * college admission, a government job, a welfare scheme…) into the exact set of
 * India Services to apply for, with internal links to each guide.
 */
export interface FinderGoal {
  slug: string;
  label: string; // the user's goal, in plain words
  icon: string; // emoji
  intro: string; // one line of context
  serviceSlugs: string[]; // recommended services, most important first
}

export const finderGoals: FinderGoal[] = [
  {
    slug: "passport-visa",
    label: "Apply for a passport or visa",
    icon: "🛂",
    intro: "For a passport or visa you'll usually need proof of identity, address, date of birth and often a police clearance.",
    serviceSlugs: ["passport", "police-clearance-certificate", "birth-certificate", "aadhaar-card", "pan-card"],
  },
  {
    slug: "college-admission",
    label: "College admission / scholarship",
    icon: "🎓",
    intro: "Admissions and scholarships often ask for domicile, income and category certificates plus your ID.",
    serviceSlugs: ["domicile-certificate", "income-certificate", "caste-certificate", "ews-certificate", "scholarship", "aadhaar-card"],
  },
  {
    slug: "government-job",
    label: "Apply for a government job",
    icon: "🏛️",
    intro: "Most government jobs need domicile, category and identity proofs — and often an EWS or income certificate.",
    serviceSlugs: ["domicile-certificate", "caste-certificate", "ews-certificate", "income-certificate", "aadhaar-card", "pan-card"],
  },
  {
    slug: "getting-married",
    label: "Getting married / marriage proof",
    icon: "💍",
    intro: "Register your marriage for a legal certificate — needed for visas, name changes and joint accounts.",
    serviceSlugs: ["marriage-certificate", "aadhaar-card", "birth-certificate"],
  },
  {
    slug: "welfare-scheme",
    label: "Apply for a welfare scheme / subsidy",
    icon: "🤝",
    intro: "Welfare schemes usually verify identity and income, and many are linked to your ration card and bank account.",
    serviceSlugs: ["ration-card", "income-certificate", "jan-dhan-yojana", "ayushman-bharat", "aadhaar-card"],
  },
  {
    slug: "start-business",
    label: "Start or register a business",
    icon: "💼",
    intro: "New businesses typically need a PAN, GST registration and an Udyam (MSME) registration.",
    serviceSlugs: ["pan-card", "gst-registration", "msme-udyam", "aadhaar-card", "itr-filing"],
  },
  {
    slug: "buy-vehicle",
    label: "Buy or drive a vehicle",
    icon: "🚗",
    intro: "To drive and own a vehicle you need a driving licence, RC, FASTag — and a way to check challans.",
    serviceSlugs: ["driving-licence", "vehicle-rc", "fastag", "e-challan"],
  },
  {
    slug: "open-bank-account",
    label: "Open a bank account / manage money",
    icon: "🏦",
    intro: "For banking you need ID and address proof; a zero-balance Jan Dhan account and a good credit score help.",
    serviceSlugs: ["jan-dhan-yojana", "aadhaar-card", "pan-card", "cibil-score", "sukanya-samriddhi-yojana"],
  },
  {
    slug: "new-job-salaried",
    label: "Start a salaried job",
    icon: "🧑‍💼",
    intro: "Salaried employees are covered by PF (EPFO) and ESIC, and need a PAN linked to Aadhaar for taxes.",
    serviceSlugs: ["pan-card", "pan-aadhaar-link", "epfo", "esic", "itr-filing"],
  },
  {
    slug: "health-medical",
    label: "Health & medical benefits",
    icon: "🏥",
    intro: "Create a digital health ID and check your eligibility for free treatment schemes.",
    serviceSlugs: ["abha-health-id", "ayushman-bharat", "aadhaar-card"],
  },
  {
    slug: "farmer-support",
    label: "Farmer support & credit",
    icon: "🌾",
    intro: "Farmers can claim income support and get affordable credit through dedicated schemes.",
    serviceSlugs: ["pm-kisan", "kisan-credit-card", "aadhaar-card", "jan-dhan-yojana"],
  },
  {
    slug: "lost-death-family",
    label: "After a death in the family",
    icon: "🕊️",
    intro: "A death certificate is the first document you'll need to settle insurance, pension and inheritance.",
    serviceSlugs: ["death-certificate", "aadhaar-card"],
  },
];

export function getFinderGoal(slug: string): FinderGoal | undefined {
  return finderGoals.find((g) => g.slug === slug);
}
