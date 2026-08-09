import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { CtaBand } from "@/components/sections/CtaBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/lib/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "NorthStar Electric & Solar has been wiring and powering Central Texas since 2008. Master electricians, NABCEP-certified installers, 46 staff and a 25-year workmanship warranty.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "clipboard",
    title: "Document everything",
    body: "Photos of every termination, torque records, panel schedules and as-builts. If we did it, there is a record of it.",
  },
  {
    icon: "handshake",
    title: "Say the inconvenient thing",
    body: "If your roof has five years left, we will tell you before you spend money on solar — even though it costs us the job.",
  },
  {
    icon: "hardhat",
    title: "Train relentlessly",
    body: "Every apprentice gets four paid training hours a week. It is why our first-time inspection pass rate sits at 99.2%.",
  },
  {
    icon: "leaf",
    title: "Build for the long run",
    body: "We size panels, conduits and services for the loads you will add in ten years, not just the ones you have today.",
  },
];

const timeline = [
  {
    year: "2008",
    title: "Two vans and a garage in East Austin",
    body: "Founded by two master electricians doing residential service calls and small commercial fit-outs.",
  },
  {
    year: "2013",
    title: "First commercial contract",
    body: "A 40,000 sq ft warehouse fit-out proved the model — do the engineering properly and the programme takes care of itself.",
  },
  {
    year: "2016",
    title: "NABCEP certification",
    body: "After years of repairing badly installed arrays, we got certified and brought solar in-house rather than subcontracting it.",
  },
  {
    year: "2021",
    title: "Storm Uri changes everything",
    body: "Four days of blackouts made backup power a necessity, not a luxury. We built a dedicated storage and standby division.",
  },
  {
    year: "2024",
    title: "1.2 MW community microgrid",
    body: "Our largest project to date kept 140 Cedar Park homes powered through the following winter without a single interruption.",
  },
  {
    year: "2026",
    title: "46 people, 38 MW installed",
    body: "Still family-owned, still answering our own emergency line, still refusing to subcontract warranty work.",
  },
];

