export type ProductCategory = {
  slug: string;
  label: string;
  icon: string;
  blurb: string;
  /** Artwork used by the category cards on /products. */
  image: string;
  /**
   * Three frames shown in the Projects page tab gallery, each with the caption
   * that sits under it. These are placeholder vector scenes — replace the paths
   * with real job photography (any aspect ratio, they are cropped to 4:3) and
   * no component needs to change.
   */
  gallery: { src: string; caption: string }[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  specs: { label: string; value: string }[];
  warranty: string;
  badge?: "Best seller" | "New" | "Premium" | "Best value";
  accent: "blue" | "deep" | "red" | "slate";
  icon: string;
};

export const productCategories: ProductCategory[] = [
  {
    slug: "solar-panels",
    label: "Solar Panels",
    icon: "sun",
    blurb: "Tier-1 modules with 25-year performance guarantees.",
    image: "/images/product-solar-panels.svg",
    gallery: [
      { src: "/images/product-solar-panels.svg", caption: "Array laid out to the shade model" },
      { src: "/images/product-solar-panels-2.svg", caption: "Rail-less mounting, flashed and sealed" },
      { src: "/images/product-solar-panels-3.svg", caption: "Per-panel production, day one" },
    ],
  },
  {
    slug: "inverters",
    label: "Inverters",
    icon: "cpu",
    blurb: "String, hybrid and microinverter platforms.",
    image: "/images/product-inverters.svg",
    gallery: [
      { src: "/images/product-inverters.svg", caption: "Hybrid inverter and backup gateway" },
      { src: "/images/product-inverters-2.svg", caption: "DC strings landed and labelled" },
      { src: "/images/product-inverters-3.svg", caption: "Commissioning report on handover" },
    ],
  },
  {
    slug: "ev-chargers",
    label: "EV Chargers",
    icon: "ev",
    blurb: "Level 2 charging for homes and fleets.",
    image: "/images/product-ev-chargers.svg",
    gallery: [
      { src: "/images/product-ev-chargers.svg", caption: "48A hardwired, garage install" },
      { src: "/images/product-ev-chargers-2.svg", caption: "Conduit run along the framing line" },
      { src: "/images/product-ev-chargers-3.svg", caption: "Load management across four bays" },
    ],
  },
  {
    slug: "battery-storage",
    label: "Battery Storage",
    icon: "battery",
    blurb: "Stackable storage from 10 kWh to 40 kWh.",
    image: "/images/product-battery-storage.svg",
    gallery: [
      { src: "/images/product-battery-storage.svg", caption: "Wall-mounted stack, 27 kWh" },
      { src: "/images/product-battery-storage-2.svg", caption: "Backup sub-panel and transfer gear" },
      { src: "/images/product-battery-storage-3.svg", caption: "Outage drill before we leave site" },
    ],
  },
  {
    slug: "heat-pump",
    label: "Heat Pump",
    icon: "thermometer",
    blurb: "Space and hot-water units that run on solar.",
    image: "/images/product-heat-pump.svg",
    gallery: [
      { src: "/images/product-heat-pump.svg", caption: "Outdoor unit on an isolated pad" },
      { src: "/images/product-heat-pump-2.svg", caption: "Ducted air balanced room by room" },
      { src: "/images/product-heat-pump-3.svg", caption: "Schedule tuned to your solar hours" },
    ],
  },
  {
    slug: "ceiling-vacuum",
    label: "Ceiling Vacuum & Insulation Removal",
    icon: "waves",
    blurb: "HEPA-filtered clear-outs of old ceiling insulation.",
    image: "/images/product-ceiling-vacuum.svg",
    gallery: [
      { src: "/images/product-ceiling-vacuum.svg", caption: "Extraction hose fed into the cavity" },
      { src: "/images/product-ceiling-vacuum-2.svg", caption: "Old batts lifted and bagged" },
      { src: "/images/product-ceiling-vacuum-3.svg", caption: "Joists back to bare, ready to re-fit" },
    ],
  },
  {
    slug: "ceiling-insulation",
    label: "Ceiling Insulation",
    icon: "layers",
    blurb: "High-R batts and blown-in fill, installed to spec.",
    image: "/images/product-ceiling-insulation.svg",
    gallery: [
      { src: "/images/product-ceiling-insulation.svg", caption: "R6.0 batts friction-fit, no gaps" },
      { src: "/images/product-ceiling-insulation-2.svg", caption: "Blown-in fill for low clearances" },
      { src: "/images/product-ceiling-insulation-3.svg", caption: "Depth checked against the spec" },
    ],
  },
];

export const products: Product[] = [
  // ---- Solar panels ----
  {
    id: "np-440",
    name: "NorthPeak 440 Bifacial",
    brand: "NorthPeak",
    category: "solar-panels",
    tagline: "Bifacial N-type module with class-leading low-light yield.",
    specs: [
      { label: "Output", value: "440 W" },
      { label: "Efficiency", value: "22.6%" },
      { label: "Temp. coefficient", value: "-0.29%/°C" },
      { label: "Cell type", value: "N-type TOPCon" },
    ],
    warranty: "25-year product · 30-year performance",
    badge: "Best seller",
    accent: "blue",
    icon: "sun",
  },
  {
    id: "np-410",
    name: "NorthPeak 410 All-Black",
    brand: "NorthPeak",
    category: "solar-panels",
    tagline: "Full-black aesthetic for street-facing roof planes.",
    specs: [
      { label: "Output", value: "410 W" },
      { label: "Efficiency", value: "21.3%" },
      { label: "Temp. coefficient", value: "-0.30%/°C" },
      { label: "Cell type", value: "Mono PERC" },
    ],
    warranty: "25-year product · 25-year performance",
    accent: "slate",
    icon: "sun",
  },
  {
    id: "sv-460",
    name: "SolVista 460 HJT",
    brand: "SolVista",
    category: "solar-panels",
    tagline: "Heterojunction cells for the highest yield per square foot.",
    specs: [
      { label: "Output", value: "460 W" },
      { label: "Efficiency", value: "23.4%" },
      { label: "Temp. coefficient", value: "-0.24%/°C" },
      { label: "Cell type", value: "HJT" },
    ],
    warranty: "30-year product · 30-year performance",
    badge: "Premium",
    accent: "deep",
    icon: "sun",
  },

  // ---- Inverters ----
  {
    id: "hx-7-6",
    name: "Helix Hybrid 7.6",
    brand: "Helix",
    category: "inverters",
    tagline: "Storage-ready hybrid inverter with integrated backup gateway.",
    specs: [
      { label: "AC output", value: "7.6 kW" },
      { label: "Efficiency", value: "97.8%" },
      { label: "MPPT trackers", value: "2" },
      { label: "Battery ready", value: "Yes" },
    ],
    warranty: "12-year standard, extendable to 20",
    badge: "Best value",
    accent: "blue",
    icon: "cpu",
  },
  {
    id: "mi-q8",
    name: "Meridian Q8 Microinverter",
    brand: "Meridian",
    category: "inverters",
    tagline: "Per-panel conversion for complex or shaded roofs.",
    specs: [
      { label: "AC output", value: "384 VA" },
      { label: "Efficiency", value: "97.5%" },
      { label: "Panel pairing", value: "Up to 540 W" },
      { label: "Rapid shutdown", value: "Built in" },
    ],
    warranty: "25-year limited",
    accent: "deep",
    icon: "cpu",
  },
  {
    id: "hx-11-4",
    name: "Helix Commercial 11.4",
    brand: "Helix",
    category: "inverters",
    tagline: "Three-phase string inverter for light commercial arrays.",
    specs: [
      { label: "AC output", value: "11.4 kW" },
      { label: "Efficiency", value: "98.2%" },
      { label: "MPPT trackers", value: "3" },
      { label: "Phases", value: "Three-phase" },
    ],
    warranty: "10-year standard",
    accent: "slate",
    icon: "cpu",
  },

  // ---- Batteries ----
  {
    id: "vault-13",
    name: "NorthStar Vault 13.5",
    brand: "NorthStar",
    category: "battery-storage",
    tagline: "Whole-home backup in a single wall-mounted unit.",
    specs: [
      { label: "Usable capacity", value: "13.5 kWh" },
      { label: "Continuous output", value: "7.6 kW" },
      { label: "Transfer time", value: "< 20 ms" },
      { label: "Chemistry", value: "LFP" },
    ],
    warranty: "10-year, 70% capacity retained",
    badge: "Best seller",
    accent: "blue",
    icon: "battery",
  },
  {
    id: "vault-stack",
    name: "NorthStar Vault Stack 40",
    brand: "NorthStar",
    category: "battery-storage",
    tagline: "Modular stack that grows from 10 kWh to 40 kWh.",
    specs: [
      { label: "Usable capacity", value: "10–40 kWh" },
      { label: "Continuous output", value: "12 kW" },
      { label: "Modules", value: "2–8" },
      { label: "Chemistry", value: "LFP" },
    ],
    warranty: "12-year, 70% capacity retained",
    badge: "New",
    accent: "deep",
    icon: "battery",
  },
  {
    id: "aegis-16",
    name: "Aegis Reserve 16",
    brand: "Aegis",
    category: "battery-storage",
    tagline: "High-output storage for homes with large HVAC loads.",
    specs: [
      { label: "Usable capacity", value: "16 kWh" },
      { label: "Continuous output", value: "11.5 kW" },
      { label: "Surge", value: "22 kW / 10 s" },
      { label: "Chemistry", value: "LFP" },
    ],
    warranty: "10-year limited",
    accent: "slate",
    icon: "battery",
  },

  // ---- EV chargers ----
  {
    id: "amp-48",
    name: "AmpLine 48A Hardwired",
    brand: "AmpLine",
    category: "ev-chargers",
    tagline: "Fastest Level 2 charging for any modern EV.",
    specs: [
      { label: "Output", value: "11.5 kW / 48 A" },
      { label: "Range added", value: "~44 mi per hour" },
      { label: "Cable", value: "25 ft, cold-weather" },
      { label: "Rating", value: "NEMA 4 outdoor" },
    ],
    warranty: "5-year manufacturer",
    badge: "Best seller",
    accent: "blue",
    icon: "ev",
  },
  {
    id: "amp-flex",
    name: "AmpLine Flex 40A",
    brand: "AmpLine",
    category: "ev-chargers",
    tagline: "Plug-in charger you can take with you when you move.",
    specs: [
      { label: "Output", value: "9.6 kW / 40 A" },
      { label: "Range added", value: "~36 mi per hour" },
      { label: "Connection", value: "NEMA 14-50" },
      { label: "Load sharing", value: "Up to 4 units" },
    ],
    warranty: "3-year manufacturer",
    badge: "Best value",
    accent: "slate",
    icon: "ev",
  },
  {
    id: "amp-fleet",
    name: "AmpLine Fleet Duo",
    brand: "AmpLine",
    category: "ev-chargers",
    tagline: "Dual-port commercial pedestal with usage metering.",
    specs: [
      { label: "Output", value: "2 × 48 A" },
      { label: "Access control", value: "RFID + app" },
      { label: "Metering", value: "Revenue grade" },
      { label: "Mounting", value: "Pedestal or wall" },
    ],
    warranty: "5-year commercial",
    accent: "deep",
    icon: "ev",
  },

  // ---- Heat pumps ----
  {
    id: "aur-20",
    name: "Aurora 20 SEER2 Ducted",
    brand: "Aurora",
    category: "heat-pump",
    tagline: "Variable-speed ducted system that runs beautifully on solar.",
    specs: [
      { label: "Efficiency", value: "20 SEER2" },
      { label: "Capacity", value: "2–5 tons" },
      { label: "Compressor", value: "Inverter-driven" },
      { label: "Sound", value: "55 dB" },
    ],
    warranty: "10-year parts, 12-year compressor",
    accent: "blue",
    icon: "thermometer",
  },
  {
    id: "aur-mini",
    name: "Aurora Multi-Zone Mini Split",
    brand: "Aurora",
    category: "heat-pump",
    tagline: "Room-by-room comfort for additions, garages and offices.",
    specs: [
      { label: "Efficiency", value: "23 SEER2" },
      { label: "Zones", value: "Up to 5" },
      { label: "Heating to", value: "-4°F" },
      { label: "Sound", value: "19 dB indoor" },
    ],
    warranty: "10-year parts",
    badge: "New",
    accent: "slate",
    icon: "snowflake",
  },
  {
    id: "aur-hpwh",
    name: "Aurora Heat Pump Water Heater",
    brand: "Aurora",
    category: "heat-pump",
    tagline: "Cuts water-heating energy by up to 70% versus resistance.",
    specs: [
      { label: "Capacity", value: "65 gal" },
      { label: "UEF", value: "4.05" },
      { label: "Modes", value: "5 incl. vacation" },
      { label: "Control", value: "App + schedule" },
    ],
    warranty: "10-year tank",
    accent: "deep",
    icon: "flame",
  },

  // ---- Ceiling vacuum & insulation removal ----
  {
    id: "cv-full",
    name: "CavityVac Full Clear-Out",
    brand: "CavityVac",
    category: "ceiling-vacuum",
    tagline: "Whole roof space stripped back to bare joists and sanitised.",
    specs: [
      { label: "Coverage", value: "Whole ceiling" },
      { label: "Filtration", value: "HEPA H13" },
      { label: "Hose reach", value: "Up to 130 ft" },
      { label: "Typical time", value: "4–6 hours" },
    ],
    warranty: "Debris-free guarantee, re-inspected",
    badge: "Best seller",
    accent: "slate",
    icon: "waves",
  },
  {
    id: "cv-targeted",
    name: "CavityVac Targeted Removal",
    brand: "CavityVac",
    category: "ceiling-vacuum",
    tagline: "Single-room extraction for water, rodent or smoke damage.",
    specs: [
      { label: "Coverage", value: "Per room / zone" },
      { label: "Filtration", value: "HEPA H13" },
      { label: "Containment", value: "Negative pressure" },
      { label: "Typical time", value: "1–2 hours" },
    ],
    warranty: "Fixed price, no per-bag charges",
    accent: "deep",
    icon: "fan",
  },
  {
    id: "cv-sanitise",
    name: "CavityVac Sanitise & Seal",
    brand: "CavityVac",
    category: "ceiling-vacuum",
    tagline: "Post-removal treatment before new insulation goes back in.",
    specs: [
      { label: "Treatment", value: "Antimicrobial fog" },
      { label: "Rodent proofing", value: "Entry points sealed" },
      { label: "Dust", value: "Fully extracted" },
      { label: "Typical time", value: "1–2 hours" },
    ],
    warranty: "12-month rodent re-entry cover",
    accent: "blue",
    icon: "sparkles",
  },

  // ---- Ceiling insulation ----
  {
    id: "tl-r6",
    name: "ThermaLoft R6.0 Glasswool Batts",
    brand: "ThermaLoft",
    category: "ceiling-insulation",
    tagline: "The workhorse ceiling batt — friction-fit, no gaps, no sag.",
    specs: [
      { label: "R-value", value: "R6.0" },
      { label: "Material", value: "Glasswool" },
      { label: "Fire rating", value: "Non-combustible" },
      { label: "Coverage", value: "Cut to joist spacing" },
    ],
    warranty: "50-year material warranty",
    badge: "Best value",
    accent: "blue",
    icon: "layers",
  },
  {
    id: "tl-blown",
    name: "ThermaLoft Blown-In Cellulose",
    brand: "ThermaLoft",
    category: "ceiling-insulation",
    tagline: "Flows into awkward cavities that batts simply cannot reach.",
    specs: [
      { label: "R-value", value: "R5.0–R7.0" },
      { label: "Material", value: "Treated cellulose" },
      { label: "Best for", value: "Low-clearance roofs" },
      { label: "Settling", value: "Density-compensated" },
    ],
    warranty: "25-year settled-depth guarantee",
    badge: "New",
    accent: "deep",
    icon: "brickwall",
  },
  {
    id: "tl-poly",
    name: "ThermaLoft R7.0 Polyester",
    brand: "ThermaLoft",
    category: "ceiling-insulation",
    tagline: "Itch-free polyester for homes with allergy or asthma concerns.",
    specs: [
      { label: "R-value", value: "R7.0" },
      { label: "Material", value: "Recycled polyester" },
      { label: "Handling", value: "No itch, no fibres" },
      { label: "Acoustic", value: "Improved sound damping" },
    ],
    warranty: "Lifetime material warranty",
    badge: "Premium",
    accent: "slate",
    icon: "layers",
  },
];

export function getProductsByCategory(category?: string | null) {
  if (!category || category === "all") return products;
  return products.filter((product) => product.category === category);
}

/**
 * Async accessor so the catalogue can be swapped for a CMS or PIM call without
 * touching any consumer. The products route streams this behind a Suspense
 * boundary, which is what makes the skeleton grid meaningful.
 */
export async function getProductCatalogue(): Promise<Product[]> {
  return products;
}
