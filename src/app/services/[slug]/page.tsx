import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, Phone, Tag } from "lucide-react";

import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceCard } from "@/components/sections/ServicesGrid";
import { ServiceProcessSteps } from "@/components/sections/ServiceProcessSteps";
import { ServiceExplainer } from "@/components/sections/ServiceExplainer";
import { ServicePricingTable } from "@/components/sections/ServicePricingTable";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/lib/icons";
import { getService, services } from "@/lib/data/services";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · ${siteConfig.name}`,
      description: service.summary,
      url: `${siteConfig.url}/services/${service.slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = services
    .filter((item) => item.slug !== service.slug)
    .filter((item) => item.category === service.category)
    .slice(0, 3);

  const fallback = services
    .filter((item) => item.slug !== service.slug && !related.includes(item))
    .slice(0, 3 - related.length);

  const suggestions = [...related, ...fallback];

  // Solar carries its own process and pricing blocks, so the stock template
  // sections below them are suppressed rather than repeating the same ground.
  const showTemplateSections = !service.hideTemplateSections;

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.summary}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        image={service.heroImage}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg" variant="light">
            Request a quote
            <ArrowRight
              aria-hidden
              className="size-[1.15rem] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
          <Button href={siteConfig.phoneHref} size="lg" variant="outline-light">
            <Phone aria-hidden className="size-[1.15rem]" />
            {siteConfig.phone}
          </Button>
        </div>
      </PageHero>

      {service.processBlock ? (
        <ServiceProcessSteps block={service.processBlock} />
      ) : null}

      {service.explainerBlock ? (
        <ServiceExplainer block={service.explainerBlock} />
      ) : null}

      {service.pricingBlock ? (
        <ServicePricingTable block={service.pricingBlock} />
      ) : null}

      {/* Overview + inclusions */}
      {showTemplateSections ? (
      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-4xl">
                <Image
                  src={service.image}
                  alt={`Eagle ${service.title.toLowerCase()} work on a customer site`}
                  width={1200}
                  height={800}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 ring-1 ring-inset ring-ink-950/10"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow>What&apos;s included</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-display-md">
                  Exactly what you get, written into the quote
                </h2>
              </Reveal>

              <StaggerGroup className="mt-8 flex flex-col gap-4">
                {service.highlights.map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex items-start gap-3.5 rounded-2xl border border-ink-100 bg-white p-4 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/40">
                      <CheckCircle2
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-brand-600"
                      />
                      <span className="text-[0.9375rem] text-ink-700">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-4 py-2.5 text-[0.875rem] font-semibold text-ink-700">
                    <Tag aria-hidden className="size-4 text-brand-600" />
                    {service.priceFrom}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-4 py-2.5 text-[0.875rem] font-semibold text-ink-700">
                    <Clock aria-hidden className="size-4 text-brand-600" />
                    {service.turnaround}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
      ) : null}

      {/* How we approach it */}
      {showTemplateSections ? (
      <section className="section-y relative bg-ink-50/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-ink opacity-70" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Our approach"
            title="Three things we do differently on this work"
          />

          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {service.scope.map((item) => {
              return (
                <StaggerItem key={item.title} className="h-full">
                  <article className="group h-full rounded-4xl border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift">
                    <span className="grid size-13 place-items-center rounded-2xl bg-linear-to-br from-brand-50 to-brand-100 p-3.5 text-brand-700 ring-1 ring-brand-100 transition-all duration-500 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white">
                      <Icon name={item.icon} aria-hidden className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>
      ) : null}

      {/* Steps */}
      {showTemplateSections ? (
      <section className="section-y bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <Eyebrow>Step by step</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-display-md">
                  From first call to final sign-off
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
                  You will know who is coming, what they are doing and what it
                  costs at every stage. No silence, no surprises.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <Button href="/contact" className="mt-8">
                  Start with step one
                  <ArrowRight aria-hidden className="size-4" />
                </Button>
              </Reveal>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="absolute left-[1.4375rem] top-4 h-[calc(100%-2rem)] w-px bg-linear-to-b from-brand-200 via-brand-200 to-transparent"
              />
              <ol className="flex flex-col gap-8">
                {service.process.map((step, index) => (
                  <li key={step.title} className="relative">
                    <Reveal delay={index * 0.06} className="flex gap-5">
                      <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-900 font-display text-base font-bold text-white ring-4 ring-white">
                        {index + 1}
                      </span>
                      <span className="pt-1.5">
                        <h3 className="font-display text-lg font-bold text-ink-950">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                          {step.body}
                        </p>
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
      ) : null}

      {/* FAQs */}
      {showTemplateSections ? (
      <section className="section-y bg-ink-50/60">
        <Container>
          <SectionHeading
            eyebrow="Questions"
            title={`${service.title} — answered`}
            className="mx-auto"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={service.faqs} />
          </div>
        </Container>
      </section>
      ) : null}

      {/* Related */}
      {showTemplateSections ? (
      <section className="section-y bg-white">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Also relevant"
              title="Services that often go together"
            />
            <Reveal delay={0.16} className="shrink-0">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                All services
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((item) => (
              <StaggerItem key={item.slug} className="h-full">
                <ServiceCard service={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      ) : null}

      {showTemplateSections ? (
        <CtaBand
          title={`Need ${service.title.toLowerCase()}?`}
          body="Send us the details and we'll come back with a fixed price, a clear scope and a start date."
        />
      ) : null}

      <ServiceJsonLd
        name={service.title}
        description={service.summary}
        url={`${siteConfig.url}/services/${service.slug}`}
      />
      {showTemplateSections ? <FaqJsonLd items={service.faqs} /> : null}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />
    </>
  );
}
