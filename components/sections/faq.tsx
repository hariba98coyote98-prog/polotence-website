"use client";

import * as motion from "motion/react-client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/lib/product";
import { SectionLabel } from "@/components/ui/section-label";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-y border-t border-[var(--color-border)]"
    >
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <SectionLabel number="07" label="FAQ" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-headline text-[clamp(2rem,5vw,3.5rem)]"
          >
            Частые
            <br />
            вопросы.
          </motion.h2>
          <p className="mt-6 text-sm text-[var(--color-fg-secondary)] max-w-[36ch] leading-relaxed">
            Не нашли ответ? Напишите нам в{" "}
            <a
              href="https://t.me/polotence"
              className="text-[var(--color-accent)] underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-[var(--color-border)]">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="border-b border-[var(--color-border)]"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="text-base sm:text-lg font-medium text-[var(--color-fg-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 size-8 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-soft)] transition-all">
                      {isOpen ? (
                        <Minus
                          className="size-3.5 text-[var(--color-accent)]"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Plus
                          className="size-3.5 text-[var(--color-fg-secondary)] group-hover:text-[var(--color-accent)]"
                          strokeWidth={2.5}
                        />
                      )}
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-sm sm:text-base text-[var(--color-fg-secondary)] leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
