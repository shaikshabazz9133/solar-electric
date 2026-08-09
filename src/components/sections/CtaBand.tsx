import { ArrowRight, Clock, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora, CircuitField } from "@/components/ui/CircuitField";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const assurances = [
  { icon: Clock, label: "Same-day response" },
  { icon: ShieldCheck, label: "Licensed & $5M insured" },
  { icon: Phone, label: "Talk to a real electrician" },
];

export function CtaBand({
  title = "Ready for power that just works?",
  body = "Tell us what you need and we'll come back with a fixed price, a clear scope and a start date — usually within 48 hours.",
  primaryLabel = "Get your free quote",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-drift absolute inset-0 opacity-60" />
        <Aurora tone="mixed" />
        <CircuitField className="text-brand-400/60" opacity={0.45} />
        {/* Flag stripe, used once, as a hairline — with light travelling along it */}
        <div className="absolute inset-x-0 top-0 h-1 overflow-hidden opacity-70">
          <div className="sheen relative size-full bg-linear-to-r from-brand-600 via-white/40 to-flag-600" />
        </div>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal blur>
            <h2 className="text-display-xl text-white">{title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-100/80 sm:text-lg">
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button href="/contact" size="lg" variant="light">
                  {primaryLabel}
                  <ArrowRight
                    aria-hidden
                    className="size-[1.15rem] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button
                  href={siteConfig.phoneHref}
                  size="lg"
                  variant="outline-light"
                >
                  <Phone aria-hidden className="size-[1.15rem] transition-transform duration-300 group-hover:-rotate-12" />
                  {siteConfig.phone}
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {assurances.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 text-[0.875rem] text-brand-100/85"
                >
                  <item.icon aria-hidden className="size-[1.15rem] text-brand-300" />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
