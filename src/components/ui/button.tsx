import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-lg",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",

        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground",

        link:
          "text-primary underline-offset-4 hover:underline",

        /* Premium Glass Variant */
        glass:
          "bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 shadow-lg shadow-black/5",

        /* Legacy Brand Variants (Refined) */
        mint:
          "bg-mint text-mint-foreground shadow-lg shadow-mint/10 hover:bg-mint/90 hover:shadow-mint/20 border border-transparent",

        coral:
          "bg-coral text-coral-foreground shadow-lg shadow-coral/10 hover:bg-coral/90 hover:shadow-coral/20 border border-transparent",

        lime:
          "bg-lime text-lime-foreground shadow-lg shadow-lime/10 hover:bg-lime/90 hover:shadow-lime/20 border border-transparent",

        "mint-outline":
          "border border-mint text-mint bg-transparent hover:bg-mint/10",

        "coral-outline":
          "border border-coral text-coral bg-transparent hover:bg-coral/10",

        "lime-outline":
          "border border-lime text-lime bg-transparent hover:bg-lime/10",

        tag:
          "bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-transparent hover:border-border text-xs uppercase tracking-wider font-semibold",

        "tag-active":
          "bg-primary text-primary-foreground text-xs uppercase tracking-wider font-semibold shadow-md shadow-primary/20",

        /* Shimmer Primary */
        "shimmer-primary":
          "relative overflow-hidden bg-white/10 text-white shadow-lg shadow-black/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all hover:[&>.shimmer-layer]:translate-x-[200%]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-8 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
        pill: "h-9 px-6 rounded-full",
        "pill-sm": "h-8 px-4 rounded-full text-xs",
        "pill-lg": "h-11 px-8 rounded-full",
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
      >
        {variant === "shimmer-primary" && (
          <div className="shimmer-layer absolute inset-0 -z-10 rounded-[inherit] bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-12 transition-transform duration-1000 ease-out" />
        )}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
