import { Skeleton } from "@/components/ui/skeleton"

// Global fallback shown while a route segment is waiting for server-rendered content.
export default function Loading() {
  return (
    <main className="bg-[#fbf8f1]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <Skeleton className="h-72 w-full rounded-3xl sm:h-96" />
      </section>
      <section className="bg-[#fbf8f1]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
          <div className="mb-8 flex flex-col items-center gap-3 sm:mb-10">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-5 w-80 max-w-full" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-80 rounded-3xl" />)}
          </div>
        </div>
      </section>
    </main>
  )
}
