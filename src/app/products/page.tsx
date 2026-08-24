import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/lib/icons";
import { getProductCatalogue, productCategories } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Equipment We Install",
  description:
    "Tier-1 solar panels, hybrid inverters, EV chargers, home batteries, heat pumps, ceiling vacuum removal and ceiling insulation — supplied and installed by licensed electricians in Central Texas.",
  alternates: { canonical: "/products" },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

/** Streams behind a Suspense boundary so the skeleton grid is real, not staged. */
async function Catalogue({ initialCategory }: { initialCategory: string }) {
  const products = await getProductCatalogue();
  return (
    <ProductExplorer products={products} initialCategory={initialCategory} />
  );
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const known = productCategories.some((item) => item.slug === category);
  const initialCategory = known && category ? category : "all";

  return (
    <>
      <PageHero
        eyebrow="Equipment"
        title="The hardware we stand behind"
        description="We are brand-agnostic on purpose — but not indifferent. Everything listed here has earned its place through field failure rates, warranty responsiveness and how it behaves in 105°F Texas summers."
        crumbs={[{ label: "Products" }]}
        stats={[
          { value: "7", label: "Categories" },
          { value: "21", label: "Products stocked" },
          { value: "Tier 1", label: "Modules only" },
          { value: "In-house", label: "Warranty claims" },
        ]}
      />

      {/* Category overview */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading
            eyebrow="Browse"
            title="Seven categories, one integrated system"
            description="Mixing brands is fine — mixing incompatible brands is not. We only quote combinations we have commissioned and monitored ourselves."
          />

          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((item) => {
              return (
                <StaggerItem key={item.slug} className="h-full">
                  <Link
                    href={`/products?category=${item.slug}#catalogue`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                  >
                    <div className="relative isolate aspect-video overflow-hidden bg-brand-950">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
                      />
                      <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-2xl bg-black/45 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-500 group-hover:bg-flag-700 group-hover:ring-flag-600">
                        <Icon name={item.icon} aria-hidden className="size-5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-base font-bold text-ink-950">
                        {item.label}
                      </h3>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                        {item.blurb}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Container>
      </section>

      {/* Explorer */}
      <section id="catalogue" className="section-y bg-ink-50/60">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Full catalogue"
              title="Filter, search and compare"
              description="Prices depend on system design, roof access and incentives, so we quote rather than list. Ask about anything here and you will have a number the same day."
            />
          </Reveal>

          <div className="mt-12">
            <Suspense fallback={<ProductGridSkeleton count={6} />}>
              <Catalogue initialCategory={initialCategory} />
            </Suspense>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Want a system spec'd around this kit?"
        body="Send us your address and last power bill. We'll model a system, price the exact equipment and show you the payback."
        primaryLabel="Request equipment pricing"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />
    </>
  );
}
