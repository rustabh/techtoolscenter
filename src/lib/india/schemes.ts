import type { FaqItem } from "../tools";

/**
 * Government schemes (yojanas) registry — educational directory.
 * We are not a government body; every scheme links to its official portal.
 * Some flagship schemes also exist as India Services (linked via relatedService).
 */
export interface SchemeAudience {
  slug: string;
  label: string;
  icon: string; // emoji
}

export const schemeAudiences: SchemeAudience[] = [
  { slug: "women", label: "Women & girls", icon: "👩" },
  { slug: "farmers", label: "Farmers", icon: "🌾" },
  { slug: "workers", label: "Workers & informal sector", icon: "👷" },
  { slug: "students", label: "Students & youth", icon: "🎓" },
  { slug: "seniors", label: "Senior citizens", icon: "🧓" },
  { slug: "entrepreneurs", label: "Business & entrepreneurs", icon: "💼" },
  { slug: "housing", label: "Housing", icon: "🏠" },
  { slug: "health", label: "Health & insurance", icon: "🏥" },
];

export interface Scheme {
  slug: string;
  name: string;
  fullName?: string;
  audiences: string[]; // audience slugs
  ministry: string;
  officialUrl: string;
  tagline: string; // one-line benefit
  overview: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  steps: string[];
  faq: FaqItem[];
  relatedService?: string; // india service slug if it exists
  relatedSchemes?: string[];
  keywords: string[];
  popular?: boolean;
  updatedOn?: string;
}

