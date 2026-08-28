import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { CategoryGuide as Guide } from "@/lib/data/productGuides";
import { slugify } from "@/lib/utils";

/**
 * The buyer's guide under a category's range.
 *
 * Two columns from `lg` up: a sticky contents rail on the left and one measured
 * reading column on the right. Below `lg` the rail becomes a horizontal chip
 * row above the prose, so the same markup carries a phone without a sidebar
 * collapsing into a stack of orphaned links.
 */
export function CategoryGuide({ guide }: { guide: Guide }) {
  const sections = guide.sections.map((section) => ({
    ...section,
    id: slugify(section.heading),
  }));

  return (
    <section className="section-y bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* Contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Buyer&rsquo;s guide</Eyebrow>
              <nav
                aria-label="On this page"
                className="no-scrollbar mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
              >
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex shrink-0 items-center gap-3 rounded-full border border-ink-100 px-4 py-2.5 text-[0.8125rem] font-semibold text-ink-600 transition-colors hover:border-brand-200 hover:text-brand-700 lg:shrink lg:rounded-none lg:border-0 lg:border-l-2 lg:border-ink-100 lg:px-4 lg:py-3 lg:text-[0.875rem] lg:hover:border-flag-600"
                  >
                    <span className="font-mono text-[0.6875rem] text-ink-400 transition-colors group-hover:text-flag-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="lg:line-clamp-2">{section.heading}</span>
                  </a>
                ))}
              </nav>
            </Reveal>
          </aside>

          {/* Prose */}
          <div className="max-w-2xl">
            {sections.map((section, index) => (
              <Reveal
                key={section.id}
                className="border-t border-ink-100 pt-10 first:border-0 first:pt-0 [&+*]:mt-14"
              >
                <article id={section.id} className="scroll-mt-28">
                  <p className="font-mono text-[0.75rem] font-semibold tracking-[0.16em] text-flag-700">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-950 sm:text-[1.75rem]">
                    {section.heading}
                  </h2>

                  {section.body?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-600"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3.5"
                        >
                          <span
                            aria-hidden
                            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white"
                          >
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.subsections?.length ? (
                    <div className="mt-7 flex flex-col gap-4">
                      {section.subsections.map((sub) => (
                        <div
                          key={sub.heading}
                          className="rounded-3xl border border-ink-100 bg-ink-50/50 p-5 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/40 sm:p-6"
                        >
                          <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink-950">
                            {sub.heading}
                          </h3>
                          <p className="mt-2.5 text-[1rem] leading-[1.7] text-ink-600">
                            {sub.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}

            {guide.closing ? (
              <Reveal className="mt-14">
                <p className="rounded-3xl bg-brand-950 px-6 py-6 text-[1.0625rem] leading-relaxed text-brand-100 sm:px-8 sm:py-7">
                  {guide.closing.lead}
                  <Link
                    href={guide.closing.href}
                    className="font-semibold text-white underline decoration-flag-500 decoration-2 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {guide.closing.label}
                  </Link>
                  {guide.closing.trail}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
