import { Marquee } from "@/components/ui/Marquee";
import { Icon } from "@/lib/icons";
import { trustBadges } from "@/lib/data/testimonials";

export function TrustBar() {
  return (
    <section
      aria-label="Credentials and guarantees"
      className="relative border-y border-ink-100 bg-white py-5"
    >
      <Marquee speed="46s">
        <ul className="flex items-center">
          {trustBadges.map((badge) => {
            return (
              <li
                key={badge.label}
                className="group/badge flex items-center gap-3 px-6 sm:px-9"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:bg-brand-600 group-hover/badge:text-white">
                  <Icon name={badge.icon} aria-hidden className="size-[1.15rem]" />
                </span>
                <span className="whitespace-nowrap">
                  <span className="block text-[0.9375rem] font-semibold text-ink-950">
                    {badge.label}
                  </span>
                  <span className="block text-[0.8125rem] text-ink-500">
                    {badge.detail}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="ml-6 hidden h-8 w-px bg-ink-200 sm:ml-9 sm:block"
                />
              </li>
            );
          })}
        </ul>
      </Marquee>
    </section>
  );
}
