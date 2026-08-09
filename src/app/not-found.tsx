import Link from "next/link";
import { ArrowRight, Home, Phone, Search } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const suggestions = [
  { label: "Our services", href: "/services" },
  { label: "Equipment we install", href: "/products" },
  { label: "Recent projects", href: "/projects" },
  { label: "Frequently asked questions", href: "/faq" },
];

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-brand-950 py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -left-32 top-0 size-136 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-120 rounded-full bg-flag-700/15 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            aria-hidden
            className="font-display text-[7rem] font-extrabold leading-none text-white/35 sm:text-[10rem]"
          >
            404
          </p>
          <h1 className="-mt-8 text-display-lg text-white sm:-mt-12">
            This circuit doesn&apos;t go anywhere
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-brand-100/85">
            The page you were looking for has been moved, renamed, or never
            existed. Nothing is on fire — let&apos;s get you back on track.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg" variant="light">
              <Home aria-hidden className="size-[1.15rem]" />
              Back to home
            </Button>
            <Button href={siteConfig.phoneHref} size="lg" variant="outline-light">
              <Phone aria-hidden className="size-[1.15rem]" />
              {siteConfig.phone}
            </Button>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="flex items-center justify-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-200/85">
              <Search aria-hidden className="size-4" />
              Try one of these
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
              {suggestions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[0.875rem] font-medium text-brand-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
