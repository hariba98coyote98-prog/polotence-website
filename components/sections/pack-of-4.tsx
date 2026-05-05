"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { WEEK_CYCLE } from "@/lib/product";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText } from "@/components/effects/text-reveal";
import { FabricWeave } from "@/components/effects/textures";

const stages = [
  {
    day: "ПН",
    headline: "Понедельник.",
    body: "Достал свежее полотенце, кинул использованное в стирку.",
    accent: "01",
  },
  {
    day: "СР",
    headline: "Среда.",
    body: "Снова свежее в зал. Прошлое уже сухое и чистое.",
    accent: "02",
  },
  {
    day: "ПТ",
    headline: "Пятница.",
    body: "Третий цикл. В сумке всегда сухое и без запаха.",
    accent: "03",
  },
  {
    day: "СБ",
    headline: "Суббота.",
    body: "Последнее свежее. Одна стирка в неделю — и всё снова готово.",
    accent: "04",
  },
];

export function PackOfFour() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Active index from 0 to stages.length
  const indexProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, stages.length - 1]);

  return (
    <section
      ref={ref}
      id="pack"
      className="relative border-t border-[var(--color-border)] overflow-hidden"
      style={{ height: `${stages.length * 90}vh` }}
    >
      <FabricWeave opacity={0.03} />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,107,26,0.06), transparent 70%)",
          }}
        />

        <div className="container-x relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: scrolling text stage */}
          <div className="lg:col-span-6 relative">
            <SectionLabel number="02" label="Pack of 4" />
            <h2 className="mt-6 font-headline text-[clamp(2rem,5vw,3.75rem)] mb-12">
              <SplitText text="Один комплект —" splitBy="word" stagger={0.06} />
              <br />
              <SplitText
                text="недельный цикл."
                splitBy="word"
                delay={0.2}
                stagger={0.06}
              />
            </h2>

            {/* Stack of stages, only active visible */}
            <div className="relative h-48 sm:h-56">
              {stages.map((stage, i) => {
                const opacity = useTransform(
                  indexProgress,
                  [i - 0.5, i, i + 0.5],
                  [0, 1, 0]
                );
                const y = useTransform(
                  indexProgress,
                  [i - 0.5, i, i + 0.5],
                  [40, 0, -40]
                );
                return (
                  <motion.div
                    key={i}
                    style={{ opacity, y }}
                    className="absolute inset-0"
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-spec-number text-5xl sm:text-6xl text-[var(--color-accent)]">
                        {stage.day}
                      </span>
                      <span className="font-caps text-xs text-[var(--color-fg-muted)]">
                        / {stage.accent}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-headline text-[var(--color-fg-primary)] mb-3">
                      {stage.headline}
                    </h3>
                    <p className="text-base sm:text-lg text-[var(--color-fg-secondary)] max-w-[42ch] leading-relaxed">
                      {stage.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress rail */}
            <div className="mt-12 flex gap-2">
              {stages.map((_, i) => {
                const fill = useTransform(
                  indexProgress,
                  [i - 0.6, i],
                  ["0%", "100%"]
                );
                return (
                  <div
                    key={i}
                    className="flex-1 h-px bg-[var(--color-border)] relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
                      style={{ width: fill }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: rotating pack visual */}
          <div className="lg:col-span-6 relative aspect-[4/5] lg:aspect-square rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <motion.div
              style={{
                rotate: useTransform(scrollYProgress, [0, 1], [0, -8]),
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]),
              }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/infographics/01_week_cycle.png"
                alt="Один комплект POLOTENCE на неделю тренировок · 1 стирка в неделю · без запаха"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>

            {/* Day cards floating on image */}
            <div className="absolute inset-0 grid grid-cols-7 gap-1 p-4 sm:p-6 items-end pointer-events-none">
              {WEEK_CYCLE.map((d, i) => {
                const opacity = useTransform(
                  indexProgress,
                  [i / WEEK_CYCLE.length - 0.5, i / WEEK_CYCLE.length, i / WEEK_CYCLE.length + 0.5],
                  [0.3, 1, 0.6]
                );
                return (
                  <motion.div
                    key={d.day}
                    style={{ opacity }}
                    className={`relative aspect-[3/4] rounded-[var(--radius-sm)] border p-2 backdrop-blur-md ${
                      d.state === "fresh"
                        ? "border-[var(--color-accent)] bg-[var(--color-bg-primary)]/80"
                        : "border-[var(--color-border)] bg-[var(--color-bg-primary)]/60"
                    }`}
                  >
                    <span
                      className={`font-caps text-[9px] sm:text-[10px] ${
                        d.state === "fresh"
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-fg-muted)]"
                      }`}
                    >
                      {d.day}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
