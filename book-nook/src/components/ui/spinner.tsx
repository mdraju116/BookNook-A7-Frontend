import { cn } from "cn"

type SpinnerProps = React.ComponentProps<"span"> & {
  label?: string
}

function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("inline-flex size-5 items-center justify-center text-[#068a3f]", className)}
      {...props}
    >
      <span className="relative size-full animate-[booknook-spin_850ms_cubic-bezier(0.4,0,0.2,1)_infinite] rounded-full border-[4px] border-current/15 border-t-current border-r-current">
        <span className="absolute inset-[5px] rounded-full bg-current/10" />
        <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-current" />
      </span>
    </span>
  )
}

export { Spinner }
