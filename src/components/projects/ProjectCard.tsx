import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

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
        "group relative isolate flex h-full flex-col overflow-hidden rounded-4xl bg-brand-950 text-white",
        "transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float",
      )}
    >
      {/* Artwork */}
      <div
        className={cn(
          "sheen-group relative overflow-hidden",
          large ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={project.image}
          alt=""
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={
            large
              ? "(max-width: 1024px) 100vw, 60vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/35 to-transparent"
        />

        <span className="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-sm">
          {project.sector}
        </span>
        <span className="absolute right-5 top-5 rounded-full bg-brand-950/60 px-3 py-1.5 text-[0.6875rem] font-bold text-brand-100 ring-1 ring-white/15 backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col p-6", large && "sm:p-8")}>
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-brand-200/70">
          <MapPin aria-hidden className="size-3.5" />
          {project.location}
        </p>

        <h3
          className={cn(
            "mt-3 font-display font-bold tracking-tight text-white",
            large ? "text-xl sm:text-2xl" : "text-lg",
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            "mt-3 flex-1 leading-relaxed text-brand-100/80",
            large ? "text-[0.9375rem] sm:text-base" : "text-[0.875rem]",
          )}
        >
          {project.summary}
        </p>

        {large ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.scope.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.75rem] text-brand-100/80"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-brand-950/80 px-3 py-3.5">
              <dt className="text-[0.625rem] font-bold uppercase tracking-[0.08em] text-brand-200/75">
                {metric.label}
              </dt>
              <dd className="mt-1 font-display text-[0.9375rem] font-bold text-white sm:text-base">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Hover ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-brand-400/50"
      />
    </article>
  );
}
