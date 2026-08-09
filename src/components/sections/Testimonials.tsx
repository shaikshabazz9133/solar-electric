"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Rating } from "@/components/ui/Rating";
import { Counter } from "@/components/ui/Counter";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduce, go]);

  const active = testimonials[index];

  return (
    <section
      className="section-y group/reviews relative isolate overflow-hidden bg-ink-50/60"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-ink opacity-60" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left rail */}
          <div>
            <Reveal>
              <Eyebrow>Client reviews</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-display-lg">
                687 reviews.{" "}
                <span className="text-gradient-brand">4.9 average.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-600 sm:text-base">
                Collected across Google, Angi and SolarReviews since 2008. We
                publish the one-star ones too — you can read every review on our
                Google profile.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-2 gap-5">
                {[
                  { value: 687, suffix: "", label: "Verified reviews" },
                  { value: 98, suffix: "%", label: "Would recommend" },
                  { value: 4.9, suffix: "", label: "Average rating", decimals: 1 },
                  { value: 2, suffix: " hr", label: "Emergency response" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-ink-100 bg-white p-5"
                  >
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-2xl font-extrabold text-ink-950">
                        <Counter
                          value={item.value}
                          suffix={item.suffix}
                          decimals={item.decimals ?? 0}
                        />
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-ink-500">
                        {item.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Carousel */}
          <Reveal delay={0.1} direction="left">
            <div className="relative">
              <div className="relative min-h-96 sm:min-h-88">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.figure
                    key={index}
                    custom={direction}
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, x: direction * 40, scale: 0.98 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, x: direction * -40, scale: 0.98 }
                    }
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex h-full flex-col rounded-4xl border border-ink-100 bg-white p-7 shadow-lift sm:p-9"
                    aria-live="polite"
                  >
                    <Quote
                      aria-hidden
                      className="animate-bob-slow absolute right-8 top-8 size-14 text-brand-50"
                      strokeWidth={1.5}
                    />

                    <div className="relative flex items-center gap-3">
                      <Rating value={active.rating} size="md" />
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-brand-700">
                        {active.service}
                      </span>
                    </div>

                    <blockquote className="relative mt-6 flex-1">
                      <motion.p
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg leading-relaxed text-ink-800 sm:text-xl"
                      >
                        &ldquo;{active.quote}&rdquo;
                      </motion.p>
                    </blockquote>

                    <figcaption className="mt-8 flex items-center gap-4 border-t border-ink-100 pt-6">
                      <motion.span
                        aria-hidden
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.12 }}
                        className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-600 to-brand-800 font-display text-sm font-bold text-white"
                      >
                        {active.initials}
                      </motion.span>
                      <span>
                        <span className="block font-semibold text-ink-950">
                          {active.name}
                        </span>
                        <span className="block text-[0.875rem] text-ink-500">
                          {active.role} · {active.location}
                        </span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2" role="tablist" aria-label="Choose review">
                  {testimonials.map((item, dotIndex) => (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={dotIndex === index}
                      aria-label={`Review ${dotIndex + 1} of ${testimonials.length}: ${item.name}`}
                      onClick={() => go(dotIndex, dotIndex > index ? 1 : -1)}
                      className={cn(
                        "h-2 overflow-hidden rounded-full transition-all duration-300",
                        dotIndex === index
                          ? // The track sits behind the countdown fill; with
                            // motion off there is no fill, so keep it solid.
                            reduce
                            ? "w-8 bg-brand-600"
                            : "w-8 bg-brand-200"
                          : "w-2 bg-ink-300 hover:bg-ink-400",
                      )}
                    >
                      {/* Autoplay countdown. Keyed on `index` so it restarts
                          with each slide, and paused by the same hover that
                          pauses the timer. */}
                      {dotIndex === index && !reduce ? (
                        <span
                          key={index}
                          aria-hidden
                          className="animate-autoplay block size-full origin-left rounded-full bg-brand-600 group-hover/reviews:[animation-play-state:paused] group-focus-within/reviews:[animation-play-state:paused]"
                        />
                      ) : null}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(index - 1, -1)}
                    aria-label="Previous review"
                    className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <ChevronLeft aria-hidden className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1, 1)}
                    aria-label="Next review"
                    className="grid size-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <ChevronRight aria-hidden className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
