import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data/products";

/**
 * Tables are the one element on these pages that cannot reflow, so they scroll
 * inside their own rail rather than forcing the page to. The first column is
 * sticky, which is what keeps a horizontally-scrolled row readable — you can
 * always see which spec you are looking at.
 */
function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mx-4 mt-8 overflow-hidden sm:mx-0 sm:rounded-3xl sm:border sm:border-ink-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left">
          {children}
        </table>
      </div>
    </div>
  );
}

const headCell =
  "whitespace-nowrap bg-brand-950 px-4 py-4 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-brand-100 sm:px-5";
const bodyCell = "px-4 py-4 text-[0.9375rem] text-ink-700 sm:px-5";

/** A plain data table — pricing, sizing, anything with authored rows. */
export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <TableShell>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column}
              scope="col"
              className={cn(
                headCell,
                index === 0 && "sticky left-0 z-10",
              )}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row[0]}
            className="border-t border-ink-100 bg-white transition-colors even:bg-ink-50/60 hover:bg-brand-50/60"
          >
            {row.map((cell, index) => (
              <td
                key={`${row[0]}-${index}`}
                className={cn(
                  bodyCell,
                  index === 0
                    ? "sticky left-0 z-10 bg-inherit font-display font-bold text-ink-950"
                    : "whitespace-nowrap",
                )}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

/**
 * Side-by-side specification comparison, built from the catalogue rather than
 * authored — every product in a category shares a spec vocabulary, so the rows
 * are the union of those labels and the columns are the products themselves.
 * The column you arrived on is highlighted so you never lose it while scrolling.
 */
export function ComparisonTable({
  products,
  activeId,
}: {
  products: Product[];
  activeId: string;
}) {
  // Card summary first, then the extended datasheet rows, in authoring order.
  const rowsFor = (product: Product) => [
    ...product.specs,
    ...(product.datasheet ?? []),
  ];

  const labels: string[] = [];
  for (const product of products) {
    for (const spec of rowsFor(product)) {
      if (!labels.includes(spec.label)) labels.push(spec.label);
    }
  }

  const valueFor = (product: Product, label: string) =>
    rowsFor(product).find((spec) => spec.label === label)?.value ?? "—";

  return (
    <TableShell>
      <thead>
        <tr>
          <th scope="col" className={cn(headCell, "sticky left-0 z-10")}>
            Feature
          </th>
          {products.map((product) => (
            <th
              key={product.id}
              scope="col"
              className={cn(
                headCell,
                product.id === activeId && "bg-flag-800",
              )}
            >
              <span className="block text-[0.6875rem] font-semibold text-brand-200/80">
                {product.brand}
              </span>
              <span className="mt-0.5 block normal-case tracking-normal text-[0.875rem] text-white">
                {product.name}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...labels, "Warranty"].map((label) => (
          <tr
            key={label}
            className="border-t border-ink-100 bg-white transition-colors even:bg-ink-50/60 hover:bg-brand-50/60"
          >
            <th
              scope="row"
              className={cn(
                bodyCell,
                "sticky left-0 z-10 bg-inherit text-left font-display font-bold text-ink-950",
              )}
            >
              {label}
            </th>
            {products.map((product) => (
              <td
                key={product.id}
                className={cn(
                  bodyCell,
                  label === "Warranty" ? "min-w-[14rem]" : "whitespace-nowrap",
                  product.id === activeId &&
                    "bg-flag-50/70 font-semibold text-ink-900",
                )}
              >
                {label === "Warranty"
                  ? product.warranty
                  : valueFor(product, label)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
