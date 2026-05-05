"use client";

import { motion } from "motion/react";
import {
  Package,
  Droplets,
  Wind,
  Shield,
  Ruler,
  Feather,
  type LucideIcon,
} from "lucide-react";
import { USPS } from "@/lib/product";
import { SectionLabel } from "@/components/ui/section-label";
import { TiltCard } from "@/components/effects/tilt-card";
import { RevealNumber } from "@/components/effects/animated-number";
import { SplitText } from "@/components/effects/text-reveal";
import { RubberFloor } from "@/components/effects/textures";

const ICONS: Record<string, LucideIcon> = {
  Package,
  Droplets,
  Wind,
  Shield,
  Ruler,
  Feather,
};

export function Usps() {
  return (
    <section
      id="usps"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
    >
      <RubberFloor opacity={0.05} />

      <div className="container-x relative z-10">
        <div className="mb-16 max-w-2xl">
          <SectionLabel number="01" label="Технология" />
          <h2 className="mt-6 font-headline text-[clamp(2rem,5vw,3.5rem)]">
            <SplitText text="Спецификации," splitBy="word" stagger={0.08} />
            <br />
            <span className="text-[var(--color-fg-muted)]">
              <SplitText
                text="не маркетинг."
                splitBy="word"
                delay={0.2}
                stagger={0.08}
              />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
          {USPS.map((usp, i) => {
            const Icon = ICONS[usp.icon];
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.06,
                }}
                className="bg-[var(--color-bg-primary)]"
              >
                <TiltCard className="group relative h-full p-8 sm:p-10 hover:bg-[var(--color-bg-secondary)] transition-colors duration-500">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-8">
                    {Icon && (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                        <Icon
                          className="size-7 text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent)] transition-colors relative"
                          strokeWidth={1.4}
                        />
                      </div>
                    )}
                    <span className="font-caps text-[10px] text-[var(--color-fg-muted)]">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Spec number */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <RevealNumber className="font-spec-number text-[64px] sm:text-[88px] text-[var(--color-fg-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
                      {usp.number}
                    </RevealNumber>
                    <span className="font-caps text-xs text-[var(--color-fg-secondary)]">
                      {usp.unit}
                    </span>
                  </div>

                  <h3 className="font-caps text-sm text-[var(--color-fg-primary)] mb-3">
                    {usp.title}
                  </h3>
                  <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed max-w-[34ch]">
                    {usp.body}
                  </p>

                  {/* Hover accent corner */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute top-0 right-0 h-8 w-8 origin-top-right scale-0 transition-transform duration-500 group-hover:scale-100"
                    style={{
                      background:
                        "linear-gradient(225deg, var(--color-accent) 0%, var(--color-accent) 50%, transparent 50%)",
                    }}
                  />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
