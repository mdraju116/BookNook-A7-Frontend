import { Skeleton } from "@/components/ui/skeleton"

// Loading state for the authenticated reader's borrowed books.
export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 flex flex-col items-center gap-3 border-b border-[#e8e5dc] pb-8">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </header>
        <div className="overflow-hidden rounded-3xl border border-[#e8e5dc] bg-white">
          <Skeleton className="h-14 w-full rounded-none" />
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-20 w-full rounded-xl" />)}
          </div>
        </div>
      </section>
    </main>
  )
}
