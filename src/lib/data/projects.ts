export type Project = {
  slug: string;
  title: string;
  sector: "Residential" | "Commercial" | "Industrial" | "Community";
  location: string;
  year: string;
  summary: string;
  scope: string[];
  metrics: { label: string; value: string }[];
  image: string;
  accent: "blue" | "deep" | "red" | "slate";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hill-country-net-zero",
    title: "Hill Country Net-Zero Residence",
    sector: "Residential",
    location: "Dripping Springs, TX",
    year: "2026",
    summary:
      "A 4,800 sq ft custom home taken fully off gas: 18.4 kW of solar, 27 kWh of storage, dual EV charging and an all-new 400A service.",
    scope: [
      "18.4 kW roof + ground array",
      "27 kWh stacked battery storage",
      "400A service upgrade",
      "Two 48A EV chargers",
    ],
    metrics: [
      { label: "Annual production", value: "29,400 kWh" },
      { label: "Utility bill", value: "-96%" },
      { label: "Backup runtime", value: "36 hrs" },
    ],
    image: "/images/project-net-zero.svg",
    accent: "blue",
    featured: true,
  },
  {
    slug: "riverside-logistics-retrofit",
    title: "Riverside Logistics LED Retrofit",
    sector: "Industrial",
    location: "Round Rock, TX",
    year: "2026",
    summary:
      "412 high-bay fixtures replaced across a live 220,000 sq ft distribution centre, completed entirely on night shifts with zero operational downtime.",
    scope: [
      "412 high-bay LED fixtures",
      "Occupancy and daylight controls",
      "Emergency lighting compliance",
      "Utility rebate administration",
    ],
    metrics: [
      { label: "Energy saved", value: "612 MWh/yr" },
      { label: "Rebate secured", value: "$184,000" },
      { label: "Downtime", value: "0 hours" },
    ],
    image: "/images/project-warehouse.svg",
    accent: "deep",
    featured: true,
  },
  {
    slug: "congress-avenue-fitout",
    title: "Congress Avenue Office Fit-Out",
    sector: "Commercial",
    location: "Austin, TX",
    year: "2025",
    summary:
      "Full electrical package for a 26,000 sq ft tenant improvement — distribution, lighting, data rough-in and a 65 kW rooftop array, delivered three days early.",
    scope: [
      "Three-phase distribution & switchgear",
      "Architectural lighting package",
      "Structured cabling rough-in",
      "65 kW rooftop solar",
    ],
    metrics: [
      { label: "Floor area", value: "26,000 sq ft" },
      { label: "Programme", value: "3 days early" },
      { label: "Change orders", value: "2" },
    ],
    image: "/images/project-office.svg",
    accent: "slate",
    featured: true,
  },
  {
    slug: "cedar-park-microgrid",
    title: "Cedar Park Community Microgrid",
    sector: "Community",
    location: "Cedar Park, TX",
    year: "2025",
    summary:
      "A 1.2 MW shared solar and storage installation supplying 140 townhomes with resilient power through the 2025 winter storm.",
    scope: [
      "1.2 MW ground-mount array",
      "800 kWh central storage",
      "Islanding controls & switchgear",
      "Resident monitoring portal",
    ],
    metrics: [
      { label: "Homes served", value: "140" },
      { label: "Storm uptime", value: "100%" },
      { label: "CO₂ avoided", value: "980 t/yr" },
    ],
    image: "/images/project-microgrid.svg",
    accent: "blue",
  },
  {
    slug: "eastside-bungalow-rewire",
    title: "Eastside Bungalow Full Rewire",
    sector: "Residential",
    location: "Austin, TX",
    year: "2025",
    summary:
      "A 1924 bungalow rewired from knob-and-tube to modern code without disturbing original plaster, shiplap or millwork.",
    scope: [
      "Complete rewire, 22 circuits",
      "200A panel replacement",
      "AFCI/GFCI protection throughout",
      "Heritage-sensitive fixture install",
    ],
    metrics: [
      { label: "Circuits", value: "22 new" },
      { label: "Plaster removed", value: "< 3%" },
      { label: "Duration", value: "9 days" },
    ],
    image: "/images/project-rewire.svg",
    accent: "red",
  },
  {
    slug: "lakeway-standby-power",
    title: "Lakeway Estate Standby Power",
    sector: "Residential",
    location: "Lakeway, TX",
    year: "2024",
    summary:
      "A 48 kW liquid-cooled standby generator paired with 20 kWh of storage — silent for short outages, unlimited for long ones.",
    scope: [
      "48 kW liquid-cooled generator",
      "Whole-home transfer switch",
      "20 kWh battery for silent backup",
      "Gas line sizing and permitting",
    ],
    metrics: [
      { label: "Transfer time", value: "8 sec" },
      { label: "Backup coverage", value: "Whole home" },
      { label: "Annual tests", value: "52 automatic" },
    ],
    image: "/images/project-standby.svg",
    accent: "deep",
  },
];

export const projectSectors = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
  "Community",
] as const;

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
