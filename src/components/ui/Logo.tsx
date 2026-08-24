import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** Mark: a north star whose lower ray is drawn as a lightning bolt. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-10", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="ns-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#476fb8" />
          <stop offset="55%" stopColor="#254683" />
          <stop offset="100%" stopColor="#18305e" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#ns-mark)" />
      <path
        d="M20 7.5c.9 4.3 2.4 6.6 6.4 8.2-3.3 1.3-5 3-6 5.7"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M21.6 8.4 18.2 18.6h4.4l-4.6 12.9 10.1-14.8h-5.2l3.3-8.3z"
        fill="#ffffff"
      />
      <circle cx="11.5" cy="12" r="1.5" fill="#ffffff" opacity="0.75" />
      <circle cx="29.5" cy="27.5" r="1.1" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "light",
  href = "/",
}: {
  className?: string;
  tone?: "light" | "dark";
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl transition-opacity hover:opacity-90",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      {/* The mark sits over a glow that charges up on hover — a two-frame
          nod to the bolt in the logo without animating anything constantly. */}
      <span className="relative shrink-0">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 scale-90 rounded-xl bg-brand-500/60 opacity-0 blur-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
        />
        <LogoMark className="size-10 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 sm:size-11" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-extrabold tracking-tight sm:text-lg",
            tone === "light" ? "text-ink-950" : "text-white",
          )}
        >
          Eagle
        </span>
        <span
          className={cn(
            "mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em]",
            tone === "light" ? "text-ink-500" : "text-brand-200/80",
          )}
        >
          Electric &amp; Solar
        </span>
      </span>
    </Link>
  );
}
