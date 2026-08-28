import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data/products";

/**
 * The range grid for a single category page — the products themselves, with no
 * search or filter chrome around them. Category switching lives in the header
 * nav, so the page stays a landing page rather than a tool.
 */
export function ProductRange({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="rounded-3xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-14 text-center text-[0.9375rem] text-ink-600">
        We stock more than we list. Tell us the make and model you are after and
        we will price it.
      </p>
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <StaggerItem key={product.id} className="h-full">
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
