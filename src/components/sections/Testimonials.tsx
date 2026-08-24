import { BadgeCheck } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Rating } from "@/components/ui/Rating";
import { LogoMark } from "@/components/ui/Logo";
import { testimonials } from "@/lib/data/testimonials";
import { siteConfig } from "@/lib/site";

export function Testimonials() {
  return (
    <section
      className="section-y relative isolate overflow-hidden bg-ink-50/60"
      aria-label="Customer reviews"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-ink opacity-60" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>Client reviews</Eyebrow>
          </Reveal>
        </div>

        {/* Flex, not grid: `min-w-0 flex-1` is the one combination that reliably
            lets a horizontal scroller sit beside a fixed-width panel. Without
            the `min-w-0` the fixed-width cards set the flex item's automatic
            minimum, the row grows past the page, and the rail never scrolls
            because it is never narrower than its own contents. */}
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Score card */}
          <Reveal delay={0.1} className="lg:w-72 lg:shrink-0">
            <div className="flex h-full items-center gap-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft lg:flex-col lg:items-start lg:gap-4">
              <LogoMark className="size-14 shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-base font-bold leading-snug text-ink-950">
                  {siteConfig.name}
                </p>
                <span className="mt-2 flex items-center gap-2">
                  <Rating value={5} size="md" />
                  <span className="font-display text-[0.9375rem] font-bold text-ink-950">
                    4.9
                  </span>
                </span>
                <p className="mt-2 text-[0.875rem] text-ink-500">
                  Based on 687 verified reviews
                </p>
              </div>
            </div>
          </Reveal>

          {/* Rail — swipe on touch, trackpad or shift-scroll on desktop. No
              controls: the scrollbar is hidden and the arrows are gone. */}
          <div className="no-scrollbar min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto py-6">
            <StaggerGroup className="flex gap-5" stagger={0.08}>
              {testimonials.map((item) => (
                <StaggerItem
                  key={item.name}
                  className="w-[80vw] shrink-0 snap-start sm:w-80"
                  lift
                >
                  <figure className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                    <figcaption className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-600 to-brand-800 font-display text-[0.8125rem] font-bold text-white"
                      >
                        {item.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-[0.9375rem] font-bold text-ink-950">
                          {item.name}
                        </span>
                        <span className="block truncate text-[0.8125rem] text-ink-500">
                          {item.role} · {item.location}
                        </span>
                      </span>
                    </figcaption>

                    <div className="mt-4 flex items-center gap-2">
                      <Rating value={item.rating} size="sm" />
                      <BadgeCheck
                        aria-label="Verified customer"
                        className="size-4 shrink-0 text-brand-600"
                      />
                      <span className="ml-auto truncate text-[0.625rem] font-bold uppercase tracking-widest text-ink-400">
                        {item.service}
                      </span>
                    </div>

                    {/* Clamped so one long review cannot stretch its card
                        taller than the rest — the rail stays one height. */}
                    <blockquote className="mt-4 flex-1">
                      <p className="line-clamp-5 text-[0.9375rem] leading-relaxed text-ink-700">
                        {item.quote}
                      </p>
                    </blockquote>
                  </figure>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