export const schemes: Scheme[] = [
  {
    slug: "ujjwala-yojana",
    name: "PM Ujjwala Yojana",
    fullName: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    audiences: ["women", "workers"],
    ministry: "Ministry of Petroleum & Natural Gas",
    officialUrl: "https://www.pmuy.gov.in",
    tagline: "Free LPG gas connection for women of low-income households.",
    overview:
      "PM Ujjwala Yojana provides a free LPG connection to women from eligible low-income households, aiming to replace unhealthy cooking fuels with clean cooking gas. Beneficiaries also receive support for the first refill and stove in many cases.",
    benefits: ["Free LPG connection deposit", "Support towards first refill and stove (as applicable)", "Cleaner, safer cooking fuel"],
    eligibility: ["Adult woman from an eligible low-income household", "No existing LPG connection in the household", "As per the official beneficiary criteria"],
    documents: ["Aadhaar", "Ration card / eligibility proof", "Bank account details", "Passport-size photograph"],
    steps: [
      "Visit the official PMUY portal (pmuy.gov.in).",
      "Choose your LPG distributor (Indane, Bharatgas or HP Gas).",
      "Fill the Ujjwala connection application (KYC).",
      "Submit documents to the distributor.",
      "Receive your new LPG connection.",
    ],
    faq: [
      { question: "Who can apply for Ujjwala Yojana?", answer: "An adult woman from an eligible low-income household with no existing LPG connection, subject to the official criteria." },
      { question: "Is the Ujjwala connection really free?", answer: "The connection deposit is covered by the government, and eligible beneficiaries get support for the first refill and stove; ongoing refills are paid as usual (with subsidy where applicable)." },
    ],
    relatedSchemes: ["jan-dhan-scheme", "pm-suraksha-bima"],
    keywords: ["ujjwala yojana", "pmuy", "free gas connection", "lpg yojana", "ujjwala"],
    popular: true,
    updatedOn: "2026-07-19",
  },
  {
    slug: "pm-awas-yojana",
    name: "PM Awas Yojana",
    fullName: "Pradhan Mantri Awas Yojana (PMAY)",
    audiences: ["housing", "workers"],
    ministry: "Ministry of Housing & Urban Affairs / Rural Development",
    officialUrl: "https://pmaymis.gov.in",
    tagline: "Financial help to build or buy a pucca house.",
    overview:
      "Pradhan Mantri Awas Yojana helps eligible families own a pucca house, through the urban (PMAY-U) and rural (PMAY-G) components. Benefits include financial assistance and an interest subsidy on home loans for eligible income groups.",
    benefits: ["Financial assistance towards a house", "Interest subsidy on home loans (CLSS, as applicable)", "Focus on women ownership / co-ownership"],
    eligibility: ["Families without a pucca house, as per the official criteria", "Income-group and other conditions per PMAY-U / PMAY-G"],
    documents: ["Aadhaar", "Income proof", "Bank account details", "Proof of not owning a pucca house (as required)"],
    steps: [
      "Check eligibility on the official PMAY portal (pmaymis.gov.in) or via your local body / gram panchayat.",
      "Apply online (PMAY-U) or through the rural process (PMAY-G).",
      "Complete Aadhaar-based verification.",
      "Track your application and assessment.",
      "Receive assistance in stages as the house is built (where applicable).",
    ],
    faq: [
      { question: "What is the difference between PMAY-U and PMAY-G?", answer: "PMAY-U is for urban areas and PMAY-G (Gramin) is for rural areas; each has its own eligibility and application process." },
      { question: "Does PMAY give a home loan subsidy?", answer: "Eligible income groups can get an interest subsidy on home loans under the Credit Linked Subsidy Scheme (CLSS), subject to prevailing rules." },
    ],
    relatedSchemes: ["jan-dhan-scheme"],
    keywords: ["pm awas yojana", "pmay", "awas yojana", "housing scheme", "pradhan mantri awas"],
    popular: true,
    updatedOn: "2026-07-19",
  },
  {
    slug: "atal-pension-yojana",
    name: "Atal Pension Yojana",
    fullName: "Atal Pension Yojana (APY)",
    audiences: ["workers", "seniors"],
    ministry: "Ministry of Finance / PFRDA",
    officialUrl: "https://www.npscra.nsdl.co.in/scheme-details.php",
    tagline: "Guaranteed monthly pension after 60 for informal-sector workers.",
    overview:
      "Atal Pension Yojana is a government pension scheme mainly for unorganised-sector workers. You contribute a small amount monthly until age 60 and then receive a guaranteed pension of ₹1,000–₹5,000 per month based on your chosen plan.",
    benefits: ["Guaranteed monthly pension of ₹1,000–₹5,000 after 60", "Spouse continuation and nominee benefit", "Low, fixed contributions"],
    eligibility: ["Indian citizen aged 18–40", "With a savings bank account", "As per the current APY rules"],
    documents: ["Aadhaar", "Savings bank account", "Mobile number"],
    steps: [
      "Approach your bank or post office where you hold a savings account.",
      "Fill the APY registration form and choose your pension amount.",
      "Set up auto-debit for monthly contributions.",
      "Contribute regularly until age 60.",
      "Start receiving the guaranteed pension after 60.",
    ],
    faq: [
      { question: "Who can join Atal Pension Yojana?", answer: "Any Indian citizen aged 18–40 with a savings bank account can join and contribute until age 60." },
      { question: "How much pension does APY give?", answer: "A guaranteed pension between ₹1,000 and ₹5,000 per month after age 60, depending on your chosen plan and contribution." },
    ],
    relatedSchemes: ["jan-dhan-scheme", "pm-jeevan-jyoti-bima"],
    keywords: ["atal pension yojana", "apy", "pension scheme", "government pension", "apy scheme"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "mudra-loan",
    name: "PM Mudra Loan",
    fullName: "Pradhan Mantri Mudra Yojana (PMMY)",
    audiences: ["entrepreneurs", "women"],
    ministry: "Ministry of Finance / MUDRA",
    officialUrl: "https://www.mudra.org.in",
    tagline: "Collateral-free loans up to ₹10 lakh for small businesses.",
    overview:
      "Pradhan Mantri Mudra Yojana offers collateral-free loans to non-corporate, non-farm small and micro enterprises through banks and MFIs. Loans are given under three categories — Shishu, Kishor and Tarun — based on the funding need.",
    benefits: ["Collateral-free loans up to ₹10 lakh", "Shishu / Kishor / Tarun categories", "For new and existing micro-enterprises"],
    eligibility: ["Non-farm micro/small enterprises (manufacturing, trading, services)", "Individuals, proprietors, partnerships and more"],
    documents: ["Identity and address proof", "Business plan / details", "Bank account details", "Category-specific documents as asked by the lender"],
    steps: [
      "Prepare your business details and funding requirement.",
      "Approach a bank, NBFC or MFI (or apply via the Udyami Mitra / Jan Samarth channels).",
      "Fill the Mudra loan application under Shishu/Kishor/Tarun.",
      "Submit documents and business details.",
      "On approval, receive the loan / MUDRA card.",
    ],
    faq: [
      { question: "What is the maximum Mudra loan amount?", answer: "Up to ₹10 lakh, split into Shishu (up to ₹50,000), Kishor (₹50,000–₹5 lakh) and Tarun (₹5–₹10 lakh)." },
      { question: "Is collateral needed for a Mudra loan?", answer: "No, Mudra loans are collateral-free, though approval depends on the lender's assessment of your business." },
    ],
    relatedService: "msme-udyam",
    relatedSchemes: ["stand-up-india"],
    keywords: ["mudra loan", "pmmy", "mudra yojana", "business loan", "shishu kishor tarun"],
    popular: true,
    updatedOn: "2026-07-19",
  },
  {
    slug: "stand-up-india",
    name: "Stand-Up India",
    fullName: "Stand-Up India Scheme",
    audiences: ["entrepreneurs", "women"],
    ministry: "Department of Financial Services",
    officialUrl: "https://www.standupmitra.in",
    tagline: "Bank loans ₹10 lakh–₹1 crore for women and SC/ST entrepreneurs.",
    overview:
      "Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one woman and one SC/ST borrower per bank branch, for setting up a greenfield (new) enterprise in manufacturing, services or trading.",
    benefits: ["Loans from ₹10 lakh to ₹1 crore", "For women and SC/ST entrepreneurs", "Handholding support via Stand-Up Mitra"],
    eligibility: ["Women and SC/ST entrepreneurs aged 18+", "For a new (greenfield) enterprise", "Not in default to any bank/NBFC"],
    documents: ["Identity and address proof", "Business project / plan", "Category proof (for SC/ST)", "Bank-required documents"],
    steps: [
      "Register on the Stand-Up Mitra portal (standupmitra.in).",
      "Complete your profile and readiness assessment.",
      "Apply to the bank branch with your project details.",
      "Submit documents and business plan.",
      "On approval, receive the term loan / working capital.",
    ],
    faq: [
      { question: "Who is eligible for Stand-Up India?", answer: "Women entrepreneurs and SC/ST entrepreneurs aged 18+ setting up a new enterprise are eligible for loans between ₹10 lakh and ₹1 crore." },
    ],
    relatedSchemes: ["mudra-loan"],
    keywords: ["stand up india", "standup india", "women entrepreneur loan", "sc st loan", "standupmitra"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "beti-bachao-beti-padhao",
    name: "Beti Bachao Beti Padhao",
    fullName: "Beti Bachao Beti Padhao (BBBP)",
    audiences: ["women", "students"],
    ministry: "Ministry of Women & Child Development",
    officialUrl: "https://wcd.nic.in",
    tagline: "Protecting and educating the girl child.",
    overview:
      "Beti Bachao Beti Padhao aims to prevent gender-biased sex selection and ensure the survival, protection and education of the girl child through awareness and improved delivery of welfare services. It works alongside savings schemes like Sukanya Samriddhi Yojana.",
    benefits: ["Awareness and protection for girls", "Push for girls' education", "Links to girl-child savings (Sukanya Samriddhi)"],
    eligibility: ["A national awareness & welfare programme — benefits reach families with girl children through linked services"],
    documents: ["Depends on the linked service (e.g. Sukanya Samriddhi account, school admission)"],
    steps: [
      "Learn about the programme via the official WCD channels.",
      "Open a Sukanya Samriddhi account for your girl child.",
      "Ensure school enrolment and use linked education benefits.",
      "Access girl-child welfare services in your state.",
    ],
    faq: [
      { question: "Does Beti Bachao Beti Padhao give money directly?", answer: "It is primarily an awareness and welfare programme. Direct financial benefits for a girl child usually come through linked schemes like Sukanya Samriddhi Yojana and state programmes." },
    ],
    relatedService: "sukanya-samriddhi-yojana",
    keywords: ["beti bachao beti padhao", "bbbp", "girl child scheme", "beti padhao"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "pm-suraksha-bima",
    name: "PM Suraksha Bima Yojana",
    fullName: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    audiences: ["workers", "health"],
    ministry: "Ministry of Finance",
    officialUrl: "https://www.jansuraksha.gov.in",
    tagline: "Accident insurance cover at a very low yearly premium.",
    overview:
      "PMSBY is an accident insurance scheme offering cover for accidental death and disability at a very low annual premium, auto-debited from your bank account. It's aimed at giving affordable protection to a wide population.",
    benefits: ["Accidental death / disability cover", "Very low yearly premium", "Easy enrolment via your bank"],
    eligibility: ["Bank account holders aged 18–70", "With auto-debit consent for the annual premium"],
    documents: ["Savings bank account", "Aadhaar", "Consent form for auto-debit"],
    steps: [
      "Contact your bank (or use its app/net-banking).",
      "Opt in to PMSBY and give auto-debit consent.",
      "The annual premium is auto-debited each year.",
      "Nominee can claim the cover in case of an accident.",
    ],
    faq: [
      { question: "What does PMSBY cover?", answer: "It provides cover for accidental death and permanent disability, at a low annual premium auto-debited from your bank account." },
    ],
    relatedSchemes: ["pm-jeevan-jyoti-bima", "jan-dhan-scheme"],
    keywords: ["pm suraksha bima", "pmsby", "accident insurance", "jansuraksha", "suraksha bima yojana"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "pm-jeevan-jyoti-bima",
    name: "PM Jeevan Jyoti Bima Yojana",
    fullName: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    audiences: ["workers", "health"],
    ministry: "Ministry of Finance",
    officialUrl: "https://www.jansuraksha.gov.in",
    tagline: "Life insurance cover at an affordable yearly premium.",
    overview:
      "PMJJBY is a life insurance scheme offering a life cover on death due to any reason, at an affordable annual premium auto-debited from your bank account. It provides simple, accessible life protection.",
    benefits: ["Life cover on death (any reason)", "Affordable yearly premium", "Simple bank-based enrolment"],
    eligibility: ["Bank account holders aged 18–50 (cover can continue up to 55)", "With auto-debit consent"],
    documents: ["Savings bank account", "Aadhaar", "Consent form for auto-debit"],
    steps: [
      "Contact your bank or use its app/net-banking.",
      "Opt in to PMJJBY and give auto-debit consent.",
      "The annual premium is auto-debited each year.",
      "Nominee can claim the life cover.",
    ],
    faq: [
      { question: "Who can enrol in PMJJBY?", answer: "Bank account holders aged 18–50 can enrol; the life cover can continue up to age 55, subject to premium payment." },
    ],
    relatedSchemes: ["pm-suraksha-bima", "jan-dhan-scheme"],
    keywords: ["pm jeevan jyoti bima", "pmjjby", "life insurance scheme", "jansuraksha", "jeevan jyoti"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "pm-svanidhi",
    name: "PM SVANidhi",
    fullName: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    audiences: ["workers", "entrepreneurs"],
    ministry: "Ministry of Housing & Urban Affairs",
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    tagline: "Working-capital loans for street vendors.",
    overview:
      "PM SVANidhi provides affordable working-capital loans to street vendors to help them restart and grow their businesses, with incentives for timely repayment and digital transactions.",
    benefits: ["Working-capital loan (with higher limits on timely repayment)", "Interest subsidy on timely repayment", "Cashback on digital transactions"],
    eligibility: ["Street vendors with a Certificate of Vending / identification as per the scheme", "Urban street vendors covered by the survey"],
    documents: ["Identity proof (Aadhaar)", "Certificate of Vending / vendor ID (as applicable)", "Bank account details"],
    steps: [
      "Visit the official PM SVANidhi portal (pmsvanidhi.mohua.gov.in) or a facilitation centre.",
      "Register as a street vendor and complete the application.",
      "Submit documents and vendor identification.",
      "On approval, receive the working-capital loan.",
      "Repay on time to unlock higher limits and subsidy.",
    ],
    faq: [
      { question: "Who can get a PM SVANidhi loan?", answer: "Urban street vendors identified under the scheme (e.g. with a Certificate of Vending or covered by the vendor survey) can apply for working-capital loans." },
    ],
    relatedSchemes: ["mudra-loan"],
    keywords: ["pm svanidhi", "svanidhi", "street vendor loan", "svanidhi yojana"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "pm-vishwakarma",
    name: "PM Vishwakarma",
    fullName: "PM Vishwakarma Yojana",
    audiences: ["workers", "entrepreneurs"],
    ministry: "Ministry of MSME",
    officialUrl: "https://pmvishwakarma.gov.in",
    tagline: "Support, skilling and credit for traditional artisans & craftspeople.",
    overview:
      "PM Vishwakarma supports traditional artisans and craftspeople (such as carpenters, blacksmiths, potters, tailors and more) with recognition, skill training with a stipend, a toolkit incentive, and access to collateral-free credit.",
    benefits: ["Recognition via certificate and ID card", "Skill training with a stipend", "Toolkit incentive and collateral-free credit"],
    eligibility: ["Artisans/craftspeople in the notified trades", "Engaged in the trade as per the scheme criteria"],
    documents: ["Aadhaar", "Mobile number", "Bank account details", "Trade details"],
    steps: [
      "Visit the official PM Vishwakarma portal (pmvishwakarma.gov.in) or a CSC.",
      "Register with Aadhaar and your trade details.",
      "Complete verification.",
      "Undergo skill training and receive the stipend/toolkit incentive.",
      "Access collateral-free credit as applicable.",
    ],
    faq: [
      { question: "Which trades are covered under PM Vishwakarma?", answer: "Traditional trades such as carpenter, blacksmith, goldsmith, potter, cobbler, tailor, mason and several others notified under the scheme." },
    ],
    relatedService: "msme-udyam",
    keywords: ["pm vishwakarma", "vishwakarma yojana", "artisan scheme", "vishwakarma"],
    popular: true,
    updatedOn: "2026-07-19",
  },
  {
    slug: "pmkvy-skill-india",
    name: "Skill India (PMKVY)",
    fullName: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    audiences: ["students", "workers"],
    ministry: "Ministry of Skill Development & Entrepreneurship",
    officialUrl: "https://www.pmkvyofficial.org",
    tagline: "Free skill training and certification for youth.",
    overview:
      "PMKVY, under the Skill India mission, offers free short-term skill training and certification to help youth become employable. Training is delivered through empanelled centres across various job roles.",
    benefits: ["Free short-term skill training", "Industry-recognised certification", "Placement and career support (as applicable)"],
    eligibility: ["Indian youth seeking skilling", "As per the specific job-role course criteria"],
    documents: ["Aadhaar / ID proof", "Educational details (as required)", "Bank account (for benefits)"],
    steps: [
      "Explore courses and centres via the Skill India Digital / PMKVY channels.",
      "Choose a job role and a nearby training centre.",
      "Enrol and complete the training.",
      "Take the assessment and get certified.",
      "Use placement/career support where offered.",
    ],
    faq: [
      { question: "Is PMKVY training free?", answer: "Yes, PMKVY short-term training is free for eligible candidates, with certification on successful assessment." },
    ],
    relatedService: "scholarship",
    keywords: ["skill india", "pmkvy", "kaushal vikas yojana", "free skill training", "skill development"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "nsap-old-age-pension",
    name: "Old-Age / Widow / Disability Pension (NSAP)",
    fullName: "National Social Assistance Programme (NSAP)",
    audiences: ["seniors", "women"],
    ministry: "Ministry of Rural Development",
    officialUrl: "https://nsap.nic.in",
    tagline: "Monthly pension for the elderly, widows and persons with disabilities.",
    overview:
      "The National Social Assistance Programme provides monthly pensions to eligible elderly citizens, widows and persons with disabilities from below-poverty-line households, through central and state components. States often add their own top-up.",
    benefits: ["Monthly old-age / widow / disability pension", "Central + state assistance", "Support for BPL households"],
    eligibility: ["BPL households", "Elderly (as per age criteria), widows, or persons with disabilities as defined by the scheme"],
    documents: ["Aadhaar", "Age / widow / disability proof (as applicable)", "BPL / income proof", "Bank account details"],
    steps: [
      "Check eligibility and apply via your state's social welfare / e-District portal (linked from nsap.nic.in).",
      "Fill the pension application for the relevant category.",
      "Upload the required proofs.",
      "Submit for verification by the local authority.",
      "Receive the monthly pension in your bank account.",
    ],
    faq: [
      { question: "Who is eligible for the NSAP old-age pension?", answer: "Elderly persons from below-poverty-line households meeting the age criteria; there are also widow and disability pension components with their own criteria." },
    ],
    relatedService: "disability-certificate",
    keywords: ["old age pension", "nsap", "widow pension", "disability pension", "vridha pension"],
    updatedOn: "2026-07-19",
  },
  // Flagship schemes that also exist as detailed India Services:
  {
    slug: "pm-kisan-scheme",
    name: "PM-KISAN",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    audiences: ["farmers"],
    ministry: "Ministry of Agriculture & Farmers Welfare",
    officialUrl: "https://pmkisan.gov.in",
    tagline: "Income support for landholding farmer families.",
    overview:
      "PM-KISAN provides income support in instalments to eligible landholding farmer families. See our detailed service guide for registration, e-KYC and beneficiary status.",
    benefits: ["Income support in instalments", "Direct benefit transfer to bank account"],
    eligibility: ["Landholding farmer families as per scheme rules (with exclusions)"],
    documents: ["Aadhaar", "Land records", "Bank account details"],
    steps: ["Register on pmkisan.gov.in.", "Complete e-KYC.", "Check beneficiary status for instalments."],
    faq: [{ question: "How do I check PM-KISAN status?", answer: "Use 'Beneficiary Status' on the official pmkisan.gov.in portal." }],
    relatedService: "pm-kisan",
    relatedSchemes: ["kisan-credit-card-scheme"],
    keywords: ["pm kisan", "pm-kisan", "kisan samman nidhi", "farmer income support"],
    popular: true,
    updatedOn: "2026-07-19",
  },
  {
    slug: "ayushman-bharat-scheme",
    name: "Ayushman Bharat (PM-JAY)",
    fullName: "Pradhan Mantri Jan Arogya Yojana",
    audiences: ["health"],
    ministry: "National Health Authority",
    officialUrl: "https://pmjay.gov.in",
    tagline: "Health cover for eligible families at empanelled hospitals.",
    overview:
      "Ayushman Bharat PM-JAY provides health cover for eligible families for cashless treatment at empanelled hospitals. See our detailed service guide to check eligibility and get your card.",
    benefits: ["Cashless treatment up to the scheme limit", "Wide hospital network"],
    eligibility: ["Families in the official beneficiary database"],
    documents: ["Aadhaar / ration card", "Mobile number"],
    steps: ["Check eligibility on pmjay.gov.in.", "Verify via OTP.", "Get your Ayushman card and use empanelled hospitals."],
    faq: [{ question: "How do I check Ayushman Bharat eligibility?", answer: "Use 'Am I Eligible' on the official pmjay.gov.in portal." }],
    relatedService: "ayushman-bharat",
    keywords: ["ayushman bharat", "pmjay", "health scheme", "ayushman card"],
    popular: true,
    updatedOn: "2026-07-19",
  },
  {
    slug: "jan-dhan-scheme",
    name: "Jan Dhan Yojana",
    fullName: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    audiences: ["workers", "women"],
    ministry: "Ministry of Finance",
    officialUrl: "https://pmjdy.gov.in",
    tagline: "Zero-balance bank account with insurance and DBT access.",
    overview:
      "PMJDY provides basic zero-balance savings accounts with a RuPay card, accident cover and access to DBT and overdraft. See our detailed service guide for how to open one.",
    benefits: ["Zero-balance account", "RuPay debit card & accident cover", "DBT and overdraft access"],
    eligibility: ["Any Indian citizen (incl. minors above 10 with a guardian)"],
    documents: ["Aadhaar or a valid document", "Passport-size photograph"],
    steps: ["Visit any bank or Bank Mitra.", "Fill the account opening form.", "Get your zero-balance account and RuPay card."],
    faq: [{ question: "Is a Jan Dhan account really zero balance?", answer: "Yes, it can be opened and maintained with zero balance and comes with a free RuPay card." }],
    relatedService: "jan-dhan-yojana",
    relatedSchemes: ["pm-suraksha-bima", "pm-jeevan-jyoti-bima"],
    keywords: ["jan dhan", "pmjdy", "zero balance account", "jan dhan yojana"],
    updatedOn: "2026-07-19",
  },
  {
    slug: "kisan-credit-card-scheme",
    name: "Kisan Credit Card (KCC)",
    fullName: "Kisan Credit Card Scheme",
    audiences: ["farmers"],
    ministry: "Ministry of Agriculture & Farmers Welfare",
    officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
    tagline: "Affordable, timely credit for farmers.",
    overview:
      "The Kisan Credit Card gives farmers timely, affordable credit for cultivation and allied activities. See our detailed service guide for eligibility and how to apply.",
    benefits: ["Short-term credit at concessional interest", "For cultivation and allied activities"],
    eligibility: ["Farmers — owners, tenants, sharecroppers; eligible SHG/JLG members"],
    documents: ["Aadhaar", "Land records", "Bank account details"],
    steps: ["Apply at your bank or via the PM-KISAN KCC section.", "Submit land and identity documents.", "Receive your KCC limit."],
    faq: [{ question: "Who is eligible for a Kisan Credit Card?", answer: "Farmers who own or cultivate land, including tenant farmers and sharecroppers." }],
    relatedService: "kisan-credit-card",
    relatedSchemes: ["pm-kisan-scheme"],
    keywords: ["kisan credit card", "kcc", "farmer loan", "agriculture credit"],
    updatedOn: "2026-07-19",
  },
];

/* ---------------- helpers ---------------- */
export function getScheme(slug: string): Scheme | undefined {
  return schemes.find((s) => s.slug === slug);
}
export function schemesByAudience(audience: string): Scheme[] {
  return schemes.filter((s) => s.audiences.includes(audience));
}
export function popularSchemes(): Scheme[] {
  const p = schemes.filter((s) => s.popular);
  return p.length ? p : schemes.slice(0, 8);
}
export function getSchemeAudience(slug: string): SchemeAudience | undefined {
  return schemeAudiences.find((a) => a.slug === slug);
}
export function relatedSchemesOf(scheme: Scheme, limit = 4): Scheme[] {
  const explicit = (scheme.relatedSchemes ?? []).map(getScheme).filter((s): s is Scheme => !!s);
  const sameAud = schemes.filter((s) => s.slug !== scheme.slug && s.audiences.some((a) => scheme.audiences.includes(a)));
  const seen = new Set<string>();
  return [...explicit, ...sameAud].filter((s) => (seen.has(s.slug) ? false : (seen.add(s.slug), true))).slice(0, limit);
}
