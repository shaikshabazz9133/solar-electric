import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { ProcessArt } from "@/components/sections/ProcessArt";
import { siteConfig } from "@/lib/site";

const steps = [
  {
    short: "Enquiry",
    title: "Tell us what you need",
    body: "A ten-minute call or a photo of your switchboard is usually enough for us to know what we're dealing with.",
    detail: "Same-day response",
    art: "enquiry",
    tint: "#f2f6fd",
    line: "#dbe7f9",
    ink: "#27548f",
  },
  {
    short: "Site visit",
    title: "We inspect the site",
    body: "A free assessment of roof, switchboard, meter and shading — read against twelve months of your actual usage.",
    detail: "Free assessment",
    art: "site-visit",
    tint: "#edf6f6",
    line: "#d5e9e9",
    ink: "#136b68",
  },
  {
    short: "Design",
    title: "We survey and design",
    body: "A load calculation and production model feed a design you can interrogate — panel by panel, circuit by circuit.",
    detail: "48-hour turnaround",
    art: "design",
    tint: "#f2f2fc",
    line: "#e0e0f6",
    ink: "#4a4aa3",
  },
  {
    short: "Fixed price",
    title: "You get one fixed price",
    body: "Line-by-line scope, approvals and inspections included, payment options attached. Nothing starts until you say so.",
    detail: "No obligation",
    art: "fixed-price",
    tint: "#fdf3f5",
    line: "#f6dde3",
    ink: "#a32c44",
  },
  {
    short: "Approvals",
    title: "We handle the paperwork",
    body: "Rebate claims, grid-connection approval and the distributor application are lodged by us. You sign; we chase.",
    detail: "Rebates claimed",
    art: "approvals",
    tint: "#fbf5ec",
    line: "#f1e4d1",
    ink: "#8a5c17",
  },
  {
    short: "Install",
    title: "We install and commission",
    body: "Licensed crews, daily updates, a clean site every evening, and full commissioning documents at handover.",
    detail: "Licensed crews",
    art: "install",
    tint: "#f0f7f0",
    line: "#dbebdb",
    ink: "#3a7442",
  },
  {
    short: "Aftercare",
    title: "Monitoring and aftercare",
    body: "We set up your monitoring, walk you through the app, and stay on the end of the phone — not a call centre.",
    detail: "10-year warranty",
    art: "aftercare",
    tint: "#f8f2fa",
    line: "#ece0f1",
    ink: "#75458c",
  },
];

/**
 * All seven steps on screen at once. An earlier version put them behind a tab
 * rail, which kept the block short but hid six sevenths of the answer to the
 * one question the section exists to answer.
 *
 * Four across on desktop, so the seven steps plus the call to action fill two
 * complete rows — no ragged tail — joined by a dashed rule that runs through
 * the medallions the way a wiring diagram runs between terminals.
 *
 * Each card carries its own tint so the seven read as seven distinct stages
 * rather than one repeated block. The tints are deliberately pale, and the
 * saturated elements — navy medallion, flag-red numeral — are identical on
 * every card, which is what keeps the row from turning into a rainbow.
 */
export function Process() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-linear-to-b from-white via-brand-50/50 to-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-ink absolute inset-0 opacity-70" />
        <div className="absolute -left-32 top-32 size-120 rounded-full bg-brand-200/35 blur-3xl" />
        <div className="absolute -right-24 bottom-24 size-120 rounded-full bg-flag-100/40 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Seven steps. No mystery,{" "}
              <span className="text-gradient-brand">no moving numbers</span>
            </>
          }
          description="The most common complaint about our industry is not price — it is not knowing what happens next. Here is exactly what happens next, start to finish."
        />

        <StaggerGroup
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.07}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.short} lift className="relative h-full">
              {/* Dashed run into the gap on the right, level with the
                  medallions. Four-column layout only, never off a row end. */}
              {index % 4 !== 3 ? (
                <span
                  aria-hidden
                  className="absolute -right-5 top-[6.5rem] hidden w-5 border-t-2 border-dashed border-brand-300 xl:block"
                />
              ) : null}

              <article
                style={
                  {
                    "--tint": step.tint,
                    "--line": step.line,
                    "--ink": step.ink,
                  } as CSSProperties
                }
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-[color:var(--line)] bg-linear-to-b from-white to-[color:var(--tint)] p-7 text-center shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                {/* Brand rule that draws itself across the top on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-[color:var(--ink)] to-[color:var(--line)] transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="relative isolate">
                  {/* Soft halo — gives the medallion something to sit in, so
                      the circle reads as raised rather than pasted on. */}
                  <span
                    aria-hidden
                    className="absolute -inset-4 -z-10 rounded-full bg-[color:var(--line)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* Tinted disc with the scene inside — the reference's
                      illustration-in-a-circle, drawn in our own palette. */}
                  <span className="relative block size-32 overflow-hidden rounded-full bg-[color:var(--line)] shadow-[0_18px_34px_-18px_rgba(24,48,94,0.65)] ring-8 ring-white transition-transform duration-500 group-hover:-translate-y-1">
                    <ProcessArt name={step.art} className="size-full" />
                  </span>
                  <span className="absolute -left-1 top-1 grid size-9 place-items-center rounded-full bg-flag-700 font-display text-[0.875rem] font-bold text-white shadow-[0_8px_18px_-8px_rgba(163,44,68,0.9)] ring-4 ring-white">
                    {index + 1}
                  </span>
                </div>

                <span className="mt-6 font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-[color:var(--ink)]">
                  {step.short}
                </span>

                <h3 className="mt-2 font-display text-[1.125rem] font-bold leading-snug tracking-tight text-ink-950">
                  {step.title}
                </h3>

                <p className="mt-2.5 mb-6 text-[0.875rem] leading-relaxed text-ink-600">
                  {step.body}
                </p>

                {/* `mt-auto` pins the promise to the bottom so the chips line
                    up across a row of unequal copy. */}
                <span className="mt-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[color:var(--ink)] ring-1 ring-[color:var(--line)]">
                  <Icon name="check" aria-hidden className="size-3.5" />
                  {step.detail}
                </span>
              </article>
            </StaggerItem>
          ))}

          {/* Eighth cell: the step that comes before step one. */}
          <StaggerItem lift className="h-full">
            <div className="relative isolate flex h-full min-h-72 flex-col items-center justify-center overflow-hidden rounded-3xl p-7 text-center">
              <Image
                src="/images/hero/solar-crew.jpg"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="-z-10 object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-b from-brand-900/80 via-brand-950/90 to-brand-950"
              />

              <span className="grid size-14 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm">
                <Icon name="zap" aria-hidden className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold leading-tight tracking-tight text-white">
                Start at step one
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-brand-100/85">
                No obligation, no pressure — just a straight answer on what your
                job takes.
              </p>
              <Button href="/contact" size="sm" className="mt-5">
                Get a free quote
                <ArrowRight aria-hidden className="size-4" />
              </Button>
              <a
                href={siteConfig.phoneHref}
                className="mt-3 text-[0.8125rem] font-semibold text-white/75 transition-colors hover:text-white"
              >
                or call {siteConfig.phone}
              </a>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.1}>
          <p className="mt-9 text-center text-[0.9375rem] text-ink-500">
            Typical residential solar runs{" "}
            <strong className="font-semibold text-ink-800">
              two to four weeks
            </strong>{" "}
            from enquiry to switch-on — every step above included, at the price
            quoted in step four.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
