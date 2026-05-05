"use client";

import { Marquee } from "@/components/effects/marquee";
import { SteelDivider } from "@/components/effects/textures";

const items = [
  "POLOTENCE",
  "4 шт",
  "впитывает 5×",
  "сохнет 30 мин",
  "антибактериальная микрофибра",
  "80×40 см",
  "не оставляет ворса",
  "100+ стирок",
];

export function MarqueeStrip() {
  return (
    <section
      aria-hidden
      className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]/40 overflow-hidden"
    >
      <SteelDivider className="absolute top-0 left-0 right-0" />
      <Marquee speed={40} className="py-6">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 font-display text-2xl sm:text-3xl text-[var(--color-fg-primary)]"
          >
            <span>{item}</span>
            <span className="text-[var(--color-accent)]">·</span>
          </span>
        ))}
      </Marquee>
      <SteelDivider className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}
