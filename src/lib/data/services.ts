/** Long-form process band shown under a service banner, where one is written. */
export type ServiceProcessBlock = {
  intro: string[];
  eyebrow: string;
  heading: string;
  headingAccent: string;
  description: string;
  steps: { title: string; body: string; icon: string }[];
};

/** Diagram-led "how it works" explainer shown under a service's process band. */
export type ServiceExplainerBlock = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Phrase inside `intro` to set in bold. */
  introEmphasis?: string;
  points: string[];
  image: { src: string; alt: string; width: number; height: number };
};

/** Indicative price list shown under a service's process band. */
export type ServicePricingBlock = {
  eyebrow: string;
  title: string;
  intro: string;
  columns: [string, string];
  rows: { size: string; cost: string }[];
  note: string;
  outro: string;
};

/**
 * A deck of cards under a service banner: rebate schemes, equipment types,
 * anything a service needs laid out side by side in the site's card language.
 * A card leads with a photograph where it has one, otherwise with its icon.
 */
export type ServiceCardDeckBlock = {
  eyebrow: string;
  title: string;
  /** Trailing phrase of the title, set in the brand gradient. */
  titleAccent?: string;
  intro?: string;
  /** `tinted` sits the band on the grey wash; `light` keeps it white. */
  tone?: "light" | "tinted";
  cards: {
    icon: string;
    title: string;
    body?: string;
    bullets?: string[];
    /** Short pill above the heading — a figure, a headline saving. */
    badge?: string;
    image?: { src: string; alt: string };
  }[];
  /** Caveat shown under the deck, in the same pill as the price note. */
  note?: string;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  icon: string;
  category:
    | "Electrical"
    | "Solar & Storage"
    | "Heating & Cooling"
    | "Compliance & Safety";
  heroStat: { value: string; label: string };
  highlights: string[];
  scope: { title: string; body: string; icon: string }[];
  process: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  priceFrom: string;
  turnaround: string;
  image: string;
  /** Full-bleed photograph behind the page banner, where we have one. */
  heroImage?: { src: string; position?: string };
  /**
   * Banner headline and standfirst, where the page needs to say more than the
   * nav does — the nav and service cards keep the short `title`.
   */
  heroTitle?: string;
  heroDescription?: string;
  processBlock?: ServiceProcessBlock;
  explainerBlock?: ServiceExplainerBlock;
  pricingBlock?: ServicePricingBlock;
  /** Card decks rendered under the blocks above, in order. */
  cardBlocks?: ServiceCardDeckBlock[];
  /** Closing call to action, shown even where the template sections are off. */
  closingCta?: { title: string; body: string };
  /**
   * Pages carrying their own long-form blocks drop the stock template
   * sections (inclusions, step list, FAQs, related services, closing CTA)
   * rather than repeating the same ground twice.
   */
  hideTemplateSections?: boolean;
};

