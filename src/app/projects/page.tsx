import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Residential, commercial, industrial and community electrical and solar projects delivered across Central Texas — with the promised numbers and the actual results side by side.",
  alternates: { canonical: "/projects" },
};

const outcomes = [
  { value: 38, suffix: " MW", label: "Solar capacity installed" },
  { value: 4100, suffix: "+", label: "Projects completed" },
  { value: 612, suffix: " MWh", label: "Saved annually, one retrofit" },
  { value: 0, suffix: " hrs", label: "Client downtime in 2025" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="What we promised, and what it actually delivered"
        description="Every case study lists the modelled numbers next to the measured ones. Where we were off, we say by how much."
        crumbs={[{ label: "Projects" }]}
      />

      <section className="section-y bg-white">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-4xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
            {/* Reveal renders the div itself so <dl> keeps a valid child list. */}
            {outcomes.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 0.06}
                className="h-full bg-white px-6 py-8"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
                    <Counter value={item.value} suffix={item.suffix} />
                  </span>
                  <span className="mt-2 block text-[0.875rem] text-ink-500">
                    {item.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-16">
            <SectionHeading
              align="left"
              eyebrow="Equipment"
              title="The kit behind every project"
              description="Every category we design, supply and install. Pick one to see it — and the exact hardware we fit."
            />
            <div className="mt-12">
              <ProductShowcase />
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              align="left"
              eyebrow="Case studies"
              title="Six projects, four sectors, one standard"
              description="Filter by sector to see the work most like yours. Every project here is referenceable — ask and we will connect you with the client."
            />
            <div className="mt-12">
              <ProjectsExplorer />
            </div>
          </div>
        </Container>
      </section>

      <Testimonials />

      <CtaBand
        title="Want your project on this page?"
        body="Send us the drawings, the address or just a photo of the problem. We'll tell you what it takes."
        primaryLabel="Start a project"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
      />
    </>
  );
}
