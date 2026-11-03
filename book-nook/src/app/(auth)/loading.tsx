import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-[#b7dfc2] bg-[#e5f6e9] p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <div className="mt-8 space-y-5">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </main>
  )
}
