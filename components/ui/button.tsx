import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Desert Sienna filled — primary CTA
        default:
          "bg-[#F97316] text-white hover:opacity-88 active:scale-[0.98]",
        // Obsidian filled
        secondary:
          "bg-[#0D0A07] text-white border border-transparent hover:border-white active:scale-[0.98]",
        // Ghost on dark surface
        outline:
          "bg-transparent text-white border border-white hover:bg-white/8",
        // Ghost on light surface
        ghost:
          "bg-transparent text-[#000d10] border border-[#000d10] hover:bg-[rgba(0,13,16,0.05)]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        link:
          "text-[#bc7155] underline-offset-4 hover:underline",
      },
      size: {
        default: "text-[17px] rounded-full px-[22px] pt-[15px] pb-[16px] leading-none",
        sm:      "text-[17px] rounded-full px-[16px] pt-[11px] pb-[12px] leading-none",
        lg:      "text-[17px] rounded-full px-[34px] pt-[17px] pb-[18px] leading-none",
        icon:    "h-10 w-10 rounded-full",
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
