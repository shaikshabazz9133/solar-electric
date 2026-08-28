import { Info } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { ServicePricingBlock } from "@/lib/data/services";

/**
 * Indicative price list for a service.
 *
 * Two columns only, so the table never needs a horizontal scroller — it just
 * tightens its padding on small screens. The header row is a real `<thead>`
 * rather than a styled div so the figures stay readable to a screen reader.
 */
export function ServicePricingTable({ block }: { block: ServicePricingBlock }) {
  return (
    <section className="section-y relative isolate overflow-hidden bg-ink-50/60">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-ink absolute inset-0 opacity-70" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow={block.eyebrow}
          title={block.title}
          description={block.intro}
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          {/* `overflow-x-auto` is belt-and-braces: two columns fit any phone,
              but a long price string can never push the page sideways. */}
          <div className="overflow-x-auto overflow-y-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
            <table className="w-full min-w-[19rem] border-collapse text-left">
              <caption className="sr-only">{block.title}</caption>
              <thead>
                <tr className="bg-brand-900 text-white">
                  <th
                    scope="col"
                    className="px-5 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.14em] sm:px-8 sm:py-5 sm:text-xs"
                  >
                    {block.columns[0]}
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-right text-[0.6875rem] font-bold uppercase tracking-[0.14em] sm:px-8 sm:py-5 sm:text-xs"
                  >
                    {block.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr
                    key={row.size}
                    className="border-t border-ink-100 transition-colors duration-200 odd:bg-white even:bg-ink-50/50 hover:bg-brand-50/50"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-display text-[0.9375rem] font-bold text-ink-950 sm:px-8 sm:py-4.5 sm:text-base"
                    >
                      {row.size}
                    </th>
                    <td className="px-5 py-4 text-right font-display text-[0.9375rem] font-bold text-brand-700 sm:px-8 sm:py-4.5 sm:text-base">
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 text-[0.875rem] leading-relaxed text-brand-900 sm:p-5 sm:text-[0.9375rem]">
            <Info aria-hidden className="mt-0.5 size-4.5 shrink-0 text-brand-600" />
            <span className="font-medium">{block.note}</span>
          </p>

          <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
            {block.outro}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
