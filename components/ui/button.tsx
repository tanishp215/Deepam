import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0A07] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white hover:opacity-90",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-[rgba(249,115,22,0.2)] bg-transparent text-[#D6D3D1] hover:border-[rgba(249,115,22,0.45)] hover:text-[#F97316] hover:bg-[rgba(249,115,22,0.05)]",
        secondary:
          "bg-[#1A1410] text-[#D6D3D1] border border-[rgba(249,115,22,0.1)] hover:bg-[#241D16] hover:text-[#FAFAF9]",
        ghost:
          "bg-transparent text-[#A8A29E] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#FAFAF9]",
        link:
          "text-[#F97316] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
