"use client";

import Image from "next/image";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useDocumentHidden,
  useIsHydrated,
  usePrefersReducedMotion,
} from "@/lib/hooks";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Pause,
  Phone,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { SplitWords, Word } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { heroSlides, type HeroSlide } from "@/lib/data/heroSlides";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const proofPoints = [
  "Licensed, bonded & $5M insured",
  "Fixed-price quotes — no change-order games",
  "25-year workmanship warranty",
];

const ease = [0.22, 1, 0.36, 1] as const;

// easeInOutQuart. Symmetric and weighted at both ends: the strip takes its time
// leaving, covers the middle decisively, and settles without a bounce. Quint is
// the showier curve, but across a full-bleed 1440px push its mid-section moves
// fast enough to read as a flick rather than a camera move.
const glide = [0.76, 0, 0.24, 1] as const;
const GLIDE_MS = 1150;

// Matches `--animate-autoplay` in globals.css, which draws the countdown bar
// under the active thumbnail. Change both together or they drift apart.
const AUTOPLAY_MS = 7000;

const SLIDE_COUNT = heroSlides.length;

/**
 * Shortest signed distance from a slide to the playhead, in slides.
 *
 * The playhead counts up forever (…3, 4, 5, 6…) rather than wrapping, so
 * advancing past the last slide keeps travelling left instead of rewinding
 * through every frame. Wrapping to the ±half-length window is what lets a
 * five-frame strip behave like an infinite one.
 */
function wrapOffset(distance: number) {
  const half = SLIDE_COUNT / 2;
  return (((distance % SLIDE_COUNT) + SLIDE_COUNT + half) % SLIDE_COUNT) - half;
}

/**
 * One frame of the strip.
 *
 * Three nested layers, each doing exactly one job:
 *   1. the track    — carries the frame across the viewport
 *   2. the parallax — slides the photograph *within* that frame, slower
 *   3. the push-in  — the slow zoom that runs while the frame is at rest
 *
 * Layers 1 and 2 are driven off the shared `playhead` motion value rather than
 * React state, so the whole strip moves on one interpolation with no
 * re-renders mid-transition.
 */
