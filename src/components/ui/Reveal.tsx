"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 26;
const EASE = [0.22, 1, 0.36, 1] as const;

function offsetFor(direction: Direction) {
  switch (direction) {
    case "up":
      return { y: OFFSET, x: 0 };
    case "down":
      return { y: -OFFSET, x: 0 };
    case "left":
      return { x: OFFSET, y: 0 };
    case "right":
      return { x: -OFFSET, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

/**
 * Scroll-triggered entrance. Animates once, respects prefers-reduced-motion,
 * and animates only transform/opacity so it stays off the main thread.
 *
 * `blur` and `zoom` add a softer, more cinematic settle — reserve them for
 * headlines and hero-level content, not for every card in a grid.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
  as = "div",
  amount = 0.25,
  blur = false,
  zoom = false,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  as?: ElementType;
  amount?: number;
  blur?: boolean;
  zoom?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const { x, y } = offsetFor(direction);

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        ...(zoom ? { scale: 0.94 } : {}),
        ...(blur ? { filter: "blur(10px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(zoom ? { scale: 1 } : {}),
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, amount, margin: "0px 0px -80px 0px" }}
      transition={{
        duration,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers `RevealItem` children. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className,
  amount = 0.15,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  stagger?: number;
  as?: ElementType;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

const stagger3d: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function StaggerItem({
  children,
  className,
  lift = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Adds a slight scale-up to the entrance — good for cards. */
  lift?: boolean;
  as?: ElementType;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={lift ? stagger3d : staggerChild}>
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */

const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const wordChild: Variants = {
  hidden: { opacity: 0, y: "0.65em", rotateX: -55 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

/**
 * Headline entrance that rises word by word. Each word gets its own clipping
 * box so the text appears to swing up out of the line — the single most
 * effective "this site is alive" moment on the page, so it is used sparingly.
 *
 * Pass plain strings as `children`; drop a `<Word>` in for a styled fragment
 * that should animate on the same cadence.
 */
export function SplitWords({
  children,
  className,
  delay = 0,
  as = "h1",
  play = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** `mount` for above-the-fold copy, `view` for anything below it. */
  play?: "mount" | "view";
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const animateProps =
    play === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.4 } as const,
        };

  return (
    <MotionTag
      className={cn("perspective-midrange", className)}
      variants={wordParent}
      initial="hidden"
      transition={{ delayChildren: delay }}
      {...animateProps}
    >
      {splitNode(children)}
    </MotionTag>
  );
}

/** Wrap a styled fragment so it animates as one word inside `SplitWords`. */
export function Word({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    // The padding gives descenders and the rotation room inside the clip box;
    // the matching negative margin keeps the line box exactly where it was.
    <span
      className={cn(
        "inline-block overflow-hidden pb-[0.16em] mb-[-0.16em] align-bottom",
        className,
      )}
    >
      <motion.span variants={wordChild} className="inline-block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
}

/** Turns raw strings in the tree into individually animated words. */
function splitNode(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((chunk, index) =>
      chunk.trim() === "" ? (
        chunk
      ) : (
        <Word key={`${chunk}-${index}`}>{chunk}</Word>
      ),
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <span key={index} className="contents">
        {splitNode(child)}
      </span>
    ));
  }

  return node;
}
