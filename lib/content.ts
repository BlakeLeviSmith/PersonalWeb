// All site copy lives here as typed objects. Editing copy is a single-file
// change; components never hard-code prose.

export type NavLink = { label: string; href: string };

export type GlanceStat = {
  /** Display string parsed by <CountUp/>, e.g. "50K+" or "400". */
  value: string;
  caption: string;
};

export type ProjectStat = {
  value: string;
  label: string;
};

export type ImageSlot = {
  filename: string;
  aspectRatio: string; // "16/10", "4/5", "16/9"
  label: string;
  /** Real asset path under /public. When set, the image renders; otherwise
   *  the styled placeholder box renders. This is the one-line swap-in. */
  src?: string;
  /** Poster frame path, used only by video slots. */
  poster?: string;
};

export type LogoSlot = {
  name: string;
  /** Real logo path under /public. When set, the logo renders; otherwise
   *  the placeholder pill renders. */
  src?: string;
};

export type Feature = {
  caption: string;
  description: string;
};

export type Partner = {
  /** Display string parsed by <CountUp/>, e.g. "30,000+" or "350+". */
  figure: string;
  /** Optional unit word rendered small beside the figure. */
  unit?: string;
  name: string;
  role: string;
};

export type Competition = {
  name: string;
  detail: string;
};

export const site = {
  name: "Blake Smith",
  role: "Builder",
  location: "Charlotte, NC",
  email: "blake.le.smith@gmail.com",
  description:
    "High school junior building AI products for cities, homes, and small businesses.",
  updated: "May 2026",
  year: 2026,
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Builder · Charlotte, NC",
  name: "Blake Smith",
  subhead:
    "High school junior building AI products for cities, homes, and small businesses.",
};

// 4.3 — At a Glance. The visual anchor of the page.
export const glanceStats: GlanceStat[] = [
  { value: "400", caption: "Modera waitlist signups" },
  { value: "6", caption: "Partner organizations using Charlotte Canopy" },
  { value: "50K+", caption: "Trees in the Charlotte Canopy network" },
  { value: "35K+", caption: "Charlotte residents reached" },
];

// 4.4 — Modera
export const modera = {
  eyebrow: "Consumer AI · iOS Beta",
  title: "Modera",
  url: "modera.studio",
  href: "https://modera.studio",
  leadImage: {
    filename: "modera-lead.jpg",
    aspectRatio: "16/10",
    label: "iPhone scan-to-design flow",
  } as ImageSlot,
  body: [
    "An AI 3D interior design platform for homeowners. Scan a room with an iPhone, prompt a style, and generate furniture-accurate design variations in seconds. Built on Apple's native renderer, with a unit economics target that lets the consumer flow stay close to free.",
    "Currently in closed beta with the next cohort of homeowners moving from waitlist to TestFlight.",
  ],
  stats: [
    { value: "400", label: "waitlist signups" },
    { value: "20", label: "active beta users" },
    { value: "1", label: "solo founder" },
  ] as ProjectStat[],
  programsCaption: "Backed by",
  programs: [
    { name: "Google Cloud for Startups" },
    { name: "NVIDIA Inception" },
  ] as LogoSlot[],
};

// 4.4 — Charlotte Canopy, overview block
export const canopy = {
  eyebrow: "Urban Heat · Live Deployment",
  title: "Charlotte Canopy",
  url: "charlottecanopy.org",
  href: "https://charlottecanopy.org",
  leadImage: {
    filename: "canopy-lead.jpg",
    aspectRatio: "16/10",
    label: "Heatmap with an intervention drawn on it",
  } as ImageSlot,
  body: [
    "A browser-based urban heat island simulator for Charlotte. Planners, neighborhood leaders, and nonprofits open the heatmap, draw an intervention like a new park or a roof change, and see the cooling delta in under a second. Same XGBoost model as the OpenUSD desktop platform from the state competition, now reachable from any phone in the field.",
    "Since launch the simulation has moved from prototype to active use. Six organizations across research, neighborhood advocacy, housing, and urban forestry are now using or evaluating the dataset.",
  ],
  features: [
    {
      caption: "Free & Open",
      description: "No install, no signup. Any browser, any device.",
    },
    {
      caption: "Live Predictions",
      description:
        "Draw a park or change a roof, see the cooling delta in under a second.",
    },
    {
      caption: "Downloadable Data",
      description: "All 255,760 cells exportable as CSV or GeoJSON.",
    },
  ] as Feature[],
};

