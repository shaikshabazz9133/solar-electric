"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { usePrefersReducedMotion, useScrolledPast } from "@/lib/hooks";

const CIRCUMFERENCE = 2 * Math.PI * 21;

/**
 * Appears once the reader is well past the fold. The ring around it tracks
 * page progress, so it doubles as a "how much is left" indicator.
 *
 * Desktop only: on small screens the bottom-right corner belongs to
 * `MobileCallBar`, and two floating controls there would fight each other.
 */
export function BackToTop() {
  const visible = useScrolledPast(900);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label="Back to top"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 12 }}
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-8 right-8 z-40 hidden size-12 place-items-center rounded-full bg-brand-900 text-white shadow-float transition-colors duration-300 hover:bg-brand-950 lg:grid"
        >
          <svg
            aria-hidden
            viewBox="0 0 48 48"
            className="absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/15"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              className="text-brand-300"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp
            aria-hidden
            className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
