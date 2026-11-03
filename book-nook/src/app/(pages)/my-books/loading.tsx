import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-[#faf9f5]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 flex flex-col items-center gap-3 border-b border-[#e8e5dc] pb-8">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-80 rounded-3xl" />)}
        </div>
      </section>
    </main>
  )
}
