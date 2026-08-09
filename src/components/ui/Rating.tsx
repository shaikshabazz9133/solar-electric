"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Stars pop in one after another the first time they scroll into view. It is a
 * small thing, but it draws the eye to the rating — which is the single most
 * persuasive element on a contractor's page.
 */
export function Rating({
  value = 5,
  className,
  size = "sm",
  tone = "gold",
}: {
  value?: number;
  className?: string;
  size?: "sm" | "md";
  tone?: "gold" | "brand";
}) {
  const reduce = usePrefersReducedMotion();

  const stars = Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      aria-hidden
      className={cn(
        size === "sm" ? "size-4" : "size-5",
        index < Math.round(value)
          ? tone === "gold"
            ? "fill-amber-400 text-amber-400"
            : "fill-brand-500 text-brand-500"
          : "fill-ink-200 text-ink-200",
      )}
    />
  ));

  if (reduce) {
    return (
      <div
        className={cn("flex items-center gap-0.5", className)}
        role="img"
        aria-label={`${value} out of 5 stars`}
      >
        {stars}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
    >
      {stars.map((star, index) => (
        <motion.span
          key={index}
          className="inline-flex"
          variants={{
            hidden: { opacity: 0, scale: 0.3, rotate: -35 },
            show: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: "spring", stiffness: 420, damping: 14 },
            },
          }}
        >
          {star}
        </motion.span>
      ))}
    </motion.div>
  );
}
