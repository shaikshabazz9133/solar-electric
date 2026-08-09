/**
 * Generates the abstract technical artwork used across the site.
 *
 * These are deliberately vector scenes rather than stock photography: they
 * weigh 2–4 kB each, stay razor sharp on any display, and keep the palette
 * consistent site-wide. Replace the output files with real project photography
 * when it is available — every consumer uses next/image, so nothing else has
 * to change.
 *
 *   node scripts/generate-images.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const W = 1200;
const H = 900;

// Drawn straight from the flag reference: blue #18305E, red #A32C44, white.
const palettes = {
  blue: ["#32589f", "#1d396d", "#0d1b36"],
  deep: ["#254683", "#18305e", "#0a1428"],
  slate: ["#4c5b76", "#202a3c", "#101723"],
  red: ["#a32c44", "#691c2b", "#0d1b36"],
  sky: ["#476fb8", "#254683", "#0d1b36"],
};

/* ------------------------------ motifs ---------------------------------- */

/** Isometric rows of solar modules. */
function solarArray() {
  const rows = [];
  for (let row = 0; row < 4; row += 1) {
    const y = 380 + row * 130;
    const skew = 120 - row * 18;
    const opacity = 0.5 - row * 0.08;
    for (let col = 0; col < 5; col += 1) {
      const x = 120 + col * 190 + row * 26;
      rows.push(
        `<path d="M${x} ${y} l180 -${skew} l86 46 l-180 ${skew} Z" fill="rgba(255,255,255,${opacity.toFixed(
          2,
        )})" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>`,
        `<path d="M${x + 60} ${y - 40} l180 -${skew}" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>`,
      );
    }
  }
  return rows.join("");
}

/** Orthogonal circuit traces with junction pads. */
function circuitLines() {
  const parts = [];
  const seeds = [
    [80, 200, 420, 300],
    [80, 420, 300, 560],
    [640, 160, 380, 420],
    [520, 640, 500, 180],
    [200, 700, 700, 120],
  ];
  seeds.forEach(([x, y, dx, dy], index) => {
    parts.push(
      `<path d="M${x} ${y} h${dx * 0.55} l90 90 h${dx * 0.4} v${dy}" fill="none" stroke="rgba(255,255,255,${
        0.3 - index * 0.03
      })" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
      `<circle cx="${x + dx * 0.55 + 90}" cy="${y + 90}" r="9" fill="rgba(255,255,255,0.55)"/>`,
      `<circle cx="${x}" cy="${y}" r="6" fill="rgba(255,255,255,0.4)"/>`,
    );
  });
  return parts.join("");
}

/** Production bars, echoing the hero dashboard. */
function bars() {
  const values = [26, 44, 62, 80, 96, 88, 70, 52, 36, 22];
  return values
    .map((value, index) => {
      const x = 130 + index * 98;
      const height = value * 6.2;
      return `<rect x="${x}" y="${760 - height}" width="60" height="${height}" rx="14" fill="rgba(255,255,255,${(
        0.18 +
        value / 400
      ).toFixed(2)})"/>`;
    })
    .join("");
}

/** Abstract skyline / warehouse elevation. */
function cityscape() {
  const blocks = [
    [90, 420, 170, 340],
    [280, 300, 150, 460],
    [450, 480, 200, 280],
    [670, 240, 160, 520],
    [850, 400, 130, 360],
    [1000, 330, 120, 430],
  ];
  const parts = blocks.map(([x, y, w, h], index) => {
    const windows = [];
    for (let row = 0; row < Math.floor(h / 70); row += 1) {
      for (let col = 0; col < Math.floor(w / 55); col += 1) {
        if ((row + col + index) % 3 === 0) continue;
        windows.push(
          `<rect x="${x + 18 + col * 55}" y="${y + 24 + row * 70}" width="26" height="30" rx="5" fill="rgba(255,255,255,0.32)"/>`,
        );
      }
    }
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="rgba(255,255,255,${(
      0.1 +
      index * 0.015
    ).toFixed(2)})" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>${windows.join("")}`;
  });
  return parts.join("");
}

