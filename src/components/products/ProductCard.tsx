import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  "Best seller": "bg-brand-600 text-white",
  New: "bg-emerald-600 text-white",
  Premium: "bg-ink-950 text-white",
  "Best value": "bg-flag-700 text-white",
};

/**
 * Range card. The photograph is the whole top of the card and the frame stays
 * light, so a wall of these reads as a product listing rather than as a wall of
 * dark tiles. Everything below the image is stacked on a single baseline grid
 * and the action pins to the bottom, so cards in a row stay aligned however
 * long the names run.
 */
export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.id}`;
  const headline = product.specs.slice(0, 2);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-float">
      <div className="relative isolate aspect-[4/3] overflow-hidden bg-ink-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent"
        />

        <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-xl bg-white/90 text-brand-700 ring-1 ring-black/5 backdrop-blur-sm transition-colors duration-500 group-hover:bg-flag-700 group-hover:text-white">
          <Icon name={product.icon} aria-hidden className="size-5" strokeWidth={1.5} />
        </span>

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

        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-800 ring-1 ring-black/5 backdrop-blur-sm">
          {product.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink-950 sm:text-lg">
          {/* Stretched link: the whole card is the target, and the button below
              stays the visible affordance without nesting interactive elements. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
          {product.tagline}
        </p>

        <dl className="mt-4 flex flex-wrap gap-2">
          {headline.map((spec) => (
            <div
              key={spec.label}
              className="rounded-full bg-ink-50 px-3 py-1.5 text-[0.75rem] transition-colors duration-300 group-hover:bg-brand-50"
            >
              <dt className="inline font-semibold text-ink-500">{spec.label}: </dt>
              <dd className="inline font-bold text-ink-900">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-5">
          <p className="text-[0.75rem] leading-snug text-ink-500">
            <span className="font-semibold text-ink-700">Warranty · </span>
            {product.warranty}
          </p>
          <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-flag-700 px-5 py-3 text-[0.875rem] font-semibold text-white transition-all duration-300 group-hover:bg-flag-800 sm:w-auto">
            See Details
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
