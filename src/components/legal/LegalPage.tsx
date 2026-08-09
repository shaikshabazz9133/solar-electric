import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";

/** Shared shell so the two legal pages stay visually identical. */
export function LegalPage({
  title,
  description,
  updated,
  crumb,
  children,
}: {
  title: string;
  description: string;
  updated: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={description}
        crumbs={[{ label: crumb }]}
      />

      <section className="section-y bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink-500">
              Last updated {updated}
            </p>
            <div className="mt-8 flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-ink-600 sm:text-base [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-950 [&_li]:pl-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
              {children}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
