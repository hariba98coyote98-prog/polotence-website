"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

/**
 * 3D tilt that follows cursor over the card. Pure transform — composited.
 */
export function TiltCard({ children, className, glow = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 22 });
  const sy = useSpring(y, { stiffness: 240, damping: 22 });

  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  // Glow position
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
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
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,107,26,0.15), transparent 50%)`
            ),
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
