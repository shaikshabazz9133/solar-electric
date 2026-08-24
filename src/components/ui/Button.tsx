import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "light"
  | "outline-light"
  | "danger";
type Size = "sm" | "md" | "lg";

// `sheen-hover` paints a gloss that sweeps across on hover; `overflow-hidden`
// keeps it inside the pill. The outline focus ring is unaffected by it.
const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-all duration-300 ease-out will-change-transform sheen-hover active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

// Buttons run on the flag red (#a32c44 — `flag-700`) against white, rather than
// the brand blue the rest of the interface is built from. That separation is
// the point: blue is the surface colour of the site, so an action painted in it
// competes with every panel and icon chip around it. Red appears nowhere else
// at this weight, which is what makes a CTA findable at a glance.
//
// White on `flag-700` measures 6.98:1, and `flag-700` on white measures the
// same, so both directions clear WCAG AA for body-sized text — the filled and
// the inverted variants below are equally safe.
const variants: Record<Variant, string> = {
  primary:
    "bg-flag-700 text-white shadow-[0_10px_30px_-10px_rgba(163,44,68,0.7)] hover:bg-flag-800 hover:shadow-[0_18px_40px_-12px_rgba(163,44,68,0.6)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-flag-900 text-white shadow-[0_10px_30px_-12px_rgba(105,28,43,0.8)] hover:bg-flag-800 hover:-translate-y-0.5 active:translate-y-0",
  // The inverse pairing: white surface, red lettering. Used where a filled red
  // button would be the second red thing in the same block.
  ghost:
    "bg-white text-flag-700 ring-1 ring-ink-200 shadow-soft hover:ring-flag-300 hover:bg-flag-50 hover:-translate-y-0.5 active:translate-y-0",
  light:
    "bg-white text-flag-700 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-flag-50 hover:-translate-y-0.5 active:translate-y-0",
  // Sits on photography, so it starts as a white outline and resolves into the
  // red fill on hover rather than washing out to translucent white.
  "outline-light":
    "text-white ring-1 ring-white/40 bg-white/5 backdrop-blur-sm hover:bg-flag-700 hover:ring-flag-600 hover:-translate-y-0.5 active:translate-y-0",
  danger:
    "bg-flag-900 text-white shadow-[0_10px_30px_-12px_rgba(105,28,43,0.85)] hover:bg-flag-800 hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base sm:px-8",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    fullWidth,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as ButtonAsLink;
    const isExternal =
      external ??
      (/^https?:\/\//.test(href) === true &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:"));

    if (isExternal || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
