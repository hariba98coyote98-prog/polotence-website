"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  splitBy?: "word" | "char" | "line";
  delay?: number;
  stagger?: number;
}

/**
 * Splits text into words/chars and reveals each one from below mask on enter view.
 */
export function SplitText({
  text,
  className,
  splitBy = "word",
  delay = 0,
  stagger = 0.06,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const segments =
    splitBy === "char"
      ? text.split("")
      : splitBy === "line"
      ? text.split("\n")
      : text.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.05em" }}
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
            className="inline-block"
          >
            {seg === " " ? " " : seg}
            {splitBy === "word" && i < segments.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
