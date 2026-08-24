"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Tilt } from "@/components/ui/Tilt";
import { useState } from "react";
import { ServiceCard } from "@/components/sections/ServicesGrid";
import { serviceCategories, services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

export function ServicesExplorer() {
  const [category, setCategory] = useState<(typeof serviceCategories)[number]>("All");
  const reduce = usePrefersReducedMotion();

  const visible =
    category === "All"
      ? services
      : services.filter((service) => service.category === category);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter services by category"
        className="flex flex-wrap gap-2.5"
      >
        {serviceCategories.map((option) => {
          const active = option === category;
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(option)}
              className={cn(
                "rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold transition-all duration-300",
                active
                  ? "bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgba(50,88,159,0.7)]"
                  : "border border-ink-200 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {option}
              <span className="ml-2 text-[0.75rem] font-semibold">
                {option === "All"
                  ? services.length
                  : services.filter((service) => service.category === option).length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((service) => (
            <motion.div
              key={service.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Tilt className="h-full" max={5} scale={1.015}>
                <ServiceCard service={service} />
              </Tilt>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
