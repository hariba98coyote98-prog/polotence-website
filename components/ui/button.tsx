"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-caps text-sm transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)] active:translate-y-px",
        secondary:
          "bg-[var(--color-fg-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-fg-tertiary)]",
        ghost:
          "bg-transparent text-[var(--color-fg-primary)] border border-[var(--color-border-strong)] hover:bg-[var(--color-bg-secondary)]",
        link:
          "bg-transparent text-[var(--color-fg-primary)] underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-base",
      },
      shape: {
        default: "rounded-[var(--radius-sm)]",
        pill: "rounded-[var(--radius-pill)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
