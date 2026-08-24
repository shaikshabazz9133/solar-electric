"use client";

import { useSyncExternalStore } from "react";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * True once the page has scrolled past `threshold` pixels.
 *
 * `useSyncExternalStore` reads the real scroll position on the very first
 * client render, so a page restored mid-scroll paints in the correct state
 * without a setState-in-effect round trip.
 */
export function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Framer's own `useReducedMotion` reads the media query during the first client
 * render, which does not match the server render for anyone who has reduced
 * motion on — every component that branches on it then hydrates dirty.
 *
 * `useSyncExternalStore` fixes that properly: React hydrates with the server
 * snapshot (`false`), then re-renders with the real value on the very next
 * commit. Use this everywhere instead of the Framer hook.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/**
 * False on the server and through hydration, true from the first client commit.
 *
 * For CSS animations that must start in step with a JS timer: a server-rendered
 * `animation` begins at first paint, long before the effect that drives it has
 * run, so gate the element on this and both clocks start together.
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

function subscribeToVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/**
 * True while the tab is in the background.
 *
 * Anything on a timer should stop when nobody is looking — a carousel that
 * keeps advancing in a hidden tab burns battery and, worse, greets the reader
 * on their return with a slide they never saw arrive.
 */
export function useDocumentHidden() {
  return useSyncExternalStore(
    subscribeToVisibility,
    () => document.hidden,
    () => false,
  );
}
