"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { Gift as GiftIcon, Heart, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowRight } from "lucide-react";

const occasions = [
  { icon: GiftIcon, label: "23 февраля" },
  { icon: Heart, label: "День рождения" },
  { icon: PartyPopper, label: "Новый год" },
];

export function Gift() {
  return (
    <section
      id="gift"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-square rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] order-2 lg:order-1"
          >
            <Image
              src="/assets/main_photo/main_C_bag_hero_with_towel.png"
              alt="POLOTENCE 4 полотенца в брендированной zip-упаковке премиум подарок"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionLabel number="06" label="Подарок" />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-headline text-[clamp(2rem,5vw,3.75rem)]"
            >
              Подарок,
              <br />
              <span className="text-[var(--color-fg-muted)]">который</span>
              <br />
              используют.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-base sm:text-lg text-[var(--color-fg-secondary)] max-w-[42ch] leading-relaxed"
            >
              Не статуэтка. Не носки. Premium-комплект для тренировок
              в брендированной zip-упаковке. Парень, муж, папа или тренер —
              не разочаруется.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {occasions.map((o) => (
                <span
                  key={o.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-fg-secondary)]"
                >
                  <o.icon
                    className="size-3.5 text-[var(--color-accent)]"
                    strokeWidth={2}
                  />
                  {o.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10"
            >
              <Link href="/checkout" prefetch>
                <Button size="lg" variant="primary" className="group">
                  Заказать в подарок
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
