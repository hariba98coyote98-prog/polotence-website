"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { FabricWeave, ConcreteGrain } from "@/components/effects/textures";
import { SplitText } from "@/components/effects/text-reveal";

interface FabricBreakProps {
  /** Path of full-bleed image. Should be an extreme close-up of microfiber/towel. */
  image: string;
  alt: string;
  /** Caption text shown over the image. */
  text: string;
  subtext?: string;
}

/**
 * Full-bleed cinematic break with parallax + heavy texture.
 * Use to separate major sections and reset the visual rhythm.
 */
export function FabricBreak({ image, alt, text, subtext }: FabricBreakProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 0.4, 0.4, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] min-h-[500px] overflow-hidden"
      aria-hidden={false}
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[var(--color-bg-primary)]"
        style={{ opacity: overlayOpacity }}
      />
      <FabricWeave opacity={0.08} />
      <ConcreteGrain opacity={0.12} />

      {/* Edge fades for blending */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-bg-primary), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg-primary), transparent)",
        }}
      />

      <motion.div
        style={{ opacity: textOpacity }}
        className="container-x relative z-10 h-full flex flex-col justify-center"
      >
        <h3 className="font-display text-[clamp(2.5rem,8vw,7rem)] text-[var(--color-fg-primary)] max-w-5xl leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
          <SplitText text={text} splitBy="word" stagger={0.05} />
        </h3>
        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-[44ch] text-base sm:text-lg text-[var(--color-fg-secondary)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            {subtext}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
