import { cn } from "@/lib/utils";

/**
 * Shimmer placeholder. `aria-hidden` because the loading state is announced
 * once, by the container, rather than by every individual bar.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-lg bg-ink-100",
        "after:absolute after:inset-0 after:animate-shimmer",
        "after:bg-linear-to-r after:from-transparent after:via-white/70 after:to-transparent",
        className,
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-soft">
      <Skeleton className="mb-5 aspect-[4/3] w-full rounded-2xl" />
      <Skeleton className="mb-2.5 h-3 w-20" />
      <Skeleton className="mb-3 h-5 w-3/4" />
      <Skeleton className="mb-5 h-3.5 w-full" />
      <div className="grid grid-cols-2 gap-2.5">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading equipment"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading equipment…</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft">
      <Skeleton className="mb-5 size-12 rounded-2xl" />
      <Skeleton className="mb-3 h-5 w-2/3" />
      <Skeleton className="mb-2 h-3.5 w-full" />
      <Skeleton className="h-3.5 w-4/5" />
    </div>
  );
}
