"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Menu,
  Phone,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  mainNav,
  siteConfig,
  type NavChild,
  type NavItem,
} from "@/lib/site";
import { Icon } from "@/lib/icons";
import { useScrolledPast } from "@/lib/hooks";
import { cn, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(12);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Close everything on navigation. Adjusting during render (rather than in an
  // effect) means the menu never paints open on the new route.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  const activeMenu = mainNav.find(
    (item) => item.label === openMenu && item.children?.length,
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar — collapses away as soon as the user scrolls */}
      <div
        className={cn(
          "hidden overflow-hidden bg-brand-950 text-brand-100/85 transition-all duration-500 lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <div className="container-page flex h-10 items-center justify-between text-[0.8125rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck aria-hidden className="size-4 text-brand-300" />
              {siteConfig.licenses[0]}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock aria-hidden className="size-4 text-brand-300" />
              Mon–Fri 7am–7pm · Sat 8am–4pm
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.emergencyPhoneHref}
              className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-200"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-flag-500" />
                <span className="relative inline-flex size-2 rounded-full bg-flag-500" />
              </span>
              24/7 Emergency {siteConfig.emergencyPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "relative transition-all duration-500",
          scrolled
            ? "border-b border-white/60 bg-white/88 shadow-[0_8px_30px_-12px_rgba(16,23,35,0.18)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-white",
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "container-page flex items-center justify-between gap-4 transition-all duration-500",
            scrolled ? "h-16 lg:h-18" : "h-18 lg:h-20",
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              const hasMenu = Boolean(item.children?.length);
              const menuOpen = openMenu === item.label;

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (!hasMenu) return;
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={() => hasMenu && scheduleClose()}
                >
                  {hasMenu ? (
                    <button
                      type="button"
                      aria-expanded={menuOpen}
                      aria-haspopup="true"
                      aria-controls={`megamenu-${slugify(item.label)}`}
                      onClick={() => setOpenMenu(menuOpen ? null : item.label)}
                      className={cn(
                        "inline-flex h-10 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors duration-200",
                        active || menuOpen
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-700 hover:bg-ink-50 hover:text-brand-700",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-4 transition-transform duration-300",
                          menuOpen && "rotate-180",
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-semibold transition-colors duration-200",
                        active
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-700 hover:bg-ink-50 hover:text-brand-700",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* The number only earns its space once the nav has room for it. */}
            <a
              href={siteConfig.phoneHref}
              className="group hidden items-center gap-2.5 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap text-ink-800 transition-colors hover:text-brand-700 xl:inline-flex"
            >
              <span className="grid size-9 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Phone aria-hidden className="size-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink-500">
                  Call us
                </span>
                <span>{siteConfig.phone}</span>
              </span>
            </a>
            <a
              href={siteConfig.phoneHref}
              aria-label={`Call ${siteConfig.phone}`}
              className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-brand-600 hover:text-white xl:hidden"
            >
              <Phone aria-hidden className="size-[1.15rem]" />
            </a>
            <Button href="/contact" size="sm" className="h-11 px-5">
              Get a free quote
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={siteConfig.phoneHref}
              aria-label={`Call ${siteConfig.phone}`}
              className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
            >
              <Phone aria-hidden className="size-[1.15rem]" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full bg-brand-900 text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </nav>

        {/* Reading progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-linear-to-r from-brand-700 via-brand-500 to-brand-400"
        />

        {/* Mega-menu is anchored to the header, not to the trigger, so it can
            never overflow the viewport on narrow desktops. */}
        <AnimatePresence>
          {activeMenu ? (
            <MegaMenu
              item={activeMenu}
              reduce={Boolean(reduce)}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            />
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <MobileDrawer
            onClose={() => setMobileOpen(false)}
            isActive={isActive}
            reduce={Boolean(reduce)}
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function MegaMenu({
  item,
  reduce,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  reduce: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      id={`megamenu-${slugify(item.label)}`}
      className="container-page absolute inset-x-0 top-full z-50 hidden pt-3 lg:block"
    >
      {/* Both menus share a width so the panel does not jump when you slide
          from one trigger to the next. */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-float backdrop-blur-xl">
        {/* The panel never scrolls the page: on short laptop screens the grid
            takes over the overflow instead of pushing the viewport. */}
        <div className="grid max-h-[min(30rem,calc(100vh-11rem))] grid-cols-2 gap-1 overflow-y-auto overscroll-contain p-3 xl:grid-cols-3">
          {item.children?.map((child) => (
            <MenuRow key={child.label} child={child} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-ink-100 bg-ink-50/70 px-5 py-3.5">
          <p className="text-[0.8125rem] text-ink-500">{item.menuNote}</p>
          <Link
            href={item.href}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-700 hover:text-brand-800"
          >
            View all {item.label.toLowerCase()}
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/** Icon beside a two-line description — used for the services menu. */
function MenuRow({ child }: { child: NavChild }) {
  return (
    <Link
      href={child.href}
      className="group/item flex gap-3 rounded-2xl p-3 transition-colors duration-200 hover:bg-brand-50"
    >
      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-100 transition-all duration-300 group-hover/item:from-brand-600 group-hover/item:to-brand-700 group-hover/item:text-white group-hover/item:ring-brand-600">
        <Icon name={child.icon} aria-hidden className="size-[1.15rem]" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[0.9375rem] font-semibold text-ink-950">
          {child.label}
          <ArrowRight
            aria-hidden
            className="size-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
          />
        </span>
        <span className="mt-0.5 line-clamp-2 text-[0.8125rem] leading-snug text-ink-500">
          {child.description}
        </span>
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

function MobileDrawer({
  onClose,
  isActive,
  reduce,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
  reduce: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>("Services");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm lg:hidden"
        aria-hidden
      />

      <motion.div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        initial={reduce ? { opacity: 0 } : { x: "100%" }}
        animate={reduce ? { opacity: 1 } : { x: 0 }}
        exit={reduce ? { opacity: 0 } : { x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,92vw)] flex-col bg-white shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full bg-ink-50 text-ink-700 transition-colors hover:bg-ink-100"
            autoFocus
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <ul className="flex flex-col gap-1">
            {mainNav.map((navItem) => {
              const hasChildren = Boolean(navItem.children?.length);
              const open = expanded === navItem.label;

              return (
                <li key={navItem.label}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={navItem.href}
                      onClick={onClose}
                      className={cn(
                        "flex-1 rounded-xl px-4 py-3.5 text-base font-semibold transition-colors",
                        isActive(navItem.href)
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-800 hover:bg-ink-50",
                      )}
                    >
                      {navItem.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : navItem.label)}
                        aria-expanded={open}
                        aria-label={`${open ? "Collapse" : "Expand"} ${navItem.label}`}
                        className="grid size-11 place-items-center rounded-xl text-ink-500 transition-colors hover:bg-ink-50"
                      >
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-5 transition-transform duration-300",
                            open && "rotate-180",
                          )}
                        />
                      </button>
                    ) : null}
                  </div>

                  <AnimatePresence initial={false}>
                    {hasChildren && open ? (
                      <motion.ul
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pl-3"
                      >
                        {navItem.children?.map((child) => {
                          return (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="group/item flex items-center gap-3 rounded-xl px-2 py-2.5 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-300 group-hover/item:bg-brand-600 group-hover/item:text-white">
                                  <Icon name={child.icon} aria-hidden className="size-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block leading-snug">
                                    {child.label}
                                  </span>
                                  <span className="mt-0.5 line-clamp-1 text-[0.75rem] text-ink-500">
                                    {child.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-ink-100 bg-ink-50/60 px-5 py-5">
          <Button href="/contact" fullWidth size="md" onClick={onClose}>
            Get a free quote
            <ArrowRight aria-hidden className="size-4" />
          </Button>
          <a
            href={siteConfig.emergencyPhoneHref}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-flag-200 bg-flag-50 px-4 py-3 text-sm font-semibold text-flag-800 transition-colors hover:bg-flag-100"
          >
            <Zap aria-hidden className="size-4" />
            24/7 emergency · {siteConfig.emergencyPhone}
          </a>
        </div>
      </motion.div>
    </>
  );
}
