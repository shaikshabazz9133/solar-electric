import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { CircuitField } from "@/components/ui/CircuitField";
import { Spotlight } from "@/components/ui/Tilt";
import { Icon } from "@/lib/icons";

const pillars = [
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
    icon: "receipt",
    title: "The price on page one is the price you pay",
    body: "Permits, inspections, materials and labour are all inside the quoted number. Average change orders per project last year: 1.4.",
  },
  {
    icon: "headset",
    title: "Answered by a human, day or night",
    body: "Our emergency line is staffed 24/7 by dispatchers with a licensed electrician on call — not an answering service taking a message.",
  },
];

export function WhyUs() {
  return (
    <section className="section-y bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why NorthStar"
          title={
            <>
              The difference is what happens{" "}
              <span className="text-gradient-brand">before</span> we quote
            </>
          }
          description="Anyone can hang panels or pull wire. The value is in the engineering, the documentation and the answer you get eighteen months later when you call."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Feature cell */}
          <Reveal className="h-full lg:col-span-2">
            <article className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-4xl bg-brand-950 p-8 text-white sm:p-10">
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="bg-grid-drift absolute inset-0 opacity-60" />
                <div className="animate-aurora absolute -right-16 -top-16 size-72 rounded-full bg-brand-500/30 blur-3xl" />
                <div
                  className="animate-aurora-slow absolute -bottom-20 -left-10 size-72 rounded-full bg-brand-700/40 blur-3xl"
                  style={{ animationDelay: "-8s" }}
                />
                <CircuitField className="text-brand-400/50" opacity={0.4} />
              </div>

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand-100 ring-1 ring-white/15">
                  Since 2008
                </span>
                <h3 className="mt-6 max-w-lg text-display-md text-white">
                  Built by electricians who got tired of fixing other people&apos;s
                  solar
                </h3>
                <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-brand-100/85 sm:text-base">
                  We started as a two-van electrical shop in East Austin. After a
                  decade of being called out to repair badly installed arrays, we
                  got certified and started doing it properly ourselves. That
                  history is why our solar crews think like electricians — and why
                  our documentation looks like an engineering submittal.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
                {[
                  { value: 18, suffix: "+", label: "Years trading" },
                  { value: 46, suffix: "", label: "People on staff" },
                  { value: 4100, suffix: "+", label: "Projects" },
                  { value: 98, suffix: "%", label: "Referral rate" },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-2xl font-extrabold text-white sm:text-3xl">
                        <Counter value={item.value} suffix={item.suffix} />
                      </span>
                      <span className="mt-1.5 block text-[0.75rem] font-medium uppercase tracking-[0.12em] text-brand-200/80">
                        {item.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/about"
                className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white underline decoration-brand-400 decoration-2 underline-offset-[6px] transition-colors hover:text-brand-200"
              >
                Read our story
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>
          </Reveal>

          {/* Pillars */}
          <div className="grid h-full gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {pillars.slice(0, 2).map((pillar, index) => (
              <Reveal key={pillar.title} delay={0.08 * (index + 1)} className="h-full">
                <PillarCard {...pillar} />
              </Reveal>
            ))}
          </div>

          {pillars.slice(2).map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={0.08 * (index + 1)}
              className="h-full lg:col-span-1"
            >
              <PillarCard {...pillar} />
            </Reveal>
          ))}

          <Reveal delay={0.24} className="h-full">
            <article className="flex h-full flex-col justify-between rounded-4xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-7">
              <div>
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft ring-1 ring-brand-100">
                  <Icon name="sparkles" aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                  Not sure where to start?
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                  Book a 20-minute call. We&apos;ll tell you what your home
                  actually needs — including when the answer is &ldquo;nothing
                  yet&rdquo;.
                </p>
              </div>
              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
              >
                Book a consultation
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PillarCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {

  return (
    <Spotlight className="h-full">
      <article className="spotlight-surface group relative isolate h-full overflow-hidden rounded-4xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
        <span className="relative grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
          <Icon name={icon} aria-hidden className="size-5" />
        </span>
        <h3 className="relative mt-5 font-display text-lg font-bold text-ink-950">
          {title}
        </h3>
        <p className="relative mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
          {body}
        </p>
      </article>
    </Spotlight>
  );
}
