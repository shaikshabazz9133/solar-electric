import { Container } from "@/components/ui/Section";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <>
      <section className="bg-brand-950 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        <Container>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-4 w-40 bg-white/10" />
            <Skeleton className="h-10 w-3/4 max-w-xl bg-white/10" />
            <Skeleton className="h-4 w-full max-w-2xl bg-white/10" />
            <Skeleton className="h-4 w-2/3 max-w-xl bg-white/10" />
            <Skeleton className="mt-4 h-20 w-full rounded-2xl bg-white/10" />
          </div>
        </Container>
      </section>

      <section className="section-y bg-white">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="mt-14">
            <ProductGridSkeleton count={6} />
          </div>
        </Container>
      </section>
    </>
  );
}
