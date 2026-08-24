import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { fullAddress, siteConfig } from "@/lib/site";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Contact & Free Quotes",
  description:
    "Request a fixed-price quote from licensed electricians and NABCEP-certified solar installers in Austin, TX. 24/7 emergency line, same-day response, no obligation.",
  alternates: { canonical: "/contact" },
};

type Props = {
  searchParams: Promise<{ topic?: string; product?: string; service?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { product, service } = await searchParams;

  // Deep links from product and service cards pre-select the dropdown.
  const matchedProduct = products.find((item) => item.id === product);
  const matchedService =
    services.find((item) => item.slug === service)?.title ??
    (matchedProduct
      ? matchedProduct.category === "solar-panels" ||
        matchedProduct.category === "inverters"
        ? "Solar Panel Systems"
        : matchedProduct.category === "batteries"
          ? "Battery Storage"
          : matchedProduct.category === "ev-chargers"
            ? "EV Charger Installation"
            : "Something else"
      : undefined);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need. We’re here to help."
        description="Our local team provides reliable solar and electrical services across Canberra and surrounding regions. Get in touch for a free quote or to discuss your project."
        descriptionAs="h2"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section-y bg-white">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Details */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              <Reveal delay={0.08}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <ContactCard
                    icon={<Phone aria-hidden className="size-5" />}
                    label="Office"
                    value={siteConfig.phone}
                    href={siteConfig.phoneHref}
                  />
                  <ContactCard
                    icon={<Mail aria-hidden className="size-5" />}
                    label="Email"
                    value={siteConfig.email}
                    href={siteConfig.emailHref}
                  />
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="rounded-4xl border border-ink-100 bg-white p-7 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                      <MapPin aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink-950">
                        Workshop &amp; office
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                        {fullAddress}
                      </p>
                      <p className="mt-2 text-[0.8125rem] text-ink-500">
                        Visits by appointment — our crews are usually on site.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-4 border-t border-ink-100 pt-6">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                      <Clock aria-hidden className="size-5" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-base font-bold text-ink-950">
                        Opening hours
                      </h3>
                      <dl className="mt-2.5 flex flex-col gap-1.5">
                        {siteConfig.hours.map((entry) => (
                          <div
                            key={entry.days}
                            className="flex items-baseline justify-between gap-4 text-[0.9375rem]"
                          >
                            <dt className="text-ink-600">{entry.days}</dt>
                            <dd className="font-medium text-ink-900">
                              {entry.time}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* Form */}
            <Reveal delay={0.1} direction="left">
              <div id="quote" className="scroll-mt-32">
                <ContactForm defaultService={matchedService} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Service area strip */}
      <section className="border-t border-ink-100 bg-ink-50/60 py-14">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-display text-lg font-bold text-ink-950">
              Serving Austin and the Central Texas corridor
            </h2>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {siteConfig.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-[0.875rem] text-ink-600"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
    </>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-500">
          {label}
        </span>
        <span className="mt-1 block truncate font-display text-[0.9375rem] font-bold text-ink-950">
          {value}
        </span>
      </span>
    </a>
  );
}
