"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT } from "@/lib/product";

const items = [
  { href: "#pack", label: "Pack of 4" },
  { href: "#lifestyle", label: "Сценарии" },
  { href: "#antibact", label: "Технология" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-[var(--color-bg-primary)]/70 border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-display text-xl sm:text-2xl text-[var(--color-fg-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          POLOTENCE
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/checkout"
          prefetch
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg-primary)] h-10 px-4 text-xs font-caps transition-colors"
        >
          <ShoppingBag className="size-3.5" strokeWidth={2.5} />
          <span className="hidden sm:inline">Купить · {formatPrice(PRODUCT.priceRub)}</span>
          <span className="sm:hidden">{formatPrice(PRODUCT.priceRub)}</span>
        </Link>
      </div>
    </header>
  );
}
