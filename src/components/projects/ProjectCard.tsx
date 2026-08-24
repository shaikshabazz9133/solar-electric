import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * Copy sits *over* the photograph rather than in a panel beneath it, which is
 * what keeps the card to a fixed height instead of growing with its summary.
 * The height is a fixed value rather than an aspect ratio: these cards appear
 * in spans of different widths, and a ratio would give each span a different
 * height.
 */
export function ProjectCard({
  project,
  size = "default",
  priority = false,
}: {
  project: Project;
  size?: "default" | "large";
  priority?: boolean;
}) {
  const large = size === "large";

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-4xl bg-brand-950 p-6 text-white",
        "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-float",
        // Landscape: the source photography is cropped 16:10, so a wide card
        // shows the frame as shot instead of cropping it to a portrait sliver.
        large ? "h-72 sm:h-84 lg:h-92" : "h-68 sm:h-80 lg:h-84",
      )}
    >
      {/* sheen-group sweeps a light band across the artwork on hover — the same
          gloss the buttons use, so the vocabulary stays consistent. */}
      <div className="sheen-group absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={project.image}
          alt=""
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={
            large
              ? "(max-width: 640px) 92vw, (max-width: 1024px) 34rem, 38rem"
              : "(max-width: 640px) 86vw, (max-width: 1024px) 30rem, 34rem"
          }
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      {/* Two scrims: a resting one that only darkens the lower third, and a
          second that deepens on hover to carry the extra lines the reveal adds.
          Neutral black over the picture, brand at the very bottom so the metric
          strip sits on solid colour rather than on a busy photograph. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 from-6% via-black/30 via-42% to-transparent to-76%"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 via-black/50 via-62% to-transparent to-92% opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-md transition-colors duration-500 group-hover:bg-brand-600/90 group-hover:ring-brand-400">
        {project.sector}
      </span>
      <span className="absolute right-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-[0.6875rem] font-bold tabular-nums text-white ring-1 ring-white/20 backdrop-blur-md">
        {project.year}
      </span>

      <div className="relative max-w-lg">
        <p className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-brand-100/85 [text-shadow:0_1px_8px_rgb(0_0_0/0.9)]">
          <MapPin aria-hidden className="size-3.5 shrink-0 text-brand-300" />
          {project.location}
        </p>

        <h3
          className={cn(
            "mt-2 font-display font-bold leading-snug tracking-tight text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.85)]",
            large ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          )}
        >
          {project.title}
        </h3>

        {/* 0fr → 1fr animates a natural height with nothing measured. Pointer
            devices only: below `lg`, and under reduced motion, it is just open. */}
        <div className="grid transition-all duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 motion-reduce:grid-rows-[1fr] motion-reduce:opacity-100 motion-reduce:transition-none">
          <div className="overflow-hidden">
            <p className="line-clamp-3 pt-2.5 text-[0.875rem] leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgb(0_0_0/0.9)]">
              {project.summary}
            </p>
          </div>
        </div>

        {/* The numbers the section promises — never hidden behind a hover.
            Hairline dividers rather than boxed tiles: at card width the boxes
            read as a toolbar, and every label had to be truncated to fit. */}
        <dl className="mt-5 grid grid-cols-3 divide-x divide-white/15 rounded-2xl bg-white/8 ring-1 ring-white/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/12 group-hover:ring-white/25">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="px-3 py-3">
              <dd className="font-display text-[0.9375rem] font-bold leading-none tracking-tight text-white sm:text-base">
                {metric.value}
              </dd>
              <dt className="mt-1.5 text-[0.5625rem] font-bold uppercase leading-tight tracking-[0.08em] text-brand-200/75">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-brand-400/60"
      />
    </article>
  );
}
