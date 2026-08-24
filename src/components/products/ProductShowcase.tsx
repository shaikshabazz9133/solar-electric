"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { productCategories, products } from "@/lib/data/products";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The equipment categories from the header, as a tab set. Selecting one swaps
 * the artwork and the copy together — the image cross-dissolves under a light
 * sweep while the detail column staggers back in, so the change reads as one
 * movement rather than several elements popping.
 */
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const category = productCategories[active];
  const items = products.filter((product) => product.category === category.slug);

  /** Selects a tab and keeps it inside the scrollable rail on narrow screens. */
  const select = (next: number) => {
    setActive(next);
    tabRefs.current[next]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  };

  /** Roving focus: arrow keys move between tabs, Home/End jump to the ends. */
  const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = productCategories.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % productCategories.length
        : event.key === "ArrowLeft"
          ? (active + last) % productCategories.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;

    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Equipment categories"
        onKeyDown={handleKeys}
        className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2 lg:flex-wrap lg:overflow-x-visible"
      >
        {productCategories.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-300",
                selected
                  ? "text-white"
                  : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {/* One shared element slides between tabs instead of each pill
                  fading in place. It stays in normal flow order — a negative
                  z-index would drop it behind the section background. */}
              {selected ? (
                <motion.span
                  aria-hidden
                  layoutId={`${baseId}-pill`}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                  className="absolute inset-0 rounded-full bg-brand-600 shadow-[0_10px_24px_-10px_rgba(50,88,159,0.7)]"
                />
              ) : null}
              <Icon name={item.icon} aria-hidden className="relative size-4" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${category.slug}`}
        className="mt-8"
      >
        {/* Gallery — the three frames deal themselves in one after another */}
        <AnimatePresence initial={false} mode="wait">
          <motion.ul
            key={category.slug}
            initial="hidden"
            animate="shown"
            exit="gone"
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: reduce ? 0 : 0.09 } },
              gone: { transition: { staggerChildren: 0, duration: 0.18 } },
            }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {category.gallery.map((shot, index) => (
              <motion.li
                key={shot.src}
                variants={{
                  hidden: reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: 26, scale: 0.96 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease },
                  },
                  gone: reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12, transition: { duration: 0.18, ease } },
                }}
                className="group/shot relative isolate aspect-4/3 overflow-hidden rounded-3xl bg-brand-950"
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 31vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/shot:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/15 to-transparent"
                />

                {/* Light sweep across each frame as it lands */}
                {reduce ? null : (
                  <motion.span
                    aria-hidden
                    initial={{ x: "-60%" }}
                    animate={{ x: "160%" }}
                    transition={{ duration: 0.9, ease, delay: 0.15 + index * 0.09 }}
                    className="pointer-events-none absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  />
                )}

                {index === 0 ? (
                  <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                    <Icon name={category.icon} aria-hidden className="size-[1.15rem]" />
                  </span>
                ) : null}

                <span className="absolute inset-x-4 bottom-4 text-[0.8125rem] font-medium leading-snug text-white">
                  {shot.caption}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Detail */}
        <div className="mt-6 rounded-4xl border border-ink-100 bg-white p-6 sm:p-7">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={category.slug}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, transition: { duration: 0.18, ease } }
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-950">
                    {category.label}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                    {category.blurb}
                  </p>
                </div>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="group/cta inline-flex shrink-0 items-center gap-2 rounded-full bg-flag-700 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:bg-flag-800"
                >
                  Explore {items.length} {items.length === 1 ? "product" : "products"}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                  />
                </Link>
              </div>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
                {items.map((product, index) => (
                  <motion.li
                    key={product.id}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 + index * 0.07, ease }}
                    className="rounded-2xl bg-ink-50/70 px-4 py-3 transition-colors duration-300 hover:bg-brand-50"
                  >
                    <p className="text-[0.875rem] font-semibold text-ink-950">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-500">
                      {product.tagline}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
