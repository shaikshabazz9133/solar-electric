import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em]",
        tone === "light"
          ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
          : "bg-white/10 text-brand-100 ring-1 ring-white/15 backdrop-blur-sm",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "light" ? "bg-flag-600" : "bg-brand-300",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
  headingLevel: Heading = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.06} blur duration={0.7}>
        <Heading
          id={id}
          className={cn(
            "text-display-lg",
            tone === "dark" && "text-white",
            align === "center" ? "max-w-3xl" : "max-w-2xl",
          )}
        >
          {title}
        </Heading>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-base leading-relaxed sm:text-lg",
              align === "center" ? "max-w-2xl" : "max-w-xl",
              tone === "dark" ? "text-brand-100/80" : "text-ink-600",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
