import type { CSSProperties } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { washAt, washVars } from "@/lib/washes";
import { cn } from "@/lib/utils";
import type { ServiceCardDeckBlock } from "@/lib/data/services";

/**
 * A titled deck of washed cards under a service banner — the same card
 * language as the process band above it, carrying whatever a particular
 * service needs to lay out side by side: rebate schemes, equipment types,
 * capability comparisons.
 *
 * A card leads with a photograph *or* an icon medallion, never both. Where
 * there is a photo it is the thing you look at first, and a medallion sitting
 * on top of it would only compete; the icon still appears, small, inside the
 * badge pill where a card carries one.
 */
export function ServiceCardDeck({ block }: { block: ServiceCardDeckBlock }) {
  const tinted = block.tone === "tinted";
  const pair = block.cards.length === 2;

  return (
    <section
      className={cn(
        "section-y relative isolate overflow-hidden",
        tinted ? "bg-ink-50/60" : "bg-white",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-ink absolute inset-0 opacity-60" />
        {tinted ? (
          <div className="absolute -right-32 top-10 size-120 rounded-full bg-brand-100/50 blur-3xl" />
        ) : null}
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow={block.eyebrow}
          title={
            block.titleAccent ? (
              <>
                {block.title}{" "}
                <span className="text-gradient-brand">{block.titleAccent}</span>
              </>
            ) : (
              block.title
            )
          }
          description={block.intro}
        />

        {/* Two cards stay wide and centred rather than stretching to a half of
            a full-width row; three take a third each on desktop. */}
        <StaggerGroup
          className={cn(
            "mt-12 grid gap-5 sm:mt-14",
            pair
              ? "mx-auto max-w-4xl md:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
          stagger={0.08}
        >
          {block.cards.map((card, index) => {
            const wash = washAt(index);

            return (
              <StaggerItem key={card.title} lift className="h-full">
                <article
                  style={washVars(wash) as CSSProperties}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-linear-to-b from-white to-[color:var(--tint)] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  {card.image ? (
                    <div className="relative aspect-3/2 w-full overflow-hidden">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Bleeds the card's own tint back over the foot of the
                          frame so the photo belongs to the card rather than
                          sitting on top of it. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-[color:var(--tint)] via-transparent to-transparent opacity-70"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    {card.image ? null : (
                      <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-white text-[color:var(--ink)] ring-1 ring-[color:var(--line)] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[color:var(--ink)] group-hover:text-white">
                        <Icon
                          name={card.icon}
                          aria-hidden
                          className="size-5.5"
                        />
                      </span>
                    )}

                    {card.badge ? (
                      <span
                        className={cn(
                          "inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[color:var(--ink)] ring-1 ring-[color:var(--line)]",
                          !card.image && "mt-6",
                        )}
                      >
                        <Icon
                          name={card.icon}
                          aria-hidden
                          className="size-3.5"
                        />
                        {card.badge}
                      </span>
                    ) : null}

                    <h3
                      className={cn(
                        "font-display text-lg font-bold leading-snug tracking-tight text-ink-950 sm:text-xl",
                        (card.badge || !card.image) && "mt-5",
                      )}
                    >
                      {card.title}
                    </h3>

                    {card.body ? (
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                        {card.body}
                      </p>
                    ) : null}

                    {card.bullets?.length ? (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {card.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"
                          >
                            <Icon
                              name="check"
                              aria-hidden
                              className="mt-0.5 size-4 shrink-0 text-[color:var(--ink)]"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {/* `mt-auto` on the wrapper pins the rule to the foot of
                        the card, so the rules line up across a row of unequal
                        copy; the padding keeps it off the last line. */}
                    <span aria-hidden className="mt-auto block pt-7">
                      <span className="block h-0.5 w-10 rounded-full bg-[color:var(--line)] transition-all duration-300 group-hover:w-16 group-hover:bg-[color:var(--ink)]" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {block.note ? (
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-8 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-[0.875rem] leading-relaxed text-brand-900 sm:p-5 sm:text-[0.9375rem]",
                pair && "mx-auto max-w-4xl",
              )}
            >
              <Info
                aria-hidden
                className="mt-0.5 size-4.5 shrink-0 text-brand-600"
              />
              <span className="font-medium">{block.note}</span>
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
