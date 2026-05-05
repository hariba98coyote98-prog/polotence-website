"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface SweatParticlesProps {
  count?: number;
  className?: string;
}

/**
 * Slowly drifting "sweat / chalk dust" particles in the background.
 * Position is randomized per mount but deterministic via seed math for SSR safety.
 */
export function SweatParticles({ count = 24, className }: SweatParticlesProps) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Pseudo-random but deterministic
      const seed = i * 7919;
      return {
        x: (Math.sin(seed) * 50 + 50).toFixed(2),
        y: (Math.cos(seed * 1.3) * 50 + 50).toFixed(2),
        size: 1 + ((seed % 5) / 5) * 3,
        delay: (seed % 10) / 2,
        duration: 8 + (seed % 6),
        drift: 20 + (seed % 30),
        opacity: 0.15 + ((seed % 5) / 5) * 0.35,
      };
    });
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[var(--color-accent)]"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            filter: "blur(0.4px)",
          }}
          animate={{
            y: [-d.drift, d.drift, -d.drift],
            opacity: [d.opacity, d.opacity * 1.6, d.opacity],
          }}
          transition={{
            duration: d.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}
