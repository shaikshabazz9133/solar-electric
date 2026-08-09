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

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(50,88,159,0.7)] hover:bg-brand-700 hover:shadow-[0_18px_40px_-12px_rgba(50,88,159,0.65)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-brand-900 text-white shadow-[0_10px_30px_-12px_rgba(24,48,94,0.8)] hover:bg-brand-950 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-white text-brand-900 ring-1 ring-ink-200 shadow-soft hover:ring-brand-300 hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0",
  light:
    "bg-white text-brand-900 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0",
  "outline-light":
    "text-white ring-1 ring-white/35 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:ring-white/60 hover:-translate-y-0.5 active:translate-y-0",
  danger:
    "bg-flag-700 text-white shadow-[0_10px_30px_-12px_rgba(163,44,68,0.75)] hover:bg-flag-800 hover:-translate-y-0.5 active:translate-y-0",
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
