import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-[#e5f2e8] before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:bg-linear-to-r before:from-transparent before:via-white/75 before:to-transparent before:content-[''] before:animate-[booknook-shimmer_1.8s_ease-in-out_infinite]",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
