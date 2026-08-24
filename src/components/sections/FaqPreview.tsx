import Link from "next/link";
import { ArrowRight, Headset, MessageCircleQuestion } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { homeFaqs } from "@/lib/data/faqs";
import { siteConfig } from "@/lib/site";

export function FaqPreview() {
  return (
    <section className="section-y bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-display-lg">
                The things people{" "}
                <span className="text-gradient-brand">actually ask us</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600 sm:text-base">
                Straight answers, including the ones that cost us work. If your
                question is not here, ask it — we reply the same day.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 rounded-3xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-6">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft ring-1 ring-brand-100">
                  <Headset aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink-950">
                  Still not sure?
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                  Talk to an actual electrician, not a call centre.
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  {siteConfig.phone}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <Button href="/faq" variant="ghost" className="mt-6">
                <MessageCircleQuestion aria-hidden className="size-4" />
                Read all FAQs
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1} direction="left">
            <Accordion items={homeFaqs} />
            <p className="mt-8 text-[0.9375rem] text-ink-500">
              Looking for something more specific?{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors hover:text-brand-800"
              >
                Send us the question
              </Link>{" "}
              and we&apos;ll answer it properly.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
