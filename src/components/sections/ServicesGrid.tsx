import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/lib/icons";
import { services, type Service } from "@/lib/data/services";
import { Container, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { Button } from "@/components/ui/Button";

/**
 * Full-bleed artwork with the copy set over it. The description is collapsed at
 * rest and expands on hover — which keeps the card short and makes the grid
 * scannable by title alone. Pointer devices only: below `lg`, and for anyone
 * who has asked for reduced motion, it is simply always open.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative isolate flex h-72 flex-col justify-end overflow-hidden rounded-3xl bg-brand-950 p-5 text-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float sm:h-80 sm:p-6"
    >
      <Image
        src={service.image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="-z-20 object-cover transition-transform duration-900 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {/* Scrim — heavy across the lower half so the copy always clears the
          artwork, then deepens further on hover as the description expands */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 from-35% via-brand-950/80 via-65% to-brand-950/10"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 via-brand-950/90 via-70% to-brand-950/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className="absolute left-5 top-5 grid size-10 place-items-center rounded-xl bg-white/12 ring-1 ring-white/25 backdrop-blur-sm transition-all duration-500 group-hover:bg-brand-600 group-hover:ring-brand-400 sm:left-6 sm:top-6">
        <Icon name={service.icon} aria-hidden className="size-[1.15rem]" />
      </span>

      <div className="relative">
        <span className="inline-flex rounded-full bg-white/12 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-widest ring-1 ring-white/20 backdrop-blur-sm">
          {service.category}
        </span>

        {/* `text-white` is explicit: the base layer sets a dark colour on every
            heading, which inheritance from the card would not beat. */}
        <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-white">
          {service.title}
        </h3>

        {/* 0fr → 1fr animates a natural height without measuring anything */}
        <div className="grid transition-all duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 motion-reduce:grid-rows-[1fr] motion-reduce:opacity-100 motion-reduce:transition-none">
          <div className="overflow-hidden">
            <p className="pt-2 text-[0.875rem] leading-relaxed text-brand-100/85">
              {service.short}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-3.5">
          <span className="text-[0.8125rem] font-semibold text-brand-200">
            {service.priceFrom}
          </span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/12 ring-1 ring-white/25 transition-all duration-300 group-hover:bg-white group-hover:text-brand-700 group-hover:ring-white">
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>

      {/* Edge highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-brand-400/60"
      />
    </Link>
  );
}

export function ServicesGrid() {
  return (
    <section id="services" className="section-y relative bg-ink-50/60">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-ink opacity-70" />

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="What we do"
            title={
              <>
                One licensed team for every{" "}
                <span className="text-gradient-brand">circuit, panel and array</span>
              </>
            }
            description="Most contractors do electrical or solar. Doing both means one warranty, one point of contact, and a system that is designed as a whole instead of bolted together."
          />
          <Reveal delay={0.18} className="shrink-0">
            <Button href="/services" variant="ghost" size="md">
              All services
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </Reveal>
        </div>

        {/* Three columns takes the nine service lines exactly — no orphan card
            stranded on a final row. */}
        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.slug} className="h-full" lift>
              <Tilt className="h-full" max={5} scale={1.015}>
                <ServiceCard service={service} />
              </Tilt>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
