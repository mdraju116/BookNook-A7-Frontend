import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-[#faf9f5] px-5 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-[#e8e5dc] bg-white p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Skeleton className="min-h-96 rounded-2xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </section>
    </main>
  )
}
