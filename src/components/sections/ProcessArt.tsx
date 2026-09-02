/**
 * Flat vector scenes for the seven process steps.
 *
 * Hand-drawn as inline SVG rather than sourced as artwork: they have to sit on
 * seven different pale tints, recolour with the brand palette, and stay crisp
 * at any size inside a 1-2 kB payload. Everything is built from the same small
 * palette below so the set reads as one illustration family.
 */

const NAVY = "#1d396d";
const BLUE = "#32589f";
const SKY = "#a1b7de";
const PALE = "#e5ecf8";
const RED = "#a32c44";
const SAND = "#e8b06a";
const SKIN = "#f0c9a6";
const SKIN_DARK = "#e0b48d";

type Props = { name: string; className?: string };

/** Soft ellipse every scene stands on, so nothing floats. */
function Ground() {
  return <ellipse cx="64" cy="112" rx="36" ry="6" fill={SKY} opacity="0.35" />;
}

function Face({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx - 6} cy={cy} r="2" fill={NAVY} />
      <circle cx={cx + 6} cy={cy} r="2" fill={NAVY} />
      <path
        d={`M${cx - 5} ${cy + 7}q5 4 10 0`}
        stroke={NAVY}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function Enquiry() {
  return (
    <>
      <Ground />
      {/* Speech bubble — the enquiry itself */}
      <rect
        x="72"
        y="16"
        width="42"
        height="30"
        rx="11"
        fill="#ffffff"
        stroke={SKY}
        strokeWidth="2"
      />
      <path
        d="M82 45l-1 10 11-8z"
        fill="#ffffff"
        stroke={SKY}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="84" cy="31" r="3" fill={SKY} />
      <circle cx="93" cy="31" r="3" fill={SKY} />
      <circle cx="102" cy="31" r="3" fill={SKY} />

      {/* Person */}
      <path d="M28 110V92a22 22 0 0 1 44 0v18z" fill={BLUE} />
      <rect x="44" y="62" width="12" height="16" rx="6" fill={SKIN_DARK} />
      <circle cx="50" cy="52" r="18" fill={SKIN} />
      <path
        d="M50 34a18 18 0 0 0-18 18h6a12 12 0 0 1 24 0h6a18 18 0 0 0-18-18z"
        fill={NAVY}
      />
      <Face cx={50} cy={53} />
      {/* Arm raised to the ear, with the phone clear of the face */}
      <path
        d="M70 100l6-26"
        stroke={BLUE}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="77" cy="70" r="7" fill={SKIN} />
      <g transform="rotate(12 74 56)">
        <rect x="67" y="40" width="15" height="28" rx="4" fill={RED} />
        <rect
          x="70"
          y="44"
          width="9"
          height="18"
          rx="2"
          fill="#ffffff"
          opacity="0.8"
        />
      </g>
    </>
  );
}

function SiteVisit() {
  return (
    <>
      <Ground />
      {/* House */}
      <rect
        x="30"
        y="60"
        width="56"
        height="48"
        rx="4"
        fill="#ffffff"
        stroke={SKY}
        strokeWidth="2"
      />
      <path d="M24 62L58 32l34 30z" fill={NAVY} />
      <rect x="50" y="80" width="16" height="28" rx="2" fill={BLUE} />
      <rect x="36" y="70" width="11" height="11" rx="2" fill={SKY} />
      <rect x="70" y="70" width="11" height="11" rx="2" fill={SKY} />
      {/* Magnifier over the roof line */}
      <circle
        cx="86"
        cy="50"
        r="17"
        fill="#ffffff"
        fillOpacity="0.6"
        stroke={RED}
        strokeWidth="5"
      />
      <path
        d="M98 62l11 11"
        stroke={RED}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </>
  );
}

function Design() {
  return (
    <>
      <Ground />
      {/* Drawing sheet */}
      <rect
        x="22"
        y="24"
        width="72"
        height="82"
        rx="7"
        fill="#ffffff"
        stroke={SKY}
        strokeWidth="2"
      />
      <g stroke={PALE} strokeWidth="2">
        <path d="M22 46h72M22 66h72M22 86h72M44 24v82M68 24v82" />
      </g>
      {/* The array being laid out */}
      <rect x="32" y="38" width="52" height="32" rx="3" fill={BLUE} />
      <g stroke="#ffffff" strokeWidth="2" opacity="0.85">
        <path d="M49 38v32M66 38v32M32 54h52" />
      </g>
      {/* Dimension run */}
      <path
        d="M32 80h52"
        stroke={SKY}
        strokeWidth="2.5"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="80" r="3" fill={SKY} />
      <circle cx="84" cy="80" r="3" fill={SKY} />
      {/* Pencil */}
      <g transform="rotate(28 96 74)">
        <rect x="88" y="42" width="14" height="46" rx="4" fill={SAND} />
        <rect x="88" y="42" width="14" height="9" rx="4" fill={SKY} />
        <path d="M88 88h14l-7 12z" fill={RED} />
      </g>
    </>
  );
}

function FixedPrice() {
  return (
    <>
      <Ground />
      {/* Quote */}
      <rect
        x="26"
        y="20"
        width="62"
        height="84"
        rx="7"
        fill="#ffffff"
        stroke={SKY}
        strokeWidth="2"
      />
      <g fill={PALE}>
        <rect x="36" y="34" width="42" height="6" rx="3" />
        <rect x="36" y="48" width="30" height="6" rx="3" />
        <rect x="36" y="62" width="36" height="6" rx="3" />
      </g>
      <rect x="36" y="80" width="24" height="7" rx="3.5" fill={SKY} />
      {/* Price seal */}
      <circle cx="86" cy="80" r="20" fill={RED} />
      <path
        d="M86 67v26"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M93 74c-2-4-13-5-14 1s13 4 12 10c-1 5-12 5-14 0"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function Approvals() {
  return (
    <>
      <Ground />
      {/* Application */}
      <rect
        x="24"
        y="20"
        width="62"
        height="82"
        rx="7"
        fill="#ffffff"
        stroke={SKY}
        strokeWidth="2"
      />
      <rect x="44" y="14" width="22" height="12" rx="4" fill={BLUE} />
      <g fill={PALE}>
        <rect x="34" y="38" width="42" height="6" rx="3" />
        <rect x="34" y="52" width="32" height="6" rx="3" />
        <rect x="34" y="66" width="38" height="6" rx="3" />
      </g>
      {/* Seal and ribbon */}
      <path d="M72 86l-1 22 11-8 11 8-1-22z" fill={RED} />
      <circle cx="82" cy="78" r="19" fill={SAND} />
      <circle cx="82" cy="78" r="13" fill="#ffffff" opacity="0.35" />
      <path
        d="M75 78l5 6 10-12"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}

function Install() {
  return (
    <>
      <Ground />
      {/* Panel going up */}
      <g transform="rotate(-14 82 44)">
        <rect
          x="54"
          y="24"
          width="60"
          height="40"
          rx="4"
          fill={BLUE}
          stroke={NAVY}
          strokeWidth="3"
        />
        <g stroke="#ffffff" strokeWidth="2" opacity="0.8">
          <path d="M74 24v40M94 24v40M54 44h60" />
        </g>
      </g>
      {/* Installer */}
      <path d="M20 110V90a20 20 0 0 1 40 0v20z" fill={RED} />
      <rect x="34" y="62" width="12" height="14" rx="6" fill={SKIN_DARK} />
      <circle cx="40" cy="54" r="16" fill={SKIN} />
      <Face cx={40} cy={55} />
      <path d="M26 50a14 14 0 0 1 28 0z" fill={SAND} />
      <rect x="21" y="48" width="38" height="6" rx="3" fill={SAND} />
      {/* Arm raised to the panel */}
      <path
        d="M56 92l14-18"
        stroke={SKIN}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function Aftercare() {
  return (
    <>
      <Ground />
      {/* Sun */}
      <circle cx="98" cy="32" r="12" fill={SAND} />
      <g stroke={SAND} strokeWidth="3.5" strokeLinecap="round">
        <path d="M98 12v-6M98 58v-6M118 32h6M72 32h6M112 18l4-4M84 46l-4 4M112 46l4 4M84 18l-4-4" />
      </g>
      {/* Phone with live monitoring */}
      <rect x="30" y="22" width="54" height="84" rx="12" fill={NAVY} />
      <rect x="36" y="30" width="42" height="68" rx="7" fill="#ffffff" />
      <rect x="50" y="25" width="14" height="3" rx="1.5" fill={SKY} />
      <g fill={PALE}>
        <rect x="42" y="80" width="8" height="12" rx="3" />
        <rect x="53" y="74" width="8" height="18" rx="3" />
        <rect x="64" y="68" width="8" height="24" rx="3" />
      </g>
      <path
        d="M42 62l10-12 9 7 13-19"
        stroke={BLUE}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="74" cy="38" r="4.5" fill={RED} />
    </>
  );
}

const scenes: Record<string, () => React.JSX.Element> = {
  enquiry: Enquiry,
  "site-visit": SiteVisit,
  design: Design,
  "fixed-price": FixedPrice,
  approvals: Approvals,
  install: Install,
  aftercare: Aftercare,
};

export function ProcessArt({ name, className }: Props) {
  const Scene = scenes[name] ?? Enquiry;

  return (
    <svg
      viewBox="0 0 128 128"
      role="presentation"
      aria-hidden
      className={className}
    >
      {/* Scenes are drawn full-bleed in the 128 box, then eased in so the
          disc that frames them never clips a pencil or a sun ray. */}
      <g transform="translate(64 64) scale(0.84) translate(-64 -64)">
        <Scene />
      </g>
    </svg>
  );
}
