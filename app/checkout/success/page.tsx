import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Заказ оплачен",
  description: "Спасибо за заказ POLOTENCE",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { order } = await searchParams;

  return (
    <>
      <Nav />
      <main className="flex-1 relative z-10 flex items-center justify-center pt-32 pb-24">
        <div className="container-x text-center max-w-2xl">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-[var(--color-accent-soft)] mb-8">
            <CheckCircle2
              className="size-10 text-[var(--color-accent)]"
              strokeWidth={1.5}
            />
          </div>

          <h1 className="font-headline text-[clamp(2.25rem,5vw,3.75rem)] mb-6">
            Заказ оплачен
          </h1>

          {order && (
            <p className="font-caps text-sm text-[var(--color-fg-muted)] mb-6">
              Номер: <span className="text-[var(--color-fg-primary)]">{order}</span>
            </p>
          )}

          <p className="text-base sm:text-lg text-[var(--color-fg-secondary)] leading-relaxed mb-12 max-w-[48ch] mx-auto">
            Спасибо! Подтверждение и реквизиты заказа отправили на email.
            Отгрузим в течение 1–2 рабочих дней через СДЭК или Почту России —
            трек-номер придёт отдельным письмом.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button variant="primary" size="lg">
                Вернуться на главную
              </Button>
            </Link>
            <a href="https://t.me/polotence" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="lg">
                Написать в Telegram
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
