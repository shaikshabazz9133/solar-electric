"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useCallback, type PointerEvent, type ReactNode } from "react";

const SPRING = { stiffness: 260, damping: 20, mass: 0.35 } as const;

/**
 * Nudges its child toward the cursor, so primary calls to action feel like
 * they want to be clicked. Inline-block so it never disturbs button layout.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  /** Fraction of the pointer offset the child follows. Keep it under ~0.4. */
  strength?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const handleMove = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [x, y, strength],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x, y }}
      className={className ?? "inline-flex"}
    >
      {children}
    </motion.span>
  );
}
