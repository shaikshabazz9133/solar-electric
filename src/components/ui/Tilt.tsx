"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useCallback, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 150, damping: 18, mass: 0.4 } as const;

/**
 * Pointer-reactive card: a restrained 3D tilt plus a highlight that tracks the
 * cursor. Only transform and opacity animate, and the whole effect is skipped
 * for coarse pointers (handled by `onPointerMove` never firing on tap) and for
 * users who have asked for reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 6,
  scale = 1.02,
  glare = true,
  glareColor = "rgba(255,255,255,0.28)",
  glareClassName,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  scale?: number;
  glare?: boolean;
  glareColor?: string;
  /** Corner radius for the glare layer, so it matches the card it sits on. */
  glareClassName?: string;
}) {
  const reduce = usePrefersReducedMotion();

  // Normalised pointer position within the card, -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const lift = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING);
  const cardScale = useSpring(useTransform(lift, [0, 1], [1, scale]), SPRING);

  const glareX = useTransform(px, (v) => `${(v + 0.5) * 100}%`);
  const glareY = useTransform(py, (v) => `${(v + 0.5) * 100}%`);
  const glareOpacity = useSpring(lift, SPRING);
  const glareBackground = useMotionTemplate`radial-gradient(18rem circle at ${glareX} ${glareY}, ${glareColor}, transparent 60%)`;

  const handleMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
      lift.set(1);
    },
    [px, py, lift],
  );

  const handleLeave = useCallback(() => {
    px.set(0);
    py.set(0);
    lift.set(0);
  }, [px, py, lift]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={cn("perspective-distant", className)}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, scale: cardScale, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}

        {glare ? (
          <motion.span
            aria-hidden
            style={{ background: glareBackground, opacity: glareOpacity }}
            className={cn(
              "pointer-events-none absolute inset-0 z-20 mix-blend-soft-light",
              glareClassName ?? "rounded-3xl",
            )}
          />
        ) : null}
      </motion.div>
    </div>
  );
}

/**
 * Cheaper sibling of `Tilt`: no rotation, just a cursor-tracked wash driven by
 * the `spotlight-surface` utility. Use it on dense grids where a dozen tilting
 * cards would be too much.
 */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const handleMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`,
    );
  }, []);

  return (
    <div onPointerMove={handleMove} className={className}>
      {children}
    </div>
  );
}
