"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";

/**
 * Soft orange blob follows mouse pointer.
 * Mounts once at root layout.
 */
export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 200, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 28, mass: 0.6 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    }
    function onLeave() {
      x.set(-400);
      y.set(-400);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[2] hidden md:block"
      style={{
        x: sx,
        y: sy,
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle, rgba(255,107,26,0.18) 0%, rgba(255,107,26,0.08) 30%, transparent 60%)",
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
