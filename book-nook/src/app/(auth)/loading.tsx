import { Spinner } from "@/components/ui/spinner"

// Authentication route fallback while sign-in or sign-up UI is loading.
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#faf9f5] px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <Spinner className="size-10 text-[#068a3f]" label="Loading form" />
        <p className="text-sm font-medium text-[#536657]">Loading form...</p>
      </div>
    </main>
  )
}
