import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { COMPANY, PRODUCT } from "@/lib/product";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="font-display text-3xl text-[var(--color-fg-primary)] inline-block">
              POLOTENCE
            </Link>
            <p className="mt-4 text-sm text-[var(--color-fg-secondary)] max-w-[36ch] leading-relaxed">
              Спортивные полотенца из микрофибры. 4 шт на неделю тренировок.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition-colors w-fit"
              >
                <Mail className="size-3.5" strokeWidth={1.75} />
                {COMPANY.contact.email}
              </a>
              <a
                href={`https://t.me/${COMPANY.contact.telegram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-secondary)] hover:text-[var(--color-accent)] transition-colors w-fit"
              >
                <Send className="size-3.5" strokeWidth={1.75} />
                Telegram
              </a>
            </div>
          </div>

          {/* Product nav */}
          <div className="md:col-span-3">
            <h4 className="font-caps text-[10px] text-[var(--color-fg-muted)] mb-5">
              Продукт
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#usps" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Технология
                </a>
              </li>
              <li>
                <a href="#pack" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Pack of 4
                </a>
              </li>
              <li>
                <a href="#lifestyle" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Сценарии
                </a>
              </li>
              <li>
                <a href="#gift" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  В подарок
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Вопросы
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h4 className="font-caps text-[10px] text-[var(--color-fg-muted)] mb-5">
              Информация
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/legal/oferta" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Оферта
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Конфиденциальность
                </Link>
              </li>
              <li>
                <Link href="/legal/delivery" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/legal/return" className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors">
                  Возврат
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-2">
            <h4 className="font-caps text-[10px] text-[var(--color-fg-muted)] mb-5">
              Заказать
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/checkout"
                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-medium"
                >
                  Купить · 1 799 ₽
                </Link>
              </li>
              <li>
                <a
                  href={COMPANY.ozon}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-fg-secondary)] hover:text-[var(--color-fg-primary)] transition-colors"
                >
                  Карточка на Ozon →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-xs text-[var(--color-fg-muted)] leading-relaxed max-w-[60ch]">
            <p>
              © {year} POLOTENCE. {COMPANY.legal} · ИНН {COMPANY.inn}
            </p>
            <p className="mt-2">
              Артикул: {PRODUCT.id} · Страна-производитель: {PRODUCT.countryOfOrigin} ·
              Гарантия {PRODUCT.warrantyMonths} месяцев. Не является публичной офертой.
            </p>
          </div>
          <div className="font-display text-2xl text-[var(--color-fg-muted)]">
            POLOTENCE
          </div>
        </div>
      </div>
    </footer>
  );
}