/** Concentric distribution rings with nodes. */
function rings() {
  const parts = [];
  for (let index = 0; index < 5; index += 1) {
    parts.push(
      `<circle cx="600" cy="470" r="${110 + index * 90}" fill="none" stroke="rgba(255,255,255,${(
        0.26 -
        index * 0.04
      ).toFixed(2)})" stroke-width="2" stroke-dasharray="${index % 2 ? "14 12" : "0"}"/>`,
    );
  }
  const nodes = [
    [600, 180],
    [860, 380],
    [770, 700],
    [430, 700],
    [340, 380],
  ];
  nodes.forEach(([x, y]) => {
    parts.push(
      `<circle cx="${x}" cy="${y}" r="26" fill="rgba(255,255,255,0.9)"/>`,
      `<circle cx="${x}" cy="${y}" r="46" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>`,
      `<path d="M600 470 L${x} ${y}" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>`,
    );
  });
  parts.push(`<circle cx="600" cy="470" r="54" fill="rgba(255,255,255,0.95)"/>`);
  return parts.join("");
}

/** Big lightning bolt with radiating rays. */
function boltBurst() {
  const rays = [];
  for (let index = 0; index < 16; index += 1) {
    const angle = (index / 16) * Math.PI * 2;
    const x1 = 600 + Math.cos(angle) * 190;
    const y1 = 460 + Math.sin(angle) * 190;
    const x2 = 600 + Math.cos(angle) * (index % 2 ? 330 : 270);
    const y2 = 460 + Math.sin(angle) * (index % 2 ? 330 : 270);
    rays.push(
      `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(
        1,
      )}" stroke="rgba(255,255,255,0.3)" stroke-width="6" stroke-linecap="round"/>`,
    );
  }
  return `${rays.join("")}<path d="M640 210 L470 500 h130 l-60 260 L790 430 H650 l60 -220 Z" fill="rgba(255,255,255,0.92)"/>`;
}

/** Stacked battery modules. */
function stack() {
  const parts = [];
  for (let index = 0; index < 4; index += 1) {
    const y = 250 + index * 130;
    parts.push(
      `<rect x="360" y="${y}" width="480" height="104" rx="22" fill="rgba(255,255,255,${(
        0.16 +
        index * 0.06
      ).toFixed(2)})" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>`,
      `<rect x="400" y="${y + 38}" width="${120 + index * 90}" height="28" rx="14" fill="rgba(255,255,255,0.75)"/>`,
      `<circle cx="800" cy="${y + 52}" r="12" fill="rgba(255,255,255,0.8)"/>`,
    );
  }
  return parts.join("");
}

/** Conditioned air sweeping out of a vent grille. */
function airflow() {
  const parts = [
    `<rect x="120" y="300" width="180" height="300" rx="28" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>`,
  ];
  for (let index = 0; index < 5; index += 1) {
    parts.push(
      `<rect x="150" y="${340 + index * 54}" width="120" height="18" rx="9" fill="rgba(255,255,255,0.6)"/>`,
    );
  }
  for (let index = 0; index < 6; index += 1) {
    const y = 250 + index * 80;
    const lift = 90 - index * 12;
    parts.push(
      `<path d="M320 ${y} C520 ${y - lift}, 700 ${y + lift}, 1080 ${
        y - lift / 2
      }" fill="none" stroke="rgba(255,255,255,${(0.42 - index * 0.05).toFixed(
        2,
      )})" stroke-width="${6 - index * 0.5}" stroke-linecap="round" stroke-dasharray="${
        index % 2 ? "22 18" : "0"
      }"/>`,
      `<circle cx="1080" cy="${y - lift / 2}" r="${9 - index}" fill="rgba(255,255,255,0.7)"/>`,
    );
  }
  return parts.join("");
}

