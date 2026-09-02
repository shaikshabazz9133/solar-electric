import type { CSSProperties } from "react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import type { ServiceProcessBlock } from "@/lib/data/services";
import { washAt, washVars } from "@/lib/washes";

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
          {block.steps.map((step, index) => {
            const wash = washAt(index);

            return (
              <StaggerItem
                key={step.title}
                lift
                className={
                  // Centre the final row on desktop: cards 4 and 5 start one
                  // half-card in from the edges.
                  index === 3 ? "lg:col-span-4 lg:col-start-3" : "lg:col-span-4"
                }
              >
                <article
                  style={
                    {
                      "--tint": wash.tint,
                      "--line": wash.line,
                      "--ink": wash.ink,
                    } as CSSProperties
                  }
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-linear-to-b from-white to-[color:var(--tint)] p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8"
                >
                  <span className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-white text-[color:var(--ink)] ring-1 ring-[color:var(--line)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[color:var(--ink)] group-hover:text-white">
                    <Icon name={step.icon} aria-hidden className="size-5.5" />
                  </span>

                  <h3 className="relative mt-6 font-display text-lg font-bold leading-snug tracking-tight text-ink-950 sm:text-xl">
                    {step.title}
                  </h3>

                  <p className="relative mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    {step.body}
                  </p>

                  <span
                    aria-hidden
                    className="mt-6 h-0.5 w-10 rounded-full bg-[color:var(--line)] transition-all duration-300 group-hover:w-16 group-hover:bg-[color:var(--ink)]"
                  />
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