const credentials = [
  { label: "TX Master Electrician", detail: "#MEL-38241", icon: "badge" },
  { label: "Texas Electrical Contractor", detail: "TECL #31102", icon: "shield" },
  { label: "NABCEP PV Installation Pro", detail: "Board certified", icon: "sun" },
  { label: "General Liability", detail: "$5M coverage", icon: "handshake" },
  { label: "Workers' Compensation", detail: "Full coverage", icon: "users" },
  { label: "Bonding Capacity", detail: "$2M per project", icon: "receipt" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Family-owned. Master-licensed. Still answering our own phone."
        description="We started as a two-van electrical shop in 2008. Eighteen years later we are 46 people across electrical, solar, storage and standby power — and the founders are still on the tools most weeks."
        crumbs={[{ label: "About" }]}
        stats={[
          { value: "2008", label: "Founded" },
          { value: "46", label: "People on staff" },
          { value: "99.2%", label: "Inspection pass rate" },
          { value: "98%", label: "Referral rate" },
        ]}
      />

      {/* Story */}
      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-4xl">
                <Image
                  src="/images/about-crew.svg"
                  alt="Abstract diagram of a distributed electrical network"
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow>Our story</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-display-md">
                  We got into solar because we were tired of fixing it
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-5 flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-ink-600 sm:text-base">
                  <p>
                    For most of the 2010s, our service techs spent an
                    uncomfortable share of their week on other companies&apos;
                    solar installs — unflashed penetrations, undersized
                    conductors, inverters mounted in full afternoon sun. The
                    homeowners had done nothing wrong. They had simply hired a
                    sales company that subcontracted the actual work to whoever
                    was cheapest that month.
                  </p>
                  <p>
                    So in 2016 we got NABCEP certified and started doing it
                    ourselves. Our solar crews are electricians first, which is
                    why our arrays are wired like switchboards and our
                    documentation looks like an engineering submittal.
                  </p>
                  <p>
                    That is the whole business model, really: employ the people
                    who do the work, write down what we did, and pick up the
                    phone when it needs attention in year nine.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <Button href="/projects" variant="ghost" className="mt-8">
                  See what that looks like
                  <ArrowRight aria-hidden className="size-4" />
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-y relative bg-ink-50/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-ink opacity-70" />
        <Container className="relative">
          <SectionHeading
            eyebrow="How we work"
            title="Four things we refuse to compromise on"
            description="These are not posters in the break room. They are the reasons we win work and, occasionally, the reasons we lose it."
          />

          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              return (
                <StaggerItem key={value.title} className="h-full">
                  <article className="group h-full rounded-4xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-8">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-all duration-500 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                      <Icon name={value.icon} aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {value.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Timeline */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="Milestones"
            title="Eighteen years, abbreviated"
          />

          {/* The connector rail lives outside the <ol> so the list keeps only
              <li> children. */}
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div
              aria-hidden
              className="absolute left-[3.25rem] top-2 h-[calc(100%-1rem)] w-px bg-linear-to-b from-brand-200 via-brand-200 to-transparent sm:left-[4.5rem]"
            />
            <ol>
              {timeline.map((entry, index) => (
                <li
                  key={entry.year}
                  className="relative flex pb-10 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute left-[3.25rem] top-2.5 z-10 size-3 -translate-x-1/2 rounded-full bg-brand-600 ring-4 ring-white sm:left-[4.5rem]"
                  />
                  <Reveal
                    delay={index * 0.05}
                    className="flex flex-1 gap-6 sm:gap-8"
                  >
                    <span className="w-26 shrink-0 pt-0.5 text-right font-display text-lg font-extrabold text-brand-700 sm:w-36 sm:text-xl">
                      {entry.year}
                    </span>
                    <span className="pl-4 sm:pl-6">
                      <h3 className="font-display text-lg font-bold text-ink-950">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                        {entry.body}
                      </p>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Credentials */}
      <section className="relative isolate overflow-hidden bg-brand-950 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute -left-24 top-0 size-120 rounded-full bg-brand-600/25 blur-3xl" />
        </div>

        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Credentials"
            title="Licensed, bonded, insured — and happy to prove it"
            description="Certificates are issued within one business day of request. Ask for them; a contractor who hesitates is telling you something."
          />

          <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => {
              return (
                <StaggerItem key={item.label}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/10">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-200 ring-1 ring-white/10">
                      <Icon name={item.icon} aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="block text-[0.8125rem] text-brand-200/80">
                        {item.detail}
                      </span>
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <Reveal delay={0.2}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {[
                { value: 46, suffix: "", label: "People on staff" },
                { value: 12, suffix: "", label: "Service vehicles" },
                { value: 99.2, suffix: "%", label: "Inspection pass rate", decimals: 1 },
                { value: 1.4, suffix: "", label: "Avg. change orders", decimals: 1 },
              ].map((item) => (
                <div key={item.label} className="bg-brand-950/70 px-6 py-6">
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-extrabold text-white sm:text-3xl">
                      <Counter
                        value={item.value}
                        suffix={item.suffix}
                        decimals={item.decimals ?? 0}
                      />
                    </span>
                    <span className="mt-1.5 block text-[0.8125rem] text-brand-200/80">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Service areas */}
      <section id="service-areas" className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="Coverage"
            title="Where we work"
            description="Residential and small commercial work across the Central Texas corridor. Larger commercial and industrial projects are taken statewide."
          />

          <StaggerGroup className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {siteConfig.serviceAreas.map((area) => (
              <StaggerItem key={area}>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-[0.9375rem] font-medium text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700">
                  <MapPin aria-hidden className="size-4 text-brand-600" />
                  {area}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-[0.9375rem] text-ink-500">
              Outside these areas?{" "}
              <a
                href={siteConfig.phoneHref}
                className="font-semibold text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 hover:text-brand-800"
              >
                Call us anyway
              </a>{" "}
              — we travel for the right project.
            </p>
          </Reveal>
        </Container>
      </section>

      <Testimonials />
      <CtaBand />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
    </>
  );
}
