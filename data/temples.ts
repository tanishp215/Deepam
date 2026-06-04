export type DeepamState =
  | "sustaining"
  | "lightly-compromising"
  | "seriously-compromising"
  | "stripped-down"
  | "insufficient-evidence"
  | "pre-operational";

export type Region =
  | "triangle"
  | "charlotte"
  | "triad"
  | "fayetteville"
  | "eastern-nc"
  | "western-nc"
  | "emerging";

export interface TempleEvent {
  name: string;
  date?: string;
  description?: string;
}

export interface Temple {
  id: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  website?: string;
  founded?: string;
  tradition: string;
  region: Region;
  deepamState: DeepamState;
  stateNote: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  events: TempleEvent[];
  tier2Partner: boolean;
  hasSufficientEvidence: boolean;
}

export const REGION_LABELS: Record<Region, string> = {
  triangle: "Research Triangle",
  charlotte: "Charlotte Metro",
  triad: "Triad",
  fayetteville: "Fayetteville",
  "eastern-nc": "Eastern NC",
  "western-nc": "Western NC",
  emerging: "In Development",
};

export const STATE_LABELS: Record<DeepamState, string> = {
  sustaining: "Sustaining",
  "lightly-compromising": "Quietly Tightening",
  "seriously-compromising": "Visibly Cutting Back",
  "stripped-down": "Operating at Minimum",
  "insufficient-evidence": "Insufficient Evidence",
  "pre-operational": "In Development",
};

export const STATE_COLORS: Record<DeepamState, string> = {
  sustaining:               "#10B981",  // emerald  — thriving
  "lightly-compromising":   "#F59E0B",  // amber    — watch
  "seriously-compromising": "#F97316",  // orange   — warning
  "stripped-down":          "#EF4444",  // red      — critical
  "insufficient-evidence":  "#78716C",  // stone    — unknown
  "pre-operational":        "#374151",  // gray
};

