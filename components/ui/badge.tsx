import { cn } from "@/lib/utils";
import * as React from "react";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] px-3 py-1 font-caps text-[10px] tracking-[0.12em] text-[var(--color-fg-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
