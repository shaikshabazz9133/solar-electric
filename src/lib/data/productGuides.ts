/**
 * Long-form editorial for a product category landing page
 * (`/products?category=<slug>`).
 *
 * Only categories with a guide here render the editorial block — a category
 * without one falls back to the range grid alone rather than to filler copy.
 */

export type GuideSection = {
  heading: string;
  /** Each string is its own paragraph. */
  body?: string[];
  bullets?: string[];
  subsections?: { heading: string; body: string }[];
};

export type CategoryGuide = {
  /** Overrides the page H1 when this category is selected. */
  title: string;
  /** Overrides the hero standfirst. */
  intro: string;
  /** Full-bleed hero photograph for this category. */
  heroImage: { src: string; position?: string };
  /** Heading above the product grid. */
  rangeTitle: string;
  rangeDescription: string;
  sections: GuideSection[];
  /** Closing line under the editorial, with a single link. */
  closing?: { lead: string; label: string; href: string; trail: string };
  /**
   * Everything a single product's detail page adds on top of its own specs.
   * It hangs off the category rather than the product because it is the same
   * answer whichever module in the range you landed on.
   */
  detail?: CategoryDetail;
};

export type DataTable = {
  heading: string;
  intro?: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type CategoryDetail = {
  /** Headline capabilities, shown as chips beside the hero photograph. */
  features: string[];
  about: { heading: string; body: string[] };
  /** Indicative installed pricing, rendered as a table. */
  pricing?: DataTable;
  pros: { heading: string; items: string[] };
  cons: { heading: string; items: string[] };
  why: { heading: string; intro?: string; points: { heading: string; body: string }[] };
  choose: { heading: string; intro?: string; points: { heading: string; body: string }[] };
  /** Extra authored tables — model feature matrices, anything with fixed rows. */
  tables?: DataTable[];
  /** Numbered platform / model families, the way a manufacturer lists a series. */
  series?: {
    heading: string;
    intro?: string;
    items: { heading: string; body: string }[];
    note?: string;
  };
  /** Headline price cards under the pricing table. */
  priceCards?: {
    heading?: string;
    items: { name: string; price: string; note?: string }[];
  };
  /** Price breakdowns by size or family, as labelled bullet groups. */
  priceNotes?: {
    heading: string;
    intro?: string;
    bullets: { label: string; body: string }[];
    closing?: string;
  }[];
  /** "Factors to consider when selecting one" — a labelled checklist. */
  factors?: {
    heading: string;
    intro?: string;
    items: { label: string; body: string }[];
  };
  /** What owners report back, as labelled bullets. */
  reviews?: {
    heading: string;
    intro?: string;
    items: { label: string; body: string }[];
    closing?: string;
  };
  /** Numbered install / maintenance checklist. */
  tips?: { heading: string; intro?: string; items: string[] };
  faqs: { question: string; answer: string }[];
  /** Closing verdict — the "should I buy this?" answer. */
  verdict?: { heading: string; body: string[]; pullQuote?: string };
};

export const categoryGuides: Record<string, CategoryGuide> = {
  "solar-panels": {
    title: "Solar Panels",
    intro:
      "We supply solar panels with anti-reflective, self-cleaning front glass, reliable cells and UV-stable encapsulation, so the array you pay for is still producing three decades from now. Every module we quote is one we have installed, monitored and warranted ourselves.",
    heroImage: { src: "/images/hero/solar-crew.jpg", position: "center 42%" },
    rangeTitle: "The modules we stock",
    rangeDescription:
      "Tier-1 panels chosen on field failure rates and warranty responsiveness, not on datasheet headlines. Pricing depends on system design, roof access and incentives, so we quote rather than list.",
    sections: [
      {
        heading: "What are solar panels and why do you need them?",
        body: [
          "Solar panels are the core component of any solar power system. They capture sunlight and convert it into clean, renewable electricity that powers your home or business. Installing solar panels reduces your power bill, insulates you from rising energy costs and lowers your carbon footprint.",
          "Whether you are researching solar panel cost, comparing panel prices or trying to identify the best panels for your roof, understanding how the modules actually work is the first step to a smart investment.",
        ],
      },
      {
        heading: "Types of solar panels",
        subsections: [
          {
            heading: "Monocrystalline panels — high efficiency, premium performance",
            body: "Monocrystalline panels are known for high efficiency, a clean all-black appearance and strong output where roof space is limited. They suit homeowners who want maximum production from a compact array and long-term reliability in hot climates.",
          },
          {
            heading: "Polycrystalline panels — cost-effective and reliable",
            body: "Polycrystalline panels are a more affordable option that still delivers dependable generation. They remain a sensible choice for larger roofs where there is room to trade a little efficiency for a lower cost per watt.",
          },
          {
            heading: "N-type and high-efficiency panels — next-generation technology",
            body: "Advanced module technologies such as N-type TOPCon and bifacial cells deliver higher energy yield, better temperature coefficients and a slower degradation curve. These are the panels to specify when you want maximum lifetime savings from the roof you have.",
          },
        ],
      },
      {
        heading: "Solar panels for home: choosing the right system",
        body: [
          "Selecting the right panels for your home comes down to a handful of decisions we work through with you before anything is ordered:",
        ],
        subsections: [
          {
            heading: "Energy consumption and system sizing",
            body: "Most residential systems land between 6.6 kW and 10 kW, with the module count driven by how much power the household actually uses. We read your last twelve months of bills, check roof orientation and shading, and size the array so it covers your load without overbuilding it.",
          },
          {
            heading: "Roof space and panel efficiency",
            body: "Limited roof space makes high-efficiency panels worth the premium — they generate more electricity per square metre. Where there is plenty of area, standard-efficiency modules cost less per watt and produce the same result. We model your roof's size, pitch and shading to work out which way the numbers fall.",
          },
        ],
      },
      {
        heading: "Quality solar panels, honestly specified",
        body: [
          "We supply only premium modules from globally trusted manufacturers, selected for the conditions they will actually work in. Our range gives you:",
        ],
        bullets: [
          "Industry-leading brands with proven field performance",
          "Panels tested against high ambient temperatures and real grid conditions",
          "Long-term product and performance warranties, claimed in-house",
          "Guidance from licensed electricians, not a call centre",
        ],
      },
      {
        heading: "Buy solar panels with expert installation",
        body: [
          "Looking for a complete home solar system rather than a box of modules? We deliver end to end — panel selection, system design, permitting, installation and commissioning — so there is one team accountable for the result.",
          "Our transparent pricing, honest advice and tailored designs are why customers come back to us for storage, EV charging and switchboard work after the array goes on. No shortcuts, no subcontracted crews you have never met.",
        ],
      },
    ],
    closing: {
      lead: "Browse the modules above, or ",
      label: "talk to us about your roof",
      href: "/contact",
      trail: " and we will design the right system for your home.",
    },
    detail: {
      features: [
        "Efficiency up to 23.4%",
        "N-type TOPCon and HJT cells",
        "Low temperature coefficient",
        "Positive power tolerance",
        "All-black aesthetic options",
        "Up to 30-year performance warranty",
      ],
      about: {
        heading: "About the range",
        body: [
          "Every module we carry is a Tier-1 product from a manufacturer with a bankable balance sheet, a local distribution arm and a warranty department that answers the phone. That last part matters more than any datasheet line: a 30-year warranty from a company that folds in year eight is worth nothing.",
          "We keep the range deliberately narrow. Three modules cover almost every roof we see — a high-yield bifacial for tight roof planes, an all-black panel for street-facing arrays, and a heterojunction module where every square foot has to earn its keep. If your roof needs something else, we will source it and tell you why.",
        ],
      },
      pricing: {
        heading: "Installed system pricing",
        intro:
          "Indicative turnkey pricing — panels, inverter, mounting, labour, permitting and commissioning included. Your number depends on roof access, switchboard condition and which incentives you qualify for.",
        columns: ["System size", "Panels used", "Total installed", "Price per watt"],
        rows: [
          ["6.6 kW", "15–16 modules (410–460 W)", "$11,400 – $14,200", "$1.73 – $2.15"],
          ["8.0 kW", "18–20 modules (410–460 W)", "$13,200 – $16,400", "$1.65 – $2.05"],
          ["10.0 kW", "22–24 modules (410–460 W)", "$15,800 – $19,500", "$1.58 – $1.95"],
          ["13.0 kW", "29–32 modules (410–460 W)", "$19,900 – $24,600", "$1.53 – $1.89"],
          ["20.0 kW", "44–48 modules (410–460 W)", "$29,400 – $36,000", "$1.47 – $1.80"],
        ],
        note:
          "Ranges are for standard composition or metal roofs with a compliant switchboard, before any federal or utility incentive. Tile, slate, two-storey and structural upgrades are priced on inspection. We put a fixed number in writing after the site visit — never a moving one.",
      },
      priceCards: {
        heading: "Common system sizes",
        items: [
          { name: "6.6 kW, 15 modules", price: "$11,400", note: "Small to average home" },
          { name: "8.0 kW, 18 modules", price: "$13,200", note: "Average home with AC" },
          { name: "10.0 kW, 22 modules", price: "$15,800", note: "Most common install" },
          { name: "13.0 kW, 29 modules", price: "$19,900", note: "Large home or EV" },
        ],
      },
      priceNotes: [
        {
          heading: "6.6 kW system pricing",
          intro:
            "The entry point for a genuinely useful array, and the size most people price first.",
          bullets: [
            { label: "15 – 16 modules at 410 – 460 W", body: "approximately $11,400 – $14,200 installed" },
            { label: "Ideal for", body: "a smaller home, or a household that uses most of its power in the evening" },
            { label: "Typical production", body: "roughly 9,500 – 11,000 kWh a year in Central Texas" },
          ],
          closing:
            "At this size the fixed costs — permits, inverter, labour, mobilisation — are a large share of the total, which is why cost per watt is highest here.",
        },
        {
          heading: "10 kW system pricing",
          intro:
            "The most common size we install, and usually the best value per watt for a family home.",
          bullets: [
            { label: "22 – 24 modules at 410 – 460 W", body: "approximately $15,800 – $19,500 installed" },
            { label: "Ideal for", body: "a household with central air conditioning and a pool pump or an EV" },
            { label: "Typical production", body: "roughly 14,500 – 16,500 kWh a year in Central Texas" },
          ],
          closing:
            "The fixed costs are spread across more panels here, so the price per watt drops noticeably against a 6.6 kW build for a much larger result.",
        },
        {
          heading: "Premium and high-efficiency modules",
          intro:
            "What the step up to heterojunction or bifacial actually costs on a real roof.",
          bullets: [
            { label: "410 W all-black mono PERC", body: "approximately $1.53 – $1.95 per watt installed" },
            { label: "440 W bifacial N-type TOPCon", body: "approximately $1.58 – $2.15 per watt installed" },
            { label: "460 W heterojunction", body: "approximately $1.73 – $2.15 per watt installed" },
          ],
          closing:
            "The premium is worth paying when roof area is the constraint. Where there is room to spread out, the cheaper module reaches the same annual production for less money.",
        },
      ],
      tables: [
        {
          heading: "Cell technology compared",
          intro:
            "The three technologies on our range, and what actually separates them once they are on a roof in August.",
          columns: ["Technology", "Efficiency", "Temp. coefficient", "Annual degradation", "Best for"],
          rows: [
            ["Mono PERC", "21.3%", "-0.30%/°C", "0.55%", "Street-facing, all-black roofs"],
            ["N-type TOPCon", "22.6%", "-0.29%/°C", "0.40%", "Standard roofs with room"],
            ["Heterojunction (HJT)", "23.4%", "-0.24%/°C", "0.25%", "Small or complex roofs"],
            ["Polycrystalline", "~17%", "-0.40%/°C", "0.70%", "No longer specified"],
          ],
          note:
            "Temperature coefficient is the number that matters most here. A module losing 0.24% per degree above test conditions holds noticeably more output through a 105°F afternoon than one losing 0.40%, whatever the headline efficiency says.",
        },
      ],
      series: {
        heading: "The module families we install",
        intro:
          "Four options cover almost every roof we quote. Which one you land on is decided by available area, shading and how visible the array will be.",
        items: [
          {
            heading: "Bifacial N-type TOPCon",
            body: "Our default 440 W module. N-type cells hold their output better in heat and degrade at 0.40% a year rather than 0.55%. The rear face picks up reflected light, worth up to 10% on a light-coloured roof and close to nothing on dark shingle.",
          },
          {
            heading: "All-black mono PERC",
            body: "410 W with a black frame, black backsheet and no visible busbars. Slightly lower efficiency than the bifacial, and the right call on any roof plane that faces the street or sits under an HOA. Costs less per watt, too.",
          },
          {
            heading: "Heterojunction (HJT)",
            body: "460 W and 23.4% efficient, with the best temperature coefficient and the slowest degradation curve in the range. You buy this when roof area is the binding constraint and every square foot has to produce.",
          },
          {
            heading: "Large-format commercial",
            body: "550 W and up on a longer frame, for ground mounts and large shed roofs where the racking cost per module matters more than fitting neatly around dormers. Sized to the inverter and the interconnection agreement rather than to the roof outline.",
          },
        ],
        note:
          "Every module we quote is Tier-1, IEC hail-impact certified and rated to 2400 Pa wind and 5400 Pa snow load. We confirm utility approval before it goes on a proposal.",
      },
      pros: {
        heading: "What we like",
        items: [
          "Tier-1 manufacturers with the balance sheet to honour a 25-year term",
          "N-type cells hold their output far better through a 105°F afternoon",
          "Positive power tolerance — you never receive less than the label",
          "All-black options that keep a street-facing roof looking deliberate",
          "Warranty claims lodged and chased by us, not by you",
        ],
      },
      cons: {
        heading: "Worth knowing before you sign",
        items: [
          "High-efficiency modules cost more per watt than standard panels",
          "Bifacial gain is real on light roofs and near-zero on dark shingle",
          "Cells are manufactured overseas, so a claim can take weeks, not days",
          "A shaded roof needs optimisers or microinverters, which adds cost",
        ],
      },
      why: {
        heading: "Why these modules suit Central Texas",
        intro:
          "Panels are certified at 77°F. Your roof will not see 77°F between May and September, which is why we weight the selection the way we do.",
        points: [
          {
            heading: "Proven in real heat",
            body: "A low temperature coefficient is the single most useful number on a Texas datasheet. Every module we quote loses less than 0.30% of its output per degree above test conditions, so summer production holds up when you need the air conditioning most.",
          },
          {
            heading: "Hail and wind rated",
            body: "All modules in the range are certified to 5,400 Pa snow and 2,400 Pa wind load, and carry IEC hail impact certification. Mounting is engineered to the wind zone for your address, not to a generic template.",
          },
          {
            heading: "Priced against payback, not against a headline",
            body: "We model production and payback for both a standard and a high-efficiency build, then show you both. Sometimes the cheaper panel wins. We would rather you saw that than took our word for it.",
          },
          {
            heading: "Supported locally",
            body: "Design, installation, commissioning and warranty all sit with the same licensed team. No subcontracted crew, no handing you a manufacturer's phone number when something fails.",
          },
          {
            heading: "Incentive paperwork handled",
            body: "Federal credit and utility interconnection paperwork is filed by us as part of the job, so the incentive you were quoted is the incentive you actually receive.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right module for you",
        points: [
          {
            heading: "Standard residential roof",
            body: "Plenty of unshaded south or west-facing area? A 410–440 W module gives you the lowest cost per watt and hits your production target without paying for efficiency you do not need.",
          },
          {
            heading: "Small or complex roof",
            body: "Limited area, dormers, or several small planes? Step up to a 460 W heterojunction module. Fewer panels, more output per square foot, and a cleaner-looking array.",
          },
          {
            heading: "Street-facing and HOA-sensitive",
            body: "Where the array is the first thing you see from the kerb, the all-black module is worth the small premium. Black frame, black backsheet, no visible busbars.",
          },
          {
            heading: "Commercial and high-consumption",
            body: "Above about 15 kW the economics shift toward the highest-yield module and a three-phase inverter. We size these off interval data from your utility rather than off an annual bill.",
          },
        ],
      },
      factors: {
        heading: "What to weigh before you choose",
        intro: "Seven questions, worked through before anything is ordered.",
        items: [
          { label: "Annual consumption", body: "Twelve months of bills, read rather than estimated — it sets the array size before anything else does." },
          { label: "Usable roof area", body: "How many modules actually fit once setbacks, vents, flues and fire access are taken out." },
          { label: "Orientation and pitch", body: "South is best, west is close behind for afternoon peak, and east-west splits need a tracker each." },
          { label: "Shading", body: "Trees, chimneys and neighbouring roofs, modelled across the year — this decides string versus microinverter." },
          { label: "Roof age and material", body: "A roof with five years left should be replaced first. Tile and slate cost more to mount than composition." },
          { label: "Future load", body: "An EV, a pool pump or a battery in the next few years argues for building headroom in now." },
          { label: "Incentives", body: "Federal credit and any utility programme, which we confirm you qualify for before quoting a net number." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the arrays we have commissioned, in the words it usually arrives in.",
        items: [
          { label: "The summer bill is the shock", body: "Most people expect a gradual saving and instead see their worst month of the year cut in half. August is when an array here earns its keep." },
          { label: "Production matched the model", body: "Owners check the app against our production estimate for the first few months. We size conservatively, so it usually runs slightly ahead." },
          { label: "They stop thinking about it", body: "After the first season the monitoring goes unopened. Panels have no moving parts and there is genuinely nothing to do." },
          { label: "The battery question comes later", body: "A large share of customers come back within two years asking about storage, which is why we push hybrid-ready inverters at install." },
        ],
        closing:
          "The one regret we hear is size, not brand — households who fitted a small array and then bought an EV. Roof space is cheap to fill at install and expensive to add to afterwards.",
      },
      tips: {
        heading: "Installation and maintenance",
        intro:
          "Five things that decide whether an array is still producing to spec in year fifteen.",
        items: [
          "Replace the roof first if it has under about ten years left. Removing and refitting an array later costs more than the roof work does.",
          "Model the shade properly before choosing an inverter platform. A single shaded module on a string drags the whole string down with it.",
          "Leave monitoring connected. A string that drops out is invisible from the ground and shows up immediately in the data.",
          "Hose the modules down once or twice a year in dry spells. Dust and pollen cost a few percent; anything more aggressive is unnecessary.",
          "Keep trees trimmed back on the sun path. Shade that was not there at install is the most common cause of production drifting down over time.",
        ],
      },
      faqs: [
        {
          question: "How long do solar panels actually last?",
          answer:
            "The modules we install carry a 25 to 30-year performance warranty, guaranteeing at least 87% of rated output at year 30. In practice panels keep producing well past that — output simply drifts down by roughly 0.4% a year. The inverter is the component you should expect to replace once in the system's life.",
        },
        {
          question: "Do I need the most efficient panel available?",
          answer:
            "Only if your roof is short on space. Efficiency determines how many watts fit per square foot, not how much energy each watt produces. If you have room for a larger array, a standard-efficiency module reaches the same annual production for less money.",
        },
        {
          question: "What happens if a panel fails?",
          answer:
            "You call us, not the manufacturer. We diagnose it against the monitoring data, lodge the claim, and replace the module. Labour for a warranty swap in the first ten years is covered by our workmanship warranty.",
        },
        {
          question: "Will panels work during a power outage?",
          answer:
            "Not on their own. A grid-tied array shuts down in an outage for line-worker safety. Pairing it with a battery and a backup gateway keeps your critical circuits alive — that is the most common upgrade our customers add later.",
        },
        {
          question: "Does hail damage solar panels?",
          answer:
            "Rarely. Modules are tested against 1-inch hail at 50 mph and the tempered front glass is more resilient than most roofing. Storm damage is covered by your homeowner's policy, and we will document the array for a claim if it is ever needed.",
        },
      ],
      verdict: {
        heading: "So, which module should you buy?",
        body: [
          "If your roof has room to spread out, buy the 440 W bifacial and stop there. It is the best cost per watt in the range, the N-type cells hold up through August, and paying for more efficiency you do not need is money that would do more good on extra panels.",
          "If roof area is the binding constraint — a small footprint, dormers, plant and vents eating into the usable planes — the heterojunction module earns its premium. You are buying watts per square foot, and that is exactly what it sells.",
          "If the array faces the street, the all-black module is worth the small step up for how it looks, and it costs less per watt than the bifacial anyway. That is the rare case where the aesthetic choice is also the cheaper one.",
        ],
        pullQuote:
          "Room to spread out? Buy the bifacial. Tight roof? Buy the heterojunction. Street-facing? Buy the all-black. Then spend what is left on more panels, not on a better badge.",
      },
    },
  },
  inverters: {
    title: "Inverters",
    intro:
      "The inverter is the one component in a solar system that works every second the sun is up. We stock string, hybrid and microinverter platforms chosen for grid compliance, thermal headroom and a manufacturer that still answers the phone in year twelve.",
    heroImage: { src: "/images/hero/conduit-rough-in.jpg", position: "center 45%" },
    rangeTitle: "The inverters we stock",
    rangeDescription:
      "Three platforms cover almost every job we quote — a storage-ready hybrid, a per-panel microinverter for difficult roofs, and a three-phase string unit for light commercial. Pricing depends on system design, so we quote rather than list.",
    sections: [
      {
        heading: "What is a solar inverter and why do you need one?",
        body: [
          "A solar inverter is the heart of any solar power system. It converts the direct current (DC) electricity your panels generate into the alternating current (AC) electricity your appliances actually run on. Without a quality inverter, the array on your roof does nothing at all.",
          "It is also the component most likely to need attention over the life of the system. Panels degrade slowly and predictably; inverters run hot, switch constantly and carry the shortest warranty on the job. Whether you are comparing inverter prices or choosing between platforms, this is the decision worth spending time on.",
        ],
      },
      {
        heading: "Types of solar inverters",
        subsections: [
          {
            heading: "String inverters — the traditional choice",
            body: "String inverters remain the most common type installed on homes. Panels are wired in series into strings that feed a single centralised unit, usually mounted on an external wall or in the garage. One box handles conversion for the whole array, which keeps the cost per watt low and the maintenance simple.",
          },
          {
            heading: "Microinverters — panel-level optimisation",
            body: "A microinverter is a small inverter fitted to the back of each panel. Conversion happens per module, so one shaded or underperforming panel no longer drags down the string it sits in. They cost more up front and give you panel-level monitoring and built-in rapid shutdown in return.",
          },
          {
            heading: "Hybrid inverters — future-proofing for battery",
            body: "Hybrid inverters combine standard solar conversion with built-in battery charging, so storage can be added later without a second box on the wall. One device manages generation, charge and discharge, and grid interaction. If a battery is anywhere in your plans, this is the platform to start on.",
          },
        ],
      },
      {
        heading: "Sizing an inverter to your array",
        body: [
          "Inverter capacity is quoted in AC kilowatts and rarely matches the DC size of the array on the roof. A degree of oversizing is deliberate and standard:",
        ],
        subsections: [
          {
            heading: "DC-to-AC ratio",
            body: "We typically design arrays at 1.1 to 1.3 times the inverter's AC rating. Panels almost never produce their full nameplate output, so a slightly oversized array keeps the inverter working in its efficient band for more of the day. Push the ratio too far and you start clipping production at midday.",
          },
          {
            heading: "MPPT trackers and roof planes",
            body: "Each MPPT tracker manages one string independently. A roof with panels on two or three different orientations needs a tracker per plane, or the weakest string sets the pace for the rest. This is the specification that decides whether a string inverter works on your roof or whether you need microinverters.",
          },
          {
            heading: "Single-phase or three-phase",
            body: "Most homes are single-phase and take a single-phase inverter. Above roughly 10 kW, or where the property already has three-phase service, a three-phase unit balances the load across all three legs and keeps voltage rise within limits on a long service run.",
          },
        ],
      },
      {
        heading: "Quality inverters, honestly specified",
        body: [
          "We stock only premium inverters from manufacturers with proven field performance and a service network that can actually be reached. Our selection gives you:",
        ],
        bullets: [
          "Leading international brands known for reliability and innovation",
          "Models tested for local grid compliance and high ambient temperatures",
          "Comprehensive warranty coverage backed by a real service network",
          "Expert sizing and selection from licensed electricians, not a call centre",
        ],
      },
      {
        heading: "Buy an inverter with expert installation",
        body: [
          "Looking for an inverter for a home or a small commercial site? We supply and install string, hybrid and microinverter platforms — including battery-ready hybrids for anyone planning storage later — and we handle the sizing, permitting, interconnection and commissioning as one job.",
          "Honest advice on sizing, efficiency and compatibility is the point. No hidden costs, no pushy sales — just a system spec'd around the load you actually have and the roof you actually own.",
        ],
      },
    ],
    closing: {
      lead: "Browse the range above, or ",
      label: "speak to an electrician about your system",
      href: "/contact",
      trail: " to find the right inverter at the right price.",
    },
    detail: {
      features: [
        "Efficiency up to 98.2%",
        "Two and three MPPT trackers",
        "Battery-ready hybrid platform",
        "Built-in rapid shutdown",
        "Single and three-phase options",
        "Up to 25-year warranty",
      ],
      about: {
        heading: "About the range",
        body: [
          "An inverter is the only part of a solar system with moving electronics and a duty cycle measured in decades. That is why we judge the range on thermal design and service network before we look at a single efficiency figure — a 98% inverter that derates every August afternoon produces less than a 97% unit that does not.",
          "The three platforms we carry are deliberately different rather than incrementally different. The hybrid is for anyone who will add a battery. The microinverter is for shaded, multi-plane or dormer-heavy roofs. The three-phase string unit is for light commercial and large homes on three-phase service. Where a job genuinely needs something else, we will source it and tell you why.",
        ],
      },
      pricing: {
        heading: "Inverter pricing by platform",
        intro:
          "Supply-and-install pricing for the inverter portion of a system — unit, mounting, AC and DC isolators, commissioning and monitoring set-up. Panels, racking and battery are priced separately.",
        columns: ["Platform", "System size", "Installed price", "Best for"],
        rows: [
          ["Hybrid, single-phase", "5 – 8 kW", "$3,100 – $4,400", "Homes adding a battery now or later"],
          ["String, single-phase", "5 – 10 kW", "$2,200 – $3,300", "Simple, unshaded roof planes"],
          ["Microinverter, per panel", "Any size", "$180 – $240 per module", "Shaded, complex or multi-plane roofs"],
          ["String, three-phase", "10 – 15 kW", "$3,600 – $5,200", "Large homes and light commercial"],
          ["Replacement / retrofit", "Existing array", "$2,600 – $4,000", "Out-of-warranty inverter swaps"],
        ],
        note:
          "Ranges assume an accessible mounting location within cable reach of the switchboard and a board with capacity for the new circuit. Switchboard upgrades, long conduit runs and utility-required protection devices are priced on inspection. Incentives are applied after.",
      },
      tables: [
        {
          heading: "Platform comparison at a glance",
          intro:
            "The same decision laid out four ways. Most homes land on the hybrid; the exceptions are worth understanding before you commit.",
          columns: ["Platform", "Shade tolerance", "Battery path", "Monitoring", "Relative cost"],
          rows: [
            ["Hybrid string", "String-level", "Built in", "System level", "Medium"],
            ["Standard string", "String-level", "AC-coupled retrofit", "System level", "Lowest"],
            ["Microinverter", "Per panel", "AC-coupled retrofit", "Per panel", "Highest"],
            ["Three-phase string", "String-level", "Model dependent", "System level", "Medium-high"],
          ],
        },
      ],
      pros: {
        heading: "What we like",
        items: [
          "Peak efficiency of 97.5% or better right across the range",
          "Hybrid platform means a battery is a later decision, not a rebuild",
          "Rapid shutdown built in, so the array is safe for firefighters by default",
          "Monitoring that flags an underperforming string before you notice the bill",
          "Warranty extensions available at install, when they are cheapest",
        ],
      },
      cons: {
        heading: "Worth knowing before you sign",
        items: [
          "The inverter is the component most likely to need replacing once in 25 years",
          "Microinverters cost noticeably more per watt than a single string unit",
          "Hybrids only pay for themselves if a battery actually follows",
          "Wall-mounted units need shade and airflow — a west-facing wall will derate",
          "Three-phase units need three-phase service, which is not a trivial upgrade",
        ],
      },
      why: {
        heading: "Why these inverters suit our climate",
        intro:
          "Inverters are rated at 77°F in still air. Almost nothing about a garage wall in August matches that, so we weight the selection toward thermal headroom.",
        points: [
          {
            heading: "Thermal headroom, not just peak efficiency",
            body: "Every unit we quote holds full output to 113°F ambient before it starts derating. That is the difference between a datasheet number and the energy that actually reaches your meter on the hottest week of the year.",
          },
          {
            heading: "Grid compliance out of the box",
            body: "All models are certified for local interconnection with the voltage-ride-through and anti-islanding behaviour the utility requires. No last-minute firmware scramble at inspection.",
          },
          {
            heading: "Battery-ready by default",
            body: "The hybrid platform accepts DC-coupled storage without a second inverter, so adding a battery in year four is a half-day job rather than a redesign.",
          },
          {
            heading: "Monitoring you will actually use",
            body: "Production, consumption and per-string or per-panel data in one app, with alerting we also receive. If a string drops out we usually know before you do.",
          },
          {
            heading: "Serviced by the team that installed it",
            body: "Sizing, install, commissioning and warranty all sit with the same licensed electricians. One number to call, whatever the fault turns out to be.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right inverter",
        intro:
          "Seven questions decide this, and we work through all of them before anything is ordered.",
        points: [
          {
            heading: "Simple roof, no battery planned",
            body: "One or two unshaded planes and no interest in storage? A standard single-phase string inverter is the lowest cost per watt and there is no advantage in paying for more.",
          },
          {
            heading: "Battery now or within five years",
            body: "Go hybrid. The premium over a standard string inverter is far less than the cost of adding an AC-coupled battery inverter later, and you keep one point of contact for faults.",
          },
          {
            heading: "Shade, dormers or several small planes",
            body: "Microinverters. Per-panel conversion means one shaded module no longer sets the output for its whole string, and you get panel-level data to prove it.",
          },
          {
            heading: "Large home or light commercial",
            body: "Above roughly 10 kW, or anywhere the property already has three-phase service, a three-phase string inverter balances the load and keeps voltage rise inside limits on a long run.",
          },
        ],
      },
      series: {
        heading: "The inverter families we install",
        intro:
          "Five platforms cover everything from a small suburban roof to a light-industrial shed. Which one you land on is decided by shading, phase and whether a battery is coming.",
        items: [
          {
            heading: "Single-phase hybrid",
            body: "The default for a modern home. Built-in battery charging means storage can be added later without a second inverter on the wall, and a backup gateway keeps critical circuits alive in an outage. Typically 5 – 10 kW with two MPPT trackers, so two roof planes are no problem.",
          },
          {
            heading: "Single-phase string",
            body: "The lowest cost per watt when the roof is simple and no battery is planned. One box, one string per tracker, nothing to go wrong. Available from 3 kW to around 10 kW and the most commonly installed inverter on suburban roofs.",
          },
          {
            heading: "Microinverter",
            body: "One small inverter per module, mounted on the racking under each panel. Shading, dormers and three-way roof orientations stop mattering because every panel operates independently. Built-in rapid shutdown and per-panel monitoring come as standard.",
          },
          {
            heading: "Three-phase string",
            body: "For large homes and light commercial sites already on three-phase service. Balancing output across all three legs keeps voltage rise inside limits on long service runs, and three MPPT trackers handle sprawling multi-plane arrays. Usually 10 – 20 kW.",
          },
          {
            heading: "Commercial three-phase",
            body: "Actively cooled, higher-ingress-rated units for ground mounts and large shed roofs where a high DC-to-AC ratio and fast install matter more than absolute peak efficiency. Sized to the switchboard and the utility agreement rather than to the roof.",
          },
        ],
        note:
          "Every model we quote is on the utility's approved inverter list before we put it on a proposal — we check that first, not at inspection.",
      },
      priceCards: {
        heading: "Common configurations",
        items: [
          { name: "5 kW single-phase string", price: "$2,200", note: "Simple roof, no battery" },
          { name: "6.6 kW single-phase hybrid", price: "$3,100", note: "Battery-ready" },
          { name: "10 kW single-phase hybrid", price: "$4,400", note: "Large home + backup" },
          { name: "11.4 kW three-phase string", price: "$3,900", note: "Light commercial" },
        ],
      },
      priceNotes: [
        {
          heading: "5 kW inverter pricing",
          intro:
            "The most common residential size, and the one most people are comparing when they call us.",
          bullets: [
            { label: "Single-phase string, 5 kW", body: "approximately $2,200 – $2,700 supplied and installed" },
            { label: "Ideal for", body: "an average three-bedroom home with one or two clean roof planes" },
            { label: "Why it holds up", body: "high conversion efficiency and straightforward grid compliance, with nothing exotic to fail" },
          ],
          closing:
            "A 5 kW inverter delivers strong performance and a low failure rate, which is why it remains the most popular residential choice we install.",
        },
        {
          heading: "10 kW inverter pricing",
          intro:
            "Larger homes and small commercial sites move up a tier, usually onto three-phase.",
          bullets: [
            { label: "Three-phase string, 10 – 11.4 kW", body: "approximately $3,600 – $5,200 supplied and installed" },
            { label: "Designed for", body: "three-phase service, long cable runs and multi-plane arrays" },
            { label: "Best suited to", body: "high-consumption households, workshops and small commercial roofs" },
          ],
          closing:
            "The higher up-front cost buys efficiency, headroom for expansion and far better voltage-rise behaviour on a long service run.",
        },
        {
          heading: "Hybrid and battery-ready pricing",
          intro:
            "Hybrid inverters carry built-in battery charging, which is where the premium sits.",
          bullets: [
            { label: "6.6 kW hybrid", body: "approximately $3,100" },
            { label: "8 kW hybrid", body: "approximately $3,800" },
            { label: "10 kW hybrid with backup gateway", body: "approximately $4,400" },
          ],
          closing:
            "These are the units to specify if a battery is anywhere in your plans — retrofitting AC-coupled storage to a standard string inverter costs considerably more later.",
        },
      ],
      factors: {
        heading: "What to weigh before you choose",
        intro: "Seven questions, worked through before anything is ordered.",
        items: [
          { label: "Power requirements", body: "What the household actually draws, read off twelve months of bills rather than estimated." },
          { label: "Array size", body: "The inverter is matched to the panels, at a DC-to-AC ratio between 1.1 and 1.3." },
          { label: "Future expansion", body: "Room to add panels, a battery or an EV charger without replacing the inverter." },
          { label: "Warranty and support", body: "Standard term, extension cost at install, and who actually handles the claim." },
          { label: "Efficiency and derating", body: "Peak efficiency matters less than the temperature at which the unit starts backing off." },
          { label: "Price against lifetime", body: "A cheaper inverter replaced at year eight is not cheaper than one that reaches year fifteen." },
          { label: "Monitoring", body: "Per-string or per-panel data, and whether alerts reach us as well as you." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the systems we have commissioned, in the words it usually arrives in.",
        items: [
          { label: "Reliable performance", body: "Owners report steady output year on year, with production holding through summer rather than sagging in August." },
          { label: "Straightforward monitoring", body: "The app is the part people actually use daily — production, consumption and a clear answer to \u201cis it working?\u201d" },
          { label: "Responsive support", body: "Faults are diagnosed against monitoring data before anyone drives out, so most visits are a single trip." },
          { label: "Quiet in operation", body: "Naturally cooled units are silent; the actively cooled three-phase models are audible only under full load." },
        ],
        closing:
          "The complaints we do get are almost always about mounting position rather than the hardware — an inverter on a west-facing wall runs hot and derates, which is exactly why we push for a shaded location at design stage.",
      },
      tips: {
        heading: "Installation and maintenance",
        intro:
          "Five things that decide whether an inverter reaches its warranty term or dies at year eight.",
        items: [
          "Mount it out of direct sun — a shaded garage wall or the south side of the house, never a west-facing exterior wall.",
          "Leave the manufacturer's clearance above, below and to the sides. Heat is what kills inverters, and airflow is free.",
          "Keep the vents and heatsink fins clear of dust and cobwebs; a visual check twice a year is enough.",
          "Leave monitoring connected. An inverter that has been offline for six months is one nobody noticed failing.",
          "Register the warranty at commissioning and buy the extension then — it costs a fraction of what it does later.",
        ],
      },
      faqs: [
        {
          question: "How long does a solar inverter last?",
          answer:
            "Plan on 12 to 15 years for a string or hybrid inverter and closer to 25 for microinverters, which run cooler because each one handles a single panel. It is the one component in a solar system you should budget to replace once, which is why we push warranty extensions at install.",
        },
        {
          question: "What is the failure rate?",
          answer:
            "Across the units we have installed, warranty failures run at low single-digit percentages over ten years, and most are heat-related. Mounting position matters more than brand: the same model on a shaded wall consistently outlasts one baking in afternoon sun.",
        },
        {
          question: "Do I need a hybrid inverter if I am not buying a battery yet?",
          answer:
            "Only if a battery is genuinely likely. The hybrid premium is worth paying when storage is a question of when rather than if. If it is not on your list at all, a standard string inverter plus an AC-coupled battery later is a perfectly reasonable path — it just costs more in total if you do end up adding one.",
        },
        {
          question: "Are microinverters worth the extra cost?",
          answer:
            "On a shaded, complex or multi-orientation roof, yes — the production they recover usually pays the difference back. On a single clean roof plane with no shade, they mostly buy you panel-level monitoring and a longer warranty, which may or may not be worth it to you.",
        },
        {
          question: "Will my inverter keep working in a blackout?",
          answer:
            "Not by itself. A grid-tied inverter shuts down in an outage so it cannot backfeed the line while crews are working on it. A hybrid inverter paired with a battery and a backup gateway will keep your critical circuits running — that combination is the only way to get true backup.",
        },
        {
          question: "Can I replace just the inverter on an existing system?",
          answer:
            "Usually yes. We check string voltages and configuration against the replacement unit, confirm the switchboard and isolators still comply, and swap it in a day. It is also the right moment to go hybrid if a battery is on the horizon.",
        },
      ],
      verdict: {
        heading: "So, which inverter should you buy?",
        body: [
          "For most homes the hybrid is the right answer even before a battery is on the order. It costs a few hundred dollars more than a standard string unit and removes the single most expensive obstacle to adding storage later.",
          "If your roof is shaded, cut up by dormers, or faces three directions, that logic reverses and microinverters win — the production they recover on a difficult roof is larger than the premium you pay for them.",
          "If neither describes you, the standard string inverter is not a compromise. It is the cheapest way to get a clean roof onto the grid, and there is nothing wrong with buying exactly what the job needs.",
        ],
        pullQuote:
          "Buy the hybrid if a battery is coming. Buy microinverters if the roof is difficult. Otherwise buy the string inverter and spend the difference on panels.",
      },
    },
  },
  "ev-chargers": {
    title: "EV Chargers",
    intro:
      "A Level 2 charger turns overnight parking into a full battery. We supply and install hardwired and plug-in units for homes, plus metered dual-port pedestals for workplaces and fleets — all wired by licensed electricians who size the circuit before they sell you the box.",
    heroImage: { src: "/images/products/ev-chargers-1.jpg", position: "center 60%" },
    rangeTitle: "The chargers we stock",
    rangeDescription:
      "Three units cover almost every job: a hardwired 48 A charger for fast overnight charging, a portable 40 A plug-in for anyone who may move, and a dual-port commercial pedestal with revenue-grade metering.",
    sections: [
      {
        heading: "What is a Level 2 EV charger and why do you need one?",
        body: [
          "A Level 2 charger runs on a dedicated 240-volt circuit and adds roughly 25 to 45 miles of range per hour, against the 3 to 5 miles an hour you get from a standard wall outlet. That difference is what turns charging from something you plan around into something that simply happens while you sleep.",
          "Whether you are comparing EV charger prices, working out what circuit your switchboard can carry, or trying to charge two cars on one supply, the install matters more than the box. A charger is a continuous load running for hours at a time, and it has to be wired accordingly.",
        ],
      },
      {
        heading: "Types of EV chargers",
        subsections: [
          {
            heading: "Level 1 — the cable in the boot",
            body: "The portable cable that came with the car, plugged into an ordinary outlet. It adds 3 to 5 miles of range per hour, which is enough for a short commute and nothing else. Useful as a backup; not a charging strategy.",
          },
          {
            heading: "Level 2 hardwired — the standard home install",
            body: "Wired permanently to a dedicated 40 to 60 amp circuit. Faster, safer for continuous load, weather-rated for outdoor mounting, and eligible for incentives that plug-in units sometimes are not. This is what we install on most homes.",
          },
          {
            heading: "Level 2 plug-in — portable and moveable",
            body: "The same charging speed as a hardwired unit, but terminated in a NEMA 14-50 plug so it can be unplugged and taken with you. The right answer for renters and anyone who expects to move within a few years.",
          },
          {
            heading: "DC fast charging — not a home product",
            body: "The 50 kW and up chargers you see at highway stops need three-phase supply and switchgear that no house has. We mention it only so you can rule it out: home charging is Level 2, and that is not a compromise.",
          },
        ],
      },
      {
        heading: "Sizing a charger to your home",
        body: [
          "The charger is the easy part. What decides your install is the switchboard, the run, and how much spare capacity your service actually has:",
        ],
        subsections: [
          {
            heading: "Circuit and breaker size",
            body: "A charger is a continuous load, so the circuit is rated at 125% of its draw. A 48 A charger needs a 60 A breaker and the cable to match; a 40 A unit needs 50 A. We check what your board can carry before we quote, not after.",
          },
          {
            heading: "Load management instead of an upgrade",
            body: "If the service is already close to capacity, a charger with dynamic load management will throttle itself when the air conditioning and oven are both running. That is usually thousands of dollars cheaper than upgrading the service, and you will never notice the difference overnight.",
          },
          {
            heading: "Cable run and mounting position",
            body: "Cost scales with distance from the board to the parking space. A charger on the garage wall next to the board is a short job; one at the end of a 90-foot run through a slab is not. We measure it on the site visit and the number we give you includes it.",
          },
        ],
      },
      {
        heading: "Quality chargers, honestly specified",
        body: [
          "We only install units we are willing to warrant and come back to. Our selection gives you:",
        ],
        bullets: [
          "UL-listed hardware with Energy Star certification",
          "Weather-rated enclosures that survive being mounted outside",
          "Dynamic load management, so a service upgrade is often avoidable",
          "Open protocols on commercial units, so you are not locked to one network",
        ],
      },
      {
        heading: "Buy an EV charger with expert installation",
        body: [
          "We supply and install home chargers, dual-car setups with load sharing, and metered commercial pedestals for workplaces and strata. Permits, load calculation, circuit installation, commissioning and app set-up are all part of the same job.",
          "If solar is already on the roof, we will also set the charger to prefer solar hours, so the car fills from the array rather than from the grid whenever the sun is doing the work.",
        ],
      },
    ],
    closing: {
      lead: "Browse the range above, or ",
      label: "book a site visit",
      href: "/contact",
      trail: " and we will tell you exactly what your switchboard can carry.",
    },
    detail: {
      features: [
        "Up to 11.5 kW / 48 A output",
        "~44 miles of range per hour",
        "Dynamic whole-home load management",
        "NEMA 4 outdoor-rated enclosures",
        "Wi-Fi, Ethernet and app scheduling",
        "Solar-aware charging schedules",
      ],
      about: {
        heading: "About the range",
        body: [
          "Charging hardware has converged. Nearly every Level 2 unit on the market pushes the same 40 to 48 amps through the same J1772 connector, so the differences that matter are the enclosure rating, the load-management logic and whether the manufacturer will still be answering the phone in year five.",
          "The three units we carry are deliberately different jobs rather than three versions of the same one. The hardwired 48 A is the standard home install. The plug-in 40 A is for people who will move. The dual-port pedestal is for sites that need to bill someone for the power. Anything else and we will source it and tell you why.",
        ],
      },
      pricing: {
        heading: "Charger pricing by install type",
        intro:
          "Supply-and-install pricing — unit, dedicated circuit, breaker, mounting, commissioning and app set-up. Assumes a switchboard with spare capacity and a run under 30 feet.",
        columns: ["Install type", "Output", "Installed price", "Best for"],
        rows: [
          ["Hardwired, 48 A", "11.5 kW", "$1,450 – $2,100", "Long-range EV, overnight charging"],
          ["Plug-in, 40 A", "9.6 kW", "$950 – $1,500", "Renters and likely movers"],
          ["Dual-car, load shared", "2 × 40 A", "$2,400 – $3,400", "Two-EV households on one circuit"],
          ["Commercial pedestal", "2 × 11.5 kW", "$6,800 – $11,500", "Workplaces, strata, fleet depots"],
          ["Switchboard upgrade", "—", "$1,800 – $3,600", "Services already at capacity"],
        ],
        note:
          "Long cable runs, trenching, slab penetrations and utility-required service upgrades are priced on inspection. Federal and utility EV charger incentives are applied after — we file the paperwork as part of the job.",
      },
      priceCards: {
        heading: "Common configurations",
        items: [
          { name: "Plug-in 40 A, garage", price: "$950", note: "Board beside the parking space" },
          { name: "Hardwired 48 A, garage", price: "$1,450", note: "Most common home install" },
          { name: "Hardwired 48 A, long run", price: "$2,100", note: "60 – 90 ft to the board" },
          { name: "Two cars, load shared", price: "$2,400", note: "One circuit, two chargers" },
        ],
      },
      priceNotes: [
        {
          heading: "Single-car home charging",
          intro:
            "The most common job we quote, and the one most people are comparing when they call.",
          bullets: [
            { label: "Hardwired 48 A install", body: "approximately $1,450 – $2,100 supplied and installed" },
            { label: "Ideal for", body: "a household with one long-range EV and a garage or carport beside the board" },
            { label: "What drives the price", body: "distance from the switchboard, whether the run is surface or concealed, and spare breaker capacity" },
          ],
          closing:
            "Where the board sits next to the parking space this is a half-day job. Where it does not, the cable run is the cost, not the charger.",
        },
        {
          heading: "Two EVs on one supply",
          intro:
            "Two cars almost never need two circuits — load sharing splits one feed between two chargers.",
          bullets: [
            { label: "Two hardwired chargers, load shared", body: "approximately $2,400 – $3,400 installed" },
            { label: "How it works", body: "the pair negotiate a shared limit, so both charge at half speed together or full speed alone" },
            { label: "Why it matters", body: "both cars are full by morning either way, and you avoid a service upgrade" },
          ],
          closing:
            "Overnight there are eight or nine usable hours. Two cars sharing 48 amps still finish well before you need them.",
        },
        {
          heading: "Workplace and fleet charging",
          intro:
            "Commercial sites need metering, access control and a way to recover the cost of the power.",
          bullets: [
            { label: "Dual-port pedestal", body: "approximately $6,800 – $11,500 per pedestal installed" },
            { label: "Includes", body: "revenue-grade metering, RFID and app access control, and OCPP so you are not locked to one network" },
            { label: "Scales to", body: "site-wide load management across up to 16 ports on a single supply" },
          ],
          closing:
            "We design these off the site's actual demand profile and the utility agreement, not off the number of parking bays.",
        },
      ],
      tables: [
        {
          heading: "Charging speed at a glance",
          intro:
            "What each level actually adds while the car is parked. Real-world figures for a mid-size EV at roughly 3.5 miles per kWh.",
          columns: ["Level", "Power", "Range per hour", "Empty to full", "Circuit"],
          rows: [
            ["Level 1 wall outlet", "1.4 kW", "~4 miles", "50+ hours", "Standard 15 A outlet"],
            ["Level 2, 32 A", "7.7 kW", "~29 miles", "~9 hours", "40 A dedicated"],
            ["Level 2, 40 A", "9.6 kW", "~36 miles", "~7 hours", "50 A dedicated"],
            ["Level 2, 48 A", "11.5 kW", "~44 miles", "~6 hours", "60 A dedicated"],
            ["DC fast (public)", "50 – 350 kW", "n/a", "20 – 40 min", "Three-phase, commercial"],
          ],
          note:
            "Charging slows above roughly 80% state of charge on every level. The full-charge figures above are to 100% and are therefore conservative for daily use.",
        },
      ],
      series: {
        heading: "The charger families we install",
        intro:
          "Four configurations cover everything from a single suburban garage to a fleet depot. Which one you land on is decided by tenure, car count and whether anyone needs to be billed.",
        items: [
          {
            heading: "Hardwired single",
            body: "The default home install. Permanently wired to a dedicated 60 A circuit, weather-rated for outdoor mounting, and eligible for the incentives that plug-in units sometimes miss. Full 48 A output and dynamic load management as standard.",
          },
          {
            heading: "Plug-in portable",
            body: "The same 40 A charging speed terminated in a NEMA 14-50 plug. Unplug it and take it when you move, or take it away for a weekend. The right call for renters and for anyone on a three-to-five-year horizon in the property.",
          },
          {
            heading: "Dual-car load shared",
            body: "Two chargers negotiating one circuit between them. Both cars charge at half rate together or full rate alone, so an overnight window covers both without touching the service. Far cheaper than a second circuit or a supply upgrade.",
          },
          {
            heading: "Commercial pedestal",
            body: "Dual-port, revenue-grade metering, RFID and app access control, cellular backhaul and OCPP so the site is not locked to a single network operator. Built for workplaces, strata car parks and fleet depots.",
          },
        ],
        note:
          "Every unit we install is UL 2594 listed and Energy Star certified — we confirm eligibility against your utility's rebate list before it goes on the proposal.",
      },
      pros: {
        heading: "What we like",
        items: [
          "Roughly ten times the charging speed of a standard wall outlet",
          "Dynamic load management usually removes the need for a service upgrade",
          "Scheduling to off-peak tariffs, or to your own solar production hours",
          "Weather-rated enclosures that genuinely survive being mounted outdoors",
          "Open protocols on the commercial units — no network lock-in",
        ],
      },
      cons: {
        heading: "Worth knowing before you sign",
        items: [
          "Cable run length, not the charger, is what usually drives the price",
          "An older switchboard may need upgrading before anything can be added",
          "Plug-in units are convenient but miss some hardwired-only incentives",
          "Wi-Fi in a detached garage is often weak — plan for Ethernet or a repeater",
          "Charging above 80% is deliberately slow on every charger and every car",
        ],
      },
      why: {
        heading: "Why these chargers suit a Texas garage",
        intro:
          "A charger runs at full load for six hours at a stretch, frequently in an unconditioned garage in August. That is the condition we select against.",
        points: [
          {
            heading: "Rated for real heat",
            body: "Every unit we install holds full output to 122°F ambient. Cheaper chargers throttle back well before that, which turns a six-hour charge into a nine-hour one on exactly the nights you were running the air conditioning too.",
          },
          {
            heading: "Load management before service upgrades",
            body: "Dynamic load management watches the whole-home draw and backs the charger off when the house needs the capacity. It is the difference between a $1,500 install and a $4,000 one on a service that is already close to full.",
          },
          {
            heading: "Solar-aware scheduling",
            body: "If there is an array on the roof, we set the charger to prefer solar hours so the car fills from your own production rather than from the grid. On a work-from-home week that is most of your charging for free.",
          },
          {
            heading: "Wired as a continuous load",
            body: "Circuits sized at 125% of draw, correct conductor and breaker, torqued and documented. A charger is the heaviest sustained load most homes will ever add, and it is not the place to cut corners.",
          },
          {
            heading: "Incentive paperwork handled",
            body: "Federal credit and utility charger rebates are filed by us as part of the job, so the number you were quoted is the number you actually pay.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right charger",
        intro:
          "Four questions decide this, and we work through all of them before anything is ordered.",
        points: [
          {
            heading: "You own the home and plan to stay",
            body: "Hardwired 48 A. It is faster, tidier, weather-rated, and it qualifies for every incentive going. There is no good reason to choose anything else if the property is yours.",
          },
          {
            heading: "You rent, or may move within five years",
            body: "Plug-in 40 A on a NEMA 14-50 outlet. The same overnight result, and it comes off the wall and into the moving truck with you.",
          },
          {
            heading: "Two EVs in the household",
            body: "Two hardwired units with load sharing on a single circuit. Both are full by morning, and you avoid the cost of a second feed or a service upgrade entirely.",
          },
          {
            heading: "A workplace, strata or depot",
            body: "Dual-port pedestals with metering and access control. Bill by RFID or app, manage site-wide load across every port, and keep the option to change network operators later.",
          },
        ],
      },
      factors: {
        heading: "What to weigh before you choose",
        intro: "Seven questions, worked through on the site visit.",
        items: [
          { label: "Daily mileage", body: "How far the car actually goes in a day, which usually needs far less charging than people expect." },
          { label: "Switchboard capacity", body: "Spare breaker space and how close the existing service already is to its limit." },
          { label: "Run length", body: "Distance from board to parking space, and whether it can be surface-mounted or has to be concealed." },
          { label: "Tenure", body: "Whether you will still be in the property in five years — the hardwired vs plug-in decision turns on this alone." },
          { label: "Car count", body: "One EV now often means two later. Load sharing is far cheaper to design in than to retrofit." },
          { label: "Solar on the roof", body: "An existing or planned array changes the scheduling and can change which unit is worth the money." },
          { label: "Connectivity", body: "Wi-Fi signal at the garage wall, and whether Ethernet is worth pulling while the wall is open." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the chargers we have commissioned, in the words it usually arrives in.",
        items: [
          { label: "They stop thinking about it", body: "The most common report is that charging disappears as a chore entirely — plug in at night, full by morning, every morning." },
          { label: "Scheduling pays for itself", body: "Owners on time-of-use tariffs consistently report the off-peak schedule making a visible difference to the bill within a month." },
          { label: "Solar pairing is the surprise", body: "Households with an array are usually surprised how much of their charging ends up coming off the roof rather than the grid." },
          { label: "The app is fine, and rarely opened", body: "People use it for the first fortnight, set a schedule, and then leave it alone. That is the correct outcome." },
        ],
        closing:
          "The complaints we do get are almost always connectivity in a detached garage rather than the charger itself, which is why we now recommend pulling an Ethernet cable while the wall is open.",
      },
      tips: {
        heading: "Installation and maintenance",
        intro:
          "Five things that decide whether a charger is still trouble-free in year five.",
        items: [
          "Mount it where the cable reaches the car's port with slack to spare — a charger you have to stretch to reach gets dragged and damaged.",
          "Keep it out of direct afternoon sun where you can. Even a weather-rated unit runs cooler and lasts longer under an eave.",
          "Hang the cable on the holster rather than letting it sit on the ground. Grit in the connector is the single most common fault we see.",
          "Set an off-peak or solar-hours schedule at commissioning. It costs nothing and it is the whole return on a smart charger.",
          "Leave it connected to the network. Firmware updates fix real charging faults, and a charger offline for a year misses all of them.",
        ],
      },
      faqs: [
        {
          question: "How long does it take to charge an EV at home?",
          answer:
            "On a 48 A Level 2 charger, roughly six hours from empty to full for a typical 70 kWh battery — about 44 miles of range per hour. In practice almost nobody charges from empty: most people plug in with 40 to 60% remaining and are full again in two or three hours.",
        },
        {
          question: "Do I need to upgrade my switchboard?",
          answer:
            "Often not. A charger with dynamic load management watches the whole-home draw and throttles itself when the house needs the capacity, which usually avoids an upgrade entirely. We do a load calculation on the site visit and tell you either way before you commit.",
        },
        {
          question: "Hardwired or plug-in — which should I get?",
          answer:
            "If you own the home and plan to stay, hardwired: it is faster, neater, weather-rated and qualifies for more incentives. If you rent or expect to move within about five years, plug-in — the same charging speed, and it comes with you.",
        },
        {
          question: "Can I charge two EVs on one circuit?",
          answer:
            "Yes. Two chargers with load sharing negotiate a single circuit between them, charging at half rate together or full rate alone. Over an eight-hour overnight window both cars finish comfortably, and you avoid the cost of a second feed.",
        },
        {
          question: "Will my charger work with my car?",
          answer:
            "Yes. Every Level 2 charger we install uses the J1772 connector that all non-Tesla EVs sold here accept, and Teslas use the adapter that comes in the boot. Charging speed is set by whichever is lower — the charger or the car's onboard charger.",
        },
        {
          question: "Can I charge from my solar panels?",
          answer:
            "Yes, and it is worth setting up. We configure the charger to prefer solar production hours so the car fills from the array rather than the grid whenever the sun is doing the work. For anyone home during the day it is the cheapest charging there is.",
        },
      ],
      verdict: {
        heading: "So, which charger should you buy?",
        body: [
          "If you own the home, buy the hardwired 48 A unit. It is a few hundred dollars more than a plug-in, it charges faster, it survives being mounted outside, and it qualifies for incentives the plug-in versions sometimes miss.",
          "If you rent or expect to move, that reverses completely. Buy the plug-in 40 A, have us fit a NEMA 14-50 outlet, and take the charger with you when you go.",
          "For two cars, do not buy two circuits. Two load-shared chargers on one feed is cheaper, avoids a service upgrade, and still has both cars full by morning.",
        ],
        pullQuote:
          "Buy hardwired if you own the place, plug-in if you don't, and load sharing if there are two cars. The cable run, not the charger, is what sets your price.",
      },
    },
  },
  "battery-storage": {
    title: "Battery Storage",
    intro:
      "A battery is what turns a solar array from a daytime bill reducer into a system that keeps the lights on. We install LFP storage from 10 kWh to 40 kWh, sized off your actual load study rather than off whatever fits the wall.",
    heroImage: { src: "/images/hero/lighting-retrofit.jpg", position: "center 45%" },
    rangeTitle: "The batteries we stock",
    rangeDescription:
      "All lithium iron phosphate — no exceptions. Chosen on cycle life, sustained output in heat and whether the backup gateway actually transfers cleanly when the grid drops.",
    sections: [
      {
        heading: "What does a home battery actually do?",
        body: [
          "A home battery stores the solar your roof produces during the day and releases it in the evening, when the sun has gone and the tariff is highest. Paired with a backup gateway it also isolates your home from the grid during an outage, so your circuits keep running while the street is dark.",
          "Those are two different jobs, and they size differently. Bill reduction is about how much energy you shift each evening. Backup is about how much power you need at once and for how long. Most households want some of both, and the honest answer is usually a compromise between them.",
        ],
      },
      {
        heading: "Types of home battery systems",
        subsections: [
          {
            heading: "DC-coupled — highest round-trip efficiency",
            body: "The battery connects on the DC side of a hybrid inverter, so solar charges it without converting to AC first. That saves a conversion step and lands round-trip efficiency around 90%. It is the efficient choice when the battery and inverter go in together.",
          },
          {
            heading: "AC-coupled — retrofits to any existing array",
            body: "The battery has its own inverter and connects on the AC side, which means it can be added to a system that is already installed without touching the existing inverter. A percentage point or two less efficient, and by far the most practical option for a retrofit.",
          },
          {
            heading: "Modular stacks — start small and grow",
            body: "Rack-mounted systems that begin at two modules and expand to eight. You buy the capacity you need now and add to it as your load grows or an EV arrives, without replacing what you already own.",
          },
        ],
      },
      {
        heading: "Sizing a battery to your home",
        body: [
          "Three numbers decide this, and only one of them is capacity:",
        ],
        subsections: [
          {
            heading: "Usable capacity, in kWh",
            body: "How much energy the battery holds. A typical household uses 8 to 15 kWh between sunset and sunrise, so a 13.5 kWh unit covers a normal evening. Read usable capacity, not nominal — the difference between the two is not yours to use.",
          },
          {
            heading: "Continuous output, in kW",
            body: "How much power it can deliver at once. This is what decides whether the air conditioning runs during an outage. A 7.6 kW battery will not start a large AC compressor; an 11.5 kW one with a 22 kW surge will. Capacity is duration, output is capability.",
          },
          {
            heading: "Backup scope",
            body: "Whole-home or critical loads only. A critical-loads sub-panel is cheaper and makes a smaller battery last far longer — fridge, internet, lights, a few outlets. Whole-home backup is achievable but it needs the output to match your worst-case simultaneous draw.",
          },
        ],
      },
      {
        heading: "Quality storage, honestly specified",
        body: [
          "Everything we quote is lithium iron phosphate, and every unit is one we have commissioned and monitored ourselves. Our range gives you:",
        ],
        bullets: [
          "LFP chemistry — no thermal runaway risk, and far longer cycle life",
          "Warranties measured in cycles and retained capacity, not just years",
          "Backup gateways that transfer in under 20 ms, so nothing reboots",
          "Monitoring that shows state of charge, flow and backup readiness",
        ],
      },
      {
        heading: "Buy storage with expert installation",
        body: [
          "We install storage alongside new solar and as a retrofit to arrays we did not build. Load study, sizing, backup scope, gateway and sub-panel work, permitting, interconnection and commissioning are all part of the same job.",
          "If there is no array yet, we will still tell you honestly whether the battery or the panels should come first. In almost every case it is the panels.",
        ],
      },
    ],
    closing: {
      lead: "Browse the range above, or ",
      label: "ask us for a load study",
      href: "/contact",
      trail: " and we will size the battery against what your home actually uses.",
    },
    detail: {
      features: [
        "10 kWh to 40 kWh usable",
        "LFP chemistry throughout",
        "Up to 11.5 kW continuous output",
        "Sub-20 ms backup transfer",
        "AC or DC coupled",
        "Up to 12-year, 8,000-cycle warranty",
      ],
      about: {
        heading: "About the range",
        body: [
          "We stopped quoting anything but lithium iron phosphate several years ago. LFP gives up a little energy density against the NMC chemistry used in phones and cars, and gets back a chemistry that does not go into thermal runaway, tolerates a hot garage, and holds useful capacity for eight thousand cycles instead of three.",
          "The three systems we carry are different jobs. The 13.5 kWh wall unit is the standard whole-home install. The modular stack is for households that want to start at 10 kWh and grow. The high-output unit exists for one reason: homes that need to run two air conditioning compressors through an outage, which most batteries simply cannot do.",
        ],
      },
      pricing: {
        heading: "Storage pricing by configuration",
        intro:
          "Supply-and-install pricing — battery, backup gateway, critical-loads sub-panel where needed, permitting, interconnection and commissioning. Solar is priced separately.",
        columns: ["Configuration", "Usable capacity", "Installed price", "Best for"],
        rows: [
          ["Single wall unit", "13.5 kWh", "$13,200 – $16,800", "Whole-home backup, standard loads"],
          ["Modular stack, 2 modules", "10 kWh", "$11,400 – $14,000", "Starting small, adding later"],
          ["Modular stack, 8 modules", "40 kWh", "$28,500 – $34,000", "Large homes, multi-day outages"],
          ["High-output unit", "16 kWh", "$16,500 – $20,900", "Running AC through an outage"],
          ["Retrofit to existing solar", "13.5 kWh", "$14,600 – $18,400", "Arrays already installed"],
        ],
        note:
          "Prices are before the federal storage credit and any utility incentive, both of which we file for as part of the job. Sub-panel work, long runs and switchboard upgrades are priced on inspection.",
      },
      priceCards: {
        heading: "Common configurations",
        items: [
          { name: "10 kWh modular start", price: "$11,400", note: "Critical loads only" },
          { name: "13.5 kWh wall unit", price: "$13,200", note: "Most common install" },
          { name: "16 kWh high output", price: "$16,500", note: "AC through an outage" },
          { name: "27 kWh stacked", price: "$22,800", note: "Large home, long outage" },
        ],
      },
      priceNotes: [
        {
          heading: "Battery with new solar",
          intro:
            "The cheapest way to buy storage is at the same time as the array, on a DC-coupled hybrid inverter.",
          bullets: [
            { label: "13.5 kWh with a new 8 kW array", body: "approximately $13,200 – $16,800 for the storage portion" },
            { label: "Why it costs less", body: "one inverter, one set of permits, one commissioning visit, one truck roll" },
            { label: "Efficiency gain", body: "DC coupling avoids a conversion step, worth around two percentage points round trip" },
          ],
          closing:
            "If solar and storage are both in the plan, doing them together saves several thousand dollars against doing them a year apart.",
        },
        {
          heading: "Retrofitting to an existing array",
          intro:
            "Adding a battery to solar that is already on the roof, without replacing the existing inverter.",
          bullets: [
            { label: "AC-coupled 13.5 kWh retrofit", body: "approximately $14,600 – $18,400 installed" },
            { label: "Works with", body: "almost any existing string or microinverter system, whoever installed it" },
            { label: "Adds", body: "a battery inverter, a backup gateway and usually a critical-loads sub-panel" },
          ],
          closing:
            "We retrofit to arrays we did not build regularly. The existing inverter stays exactly as it is.",
        },
        {
          heading: "Backup scope and what it costs",
          intro:
            "The single biggest lever on price is how much of the house you want running when the grid is down.",
          bullets: [
            { label: "Critical loads sub-panel", body: "adds roughly $1,200 – $2,400, and makes a smaller battery last much longer" },
            { label: "Whole-home backup", body: "needs output to match your worst-case simultaneous draw, which often means a larger unit" },
            { label: "Air conditioning during an outage", body: "requires high continuous output and surge headroom — this is a hardware decision, not a setting" },
          ],
          closing:
            "Most households are better served by a critical-loads panel and a modest battery than by whole-home backup and a bigger bill.",
        },
      ],
      tables: [
        {
          heading: "What a battery will actually run",
          intro:
            "Typical draws for common loads, and roughly how long 13.5 kWh of usable capacity holds them. Real figures vary with the appliance and the weather.",
          columns: ["Load", "Draw", "Runtime on 13.5 kWh", "In critical loads?"],
          rows: [
            ["Fridge and freezer", "0.15 kW average", "3 – 4 days", "Always"],
            ["Lights, internet, outlets", "0.3 kW", "~40 hours", "Always"],
            ["Well pump, intermittent", "0.8 kW average", "~16 hours", "Usually"],
            ["Central AC, one compressor", "3.5 kW", "~4 hours", "Only with high output"],
            ["Electric range or dryer", "4 – 5 kW", "~3 hours", "Rarely worth it"],
          ],
          note:
            "Runtimes assume the battery starts full and solar contributes nothing — a daytime outage with sun on the roof extends every figure substantially.",
        },
      ],
      series: {
        heading: "The storage families we install",
        intro:
          "Four configurations cover everything from a critical-loads panel to a multi-day whole-home system.",
        items: [
          {
            heading: "Single wall unit",
            body: "One 13.5 kWh LFP unit, wall-mounted indoors or out, with an integrated backup gateway. Covers a normal evening's usage and a standard set of critical loads through an overnight outage. The default install for most homes.",
          },
          {
            heading: "Modular stack",
            body: "A floor-standing rack that starts at two modules and grows to eight, from 10 kWh to 40 kWh. Buy what you need now and add modules as an EV arrives or the household grows, without replacing anything you already own.",
          },
          {
            heading: "High-output single",
            body: "16 kWh with 11.5 kW continuous and 22 kW surge. The capacity is unremarkable; the output is the point. This is the unit that starts a large AC compressor during an outage, which most batteries cannot do at all.",
          },
          {
            heading: "Multi-unit parallel",
            body: "Two or more units in parallel where a single battery cannot carry both the energy and the power. Common on large homes with well pumps, workshops or two AC systems that all need to survive the same outage.",
          },
        ],
        note:
          "Every unit we quote is on the utility's approved storage list and eligible for the federal credit — we confirm that before it goes on a proposal, not after.",
      },
      pros: {
        heading: "What we like",
        items: [
          "LFP chemistry — no thermal runaway path, and it tolerates a hot garage",
          "Backup transfer under 20 ms, so computers and routers never notice",
          "Warranties written in cycles and retained capacity, not just calendar years",
          "Modular options that let you buy capacity as you need it",
          "Monitoring that shows state of charge and backup readiness at a glance",
        ],
      },
      cons: {
        heading: "Worth knowing before you sign",
        items: [
          "Payback on bill savings alone is long — the real value is usually backup",
          "Whole-home backup is expensive; a critical-loads panel is far better value",
          "Running air conditioning through an outage needs output, not just capacity",
          "Batteries lose capacity with age; the warranty defines how much is acceptable",
          "Panels almost always come first — a battery with no solar is a very expensive generator",
        ],
      },
      why: {
        heading: "Why LFP storage suits this climate",
        intro:
          "A battery in Central Texas spends summer in a garage that never drops below 90°F. That is what we select against.",
        points: [
          {
            heading: "Chemistry that tolerates heat",
            body: "LFP holds up in sustained high ambient temperatures where the NMC chemistry used in phones and cars degrades noticeably faster. In a hot garage that difference compounds over ten years.",
          },
          {
            heading: "Output sized to air conditioning",
            body: "Anywhere else, backup means lights and a fridge. Here it means the AC, because an August outage without cooling is a genuine problem. We size continuous output and surge against the compressor, not against the average load.",
          },
          {
            heading: "Grid-outage ready by default",
            body: "Every system we install includes a backup gateway that isolates the home and transfers in under 20 milliseconds. Nothing reboots and nothing notices.",
          },
          {
            heading: "Time-of-use aware",
            body: "Where your tariff has a peak window, the battery is scheduled to discharge through it and recharge from solar the next morning. That is where the bill savings actually come from.",
          },
          {
            heading: "Incentives filed for you",
            body: "The federal storage credit and any applicable utility incentive are handled as part of the job, so the quoted number is the number you pay.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right battery",
        intro:
          "Four questions decide this, and only the first is about capacity.",
        points: [
          {
            heading: "Backup for essentials only",
            body: "A 10 to 13.5 kWh unit on a critical-loads sub-panel. Fridge, internet, lights and outlets for two to three days. The best value in the whole range, and what we recommend most often.",
          },
          {
            heading: "Air conditioning through an outage",
            body: "The high-output 16 kWh unit. You are buying continuous output and surge headroom, not capacity — that is what starts a compressor when the grid is down.",
          },
          {
            heading: "Start small, grow later",
            body: "The modular stack. Begin at 10 kWh, add modules when an EV arrives or the household grows. Slightly more per kWh up front, considerably cheaper than replacing a unit you outgrew.",
          },
          {
            heading: "Bill reduction is the main goal",
            body: "Size to your evening usage rather than to your outage anxiety. Most households shift 8 to 12 kWh a night, and buying beyond that has a very long payback.",
          },
        ],
      },
      factors: {
        heading: "What to weigh before you choose",
        intro: "Seven questions, worked through against your load study.",
        items: [
          { label: "Evening consumption", body: "How much energy you actually use between sunset and sunrise, read off interval data rather than estimated." },
          { label: "Worst-case simultaneous draw", body: "What might run at the same moment during an outage — this sets output, not capacity." },
          { label: "Backup scope", body: "Whole-home or a critical-loads sub-panel. This is the single biggest lever on the final price." },
          { label: "Existing solar", body: "Whether there is already an array, which decides AC- or DC-coupled and changes the cost meaningfully." },
          { label: "Tariff structure", body: "Whether you have a peak window worth discharging into, or a flat rate that makes bill savings marginal." },
          { label: "Future load", body: "An EV, a pool pump or a workshop coming in the next few years argues for a modular system." },
          { label: "Install location", body: "Garage, utility room or exterior wall — ambient temperature affects both performance and warranty." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the systems we have commissioned, in the words it usually arrives in.",
        items: [
          { label: "The first outage sells it", body: "Almost every owner reports the same thing — they did not fully believe in the battery until the street went dark and nothing in the house noticed." },
          { label: "Evening bills drop visibly", body: "Households on time-of-use tariffs see the peak-window charges largely disappear within the first billing cycle." },
          { label: "Critical loads were the right call", body: "Owners who chose a sub-panel over whole-home backup consistently say they would make the same decision again." },
          { label: "It is quieter than expected", body: "No fans, no noise. People are routinely surprised that a battery this size is completely silent." },
        ],
        closing:
          "The one regret we hear is capacity, not output — usually from households who sized for a normal evening and then bought an EV a year later. That is exactly what the modular stack exists to avoid.",
      },
      tips: {
        heading: "Installation and maintenance",
        intro:
          "Five things that decide whether a battery reaches its warranted cycle count.",
        items: [
          "Install it somewhere that stays as cool as possible — an interior garage wall beats a west-facing exterior one by a wide margin.",
          "Leave the manufacturer's clearance around the enclosure. Batteries manage their own temperature and need the air to do it.",
          "Test the backup transfer at commissioning and again once a year — pull the main and confirm the house stays up.",
          "Keep monitoring connected. Cell balancing and warranty claims both depend on the data, and an offline battery generates none.",
          "Do not leave it sitting at 100% for months. Where the system allows it, a reserve target below full is kinder to the cells.",
        ],
      },
      faqs: [
        {
          question: "How long will a home battery power my house?",
          answer:
            "On a critical-loads sub-panel — fridge, internet, lights, a few outlets — a 13.5 kWh battery runs for two to three days. Whole-home with air conditioning, closer to four to six hours. If there is sun on the roof the array recharges it each day, which extends both figures substantially.",
        },
        {
          question: "Will a battery pay for itself?",
          answer:
            "On bill savings alone, usually not within the warranty term unless you are on an aggressive time-of-use tariff. We say that plainly. Most people buy storage for backup and treat the bill reduction as a bonus, and that is an honest way to think about it.",
        },
        {
          question: "Can I add a battery to solar I already have?",
          answer:
            "Yes. An AC-coupled battery has its own inverter and connects on the AC side, so the existing array and inverter stay exactly as they are. We retrofit to systems other companies installed all the time.",
        },
        {
          question: "Will it run my air conditioning?",
          answer:
            "Only if you buy for output rather than capacity. Starting a large AC compressor needs high continuous output and surge headroom — our 16 kWh high-output unit does it, a standard 7.6 kW battery will not, regardless of how many kWh it holds.",
        },
        {
          question: "Is lithium storage safe indoors?",
          answer:
            "LFP is, which is why we only quote it. Lithium iron phosphate has no thermal runaway pathway under normal fault conditions, unlike the NMC chemistry in phones and EVs. All our units are listed for indoor installation and we install them in garages and utility rooms routinely.",
        },
        {
          question: "How long do home batteries last?",
          answer:
            "The warranties run 10 to 12 years and are written in cycles as well as time — typically 6,000 to 8,000 cycles to 70% retained capacity. In daily-cycling use that is a decade and a half before the battery is meaningfully diminished, and it keeps working after that.",
        },
      ],
      verdict: {
        heading: "So, should you buy a battery?",
        body: [
          "If you do not have solar yet, no — put the money on the roof first. An array without a battery still cuts your bill every day. A battery without an array is a very expensive generator that you have to charge from the grid.",
          "If you do have solar and outages bother you, then yes, and the honest recommendation is a 13.5 kWh unit on a critical-loads sub-panel. It is the best value in the range by a distance, and it covers the scenario that actually happens.",
          "Only go bigger if you have a specific reason — air conditioning through an outage, a well pump, an EV that charges overnight. Those are real requirements and they need real output. Anxiety is not a sizing input.",
        ],
        pullQuote:
          "Panels first, then a battery on a critical-loads panel. Buy output if you need the AC running; buy capacity only if you can point at what will use it.",
      },
    },
  },
  "heat-pump": {
    title: "Heat Pumps",
    intro:
      "A heat pump is the single largest load in most homes and the one most worth getting right. We install ducted systems, multi-zone mini splits and heat pump water heaters — all sized off a Manual J load calculation, not off what the old unit happened to be.",
    heroImage: { src: "/images/products/heat-pump-3.jpg", position: "center 50%" },
    rangeTitle: "The systems we stock",
    rangeDescription:
      "Variable-speed equipment throughout, because a heat pump that modulates runs quieter, dehumidifies properly and pairs far better with a solar array than one that only knows on and off.",
    sections: [
      {
        heading: "What is a heat pump and why do you need one?",
        body: [
          "A heat pump moves heat rather than making it. In summer it pulls heat out of your house; in winter it runs the same cycle backwards and pulls heat in from outside, even when it is cold out there. Because it is moving energy instead of burning or resisting, it delivers three to four units of heat for every unit of electricity it draws.",
          "That efficiency is why it matters for anyone with solar. Heating and cooling is typically half a home's energy use, and a heat pump is the one appliance that turns rooftop production into comfort at a three-to-one ratio.",
        ],
      },
      {
        heading: "Types of heat pump systems",
        subsections: [
          {
            heading: "Ducted air-source — the whole-home replacement",
            body: "A variable-speed outdoor unit and a matched air handler feeding your existing ductwork. The straight swap for a conventional AC and furnace, and the right answer when the duct system is in reasonable condition. Handles heating and cooling from one system.",
          },
          {
            heading: "Multi-zone mini split — rooms ducts never reached",
            body: "One outdoor unit feeding up to five indoor heads, each with its own thermostat. No ductwork at all, which makes it the answer for additions, garages, converted attics and offices — and for whole houses where the duct system is beyond saving.",
          },
          {
            heading: "Heat pump water heater — the quiet win",
            body: "The same technology applied to the hot water tank. It uses roughly a third of the energy of an electric resistance heater, fits the same footprint, and is usually the cheapest efficiency upgrade in the whole house.",
          },
          {
            heading: "Cold-climate variants",
            body: "Modern inverter-driven units hold useful heating capacity down to -4°F. Backup resistance heat exists for the handful of hours a year below that, rather than being the primary heat source it used to be.",
          },
        ],
      },
      {
        heading: "Sizing a heat pump to your home",
        body: [
          "Oversizing is the most common fault we find in existing installs, and it makes comfort worse, not better:",
        ],
        subsections: [
          {
            heading: "Manual J, not rule of thumb",
            body: "We calculate the actual heating and cooling load from your building envelope, orientation, glazing and infiltration. Sizing off the old unit's capacity just perpetuates whatever mistake was made last time.",
          },
          {
            heading: "Why oversizing hurts",
            body: "An oversized system satisfies the thermostat quickly and shuts down before it has dehumidified anything. The house is cold and clammy, the compressor short-cycles, and it wears out early. A right-sized variable-speed unit runs longer at lower output and holds humidity where it should be.",
          },
          {
            heading: "Ductwork and airflow",
            body: "A high-efficiency system on undersized ductwork will never reach its rated numbers. We measure static pressure before we quote, and if the ducts need work we say so up front rather than discovering it at commissioning.",
          },
        ],
      },
      {
        heading: "Quality equipment, honestly specified",
        body: [
          "Everything we quote is AHRI-matched as a system, because a mismatched coil and condenser will not deliver the rated efficiency no matter what the box says. Our range gives you:",
        ],
        bullets: [
          "Fully variable inverter-driven compressors, not single or two-stage",
          "Low-GWP R-454B refrigerant across the ducted and mini split range",
          "Manual J load calculation on every job, included in the quote",
          "Energy Star certification, so federal and utility incentives apply",
        ],
      },
      {
        heading: "Buy a heat pump with expert installation",
        body: [
          "We supply and install ducted systems, multi-zone mini splits and heat pump water heaters, with load calculation, duct assessment, permitting, electrical work, commissioning and airflow balancing all part of the same job.",
          "Where there is solar on the roof we will also set the schedule to pre-cool or pre-heat during production hours, so the array carries the load instead of the grid.",
        ],
      },
    ],
    closing: {
      lead: "Browse the range above, or ",
      label: "book a load calculation",
      href: "/contact",
      trail: " and we will size the system against your actual house.",
    },
    detail: {
      features: [
        "Up to 23 SEER2 cooling efficiency",
        "Heating down to -4°F",
        "Fully variable inverter compressors",
        "Low-GWP R-454B refrigerant",
        "Manual J sizing on every job",
        "Energy Star certified throughout",
      ],
      about: {
        heading: "About the range",
        body: [
          "Almost every efficiency claim on a heat pump datasheet assumes a correctly sized system on adequate ductwork, commissioned properly and charged to spec. Get any of those wrong and a 20 SEER2 unit performs like a 14. That is why we spend more time on the load calculation and the duct assessment than on the equipment selection.",
          "The three systems we carry cover three different problems. The ducted unit replaces a conventional AC and furnace on existing ducts. The multi-zone mini split conditions rooms that ductwork never reached. The heat pump water heater is the cheapest efficiency upgrade in the house and gets specified far too rarely.",
        ],
      },
      pricing: {
        heading: "Heat pump pricing by system type",
        intro:
          "Supply-and-install pricing — equipment, load calculation, electrical, refrigerant lines, commissioning and airflow balancing. Duct replacement and electrical upgrades are quoted separately.",
        columns: ["System type", "Capacity", "Installed price", "Best for"],
        rows: [
          ["Ducted, single zone", "2 – 3 tons", "$12,400 – $15,600", "Average home on existing ducts"],
          ["Ducted, large home", "4 – 5 tons", "$15,800 – $19,800", "Larger or two-storey homes"],
          ["Mini split, single zone", "9k – 18k BTU", "$4,600 – $6,800", "One room, addition or garage"],
          ["Mini split, multi-zone", "3 – 5 heads", "$9,800 – $14,500", "Whole home without ductwork"],
          ["Heat pump water heater", "65 gal", "$3,400 – $5,200", "Replacing electric resistance"],
        ],
        note:
          "Prices are before the federal efficiency credit and any utility rebate, both of which we file for. Duct replacement, electrical panel work and condensate re-routing are priced on inspection.",
      },
      priceCards: {
        heading: "Common configurations",
        items: [
          { name: "Heat pump water heater", price: "$3,400", note: "Cheapest efficiency win" },
          { name: "Single-zone mini split", price: "$4,600", note: "Garage or addition" },
          { name: "3-ton ducted system", price: "$12,400", note: "Most common whole-home" },
          { name: "4-zone mini split", price: "$12,900", note: "Whole home, no ducts" },
        ],
      },
      priceNotes: [
        {
          heading: "Whole-home ducted replacement",
          intro:
            "The most common job we quote — replacing a conventional AC and gas or resistance furnace with a single heat pump.",
          bullets: [
            { label: "3-ton variable-speed ducted system", body: "approximately $12,400 – $15,600 supplied and installed" },
            { label: "Ideal for", body: "an average home with ductwork in serviceable condition" },
            { label: "What drives the price", body: "capacity, duct condition, electrical capacity and whether the air handler location needs work" },
          ],
          closing:
            "Where the ducts need replacing as well, budget another $4,000 to $9,000. We measure static pressure before quoting so this is never a surprise.",
        },
        {
          heading: "Rooms without ductwork",
          intro:
            "Additions, garage conversions, attic offices and sunrooms — anywhere the duct system never reached.",
          bullets: [
            { label: "Single-zone mini split", body: "approximately $4,600 – $6,800 installed" },
            { label: "Multi-zone, 3 to 5 heads", body: "approximately $9,800 – $14,500 installed" },
            { label: "Per-zone control", body: "each head has its own thermostat, so unused rooms cost nothing to leave off" },
          ],
          closing:
            "Multi-zone systems also make sense as a whole-home solution where replacing the ductwork would cost more than going without it.",
        },
        {
          heading: "Hot water",
          intro:
            "The upgrade with the shortest payback in the house, and the one most often overlooked.",
          bullets: [
            { label: "65 gallon heat pump water heater", body: "approximately $3,400 – $5,200 installed" },
            { label: "Energy reduction", body: "roughly 70% against an electric resistance tank" },
            { label: "Needs", body: "about 700 cubic feet of air around it — a garage or utility room, not a closet" },
          ],
          closing:
            "On a household still running a resistance tank, this typically pays for itself in three to five years without any other change.",
        },
      ],
      tables: [
        {
          heading: "Efficiency and running cost compared",
          intro:
            "What each system costs to run against the equipment it usually replaces. Indicative annual figures for an average home at $0.14/kWh.",
          columns: ["System", "Efficiency", "Annual running cost", "Replaces"],
          rows: [
            ["Ducted heat pump", "20 SEER2 / 9.5 HSPF2", "$1,050 – $1,400", "AC + gas or electric furnace"],
            ["Multi-zone mini split", "23 SEER2 / 10.2 HSPF2", "$900 – $1,250", "Window units, space heaters"],
            ["Older central AC", "13 SEER", "$1,700 – $2,200", "—"],
            ["Heat pump water heater", "UEF 4.05", "$120 – $180", "Electric resistance tank"],
            ["Electric resistance tank", "UEF 0.92", "$480 – $620", "—"],
          ],
          note:
            "Running costs assume typical Central Texas heating and cooling degree days. A solar array covering daytime production reduces every figure above substantially.",
        },
      ],
      series: {
        heading: "The system families we install",
        intro:
          "Four configurations cover everything from a single hot room to a whole-home changeover off gas.",
        items: [
          {
            heading: "Ducted variable-speed",
            body: "An inverter-driven outdoor unit and matched air handler on your existing ductwork. Modulates continuously rather than cycling, which holds temperature within a degree and dehumidifies properly. The straight replacement for a conventional AC and furnace.",
          },
          {
            heading: "Single-zone mini split",
            body: "One outdoor unit, one indoor head, no ducts. A three-inch penetration through the wall for the line set and that is the extent of the disruption. The answer for a garage, addition, sunroom or attic office.",
          },
          {
            heading: "Multi-zone mini split",
            body: "One outdoor unit feeding up to five heads, each independently controlled. Rooms you are not using cost nothing to leave off. Also the practical whole-home option where the ductwork is beyond economic repair.",
          },
          {
            heading: "Heat pump water heater",
            body: "The same cycle applied to a 65 gallon tank, using roughly a third of the energy of a resistance element. Hybrid mode brings the backup element in only during heavy draw. Needs air volume around it, so a garage or utility room rather than a closet.",
          },
        ],
        note:
          "Every system is AHRI-matched and Energy Star certified, which is what makes the federal efficiency credit and utility rebates applicable — we confirm eligibility before quoting.",
      },
      pros: {
        heading: "What we like",
        items: [
          "Three to four units of heat delivered per unit of electricity drawn",
          "One system for heating and cooling — no separate furnace to maintain",
          "Variable-speed operation that actually dehumidifies instead of short-cycling",
          "Pairs with solar better than any other load in the house",
          "Low-GWP refrigerant, so the system is not obsolete on the next phase-down",
        ],
      },
      cons: {
        heading: "Worth knowing before you sign",
        items: [
          "Up-front cost is higher than a like-for-like AC replacement",
          "Efficiency depends entirely on correct sizing and adequate ductwork",
          "Below about -4°F capacity falls off and backup resistance heat takes over",
          "Heat pump water heaters need air volume — a sealed closet will not work",
          "A cheap install on a good unit performs worse than a good install on an average one",
        ],
      },
      why: {
        heading: "Why these systems suit Central Texas",
        intro:
          "Long cooling seasons, high humidity and a short mild winter. That combination rewards very different equipment than a northern climate does.",
        points: [
          {
            heading: "Sized for humidity, not just heat",
            body: "An oversized system cools fast and dehumidifies nothing, which is why so many homes here feel cold and clammy. Variable-speed equipment sized off a Manual J runs longer at lower output and pulls the moisture out properly.",
          },
          {
            heading: "Heating is nearly free here",
            body: "Our winters sit well inside the range where a heat pump delivers three to four times its input. Backup resistance heat exists for a handful of hours a year, not as the primary source.",
          },
          {
            heading: "The best partner for a solar array",
            body: "Cooling load peaks in the afternoon, which is exactly when the roof is producing. Pre-cooling on solar hours shifts a large part of your biggest load off the grid entirely.",
          },
          {
            heading: "Ductwork assessed before quoting",
            body: "We measure static pressure and inspect the runs first. A 20 SEER2 system on undersized ducts performs like a 14, and we would rather tell you that before you buy it than after.",
          },
          {
            heading: "Incentives filed for you",
            body: "Federal efficiency credits and utility rebates are handled as part of the job, so the quoted number is the number you pay.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right system",
        intro:
          "Four questions decide this, and the state of your ductwork answers most of them.",
        points: [
          {
            heading: "Existing ducts in good condition",
            body: "Ducted variable-speed. One system, one thermostat, whole-home heating and cooling, and the least disruptive install of the lot.",
          },
          {
            heading: "One room that is always wrong",
            body: "Single-zone mini split. A garage, addition or attic office that the ducts never reached properly is a half-day job and a permanent fix.",
          },
          {
            heading: "Ductwork beyond economic repair",
            body: "Multi-zone mini split. Where replacing ducts costs more than going without them, three to five heads condition the whole house with per-room control.",
          },
          {
            heading: "Still on an electric resistance tank",
            body: "Heat pump water heater, before anything else. It is the cheapest efficiency upgrade in the house and typically pays back inside five years.",
          },
        ],
      },
      factors: {
        heading: "What to weigh before you choose",
        intro: "Seven questions, worked through on the load calculation visit.",
        items: [
          { label: "Actual heating and cooling load", body: "Calculated from the building envelope, not inferred from whatever the old unit happened to be." },
          { label: "Duct condition and static pressure", body: "Measured before quoting — it decides whether a high-efficiency system can reach its rating." },
          { label: "Electrical capacity", body: "Spare breaker space and service headroom, particularly when moving off gas." },
          { label: "Humidity control", body: "How the system behaves at part load, which matters more here than peak capacity does." },
          { label: "Zoning needs", body: "Whether the house has rooms with genuinely different loads that justify independent control." },
          { label: "Solar on the roof", body: "An existing or planned array changes the scheduling and improves the economics considerably." },
          { label: "Noise tolerance", body: "Outdoor unit placement relative to bedrooms and neighbours, and indoor head noise at low fan." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the systems we have commissioned, in the words it usually arrives in.",
        items: [
          { label: "The house feels different", body: "The most common report is not temperature but humidity — a variable-speed system holds the house dry in a way a short-cycling one never did." },
          { label: "It is much quieter", body: "Owners consistently mention noise. A modulating compressor spends most of its life at low output, and low output is nearly silent." },
          { label: "Summer bills drop noticeably", body: "Households replacing a 13 SEER unit typically report cooling costs falling by a third or more in the first full season." },
          { label: "The water heater was the surprise", body: "People who added a heat pump water heater as an afterthought are usually the most enthusiastic about it." },
        ],
        closing:
          "The complaints we get are almost always about ductwork on systems we did not install — undersized returns and leaking runs that no equipment upgrade can compensate for.",
      },
      tips: {
        heading: "Installation and maintenance",
        intro:
          "Five things that decide whether a heat pump delivers its rated efficiency.",
        items: [
          "Insist on a Manual J load calculation. A system sized off the old unit's capacity repeats whatever mistake was made last time.",
          "Have the ductwork measured, not assumed. Static pressure above spec caps the efficiency of any equipment you fit behind it.",
          "Change filters on schedule. Restricted airflow is the single most common cause of poor performance and premature compressor wear.",
          "Keep the outdoor unit clear — 24 inches all round, and hose the coil down twice a year. Cottonwood and grass clippings are the usual culprits.",
          "Give a heat pump water heater the air volume it needs. A sealed closet starves it and forces it onto the resistance element, which defeats the point entirely.",
        ],
      },
      faqs: [
        {
          question: "Does a heat pump work in cold weather?",
          answer:
            "Yes. Modern inverter-driven units hold useful heating capacity down to -4°F, which is well below anything Central Texas sees in a normal winter. Backup resistance heat exists for the handful of hours a year below that, rather than doing the bulk of the work as older systems did.",
        },
        {
          question: "Is a heat pump cheaper to run than gas?",
          answer:
            "In this climate, generally yes, and the gap widens if you have solar. A heat pump delivers three to four units of heat per unit of electricity, where a gas furnace delivers slightly less than one unit of heat per unit of gas. Our winters sit right in the range where the heat pump is most efficient.",
        },
        {
          question: "Why does sizing matter so much?",
          answer:
            "An oversized system satisfies the thermostat before it has dehumidified anything, so the house ends up cold and clammy, and the compressor short-cycles itself into an early failure. A correctly sized variable-speed unit runs longer at lower output, which is both more comfortable and cheaper.",
        },
        {
          question: "Can I keep my existing ductwork?",
          answer:
            "Often yes, but we measure before we promise. Static pressure above specification will cap the efficiency of whatever you install behind it. If the ducts need work we tell you before you buy the equipment, not after it is commissioned and underperforming.",
        },
        {
          question: "How long does a heat pump last?",
          answer:
            "Fifteen to twenty years with routine maintenance, which is comparable to conventional AC. Our warranties run 10 years on parts and 12 on the compressor. Correct sizing does more for lifespan than brand does — short-cycling is what kills compressors.",
        },
        {
          question: "Is a heat pump water heater noisy?",
          answer:
            "It runs at about 49 dB, roughly a quiet conversation, and only while it is heating. In a garage or utility room nobody notices. Directly outside a bedroom wall you would, which is one of the reasons we look at placement before quoting.",
        },
      ],
      verdict: {
        heading: "So, which system should you buy?",
        body: [
          "If your ductwork is serviceable, the ducted variable-speed system is the right answer. One unit for heating and cooling, existing ducts, and the least disruptive install available.",
          "If it is not — or if the problem is one stubborn room rather than the whole house — mini splits win outright. Per-zone control, no ductwork, and a whole-home multi-zone system often costs less than replacing ducts and fitting a ducted unit behind them.",
          "And if you are still on an electric resistance water heater, do that first regardless of what else you decide. It is the smallest cheque in the range and it has the shortest payback in the house.",
        ],
        pullQuote:
          "Ducts in good shape? Go ducted. Ducts beyond saving, or one bad room? Go mini split. Still on a resistance tank? Fix that before either.",
      },
    },
  },
  "ceiling-vacuum": {
    title: "Ceiling Vacuum & Insulation Removal",
    intro:
      "Old ceiling insulation holds decades of dust, rodent waste and sometimes water damage. We extract it under negative pressure through HEPA H13 filtration, sanitise the cavity and seal the entry points — so the new insulation goes onto a clean deck rather than on top of the problem.",
    heroImage: { src: "/images/products/ceiling-vacuum-1.jpg", position: "center 50%" },
    rangeTitle: "The services we run",
    rangeDescription:
      "Three jobs: a full clear-out back to bare joists, targeted single-room extraction for damage, and a sanitise-and-seal treatment before anything new goes back in.",
    sections: [
      {
        heading: "Why remove old ceiling insulation at all?",
        body: [
          "Insulation does not wear out so much as it fills up. Thirty years of settled dust, rodent nesting, roof leaks and demolition debris compress the batts, destroy their R-value and turn the cavity into a reservoir of everything that has ever got into your roof.",
          "The temptation is to lay new batts straight over the top. That traps the contamination, halves the benefit of the new material and makes the eventual clean-up far worse. Extracting first costs less than doing it twice.",
        ],
      },
      {
        heading: "When removal is the right call",
        subsections: [
          {
            heading: "Rodent activity",
            body: "Droppings, urine and nesting material do not clear themselves and will not stop attracting rodents while they remain. Removal, sanitising and sealing the entry points is the only sequence that actually ends the problem.",
          },
          {
            heading: "Water damage",
            body: "Wet insulation loses its R-value permanently and stays damp for months in an enclosed cavity, which is how mould establishes above a ceiling nobody looks at. Once it has been soaked it needs to come out.",
          },
          {
            heading: "Settled or compressed material",
            body: "Batts that have flattened to half their original thickness are delivering roughly half their original R-value. Adding more on top of compressed material does not un-compress it.",
          },
          {
            heading: "Before a re-fit or a solar install",
            body: "Any job that puts trades in the roof space is the cheapest moment to clear it. The access is already open and the cavity is already disturbed.",
          },
        ],
      },
      {
        heading: "How the extraction actually works",
        body: [
          "The whole job runs from outside the house. Nothing is carried through your living space:",
        ],
        subsections: [
          {
            heading: "Containment first",
            body: "The manhole is sealed and the roof space is put under negative pressure, so air flows into the cavity rather than out of it. Nothing that comes loose up there travels into the rooms below.",
          },
          {
            heading: "HEPA H13 filtration",
            body: "Everything extracted passes through H13 medical-grade filtration before the air is discharged. That is what makes it safe to do this above an occupied house rather than turning it into a demolition job.",
          },
          {
            heading: "Bagged and removed the same day",
            body: "Waste is bagged at the truck and taken away when we leave. There is no skip on your driveway and no bags left in the roof for a second visit.",
          },
        ],
      },
      {
        heading: "Done properly, once",
        body: [
          "Extraction is not complicated, but it is easy to do badly. Our jobs include:",
        ],
        bullets: [
          "Negative-pressure containment before anything is disturbed",
          "HEPA H13 filtration on all extracted air",
          "Photographic before-and-after of the bare cavity",
          "Fixed pricing with no per-bag or per-hour surprises",
        ],
      },
      {
        heading: "Book removal with the refit together",
        body: [
          "Almost everyone who books a clear-out is doing it so new insulation can go in. Running both as one job means one access setup, one crew mobilisation and one day of disruption rather than two.",
          "It also means the cavity is inspected while it is empty — which is when roof leaks, damaged wiring and rodent entry points are actually visible.",
        ],
      },
    ],
    closing: {
      lead: "Browse the services above, or ",
      label: "book a roof space inspection",
      href: "/contact",
      trail: " and we will tell you whether removal is worth doing at all.",
    },
    detail: {
      features: [
        "HEPA H13 medical-grade filtration",
        "Negative-pressure containment",
        "Up to 130 ft hose reach",
        "Bagged and removed same day",
        "Photographed before and after",
        "Fixed price, no per-bag charges",
      ],
      about: {
        heading: "About the service",
        body: [
          "Insulation removal is one of those jobs where the equipment is the whole difference. A shop vacuum and a bin bag will clear a cavity, and it will also push thirty years of fine dust and rodent allergen into every room in the house through the ceiling penetrations you cannot see.",
          "We run truck-mounted extraction with H13 filtration and put the roof space under negative pressure before anything is touched. It costs more than a two-person crew with buckets and it is the only version of this job that is safe to run above an occupied home.",
        ],
      },
      pricing: {
        heading: "Removal pricing by scope",
        intro:
          "Fixed-price supply of labour, equipment, containment, filtration, bagging and disposal. Quoted from the roof plan and confirmed on inspection.",
        columns: ["Scope", "Typical area", "Fixed price", "Best for"],
        rows: [
          ["Single zone", "One room", "$650 – $1,200", "Localised water or rodent damage"],
          ["Part ceiling", "Up to 1,200 sq ft", "$1,200 – $2,100", "Extensions and partial re-roofs"],
          ["Whole ceiling", "1,200 – 2,200 sq ft", "$1,850 – $2,900", "Standard family home"],
          ["Large or two-storey", "2,200 – 3,000 sq ft", "$2,600 – $3,400", "Larger homes, difficult access"],
          ["Sanitise and seal", "Add-on", "$480 – $950", "After any rodent or mould removal"],
        ],
        note:
          "Restricted manhole access, no vehicle access within 130 ft, cathedral ceilings and asbestos-era material are priced on inspection. We inspect before we quote a number, not after.",
      },
      priceCards: {
        heading: "Common jobs",
        items: [
          { name: "Sanitise and seal", price: "$480", note: "Add-on after removal" },
          { name: "Single room extraction", price: "$650", note: "Water or rodent damage" },
          { name: "Whole ceiling clear-out", price: "$1,850", note: "Most common job" },
          { name: "Clear-out plus refit", price: "$5,400", note: "Removal and new R6.0" },
        ],
      },
      priceNotes: [
        {
          heading: "Whole-house clear-out",
          intro:
            "The most common job we run, and almost always the precursor to a re-insulation.",
          bullets: [
            { label: "Whole ceiling, 1,200 – 2,200 sq ft", body: "approximately $1,850 – $2,900 fixed price" },
            { label: "Typical duration", body: "four to six hours with a two-technician crew" },
            { label: "What drives the price", body: "ceiling area, manhole access, how far the truck can park from the house" },
          ],
          closing:
            "Booked together with the refit it runs as a single day. Booked separately it is two mobilisations and you pay for both.",
        },
        {
          heading: "Targeted single-room removal",
          intro:
            "Where the problem is one leak or one nest rather than the whole ceiling.",
          bullets: [
            { label: "Per zone", body: "approximately $650 – $1,200 fixed price" },
            { label: "Containment", body: "the affected zone is isolated so the rest of the cavity is untouched" },
            { label: "Typical duration", body: "one to two hours" },
          ],
          closing:
            "We will tell you honestly if the contamination has spread beyond the zone. Half-clearing a cavity is worse than not clearing it.",
        },
        {
          heading: "Sanitise and seal",
          intro:
            "The step that stops the problem coming back, and the one most often skipped.",
          bullets: [
            { label: "Antimicrobial fog and entry sealing", body: "approximately $480 – $950 as an add-on" },
            { label: "Includes", body: "cavity fogging, eaves and penetration sealing, and a photographed entry-point report" },
            { label: "Covered by", body: "a 12-month rodent re-entry guarantee" },
          ],
          closing:
            "Removing a nest without sealing the way in buys you about a season. It is the cheapest part of the job and the one that determines whether you do this again.",
        },
      ],
      tables: [
        {
          heading: "Removal or leave it? A straight answer",
          intro:
            "What we look for on inspection, and what we recommend in each case. We say leave it more often than people expect.",
          columns: ["What we find", "R-value now", "Recommendation", "Typical cost"],
          rows: [
            ["Clean batts, full thickness", "Near original", "Top up over the existing", "Refit only"],
            ["Settled to half depth", "~50%", "Remove and refit", "$1,850+"],
            ["Rodent activity", "Compromised", "Remove, sanitise, seal, refit", "$2,300+"],
            ["Water damaged", "Near zero when wet", "Remove affected zone", "$650+"],
            ["Loose fill over 30 years old", "Unknown", "Test before disturbing", "Inspection first"],
          ],
          note:
            "Loose-fill material in homes built before the mid-1980s is tested for asbestos before anything is disturbed. If it is present this becomes a licensed abatement job and we will refer you rather than proceed.",
        },
      ],
      series: {
        heading: "The jobs we run",
        intro:
          "Four scopes cover everything from a single damaged room to a full strip-out and refit.",
        items: [
          {
            heading: "Full clear-out",
            body: "The whole ceiling stripped back to bare joists under negative pressure, with H13 filtration on all extracted air. Four to six hours for a standard home, waste bagged and gone the same day, cavity photographed before and after.",
          },
          {
            heading: "Targeted removal",
            body: "One room or zone isolated and cleared, for a roof leak, a rodent nest or smoke damage that has not spread. The rest of the cavity is left sealed and untouched. One to two hours.",
          },
          {
            heading: "Sanitise and seal",
            body: "Antimicrobial fogging of the empty cavity followed by sealing of every rodent entry point we can find, photographed and reported. Runs after any removal and carries a 12-month re-entry guarantee.",
          },
          {
            heading: "Clear-out and refit",
            body: "Removal and new insulation as a single job. One access setup, one crew mobilisation, one day. Also the only time anyone will inspect your bare cavity for leaks and damaged wiring.",
          },
        ],
        note:
          "Pre-1980s loose fill is tested for asbestos before we disturb anything. If it is present, this becomes licensed abatement work and we will refer you to a licensed contractor rather than proceed.",
      },
      pros: {
        heading: "What we like",
        items: [
          "H13 filtration means this is safe to run above an occupied house",
          "Negative pressure keeps every bit of it out of your living space",
          "Fixed pricing — no per-bag charges and no hourly creep",
          "Photographed before and after, so you can see what you paid for",
          "The empty cavity is the only chance to spot leaks and wiring faults",
        ],
      },
      cons: {
        heading: "Worth knowing before you book",
        items: [
          "It is noisy for the few hours the extractor is running",
          "The truck needs to park within about 130 ft of the manhole",
          "Restricted or undersized manhole access adds time and cost",
          "Pre-1980s loose fill must be tested before anything is touched",
          "Removal alone does nothing for your bills — the refit is the part that saves money",
        ],
      },
      why: {
        heading: "Why this matters more in a hot climate",
        intro:
          "A Central Texas roof space runs well above 130°F in summer. Everything in it degrades faster, and everything in it ends up in your air.",
        points: [
          {
            heading: "Heat destroys compressed insulation faster",
            body: "Settled batts in a roof space that cycles past 130°F every summer day break down considerably faster than the same material in a mild climate. Thirty-year-old insulation here is usually in worse condition than its age suggests.",
          },
          {
            heading: "The cavity connects to your air",
            body: "Ceiling penetrations, downlights and hatches all leak. Whatever is in the roof space is in your indoor air to some degree, which is why we contain first and filter everything.",
          },
          {
            heading: "Rodents come in for the cool",
            body: "Roof spaces are entry-point-rich and shaded. Removal without sealing the entries just resets the clock, so we photograph and seal every access we find as part of the job.",
          },
          {
            heading: "The refit only works on a clean deck",
            body: "New batts laid over compressed, contaminated material do not deliver their rated R-value and trap the problem underneath. Clearing first is what makes the new insulation worth buying.",
          },
          {
            heading: "One access, one disruption",
            body: "Running removal and refit as a single job halves the mobilisation cost and means the roof space is opened once rather than twice.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right scope",
        intro:
          "Four scenarios, and what we would actually recommend in each.",
        points: [
          {
            heading: "Insulation is clean and full depth",
            body: "Do not remove it. Top up over the existing material and spend the money on depth instead. We tell people this regularly and it costs us the removal job.",
          },
          {
            heading: "Batts have settled to half depth",
            body: "Full clear-out and refit. Compressed material cannot be restored, and laying new batts over it wastes most of what you paid for.",
          },
          {
            heading: "Rodent or water damage in one area",
            body: "Targeted removal of the affected zone, then sanitise and seal. No reason to clear a cavity that is not contaminated.",
          },
          {
            heading: "Any rodent activity at all",
            body: "Removal plus sanitise and seal, without exception. Clearing a nest and leaving the entry points open buys you one season at most.",
          },
        ],
      },
      factors: {
        heading: "What we check on inspection",
        intro: "Seven things that decide the scope and the price.",
        items: [
          { label: "Material age and type", body: "Anything pre-1980s loose fill is tested for asbestos before it is disturbed." },
          { label: "Depth and compression", body: "Current settled thickness against original, which tells us what R-value is actually left." },
          { label: "Contamination", body: "Rodent activity, water staining, mould and smoke residue, zone by zone." },
          { label: "Manhole access", body: "Size, location and whether equipment can be got into the cavity at all." },
          { label: "Vehicle access", body: "How close the truck can park — hose reach is 130 ft and that sets the limit." },
          { label: "Cavity condition", body: "Roof leaks, damaged wiring and downlight clearances, all visible once it is empty." },
          { label: "Entry points", body: "Every gap a rodent can use, photographed so you can see what gets sealed." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the jobs we have run, in the words it usually arrives in.",
        items: [
          { label: "The dust smell goes", body: "The most common report has nothing to do with temperature — people notice the house stops smelling faintly of dust within a day." },
          { label: "Less disruption than expected", body: "Because the whole job runs from outside through a hose, owners are routinely surprised that nothing came through the house." },
          { label: "The photos mattered", body: "Before-and-after shots of the bare cavity are what people point to when they say the job was worth it." },
          { label: "Allergy symptoms improve", body: "Households with a dust or allergen sensitivity report the clearest benefit, usually within the first week." },
        ],
        closing:
          "The one complaint is noise. The extractor runs for several hours and it is not quiet — we schedule around it where we can, but there is no quiet version of this job.",
      },
      tips: {
        heading: "Before and after the job",
        intro:
          "Five things that make the day go smoothly and keep the cavity clean afterwards.",
        items: [
          "Clear a parking space within about 130 ft of the manhole — hose reach is the practical limit on the whole job.",
          "Move anything stored in the roof space out beforehand, or tell us and we will work around it at a cost.",
          "Plan the refit for the same day. The access is already open and you will pay one mobilisation instead of two.",
          "Have the entry points sealed while the cavity is empty. It is the cheapest it will ever be to do.",
          "Do not store boxes directly on new insulation afterwards — compressing it is exactly the problem you just paid to fix.",
        ],
      },
      faqs: [
        {
          question: "Do I really need to remove the old insulation?",
          answer:
            "Often not. If the existing batts are clean, dry and close to full thickness, topping up over them is cheaper and works just as well — and we will tell you so. Removal is worth it when the material has settled to half depth, been wet, or has rodent activity in it.",
        },
        {
          question: "Will dust get into the house?",
          answer:
            "No. We seal the manhole and put the roof space under negative pressure before anything is disturbed, so air flows into the cavity rather than out of it, and everything extracted passes through H13 filtration. The whole job runs through a hose from outside.",
        },
        {
          question: "How long does it take?",
          answer:
            "Four to six hours for a whole standard ceiling with a two-technician crew, one to two hours for a single room. Booked together with a refit, the whole thing is usually one working day.",
        },
        {
          question: "What if there is asbestos up there?",
          answer:
            "We test any loose-fill material in homes built before the mid-1980s before disturbing it. If asbestos is present this becomes licensed abatement work — we stop, tell you, and refer you to a licensed contractor rather than proceeding.",
        },
        {
          question: "Do you deal with the rodents themselves?",
          answer:
            "We remove the nesting material, sanitise the cavity and seal every entry point we can find, with a 12-month re-entry guarantee. Active infestations need a pest controller first — we will happily coordinate the sequence with them.",
        },
        {
          question: "Can you do this while we are living in the house?",
          answer:
            "Yes, and almost every job we run is occupied. Containment and filtration are exactly what make that possible. It is noisy for a few hours, but nothing comes through the living space.",
        },
      ],
      verdict: {
        heading: "So, should you clear the cavity?",
        body: [
          "If the existing insulation is clean, dry and still close to full thickness, no. Top up over it and put the money into depth. We turn down removal jobs on this basis regularly.",
          "If it has settled to half its thickness, been rained on, or has anything living in it, then yes — and do the refit at the same time. Laying new batts over compressed, contaminated material wastes most of what the new material could have done for you.",
          "Either way, get the cavity inspected before you decide. Fifteen minutes with a torch answers the question, and it is the only way to know which of those two situations you are actually in.",
        ],
        pullQuote:
          "Clean and full depth? Top it up. Settled, wet or occupied? Clear it out, seal it, and refit the same day.",
      },
    },
  },
  "ceiling-insulation": {
    title: "Ceiling Insulation",
    intro:
      "Ceiling insulation is the cheapest energy upgrade in any house and the one most often installed badly. We fit high-R batts and blown-in fill to the R-value on the quote — no gaps, no compression, no skipping the awkward corners where the heat actually gets in.",
    heroImage: { src: "/images/products/ceiling-insulation-1.jpg", position: "center 50%" },
    rangeTitle: "The materials we install",
    rangeDescription:
      "Glasswool batts for standard joist spacing, blown-in cellulose for low-clearance and irregular cavities, and recycled polyester where handling or allergies are a concern.",
    sections: [
      {
        heading: "Why ceiling insulation matters more than anything else",
        body: [
          "Heat rises, and in summer it also radiates down from a roof space that can sit above 130°F. The ceiling is the single largest heat-transfer surface in most homes, which is why insulating it returns more per dollar than windows, wall insulation or anything else you can buy.",
          "It is also the cheapest thing to get wrong. A cavity insulated to R6.0 with 10% of its area left uncovered performs closer to R4.0 — the gaps do far more damage than the R-value difference between products ever will.",
        ],
      },
      {
        heading: "Types of ceiling insulation",
        subsections: [
          {
            heading: "Glasswool batts — the workhorse",
            body: "Pre-cut mineral fibre batts friction-fitted between the joists. Non-combustible, does not settle, does not absorb moisture, and the lowest cost per R-value on the market. The default choice wherever joist spacing is regular and there is room to work.",
          },
          {
            heading: "Blown-in cellulose — for cavities batts cannot reach",
            body: "Treated recycled paper blown through a hose to a measured settled depth. It flows around obstructions and into low-clearance corners that no batt will ever reach, which makes it the answer for irregular or shallow roof spaces.",
          },
          {
            heading: "Polyester batts — itch-free and allergy-friendly",
            body: "Recycled PET fibre with the same thermal performance as glasswool and none of the handling issues. No gloves, no mask, no loose fibres. Worth the premium in homes with allergy or asthma concerns, and it damps sound noticeably better.",
          },
          {
            heading: "What we do not install",
            body: "Loose-fill mineral products that settle unpredictably, and foil-only systems sold as a substitute for bulk insulation. Reflective foil has a role as part of a system; it is not a replacement for R-value.",
          },
        ],
      },
      {
        heading: "Choosing the right R-value and material",
        body: [
          "Three decisions, and the last one matters far more than the first two:",
        ],
        subsections: [
          {
            heading: "R-value against diminishing returns",
            body: "Going from nothing to R4.0 transforms a house. R4.0 to R6.0 is a solid further gain. R6.0 to R8.0 is real but much smaller, and rarely worth it unless the cavity depth is free. We quote R6.0 as standard and tell you honestly when more is worth buying.",
          },
          {
            heading: "Cavity depth and clearances",
            body: "R-value comes from thickness. If the roof space cannot take a 195 mm batt without compressing it against the roofing, the honest answer is blown-in fill at a lower depth rather than a compressed batt that delivers less than its label.",
          },
          {
            heading: "Install quality beats material choice",
            body: "Full coverage into every corner, correct clearances around downlights and flues, no compression, and a vapour strategy suited to the roof. Get those right with a mid-range product and you will beat a premium product fitted carelessly, every time.",
          },
        ],
      },
      {
        heading: "Installed the way it was tested",
        body: [
          "Every rated R-value assumes the material is installed exactly as specified. Our jobs include:",
        ],
        bullets: [
          "Friction-fit into every bay with no gaps at eaves or edges",
          "Correct clearances around downlights, flues and exhaust fans",
          "Blown fill installed to measured settled depth, not blown depth",
          "Photographed coverage so you can see what is actually up there",
        ],
      },
      {
        heading: "Insulate as part of the bigger job",
        body: [
          "The cheapest time to insulate is when the roof space is already open — a clear-out, a re-roof, a solar install or a rewire. One access setup instead of two.",
          "It is also the best-paired upgrade with air conditioning or solar. Insulating first reduces the load, which means a smaller heat pump and a smaller array do the same job for less.",
        ],
      },
    ],
    closing: {
      lead: "Browse the materials above, or ",
      label: "book a roof space inspection",
      href: "/contact",
      trail: " and we will measure what is up there before quoting anything.",
    },
    detail: {
      features: [
        "R5.0 to R7.0 across the range",
        "Non-combustible, Class A fire rated",
        "Full coverage into eaves and corners",
        "Correct downlight and flue clearances",
        "Up to 85% recycled content",
        "Lifetime and 50-year material warranties",
      ],
      about: {
        heading: "About the range",
        body: [
          "There is very little difference between reputable insulation products at the same R-value. There is an enormous difference between a cavity insulated to full coverage and one where the installer stopped short of the eaves because it was awkward. That is where the performance actually lives.",
          "So the three materials we carry are chosen for install conditions rather than for thermal performance. Glasswool for regular joists with headroom. Blown-in cellulose for low-clearance and irregular cavities. Polyester where someone in the house reacts to fibres. All three hit the R-value on the quote when they are fitted properly.",
        ],
      },
      pricing: {
        heading: "Insulation pricing by material",
        intro:
          "Supply-and-install pricing per square foot of ceiling area, including access setup, full-coverage fit, clearances and photographed sign-off. Removal of existing material is quoted separately.",
        columns: ["Material", "R-value", "Installed per sq ft", "Best for"],
        rows: [
          ["Glasswool batts", "R6.0", "$2.40 – $3.60", "Standard joist spacing"],
          ["Blown-in cellulose", "R5.0 – R7.0", "$2.10 – $3.40", "Low clearance, irregular cavities"],
          ["Polyester batts", "R7.0", "$3.20 – $4.80", "Allergy and handling concerns"],
          ["Top-up over existing", "Adds R3.0 – R4.0", "$1.60 – $2.40", "Clean, full-depth existing batts"],
          ["Clear-out plus refit", "R6.0", "$3.80 – $5.20", "Settled or contaminated cavities"],
        ],
        note:
          "Restricted manhole access, cathedral ceilings, and roof spaces under 600 mm clearance are priced on inspection. Federal and utility efficiency rebates are applied after — we file for them as part of the job.",
      },
      priceCards: {
        heading: "Typical whole-house jobs",
        items: [
          { name: "1,200 sq ft top-up", price: "$2,100", note: "Over clean existing batts" },
          { name: "1,500 sq ft R6.0 batts", price: "$4,200", note: "Most common job" },
          { name: "1,500 sq ft blown-in", price: "$3,900", note: "Low-clearance roof" },
          { name: "1,500 sq ft clear and refit", price: "$6,600", note: "Removal included" },
        ],
      },
      priceNotes: [
        {
          heading: "New insulation on a bare cavity",
          intro:
            "Either a new build, or a cavity we have just cleared. The straightforward version of this job.",
          bullets: [
            { label: "R6.0 glasswool, 1,500 sq ft", body: "approximately $3,600 – $5,400 supplied and installed" },
            { label: "Typical duration", body: "half a day for a standard single-storey home" },
            { label: "What drives the price", body: "ceiling area, manhole access, roof pitch and how much of the cavity is crawlable" },
          ],
          closing:
            "Low-pitch roofs cost more, not less. The tighter the space the slower the work, and the more likely the eaves get skipped by an installer in a hurry.",
        },
        {
          heading: "Topping up existing insulation",
          intro:
            "Where the existing batts are clean, dry and still close to full depth, this is the cheapest useful upgrade in the house.",
          bullets: [
            { label: "Adding R3.0 – R4.0 over existing", body: "approximately $1.60 – $2.40 per sq ft" },
            { label: "Laid perpendicular", body: "the new layer runs across the joists, which covers the thermal bridging the first layer left" },
            { label: "Only worth it if", body: "the existing material is dry, uncontaminated and has not settled below about 70% of original depth" },
          ],
          closing:
            "We inspect before quoting a top-up. Laying new batts over compressed or contaminated material is money spent on hiding a problem.",
        },
        {
          heading: "Clear-out and refit together",
          intro:
            "For cavities where the existing material has to come out first.",
          bullets: [
            { label: "Removal plus R6.0 refit, 1,500 sq ft", body: "approximately $5,700 – $7,800 as one job" },
            { label: "Why do them together", body: "one access setup, one mobilisation, one day of disruption instead of two" },
            { label: "Included", body: "cavity inspection while it is empty — leaks, wiring and rodent entries all visible" },
          ],
          closing:
            "Booked separately these two jobs cost roughly $900 more and take two days. There is no good reason to split them.",
        },
      ],
      tables: [
        {
          heading: "R-value and what it actually buys you",
          intro:
            "Indicative annual heating and cooling savings for a 1,500 sq ft ceiling in Central Texas, against an uninsulated cavity. Diminishing returns are real and start early.",
          columns: ["R-value", "Thickness", "Heat flow reduction", "Annual saving", "Verdict"],
          rows: [
            ["Uninsulated", "—", "0%", "—", "Fix this immediately"],
            ["R3.0", "~90 mm", "~72%", "$620 – $840", "Minimum worth doing"],
            ["R4.0", "~130 mm", "~79%", "$690 – $930", "Old code standard"],
            ["R6.0", "~195 mm", "~86%", "$750 – $1,010", "Our standard quote"],
            ["R7.0", "~230 mm", "~88%", "$770 – $1,030", "Worth it if depth is free"],
          ],
          note:
            "Savings assume typical Central Texas degree days and a $0.14/kWh tariff. The jump from nothing to R3.0 is worth more than every subsequent step combined — which is why full coverage matters far more than the last R-value point.",
        },
      ],
      series: {
        heading: "The materials we install",
        intro:
          "Four options, chosen by cavity condition and who lives in the house rather than by datasheet.",
        items: [
          {
            heading: "Glasswool batts",
            body: "Pre-cut mineral fibre friction-fitted between joists at R6.0. Non-combustible, does not settle, does not absorb water, and the best cost per R-value available. The default wherever joist spacing is regular and there is headroom to work.",
          },
          {
            heading: "Blown-in cellulose",
            body: "Borate-treated recycled paper blown to a measured settled depth. Flows around cables, braces and awkward corners that no batt reaches, which makes it the right answer for low-clearance and irregular roof spaces.",
          },
          {
            heading: "Polyester batts",
            body: "Recycled PET at R7.0 with no loose fibres and no handling precautions. Same thermal performance as glasswool, noticeably better acoustic damping, and the obvious choice where anyone in the house has allergy or asthma concerns.",
          },
          {
            heading: "Perpendicular top-up",
            body: "A second layer laid across the joists over clean existing batts. Covers the thermal bridging the first layer left and lifts a tired R3.0 cavity to R6.0 or better for roughly half the cost of a strip and refit.",
          },
        ],
        note:
          "All three materials are ASTM E84 Class A fire rated. We do not install loose-fill mineral products that settle unpredictably, or foil-only systems sold as a substitute for bulk R-value.",
      },
      pros: {
        heading: "What we like",
        items: [
          "The best return per dollar of any efficiency upgrade in a house",
          "Non-combustible, Class A rated materials throughout",
          "Up to 85% recycled content, and no ongoing running cost ever",
          "Reduces the heat pump and solar array you need to buy afterwards",
          "50-year and lifetime material warranties, with a photographed install",
        ],
      },
      cons: {
        heading: "Worth knowing before you book",
        items: [
          "Gaps cost you far more than choosing a lower R-value would",
          "Low-pitch roofs cost more to insulate, not less — the work is slower",
          "Batts compressed against the roofing deliver well below their rating",
          "R6.0 to R7.0 is a real but small gain; do not overpay for the last point",
          "Existing downlights may need clearance covers or replacing with rated fittings",
        ],
      },
      why: {
        heading: "Why this matters most in Central Texas",
        intro:
          "Most insulation advice is written for cold climates and is about keeping heat in. Here the job is mostly keeping heat out, and that changes the priorities.",
        points: [
          {
            heading: "The roof space is the heat source",
            body: "A dark roof over an unvented cavity sits above 130°F on a summer afternoon, radiating straight down through the ceiling. Insulating that surface does more for your cooling bill than anything you can do to the walls or windows.",
          },
          {
            heading: "Coverage beats R-value",
            body: "A cavity at R6.0 with 10% of its area uncovered performs like R4.0. We fit into the eaves and around every obstruction because that is where the actual difference is made, and we photograph it so you can check.",
          },
          {
            heading: "It shrinks the equipment you need next",
            body: "Insulating before you size a heat pump or a solar array means both can be smaller for the same result. Doing it the other way round means paying for capacity you did not need.",
          },
          {
            heading: "Downlight clearances done properly",
            body: "Non-rated downlights need physical clearance from insulation, and covering them is a genuine fire risk. We check every fitting and either clear it correctly or tell you it needs replacing.",
          },
          {
            heading: "Rebates filed for you",
            body: "Federal efficiency credits and utility insulation rebates are handled as part of the job, so the quoted number is the number you pay.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right material",
        intro:
          "Four situations, and what we would actually fit in each.",
        points: [
          {
            heading: "Standard roof with headroom",
            body: "R6.0 glasswool batts. Best cost per R-value, no settling, non-combustible, and nothing about a regular cavity argues for anything more expensive.",
          },
          {
            heading: "Low clearance or irregular cavity",
            body: "Blown-in cellulose. It reaches the corners a batt cannot and holds a measured settled depth. Compressing a batt to make it fit is the wrong answer.",
          },
          {
            heading: "Allergy or asthma in the house",
            body: "Polyester batts. No loose fibres, no handling precautions, same thermal result, and better sound damping into the bargain. Worth the premium here.",
          },
          {
            heading: "Existing batts are clean and full depth",
            body: "Perpendicular top-up over what is already there. Roughly half the cost of a strip and refit, and it covers the thermal bridging the first layer left behind.",
          },
        ],
      },
      factors: {
        heading: "What we check on inspection",
        intro: "Seven things that decide material, R-value and price.",
        items: [
          { label: "Existing material and depth", body: "Whether there is anything up there worth keeping, and how far it has settled." },
          { label: "Cavity clearance", body: "How much depth is available before a batt would be compressed against the roofing." },
          { label: "Joist spacing", body: "Regular spacing suits batts; irregular framing usually means blown-in fill." },
          { label: "Downlights and flues", body: "Every fitting checked for clearance requirements, and non-rated ones flagged." },
          { label: "Ventilation and moisture", body: "Whether the cavity vents properly, which decides the vapour strategy." },
          { label: "Access", body: "Manhole size and how much of the roof space is genuinely crawlable." },
          { label: "What comes next", body: "Planned solar, heat pump or re-roof work — sequencing saves a whole mobilisation." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the ceilings we have insulated, in the words it usually arrives in.",
        items: [
          { label: "The upstairs is usable again", body: "The clearest report comes from two-storey homes — upper floors that were unbearable by mid-afternoon become normal rooms." },
          { label: "The AC stops running constantly", body: "Owners notice the cycling change before they notice the bill. The system runs less and holds temperature better." },
          { label: "It is quieter", body: "Especially with polyester. Rain noise and outside sound both drop noticeably, which nobody expects going in." },
          { label: "The photos settled it", body: "Coverage photos of the eaves and corners are what people cite when asked whether the job was done properly." },
        ],
        closing:
          "The complaints we hear are almost always about work done by someone else — batts stopped a foot short of the eaves, or laid over downlights that needed clearance. Both are invisible from below, which is exactly why we photograph ours.",
      },
      tips: {
        heading: "Before and after the job",
        intro:
          "Five things that protect the R-value you just paid for.",
        items: [
          "Book it alongside any other roof space work — a clear-out, a re-roof, a rewire or a solar install. One access setup instead of two.",
          "Insulate before you size a heat pump or a solar array, not after. Both can be smaller for the same result once the ceiling is doing its job.",
          "Replace non-rated downlights with sealed rated fittings while the cavity is open. It is far cheaper than doing it later.",
          "Never store boxes on top of ceiling insulation. Compressing it to half its thickness halves its R-value, permanently.",
          "Check the eaves after any future roof work. Trades crawling through a cavity are the most common cause of displaced insulation.",
        ],
      },
      faqs: [
        {
          question: "What R-value do I actually need?",
          answer:
            "R6.0 is our standard quote and the right answer for almost every home here. Going to R7.0 is a real but small further gain, worth taking only if the cavity depth is available anyway. Going from nothing to R6.0 is worth more than every step above it combined.",
        },
        {
          question: "Can I just add new batts over the old ones?",
          answer:
            "If the existing material is clean, dry and still close to full depth, yes — and it is the cheapest upgrade available. We lay the new layer perpendicular to the joists so it also covers the thermal bridging. If the old batts have settled below about 70% of original depth or have any contamination, they need to come out first.",
        },
        {
          question: "Batts or blown-in — which is better?",
          answer:
            "Neither, in thermal terms. Batts are cheaper per R-value and do not settle, so they win wherever joist spacing is regular and there is headroom. Blown-in fill wins in low-clearance and irregular cavities because it reaches corners a batt physically cannot.",
        },
        {
          question: "Is insulation a fire risk around downlights?",
          answer:
            "Covering non-rated downlights is a genuine risk, which is why we check every fitting and either maintain the required clearance or tell you it needs replacing with a rated sealed fitting. The insulation itself is Class A fire rated and non-combustible across our range.",
        },
        {
          question: "How long does insulation last?",
          answer:
            "Glasswool and polyester do not degrade — the material warranties run 50 years and lifetime respectively. What fails is the install: batts displaced by trades crawling through the cavity, or compressed by storage. That is why we photograph coverage at handover.",
        },
        {
          question: "How much will it save me?",
          answer:
            "For a 1,500 sq ft uninsulated ceiling in this climate, somewhere between $750 and $1,010 a year at current rates, with most of that coming off summer cooling. On a cavity that already has some insulation the gain is smaller — we quote against what is actually up there rather than against a best case.",
        },
      ],
      verdict: {
        heading: "So, what should you actually do?",
        body: [
          "If your ceiling is uninsulated or badly under-insulated, this is the first cheque you should write — before solar, before a heat pump, before windows. Nothing else in the house returns as much per dollar.",
          "If there is existing material that is clean and close to full depth, top up over it perpendicular to the joists. It costs roughly half a strip-and-refit and closes the thermal bridging the first layer left.",
          "Whichever applies, spend the money on coverage rather than on the last R-value point. A carefully fitted R6.0 cavity beats a carelessly fitted R7.0 one every single time, and the difference is not close.",
        ],
        pullQuote:
          "Insulate the ceiling before you buy anything else. Then spend on coverage, not on the last R-value point — the gaps cost more than the grade ever will.",
      },
    },
  },
  "air-conditioning": {
    title: "Air Conditioning",
    intro:
      "Cooling sized by calculation rather than by habit. We install wall splits, ducted refrigerated systems and ceiling cassettes — all inverter-driven, all reverse cycle, and all commissioned with the electrical work, condensate and airflow balancing handled by the same crew.",
    heroImage: { src: "/images/services/air-conditioning.jpg", position: "center 45%" },
    rangeTitle: "The systems we stock",
    rangeDescription:
      "Three formats cover almost every room we are asked about: a silent wall split for one room, a zoned ducted system for a whole house, and a four-way cassette for open-plan spaces with a ceiling void.",
    sections: [
      {
        heading: "What kind of air conditioning do you actually need?",
        body: [
          "Air conditioning is not one product. A single hot bedroom, a whole house that never cools evenly, and an open-plan living area with a vaulted ceiling are three different problems, and the equipment that solves each one is different.",
          "Everything we install is inverter-driven and reverse cycle, which means it heats as well as it cools. That matters here: our winters are short and mild, and a reverse-cycle system covers them at a third of the running cost of resistance heating.",
        ],
      },
      {
        heading: "Types of air conditioning",
        subsections: [
          {
            heading: "Wall-mounted split — one room, done properly",
            body: "An outdoor condenser and one indoor head, connected by a line set through a three-inch wall penetration. Quiet, efficient, and by far the cheapest way to fix one stubborn room. No ductwork, and the install is usually a single day.",
          },
          {
            heading: "Ducted refrigerated — the whole house, zoned",
            body: "A variable-speed condenser and a ducted air handler feeding your existing ducts, split into zones so bedrooms and living areas run on their own schedules. The right answer where the duct system is in reasonable condition.",
          },
          {
            heading: "Ceiling cassette — even throw for open plan",
            body: "A recessed unit that throws air in four directions from the centre of the ceiling. Better distribution than a wall head in a large square room, and far less visually intrusive. Needs a ceiling void deep enough to take it.",
          },
          {
            heading: "What we do not install",
            body: "Portable units and window rattlers. They are inefficient, loud, and in a Central Texas summer they lose to a properly sized split on running cost within two seasons.",
          },
        ],
      },
      {
        heading: "Sizing, and why bigger is worse",
        body: [
          "The most common fault we find in existing installs is an oversized system, and it makes comfort worse rather than better:",
        ],
        subsections: [
          {
            heading: "Manual J, not the old unit's badge",
            body: "We calculate the actual cooling load from your building envelope, glazing, orientation and infiltration. Sizing from whatever was there before just repeats the mistake somebody made last time.",
          },
          {
            heading: "Oversizing leaves you cold and clammy",
            body: "An oversized system hits the thermostat setpoint fast and shuts off before it has removed any moisture. You end up with a cold, humid house and a compressor that short-cycles itself into an early grave. A right-sized inverter unit runs longer at low output and dehumidifies properly.",
          },
          {
            heading: "Ductwork sets the ceiling on performance",
            body: "A 19 SEER2 system on undersized ducts behaves like a 14. We measure static pressure before quoting, and if the ducts need work we say so before you buy the equipment rather than after.",
          },
        ],
      },
      {
        heading: "Quality equipment, honestly specified",
        body: [
          "Everything is AHRI-matched as a system, because a mismatched coil and condenser never deliver the rated efficiency. Our range gives you:",
        ],
        bullets: [
          "Fully inverter-driven compressors, not single or two-stage",
          "Low-GWP R-454B refrigerant across the whole range",
          "Manual J load calculation on every job, included in the quote",
          "Dedicated circuits, isolators, condensate and tidy conduit as standard",
        ],
      },
      {
        heading: "Buy cooling with expert installation",
        body: [
          "We supply and install wall splits, zoned ducted systems and ceiling cassettes, with load calculation, duct assessment, electrical work, permits, commissioning and airflow balancing all part of the same job.",
          "Where there is solar on the roof we set the schedule to pre-cool during production hours, so your largest load runs on the array rather than the grid. Cooling peaks in the afternoon, which is exactly when the panels are working hardest.",
        ],
      },
    ],
    closing: {
      lead: "Browse the range above, or ",
      label: "book a load calculation",
      href: "/contact",
      trail: " and we will size the system against your actual rooms.",
    },
    detail: {
      features: [
        "Up to 22 SEER2 cooling efficiency",
        "Reverse cycle — heats as well as cools",
        "19 dB at low fan on the wall split",
        "Fully inverter-driven compressors",
        "Low-GWP R-454B refrigerant",
        "Manual J sizing on every job",
      ],
      about: {
        heading: "About the range",
        body: [
          "Every efficiency figure on an air conditioning datasheet assumes a correctly sized system, adequate airflow, a proper refrigerant charge and a competent commissioning. Get any one of those wrong and a 22 SEER2 unit performs like a 15. That is why we spend more time on the load calculation and the duct measurement than on which box to fit.",
          "The three formats we carry solve three different problems rather than being three grades of the same thing. The wall split fixes one room. The ducted system conditions a whole house on ducts you already have. The cassette distributes evenly in a large open space where a wall head would blow across the room rather than around it.",
        ],
      },
      pricing: {
        heading: "Cooling pricing by system type",
        intro:
          "Supply-and-install pricing — equipment, load calculation, dedicated circuit, line set, condensate, commissioning and airflow balancing. Duct replacement and switchboard upgrades are quoted separately.",
        columns: ["System type", "Capacity", "Installed price", "Best for"],
        rows: [
          ["Wall split, single room", "9k – 12k BTU", "$2,900 – $4,200", "Bedroom, office or addition"],
          ["Wall split, large room", "18k – 24k BTU", "$4,100 – $5,800", "Living areas and open plan"],
          ["Ceiling cassette", "18k BTU", "$5,400 – $7,900", "Open plan with a ceiling void"],
          ["Ducted, zoned", "3 – 4 tons", "$13,800 – $18,600", "Whole home on existing ducts"],
          ["Multi-head, 3 – 4 rooms", "3 – 4 heads", "$9,400 – $13,900", "Homes without ductwork"],
        ],
        note:
          "Prices are before any federal efficiency credit or utility rebate, both of which we file for. Duct replacement, electrical panel upgrades, long line-set runs and crane access for high-level units are priced on inspection.",
      },
      priceCards: {
        heading: "Common configurations",
        items: [
          { name: "9k wall split", price: "$2,900", note: "One bedroom or office" },
          { name: "18k wall split", price: "$4,100", note: "Living area" },
          { name: "18k ceiling cassette", price: "$5,400", note: "Open plan, four-way throw" },
          { name: "4-ton zoned ducted", price: "$13,800", note: "Most common whole-home" },
        ],
      },
      priceNotes: [
        {
          heading: "One room that never cools",
          intro:
            "The most common enquiry we get, and usually the cheapest problem in the house to fix.",
          bullets: [
            { label: "9k – 12k BTU wall split", body: "approximately $2,900 – $4,200 supplied and installed" },
            { label: "Ideal for", body: "a bedroom, home office, garage conversion or west-facing room the ducts underserve" },
            { label: "Typical duration", body: "one day, with a single three-inch penetration through the wall" },
          ],
          closing:
            "Adding a split to one problem room is almost always cheaper than resizing a whole ducted system to compensate for it.",
        },
        {
          heading: "Whole-home ducted cooling",
          intro:
            "Replacing an ageing central system, or zoning one that cools the house unevenly.",
          bullets: [
            { label: "3 – 4 ton zoned ducted system", body: "approximately $13,800 – $18,600 supplied and installed" },
            { label: "Includes", body: "zoning to up to eight areas so bedrooms and living spaces run independently" },
            { label: "What drives the price", body: "capacity, duct condition, zone count and whether the air handler location needs work" },
          ],
          closing:
            "Where the ductwork also needs replacing, budget another $4,000 to $9,000. We measure static pressure before quoting so this is never discovered halfway through.",
        },
        {
          heading: "Homes without ductwork",
          intro:
            "Older houses, extensions and conversions where there is nothing to duct into.",
          bullets: [
            { label: "Multi-head system, 3 to 4 rooms", body: "approximately $9,400 – $13,900 installed" },
            { label: "Per-room control", body: "each head runs on its own thermostat, so unused rooms cost nothing to leave off" },
            { label: "Versus installing ducts", body: "usually less than half the cost of retrofitting a duct system into a finished house" },
          ],
          closing:
            "For most houses without existing ducts, multi-head is not a compromise — it is the better answer on both cost and control.",
        },
      ],
      tables: [
        {
          heading: "Format comparison at a glance",
          intro:
            "The same decision laid out four ways. Which one fits is decided by the room, not by the budget.",
          columns: ["Format", "Covers", "Ductwork", "Per-room control", "Relative cost"],
          rows: [
            ["Wall split", "One room", "None", "Per unit", "Lowest"],
            ["Multi-head split", "3 – 5 rooms", "None", "Per head", "Medium"],
            ["Ceiling cassette", "One large room", "None", "Per unit", "Medium-high"],
            ["Ducted, zoned", "Whole home", "Required", "Per zone", "Highest"],
          ],
          note:
            "Running cost per conditioned square foot is broadly similar across all four at the same SEER2. What differs is install cost, control granularity and how visible the equipment is.",
        },
      ],
      series: {
        heading: "The system families we install",
        intro:
          "Four configurations cover everything from a single hot bedroom to a fully zoned house.",
        items: [
          {
            heading: "Wall-mounted split",
            body: "One outdoor condenser, one indoor head, a three-inch wall penetration and a day of work. Inverter-driven down to 19 dB at low fan, which is quieter than the room it is cooling. The cheapest fix for a single problem room.",
          },
          {
            heading: "Multi-head split",
            body: "One outdoor unit feeding three to five indoor heads, each independently controlled. No ductwork at all, which makes it the practical whole-home answer in older houses and conversions where retrofitting ducts would cost more than the equipment.",
          },
          {
            heading: "Ceiling cassette",
            body: "A recessed four-way unit that throws air 360 degrees from the centre of the ceiling. Far better distribution than a wall head in a large square room, and almost invisible once fitted. Needs about 300 mm of ceiling void.",
          },
          {
            heading: "Ducted, zoned",
            body: "A variable-speed condenser and ducted air handler on your existing ducts, split into up to eight zones. One thermostat per zone means bedrooms cool at night and living areas during the day, without conditioning the whole house for one room.",
          },
        ],
        note:
          "Every system is AHRI-matched and Energy Star certified, and every one is reverse cycle — so the same equipment covers our short winters at around a third of the running cost of resistance heat.",
      },
      pros: {
        heading: "What we like",
        items: [
          "Inverter compressors that hold temperature instead of cycling on and off",
          "Reverse cycle throughout — one system covers cooling and winter heating",
          "Genuinely quiet: 19 dB at low fan is below most background noise",
          "Zoning means you stop paying to cool rooms nobody is in",
          "Low-GWP refrigerant, so the system is not obsolete at the next phase-down",
        ],
      },
      cons: {
        heading: "Worth knowing before you sign",
        items: [
          "An oversized system cools fast and dehumidifies nothing — bigger is genuinely worse",
          "Ducted efficiency is capped by the ductwork, whatever the equipment is rated at",
          "Wall heads are visible; a cassette costs more but disappears into the ceiling",
          "Multi-head systems share one condenser, so all heads are down if it fails",
          "Outdoor unit placement matters — under a bedroom window is a decision you live with",
        ],
      },
      why: {
        heading: "Why these systems suit Central Texas",
        intro:
          "Long, humid cooling seasons and a short mild winter. That combination rewards very different equipment than a northern climate does.",
        points: [
          {
            heading: "Sized for humidity, not just heat",
            body: "Removing moisture takes runtime, and runtime is what an oversized system never gets. Variable-speed equipment sized off a real load calculation runs long and low, which is what makes a house feel comfortable at a higher setpoint.",
          },
          {
            heading: "Reverse cycle covers our winter",
            body: "There is no case for a separate heating system here. Every unit we install heats down to at least 5°F at three to four times the efficiency of resistance heat, which covers our coldest nights comfortably.",
          },
          {
            heading: "The best partner for a solar array",
            body: "Cooling load peaks in the afternoon, exactly when the roof is producing hardest. Pre-cooling on solar hours shifts your single largest load off the grid without any loss of comfort.",
          },
          {
            heading: "Ductwork measured before we quote",
            body: "Static pressure and duct condition are checked first. A high-efficiency system behind undersized returns is money wasted, and we would rather tell you before you spend it.",
          },
          {
            heading: "One crew, one accountability",
            body: "Load calculation, refrigerant, electrical, condensate and commissioning all sit with the same licensed team. No coordination between an HVAC firm and an electrician who blame each other.",
          },
        ],
      },
      choose: {
        heading: "Choosing the right system",
        intro:
          "Four situations, and what we would actually fit in each.",
        points: [
          {
            heading: "One room is always too hot",
            body: "A wall split. Cheapest fix by a wide margin, one day of work, and it solves the problem permanently rather than compensating for it elsewhere.",
          },
          {
            heading: "Ducts exist and are in decent shape",
            body: "Zoned ducted. One system for the whole house, per-zone schedules, and nothing visible in any room. The most comfortable result if the ductwork supports it.",
          },
          {
            heading: "No ductwork, and retrofitting it is expensive",
            body: "Multi-head split. Three to five heads on one condenser costs well under half of retrofitting ducts into a finished house, and gives better per-room control.",
          },
          {
            heading: "A large open-plan room",
            body: "Ceiling cassette. Four-way throw distributes evenly across a big square space where a wall head would blast one end and leave the other warm.",
          },
        ],
      },
      factors: {
        heading: "What to weigh before you choose",
        intro: "Seven questions, worked through on the load calculation visit.",
        items: [
          { label: "Actual cooling load", body: "Calculated from the envelope, glazing and orientation — not inferred from the old unit's capacity." },
          { label: "Duct condition", body: "Static pressure and leakage, measured before quoting, because it caps whatever you fit behind it." },
          { label: "Humidity control", body: "Part-load behaviour, which matters more here than peak capacity does." },
          { label: "Zoning needs", body: "Whether rooms have genuinely different loads and schedules worth controlling separately." },
          { label: "Electrical capacity", body: "Spare breaker space and service headroom for the dedicated circuit." },
          { label: "Outdoor unit placement", body: "Distance to bedrooms and neighbours, shade, and line-set run length." },
          { label: "Solar on the roof", body: "An existing or planned array changes the scheduling and improves the running economics considerably." },
        ],
      },
      reviews: {
        heading: "What owners tell us afterwards",
        intro:
          "Feedback from the systems we have commissioned, in the words it usually arrives in.",
        items: [
          { label: "The house feels dryer", body: "The most common report is not temperature but humidity. A system that runs long and low pulls moisture out in a way a short-cycling one never did." },
          { label: "You cannot hear it", body: "Owners replacing an older unit consistently mention noise first — a modulating compressor at low output is close to silent." },
          { label: "Zoning changed the bill", body: "Households who added zoning report the biggest saving, simply from no longer cooling bedrooms all afternoon." },
          { label: "The split fixed it for good", body: "People who spent years fighting one hot room with fans and portable units are the most enthusiastic customers we have." },
        ],
        closing:
          "The complaints we hear are almost always about outdoor unit placement on systems somebody else installed — a condenser under a bedroom window is a decision that cannot be undone cheaply.",
      },
      tips: {
        heading: "Installation and maintenance",
        intro:
          "Five things that decide whether a system delivers its rated efficiency for fifteen years.",
        items: [
          "Insist on a Manual J load calculation. Sizing off the old unit's badge repeats whatever mistake was made last time.",
          "Think hard about where the outdoor unit goes. Shade helps efficiency, and distance from bedroom windows helps everything else.",
          "Clean or replace filters on schedule. Restricted airflow is the single most common cause of poor performance and early compressor failure.",
          "Hose the outdoor coil twice a year and keep 24 inches clear all round. Grass clippings and cottonwood are the usual culprits.",
          "Set a schedule rather than chasing the thermostat. Inverter systems are most efficient holding a steady setpoint, not recovering from a deep setback.",
        ],
      },
      faqs: [
        {
          question: "Split system or ducted — which should I get?",
          answer:
            "If you have ductwork in decent condition, ducted with zoning gives the most comfortable result and nothing visible in the rooms. If you do not, a multi-head split system costs well under half what retrofitting ducts into a finished house does, and gives better per-room control into the bargain.",
        },
        {
          question: "Why does sizing matter so much?",
          answer:
            "An oversized system reaches the setpoint quickly and shuts off before it has removed any humidity, so the house ends up cold and clammy, and the compressor short-cycles itself into an early failure. A correctly sized inverter system runs longer at lower output, which is both more comfortable and cheaper to run.",
        },
        {
          question: "Does air conditioning heat as well?",
          answer:
            "Everything we install is reverse cycle, so yes. It heats down to at least 5°F — and to -4°F on the splits and cassettes — at three to four times the efficiency of resistance heating. In this climate there is no case for a separate heating system.",
        },
        {
          question: "How much does it cost to run?",
          answer:
            "For a correctly sized inverter system in an average home here, roughly $900 to $1,400 a year for cooling. An older 13 SEER unit doing the same job costs closer to $1,700 to $2,200. If there is a solar array on the roof, most of the daytime cooling comes off the panels and the figure drops again.",
        },
        {
          question: "Can I keep my existing ductwork?",
          answer:
            "Often yes, but we measure before we promise. Static pressure above specification caps the efficiency of whatever equipment sits behind it. If the ducts need work we tell you before you buy, not after the system is commissioned and underperforming.",
        },
        {
          question: "How noisy is it?",
          answer:
            "The wall split runs at 19 dB indoors on low fan, which is below most background noise in a bedroom. Outdoor units are audible under full load but not intrusive — placement matters more than the specification, which is why we look at it before quoting.",
        },
      ],
      verdict: {
        heading: "So, which system should you buy?",
        body: [
          "If the problem is one room, buy a wall split and stop there. It is the cheapest fix available, it takes a day, and resizing a whole ducted system to compensate for one hot bedroom costs several times as much and works less well.",
          "If the problem is the whole house and your ducts are sound, zoned ducted is the right answer. Nothing visible in any room, per-zone schedules, and the most even result of anything in the range.",
          "If the whole house needs cooling and there are no ducts, do not retrofit them. A three or four head multi-split costs less than half as much, gives you better per-room control, and goes in without opening a single ceiling.",
        ],
        pullQuote:
          "One hot room? Wall split. Whole house with good ducts? Zoned ducted. Whole house without ducts? Multi-head — and do not let anyone sell you the ductwork.",
      },
    },
  },
};

export function getCategoryGuide(slug: string): CategoryGuide | undefined {
  return categoryGuides[slug];
}
