import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Tilt";
import { Icon } from "@/lib/icons";

type Pillar = {
  icon: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
  /** Card wash. Same tint set as the process steps, so the two sections
      read as one family: pale fill, deeper hairline, ink for the icon. */
  tint: string;
  line: string;
  ink: string;
};

/**
 * Split into two columns that flank the centre portrait: `left` runs down the
 * left of the image, `right` down the right. Order within each array is the
 * order on screen, and on narrow screens the whole thing stacks — portrait
 * first, then left, then right.
 */
const left: Pillar[] = [
  {
    icon: "ruler",
    title: "Engineered before a single screw turns",
    body: "Twelve months of your real interval data, a shade study and a load calculation come before the quote — which is why our production forecasts land within 2% of reality.",
    tint: "#f2f6fd",
    line: "#dbe7f9",
    ink: "#27548f",
  },
  {
    icon: "handshake",
    title: "One team. One warranty.",
    body: "Electrical and solar under one licence means nobody points at anybody else when something needs attention. You call us; we fix it.",
    tint: "#f2f2fc",
    line: "#e0e0f6",
    ink: "#4a4aa3",
  },
  {
    icon: "hardhat",
    title: "Built by electricians, not resellers",
    body: "We spent a decade being called out to repair badly installed arrays before we started doing it ourselves. That history is why our solar crews think like electricians.",
    href: "/about",
    // cta: "Read our story",
    tint: "#fbf5ec",
    line: "#f1e4d1",
    ink: "#8a5c17",
  },
];

const right: Pillar[] = [
  {
    icon: "receipt",
    title: "The price on page one is the price you pay",
    body: "Permits, inspections, materials and labour are all inside the quoted number. Average change orders per project last year: 1.4.",
    tint: "#edf6f6",
    line: "#d5e9e9",
    ink: "#136b68",
  },
  {
    icon: "headset",
    title: "Answered by a human, day or night",
    body: "Our emergency line is staffed 24/7 by dispatchers with a licensed electrician on call — not an answering service taking a message.",
    tint: "#fdf3f5",
    line: "#f6dde3",
    ink: "#a32c44",
  },
  {
    icon: "sparkles",
    title: "Not sure where to start?",
    body: "Book a 20-minute call. We'll tell you what your home actually needs — including when the answer is “nothing yet”.",
    href: "/contact",
    cta: "Book a consultation",
    tint: "#f0f7f0",
    line: "#dbebdb",
    ink: "#3a7442",
  },
];

export function WhyUs() {
  return (
    <section className="section-y bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Eagle"
          title={
            <>
              The difference is what happens{" "}
              <span className="text-gradient-brand">before</span> we quote
            </>
          }
          description="Anyone can hang panels or pull wire. The value is in the engineering, the documentation and the answer you get eighteen months later when you call."
        />

        {/* `auto` centre column: the portrait sets its own width and the two
            card columns share whatever is left, so they stay equal to each
            other however wide the viewport gets. */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-8 xl:gap-10">
          <div className="flex flex-col gap-5">
            {left.map((pillar, index) => (
              <Reveal key={pillar.title} delay={0.08 * index}>
                <PillarCard {...pillar} />
              </Reveal>
            ))}
          </div>

          {/* Portrait sits first on narrow screens, centre column from `lg`,
              where it stretches to the full height of the card columns beside
              it rather than leaving a gap under a fixed-ratio crop. */}
          <Reveal
            delay={0.12}
            className="order-first lg:order-none lg:h-full"
          >
            <div className="relative mx-auto h-full w-full max-w-sm overflow-hidden rounded-4xl shadow-[0_30px_60px_-28px_rgba(24,48,94,0.45)] ring-1 ring-ink-100 lg:w-[19rem] lg:max-w-none xl:w-[22rem]">
              <div className="relative aspect-4/5 w-full lg:aspect-auto lg:h-full">
                <Image
                  src="/images/hero/solar-crew.jpg"
                  alt="An Eagle crew setting a rooftop solar array"
                  fill
                  sizes="(max-width: 1024px) 24rem, 22rem"
                  /* The crew is on the left of the frame — a centred crop at
                     this height would cut them out of it. */
                  className="object-cover object-[28%_50%]"
                />
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            {right.map((pillar, index) => (
              <Reveal key={pillar.title} delay={0.08 * index}>
                <PillarCard {...pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function PillarCard({ icon, title, body, href, cta, tint, line, ink }: Pillar) {
  return (
    <Spotlight className="h-full">
      <article
        style={
          {
            "--tint": tint,
            "--line": line,
            "--ink": ink,
            "--spot-color": "color-mix(in oklab, var(--ink) 14%, transparent)",
          } as CSSProperties
        }
        className="spotlight-surface group relative isolate h-full overflow-hidden rounded-3xl border border-[color:var(--line)] bg-linear-to-b from-white to-[color:var(--tint)] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
      >
        {/* Icon beside the heading rather than above it — keeps each card short
            enough that three of them read as one column next to the portrait. */}
        <div className="relative flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-[color:var(--ink)] ring-1 ring-[color:var(--line)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[color:var(--ink)] group-hover:text-white">
            <Icon name={icon} aria-hidden className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink-950">
              {title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
              {body}
            </p>
            {href && cta ? (
              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink)] transition-opacity hover:opacity-75"
              >
                {cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </Spotlight>
  );
}
