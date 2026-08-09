"use client";

import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` the first time it scrolls into view.
 * Falls back to the final value immediately when motion is reduced.
 */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = usePrefersReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    // `animate` schedules its first frame on rAF, so no synchronous setState.
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimated(Number(latest.toFixed(decimals))),
    });

    return () => controls.stop();
  }, [inView, value, decimals, duration, reduce]);

  // Reduced motion (and the pre-hydration render) shows the final value outright.
  const display = reduce ? value : animated;

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
    </span>
  );
}
