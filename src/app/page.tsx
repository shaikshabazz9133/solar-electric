import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { Process } from "@/components/sections/Process";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "Electricians & Solar Installers in Austin, TX",
  description:
    "Licensed master electricians and NABCEP-certified solar installers serving Austin and Central Texas. Fixed-price quotes, 25-year workmanship warranty, 24/7 emergency service.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WhyUs />
      <SavingsCalculator />
      <Process />
      <ProductsPreview />
      <ProjectsShowcase />
      <Testimonials />
      <FaqPreview />
      <CtaBand />
      <FaqJsonLd items={homeFaqs} />
    </>
  );
}
