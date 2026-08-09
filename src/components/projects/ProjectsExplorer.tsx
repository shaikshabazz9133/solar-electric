"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Tilt } from "@/components/ui/Tilt";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { projects, projectSectors } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsExplorer() {
  const [sector, setSector] = useState<(typeof projectSectors)[number]>("All");
  const reduce = usePrefersReducedMotion();

  const visible =
    sector === "All"
      ? projects
      : projects.filter((project) => project.sector === sector);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by sector"
        className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1"
      >
        {projectSectors.map((option) => {
          const active = option === sector;
          const count =
            option === "All"
              ? projects.length
              : projects.filter((project) => project.sector === option).length;

          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSector(option)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold transition-all duration-300",
                active
                  ? "bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgba(50,88,159,0.7)]"
                  : "border border-ink-200 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {option}
              <span className="text-[0.75rem] font-semibold">{count}</span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Tilt className="h-full" max={5} glareClassName="rounded-4xl">
                <ProjectCard project={project} priority={index < 3} />
              </Tilt>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
