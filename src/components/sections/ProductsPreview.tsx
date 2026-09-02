import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { productCategories, products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

const featured = ["np-440", "vault-13", "amp-48"];

export function ProductsPreview() {
  const shown = products.filter((product) => featured.includes(product.id));

  return (
    <>
    </>
    // <section className="section-y bg-ink-50/60">
    //   <Container>
    //     <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    //       <SectionHeading
    //         align="left"
    //         eyebrow="Equipment"
    //         title={
    //           <>
    //             We only install kit we would put on{" "}
    //             <span className="text-gradient-brand">our own roofs</span>
    //           </>
    //         }
    //         description="No white-label modules, no orphan inverter brands. Every product we carry has a manufacturer still standing behind it — and a local warranty channel we have actually used."
    //       />
    //       <Reveal delay={0.18} className="shrink-0">
    //         <Button href="/products" variant="ghost">
    //           Browse all equipment
    //           <ArrowRight aria-hidden className="size-4" />
    //         </Button>
    //       </Reveal>
    //     </div>

    //     {/* Category chips */}
    //     <StaggerGroup className="mt-12 flex flex-wrap gap-3">
    //       {productCategories.map((category) => {
    //         return (
    //           <StaggerItem key={category.slug}>
    //             <Link
    //               href={`/products?category=${category.slug}`}
    //               className="group flex items-center gap-3 rounded-2xl border border-ink-100 bg-white py-3 pl-3 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
    //             >
    //               <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
    //                 <Icon name={category.icon} aria-hidden className="size-[1.15rem]" />
    //               </span>
    //               <span>
    //                 <span className="block text-[0.9375rem] font-semibold text-ink-950">
    //                   {category.label}
    //                 </span>
    //                 <span className="block text-[0.75rem] text-ink-500">
    //                   {category.blurb}
    //                 </span>
    //               </span>
    //             </Link>
    //           </StaggerItem>
    //         );
    //       })}
    //     </StaggerGroup>

    //     <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    //       {shown.map((product) => (
    //         <StaggerItem key={product.id} className="h-full" lift>
    //           <Tilt className="h-full" max={5} scale={1.015}>
    //             <ProductCard product={product} />
    //           </Tilt>
    //         </StaggerItem>
    //       ))}
    //     </StaggerGroup>
    //   </Container>
    // </section>
  );
}