/** Outdoor condenser fan throwing heat waves. */
function heatPump() {
  const parts = [
    `<rect x="180" y="330" width="440" height="360" rx="34" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>`,
    `<circle cx="400" cy="510" r="140" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="4"/>`,
  ];
  for (let index = 0; index < 5; index += 1) {
    const angle = (index / 5) * Math.PI * 2;
    parts.push(
      `<path d="M400 510 Q${(400 + Math.cos(angle + 0.6) * 90).toFixed(1)} ${(
        510 +
        Math.sin(angle + 0.6) * 90
      ).toFixed(1)} ${(400 + Math.cos(angle) * 120).toFixed(1)} ${(
        510 +
        Math.sin(angle) * 120
      ).toFixed(1)}" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" stroke-linecap="round"/>`,
    );
  }
  parts.push(`<circle cx="400" cy="510" r="34" fill="rgba(255,255,255,0.9)"/>`);
  for (let index = 0; index < 4; index += 1) {
    parts.push(
      `<path d="M${700 + index * 110} 320 q40 70 0 140 q-40 70 0 140 q40 70 0 140" fill="none" stroke="rgba(255,255,255,${(
        0.45 -
        index * 0.09
      ).toFixed(2)})" stroke-width="7" stroke-linecap="round"/>`,
    );
  }
  return parts.join("");
}

/** Induction coil zones on a glass hob. */
function cooktop() {
  const parts = [
    `<rect x="200" y="230" width="800" height="440" rx="46" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>`,
  ];
  const zones = [
    [420, 380, 120],
    [780, 380, 96],
    [420, 545, 96],
    [780, 545, 120],
  ];
  zones.forEach(([cx, cy, radius], index) => {
    for (let ring = 0; ring < 3; ring += 1) {
      parts.push(
        `<circle cx="${cx}" cy="${cy}" r="${radius - ring * 26}" fill="none" stroke="rgba(255,255,255,${(
          0.62 -
          ring * 0.14
        ).toFixed(2)})" stroke-width="5" stroke-dasharray="${index % 2 ? "18 14" : "0"}"/>`,
      );
    }
    parts.push(`<circle cx="${cx}" cy="${cy}" r="14" fill="rgba(255,255,255,0.85)"/>`);
  });
  parts.push(
    `<rect x="300" y="700" width="600" height="18" rx="9" fill="rgba(255,255,255,0.25)"/>`,
    `<circle cx="720" cy="709" r="26" fill="rgba(255,255,255,0.9)"/>`,
  );
  return parts.join("");
}

/** Test tags hanging from a rail, each ticked off. */
function tags() {
  const parts = [
    `<path d="M120 210 H1080" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round"/>`,
  ];
  [240, 470, 700, 930].forEach((x, index) => {
    const top = 210 + 90 + (index % 2) * 70;
    parts.push(
      `<path d="M${x} 210 V${top}" stroke="rgba(255,255,255,0.4)" stroke-width="4"/>`,
      `<rect x="${x - 90}" y="${top}" width="180" height="282" rx="26" fill="rgba(255,255,255,${(
        0.18 +
        index * 0.06
      ).toFixed(2)})" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>`,
      `<circle cx="${x}" cy="${top + 42}" r="13" fill="rgba(255,255,255,0.85)"/>`,
      `<path d="M${x - 42} ${top + 168} l32 36 l66 -78" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`,
    );
  });
  return parts.join("");
}

