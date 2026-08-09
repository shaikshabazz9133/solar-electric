"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: string };

export function Accordion({
  items,
  defaultOpen = 0,
  className,
  tone = "light",
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduce = usePrefersReducedMotion();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "relative overflow-hidden rounded-2xl border transition-colors duration-300",
              tone === "light"
                ? isOpen
                  ? "border-brand-200 bg-white shadow-lift"
                  : "border-ink-200/70 bg-white/60 hover:border-brand-200 hover:bg-white"
                : isOpen
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/20",
            )}
          >
            {/* Accent rail that grows down the open item */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 w-1 origin-top rounded-l-2xl transition-transform duration-500 ease-out",
                tone === "light" ? "bg-brand-600" : "bg-brand-300",
                isOpen ? "scale-y-100" : "scale-y-0",
              )}
            />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6",
                  "text-[0.9375rem] font-semibold sm:text-base",
                  tone === "light"
                    ? "text-ink-950 hover:text-brand-700"
                    : "text-white hover:text-brand-200",
                )}
              >
                <span className="pt-0.5">{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                    tone === "light"
                      ? isOpen
                        ? "rotate-45 bg-brand-600 text-white"
                        : "bg-brand-50 text-brand-700"
                      : isOpen
                        ? "rotate-45 bg-white text-brand-900"
                        : "bg-white/10 text-white",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "px-5 pb-6 text-[0.9375rem] leading-relaxed sm:px-6",
                      tone === "light" ? "text-ink-600" : "text-brand-100/80",
                    )}
                  >
                    {item.answer}
                  </motion.p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
