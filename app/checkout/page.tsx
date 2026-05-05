import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { CheckoutForm } from "./checkout-form";
import Image from "next/image";
import { PRODUCT } from "@/lib/product";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "POLOTENCE — оформите заказ на 4 спортивных полотенца за 1799 ₽",
};

export default function CheckoutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <h1 className="font-headline text-[clamp(2rem,4vw,3rem)] mb-3">
                Оформление заказа
              </h1>
              <p className="text-sm text-[var(--color-fg-secondary)] mb-10 max-w-[48ch]">
                После оплаты отправим заказ в течение 1–2 рабочих дней
                через СДЭК или Почту России. Трек-номер пришлём на email.
              </p>

              <CheckoutForm />
            </div>

            {/* Order summary */}
            <aside className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 sm:p-8">
                <h2 className="font-caps text-xs text-[var(--color-fg-muted)] mb-6">
                  Ваш заказ
                </h2>

                <div className="flex gap-4 mb-6">
                  <div className="relative size-24 sm:size-28 flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                    <Image
                      src="/assets/main_photo/main_A_pack_of_4.png"
                      alt="POLOTENCE 4 шт"
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm sm:text-base text-[var(--color-fg-primary)] mb-1">
                      POLOTENCE
                    </h3>
                    <p className="text-xs text-[var(--color-fg-secondary)] leading-relaxed">
                      4 спортивных полотенца микрофибра 80×40 см
                    </p>
                    <p className="mt-2 text-xs font-caps text-[var(--color-fg-muted)]">
                      {PRODUCT.id}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-fg-secondary)]">Товар × 1</span>
                    <span className="text-[var(--color-fg-primary)]">
                      {formatPrice(PRODUCT.priceRub)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-fg-secondary)]">Доставка</span>
                    <span className="text-[var(--color-fg-secondary)]">по тарифу</span>
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)] mt-4 pt-4 flex justify-between items-baseline">
                  <span className="font-caps text-xs text-[var(--color-fg-muted)]">
                    Итого
                  </span>
                  <span className="font-spec-number text-3xl text-[var(--color-accent)]">
                    {formatPrice(PRODUCT.priceRub)}
                  </span>
                </div>

                <p className="mt-6 text-[11px] text-[var(--color-fg-muted)] leading-relaxed">
                  Оплата проходит через ЮКасса. Принимаем карты МИР/Visa/Mastercard,
                  СБП, ЮMoney. Ваши данные защищены протоколами безопасности
                  банковской отрасли.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
