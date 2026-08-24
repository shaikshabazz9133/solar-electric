/**
 * Route transition. Next gives every template a per-segment key, so this
 * remounts on navigation and the entrance animation replays.
 *
 * It is a CSS animation rather than a Framer `AnimatePresence` on purpose:
 * it stays a Server Component, adds no JS, and the page is never left
 * invisible if hydration is slow or fails.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
