import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const accents: Record<Product["accent"], string> = {
  blue: "from-brand-500 via-brand-600 to-brand-800",
  deep: "from-brand-800 via-brand-900 to-brand-950",
  red: "from-flag-600 via-flag-700 to-brand-950",
  slate: "from-ink-600 via-ink-700 to-ink-950",
};

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  "Best seller": "bg-brand-600 text-white",
  New: "bg-emerald-600 text-white",
  Premium: "bg-ink-950 text-white",
  "Best value": "bg-flag-700 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-float">
      {/* Visual */}
      <div
        className={cn(
          "relative isolate aspect-[4/3] overflow-hidden bg-linear-to-br",
          accents[product.accent],
        )}
      >
        <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
        <div
          aria-hidden
          className="absolute -right-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-700 group-hover:scale-125"
        />
        <div className="absolute inset-0 grid place-items-center">
          <Icon
            name={product.icon}
            aria-hidden
            className="size-20 text-white/85 transition-transform duration-700 group-hover:scale-110"
            strokeWidth={1.1}
          />
        </div>

        {product.badge ? (
          <span
            className={cn(
              "absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] shadow-lg",
              badgeStyles[product.badge],
            )}
          >
            {product.badge}
          </span>
        ) : null}

        <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm ring-1 ring-white/25">
          {product.brand}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink-950">
          {product.name}
        </h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
          {product.tagline}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-2">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl bg-ink-50 px-3 py-2.5 transition-colors duration-300 group-hover:bg-brand-50"
            >
              <dt className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-ink-500">
                {spec.label}
              </dt>
              <dd className="mt-0.5 text-[0.8125rem] font-semibold text-ink-900">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-100 pt-4 sm:pt-5">
          <p className="text-[0.75rem] leading-snug text-ink-500">
            <span className="block font-semibold text-ink-700">Warranty</span>
            {product.warranty}
          </p>
          <Link
            href={`/contact?product=${product.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2.5 text-[0.8125rem] font-semibold text-brand-700 transition-all duration-300 hover:bg-brand-600 hover:text-white"
          >
            Get a quote
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
