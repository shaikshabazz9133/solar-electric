"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { ArrowRight, BatteryCharging, Info, Sun } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Aurora, CircuitField } from "@/components/ui/CircuitField";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";

/* ---- Model assumptions (documented on the card so nothing is hidden) ---- */
const RATE = 0.152; // $/kWh blended Central Texas retail rate
const RATE_ESCALATION = 0.03; // annual utility increase
const COST_PER_WATT = 2.7; // installed, before incentives
const BATTERY_COST = 11_400;
const ITC = 0.3; // federal clean energy credit
const DERATE = 0.86; // system losses
const LBS_CO2_PER_KWH = 0.855;

const exposures = [
  { id: "excellent", label: "Excellent", detail: "Unshaded south roof", sunHours: 5.5 },
  { id: "good", label: "Good", detail: "Mostly clear, some trees", sunHours: 4.9 },
  { id: "partial", label: "Partial shade", detail: "Trees or dormers", sunHours: 4.1 },
] as const;

type ExposureId = (typeof exposures)[number]["id"];

export function SavingsCalculator() {
  const sliderId = useId();
  const [bill, setBill] = useState(240);
  const [exposure, setExposure] = useState<ExposureId>("good");
  const [battery, setBattery] = useState(true);

  const result = useMemo(() => {
    const sunHours =
      exposures.find((item) => item.id === exposure)?.sunHours ?? 4.9;

    const annualUsage = (bill * 12) / RATE;
    const offset = exposure === "partial" ? 0.82 : 0.95;
    const targetProduction = annualUsage * offset;

    const systemKw = targetProduction / (sunHours * 365 * DERATE);
    const annualProduction = systemKw * sunHours * 365 * DERATE;

    const grossCost = systemKw * 1000 * COST_PER_WATT + (battery ? BATTERY_COST : 0);
    const netCost = grossCost * (1 - ITC);

    const yearOneSavings = annualProduction * RATE;

    let cumulative = 0;
    for (let year = 0; year < 25; year += 1) {
      // 0.5%/yr module degradation against a 3%/yr utility escalation
      cumulative +=
        annualProduction *
        Math.pow(1 - 0.005, year) *
        RATE *
        Math.pow(1 + RATE_ESCALATION, year);
    }

    const payback = netCost / yearOneSavings;
    const co2Tons = (annualProduction * LBS_CO2_PER_KWH * 25) / 2000;

    return {
      systemKw,
      panels: Math.max(6, Math.round((systemKw * 1000) / 440)),
      annualProduction,
      netCost,
      incentive: grossCost * ITC,
      yearOneSavings,
      lifetimeSavings: cumulative - netCost,
      payback,
      co2Tons,
      backupHours: battery ? 12 : 0,
    };
  }, [bill, exposure, battery]);

  return (
    <section
      id="savings"
      className="relative isolate overflow-hidden bg-brand-950 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-drift absolute inset-0 opacity-60" />
        <Aurora />
        <CircuitField className="text-brand-400/50" opacity={0.35} />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Controls */}
          <div>
            <Reveal>
              <Eyebrow tone="dark">Instant estimate</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-display-lg text-white">
                See what solar would do to{" "}
                <span className="text-gradient-light">your</span> power bill
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-brand-100/85 sm:text-base">
                Move the slider. Every number updates against published Central
                Texas rates and the current 30% federal credit — the same maths
                we use in a formal proposal, just without the site survey.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-8">
                {/* Bill slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <label
                      htmlFor={sliderId}
                      className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-200/70"
                    >
                      Average monthly bill
                    </label>
                    <output
                      htmlFor={sliderId}
                      className="font-display text-2xl font-extrabold text-white tabular-nums"
                    >
                      {formatCurrency(bill)}
                    </output>
                  </div>
                  <input
                    id={sliderId}
                    type="range"
                    min={80}
                    max={700}
                    step={10}
                    value={bill}
                    onChange={(event) => setBill(Number(event.target.value))}
                    aria-valuetext={`${formatCurrency(bill)} per month`}
                    className={cn(
                      "mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15",
                      "[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
                      "[&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-500",
                      "[&::-webkit-slider-thumb]:shadow-[0_4px_14px_rgba(50,88,159,0.6)] [&::-webkit-slider-thumb]:transition-transform",
                      "hover:[&::-webkit-slider-thumb]:scale-110",
                      "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4",
                      "[&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-500",
                    )}
                    style={{
                      background: `linear-gradient(to right, var(--color-brand-400) 0%, var(--color-brand-500) ${((bill - 80) / 620) * 100}%, rgba(255,255,255,0.15) ${((bill - 80) / 620) * 100}%)`,
                    }}
                  />
                  <div className="mt-2 flex justify-between text-[0.75rem] text-brand-200/75">
                    <span>$80</span>
                    <span>$700</span>
                  </div>
                </div>

                {/* Exposure */}
                <fieldset>
                  <legend className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-200/70">
                    Roof sun exposure
                  </legend>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                    {exposures.map((option) => {
                      const active = exposure === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setExposure(option.id)}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition-all duration-300",
                            active
                              ? "border-brand-400 bg-brand-500/20 shadow-[0_0_0_1px_var(--color-brand-400)]"
                              : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10",
                          )}
                        >
                          <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-white">
                            <Sun
                              aria-hidden
                              className={cn(
                                "size-4",
                                active ? "text-brand-200" : "text-brand-200/80",
                              )}
                            />
                            {option.label}
                          </span>
                          <span className="mt-1 block text-[0.75rem] text-brand-200/80">
                            {option.detail}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Battery toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={battery}
                  onClick={() => setBattery((value) => !value)}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                    battery
                      ? "border-brand-400 bg-brand-500/20"
                      : "border-white/10 bg-white/5 hover:border-white/25",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl transition-colors",
                        battery
                          ? "bg-brand-500 text-white"
                          : "bg-white/10 text-brand-300",
                      )}
                    >
                      <BatteryCharging aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-white">
                        Add 13.5 kWh battery backup
                      </span>
                      <span className="block text-[0.75rem] text-brand-200/80">
                        Keeps essentials running through an outage
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
                      battery ? "bg-brand-500" : "bg-white/20",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 size-5 rounded-full bg-white transition-all duration-300",
                        battery ? "left-6" : "left-1",
                      )}
                    />
                  </span>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Results */}
          <Reveal delay={0.1} direction="left">
            <div className="glass-dark rounded-4xl p-6 shadow-glow sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand-200/80">
                    Estimated 25-year savings
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold text-white tabular-nums sm:text-5xl">
                    <Counter
                      key={`lifetime-${Math.round(result.lifetimeSavings)}`}
                      value={Math.round(result.lifetimeSavings)}
                      prefix="$"
                      duration={0.9}
                    />
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/30">
                  Net of cost
                </span>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <ResultCell
                  label="Recommended system"
                  value={`${result.systemKw.toFixed(1)} kW`}
                  hint={`${result.panels} × 440 W panels`}
                />
                <ResultCell
                  label="Annual production"
                  value={`${Math.round(result.annualProduction).toLocaleString("en-US")} kWh`}
                  hint="Weather-adjusted"
                />
                <ResultCell
                  label="Net cost after credit"
                  value={formatCurrency(Math.round(result.netCost))}
                  hint={`${formatCurrency(Math.round(result.incentive))} federal credit applied`}
                />
                <ResultCell
                  label="Payback period"
                  value={`${result.payback.toFixed(1)} yrs`}
                  hint="Then it is free power"
                />
                <ResultCell
                  label="First-year savings"
                  value={formatCurrency(Math.round(result.yearOneSavings))}
                  hint={`${formatCurrency(Math.round(result.yearOneSavings / 12))} per month`}
                />
                <ResultCell
                  label={battery ? "Backup runtime" : "CO₂ avoided"}
                  value={
                    battery
                      ? `${result.backupHours} hrs`
                      : `${Math.round(result.co2Tons)} t`
                  }
                  hint={battery ? "Essential loads" : "Across 25 years"}
                />
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="md" fullWidth>
                  Get an exact proposal
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
                <Button
                  href="/services/solar"
                  size="md"
                  variant="outline-light"
                  fullWidth
                >
                  How it works
                </Button>
              </div>

              <p className="mt-6 flex gap-2.5 text-[0.75rem] leading-relaxed text-brand-200/75">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
                <span>
                  Estimate only. Assumes ${RATE.toFixed(3)}/kWh blended rate, 3%
                  annual utility escalation, {ITC * 100}% federal credit and{" "}
                  {Math.round((1 - DERATE) * 100)}% system losses. Your formal
                  proposal uses your actual interval data and a physical roof
                  survey.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * Each figure rolls over when it changes, so dragging the slider visibly
 * recalculates the whole panel rather than silently swapping text.
 */
function ResultCell({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="group/cell bg-brand-950/70 px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-brand-900/70">
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-brand-200/80">
        {label}
      </dt>
      <dd>
        <span className="mt-1.5 block h-7 overflow-hidden font-display text-xl font-bold text-white tabular-nums">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={value}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="mt-1 block text-[0.75rem] text-brand-200/75">{hint}</span>
      </dd>
    </div>
  );
}
