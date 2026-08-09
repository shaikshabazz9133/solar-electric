import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/lib/data/projects";

export function ProjectsShowcase() {
  const [lead, ...rest] = getFeaturedProjects();

  return (
    <section className="section-y bg-white">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Recent work"
            title={
              <>
                Real projects, with the{" "}
                <span className="text-gradient-brand">numbers attached</span>
              </>
            }
            description="Every case study below lists what we promised and what the system actually delivered. Ask any contractor for the same and see what you get."
          />
          <Reveal delay={0.18} className="shrink-0">
            <Button href="/projects" variant="ghost">
              All case studies
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" zoom>
            <Tilt max={4} scale={1.01} glareClassName="rounded-4xl">
              <ProjectCard project={lead} size="large" />
            </Tilt>
          </Reveal>

          <div className="grid gap-6 lg:col-span-2">
            {rest.map((project, index) => (
              <Reveal key={project.slug} delay={0.08 * (index + 1)} direction="left">
                <Tilt max={5} glareClassName="rounded-4xl">
                  <ProjectCard project={project} />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
