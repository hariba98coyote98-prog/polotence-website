"use client";

import { cn } from "@/lib/utils";

/**
 * Microfiber weave SVG pattern — fine cross-hatch suggesting fabric structure.
 */
export function FabricWeave({
  className,
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="fabric-weave"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 3 L 6 3 M 3 0 L 3 6"
            stroke="white"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            d="M 1.5 0 L 1.5 6 M 4.5 0 L 4.5 6"
            stroke="white"
            strokeWidth="0.2"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fabric-weave)" />
    </svg>
  );
}

/**
 * Concrete grain — gym wall feel.
 */
export function ConcreteGrain({
  className,
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity, mixBlendMode: "overlay" }}
    >
      <filter id="concrete">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#concrete)" />
    </svg>
  );
}

/**
 * Rubber gym floor — repeating dot grid pattern.
 */
export function RubberFloor({
  className,
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="rubber-floor"
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="7" cy="7" r="1.6" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rubber-floor)" />
    </svg>
  );
}

/**
 * Diamond plate — checker steel pattern.
 */
export function DiamondPlate({
  className,
  opacity = 0.05,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="diamond-plate"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="20" height="20" fill="transparent" />
          <path
            d="M 0 10 L 10 0 L 20 10 L 10 20 Z"
            stroke="white"
            strokeWidth="0.6"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diamond-plate)" />
    </svg>
  );
}

/**
 * Steel gradient horizontal divider line.
 */
export function SteelDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full", className)}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 20%, rgba(255,107,26,0.4) 50%, rgba(255,255,255,0.16) 80%, transparent 100%)",
      }}
    />
  );
}
