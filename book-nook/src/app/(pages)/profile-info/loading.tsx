import { Skeleton } from "@/components/ui/skeleton"

// Loading state for profile data and account statistics.
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8 flex flex-col items-center gap-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-72 max-w-full" />
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        <section className="flex flex-col items-center rounded-3xl border border-[#b7dfc2] bg-[#e5f6e9] p-8">
          <Skeleton className="size-32 rounded-full" />
          <Skeleton className="mt-5 h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-56" />
          <Skeleton className="mt-5 h-10 w-44 rounded-full" />
          <Skeleton className="mt-6 h-10 w-full rounded-lg" />
        </section>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-36 rounded-3xl" />
            <Skeleton className="h-36 rounded-3xl" />
          </div>
          <Skeleton className="h-48 rounded-3xl" />
        </div>
      </div>
    </main>
  )
}
