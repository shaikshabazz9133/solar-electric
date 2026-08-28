import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Breadcrumbs } from "@/components/ui/PageHero";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/products/ProductCard";
import { ComparisonTable, DataTable } from "@/components/products/SpecTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/lib/icons";
import {
  getProductById,
  getProductsByCategory,
  getRelatedProducts,
  productCategories,
  products,
} from "@/lib/data/products";
import { getCategoryGuide } from "@/lib/data/productGuides";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.brand}`,
    description: product.tagline,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: { images: [{ url: product.image }] },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = productCategories.find(
    (item) => item.slug === product.category,
  );
  const siblings = getProductsByCategory(product.category);
  const related = getRelatedProducts(product);
  const detail = category ? getCategoryGuide(category.slug)?.detail : undefined;
  const categoryHref = `/products?category=${product.category}`;
  const categoryLabel = category?.label ?? "equipment";

  // The labelled hero list: who it suits, the headline numbers, term and price.
  const keySpecs = [
    ...(product.bestFor ? [{ label: "Best for", value: product.bestFor }] : []),
    ...product.specs.slice(0, 2),
    { label: "Warranty", value: product.warranty },
    ...(product.priceRange
      ? [{ label: "Price", value: product.priceRange }]
      : []),
  ];

  return (
    <>
      {/* Overview */}
      <section className="relative isolate overflow-hidden bg-ink-50/60 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <Container>
          <Breadcrumbs
            tone="light"
            items={[
              { label: "Products", href: "/products" },
              ...(category
                ? [{ label: category.label, href: categoryHref }]
                : []),
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-4xl border border-ink-100 bg-ink-100 shadow-soft">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {product.badge ? (
                  <span className="absolute left-5 top-5 rounded-full bg-ink-950 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white">
                    {product.badge}
                  </span>
                ) : null}
                <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-2xl bg-white/90 text-brand-700 ring-1 ring-black/5 backdrop-blur-sm">
                  <Icon name={product.icon} aria-hidden className="size-5" />
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col items-start gap-5">
                <Eyebrow>{product.brand}</Eyebrow>

                <h1 className="text-display-lg text-ink-950">{product.name}</h1>

                <p className="text-lg leading-relaxed text-ink-600">
                  {product.tagline}
                </p>

                {detail?.features.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {detail.features.map((feature) => (
                      <li
                        key={feature}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-ink-700"
                      >
                        <Check
                          aria-hidden
                          className="size-3.5 text-brand-600"
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <dl className="grid w-full grid-cols-2 gap-3">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-2xl border border-ink-100 bg-white px-4 py-3.5"
                    >
                      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ink-500">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 font-display text-lg font-bold text-ink-950">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {keySpecs.length ? (
                  <div className="w-full">
                    <h2 className="font-display text-base font-bold text-ink-950">
                      Key specifications
                    </h2>
                    <dl className="mt-3 flex flex-col gap-2.5">
                      {keySpecs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed"
                        >
                          <ChevronRight
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-flag-600"
                            strokeWidth={2.5}
                          />
                          <dt className="font-semibold text-ink-900">
                            {spec.label}:
                          </dt>
                          <dd className="text-ink-600">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}

                <p className="flex w-full items-start gap-3 rounded-2xl bg-brand-50 px-4 py-3.5 text-[0.9375rem] text-brand-900">
                  <ShieldCheck
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-brand-700"
                  />
                  <span>
                    <span className="font-semibold">Warranty · </span>
                    {product.warranty}
                    <span className="mt-1 block text-[0.8125rem] text-brand-800/80">
                      Claims handled in-house — you deal with us, not the
                      manufacturer.
                    </span>
                  </span>
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button href={`/contact?product=${product.id}`}>
                    Get a quote on this
                  </Button>
                  <Button href={categoryHref} variant="ghost">
                    See all {categoryLabel.toLowerCase()}
                  </Button>
                  <Button href={siteConfig.phoneHref} variant="ghost">
                    <Phone aria-hidden className="size-4" />
                    {siteConfig.phone}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Star products */}
      {related.length ? (
        <section className="section-y bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Star products"
                title={`Also worth looking at in ${categoryLabel.toLowerCase()}`}
                description="The rest of the range, and where each one earns its place."
              />
            </Reveal>

            <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StaggerItem key={item.id} className="h-full">
                  <ProductCard product={item} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}

      {/* About + comparison table */}
      <section className="section-y bg-ink-50/60">
        <Container>
          <div className="mx-auto max-w-4xl">
            {detail ? (
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow={categoryLabel}
                  title={detail.about.heading}
                />
                {detail.about.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ) : null}

            <Reveal className={detail ? "mt-16 block" : "block"}>
              <h2 className="font-display text-2xl font-bold leading-tight text-ink-950 sm:text-[1.75rem]">
                Specifications compared
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">
                {product.name} against everything else we stock in{" "}
                {categoryLabel.toLowerCase()} — same rows, same test conditions,
                nothing rounded in our favour.
              </p>
              <ComparisonTable products={siblings} activeId={product.id} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Series */}
      {detail?.series ? (
        <section className="section-y bg-brand-950 text-white">
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                tone="dark"
                eyebrow="The families"
                title={detail.series.heading}
                description={detail.series.intro}
              />
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {detail.series.items.map((item, index) => (
                <StaggerItem key={item.heading} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition-colors duration-500 hover:border-white/25 hover:bg-white/10">
                    <span className="font-mono text-[0.75rem] font-semibold tracking-[0.16em] text-brand-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-[1.0625rem] font-bold leading-snug text-white">
                      {item.heading}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-brand-100/75">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {detail.series.note ? (
              <Reveal>
                <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-brand-200/70">
                  {detail.series.note}
                </p>
              </Reveal>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* Pricing */}
      {detail?.pricing ? (
        <section className="section-y bg-white">
          <Container>
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow="Pricing"
                  title={detail.pricing.heading}
                  description={detail.pricing.intro}
                />
                <DataTable
                  columns={detail.pricing.columns}
                  rows={detail.pricing.rows}
                />
                {detail.pricing.note ? (
                  <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-500">
                    {detail.pricing.note}
                  </p>
                ) : null}
              </Reveal>

              {detail.priceCards?.items.length ? (
                <Reveal className="mt-12 block">
                  {detail.priceCards.heading ? (
                    <h3 className="font-display text-lg font-bold text-ink-950">
                      {detail.priceCards.heading}
                    </h3>
                  ) : null}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {detail.priceCards.items.map((card) => (
                      <div
                        key={card.name}
                        className="flex flex-col rounded-3xl border border-ink-100 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                      >
                        <p className="font-display text-[0.9375rem] font-bold leading-snug text-ink-950">
                          {card.name}
                        </p>
                        <p className="mt-3 font-display text-2xl font-bold text-flag-700">
                          {card.price}
                        </p>
                        {card.note ? (
                          <p className="mt-1.5 text-[0.8125rem] text-ink-500">
                            {card.note}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {detail.priceNotes?.map((group) => (
                <Reveal key={group.heading} className="mt-12 block">
                  <h3 className="font-display text-xl font-bold text-ink-950">
                    {group.heading}
                  </h3>
                  {group.intro ? (
                    <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-ink-600">
                      {group.intro}
                    </p>
                  ) : null}
                  <ul className="mt-5 flex flex-col gap-3">
                    {group.bullets.map((bullet) => (
                      <li
                        key={bullet.label}
                        className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3.5"
                      >
                        <span
                          aria-hidden
                          className="mt-1 size-1.5 shrink-0 rounded-full bg-flag-600"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-600">
                          <strong className="font-semibold text-ink-900">
                            {bullet.label}:
                          </strong>{" "}
                          {bullet.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {group.closing ? (
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
                      {group.closing}
                    </p>
                  ) : null}
                </Reveal>
              ))}

              {detail.tables?.map((table) => (
                <Reveal key={table.heading} className="mt-16 block">
                  <h2 className="font-display text-2xl font-bold leading-tight text-ink-950 sm:text-[1.75rem]">
                    {table.heading}
                  </h2>
                  {table.intro ? (
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">
                      {table.intro}
                    </p>
                  ) : null}
                  <DataTable columns={table.columns} rows={table.rows} />
                  {table.note ? (
                    <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-500">
                      {table.note}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Pros and cons */}
      {detail ? (
        <section className="section-y bg-ink-50/60">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="The honest read"
                title={`${product.name} — the trade-offs`}
                description={`Every ${categoryLabel.toLowerCase().replace(/s$/, "")} is a compromise somewhere. Here is where this range gives and where it takes.`}
              />
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
              {[
                {
                  ...detail.pros,
                  tone: "pro" as const,
                },
                {
                  ...detail.cons,
                  tone: "con" as const,
                },
              ].map((panel) => (
                <Reveal key={panel.heading}>
                  <div
                    className={
                      panel.tone === "pro"
                        ? "h-full rounded-3xl border border-emerald-200/70 bg-emerald-50/50 p-6 sm:p-7"
                        : "h-full rounded-3xl border border-ink-200 bg-ink-50/70 p-6 sm:p-7"
                    }
                  >
                    <h3 className="font-display text-lg font-bold text-ink-950">
                      {panel.heading}
                    </h3>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {panel.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className={
                              panel.tone === "pro"
                                ? "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white"
                                : "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink-400 text-white"
                            }
                          >
                            {panel.tone === "pro" ? (
                              <Check className="size-3" strokeWidth={3} />
                            ) : (
                              <Minus className="size-3" strokeWidth={3} />
                            )}
                          </span>
                          <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Why + how to choose */}
      {detail ? (
        <section className="section-y bg-brand-950 text-white">
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                tone="dark"
                eyebrow="Why this kit"
                title={detail.why.heading}
                description={detail.why.intro}
              />
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {detail.why.points.map((point, index) => (
                <StaggerItem key={point.heading} className="h-full">
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition-colors duration-500 hover:border-white/25 hover:bg-white/10">
                    <span className="font-mono text-[0.75rem] font-semibold tracking-[0.16em] text-brand-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-[1.0625rem] font-bold leading-snug text-white">
                      {point.heading}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-brand-100/75">
                      {point.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}

      {detail ? (
        <section className="section-y bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Sizing it up"
                title={detail.choose.heading}
                description={detail.choose.intro}
              />
            </Reveal>

            <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
              {detail.choose.points.map((point) => (
                <StaggerItem key={point.heading} className="h-full">
                  <div className="flex h-full gap-4 rounded-3xl border border-ink-100 bg-ink-50/50 p-6 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/40">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-brand-700 ring-1 ring-ink-100"
                    >
                      <Icon name={category?.icon ?? "sun"} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink-950">
                        {point.heading}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                        {point.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}

      {/* Factors to consider */}
      {detail?.factors ? (
        <section className="section-y bg-ink-50/60">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Before you decide"
                title={detail.factors.heading}
                description={detail.factors.intro}
              />
            </Reveal>

            <StaggerGroup className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detail.factors.items.map((item, index) => (
                <StaggerItem key={item.label} className="h-full">
                  <div className="h-full rounded-3xl border border-ink-100 bg-white p-5 transition-colors duration-300 hover:border-brand-200">
                    <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.16em] text-flag-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-[0.9375rem] font-bold text-ink-950">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}

      {/* Owner feedback */}
      {detail?.reviews ? (
        <section className="section-y bg-white">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow="In the field"
                  title={detail.reviews.heading}
                  description={detail.reviews.intro}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <ul className="flex flex-col gap-4">
                  {detail.reviews.items.map((item) => (
                    <li
                      key={item.label}
                      className="rounded-2xl border border-ink-100 bg-ink-50/60 px-5 py-4"
                    >
                      <p className="font-display text-[0.9375rem] font-bold text-ink-950">
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
                {detail.reviews.closing ? (
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">
                    {detail.reviews.closing}
                  </p>
                ) : null}
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Installation and maintenance */}
      {detail?.tips ? (
        <section className="section-y bg-ink-50/60">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
              <Reveal>
                <SectionHeading
                  align="left"
                  eyebrow="On the job"
                  title={detail.tips.heading}
                  description={detail.tips.intro}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <ol className="flex flex-col gap-4">
                  {detail.tips.items.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white px-5 py-4"
                    >
                      <span
                        aria-hidden
                        className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-600 font-mono text-[0.75rem] font-bold text-white"
                      >
                        {index + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      {detail?.faqs.length ? (
        <section
          className={detail.tips ? "section-y bg-white" : "section-y bg-ink-50/60"}
        >
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                title="Frequently asked"
                description="What customers ask before they sign. If yours is not here, call us."
              />
            </Reveal>
            <div className="mx-auto mt-12 max-w-3xl">
              <Accordion items={detail.faqs} />
            </div>
          </Container>
        </section>
      ) : null}

      {/* Verdict */}
      {detail?.verdict ? (
        <section className="section-y bg-brand-950 text-white">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <SectionHeading
                  align="left"
                  tone="dark"
                  eyebrow="The short answer"
                  title={detail.verdict.heading}
                />
                {detail.verdict.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-[1.0625rem] leading-[1.75] text-brand-100/80"
                  >
                    {paragraph}
                  </p>
                ))}

                {detail.verdict.pullQuote ? (
                  <blockquote className="mt-8 border-l-2 border-flag-600 pl-5 font-display text-lg font-bold leading-snug text-white sm:text-xl">
                    {detail.verdict.pullQuote}
                  </blockquote>
                ) : null}
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Related */}
      {related.length ? (
        <section className="section-y bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Also in this range"
                title={`Similar ${categoryLabel.toLowerCase()}`}
                description="Different price, same standard. We only quote combinations we have commissioned and monitored ourselves."
              />
            </Reveal>

            <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StaggerItem key={item.id} className="h-full">
                  <ProductCard product={item} />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal>
              <Link
                href={categoryHref}
                className="mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-flag-700 transition-colors hover:text-flag-800"
              >
                <ArrowLeft aria-hidden className="size-4" />
                See all {categoryLabel.toLowerCase()}
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title="Want this spec'd around your home?"
        body="Send us your address and last power bill. We'll model a system, price the exact equipment and show you the payback."
        primaryLabel="Request equipment pricing"
      />

      {detail?.faqs.length ? <FaqJsonLd items={detail.faqs} /> : null}

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          ...(category ? [{ name: category.label, href: categoryHref }] : []),
          { name: product.name, href: `/products/${product.id}` },
        ]}
      />
    </>
  );
}