/** Meter enclosure with dial, main switch bank and breaker rows. */
function meterBox() {
  const parts = [
    `<rect x="250" y="180" width="700" height="560" rx="38" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.45)" stroke-width="4"/>`,
    `<rect x="300" y="230" width="600" height="130" rx="20" fill="rgba(255,255,255,0.18)"/>`,
    `<circle cx="380" cy="295" r="44" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="6"/>`,
    `<path d="M380 295 L410 262" stroke="rgba(255,255,255,0.9)" stroke-width="8" stroke-linecap="round"/>`,
  ];
  for (let index = 0; index < 5; index += 1) {
    parts.push(
      `<rect x="${470 + index * 78}" y="266" width="52" height="58" rx="10" fill="rgba(255,255,255,${(
        0.35 +
        index * 0.08
      ).toFixed(2)})"/>`,
    );
  }
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const x = 320 + col * 96;
      const y = 420 + row * 150;
      const toggle = (row + col) % 2 ? 22 : 58;
      parts.push(
        `<rect x="${x}" y="${y}" width="64" height="110" rx="14" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>`,
        `<rect x="${x + 14}" y="${y + toggle}" width="36" height="30" rx="8" fill="rgba(255,255,255,0.85)"/>`,
      );
    }
  }
  return parts.join("");
}

/** DC steps converted into a clean AC sine — the inverter story. */
function waveform() {
  const parts = [
    `<path d="M90 470 h110 v-100 h110 v100 h110" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
    `<rect x="430" y="330" width="340" height="300" rx="34" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>`,
    `<path d="M470 480 q30 -70 60 0 q30 70 60 0 q30 -70 60 0 q30 70 60 0" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="6" stroke-linecap="round"/>`,
  ];
  for (let index = 0; index < 3; index += 1) {
    parts.push(
      `<circle cx="${480 + index * 42}" cy="580" r="12" fill="rgba(255,255,255,${(
        0.9 -
        index * 0.25
      ).toFixed(2)})"/>`,
    );
  }
  let sine = "M790 480";
  for (let index = 0; index < 4; index += 1) {
    sine += " q20 -110 40 0 q20 110 40 0";
  }
  parts.push(
    `<path d="${sine}" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="8" stroke-linecap="round"/>`,
  );
  return parts.join("");
}

/** Extraction hose pulling debris out of a ceiling cavity. */
function extraction() {
  const parts = [
    `<path d="M80 250 H1120" stroke="rgba(255,255,255,0.4)" stroke-width="6" stroke-linecap="round"/>`,
  ];
  for (let index = 0; index < 8; index += 1) {
    parts.push(
      `<rect x="${110 + index * 130}" y="176" width="70" height="70" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>`,
    );
  }
  for (let index = 0; index < 18; index += 1) {
    parts.push(
      `<circle cx="${160 + ((index * 61) % 900)}" cy="${
        300 + ((index * 37) % 230)
      }" r="${3 + (index % 4)}" fill="rgba(255,255,255,${(
        0.25 +
        (index % 5) * 0.1
      ).toFixed(2)})"/>`,
    );
  }
  for (let index = 0; index < 14; index += 1) {
    parts.push(
      `<circle cx="${(300 + index * 52).toFixed(1)}" cy="${(
        620 -
        Math.sin(index / 2.4) * 130
      ).toFixed(1)}" r="${(34 - index * 0.6).toFixed(1)}" fill="none" stroke="rgba(255,255,255,${(
        0.5 -
        index * 0.02
      ).toFixed(2)})" stroke-width="7"/>`,
    );
  }
  parts.push(`<path d="M300 620 l-130 -64 v128 Z" fill="rgba(255,255,255,0.85)"/>`);
  return parts.join("");
}

/** Quilted insulation batts laid between ceiling joists. */
function insulation() {
  const parts = [];
  for (let row = 0; row < 4; row += 1) {
    const y = 246 + row * 130;
    parts.push(
      `<rect x="120" y="${y}" width="960" height="104" rx="18" fill="rgba(255,255,255,${(
        0.3 -
        row * 0.045
      ).toFixed(2)})"/>`,
    );
    for (let index = 0; index < 12; index += 1) {
      parts.push(
        `<path d="M${160 + index * 80} ${y + 14} q26 38 0 76" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round"/>`,
      );
    }
  }
  for (let index = 0; index < 5; index += 1) {
    parts.push(
      `<rect x="120" y="${220 + index * 130}" width="960" height="26" rx="13" fill="rgba(255,255,255,0.32)"/>`,
    );
  }
  return parts.join("");
}

