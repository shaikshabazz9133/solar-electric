import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import type { ServiceProcessBlock } from "@/lib/data/services";

/**
 * The long-form "here is how the install actually runs" band that sits under a
 * service banner.
 *
 * The card grid is a twelve-column track rather than the obvious
 * `lg:grid-cols-3`: five cards across three columns would leave the last row
 * ragged at the left, so on desktop each card spans four columns and the final
 * pair is pushed in by two — three over two, both rows centred.
 */
export function ServiceProcessSteps({ block }: { block: ServiceProcessBlock }) {
  return (
    <section className="section-y relative isolate overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-ink absolute inset-0 opacity-50" />
        <div className="absolute -top-24 left-1/2 size-152 -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Standfirst. The rule on the left ties it to the banner above rather
            than letting it read as an orphaned paragraph. */}
        <Reveal>
          <div className="mx-auto max-w-3xl border-l-2 border-brand-200 pl-6 sm:pl-8">
            {block.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-base leading-relaxed text-ink-600 first:mt-0 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <SectionHeading
          className="mt-16 sm:mt-20"
          eyebrow={block.eyebrow}
          title={
            <>
              {block.heading}{" "}
              <span className="text-gradient-brand">{block.headingAccent}</span>
            </>
          }
          description={block.description}
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-12">
          {block.steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              lift
              className={
                // Centre the final row on desktop: cards 4 and 5 start one
                // half-card in from the edges.
                index === 3
                  ? "lg:col-span-4 lg:col-start-3"
                  : "lg:col-span-4"
              }
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-8">
                {/* Oversized step numeral, kept as decoration — the visible
                    "01." in the heading is what carries the order to a reader. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-5 font-display text-[5.5rem] font-bold leading-none text-brand-600/8 transition-colors duration-300 group-hover:text-brand-600/15"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-100 transition-all duration-300 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white group-hover:ring-brand-600">
                  <Icon name={step.icon} aria-hidden className="size-5.5" />
                </span>

                <h3 className="relative mt-6 font-display text-lg font-bold leading-snug tracking-tight text-ink-950 sm:text-xl">
                  <span className="text-brand-600">
                    {String(index + 1).padStart(2, "0")}.
                  </span>{" "}
                  {step.title}
                </h3>

                <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {step.body}
                </p>

                <span
                  aria-hidden
                  className="mt-6 h-0.5 w-10 rounded-full bg-brand-200 transition-all duration-300 group-hover:w-16 group-hover:bg-brand-600"
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
