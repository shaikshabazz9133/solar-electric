"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

/**
 * Thumb-reachable action bar on small screens. Appears once the user is past
 * the hero so it never competes with the primary CTA, and hides itself on the
 * contact page where it would be redundant.
 */
export function MobileCallBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="glass mx-3 mb-3 grid grid-cols-2 gap-2 rounded-2xl p-2 shadow-float">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white text-[0.9375rem] font-semibold text-brand-900 ring-1 ring-ink-200 transition-colors active:bg-brand-50"
            >
              <Phone aria-hidden className="size-4" />
              Call now
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 text-[0.9375rem] font-semibold text-white transition-colors active:bg-brand-700"
            >
              <CalendarCheck aria-hidden className="size-4" />
              Free quote
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