const motifs = {
  solarArray,
  circuitLines,
  bars,
  cityscape,
  rings,
  boltBurst,
  stack,
  airflow,
  heatPump,
  cooktop,
  tags,
  meterBox,
  waveform,
  extraction,
  insulation,
};

/* --------------------------- hero artwork -------------------------------- */

/**
 * Wide cinematic scene for the homepage banner: low sun over layered ridges
 * with a tilted array running off the right edge. Composed so the left third
 * stays quiet — that is where the headline sits.
 */
function renderHero() {
  const w = 1920;
  const h = 1080;

  // Tilted array. skewY on the group keeps every panel on the same plane, so
  // the rows read as one surface rather than a scatter of shapes.
  const panels = [];
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const x = col * 152;
      const y = row * 76;
      const opacity = (0.44 - row * 0.06).toFixed(2);
      panels.push(
        `<rect x="${x}" y="${y}" width="138" height="62" rx="6" fill="rgba(255,255,255,${opacity})" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>`,
        `<path d="M${x + 46} ${y} v62 M${x + 92} ${y} v62" stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/>`,
        `<path d="M${x} ${y + 2} h138" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>`,
      );
    }
  }

  const rays = [];
  for (let index = 0; index < 9; index += 1) {
    const angle = -1.15 + index * 0.16;
    const x = 1430 + Math.cos(angle) * 1500;
    const y = 300 + Math.sin(angle) * 1500;
    rays.push(
      `<path d="M1430 300 L${x.toFixed(0)} ${y.toFixed(0)}" stroke="rgba(255,255,255,0.05)" stroke-width="${
        40 + index * 6
      }" stroke-linecap="round"/>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>
    <linearGradient id="hero-sky" x1="0" y1="1" x2="0.85" y2="0">
      <stop offset="0%" stop-color="#0a1428"/>
      <stop offset="42%" stop-color="#0d1b36"/>
      <stop offset="72%" stop-color="#1d396d"/>
      <stop offset="100%" stop-color="#476fb8"/>
    </linearGradient>
    <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#e5ecf8" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#7592c7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hero-ridge-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#254683"/>
      <stop offset="100%" stop-color="#0d1b36"/>
    </linearGradient>
    <linearGradient id="hero-ridge-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d1b36"/>
      <stop offset="100%" stop-color="#0a1428"/>
    </linearGradient>
    <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M80 0 H0 V80" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1.5"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#hero-sky)"/>
  <rect width="${w}" height="${h}" fill="url(#hero-grid)"/>

  <g>${rays.join("")}</g>
  <circle cx="1430" cy="300" r="520" fill="url(#hero-sun)"/>
  <circle cx="1430" cy="300" r="118" fill="#ffffff" fill-opacity="0.85"/>

  <!-- Ridges -->
  <path d="M0 690 C 320 596, 560 700, 880 654 C 1220 604, 1520 690, 1920 620 L1920 1080 L0 1080 Z" fill="url(#hero-ridge-a)" fill-opacity="0.85"/>
  <path d="M0 812 C 380 742, 700 830, 1040 786 C 1400 738, 1640 812, 1920 764 L1920 1080 L0 1080 Z" fill="url(#hero-ridge-b)"/>

  <g transform="translate(742 706) skewY(-8)">${panels.join("")}</g>
</svg>
`;
}

/* ----------------------------- renderer --------------------------------- */

function render({ palette, motif, id }) {
  const [c1, c2, c3] = palettes[palette];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.25" cy="0.2" r="0.75">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid-${id}" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0 H0 V60" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1.5"/>
    </pattern>
    <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#grid-${id})"/>
  <circle cx="180" cy="140" r="240" fill="#ffffff" fill-opacity="0.14" filter="url(#soft-${id})"/>
  <circle cx="1060" cy="800" r="220" fill="#ffffff" fill-opacity="0.1" filter="url(#soft-${id})"/>
  <g>${motifs[motif]()}</g>
  <rect width="${W}" height="${H}" fill="url(#glow-${id})"/>
</svg>
`;
}

const images = [
  // Services
  { file: "service-solar.svg", palette: "sky", motif: "solarArray" },
  { file: "service-battery.svg", palette: "deep", motif: "stack" },
  { file: "service-air-conditioning.svg", palette: "sky", motif: "airflow" },
  { file: "service-ev.svg", palette: "blue", motif: "boltBurst" },
  { file: "service-residential.svg", palette: "blue", motif: "circuitLines" },
  { file: "service-heat-pump.svg", palette: "deep", motif: "heatPump" },
  { file: "service-induction.svg", palette: "slate", motif: "cooktop" },
  { file: "service-test-and-tag.svg", palette: "slate", motif: "tags" },
  { file: "service-meter-box.svg", palette: "deep", motif: "meterBox" },

  // Product categories
  { file: "product-solar-panels.svg", palette: "blue", motif: "solarArray" },
  { file: "product-inverters.svg", palette: "deep", motif: "waveform" },
  { file: "product-ev-chargers.svg", palette: "sky", motif: "boltBurst" },
  { file: "product-battery-storage.svg", palette: "slate", motif: "stack" },
  { file: "product-heat-pump.svg", palette: "sky", motif: "heatPump" },
  { file: "product-ceiling-vacuum.svg", palette: "slate", motif: "extraction" },
  { file: "product-ceiling-insulation.svg", palette: "deep", motif: "insulation" },

  // Second and third frames for each category gallery. These are stand-ins:
  // drop real job photography in at the same paths and nothing else changes.
  { file: "product-solar-panels-2.svg", palette: "sky", motif: "rings" },
  { file: "product-solar-panels-3.svg", palette: "deep", motif: "bars" },
  { file: "product-inverters-2.svg", palette: "blue", motif: "circuitLines" },
  { file: "product-inverters-3.svg", palette: "slate", motif: "bars" },
  { file: "product-ev-chargers-2.svg", palette: "deep", motif: "circuitLines" },
  { file: "product-ev-chargers-3.svg", palette: "blue", motif: "rings" },
  { file: "product-battery-storage-2.svg", palette: "deep", motif: "bars" },
  { file: "product-battery-storage-3.svg", palette: "blue", motif: "rings" },
  { file: "product-heat-pump-2.svg", palette: "deep", motif: "airflow" },
  { file: "product-heat-pump-3.svg", palette: "slate", motif: "rings" },
  { file: "product-ceiling-vacuum-2.svg", palette: "deep", motif: "insulation" },
  { file: "product-ceiling-vacuum-3.svg", palette: "slate", motif: "cityscape" },
  { file: "product-ceiling-insulation-2.svg", palette: "blue", motif: "cityscape" },
  { file: "product-ceiling-insulation-3.svg", palette: "slate", motif: "insulation" },

  // Projects
  { file: "project-net-zero.svg", palette: "sky", motif: "solarArray" },
  { file: "project-warehouse.svg", palette: "deep", motif: "cityscape" },
  { file: "project-office.svg", palette: "slate", motif: "cityscape" },
  { file: "project-microgrid.svg", palette: "blue", motif: "rings" },
  { file: "project-rewire.svg", palette: "red", motif: "circuitLines" },
  { file: "project-standby.svg", palette: "deep", motif: "boltBurst" },

  // General
  { file: "about-crew.svg", palette: "blue", motif: "rings" },
  { file: "og-default.svg", palette: "deep", motif: "solarArray" },
];

await mkdir(OUT, { recursive: true });

await Promise.all([
  ...images.map((image, index) =>
    writeFile(
      join(OUT, image.file),
      render({ palette: image.palette, motif: image.motif, id: `i${index}` }),
      "utf8",
    ),
  ),
  // The hero is its own wide composition rather than a motif on the square
  // canvas, so it is rendered separately.
  writeFile(join(OUT, "hero-home.svg"), renderHero(), "utf8"),
]);

console.log(`Generated ${images.length + 1} images into public/images`);
