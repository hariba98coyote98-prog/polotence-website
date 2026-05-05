"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps a child element so it tilts/translates toward the cursor on hover.
 */
export function Magnetic({ children, strength = 24, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20 });
  const sy = useSpring(y, { stiffness: 280, damping: 20 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / rect.width) * strength;
    const dy = ((e.clientY - cy) / rect.height) * strength;
    x.set(dx);
    y.set(dy);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
