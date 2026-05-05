"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { LIFESTYLE } from "@/lib/product";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText } from "@/components/effects/text-reveal";
import { ConcreteGrain } from "@/components/effects/textures";

interface SceneCardProps {
  scene: (typeof LIFESTYLE)[number];
  index: number;
}

function SceneCard({ scene, index }: SceneCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="group relative aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={scene.src}
          alt={`POLOTENCE сценарий: ${scene.label} — ${scene.desc}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-90" />

      {/* Hover-only mid overlay for depth */}
      <div className="absolute inset-0 bg-[var(--color-accent-soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <figcaption className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
        <div className="flex items-baseline justify-between mb-2">
          <motion.span
            className="font-display text-3xl sm:text-4xl text-[var(--color-fg-primary)]"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {scene.label}
          </motion.span>
          <span className="font-caps text-[10px] text-[var(--color-fg-muted)]">
            {scene.id}
          </span>
        </div>
        <p className="text-sm text-[var(--color-fg-secondary)] max-w-[36ch]">
          {scene.desc}
        </p>

        {/* Hover accent line */}
        <motion.div
          className="absolute left-6 sm:left-8 bottom-4 h-px bg-[var(--color-accent)] origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: "40px" }}
        />
      </figcaption>
    </motion.figure>
  );
}

export function Lifestyle() {
  return (
    <section
      id="lifestyle"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
    >
      <ConcreteGrain opacity={0.04} />

      <div className="container-x relative z-10">
        <div className="mb-16 max-w-3xl">
          <SectionLabel number="03" label="Сценарии" />
          <h2 className="mt-6 font-headline text-[clamp(2rem,5vw,3.75rem)]">
            <SplitText text="Четыре сцены —" splitBy="word" stagger={0.06} />
            <br />
            <span className="text-[var(--color-accent)]">
              <SplitText
                text="один комплект."
                splitBy="word"
                delay={0.2}
                stagger={0.06}
              />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LIFESTYLE.map((scene, i) => (
            <SceneCard key={scene.id} scene={scene} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
