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
      <span className="relative size-full animate-[booknook-spin_1.1s_linear_infinite] rounded-full border-[3px] border-current/20 border-t-current">
        <span className="absolute inset-1 animate-pulse rounded-full bg-current/70" />
      </span>
    </span>
  )
}

export { Spinner }
