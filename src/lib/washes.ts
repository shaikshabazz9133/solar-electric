/**
 * Card washes, cycled by position.
 *
 * One set shared by the home page process steps, the "why us" pillars and the
 * service page card decks, so a card reads the same wherever it appears: pale
 * fill, a deeper hairline, and an ink for the icon, rule and links.
 *
 * The tints are deliberately pale and the saturated element on each card is
 * small — that is what keeps a row of six from turning into a rainbow.
 */
export type Wash = { tint: string; line: string; ink: string };

export const washes: Wash[] = [
  { tint: "#f2f6fd", line: "#dbe7f9", ink: "#27548f" },
  { tint: "#edf6f6", line: "#d5e9e9", ink: "#136b68" },
  { tint: "#f2f2fc", line: "#e0e0f6", ink: "#4a4aa3" },
  { tint: "#fdf3f5", line: "#f6dde3", ink: "#a32c44" },
  { tint: "#fbf5ec", line: "#f1e4d1", ink: "#8a5c17" },
  { tint: "#f0f7f0", line: "#dbebdb", ink: "#3a7442" },
  { tint: "#f8f2fa", line: "#ece0f1", ink: "#75458c" },
];

/** The wash for the card at `index`, wrapping round for long lists. */
export function washAt(index: number): Wash {
  return washes[index % washes.length];
}

/** Custom properties every washed card sets on its root element. */
export function washVars(wash: Wash) {
  return {
    "--tint": wash.tint,
    "--line": wash.line,
    "--ink": wash.ink,
  };
}