export const temples: Temple[] = [
  // ─────────────────────────────────────────────────────
  // TRIANGLE
  // ─────────────────────────────────────────────────────
  {
    id: "hsnc-morrisville",
    name: "Hindu Society of North Carolina",
    shortName: "HSNC",
    address: "309 Aviation Parkway",
    city: "Morrisville",
    state: "NC",
    zip: "27560",
    phone: "(919) 481-2574",
    website: "hsnctemple.org",
    founded: "1976",
    tradition: "Pan-Hindu",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Strong digital footprint, active expansion, regular programming. Planning major campus expansion including traditional temple, cultural hall, and learning center.",
    coordinates: [35.8433, -78.8326],
    description:
      "Founded in 1976 on a 25-acre campus, HSNC serves the entire Triangle area. Active capital expansion includes a traditional Indian temple, 1100-capacity cultural hall, and commercial kitchen.",
    events: [
      { name: "Diwali Festival", description: "Annual community celebration" },
      { name: "Weekly Puja", description: "Saturday worship services" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "sv-temple-cary",
    name: "Sri Venkateswara Temple of North Carolina",
    shortName: "SV Temple",
    address: "121 Balaji Place",
    city: "Cary",
    state: "NC",
    zip: "27513",
    phone: "(919) 468-0040",
    website: "svtemplenc.org",
    founded: "2009",
    tradition: "South Indian Vaishnava (Tirupati/Balaji)",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Flagship-tier institution. 87-ft Rajagopuram inaugurated Oct 2022 - tallest in North America. Serves ~21,000 Hindus in Research Triangle.",
    coordinates: [35.757, -78.8022],
    description:
      "Home to the tallest Rajagopuram in North America at 87 feet, inaugurated by Gov. Roy Cooper in October 2022. Serves the largest Hindu population in the Research Triangle.",
    events: [
      { name: "Brahmotsavam", description: "Annual 9-day festival" },
      { name: "Daily Archana", description: "Morning and evening worship" },
      { name: "Vaikunta Ekadasi", description: "Major annual observance" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "baps-morrisville",
    name: "BAPS Shri Swaminarayan Mandir",
    shortName: "BAPS Raleigh",
    address: "1020 Aviation Parkway",
    city: "Morrisville",
    state: "NC",
    zip: "27560",
    phone: "(919) 469-6605",
    website: "baps.org",
    founded: "2000",
    tradition: "Swaminarayan Sampraday (BAPS)",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Part of global BAPS network with strong institutional backing. Regular programming and active congregation.",
    coordinates: [35.8469, -78.8386],
    description:
      "Part of the global BAPS network, this mandir serves the Swaminarayan community in the Research Triangle with daily worship and cultural programming.",
    events: [
      { name: "Swaminarayan Jayanti", description: "Founder's birthday celebration" },
      { name: "Diwali Assembly", description: "Annual community gathering" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "isso-cary",
    name: "ISSO Shree Swaminarayan Hindu Mandir",
    shortName: "ISSO Cary",
    address: "500 SE Maynard Road",
    city: "Cary",
    state: "NC",
    zip: "27511",
    phone: "(919) 964-1008",
    website: "sites.google.com/issonc.org/info/home",
    tradition: "Original Shree Swaminarayan Sampradaya (ISSO/Kalupur)",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Consistent weekly programming. Weekly Satsang Sabha every Saturday (5-8 PM) with Kirtan, Katha, Aarti, Mahaprasad.",
    coordinates: [35.7668, -78.7879],
    description:
      "Serving the original Swaminarayan tradition, ISSO holds weekly Satsang Sabha every Saturday evening with Kirtan, Katha, Aarti, and Mahaprasad.",
    events: [
      { name: "Saturday Satsang Sabha", description: "Weekly 5-8 PM with Kirtan, Katha, Aarti, Mahaprasad" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "skvnc-cary",
    name: "Shri Krishna Vrundavana NC",
    shortName: "SKVNC",
    address: "9417 Chapel Hill Rd",
    city: "Cary",
    state: "NC",
    zip: "27513",
    phone: "(919) 473-3350",
    website: "skvnc.org",
    founded: "2020",
    tradition: "Madhva (Shri Puthige Matha lineage)",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "8th Madhva temple in the USA. Active panchanga and regular priest services. Dedicated Vijayadashami 2020.",
    coordinates: [35.7538, -78.8015],
    description:
      "The 8th Madhva temple in the USA, dedicated on Vijayadashami 2020. Adjacent to SV Temple. Deities: Sri Krishna, Sri Mukhyaprana, and vrundavana of Sri Raghavendra Swami.",
    events: [
      { name: "Madhva Navami", description: "Annual celebration" },
      { name: "Krishna Janmashtami", description: "Major annual festival" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "ssmnc-cary",
    name: "Sri Shirdi Saibaba Mandir of North Carolina",
    shortName: "SSMNC",
    address: "1150 SW Maynard Rd",
    city: "Cary",
    state: "NC",
    zip: "27513",
    phone: "(919) 386-1085",
    website: "ssmnc.org",
    founded: "2011",
    tradition: "Shirdi Sai",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Active since 2011 in a 4,000 sqft facility on 3.5 acres. Thursday Annadanam programming. Stable operations.",
    coordinates: [35.7624, -78.7789],
    description:
      "Opened June 19, 2011 in a 4,000 sqft building on 3.5 acres with ~100 car parking. Offers Thursday Annadanam and regular worship.",
    events: [
      { name: "Thursday Annadanam", description: "Weekly community meal" },
      { name: "Guru Purnima", description: "Annual celebration" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "ssv-durham",
    name: "Sri Siddhi Vinayaka Temple of NC",
    shortName: "SSV Durham",
    address: "5410 NC-55, Suite D&C",
    city: "Durham",
    state: "NC",
    zip: "27713",
    phone: "(984) 888-5306",
    website: "srisiddhivinayakatemple.org",
    tradition: "Ganesha-focused, Pan-Hindu",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Newer, fast-growing. High social-media velocity, 7-day services, strong volunteer-driven outreach. Strip-mall location is a growth-stage signal.",
    coordinates: [35.9382, -78.9625],
    description:
      "Newer and fast-growing, operating in Greenwood Commons with 7-day services and active community outreach including Annadhanam, blood drives, and clay Ganesh making.",
    events: [
      { name: "Ganesh Chaturthi", description: "Major annual celebration with clay Ganesh" },
      { name: "Annadhanam", description: "Regular community meals" },
      { name: "Blood Drive", description: "Community health outreach" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "iskcon-hillsborough",
    name: "ISKCON of NC - New Goloka Dhama",
    shortName: "New Goloka",
    address: "1032 Dimmocks Mill Rd",
    city: "Hillsborough",
    state: "NC",
    zip: "27278",
    phone: "(919) 732-6492",
    website: "newgoloka.com",
    founded: "1982",
    tradition: "ISKCON / Gaudiya Vaishnava",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Full ritual cycle. Daily 4:30 AM worship, active Sunday feast. 17-acre rural campus with mature institutional infrastructure.",
    coordinates: [36.0537, -79.1175],
    description:
      "Founded in 1982, New Goloka Dhama sits on 17 rural acres. Deities Sri Sri Radha Golokananda installed Janmashtami 1985. Daily 4:30 AM worship and Sunday feast.",
    events: [
      { name: "Sunday Feast", description: "Weekly kirtan, lecture, and prasadam" },
      { name: "Janmashtami", description: "Major annual celebration" },
      { name: "Ratha Yatra", description: "Annual chariot festival" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "krishnadham-apex",
    name: "Krishnadham USA",
    shortName: "Krishnadham",
    address: "795 Beaver Creek Rd",
    city: "Apex",
    state: "NC",
    zip: "27502",
    tradition: "Pushti Marg (Vallabh Sampradaya)",
    region: "triangle",
    deepamState: "insufficient-evidence",
    stateNote:
      "Low public signal. Pushti Marg / Gujarati linguistic-isolation confounder means low Tier 1 signal is more plausibly digital-adoption pattern than distress.",
    coordinates: [35.7126, -78.8836],
    description:
      "Phase-1 establishment near Jordan Lake serving the niche Gujarati Vaishnava community. Planned haveli to Shrinathji, Yamunaji, and Mahaprabhuji.",
    events: [],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },
  {
    id: "rktnc-apex",
    name: "Radha Krishna Temple of NC",
    shortName: "RKTNC / JKYog",
    address: "23 Radhika Way",
    city: "Apex",
    state: "NC",
    zip: "27523",
    phone: "(919) 757-1902",
    website: "rktnc.com",
    founded: "2018",
    tradition: "Jagadguru Kripaluji Yog (JKYog) - Radha-Krishna devotional",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Inaugurated April 2018 on 10-acre wooded plot. Active JKYog parent organization, weekly satsangs, fundraising for Dwarkadhish-style main temple.",
    coordinates: [35.7274, -78.8563],
    description:
      "Inaugurated on Vaisakhi Purnima 2018 on a 10-acre wooded plot. Plans for staged Braj-replica development with a main Dwarkadhish-style temple.",
    events: [
      { name: "Weekly Satsang", description: "Spiritual discourses and kirtan" },
      { name: "Radhashtami", description: "Celebration of Radha's appearance day" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "chinmaya-raleigh",
    name: "Chinmaya Mission Raleigh-Durham",
    shortName: "CM RDU",
    address: "2605 Pathview Ct",
    city: "Raleigh",
    state: "NC",
    zip: "27613",
    phone: "(919) 676-1767",
    website: "chinmaya-rdu.org",
    founded: "2001",
    tradition: "Chinmaya Mission / Advaita Vedanta",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Since 2001, consistent youth programming, stable cadence of Vedanta discourses and Yuvakendra classes.",
    coordinates: [35.8923, -78.6784],
    description:
      "A Vedanta center (not a deity temple per se) offering Satsangas, Yuvakendra youth programs, and children's classes since 2001.",
    events: [
      { name: "Vedanta Satsang", description: "Regular spiritual discourses" },
      { name: "Balvihar", description: "Children's cultural education" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "rkvsnc-morrisville",
    name: "Ramakrishna Vedanta Society of NC",
    shortName: "RKVSNC",
    address: "3109 Globe Road",
    city: "Morrisville",
    state: "NC",
    zip: "27560",
    phone: "(919) 412-8304",
    website: "vedantanc.org",
    founded: "2008",
    tradition: "Vedanta (Ramakrishna tradition)",
    region: "triangle",
    deepamState: "sustaining",
    stateNote:
      "Active capital-construction phase beginning December 2025. Universal Temple framing expands donor base beyond strict diaspora.",
    coordinates: [35.8279, -78.8419],
    description:
      "New temple construction commenced December 11, 2025. Universal Temple open to all faiths. Founded 2008 under Swami Sarvadevananda Maharaj.",
    events: [
      { name: "Construction Blessing", description: "Site work began December 2025" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },

  // ─────────────────────────────────────────────────────
  // CHARLOTTE
  // ─────────────────────────────────────────────────────
  {
    id: "hcclt-charlotte",
    name: "Hindu Center of Charlotte",
    shortName: "HCCLT",
    address: "7400 City View Drive",
    city: "Charlotte",
    state: "NC",
    zip: "28212",
    phone: "(704) 535-3440",
    website: "hcclt.org",
    founded: "1982",
    tradition: "Pan-Hindu",
    region: "charlotte",
    deepamState: "sustaining",
    stateNote:
      "One of the oldest Hindu institutions in the Southeast. 20,000 sqft, 81-ft-tall temple completed 2014. Network of 3,000+ families. Daily open 8:30 AM - 9 PM.",
    coordinates: [35.1956, -80.7596],
    description:
      "Founded July 24, 1982 after the McGuire Nuclear Plant brought hundreds of Indian engineering families to Charlotte. New 20,000-sqft temple completed 2015 with 13 life-sized marble deities.",
    events: [
      { name: "Navaratri", description: "Nine nights of goddess worship" },
      { name: "Karthigai Deepam", description: "Festival of lights celebration" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "trimurti-charlotte",
    name: "Trimurti Temple Devasthanam",
    shortName: "Trimurti Temple",
    address: "6441 Beatties Ford Rd",
    city: "Charlotte",
    state: "NC",
    zip: "28216",
    phone: "(980) 219-7556",
    website: "trimurtitemple.org",
    founded: "2000",
    tradition: "Traditional South Indian - only US temple with Hindu Trinity under one roof",
    region: "charlotte",
    deepamState: "sustaining",
    stateNote:
      "Unique distinction: only US temple housing Brahma, Vishnu, and Shiva under one roof. 14 independent sannathis. Ongoing fundraising trajectory since 2011.",
    coordinates: [35.2784, -80.8907],
    description:
      "The only temple in the USA housing the Hindu Trinity (Brahma, Vishnu, Shiva) under one roof. 17.5-acre site with 14 independent sannathis and twice-daily darshan.",
    events: [
      { name: "Brahmotsavam", description: "Annual main temple festival" },
      { name: "Shivaratri", description: "Night vigil for Lord Shiva" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "shirdi-sai-charlotte",
    name: "Shirdi Sai Temple of Charlotte",
    shortName: "Sai Mandir Charlotte",
    address: "6040 Providence Rd",
    city: "Charlotte",
    state: "NC",
    zip: "28226",
    phone: "(704) 343-6272",
    website: "charlottesai.org",
    tradition: "Shirdi Sai",
    region: "charlotte",
    deepamState: "lightly-compromising",
    stateNote:
      "Two-site setup with Providence Rd current temple and long-pending Indian Trail development. Dual branding and parallel infrastructure is a coordination friction signal.",
    coordinates: [35.1027, -80.8209],
    description:
      "Current temple at Providence Rd with planned 35.5-acre development in Indian Trail including a replica of the Shirdi mandir, priest quarters, and meditation center.",
    events: [
      { name: "Guru Purnima", description: "Annual celebration of Sai Baba" },
      { name: "Weekly Aarti", description: "Thursday and Sunday worship" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "baps-matthews",
    name: "BAPS Shri Swaminarayan Mandir",
    shortName: "BAPS Charlotte",
    address: "4100 Margaret Wallace Rd",
    city: "Matthews",
    state: "NC",
    zip: "28105",
    phone: "(704) 573-0805",
    website: "baps.org",
    founded: "1996",
    tradition: "BAPS Swaminarayan",
    region: "charlotte",
    deepamState: "sustaining",
    stateNote:
      "Bhumi Pujan for new mandir June 9, 2024. BAPS global backstop plus active capital fundraising. Daily double-aarti cycle.",
    coordinates: [35.1149, -80.7139],
    description:
      "Founded 1996, inaugurated by Pramukh Swami Maharaj. Currently in capital-construction phase for new mandir with Bhumi Pujan June 2024.",
    events: [
      { name: "Swaminarayan Jayanti", description: "Founder's celebration" },
      { name: "Hari Jayanti", description: "Annual observance" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "shrinath-dham-matthews",
    name: "Shrinath Dham Haveli (VPSC)",
    shortName: "Shrinath Dham",
    address: "1006 Vickie Lane",
    city: "Matthews",
    state: "NC",
    zip: "28104",
    tradition: "Pushti Marg (Vallabh Sampradaya)",
    region: "charlotte",
    deepamState: "lightly-compromising",
    stateNote:
      "Multiple inconsistent phone numbers across directory listings. Stale-public-infrastructure signal. Wide uncertainty band.",
    coordinates: [35.1194, -80.7046],
    description:
      "Founded 2013 as Vallabh Pushti Samaj of Carolinas. Niche Gujarati Vaishnava community serving the Charlotte area.",
    events: [],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },
  {
    id: "datta-mandir-huntersville",
    name: "Shree Sai Gurudev Datta Mandir",
    shortName: "Sai Datta Huntersville",
    address: "10435 Kerns Rd",
    city: "Huntersville",
    state: "NC",
    zip: "28078",
    phone: "(704) 727-0711",
    tradition: "Shirdi Sai + Datta lineage",
    region: "charlotte",
    deepamState: "lightly-compromising",
    stateNote:
      "Three separate Shirdi Sai institutions in Charlotte metro suggests congregation fragmentation, which historically correlates with per-institution donation-base thinning.",
    coordinates: [35.4107, -80.8455],
    description:
      "Suburban Charlotte (Lake Norman corridor). Part of the Shirdi Sai and Datta lineage tradition, distinct from the Providence Rd Sai Mandir Charlotte.",
    events: [],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },
  {
    id: "chinmaya-charlotte",
    name: "Chinmaya Mission Charlotte",
    shortName: "CM Charlotte",
    address: "Charlotte, NC",
    city: "Charlotte",
    state: "NC",
    zip: "28200",
    founded: "2018",
    tradition: "Chinmaya Mission / Advaita Vedanta",
    region: "charlotte",
    deepamState: "sustaining",
    stateNote:
      "Young (2018) but parent Chinmaya Mission provides institutional ballast. Class-based programs structurally more resilient than deity worship.",
    coordinates: [35.2271, -80.8431],
    description:
      "Established September 2018 as an independent corporation under the broader Chinmaya Mission. Educational and devotional center with youth programming.",
    events: [
      { name: "Vedanta Classes", description: "Weekly spiritual education" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },

  // ─────────────────────────────────────────────────────
  // TRIAD
  // ─────────────────────────────────────────────────────
  {
    id: "triad-hindu-greensboro",
    name: "Triad Hindu Temple",
    shortName: "Triad Hindu Temple",
    address: "7751 Alcorn Rd",
    city: "Greensboro",
    state: "NC",
    zip: "27409",
    phone: "(336) 621-5848",
    website: "triadhindutemple.com",
    founded: "1979",
    tradition: "Pan-Hindu (HSNC umbrella)",
    region: "triad",
    deepamState: "sustaining",
    stateNote:
      "46-year tenure. Paid off original mortgage 1998. Completed new construction 2019-2021. Active on Facebook, Instagram, and YouTube.",
    coordinates: [36.0729, -79.9406],
    description:
      "Founded February 11, 1979 at NC A&T State University. New temple groundbreaking April 2019, Balalaym Pravesam February 2021. Longest-operating HSNC temple in the Triad.",
    events: [
      { name: "Diwali Celebration", description: "Annual community festival" },
      { name: "Balalaym Programs", description: "Youth cultural classes" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "baps-greensboro",
    name: "BAPS Shri Swaminarayan Mandir",
    shortName: "BAPS Greensboro",
    address: "922 Gallimore Dairy Rd",
    city: "Greensboro",
    state: "NC",
    zip: "27409",
    phone: "(336) 355-9798",
    website: "baps.org",
    tradition: "BAPS Swaminarayan",
    region: "triad",
    deepamState: "sustaining",
    stateNote:
      "Part of global BAPS network. Sunday darshan 1-7 PM. Tighter schedule than Charlotte/Raleigh BAPS mandirs - consistent with small-mandir design.",
    coordinates: [36.0457, -79.9368],
    description:
      "Part of the global BAPS network. Sunday darshan 1-7 PM. Serves the Swaminarayan community in the Greensboro/High Point area.",
    events: [
      { name: "Sunday Darshan", description: "Weekly 1-7 PM" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "sri-mata-clemmons",
    name: "Sri Mata Hindu Temple",
    shortName: "Sri Mata Temple",
    address: "8535 Lasater Rd",
    city: "Clemmons",
    state: "NC",
    zip: "27012",
    phone: "(336) 565-6282",
    website: "matahindutemple.org",
    founded: "2019",
    tradition: "Smarta Sampradaya - Panchayatana Puja",
    region: "triad",
    deepamState: "lightly-compromising",
    stateNote:
      "Consecrated June 7, 2019 after 4 years of fundraising. Active GoFundMe for ongoing expansion. Young institution still building reserves.",
    coordinates: [36.0178, -80.3949],
    description:
      "The Triad's main South Indian / Smarta temple, consecrated June 7, 2019. Deities: Sri Mata (center), Saraswati, Lakshmi, Ganesha, Aditya, Balaji, and Shiva.",
    events: [
      { name: "Navaratri", description: "Nine nights celebration" },
      { name: "Diwali Puja", description: "Festival of lights" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },

  // ─────────────────────────────────────────────────────
  // FAYETTEVILLE
  // ─────────────────────────────────────────────────────
  {
    id: "hindu-bhavan-fayetteville",
    name: "Hindu Bhavan of Fayetteville",
    shortName: "Hindu Bhavan",
    address: "907 Cedar Creek Rd",
    city: "Fayetteville",
    state: "NC",
    zip: "28312",
    phone: "(910) 824-7289",
    website: "hindubhavan.org",
    tradition: "Pan-Hindu",
    region: "fayetteville",
    deepamState: "lightly-compromising",
    stateNote:
      "Two-window daily schedule (10 AM-noon and 5-7 PM) consistent with single priest covering smaller donor base. Military-adjacent diaspora has higher turnover.",
    coordinates: [35.0362, -78.9298],
    description:
      "Serves the military-adjacent diaspora near Fort Liberty (formerly Bragg). Daily worship with Bhajans/Aarti at 6:30 PM and Monday Rudra Abhishekam.",
    events: [
      { name: "Rudra Abhishekam", description: "Monday observance" },
      { name: "Bhajans/Aarti", description: "Daily 6:30-7 PM" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },
  {
    id: "baps-fayetteville",
    name: "BAPS Shri Swaminarayan Mandir",
    shortName: "BAPS Fayetteville",
    address: "4957 Cumberland Rd",
    city: "Fayetteville",
    state: "NC",
    zip: "28306",
    phone: "(803) 466-4973",
    tradition: "BAPS Swaminarayan",
    region: "fayetteville",
    deepamState: "lightly-compromising",
    stateNote:
      "SC area code (803) suggests possible regional shared-clergy arrangement. Lack of dedicated standalone NC web presence in search results is consistent with regional-clergy arrangements.",
    coordinates: [35.0039, -78.9664],
    description:
      "Part of BAPS global network. The South Carolina contact number and limited standalone NC presence suggests possible regional clergy sharing.",
    events: [],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },

  // ─────────────────────────────────────────────────────
  // EASTERN NC
  // ─────────────────────────────────────────────────────
  {
    id: "hindu-temple-greenville",
    name: "Hindu Society of Eastern NC / Hindu Temple of Greenville",
    shortName: "Hindu Temple Greenville",
    address: "1420 E 14th St",
    city: "Greenville",
    state: "NC",
    zip: "27858",
    phone: "(252) 420-3810",
    tradition: "Pan-Hindu (ECU and Pitt County diaspora)",
    region: "eastern-nc",
    deepamState: "seriously-compromising",
    stateNote:
      "Rurality + smaller diaspora + limited digital infrastructure produce low Tier 1 signal even at full health. Wide uncertainty band. Tier 2 partnership would resolve.",
    coordinates: [35.601, -77.3653],
    description:
      "Serves the ECU and surrounding Pitt County Hindu diaspora. Smaller rural-metro temple. Holi celebration covered by WITN-TV.",
    events: [
      { name: "Holi", description: "Annual spring festival" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },

  // ─────────────────────────────────────────────────────
  // WESTERN NC
  // ─────────────────────────────────────────────────────
  {
    id: "somesvara-clyde",
    name: "Sri Somesvara Temple at Mount Soma",
    shortName: "Mount Soma",
    address: "Mount Soma Community",
    city: "Clyde",
    state: "NC",
    zip: "28721",
    website: "srisomesvara.org",
    founded: "2011",
    tradition: "Vedic Shiva temple (100% Vastu-compliant)",
    region: "western-nc",
    deepamState: "sustaining",
    stateNote:
      "Full daily ritual cycle. 46 tons of granite hand-carved by Indian shilpis. Residential Vedic community revenue model decouples from typical diaspora-temple dynamics.",
    coordinates: [35.5429, -82.9399],
    description:
      "Consecrated May 16, 2011. 100% Vastu-compliant temple with 46 tons of hand-carved granite on a 435-acre Vedic residential community. Open daily 9:30 AM - 6:30 PM.",
    events: [
      { name: "Shivaratri", description: "Major annual Shiva festival" },
      { name: "Daily Aarathi", description: "Evening worship at 6 PM" },
    ],
    tier2Partner: false,
    hasSufficientEvidence: true,
  },

  // ─────────────────────────────────────────────────────
  // EMERGING / IN DEVELOPMENT
  // ─────────────────────────────────────────────────────
  {
    id: "carolina-murugan-moncure",
    name: "Carolina Murugan Temple",
    shortName: "Carolina Murugan",
    address: "100 Murugan Circle",
    city: "Moncure",
    state: "NC",
    zip: "27559",
    website: "carolinamurugantemple.org",
    tradition: "Tamil / Murugan-focused",
    region: "emerging",
    deepamState: "pre-operational",
    stateNote:
      "Phase 1 underway (~$3-5M). Will eventually feature the world's tallest Murugan statue at 155 ft. 130+ acre site on the Deep River.",
    coordinates: [35.5893, -79.0711],
    description:
      "Phase 1 underway on 130+ acres along the Deep River. Campus plans include Murugan temple, three gopurams, Tamil heritage museum, language library, and walking trails. World's tallest Murugan statue at 155 ft planned.",
    events: [],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },
  {
    id: "rtp-south-temple",
    name: "RTP South Hindu Temple Initiative",
    shortName: "RTP South Mandir",
    address: "Fuquay-Varina / Holly Springs area",
    city: "Fuquay-Varina",
    state: "NC",
    zip: "27526",
    website: "rtpsouthmandir.org",
    tradition: "Pan-Hindu (NC Hindu Association)",
    region: "emerging",
    deepamState: "pre-operational",
    stateNote:
      "Vision document published April 9, 2024. Planning stage. Aims to serve communities south of RTP.",
    coordinates: [35.5846, -78.8001],
    description:
      "Planning-stage initiative of the NC Hindu Association (NCHA) to serve Angier, Fuquay-Varina, Garner, Holly Springs, and Willow Springs communities south of RTP.",
    events: [],
    tier2Partner: false,
    hasSufficientEvidence: false,
  },
];

export function getTemplesByRegion(region: Region): Temple[] {
  return temples.filter((t) => t.region === region);
}

export function getTempleById(id: string): Temple | undefined {
  return temples.find((t) => t.id === id);
}

export function getTemplesByState(state: DeepamState): Temple[] {
  return temples.filter((t) => t.deepamState === state);
}

export function getActiveTemples(): Temple[] {
  return temples.filter(
    (t) => t.deepamState !== "pre-operational"
  );
}

export const REGIONS: Region[] = [
  "triangle",
  "charlotte",
  "triad",
  "fayetteville",
  "eastern-nc",
  "western-nc",
  "emerging",
];
