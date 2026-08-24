import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { CircuitField } from "@/components/ui/CircuitField";
import { Spotlight } from "@/components/ui/Tilt";
import { Icon } from "@/lib/icons";

type Pillar = {
  icon: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
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
  },
  {
    icon: "handshake",
    title: "One team. One warranty.",
    body: "Electrical and solar under one licence means nobody points at anybody else when something needs attention. You call us; we fix it.",
  },
  {
    icon: "hardhat",
    title: "Built by electricians, not resellers",
    body: "We spent a decade being called out to repair badly installed arrays before we started doing it ourselves. That history is why our solar crews think like electricians.",
    href: "/about",
    // cta: "Read our story",
  },
];

const right: Pillar[] = [
  {
    icon: "receipt",
    title: "The price on page one is the price you pay",
    body: "Permits, inspections, materials and labour are all inside the quoted number. Average change orders per project last year: 1.4.",
  },
  {
    icon: "headset",
    title: "Answered by a human, day or night",
    body: "Our emergency line is staffed 24/7 by dispatchers with a licensed electrician on call — not an answering service taking a message.",
  },
  {
    icon: "sparkles",
    title: "Not sure where to start?",
    body: "Book a 20-minute call. We'll tell you what your home actually needs — including when the answer is “nothing yet”.",
    href: "/contact",
    cta: "Book a consultation",
  },
];

const stats = [
  { value: 18, suffix: "+", label: "Years trading" },
  { value: 46, suffix: "", label: "People on staff" },
  { value: 4100, suffix: "+", label: "Projects" },
  { value: 98, suffix: "%", label: "Referral rate" },
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
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div className="flex flex-col gap-5">
            {left.map((pillar, index) => (
              <Reveal key={pillar.title} delay={0.08 * index}>
                <PillarCard {...pillar} />
              </Reveal>
            ))}
          </div>

          {/* Portrait sits first on narrow screens, centre column from `lg` */}
          <Reveal delay={0.12} className="order-first lg:order-none">
            <div className="relative isolate mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-4xl bg-brand-950 text-white lg:w-[19rem] lg:max-w-none xl:w-[22rem]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/hero/solar-crew.jpg"
                  alt="An Eagle crew setting a rooftop solar array"
                  fill
                  sizes="(max-width: 1024px) 24rem, 22rem"
                  className="object-cover"
                />
                {/* Blends the photo into the stats panel below instead of
                    cutting it off on a hard edge */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/10 via-45% to-transparent"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand-100 ring-1 ring-white/20 backdrop-blur-sm">
                  Since 2008
                </span>
              </div>

              <div className="relative isolate px-6 pb-7 pt-1">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                  <div className="bg-grid-drift absolute inset-0 opacity-50" />
                  <div className="animate-aurora-slow absolute -bottom-16 -left-10 size-56 rounded-full bg-brand-700/40 blur-3xl" />
                  <CircuitField className="text-brand-400/50" opacity={0.35} />
                </div>

                <dl className="grid grid-cols-2 gap-x-5 gap-y-6">
                  {stats.map((item) => (
                    <div key={item.label}>
                      <dt className="sr-only">{item.label}</dt>
                      <dd>
                        <span className="block font-display text-2xl font-extrabold text-white">
                          <Counter value={item.value} suffix={item.suffix} />
                        </span>
                        <span className="mt-1.5 block text-[0.75rem] font-medium uppercase tracking-[0.12em] text-brand-200/80">
                          {item.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
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

function PillarCard({ icon, title, body, href, cta }: Pillar) {
  return (
    <Spotlight className="h-full">
      <article className="spotlight-surface group relative isolate h-full overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
        {/* Icon beside the heading rather than above it — keeps each card short
            enough that three of them read as one column next to the portrait. */}
        <div className="relative flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
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
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
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
