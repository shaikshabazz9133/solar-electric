import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal rail. The children are duplicated once and the track
 * translates -50%, so the loop is seamless. Paused on hover and for users who
 * have asked for reduced motion (handled globally in globals.css).
 */
export function Marquee({
  children,
  className,
  speed = "38s",
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        aria-hidden={false}
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: speed }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
