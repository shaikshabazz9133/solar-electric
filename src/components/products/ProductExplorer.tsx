"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Tilt } from "@/components/ui/Tilt";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { productCategories, type Product } from "@/lib/data/products";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type SortKey = "featured" | "name" | "brand";

export function ProductExplorer({
  products,
  initialCategory = "all",
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const searchId = useId();
  const sortId = useId();
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const reduce = usePrefersReducedMotion();

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;

      return (
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.tagline.toLowerCase().includes(term) ||
        product.specs.some((spec) =>
          `${spec.label} ${spec.value}`.toLowerCase().includes(term),
        )
      );
    });

    if (sort === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "brand") {
      return [...filtered].sort(
        (a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name),
      );
    }
    return [...filtered].sort(
      (a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)),
    );
  }, [products, category, query, sort]);

  const countFor = (slug: string) =>
    slug === "all"
      ? products.length
      : products.filter((product) => product.category === slug).length;

  const filters = [
    { slug: "all", label: "All equipment", icon: "sparkles" },
    ...productCategories.map((item) => ({
      slug: item.slug,
      label: item.label,
      icon: item.icon,
    })),
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-ink-100 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:p-5">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search equipment
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 size-[1.15rem] -translate-y-1/2 text-ink-500"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by product, brand or spec…"
            className="h-12 w-full rounded-2xl border border-ink-200 bg-ink-50/60 pl-12 pr-11 text-[0.9375rem] text-ink-900 placeholder:text-ink-500 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-700"
            >
              <X aria-hidden className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5">
          <label
            htmlFor={sortId}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-500"
          >
            <SlidersHorizontal aria-hidden className="size-4" />
            Sort
          </label>
          <select
            id={sortId}
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-12 rounded-2xl border border-ink-200 bg-white px-4 text-[0.9375rem] font-medium text-ink-800 transition-colors focus:border-brand-400 focus:outline-none"
          >
            <option value="featured">Featured first</option>
            <option value="name">Name A–Z</option>
            <option value="brand">Brand A–Z</option>
          </select>
        </div>
      </div>

      {/* Category rail */}
      <div
        role="tablist"
        aria-label="Filter equipment by category"
        className="no-scrollbar mt-6 flex gap-2.5 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-x-visible"
      >
        {filters.map((filter) => {
          const active = category === filter.slug;
          return (
            <button
              key={filter.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(filter.slug)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold transition-all duration-300",
                active
                  ? "bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgba(50,88,159,0.7)]"
                  : "border border-ink-200 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              <Icon name={filter.icon} aria-hidden className="size-4" />
              {filter.label}
              <span className="text-[0.75rem] font-semibold">
                {countFor(filter.slug)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p
        className="mt-8 text-[0.875rem] text-ink-500"
        role="status"
        aria-live="polite"
      >
        Showing <strong className="font-semibold text-ink-900">{visible.length}</strong>{" "}
        {visible.length === 1 ? "product" : "products"}
        {query ? (
          <>
            {" "}
            matching <strong className="font-semibold text-ink-900">“{query}”</strong>
          </>
        ) : null}
      </p>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.div
                key={product.id}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Tilt className="h-full" max={5} scale={1.015}>
                  <ProductCard product={product} />
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-6 rounded-4xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-16 text-center">
          <p className="font-display text-lg font-bold text-ink-950">
            Nothing matches that search
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] text-ink-600">
            We stock more than we list. Tell us the make and model you are after
            and we will price it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Clear filters
            </Button>
            <Button href="/contact" size="sm">
              Ask about a product
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
