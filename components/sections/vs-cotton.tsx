"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { VS_COTTON } from "@/lib/product";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText } from "@/components/effects/text-reveal";
import { DiamondPlate } from "@/components/effects/textures";

export function VsCotton() {
  return (
    <section
      id="vs-cotton"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
    >
      <DiamondPlate opacity={0.04} />

      <div className="container-x relative z-10">
        <div className="mb-16 max-w-3xl">
          <SectionLabel number="05" label="Сравнение" />
          <h2 className="mt-6 font-headline text-[clamp(2rem,5vw,3.75rem)]">
            <SplitText text="Хлопок vs" splitBy="word" stagger={0.08} />
            <br />
            <span className="text-[var(--color-accent)]">
              <SplitText
                text="микрофибра."
                splitBy="word"
                delay={0.2}
                stagger={0.08}
              />
            </span>
          </h2>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-primary)]">
          {/* Header */}
          <div className="grid grid-cols-3 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
            <div className="p-5 sm:p-6 font-caps text-[10px] sm:text-xs text-[var(--color-fg-muted)]">
              Параметр
            </div>
            <div className="p-5 sm:p-6 border-l border-[var(--color-border)] flex items-center gap-2">
              <X className="size-4 text-[var(--color-fg-muted)]" strokeWidth={2} />
              <span className="font-caps text-[10px] sm:text-xs text-[var(--color-fg-secondary)]">
                Хлопок
              </span>
            </div>
            <div className="p-5 sm:p-6 border-l border-[var(--color-border)] flex items-center gap-2 bg-[var(--color-accent-soft)] relative overflow-hidden">
              <Check
                className="size-4 text-[var(--color-accent)] relative z-10"
                strokeWidth={2.5}
              />
              <span className="font-caps text-[10px] sm:text-xs text-[var(--color-accent)] relative z-10">
                POLOTENCE
              </span>
              <motion.div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Rows */}
          {VS_COTTON.map((row, i) => (
            <motion.div
              key={row.metric}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="grid grid-cols-3 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-secondary)]/50 transition-colors group"
            >
              <div className="p-5 sm:p-6 text-sm text-[var(--color-fg-secondary)]">
                {row.metric}
              </div>
              <div className="p-5 sm:p-6 border-l border-[var(--color-border)] text-sm text-[var(--color-fg-muted)] line-through">
                {row.cotton}
              </div>
              <div className="p-5 sm:p-6 border-l border-[var(--color-border)] text-sm sm:text-base font-medium text-[var(--color-fg-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                {row.polotence}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 text-sm text-[var(--color-fg-muted)] max-w-[60ch]"
        >
          Сравнение основано на стандартном банном полотенце 70×140 см из 100% хлопка
          плотностью ~400 г/м² против POLOTENCE 80×40 см микрофибра.
        </motion.p>
      </div>
    </section>
  );
}
