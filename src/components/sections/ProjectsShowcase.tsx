"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const GAP_PX = 20;

export function ProjectsShowcase() {
  const featured = getFeaturedProjects();
  const reduce = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    // Card widths are viewport-relative below `sm`, so a resize changes both
    // the step and where the ends are.
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".project-slide");
    const step = card ? card.offsetWidth + GAP_PX : rail.clientWidth * 0.8;
    rail.scrollBy({
      left: direction * step,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section className="section-y relative isolate overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-ink absolute inset-0 opacity-60" />
      </div>

      <Container className="relative">
        <SectionHeading
          align="left"
          eyebrow="Recent work"
          title={
            <>
              Real projects, with the{" "}
              <span className="text-gradient-brand">numbers attached</span>
            </>
          }
          description="Every case study below lists what we promised and what the system actually delivered. Ask any contractor for the same and see what you get."
        />

        {/* Horizontal rail. Bleeds to the container's padding edge so a card can
            sit half-out of frame — that overhang is what tells you there is more
            without printing a scrollbar. */}
        <div className="relative mt-8">
          <div
            ref={railRef}
            role="region"
            aria-label="Featured case studies"
            tabIndex={0}
            className="no-scrollbar -mx-5 snap-x snap-mandatory overflow-x-auto px-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10"
          >
            <StaggerGroup className="flex gap-5" stagger={0.09}>
              {featured.map((project, index) => (
                <StaggerItem
                  key={project.slug}
                  className="project-slide w-[86vw] shrink-0 snap-start sm:w-120 lg:w-136"
                  lift
                >
                  <Tilt max={4} scale={1.01} glareClassName="rounded-4xl">
                    <ProjectCard project={project} priority={index < 2} />
                  </Tilt>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* On the artwork, on its vertical centre — a control belongs where
              the thing it controls is. They fade out entirely at each end, so
              there is never a dead button sitting on a photograph. */}
          <RailButton
            label="Previous projects"
            side="left"
            disabled={atStart}
            onClick={() => page(-1)}
          />
          <RailButton
            label="More projects"
            side="right"
            disabled={atEnd}
            onClick={() => page(1)}
          />
        </div>

      </Container>
    </section>
  );
}

function RailButton({
  label,
  side,
  disabled,
  onClick,
}: {
  label: string;
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Arrow = side === "left" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // `hidden sm:grid` — on a phone the card is 86vw and a disc this size
        // would cover a real slice of it. Swiping is the gesture there.
        "group/nav absolute top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full sm:grid",
        "size-12 lg:size-14",
        "bg-white/90 text-ink-800 shadow-float ring-1 ring-white/70 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:bg-brand-600 hover:text-white hover:ring-brand-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        disabled ? "pointer-events-none scale-90 opacity-0" : "opacity-100",
        side === "left" ? "left-2 lg:left-3" : "right-2 lg:right-3",
      )}
    >
      <Arrow
        aria-hidden
        className={cn(
          "size-5 transition-transform duration-300",
          side === "left"
            ? "group-hover/nav:-translate-x-0.5"
            : "group-hover/nav:translate-x-0.5",
        )}
      />
    </button>
  );
}
