"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const steps = [
  {
    short: "Enquiry",
    icon: "calendar",
    title: "Tell us what's wrong — or what you want",
    body: "A ten-minute call or a photo of your switchboard is usually enough for us to know what we're dealing with and what it will take.",
    detail: "Same-day response",
    image: "/images/services/residential.jpg",
  },
  {
    short: "Site visit",
    icon: "scan",
    title: "We inspect the site and your usage",
    body: "A free on-site assessment — roof, switchboard, meter and shading — read against twelve months of your actual consumption rather than an average.",
    detail: "Free assessment",
    image: "/images/services/meter-box-upgrade.jpg",
  },
  {
    short: "Design",
    icon: "ruler",
    title: "We survey, model and design",
    body: "Measurements, a load calculation and a production model feed a design you can actually interrogate — panel by panel, circuit by circuit.",
    detail: "48-hour turnaround",
    image: "/images/services/solar.jpg",
  },
  {
    short: "Fixed price",
    icon: "receipt",
    title: "You get one fixed price",
    body: "Line-by-line scope, approvals and inspections included, payment options attached. Nothing starts until you say so.",
    detail: "No obligation",
    image: "/images/hero/conduit-rough-in.jpg",
  },
  {
    short: "Approvals",
    icon: "clipboard",
    title: "We handle approvals and rebates",
    body: "Rebate paperwork, grid-connection approval and the distributor application are lodged by us. You sign; we chase.",
    detail: "Paperwork included",
    image: "/images/services/test-and-tag.jpg",
  },
  {
    short: "Install",
    icon: "hardhat",
    title: "We install and commission",
    body: "Licensed crews, daily updates, a clean site every evening, and full commissioning documentation at handover.",
    detail: "Licensed crews",
    image: "/images/hero/solar-lift.jpg",
  },
  {
    short: "Aftercare",
    icon: "linechart",
    title: "Monitoring, handover and aftercare",
    body: "We walk you through the app, set your monitoring alerts and stay on the end of the phone — not a call centre — for the life of the system.",
    detail: "10-year workmanship warranty",
    image: "/images/hero/solar-crew.jpg",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Seven steps in the height of one card. A row of nodes selects which step is
 * shown in the panel below, so the section stays a fixed height no matter how
 * many steps the process grows to — a stacked list of seven would run most of a
 * screen on its own. Every step title is still in the DOM as a tab label, so
 * nothing is hidden from search or a screen reader.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();
  const step = steps[active];
  const last = steps.length - 1;

  const go = (next: number) => setActive(Math.min(last, Math.max(0, next)));

  return (
    <section className="section-y relative isolate overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-ink absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/3 size-152 -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
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
          description="The most common complaint about our industry is not price — it is not knowing what happens next. Here is exactly what happens next."
        />

        <Reveal className="mt-14">
          {/* Node rail. Scrolls horizontally on phones rather than wrapping to
              two ragged rows; becomes an even seven-column track from `sm`. */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden h-0.5 rounded-full bg-ink-100 sm:block"
            />
            <span
              aria-hidden
              className="absolute left-0 top-7 hidden h-0.5 rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-all duration-500 ease-out sm:block"
              style={{ width: `${(active / last) * 100}%` }}
            />

            <div
              role="tablist"
              aria-label="Our seven-step process"
              className="relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-7 sm:gap-0 sm:overflow-visible sm:px-0"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") go(active + 1);
                if (event.key === "ArrowLeft") go(active - 1);
              }}
            >
              {steps.map((item, index) => {
                const isActive = index === active;
                const isDone = index < active;

                return (
                  <button
                    key={item.short}
                    type="button"
                    role="tab"
                    id={`process-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls="process-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    className="group flex shrink-0 snap-start flex-col items-center gap-2.5 rounded-2xl px-1 pt-0.5 text-center outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 sm:shrink"
                  >
                    <span
                      className={cn(
                        "relative grid size-14 shrink-0 place-items-center rounded-2xl ring-1 transition-all duration-500",
                        isActive
                          ? "-translate-y-0.5 bg-brand-600 text-white shadow-lift ring-brand-600"
                          : isDone
                            ? "bg-brand-50 text-brand-700 ring-brand-200"
                            : "bg-white text-ink-400 shadow-soft ring-ink-100 group-hover:-translate-y-0.5 group-hover:text-brand-700 group-hover:ring-brand-200",
                      )}
                    >
                      <Icon name={item.icon} aria-hidden className="size-5" />
                      <span
                        className={cn(
                          "absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full font-display text-[0.625rem] font-bold ring-2 ring-white transition-colors duration-500",
                          isActive
                            ? "bg-brand-900 text-white"
                            : "bg-ink-100 text-ink-500 group-hover:bg-brand-100 group-hover:text-brand-700",
                        )}
                      >
                        {index + 1}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-[0.75rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-500",
                        isActive
                          ? "text-brand-700"
                          : "text-ink-400 group-hover:text-ink-600",
                      )}
                    >
                      {item.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel. `min-h` holds the height steady between steps so the page
              below never jumps as you click along the rail. */}
          <div
            role="tabpanel"
            id="process-panel"
            aria-labelledby={`process-tab-${active}`}
            className="mt-8 overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-soft lg:grid lg:min-h-84 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={step.title}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <span className="font-display text-[0.75rem] font-bold uppercase tracking-widest text-brand-600">
                    Step {String(active + 1).padStart(2, "0")}
                    <span className="text-ink-300"> / {steps.length}</span>
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink-950 sm:text-[1.75rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3.5 max-w-md text-[0.9375rem] leading-relaxed text-ink-600">
                    {step.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-100">
                    <Icon name="check" aria-hidden className="size-3.5" />
                    {step.detail}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-2.5 border-t border-ink-100 pt-6">
                <NavButton
                  label="Previous step"
                  disabled={active === 0}
                  onClick={() => go(active - 1)}
                >
                  <ArrowLeft aria-hidden className="size-4" />
                </NavButton>
                <NavButton
                  label="Next step"
                  disabled={active === last}
                  onClick={() => go(active + 1)}
                >
                  <ArrowRight aria-hidden className="size-4" />
                </NavButton>
                <span className="ml-auto text-[0.8125rem] font-medium text-ink-400">
                  {steps[Math.min(active + 1, last)].short}
                  {active === last ? " — you're done" : " comes next"}
                </span>
              </div>
            </div>
            <div className="relative h-56 w-full sm:h-64 lg:h-auto">
              {/* No `mode` here: the two images overlap absolutely, so letting them
                    co-exist for a beat is what makes it a crossfade rather than a blink. */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={step.image}
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent lg:bg-linear-to-r lg:from-white/25 lg:to-transparent"
              />
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-ink-100 bg-white text-ink-700 transition-all duration-300 hover:border-brand-300 hover:bg-brand-600 hover:text-white disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