// 4.4 — Charlotte Canopy, partners block
export const canopyPartners: Partner[] = [
  {
    figure: "30,000+",
    name: "Camino",
    role: "Health, education, and community center programs serving Charlotte's Latino population, using the model to map heat exposure for clinic outreach zones.",
  },
  {
    figure: "350+",
    unit: "homes",
    name: "McCrorey Heights Neighborhood Association",
    role: "Historically Black middle-class enclave founded in 1912, on the National Register of Historic Places since 2017, using heat data to prioritize tree-canopy advocacy with the city.",
  },
  {
    figure: "6",
    unit: "neighborhoods",
    name: "West Blvd Neighborhood Coalition",
    role: "Coalition representing Reid Park, Wilmore, Wesley Heights, and adjacent neighborhoods along the West Blvd corridor, identifying intervention priorities.",
  },
  {
    figure: "5,000+",
    name: "Roof Above",
    role: "Charlotte's largest homelessness nonprofit, formed from the Urban Ministry Center and Men's Shelter merger in 2020, layering heat data on outreach routes to flag dangerous days.",
  },
];

export const canopyNewestLaunch = {
  eyebrow: "Newest Launch",
  title: "TreesCharlotte",
  detail: "50,000+ trees planted since 2013",
  body: "Partnership confirmed with the Director of Programs, the Urban Forest Educator, and the Community Engagement Manager. TreesCharlotte uses the platform to data-optimize where they direct planting and to power urban forestry education programming, pairing the existing 50K+ planted trees with model-prioritized future-planting blocks.",
};

export const canopyInProgress = {
  eyebrow: "In Progress · Referral",
  body: "UNC Charlotte professor-led citizen heat-mapping campaign, referred by TreesCharlotte's Director of Programs, currently evaluating their volunteer-collected ground-truth dataset alongside the ECOSTRESS-derived predictions for cross-validation.",
};

export const canopyTotals: GlanceStat[] = [
  { value: "6", caption: "partner orgs" },
  { value: "35K+", caption: "residents reached" },
  { value: "50K+", caption: "trees in network" },
  { value: "8+", caption: "neighborhoods" },
];

// 4.4 — Truckside
export const truckside = {
  eyebrow: "Operations AI · Pilot",
  title: "Truckside",
  url: "truckside.co",
  href: "https://truckside.co",
  leadImage: {
    filename: "truckside-lead.jpg",
    aspectRatio: "16/10",
    label: "Food truck at night, or the hardware stack",
  } as ImageSlot,
  body: [
    "A voice ordering automation system for food trucks, running local inference on-truck with card-only payments and a transparent hardware-at-cost plus software subscription model. The first pilot is wrapping at a Charlotte truck this month, with paid non-family contracts targeted next.",
  ],
  status: "Status · First pilot in progress, Charlotte NC",
};

// 4.5 — Research
export const research = {
  eyebrow: "Research Affiliation",
  title: "Duke University",
  body: "Research affiliation at Duke under Daniel Egger, who leads the Master in Interdisciplinary Data Science program at the Social Science Research Institute. Final official position pending.",
};

// 4.6 — Education
export const education = {
  eyebrow: "Education",
  title: "Schools",
  rows: [
    {
      school: "North Carolina School of Science and Mathematics",
      role: "Current, junior",
    },
    { school: "UNC Charlotte", role: "Coursework, no degree" },
    {
      school: "Central Piedmont Community College",
      role: "Coursework, no degree",
    },
  ],
};

// 4.7 — Building & Competing
export const ftc = {
  eyebrow: "First Tech Challenge · Worlds Competitor",
  title: "FTC scoring assistance tool",
  video: {
    filename: "ftc-demo.mp4",
    aspectRatio: "16/9",
    label: "FTC scoring tool demo",
  } as ImageSlot,
  body: "A passive computer vision referee aid for FTC matches, running on an ESP32 camera with 99%+ ball detection accuracy in test conditions. Currently in discussion with the event coordinator for the CPE event, not yet an official deployment.",
};

export const competitions: Competition[] = [
  { name: "TSA Nationals", detail: "Geospatial Technology · June 2026" },
  { name: "FBLA Business Plan", detail: "Top 10 States · March 2026" },
];

export const competitionsEyebrow = "Recent Competitions";

// 4.8 — Footer
export const footerLinks: NavLink[] = [
  { label: "GitHub", href: "https://github.com/BlakeLeviSmith" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/blake-smith-402b03352/",
  },
];
