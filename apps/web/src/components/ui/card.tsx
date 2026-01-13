import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground shadow-sm",
        glass: "bg-[#09090b] border-white/5 text-foreground shadow-lg shadow-black/10 hover:border-white/10 rounded-3xl",
        "glass-shimmer": "group relative bg-[#09090b]/80 border-white/5 text-foreground shadow-2xl hover:border-white/10 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] rounded-3xl overflow-hidden backdrop-blur-md",
        elevated: "bg-card text-card-foreground shadow-xl shadow-black/20 border-white/10",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-6 md:p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> { }

function Card({ className, variant, padding, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    >
      {variant === "glass-shimmer" && (
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

/* Legacy support but generic */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "ml-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  cardVariants,
}
