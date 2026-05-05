"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT } from "@/lib/product";
import { formatPrice } from "@/lib/utils";

export function CtaStrip() {
  return (
    <section
      id="cta"
      className="section-y border-t border-[var(--color-border)] relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,26,0.1), transparent 70%)",
        }}
      />

      <div className="container-x relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,8vw,6.5rem)] text-[var(--color-fg-primary)] max-w-5xl mx-auto"
        >
          4 шт ·{" "}
          <span className="text-[var(--color-accent)]">{formatPrice(PRODUCT.priceRub)}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-base sm:text-lg text-[var(--color-fg-secondary)] max-w-[44ch] mx-auto"
        >
          Один комплект — целая неделя тренировок. Доставка по всей России.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12"
        >
          <Link href="/checkout" prefetch>
            <Button size="xl" className="group">
              Купить комплект
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-caps text-[var(--color-fg-muted)]"
        >
          <span>СДЭК · Почта России</span>
          <span>·</span>
          <span>Оплата ЮКасса</span>
          <span>·</span>
          <span>Гарантия 6 мес.</span>
          <span>·</span>
          <span>Возврат 14 дней</span>
        </motion.div>
      </div>
    </section>
  );
}