export const services: Service[] = [
  {
    slug: "solar",
    title: "Solar",
    short: "Roof and ground-mount arrays engineered around your real usage.",
    summary:
      "We design solar around twelve months of your actual consumption data, not a sales average — then install it with the same crew that engineered it.",
    icon: "sun",
    category: "Solar & Storage",
    heroStat: { value: "38 MW", label: "installed to date" },
    highlights: [
      "Shade analysis and production modelling before you sign",
      "Tier-1 modules with 25-year product and performance warranties",
      "Rail-less mounting with flashed, watertight roof penetrations",
      "Utility interconnection and net-metering paperwork handled",
      "Monitoring app with per-panel production data",
    ],
    scope: [
      {
        title: "Engineered, not estimated",
        body: "Satellite modelling plus an on-roof survey produces a kWh forecast we put in writing and guarantee.",
        icon: "ruler",
      },
      {
        title: "Roof-first installation",
        body: "Our installers are roofers too. Every penetration is flashed and sealed, and your roof warranty stays intact.",
        icon: "shield",
      },
      {
        title: "Incentives, filed for you",
        body: "Federal tax credit documentation, utility rebates and interconnection applications are all handled in-house.",
        icon: "receipt",
      },
    ],
    process: [
      {
        title: "Energy audit",
        body: "We pull 12 months of interval data from your utility to size the array honestly.",
      },
      {
        title: "Design review",
        body: "You see the layout, the production model and the payback before anything is ordered.",
      },
      {
        title: "Permit & install",
        body: "Most residential systems are installed in one to two days once permits clear.",
      },
      {
        title: "Commissioning",
        body: "Utility sign-off, monitoring set-up and a walkthrough of your new production data.",
      },
    ],
    faqs: [
      {
        question: "How long until the system pays for itself?",
        answer:
          "Most Central Texas homes we install reach break-even in six to nine years, and the equipment is warranted for twenty-five. Your design proposal shows the payback maths with conservative rate-escalation assumptions.",
      },
      {
        question: "What happens on cloudy days?",
        answer:
          "Production drops but rarely stops — modern modules still generate meaningful power in diffuse light. Your system stays grid-connected, so any shortfall is drawn from the utility automatically.",
      },
      {
        question: "Will solar work with my roof?",
        answer:
          "Composition shingle, standing-seam metal, tile and flat commercial roofs are all supported. If your roof has fewer than five years left, we will tell you before you spend money on solar.",
      },
    ],
    priceFrom: "Free design & quote",
    turnaround: "3–5 weeks to power-on",
    heroImage: {
      src: "/images/hero/solar-home-install.jpg",
      position: "center 22%",
    },
    processBlock: {
      intro: [
        "Installing a solar system with battery storage in Australia is one of the smartest long-term investments homeowners and businesses can make to reduce electricity bills, protect against rising energy prices, and gain greater energy independence. With Australia's abundant sunlight and supportive government incentives, solar and battery installations are now more accessible and cost-effective than ever.",
        "A professionally installed solar power system paired with a battery allows you to generate, store, and use your own clean energy — day and night — while reducing reliance on the grid.",
      ],
      eyebrow: "How it works",
      heading: "Our Solar & Battery",
      headingAccent: "Installation Process",
      description:
        "Every installation follows a structured, compliant process designed to meet the highest Australian Standards.",
      steps: [
        {
          title: "Site Assessment",
          body: "Detailed energy assessment and physical site inspection to ensure your property is solar-ready.",
          icon: "scan",
        },
        {
          title: "Custom System Design",
          body: "Personalised engineering based on your specific energy usage and roof layout for maximum ROI.",
          icon: "ruler",
        },
        {
          title: "Grid Approval",
          body: "We handle all the paperwork, grid approvals, and compliance documentation for a stress-free experience.",
          icon: "clipboard",
        },
        {
          title: "SAA Accredited Install",
          body: "Professional installation by Solar Accreditation Australia (SAA) accredited installers ensuring elite workmanship.",
          icon: "hardhat",
        },
        {
          title: "Testing & Optimisation",
          body: "Final commissioning, performance testing, and smart optimisation to ensure your system is running perfectly.",
          icon: "gauge",
        },
      ],
    },
    explainerBlock: {
      eyebrow: "The basics",
      title: "How Solar Systems Work",
      intro:
        "A solar system typically utilises photovoltaic panels to enable sunlight conversion for a usable form of electricity. The system captures sunlight and converts it into direct current (DC) electricity.",
      introEmphasis: "direct current (DC)",
      points: [
        "DC power is transformed into AC current for home use by an inverter.",
        "Battery storage systems can store excess energy for use at night or during outages.",
        "A monitoring system provides real-time data on generation and utilisation.",
      ],
      image: {
        src: "/images/services/how-solar-works.svg",
        alt: "Diagram of a rooftop solar system: sunlight becomes electricity in the panels, an inverter turns DC into AC for the home, and a meter measures what is used or sent back to the grid or a battery.",
        width: 900,
        height: 700,
      },
    },
    pricingBlock: {
      eyebrow: "Pricing",
      title: "Solar System Prices in Australia",
      intro:
        "Solar system prices in Australia vary depending on system size and the type of equipment used. The table below provides a clear overview of average costs for different system capacities, helping you get a quick idea of what to expect when planning your installation.",
      columns: ["System Size", "Average Cost (AUD)"],
      rows: [
        { size: "6.6 kW", cost: "$3,999" },
        { size: "8 kW", cost: "$4,599" },
        { size: "10 kW", cost: "$5,999" },
        { size: "13.5 kW", cost: "$4,360" },
        { size: "20 kW", cost: "$10,299" },
        { size: "30 kW", cost: "$12,599" },
        { size: "40 kW", cost: "$16,599" },
        { size: "50 kW", cost: "$19,599" },
      ],
      note: "All prices listed are approximate and subject to change. Please request a quote for the most accurate and up-to-date pricing.",
      outro:
        "The final price of a solar system mainly depends on how large the installation is — basically, how many kilowatts (kW) of panels you choose. Panel selection plays a big role as well. For example, a 10 kW system built with premium panels like REC can cost nearly twice as much as the same-sized system using good-quality budget panels such as Jinko.",
    },
    hideTemplateSections: true,
    image: "/images/services/solar.jpg",
  },
  {
    slug: "battery",
    title: "Battery",
    short: "Keep the lights, fridge and Wi-Fi on when the grid goes down.",
    summary:
      "Stackable home batteries that carry your essential loads through an outage, shave peak-rate consumption, and pair with any solar array — new or existing.",
    icon: "battery",
    category: "Solar & Storage",
    heroStat: { value: "12 hrs", label: "typical backup" },
    highlights: [
      "Whole-home or essential-loads backup configurations",
      "Automatic transfer in under 20 milliseconds",
      "Time-of-use arbitrage to cut peak-rate charges",
      "Stackable 10–40 kWh capacity you can grow later",
      "Retrofits onto existing solar from any installer",
    ],
    scope: [
      {
        title: "Load study first",
        body: "We measure what you actually run during an outage so you buy the capacity you need — not a shelf-stock package.",
        icon: "linechart",
      },
      {
        title: "Seamless changeover",
        body: "Automatic transfer switching means your router never reboots and your fridge never warms up.",
        icon: "power",
      },
      {
        title: "Smarter every month",
        body: "Rate-aware charging schedules keep the battery full before storms and discharge it during peak pricing.",
        icon: "timer",
      },
    ],
    process: [
      {
        title: "Load study",
        body: "A week of circuit-level monitoring shows exactly what needs to stay alive.",
      },
      {
        title: "Sizing",
        body: "We model outage duration against capacity so the trade-offs are explicit.",
      },
      {
        title: "Install",
        body: "Battery, gateway and backup sub-panel installed in a single day on most homes.",
      },
      {
        title: "Outage drill",
        body: "We simulate a grid failure with you present so you know exactly what happens.",
      },
    ],
    faqs: [
      {
        question: "Can I add a battery to solar I already own?",
        answer:
          "In most cases, yes. AC-coupled batteries retrofit alongside almost any existing inverter. We verify compatibility during the site survey before you commit.",
      },
      {
        question: "How long will a battery run my house?",
        answer:
          "A 13.5 kWh battery typically carries essential loads — fridge, lighting, internet, a few outlets — for around 12 hours, or two to three days when paired with solar recharging each day.",
      },
      {
        question: "Do batteries qualify for the federal tax credit?",
        answer:
          "Standalone storage of 3 kWh or larger currently qualifies. We include the documentation you need with your final invoice.",
      },
    ],
    priceFrom: "From $11,400 installed",
    turnaround: "2–4 weeks",
    heroImage: {
      src: "/images/hero/solar-home-array.jpg",
      position: "center 46%",
    },
    heroTitle: "Battery Storage in Canberra",
    heroDescription:
      "Store the sun. Use it when you need it. Make the most of your solar energy with a home battery designed for your energy needs.",
    processBlock: {
      intro: [
        "A home battery stores the solar your panels make while the sun is up and gives it back after dark, so more of what your roof generates ends up inside your house instead of going back down the street for a few cents a kilowatt-hour.",
        "We size storage against twelve months of your own consumption rather than a brochure average, and install it under the same licence that covers your solar, your switchboard and your meter — one team, one warranty.",
      ],
      eyebrow: "Why a battery",
      heading: "Why add",
      headingAccent: "a battery?",
      description:
        "Five things a correctly sized battery changes about the way your home uses the power it already generates.",
      steps: [
        {
          title: "Store excess solar during the day",
          body: "Everything your panels make beyond what the house is using goes into the battery instead of back out to the grid.",
          icon: "sun",
        },
        {
          title: "Use your own energy at night",
          body: "Lighting, cooking and heating after sunset run on solar you have already paid for rather than on imported electricity.",
          icon: "moon",
        },
        {
          title: "Reduce your reliance on grid electricity",
          body: "The less you import at peak rates, the smaller the part of your bill that moves when retail prices move.",
          icon: "trendingdown",
        },
        {
          title: "Take greater control of your energy",
          body: "Monitoring shows what is stored, what is being used and what is being exported, in real time, on your phone.",
          icon: "gauge",
        },
        {
          title: "Optional backup power during outages",
          body: "Depending on the system, nominated circuits can keep running through a blackout. We tell you exactly which ones before you buy.",
          icon: "plugzap",
        },
      ],
    },
    explainerBlock: {
      eyebrow: "Local conditions",
      title: "Built for Canberra Homes",
      intro:
        "Canberra gets plenty of sunshine, so a battery can help you use more of the solar energy your system produces instead of sending excess energy to the grid.",
      introEmphasis: "use more of the solar energy your system produces",
      points: [
        "Cold winter evenings and hot summer afternoons are when Canberra households draw hardest — which is exactly when stored solar is worth the most to you.",
        "Storage is sized against twelve months of your own interval data, so the battery matches the way your household actually runs rather than an average one.",
        "Solar and electrical sit under one licence here, so the battery, the switchboard work and the grid application are handled by the same team.",
      ],
      image: {
        src: "/images/services/battery-canberra-home.jpg",
        alt: "An Australian suburban home with a rooftop solar array under a bright sky.",
        width: 1200,
        height: 900,
      },
    },
    cardBlocks: [
      {
        eyebrow: "Rebates and finance",
        title: "ACT Government",
        titleAccent: "Support",
        intro:
          "Two schemes can bring the cost of a battery down. We check which ones you qualify for before we quote, and handle the paperwork that comes with them.",
        tone: "tinted",
        cards: [
          {
            icon: "piggybank",
            title: "Sustainable Household Scheme",
            badge: "Up to $20,000",
            body: "Eligible ACT households may be able to access the Sustainable Household Scheme, which from 1 July 2026 allows eligible households to borrow up to $20,000 for eligible energy-efficient products, including battery storage.",
          },
          {
            icon: "percent",
            title: "Cheaper Home Batteries Program",
            badge: "Around 30% off",
            body: "The Australian Government's Cheaper Home Batteries Program provides eligible customers with an upfront discount of around 30% on battery installation costs.",
          },
        ],
        note: "Eligibility and conditions apply to both schemes. We will tell you which ones your household actually qualifies for before you commit to anything.",
      },
      {
        eyebrow: "Choosing a battery",
        title: "Types of Solar Battery",
        titleAccent: "Installations in Australia",
        intro:
          "There are various types of solar batteries that suit different needs — from a wall-mounted lithium unit in a suburban garage to a bank sized for a commercial site.",
        cards: [
          {
            icon: "battery",
            title: "Lithium-Ion Solar Batteries",
            bullets: [
              "Most common for residential use.",
              "High energy density and long lifespan (10–15 years).",
              "Eligible for federal rebates up to $336/kWh.",
            ],
            image: {
              src: "/images/services/battery-lithium-bank.jpg",
              alt: "A wall-mounted lithium battery bank and inverters installed in a home garage.",
            },
          },
          {
            icon: "layers",
            title: "Lead-Acid Solar Batteries",
            bullets: [
              "Budget-friendly for basic off-grid setups.",
              "Lower upfront cost but shorter lifespan (3–7 years).",
              "Suitable for remote areas with minimal cycling needs.",
            ],
            image: {
              src: "/images/services/battery-lead-acid.jpg",
              alt: "A lead-acid battery wired to a solar charge controller on an off-grid test bench.",
            },
          },
          {
            icon: "waves",
            title: "Flow Batteries (e.g. Vanadium Redox)",
            bullets: [
              "Scalable for larger homes or commercial use.",
              "Long lifespan (20+ years) with independent capacity.",
              "Ideal for high-demand systems with frequent outages.",
            ],
            image: {
              src: "/images/services/battery-grid-scale.jpg",
              alt: "Rows of large-scale battery storage cabinets on a commercial energy storage site.",
            },
          },
        ],
      },
    ],
    pricingBlock: {
      eyebrow: "Pricing",
      title: "Solar Battery Prices in Australia",
      intro:
        "Here is an overview of home battery sizes with estimated prices, so you can see roughly where your household is likely to land before you ask anyone for a quote.",
      columns: ["Battery Capacity (kWh)", "Battery Price"],
      rows: [
        { size: "5 kWh", cost: "$2,999" },
        { size: "10 kWh", cost: "$3,999" },
        { size: "15 kWh", cost: "$4,899" },
        { size: "20 kWh", cost: "$6,599" },
        { size: "30 kWh", cost: "$6,299" },
        { size: "40 kWh", cost: "$8,859" },
        { size: "50 kWh", cost: "$9,999" },
      ],
      note: "All prices listed are approximate and subject to change, and they cover the battery itself rather than the switchboard work a particular house turns out to need. Please request a quote for the most accurate and up-to-date pricing.",
      outro:
        "For the best price and expert advice, get in touch with Eagle. We will help you choose the right solar battery and the ideal battery size for your home or commercial property, with pricing based on your actual energy needs rather than on a package we happen to have in the van.",
    },
    closingCta: {
      title: "Tell us what you need. We're here to help.",
      body: "Our local team provides reliable solar and electrical services across Canberra and surrounding regions. Get in touch for a free quote or to discuss your project.",
    },
    hideTemplateSections: true,
    image: "/images/services/battery.jpg",
  },
  {
    slug: "air-conditioning",
    title: "Air Conditioning",
    short: "Split, ducted and multi-zone cooling sized for your rooms.",
    summary:
      "Cooling that is sized by calculation rather than habit — quiet, efficient systems installed with the electrical work, condensate and commissioning all handled by one crew.",
    icon: "aircon",
    category: "Heating & Cooling",
    heroStat: { value: "19 dB", label: "quietest indoor unit" },
    highlights: [
      "Wall-mounted splits, ducted systems and multi-head layouts",
      "Room-by-room heat load calculation before we quote",
      "Inverter compressors that hold temperature instead of cycling",
      "Dedicated circuits, isolators and tidy conduit included",
      "Filter, drainage and airflow checks at every service visit",
    ],
    scope: [
      {
        title: "Sized on heat load",
        body: "Glazing, orientation, ceiling height and insulation go into the calculation — an oversized unit costs more and dehumidifies worse.",
        icon: "ruler",
      },
      {
        title: "One crew, one invoice",
        body: "Refrigeration and electrical work are done together, so no one is waiting on another trade to energise the system.",
        icon: "handshake",
      },
      {
        title: "Commissioned properly",
        body: "Superheat and subcooling logged, airflow balanced and drainage fall-tested before we hand over the remote.",
        icon: "clipboard",
      },
    ],
    process: [
      {
        title: "Site visit",
        body: "We measure the rooms, check the switchboard capacity and agree unit positions.",
      },
      {
        title: "Fixed quote",
        body: "Line-itemed pricing covering equipment, brackets, pipework, electrical and make-good.",
      },
      {
        title: "Install",
        body: "Most single-head installs are done in a day; ducted systems take two to three.",
      },
      {
        title: "Handover",
        body: "Commissioning sheet, warranty registration and a walkthrough of the controller.",
      },
    ],
    faqs: [
      {
        question: "Split system or ducted?",
        answer:
          "Splits are cheaper per room and let you cool only what you use. Ducted is neater and better for whole-home comfort when the roof space allows it. We will price both when either would genuinely work.",
      },
      {
        question: "Will my switchboard handle another circuit?",
        answer:
          "We check available capacity and spare ways before quoting. If the board is full, we tell you the cost of the upgrade up front instead of discovering it on install day.",
      },
      {
        question: "How often should it be serviced?",
        answer:
          "Filters every few months, a full service annually. Neglected filters are the single most common cause of poor cooling and high running costs.",
      },
    ],
    priceFrom: "From $2,190 installed",
    turnaround: "Often same week",
    image: "/images/services/air-conditioning.jpg",
  },
  {
    slug: "ev-charger",
    title: "EV Charger",
    short: "Level 2 home charging and multi-bay commercial charging.",
    summary:
      "A properly sized circuit, a clean cable run and a charger that actually delivers its rated amps — installed by electricians who understand load calculations.",
    icon: "ev",
    category: "Electrical",
    heroStat: { value: "9 hrs", label: "faster than Level 1" },
    highlights: [
      "40A and 60A hardwired circuits sized to your panel",
      "Load-management devices when panel capacity is tight",
      "Weather-rated outdoor and garage installations",
      "Fleet and multi-family charging bays with metering",
      "Rebate paperwork for utility EV programs",
    ],
    scope: [
      {
        title: "Load calculation, always",
        body: "We run a full load calc before quoting so your charger never trips the main during a Texas summer.",
        icon: "gauge",
      },
      {
        title: "Cable runs that disappear",
        body: "Conduit is routed along framing lines and painted to match. No loops of orange cable across the garage.",
        icon: "circuit",
      },
      {
        title: "Any brand, any vehicle",
        body: "Tesla, ChargePoint, Wallbox, Emporia and Autel — installed and commissioned, app set-up included.",
        icon: "ev",
      },
    ],
    process: [
      {
        title: "Panel check",
        body: "Photo of your panel and meter gets you a firm quote, often the same day.",
      },
      {
        title: "Route plan",
        body: "We agree the charger position and conduit route before drilling anything.",
      },
      {
        title: "Install",
        body: "Most home installs are complete in three to four hours, permit included.",
      },
      {
        title: "Handover",
        body: "We charge your vehicle on site and set up scheduling in the manufacturer's app.",
      },
    ],
    faqs: [
      {
        question: "Do I need a panel upgrade for an EV charger?",
        answer:
          "Often not. A load calculation frequently shows existing capacity is sufficient, and where it is tight a load-management device is far cheaper than a service upgrade. We tell you which applies before you buy hardware.",
      },
      {
        question: "How fast will my car charge?",
        answer:
          "A 48A Level 2 charger adds roughly 35–44 miles of range per hour on most EVs — a full overnight charge for nearly any battery.",
      },
      {
        question: "Can you install a charger I already bought?",
        answer:
          "Yes. We install customer-supplied hardware at the same labour rate and still warranty our own workmanship for 25 years.",
      },
    ],
    priceFrom: "From $749 installed",
    turnaround: "Often same week",
    image: "/images/services/ev-charger.jpg",
  },
  {
    slug: "residential",
    title: "Residential",
    short: "Rewiring, lighting, circuits and safe modern power for your home.",
    summary:
      "From a single stubborn outlet to a whole-home rewire, our licensed electricians bring older houses up to current code and make new builds effortless to live in.",
    icon: "plug",
    category: "Electrical",
    heroStat: { value: "4,100+", label: "homes serviced" },
    highlights: [
      "Whole-home rewiring and knob-and-tube replacement",
      "Recessed, accent and landscape lighting design",
      "Dedicated circuits for kitchens, offices and workshops",
      "Smart switches, dimmers and home automation wiring",
      "GFCI / AFCI protection and surge suppression",
    ],
    scope: [
      {
        title: "Diagnostics that actually find the fault",
        body: "Thermal imaging and circuit tracing locate the real problem instead of replacing parts until something works.",
        icon: "activity",
      },
      {
        title: "Code-correct, inspection-ready work",
        body: "Every circuit is labelled, torqued to spec and documented so your next inspection or appraisal is painless.",
        icon: "clipboard",
      },
      {
        title: "Clean, respectful installs",
        body: "Drop cloths, boot covers and a tidy jobsite. We patch what we cut and haul away what we remove.",
        icon: "sparkles",
      },
    ],
    process: [
      {
        title: "Walkthrough",
        body: "We map your existing circuits and listen to what is actually frustrating you.",
      },
      {
        title: "Fixed-price scope",
        body: "A written quote with line items — no allowances, no surprise change orders.",
      },
      {
        title: "Install",
        body: "Licensed electricians, permits pulled, and daily updates while we are on site.",
      },
      {
        title: "Sign-off",
        body: "Photo documentation, panel schedule and a 25-year workmanship warranty.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my home needs rewiring?",
        answer:
          "Recurring breaker trips, warm faceplates, two-prong outlets, cloth or aluminium conductors, and any panel older than 40 years are all strong signals. Our safety inspection gives you a circuit-by-circuit report so you can plan the work in stages if you prefer.",
      },
      {
        question: "Do you pull permits?",
        answer:
          "Always. Permits and inspections are included in the quoted price for every job that requires them, and we schedule the inspection on your behalf.",
      },
      {
        question: "Can you work around my family's schedule?",
        answer:
          "Yes. We stage rewires room by room so you keep power where you need it, and we can work evenings or weekends at no premium for planned projects.",
      },
    ],
    priceFrom: "$189 service call",
    turnaround: "Next-day booking",
    image: "/images/services/residential.jpg",
  },
  {
    slug: "electric-heat-pumps",
    title: "Electric Heat Pumps",
    short: "Space and hot-water heat pumps that run beautifully on solar.",
    summary:
      "Heat pumps move heat instead of burning fuel to make it, which is why they deliver three to four units of heating for every unit of electricity — and why they pair so well with a rooftop array.",
    icon: "thermometer",
    category: "Heating & Cooling",
    heroStat: { value: "3.8×", label: "typical efficiency (COP)" },
    highlights: [
      "Ducted and multi-zone reverse-cycle space heating",
      "Heat pump hot water swapped for gas or resistive tanks",
      "Cold-climate models that keep full output below freezing",
      "Timers set to run on your cheapest or solar-covered hours",
      "Gas decommissioning and circuit upgrades handled with it",
    ],
    scope: [
      {
        title: "Running cost, modelled",
        body: "We show the annual cost against your current gas or resistive heating so the decision is a number, not a promise.",
        icon: "linechart",
      },
      {
        title: "Solar-aware scheduling",
        body: "Hot water and pre-heating are timed to run while your array is producing, which is where most of the saving actually comes from.",
        icon: "sun",
      },
      {
        title: "Electrical work included",
        body: "Dedicated circuits, isolators and any switchboard work are part of the quote — not a second contractor's problem.",
        icon: "circuit",
      },
    ],
    process: [
      {
        title: "Assessment",
        body: "Current heating bills, hot-water usage and the building envelope are reviewed together.",
      },
      {
        title: "Proposal",
        body: "Equipment options with modelled running costs, rebates applied and payback shown.",
      },
      {
        title: "Changeover",
        body: "Old system removed, heat pump installed and commissioned, usually within a day.",
      },
      {
        title: "Tuning",
        body: "We revisit the schedule after the first month and adjust it against your real usage.",
      },
    ],
    faqs: [
      {
        question: "Do heat pumps work when it is genuinely cold?",
        answer:
          "Yes. Cold-climate units hold rated capacity down to around -4°F and keep working below that with reduced output. We specify the model against your local design temperature, not a national average.",
      },
      {
        question: "Is it worth replacing a working gas system?",
        answer:
          "Sometimes not yet. If your unit is young and gas is cheap where you are, we will say so. The proposal shows the crossover point so you can plan the swap for when the old system fails.",
      },
      {
        question: "Will my hot water run out?",
        answer:
          "A correctly sized heat pump tank recovers continuously and holds a full day of usage. We size on household size and peak draw, not just tank volume.",
      },
    ],
    priceFrom: "From $3,600 installed",
    turnaround: "1–2 weeks",
    image: "/images/services/electric-heat-pumps.jpg",
  },
  {
    slug: "induction-cooktop",
    title: "Induction Cooktop",
    short: "Induction installs with the circuit, cut-out and gas removal done.",
    summary:
      "Induction is faster than gas, cooler in the room and far easier to clean — but it needs a dedicated high-current circuit. We handle the whole changeover, benchtop cut-out included.",
    icon: "cooktop",
    category: "Electrical",
    heroStat: { value: "90%", label: "energy into the pan" },
    highlights: [
      "Dedicated 32A–40A circuits sized to the appliance",
      "Benchtop cut-out and templating for stone, timber and laminate",
      "Gas cooktop disconnection and capping coordinated",
      "Switchboard capacity checked before you buy the appliance",
      "Rangehood, downlight and power point work done in the same visit",
    ],
    scope: [
      {
        title: "Checked before you buy",
        body: "Send us the model number and we confirm the circuit, clearance and cut-out it needs — before the appliance is in your kitchen.",
        icon: "check",
      },
      {
        title: "Cabinetry treated carefully",
        body: "Cut-outs are templated and dust-extracted on site, with the drawer clearance underneath verified against the manual.",
        icon: "ruler",
      },
      {
        title: "Gas out, safely",
        body: "The old cooktop is disconnected and the gas point capped and tested by a licensed fitter as part of the job.",
        icon: "shield",
      },
    ],
    process: [
      {
        title: "Model check",
        body: "Appliance specs and a photo of your switchboard tell us what the install needs.",
      },
      {
        title: "Quote",
        body: "Circuit, cut-out, gas capping and make-good priced as one fixed number.",
      },
      {
        title: "Install",
        body: "Typically half a day, including testing every zone with a pan on it.",
      },
      {
        title: "Handover",
        body: "Compliance certificate, circuit labelled and the old appliance taken away.",
      },
    ],
    faqs: [
      {
        question: "Can I keep my existing pans?",
        answer:
          "If a magnet sticks firmly to the base, it will work. Cast iron and most stainless are fine; aluminium and copper without a magnetic base are not.",
      },
      {
        question: "Do I need a switchboard upgrade?",
        answer:
          "Only if there is no spare capacity or space for the new circuit. We check that during the quote, and a meter box upgrade can be bundled into the same visit if one is needed.",
      },
      {
        question: "Can you install a cooktop I bought myself?",
        answer:
          "Yes, that is the usual arrangement. We install customer-supplied appliances at the same labour rate and register the compliance paperwork either way.",
      },
    ],
    priceFrom: "From $890 installed",
    turnaround: "Next-day booking",
    image: "/images/services/induction-cooktop.jpg",
  },
  {
    slug: "test-and-tag",
    title: "Test and Tag",
    short: "Appliance testing and tagging with an audit-ready register.",
    summary:
      "Portable appliance testing for offices, sites, rentals and workshops — every item tested, tagged, photographed and returned to you as a register you can hand straight to an auditor or insurer.",
    icon: "tags",
    category: "Compliance & Safety",
    heroStat: { value: "24 hrs", label: "register turnaround" },
    highlights: [
      "Earth continuity, insulation resistance and polarity testing",
      "Durable tags with test date, next-due date and technician ID",
      "Digital asset register with photos and serial numbers",
      "RCD push-button and trip-time testing on the same visit",
      "Scheduled reminders so nothing lapses between rounds",
    ],
    scope: [
      {
        title: "Everything on the register",
        body: "Each item gets an asset ID, a result and a photo — so a failed tag can be traced to a specific machine, not a vague description.",
        icon: "clipboard",
      },
      {
        title: "Tested, not just tagged",
        body: "Measured results are recorded against every item. A tag without a reading behind it proves nothing.",
        icon: "scan",
      },
      {
        title: "Out of your way",
        body: "Evening, weekend and staged rounds so testing never takes a work area offline during trading hours.",
        icon: "timer",
      },
    ],
    process: [
      {
        title: "Scope",
        body: "A quick walk or asset list gives us item counts and a fixed per-item price.",
      },
      {
        title: "Test round",
        body: "Items are tested, tagged and logged; failures are isolated and reported immediately.",
      },
      {
        title: "Register",
        body: "A digital register with results, photos and next-due dates within 24 hours.",
      },
      {
        title: "Reminders",
        body: "We schedule the next round and remind you before anything expires.",
      },
    ],
    faqs: [
      {
        question: "How often does equipment need testing?",
        answer:
          "It depends on the environment: construction and hire equipment is typically every three months, workshops every six to twelve, and low-risk office equipment every one to five years. We set the interval per item on your register.",
      },
      {
        question: "What happens to items that fail?",
        answer:
          "They are tagged out, isolated and listed separately with the measured result. We quote the repair if it is worth repairing and tell you plainly when it is not.",
      },
      {
        question: "Do you test RCDs and switchboards too?",
        answer:
          "Yes. RCD push-button and trip-time testing is usually done in the same visit, and thermal imaging of distribution boards can be added to the scope.",
      },
    ],
    priceFrom: "From $4.50 per item",
    turnaround: "Booked within a week",
    image: "/images/services/test-and-tag.jpg",
  },
  {
    slug: "meter-box-upgrade",
    title: "Meter Box Upgrade",
    short: "New enclosures, mains and switchboards for electrified homes.",
    summary:
      "Solar, batteries, EV chargers and heat pumps all land back at the meter box. We replace tired enclosures and undersized mains with capacity and protection you will not outgrow.",
    icon: "gauge",
    category: "Compliance & Safety",
    heroStat: { value: "1 day", label: "typical changeover" },
    highlights: [
      "Enclosure replacement with compliant clearances and access",
      "Mains upgrades and consumer-side rewiring",
      "RCD and surge protection fitted across every circuit",
      "Defect notice rectification and utility coordination",
      "Solar, battery and EV supply provisions built in from the start",
    ],
    scope: [
      {
        title: "Utility work coordinated",
        body: "We book the disconnect and reconnect so your outage is measured in hours, not days, and meet the inspector on site.",
        icon: "handshake",
      },
      {
        title: "Future-proof capacity",
        body: "Boards are specified for the loads you will add in the next decade, with spare ways left free to match.",
        icon: "trendingdown",
      },
      {
        title: "Labelled and documented",
        body: "You get a typed circuit schedule, torque records, photos of every termination and the compliance certificate.",
        icon: "clipboard",
      },
    ],
    process: [
      {
        title: "Load calc",
        body: "Existing and planned loads are calculated to specify the right supply size.",
      },
      {
        title: "Permit & utility",
        body: "We file the paperwork and book the utility disconnect window.",
      },
      {
        title: "Changeover",
        body: "Old board out, new gear in, power restored the same day in most cases.",
      },
      {
        title: "Inspection",
        body: "We meet the inspector on site and handle any corrections at our cost.",
      },
    ],
    faqs: [
      {
        question: "How long will my power be off?",
        answer:
          "Typically six to eight hours on a standard residential changeover. We schedule early starts and can supply a generator where there are medical or work-from-home needs.",
      },
      {
        question: "I have a defect notice — how fast can you act?",
        answer:
          "Defect rectification is prioritised. Send us a photo of the notice and the board and we will quote the same day, then book to the deadline on the notice.",
      },
      {
        question: "Do I need this before adding solar or an EV charger?",
        answer:
          "Often yes, if the board is full, has no RCD protection or the enclosure is non-compliant. Doing it first is cheaper than doing it twice — we will tell you which applies after looking at your board.",
      },
    ],
    priceFrom: "From $2,850",
    turnaround: "1–2 weeks",
    image: "/images/services/meter-box-upgrade.jpg",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const serviceCategories = [
  "All",
  "Electrical",
  "Solar & Storage",
  "Heating & Cooling",
  "Compliance & Safety",
] as const;
