"use client";

import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "inline-flex items-center gap-3 font-caps text-[11px] text-[var(--color-fg-secondary)]",
        className
      )}
    >
      <span className="text-[var(--color-accent)]">{number}</span>
      <span className="h-px w-8 bg-[var(--color-border-strong)]" />
      <span>{label}</span>
    </motion.div>
  );
}
