"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` once when scrolled into view.
 */
export function AnimatedNumber({
  value,
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/**
 * For non-integer / formatted display (e.g. "5×", "30", "80×40"), reveal via mask.
 */
export function RevealNumber({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}
    >
      <motion.span
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
