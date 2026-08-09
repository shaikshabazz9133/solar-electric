"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useRef, type ReactNode } from "react";

/**
 * Moves its child against the scroll direction as the section crosses the
 * viewport. `distance` is the total travel in pixels across the whole pass —
 * keep it small (20–80px) so nothing detaches from the layout it belongs to.
 */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]),
    { stiffness: 90, damping: 24, restDelta: 0.5 },
  );

  return (
    <div ref={ref} className={className}>
      {reduce ? children : <motion.div style={{ y }}>{children}</motion.div>}
    </div>
  );
}

/**
 * A rail that draws itself in as it enters view — used for the process
 * connector and section dividers. Renders as a scaled `div`, so it costs one
 * composited transform and nothing else.
 */
export function DrawLine({
  className,
  orientation = "horizontal",
  delay = 0,
  duration = 1.1,
}: {
  className?: string;
  /**
   * `both` scales on each axis at once, which is what a rail that flips from
   * vertical to horizontal at a breakpoint needs — the axis that is 1px wide
   * simply has nothing to show for its scale.
   */
  orientation?: "horizontal" | "vertical" | "both";
  delay?: number;
  duration?: number;
}) {
  const reduce = usePrefersReducedMotion();

  if (reduce) return <div aria-hidden className={className} />;

  const from =
    orientation === "horizontal"
      ? { scaleX: 0 }
      : orientation === "vertical"
        ? { scaleY: 0 }
        : { scaleX: 0, scaleY: 0 };

  const to =
    orientation === "horizontal"
      ? { scaleX: 1 }
      : orientation === "vertical"
        ? { scaleY: 1 }
        : { scaleX: 1, scaleY: 1 };

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: "left top" }}
      initial={{ ...from, opacity: 0 }}
      whileInView={{ ...to, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
