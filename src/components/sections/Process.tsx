import { Container, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { DrawLine } from "@/components/ui/Parallax";
import { Icon } from "@/lib/icons";

const steps = [
  {
    icon: "calendar",
    title: "Tell us what's wrong — or what you want",
    body: "A ten-minute call or a photo of your panel is usually enough for us to know what we're dealing with and what it will take.",
    detail: "Same-day response",
  },
  {
    icon: "ruler",
    title: "We survey, model and design",
    body: "On-site measurements, a load calculation and — for solar — twelve months of your interval data feed a design you can actually interrogate.",
    detail: "48-hour turnaround",
  },
  {
    icon: "receipt",
    title: "You get one fixed price",
    body: "Line-by-line scope, permits and inspections included, financing options attached. Nothing starts until you say so.",
    detail: "No obligation",
  },
  {
    icon: "hardhat",
    title: "We install and commission",
    body: "Licensed crews, daily updates, a clean site every evening, and full commissioning documentation at handover.",
    detail: "25-year warranty",
  },
];

export function Process() {
  return (
    <section className="section-y relative overflow-hidden bg-white">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Four steps. No mystery,{" "}
              <span className="text-gradient-brand">no moving numbers</span>
            </>
          }
          description="The most common complaint about our industry is not price — it is not knowing what happens next. Here is exactly what happens next."
        />

        <StaggerGroup className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.12}>
          {/* Connector rail — draws itself along the steps as they arrive */}
          <DrawLine
            orientation="both"
            duration={1.4}
            className="pointer-events-none absolute left-7 top-4 hidden h-[calc(100%-2rem)] w-px bg-linear-to-b from-brand-200 via-brand-200 to-transparent md:block lg:left-0 lg:top-7 lg:h-px lg:w-full lg:bg-linear-to-r"
          />

          {steps.map((step, index) => {
            return (
              <StaggerItem key={step.title} className="group relative" lift>
                <div className="relative flex gap-5 lg:block">
                  <div className="relative shrink-0">
                    <span className="relative z-10 grid size-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-lift ring-1 ring-brand-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                      <Icon name={step.icon} aria-hidden className="size-6" />
                    </span>
                    <span className="absolute -right-1.5 -top-1.5 z-20 grid size-6 place-items-center rounded-full bg-brand-900 font-display text-[0.6875rem] font-bold text-white ring-2 ring-white transition-transform duration-500 group-hover:scale-125">
                      {index + 1}
                    </span>
                  </div>

                  <div className="lg:mt-6">
                    <h3 className="font-display text-lg font-bold text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {step.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-brand-700 ring-1 ring-brand-100">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
