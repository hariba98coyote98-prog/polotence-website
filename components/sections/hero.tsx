"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SplitText } from "@/components/effects/text-reveal";
import { Magnetic } from "@/components/effects/magnetic";
import { SweatParticles } from "@/components/effects/sweat-particles";
import { FabricWeave } from "@/components/effects/textures";
import { PRODUCT } from "@/lib/product";
import { formatPrice } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image parallax + scale
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Headline drift
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[100svh] flex items-center"
      id="hero"
    >
      {/* Layers: gradient glow → fabric weave → particles → grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(255,107,26,0.10), transparent 65%)",
        }}
      />
      <FabricWeave opacity={0.04} />
      <SweatParticles count={28} />

      {/* Vertical accent rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[var(--container-pad-x)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-border-strong)] to-transparent hidden md:block"
      />

      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-8 pt-32 pb-20">
        {/* Left: copy */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="lg:col-span-6 flex flex-col justify-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge>
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="size-1.5 rounded-full bg-[var(--color-accent)]"
              />
              Новинка · Pack of 4
            </Badge>
          </motion.div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-[var(--color-fg-primary)]">
            <span className="block">
              <SplitText text="4 полотенца —" splitBy="word" stagger={0.08} />
            </span>
            <span className="block relative">
              <SplitText
                text="целая неделя"
                splitBy="word"
                delay={0.25}
                stagger={0.08}
              />
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-0 right-0 -bottom-1 h-[6px] origin-left bg-[var(--color-accent)]"
                style={{ borderRadius: 1 }}
              />
            </span>
            <span className="block">
              <SplitText text="тренировок" splitBy="word" delay={0.55} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="text-base sm:text-lg text-[var(--color-fg-secondary)] max-w-[42ch] leading-relaxed"
          >
            Антибактериальная микрофибра. Впитывает в 5× эффективнее хлопка.
            Сохнет за 30 минут. Один комплект — недельный цикл без стирки после
            каждой тренировки.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3 sm:items-center"
          >
            <Magnetic strength={18}>
              <Link href="/checkout" prefetch>
                <Button size="xl" className="group">
                  <span>Купить · {formatPrice(PRODUCT.priceRub)}</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Button>
              </Link>
            </Magnetic>
            <Magnetic strength={12}>
              <a href="#pack">
                <Button variant="ghost" size="xl">
                  Что внутри
                </Button>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--color-fg-muted)] font-caps"
          >
            <span>Доставка СДЭК / Почта</span>
            <span className="hidden sm:block">·</span>
            <span>Оплата через ЮКасса</span>
            <span className="hidden sm:block">·</span>
            <span>Гарантия 6 мес.</span>
          </motion.div>
        </motion.div>

        {/* Right: hero product image with parallax */}
        <div className="lg:col-span-6 relative aspect-[4/5] lg:aspect-auto lg:min-h-[600px]">
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
          >
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/main_photo/main_A_pack_of_4.png"
                alt="POLOTENCE — 4 спортивных полотенца микрофибра 80x40 см комплект на неделю тренировок"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Inner gradient frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.55) 100%)",
              }}
            />
          </motion.div>

          {/* Floating spec card */}
          <Magnetic strength={10}>
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute -bottom-4 -left-4 sm:bottom-8 sm:left-8 bg-[var(--color-bg-primary)]/85 border border-[var(--color-border-strong)] rounded-[var(--radius-md)] p-5 backdrop-blur-md shadow-2xl max-w-[260px]"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-spec-number text-[42px] text-[var(--color-accent)]">
                  5×
                </span>
                <span className="text-xs font-caps text-[var(--color-fg-secondary)]">
                  впитывает
                </span>
              </div>
              <p className="text-xs text-[var(--color-fg-tertiary)] leading-relaxed">
                эффективнее хлопка. Сохнет за 30 минут.
              </p>
              <motion.div
                aria-hidden
                className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </motion.div>
          </Magnetic>
        </div>
      </div>

      {/* Bottom edge fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10,10,10,0.7))",
        }}
      />
    </section>
  );
}
