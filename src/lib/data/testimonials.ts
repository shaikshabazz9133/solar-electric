export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  service: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They found a scorched neutral in our panel that two other electricians had missed. The report was photographed, priced and fixed inside a week. I have never had a trade explain their work that clearly.",
    name: "Marisol Vega",
    role: "Homeowner",
    location: "Austin, TX",
    rating: 5,
    service: "Safety Inspection",
    initials: "MV",
  },
  {
    quote:
      "The production estimate they modelled was 29,100 kWh. We finished our first year at 29,380. Nobody in this industry gets that close, and nobody else offered to put it in writing.",
    name: "Daniel Okafor",
    role: "Homeowner",
    location: "Dripping Springs, TX",
    rating: 5,
    service: "Solar + Storage",
    initials: "DO",
  },
  {
    quote:
      "412 fixtures across a live distribution centre, all on night shift, and we did not lose a single hour of operation. The rebate paperwork alone paid for their project management.",
    name: "Karen Whitfield",
    role: "Facilities Director",
    location: "Round Rock, TX",
    rating: 5,
    service: "Commercial Retrofit",
    initials: "KW",
  },
  {
    quote:
      "During the February storm our neighbours were dark for 31 hours. We never noticed — the battery carried us and the app told me exactly how much runtime was left the whole time.",
    name: "Priya Raghunathan",
    role: "Homeowner",
    location: "Cedar Park, TX",
    rating: 5,
    service: "Battery Storage",
    initials: "PR",
  },
  {
    quote:
      "Quoted Tuesday, installed Thursday, and the conduit run is so neatly painted into the garage trim that guests do not notice it. Genuinely premium work for a very fair price.",
    name: "Tom Brennan",
    role: "Homeowner",
    location: "Georgetown, TX",
    rating: 5,
    service: "EV Charger",
    initials: "TB",
  },
  {
    quote:
      "We tendered the fit-out to five contractors. NorthStar was not the cheapest, but they were the only ones who flagged a distribution clash in the drawings before we broke ground. That saved us five figures.",
    name: "Alicia Moreno",
    role: "Development Manager",
    location: "Austin, TX",
    rating: 5,
    service: "Commercial Fit-Out",
    initials: "AM",
  },
];

export const stats = [
  { value: 18, suffix: "+", label: "Years in business", icon: "award" },
  { value: 4100, suffix: "+", label: "Projects completed", icon: "hardhat" },
  { value: 38, suffix: " MW", label: "Solar installed", icon: "sun" },
  { value: 4.9, suffix: "/5", label: "Average rating", icon: "sparkles", decimals: 1 },
];

export const trustBadges = [
  { label: "Licensed & Bonded", detail: "TECL #31102", icon: "badge" },
  { label: "NABCEP Certified", detail: "PV Installation Pro", icon: "sun" },
  { label: "$5M Insured", detail: "General liability", icon: "shield" },
  { label: "25-Year Warranty", detail: "On workmanship", icon: "handshake" },
  { label: "24/7 Emergency", detail: "Under 2 hr response", icon: "headset" },
  { label: "Fixed-Price Quotes", detail: "No change-order games", icon: "receipt" },
];
