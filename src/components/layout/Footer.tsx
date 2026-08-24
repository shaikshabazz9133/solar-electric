import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, fullAddress, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/CircuitField";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100/85">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-drift absolute inset-0 opacity-50" />
        <Aurora />
        {/* A single red hairline — the flag reference, used once */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-flag-600/35 to-transparent" />
      </div>

      <Container className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          {/* Contact */}
          <div>
            {/* Heading matches the link columns so the four tops line up now
                that the brand block above it is gone. */}
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h2>

            <ul className="mt-5 flex flex-col gap-4 text-[0.9375rem]">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10 transition-colors group-hover:bg-brand-600 group-hover:ring-brand-500">
                    <Phone aria-hidden className="size-4 text-brand-200 group-hover:text-white" />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand-200/85">
                      Office
                    </span>
                    <span className="font-semibold text-white">{siteConfig.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="group flex items-start gap-3 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10 transition-colors group-hover:bg-brand-600 group-hover:ring-brand-500">
                    <Mail aria-hidden className="size-4 text-brand-200 group-hover:text-white" />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand-200/85">
                      Email
                    </span>
                    <span className="font-semibold text-white">{siteConfig.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10">
                  <MapPin aria-hidden className="size-4 text-brand-200" />
                </span>
                <span>
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand-200/85">
                    Workshop
                  </span>
                  <span className="font-semibold text-white">{fullAddress}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10">
                  <Clock aria-hidden className="size-4 text-brand-200" />
                </span>
                <span>
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand-200/85">
                    Hours
                  </span>
                  {siteConfig.hours.map((entry) => (
                    <span key={entry.days} className="block text-[0.875rem]">
                      <span className="text-white">{entry.days}</span> · {entry.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
                  {column.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("tel:") ? (
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Service areas */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brand-200/85">
            Proudly serving Canberra and surrounding Regions
          </h2>
          <StaggerGroup className="mt-4 flex flex-wrap gap-2" stagger={0.04} as="ul">
            {siteConfig.serviceAreas.map((area) => (
              <StaggerItem key={area} as="li">
                <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.8125rem] text-brand-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-white/10 hover:text-white">
                  {area}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[0.8125rem]">
              © {year} {siteConfig.legalName}. All rights reserved.
            </p>
            <p className="text-[0.75rem] text-brand-200/80">
              {siteConfig.licenses.join(" · ")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex items-center gap-2">
              {siteConfig.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.shortName} on ${social.label}`}
                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-brand-200 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-brand-400 hover:bg-brand-600 hover:text-white"
                  >
                    <SocialIcon name={social.icon} className="size-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-5 text-[0.8125rem]">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
