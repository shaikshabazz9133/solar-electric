import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { ProductRange } from "@/components/products/ProductRange";
import { CategoryGuide } from "@/components/products/CategoryGuide";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getProductCatalogue, productCategories } from "@/lib/data/products";
import { getCategoryGuide } from "@/lib/data/productGuides";

export const metadata: Metadata = {
  title: "Equipment We Install",
  description:
    "Tier-1 solar panels, hybrid inverters, EV chargers, home batteries, heat pumps, air conditioning, ceiling vacuum removal and ceiling insulation — supplied and installed by licensed electricians in Central Texas.",
  alternates: { canonical: "/products" },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

/** Streams behind a Suspense boundary so the skeleton grid is real, not staged. */
async function Range({ category }: { category: string }) {
  const catalogue = await getProductCatalogue();
  const products =
    category === "all"
      ? catalogue
      : catalogue.filter((product) => product.category === category);

  return <ProductRange products={products} />;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const known = productCategories.find((item) => item.slug === category);
  const activeCategory = known?.slug ?? "all";
  const guide = known ? getCategoryGuide(known.slug) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Equipment"
        title={guide?.title ?? known?.label ?? "The hardware we stand behind"}
        description={
          guide?.intro ??
          "We are brand-agnostic on purpose — but not indifferent. Everything listed here has earned its place through field failure rates, warranty responsiveness and how it behaves in 105°F Texas summers."
        }
        crumbs={
          known
            ? [{ label: "Products", href: "/products" }, { label: known.label }]
            : [{ label: "Products" }]
        }
        image={
          guide?.heroImage ?? {
            src: "/images/hero/solar-crew.jpg",
            position: "center 42%",
          }
        }
        scrim="soft"
      />

      {/* Range */}
      <section id="catalogue" className="section-y bg-ink-50/60">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              title={guide?.rangeTitle ?? "Everything we supply and install"}
              description={
                guide?.rangeDescription ??
                "Prices depend on system design, roof access and incentives, so we quote rather than list. Ask about anything here and you will have a number the same day."
              }
            />
          </Reveal>

          <div className="mt-12">
            <Suspense fallback={<ProductGridSkeleton count={6} />}>
              <Range category={activeCategory} />
            </Suspense>
          </div>
        </Container>
      </section>

      {guide ? <CategoryGuide guide={guide} /> : null}

      <CtaBand
        title="Want a system spec'd around this kit?"
        body="Send us your address and last power bill. We'll model a system, price the exact equipment and show you the payback."
        primaryLabel="Request equipment pricing"
      />

      <BreadcrumbJsonLd
        items={
          known
            ? [
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: known.label, href: `/products?category=${known.slug}` },
              ]
            : [
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
              ]
        }
      />
    </>
  );
}
