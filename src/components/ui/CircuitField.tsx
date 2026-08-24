import { cn } from "@/lib/utils";

/**
 * The site's signature ambient background: PCB-style traces with a pulse of
 * current running along each one, plus glowing junction nodes.
 *
 * Deliberately CSS-only (no client component, no JS) so it costs nothing on
 * the main thread, streams with the server render, and stops dead under
 * `prefers-reduced-motion` via the global rule in globals.css.
 */

/** Trace geometry, drawn in a 1200×600 field and slice-scaled to the section. */
const traces = [
  { d: "M-20 96 H196 Q236 96 236 136 V286 Q236 326 276 326 H612 Q652 326 652 366 V620", delay: "0s" },
  { d: "M1220 64 H1004 Q964 64 964 104 V214 Q964 254 924 254 H742 Q702 254 702 294 V620", delay: "0.8s" },
  { d: "M-20 430 H150 Q190 430 190 470 V620", delay: "1.9s" },
  { d: "M420 -20 V90 Q420 130 460 130 H860 Q900 130 900 170 V420 Q900 460 940 460 H1220", delay: "1.3s" },
  { d: "M1220 540 H1060 Q1020 540 1020 500 V330", delay: "2.6s" },
  { d: "M120 -20 V40 Q120 80 160 80 H360 Q400 80 400 120 V220", delay: "0.4s" },
];

/** Junction dots that breathe out of phase with each other. */
const nodes = [
  { cx: 236, cy: 136, delay: "0s" },
  { cx: 652, cy: 366, delay: "1.1s" },
  { cx: 964, cy: 104, delay: "0.6s" },
  { cx: 702, cy: 294, delay: "2.2s" },
  { cx: 190, cy: 470, delay: "1.7s" },
  { cx: 900, cy: 170, delay: "2.9s" },
  { cx: 400, cy: 120, delay: "0.9s" },
];

export function CircuitField({
  className,
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      style={{ opacity }}
    >
      {/* Static substrate — the traces themselves */}
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        {traces.map((trace) => (
          <path key={trace.d} d={trace.d} className="opacity-15" />
        ))}
      </g>

      {/* Current — a short bright dash marching along each trace.
          The glow is a second, wider, fainter stroke rather than a
          `drop-shadow`: a filter on a path whose dash offset changes every
          frame forces a re-raster on every frame, and this field appears on
          several sections at once. Two composited strokes cost nothing. */}
      <g fill="none" stroke="currentColor" strokeLinecap="round" className="text-brand-300">
        {traces.map((trace, index) => {
          const pace = index % 2 === 1 ? "animate-current-slow" : "animate-current";
          return (
            <g key={trace.d}>
              <path
                d={trace.d}
                strokeWidth="7"
                strokeDasharray="80 240"
                className={cn(pace, "opacity-12")}
                style={{ animationDelay: trace.delay }}
              />
              <path
                d={trace.d}
                strokeWidth="2.25"
                strokeDasharray="80 240"
                className={cn(pace, "opacity-80")}
                style={{ animationDelay: trace.delay }}
              />
            </g>
          );
        })}
      </g>

      {/* Junctions — concentric rings rather than a gradient, so several
          CircuitFields can share a page without colliding on an SVG id. */}
      <g className="text-brand-200">
        {nodes.map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            {/* Via pad: a thin ring, not a filled disc — a disc at this scale
                reads as a smudge on the background rather than as circuitry. */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="animate-glow-soft opacity-30"
              style={{ animationDelay: node.delay }}
            />
            <circle cx={node.cx} cy={node.cy} r="2" fill="currentColor" className="opacity-55" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * Slow-drifting colour blobs. Replaces the static blurred circles that were
 * behind every dark section — same look at rest, alive in motion.
 */
export function Aurora({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "flag" | "mixed";
}) {
  const second =
    tone === "flag"
      ? "bg-flag-600/25"
      : tone === "mixed"
        ? "bg-flag-700/18"
        : "bg-brand-500/25";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="animate-aurora absolute -left-40 -top-32 size-136 rounded-full bg-brand-600/30 blur-3xl" />
      <div
        className={cn("animate-aurora-slow absolute -right-40 top-10 size-120 rounded-full blur-3xl", second)}
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute -bottom-64 left-1/3 size-112 rounded-full bg-brand-400/18 blur-3xl"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}
