import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Electrical & Solar Services",
  description:
    "Solar, battery storage, air conditioning, EV charging, residential electrical, heat pumps, induction cooktops, test and tag and meter box upgrades across Austin and Central Texas. Fixed-price quotes, 25-year workmanship warranty.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything that carries current, under one licence"
        description="Nine service lines, one accountable team. Whether it is a dead circuit at 2am or a 65 kW rooftop array, the same company designs it, installs it and warrants it."
        crumbs={[{ label: "Services" }]}
        stats={[
          { value: "9", label: "Service lines" },
          { value: "4,100+", label: "Projects delivered" },
          { value: "< 2 hrs", label: "Emergency response" },
          { value: "25 yrs", label: "Workmanship warranty" },
        ]}
      />

      <section className="section-y bg-white" aria-labelledby="all-services">
        <Container>
          {/* Keeps the h1 → h2 → h3 outline intact for the service cards below. */}
          <h2 id="all-services" className="sr-only">
            All electrical and solar services
          </h2>
          <ServicesExplorer />
        </Container>
      </section>

      <Process />
      <CtaBand
        title="Tell us what you need."
        body="Describe the job in a sentence and we'll tell you what it involves, what it costs and when we can start."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
    </>
  );
}
