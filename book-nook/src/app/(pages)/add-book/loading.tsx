import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="bg-[#f7fbf7] px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-3xl">
        <header className="mb-8 flex flex-col items-center gap-3">
          <Skeleton className="size-14 rounded-2xl" />
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-5 w-64" />
        </header>
        <div className="space-y-6 rounded-3xl border border-[#d6e9da] bg-white p-5 shadow-xl sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </section>
    </main>
  )
}
