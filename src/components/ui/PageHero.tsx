import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { Aurora, CircuitField } from "./CircuitField";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** `tone` picks the palette: `dark` sits on the hero photograph, `light` on a page. */
export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const link = dark
    ? "transition-colors hover:text-white"
    : "transition-colors hover:text-flag-700";

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-medium",
          dark ? "text-brand-200/80" : "text-ink-500",
        )}
      >
        <li>
          <Link href="/" className={link}>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight
              aria-hidden
              className={cn(
                "size-3.5",
                dark ? "text-brand-200/75" : "text-ink-400",
              )}
            />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className={link}>
                {item.label}
              </Link>
            ) : (
              <span
                className={dark ? "text-white" : "text-ink-900"}
                aria-current="page"
              >
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
 *
 * Pass `image` to swap the generated field for a full-bleed photograph; the
 * ambient layers stay, dialled right down, so the banner still reads as part
 * of the same family.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  descriptionAs: Description = "p",
  crumbs,
  stats,
  image,
  scrim = "default",
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Promote the standfirst to a real heading where it carries page keywords. */
  descriptionAs?: "p" | "h2";
  crumbs?: Crumb[];
  stats?: { value: string; label: string }[];
  /** Full-bleed background photograph. `position` tunes the crop focal point. */
  image?: { src: string; position?: string };
  /**
   * How hard to darken a photographic banner. `soft` keeps the photograph open
   * and readable as a photograph — a single flat tint, no directional wedge.
   */
  scrim?: "default" | "soft";
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
        {image ? (
          <>
            <Image
              src={image.src}
              alt=""
              fill
              preload
              sizes="100vw"
              style={{ objectPosition: image.position ?? "center 35%" }}
              className="size-full object-cover"
            />
            {/* Neutral scrim only — no colour cast, no motion. `default` lays a
                wedge under the copy column; `soft` is one even tint that holds
                white text at AA without casting a shadow across the frame. */}
            {scrim === "soft" ? (
              <div className="absolute inset-0 bg-black/45" />
            ) : (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/30 sm:from-black/75 sm:via-black/35 sm:to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/30" />
              </>
            )}
          </>
        ) : (
          <>
            <div className="bg-grid-drift absolute inset-0 opacity-60" />
            <Aurora />
            <CircuitField className="text-brand-400/60" opacity={0.4} />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-brand-950 to-transparent" />
          </>
        )}
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
              {/* `font-sans font-normal` undoes the base heading styles when
                  this renders as an h2 — it should read as a standfirst, not as
                  a second title. */}
              <Description className="max-w-2xl font-sans text-base font-normal leading-relaxed text-brand-100/80 sm:text-lg">
                {description}
              </Description>
            </Reveal>
          ) : null}

          {children ? <Reveal delay={0.2}>{children}</Reveal> : null}

          {stats?.length ? (
            <Reveal delay={0.26}>
              <dl
                className={cn(
                  "mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10",
                  stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4",
                )}
              >
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
