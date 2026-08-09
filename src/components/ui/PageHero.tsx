import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { Aurora, CircuitField } from "./CircuitField";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-medium text-brand-200/80">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3.5 text-brand-200/75" />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-white" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Shared banner for every inner page: deep flag-blue field, soft aurora glow,
 * faint engineering grid, breadcrumbs and an optional stat rail.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  stats,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  stats?: { value: string; label: string }[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-brand-950 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44",
        className,
      )}
    >
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-drift absolute inset-0 opacity-60" />
        <Aurora />
        <CircuitField className="text-brand-400/60" opacity={0.4} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-brand-950 to-transparent" />
      </div>

      <Container>
        <div className="flex flex-col gap-6">
          {crumbs ? (
            <Reveal duration={0.45}>
              <Breadcrumbs items={crumbs} />
            </Reveal>
          ) : null}

          {eyebrow ? (
            <Reveal delay={0.04}>
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}

          <Reveal delay={0.08} blur duration={0.75}>
            <h1 className="max-w-4xl text-display-xl text-white">{title}</h1>
          </Reveal>

          {description ? (
            <Reveal delay={0.14}>
              <p className="max-w-2xl text-base leading-relaxed text-brand-100/80 sm:text-lg">
                {description}
              </p>
            </Reveal>
          ) : null}

          {children ? <Reveal delay={0.2}>{children}</Reveal> : null}

          {stats?.length ? (
            <Reveal delay={0.26}>
              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group bg-brand-950/60 px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-brand-900/70"
                  >
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-200/70">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
