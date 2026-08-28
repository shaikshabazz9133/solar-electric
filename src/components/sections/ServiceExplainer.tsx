import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceExplainerBlock } from "@/lib/data/services";

/**
 * "How it actually works" explainer: copy and numbered points on one side, a
 * diagram on the other.
 *
 * The diagram is authored SVG rather than a photo, so it stays crisp at any
 * width and carries the brand palette; its own `<title>` and `aria-label`
 * describe the flow, and the numbered points repeat the same three steps as
 * text for anyone who never sees it.
 */
export function ServiceExplainer({ block }: { block: ServiceExplainerBlock }) {
  return (
    // No top padding: the process band above is also white and already ends
    // with a full `section-y` gap, so a second one just opens a void.
    <section className="bg-white pb-18 pt-2 sm:pb-24 lg:pb-30">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{block.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-display-md">{block.title}</h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
                {emphasise(block.intro, block.introEmphasis)}
              </p>
            </Reveal>

            <StaggerGroup className="mt-9 flex flex-col gap-4">
              {block.points.map((point, index) => (
                <StaggerItem key={point}>
                  <div className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50/70 p-5 transition-colors duration-300 hover:border-brand-200 hover:bg-brand-50/50">
                    {/* The rule and numeral share a column so the numerals
                        stay aligned however long the copy runs. */}
                    <span className="flex shrink-0 items-center gap-4">
                      <span
                        aria-hidden
                        className="h-11 w-1 rounded-full bg-brand-300 transition-colors duration-300 group-hover:bg-brand-600"
                      />
                      <span className="font-display text-2xl font-bold text-brand-600">
                        {index + 1}
                      </span>
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-700">
                      {point}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal delay={0.1} direction="left">
            <div className="relative overflow-hidden rounded-4xl border border-ink-100 bg-ink-50/60 p-3 shadow-soft sm:p-5">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-auto w-full rounded-3xl"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Bolds one phrase inside the standfirst without reaching for a markdown parser. */
function emphasise(text: string, term?: string) {
  if (!term) return text;

  const at = text.indexOf(term);
  if (at === -1) return text;

  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-ink-900">{term}</strong>
      {text.slice(at + term.length)}
    </>
  );
}
