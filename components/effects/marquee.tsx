"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for one full loop
  reverse?: boolean;
  className?: string;
}

/**
 * Endless horizontal marquee. Children repeated 4× and animated for seamless loop.
 */
export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="inline-flex gap-12 items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="inline-flex gap-12 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
