export type FaqGroup = {
  id: string;
  title: string;
  icon: string;
  items: { question: string; answer: string }[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    icon: "calendar",
    items: [
      {
        question: "How quickly can you get to my property?",
        answer:
          "Standard service calls are usually booked for the next business day. Genuine emergencies — no power, burning smell, exposed conductors — are dispatched 24/7, and we reach most Central Texas addresses within two hours.",
      },
      {
        question: "Is the quote really free?",
        answer:
          "Yes. Solar, storage, EV charging and panel upgrade quotes are free and include a full design, production model and payback analysis. Diagnostic service calls carry a $189 fee, which is credited against the repair if you proceed.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "Austin and the surrounding Central Texas corridor — Round Rock, Cedar Park, Georgetown, Pflugerville, Leander, Kyle, Buda, San Marcos and Lakeway. Commercial projects are taken statewide.",
      },
      {
        question: "Do you work with builders and architects?",
        answer:
          "Regularly. We provide design-assist input during documentation, value-engineering options, and fixed-price electrical packages for new builds and major renovations.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & quotes",
    icon: "receipt",
    items: [
      {
        question: "Are your prices fixed?",
        answer:
          "Every quote is a fixed price against a written scope. The only time the price changes is if you ask for something different or we uncover a genuinely concealed condition — and in that case you approve the variation in writing before we proceed.",
      },
      {
        question: "Why are you not the cheapest quote I received?",
        answer:
          "Our quotes include permits, inspections, materials to spec, licensed labour and a 25-year workmanship warranty. Cheaper quotes usually exclude one of those. We are happy to walk you through a line-by-line comparison with any competing bid.",
      },
      {
        question: "How do you handle change orders?",
        answer:
          "Nothing is billed that you have not approved. Variations are priced, documented and signed before work continues — which is why the average project we deliver has fewer than three.",
      },
    ],
  },
  {
    id: "financing",
    title: "Financing & incentives",
    icon: "piggybank",
    items: [
      {
        question: "Do you offer financing?",
        answer:
          "Yes — terms from 5 to 25 years through three lending partners, including a 12-month deferred-payment option that lets your tax credit land before repayments begin. Approval typically takes under ten minutes.",
      },
      {
        question: "How does the federal solar tax credit work?",
        answer:
          "The residential clean energy credit currently returns 30% of the total installed cost of solar and qualifying storage as a credit against your federal tax liability. We provide the itemised documentation your accountant needs; we are electricians, not tax advisers, so confirm your own eligibility with them.",
      },
      {
        question: "Are there local rebates as well?",
        answer:
          "Austin Energy, Bluebonnet and several co-ops run solar, storage and EV charging rebate programs that change annually. We track current programs and file the applications on your behalf as part of the project.",
      },
    ],
  },
  {
    id: "workmanship",
    title: "Workmanship & warranty",
    icon: "shield",
    items: [
      {
        question: "What does the 25-year workmanship warranty cover?",
        answer:
          "Anything we installed that fails because of how we installed it — terminations, mounting, penetrations, conduit and commissioning. Equipment itself is covered by the manufacturer warranty, and we administer those claims for you rather than handing you a phone number.",
      },
      {
        question: "Will solar void my roof warranty?",
        answer:
          "No. Our installers are licensed roofers, every penetration is flashed and sealed to manufacturer specification, and we warrant the penetrations for 25 years independently of your roofing warranty.",
      },
      {
        question: "Who do I call if something goes wrong?",
        answer:
          "Us — one number, whatever the issue. We do not subcontract our service work, and warranty calls are triaged the same day.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical questions",
    icon: "cpu",
    items: [
      {
        question: "Will my solar work during a blackout?",
        answer:
          "Only if it is paired with storage. Grid-tied solar without a battery shuts down during an outage for utility-worker safety. A battery and backup gateway lets your array keep running and recharge the battery each day.",
      },
      {
        question: "How much roof space do I need?",
        answer:
          "Roughly 18 square feet per panel. A typical 8 kW system is around 18 panels, so about 330 square feet of unshaded roof — usually one to two roof planes.",
      },
      {
        question: "Can you install equipment I bought myself?",
        answer:
          "Yes, at our standard labour rate. Our workmanship warranty still applies; the equipment warranty stays between you and your supplier.",
      },
      {
        question: "How much maintenance does solar need?",
        answer:
          "Very little. Central Texas rain handles most cleaning, and monitoring alerts us if a panel underperforms. We recommend a professional inspection every five years, included free for the first decade on systems we install.",
      },
    ],
  },
];

/** Flattened list used for FAQPage structured data and the homepage preview. */
export const allFaqs = faqGroups.flatMap((group) => group.items);

export const homeFaqs = [
  faqGroups[0].items[0],
  faqGroups[1].items[0],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[4].items[0],
  faqGroups[4].items[1],
];
