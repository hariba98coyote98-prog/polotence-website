"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Shield, Sparkles, RefreshCw } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText } from "@/components/effects/text-reveal";
import { FabricWeave } from "@/components/effects/textures";

const points = [
  {
    icon: Shield,
    title: "Не пахнет после 3+ тренировок",
    body: "Структура волокон препятствует размножению бактерий — даже после интенсивной тренировки и ночи в сумке.",
  },
  {
    icon: RefreshCw,
    title: "Свойства сохраняются 100+ стирок",
    body: "Антибактериальный эффект — структурная особенность микрофибры. Не вымывается со временем.",
  },
  {
    icon: Sparkles,
    title: "Без обработки серебром и химии",
    body: "Никаких пропиток, ионов металлов, агрессивных составов. Только плотное переплетение синтетических волокон.",
  },
];

function PulsingShield() {
  return (
    <div className="relative size-full flex items-center justify-center">
      {/* Pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[var(--color-accent)]"
          style={{ width: "60%", height: "60%" }}
          animate={{
            scale: [1, 1.6],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Central shield SVG */}
      <motion.svg
        viewBox="0 0 200 200"
        className="relative z-10 w-1/2 h-1/2 max-w-[180px] max-h-[180px]"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B1A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0.3" />
          </linearGradient>
          <pattern id="shield-weave" width="6" height="6" patternUnits="userSpaceOnUse">
            <path
              d="M 0 3 L 6 3 M 3 0 L 3 6"
              stroke="white"
              strokeWidth="0.4"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <motion.path
          d="M 100 20 L 160 50 L 160 110 Q 160 160 100 180 Q 40 160 40 110 L 40 50 Z"
          fill="url(#shield-grad)"
          stroke="#FF6B1A"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <path
          d="M 100 20 L 160 50 L 160 110 Q 160 160 100 180 Q 40 160 40 110 L 40 50 Z"
          fill="url(#shield-weave)"
        />
        <motion.path
          d="M 70 100 L 92 122 L 132 78"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    </div>
  );
}

export function Antibact() {
  return (
    <section
      id="antibact"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
    >
      <FabricWeave opacity={0.03} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,107,26,0.08), transparent 70%)",
        }}
      />

      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <SectionLabel number="04" label="Технология" />

          <h2 className="mt-6 font-headline text-[clamp(1.875rem,4.5vw,3rem)]">
            <SplitText text="Антибактериальная" splitBy="word" stagger={0.08} />
            <br />
            <SplitText
              text="микрофибра."
              splitBy="word"
              delay={0.2}
              stagger={0.08}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-base text-[var(--color-fg-secondary)] leading-relaxed max-w-[44ch]"
          >
            Плотное переплетение тонких синтетических волокон — оптической
            плотностью около 200 г/м². Бактериям негде закрепиться и размножаться.
          </motion.p>

          <div className="mt-10 space-y-6">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 mt-1 relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-30 blur-md transition-opacity"
                  />
                  <div className="size-9 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center group-hover:border-[var(--color-accent)] transition-colors relative">
                    <p.icon
                      className="size-4 text-[var(--color-accent)]"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-caps text-xs text-[var(--color-fg-primary)] mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed max-w-[42ch]">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-8 text-xs text-[var(--color-fg-muted)] max-w-[44ch] leading-relaxed"
          >
            Антибактериальные свойства — структурная особенность волокна
            микрофибры, а не результат лабораторной сертификации. Мы не заявляем
            о медицинском или дезинфицирующем эффекте.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative aspect-square rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
        >
          {/* Background macro-fabric image */}
          <Image
            src="/assets/infographics/03_antibacterial.png"
            alt="Антибактериальная микрофибра POLOTENCE"
            fill
            className="object-cover opacity-50"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-[var(--color-bg-primary)]/40" />

          {/* Pulsing shield in center */}
          <div className="absolute inset-0">
            <PulsingShield />
          </div>

          {/* Corner labels */}
          <div className="absolute top-6 left-6 font-caps text-[10px] text-[var(--color-fg-muted)]">
            ANTIBACT · 100+ WASHES
          </div>
          <div className="absolute bottom-6 right-6 font-caps text-[10px] text-[var(--color-fg-muted)]">
            POLOTENCE — INHERENT WEAVE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