function HeroFrame({
  slide,
  slideIndex,
  playhead,
  isActive,
  reduce,
  isFirst,
}: {
  slide: HeroSlide;
  slideIndex: number;
  playhead: MotionValue<number>;
  isActive: boolean;
  reduce: boolean;
  isFirst: boolean;
}) {
  const offset = useTransform(playhead, (value) => wrapOffset(slideIndex - value));

  const x = useTransform(offset, (value) => `${value * 100}%`);

  // Zero at both rest positions, peaking mid-flight — a constant lag would
  // leave the neighbouring frame poking into view while the strip is idle.
  const parallax = useTransform(
    offset,
    (value) => `${-Math.sin(value * Math.PI) * 14}%`,
  );

  // Only the frame at the playhead and its two neighbours can be on screen.
  // Everything else is switched off so the far side of the wrap never streaks
  // across the viewport on its way round.
  const opacity = useTransform(offset, (value) => (Math.abs(value) <= 1.001 ? 1 : 0));

  return (
    <motion.div style={{ x, opacity }} className="absolute inset-0">
      <motion.div style={{ x: reduce ? 0 : parallax }} className="absolute inset-0">
        <motion.div
          initial={false}
          animate={reduce ? undefined : { scale: isActive ? 1.09 : 1 }}
          transition={{
            duration: isActive ? AUTOPLAY_MS / 1000 + 2 : GLIDE_MS / 1000,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          {/* The whole strip mounts up front — gating the later frames behind
              an idle callback kept them out of the initial fetch, but it also
              meant the timer could not start until they arrived, which is a
              worse problem than the one it solved. `fetchPriority` gets the
              same result from the network stack instead: the browser finishes
              the LCP frame before it spends bandwidth on the other four. */}
          <Image
            src={slide.src}
            alt=""
            fill
            sizes="100vw"
            preload={isFirst}
            fetchPriority={isFirst ? "high" : "low"}
            placeholder="blur"
            blurDataURL={slide.blurDataURL}
            style={{ objectPosition: slide.position }}
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const tabHidden = useDocumentHidden();
  // The playhead counts monotonically; `index` is it folded back into range.
  const [count, setCount] = useState(0);

  // Autoplay is deliberately NOT paused on hover. This section fills the
  // viewport, so a pointer resting anywhere on the page would sit inside it and
  // stall the strip indefinitely — the small-card hover-pause that suits
  // `Testimonials` is exactly wrong at hero scale. The explicit toggle below is
  // the pause mechanism instead (WCAG 2.2.2), joined by the two cases where
  // stopping is unambiguously right: a backgrounded tab, and a keyboard user
  // inside the rail.
  const [playing, setPlaying] = useState(true);
  const [railFocused, setRailFocused] = useState(false);
  const paused = !playing || tabHidden || railFocused;

  // The countdown bar is a CSS animation, so a server-rendered one starts
  // ticking at first paint while the timer it represents does not start until
  // hydration — it would run out early and make the strip look stuck. Mounting
  // it on the client puts both clocks on the same start.
  const hydrated = useIsHydrated();

  // Which way the last move went, so the caption exits the way the strip did.
  const [direction, setDirection] = useState(1);

  const playhead = useMotionValue(0);
  const index = ((count % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;

  const step = useCallback((delta: number) => {
    if (delta === 0) return;
    setDirection(Math.sign(delta));
    setCount((current) => current + delta);
  }, []);

  // Jumping from the rail: travel the short way round, not back through every
  // frame in between.
  const goTo = useCallback(
    (target: number) => step(wrapOffset(target - index)),
    [index, step],
  );

  useEffect(() => {
    const controls = animate(playhead, count, {
      duration: reduce ? 0 : GLIDE_MS / 1000,
      ease: glide,
    });
    return () => controls.stop();
  }, [count, playhead, reduce]);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => step(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [count, paused, reduce, step]);

  // Touch swipe. Deliberately not wired to the mouse: a horizontal mouse drag
  // over the headline is someone selecting text, not changing the slide.
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") return;
    if ((event.target as HTMLElement).closest("a,button")) return;
    swipe.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    // Only act on a gesture that is clearly sideways — anything closer to
    // vertical belongs to the page scroll.
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(event.clientY - start.y) * 1.4) return;
    step(dx < 0 ? 1 : -1);
  };

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  const active = heroSlides[index];

  return (
    <section
      className="relative isolate flex min-h-160 flex-col justify-center overflow-hidden bg-brand-950 pb-16 pt-28 sm:pb-20 sm:pt-36 lg:min-h-192 lg:pb-20 lg:pt-44"
      aria-roledescription="carousel"
      aria-label="Recent NorthStar jobs"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipe.current = null)}
    >
      {/* The strip. Every frame stays mounted and is moved by transform —
          unmounting would force a re-decode and flash black mid-glide. The
          photographs are decorative here: the caption below carries the same
          information to assistive tech, and five competing alt strings in the
          accessibility tree would only add noise. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {heroSlides.map((slide, slideIndex) => (
          <HeroFrame
            key={slide.src}
            slide={slide}
            slideIndex={slideIndex}
            playhead={playhead}
            isActive={slideIndex === index}
            reduce={reduce}
            isFirst={slideIndex === 0}
          />
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Legibility scrims. Neutral black rather than brand-tinted: a blue
            wash over a photograph reads as a colour cast on the subject, not as
            shading. Black only darkens, so the image keeps its own colour.
            Narrow screens get a mostly even wash because the copy runs full
            width there; from `lg` the copy is left-half only, so the darkening
            is biased hard left and clears the photograph well before centre. */}
        <div className="absolute inset-0 bg-black/40 lg:hidden" />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/10 via-55% to-black/55 lg:hidden" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-black/82 via-black/38 via-32% to-transparent to-58% lg:block" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent via-42% to-black/25" />
        <div className="bg-grid-drift absolute inset-0 opacity-20" />
      </div>

      <Container>
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[0.75rem] font-semibold text-brand-100 backdrop-blur-sm sm:text-[0.8125rem]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Booking next week · Austin &amp; Central Texas
            </span>
          </motion.div>

          <SplitWords
            as="h1"
            play="mount"
            delay={0.12}
            className="mt-6 text-display-2xl text-white"
          >
            {"Power you can "}
            <Word>
              <span className="relative inline-block">
                <span className="text-gradient-light text-gradient-animate">
                  trust.
                </span>
                {/* Hand-drawn underline that draws itself once the word lands */}
                <svg
                  aria-hidden
                  viewBox="0 0 260 12"
                  className="absolute -bottom-1 left-0 w-full text-brand-400/70"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8c60-6 130-7 256-3"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.85, ease }}
                  />
                </svg>
              </span>
            </Word>
            <br />
            {"Energy you own."}
          </SplitWords>

          <motion.p
            {...rise(0.5)}
            className="mt-7 max-w-xl text-base leading-relaxed text-brand-100/80 sm:text-lg"
          >
            Master electricians and NABCEP-certified solar installers under one
            roof. We wire, power, store and back up Central Texas homes and
            businesses — and we put every number in writing before you sign.
          </motion.p>

          <motion.ul
            {...rise(0.58)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            {proofPoints.map((point, pointIndex) => (
              <motion.li
                key={point}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.66 + pointIndex * 0.09, ease }}
                className="group flex items-center gap-2.5 text-[0.9375rem] text-brand-100/85"
              >
                <CheckCircle2
                  aria-hidden
                  className="size-[1.15rem] shrink-0 text-brand-300 transition-transform duration-300 group-hover:scale-125"
                />
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            {...rise(0.9)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button href="/contact" size="lg">
                Get your free quote
                <ArrowRight
                  aria-hidden
                  className="size-[1.15rem] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button href={siteConfig.phoneHref} size="lg" variant="outline-light">
                <Phone aria-hidden className="size-[1.15rem] transition-transform duration-300 group-hover:-rotate-12" />
                {siteConfig.phone}
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Carousel rail: what you are looking at, and how to move through it */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-14 flex flex-col gap-6 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          {/* Caption. `aria-live` makes this the announcement channel for the
              carousel, which is why the photographs themselves have no alt. */}
          <div className="min-h-20 flex-1" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.figcaption
                key={active.src}
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, x: direction * 26 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduce ? { opacity: 0 } : { opacity: 0, x: direction * -26 }
                }
                transition={{ duration: 0.5, ease }}
                className="inline-flex flex-col items-start"
              >
                <span className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-brand-300">
                  {active.kicker}
                </span>
                <span className="mt-2 font-display text-lg font-semibold text-white sm:text-xl">
                  {active.title}
                </span>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[0.8125rem] text-brand-100/70">
                  <MapPin aria-hidden className="size-3.5 text-brand-300" />
                  {active.location}
                </span>
              </motion.figcaption>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex items-center gap-2 sm:gap-2.5"
              role="tablist"
              aria-label="Choose photograph"
              onFocusCapture={() => setRailFocused(true)}
              onBlurCapture={() => setRailFocused(false)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") step(1);
                else if (event.key === "ArrowLeft") step(-1);
                else return;
                event.preventDefault();
              }}
            >
              {heroSlides.map((slide, dotIndex) => {
                const isActive = dotIndex === index;

                return (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${slide.title} — ${slide.location}`}
                    onClick={() => goTo(dotIndex)}
                    className={cn(
                      "group/thumb relative h-11 shrink-0 overflow-hidden rounded-xl ring-1 transition-all duration-500 ease-out",
                      isActive
                        ? "w-16 ring-white/70 sm:w-20"
                        : "w-11 opacity-70 ring-white/20 hover:opacity-100 hover:ring-white/50",
                    )}
                  >
                    <Image
                      src={slide.src}
                      alt=""
                      fill
                      sizes="80px"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={slide.blurDataURL}
                      style={{ objectPosition: slide.position }}
                      className="object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-110"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 bg-black/40 transition-opacity duration-500",
                        isActive && "opacity-0",
                      )}
                    />
                    {/* Autoplay countdown. Keyed on `count` so it restarts with
                        each slide, and unmounted while paused — the JS timer is
                        cleared rather than suspended, so a bar left frozen
                        part-way would be telling a lie about what happens next. */}
                    {isActive && hydrated && !reduce && !paused ? (
                      <span
                        key={count}
                        aria-hidden
                        className="animate-autoplay absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* The strip runs itself, so the only control left is the one that
                stops it — required for anything that moves on a timer. */}
            {reduce ? null : (
              <button
                type="button"
                onClick={() => setPlaying((current) => !current)}
                aria-label={playing ? "Pause the photographs" : "Play the photographs"}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15"
              >
                {playing ? (
                  <Pause aria-hidden className="size-4 fill-current" />
                ) : (
                  <Play aria-hidden className="size-4 fill-current" />
                )}
              </button>
            )}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 hidden justify-center lg:flex"
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex flex-col items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-200/60"
          >
            Scroll
            <ChevronDown className="size-4" />
          </motion.span>
        </motion.div>
      </Container>
    </section>
  );
}
