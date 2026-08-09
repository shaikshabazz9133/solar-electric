import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/lib/icons";
import { allFaqs, faqGroups } from "@/lib/data/faqs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Straight answers on pricing, financing, federal solar tax credits, warranties, panel upgrades, batteries and emergency electrical service in Central Texas.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers, including the ones that cost us work"
        description={`${allFaqs.length} questions covering pricing, incentives, warranties and the technical detail people actually want before they commit.`}
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* Jump nav */}
            <nav
              aria-label="FAQ sections"
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-500">
                Jump to
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {faqGroups.map((group) => {
                  return (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] font-medium text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        <span className="grid size-8 place-items-center rounded-lg bg-ink-50 text-ink-500 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Icon name={group.icon} aria-hidden className="size-4" />
                        </span>
                        {group.title}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 rounded-3xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-5">
                <h2 className="font-display text-base font-bold text-ink-950">
                  Question not here?
                </h2>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                  Call and speak to a licensed electrician, not a call centre.
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  <Phone aria-hidden className="size-4" />
                  {siteConfig.phone}
                </a>
              </div>
            </nav>

            {/* Groups */}
            <div className="flex flex-col gap-14">
              {faqGroups.map((group, index) => {
                return (
                  <section key={group.id} id={group.id} className="scroll-mt-32">
                    <Reveal>
                      <div className="flex items-center gap-3.5">
                        <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                          <Icon name={group.icon} aria-hidden className="size-5" />
                        </span>
                        <h2 className="font-display text-xl font-bold text-ink-950 sm:text-2xl">
                          {group.title}
                        </h2>
                      </div>
                    </Reveal>

                    <div className="mt-6">
                      <Accordion
                        items={group.items}
                        defaultOpen={index === 0 ? 0 : null}
                      />
                    </div>
                  </section>
                );
              })}

              <Reveal>
                <div className="rounded-4xl border border-ink-100 bg-ink-50/60 p-7 sm:p-8">
                  <h2 className="font-display text-lg font-bold text-ink-950">
                    Still have a question?
                  </h2>
                  <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-ink-600">
                    Send it over. We answer every question the same day, and we
                    will tell you honestly if the answer is &ldquo;you do not
                    need us for that&rdquo;.
                  </p>
                  <Link
                    href="/contact"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Ask us directly
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />

      <FaqJsonLd items={allFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
    </>
  );
}
