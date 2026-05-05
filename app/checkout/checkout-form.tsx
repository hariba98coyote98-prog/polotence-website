"use client";

import { useState } from "react";
import { Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  comment: string;
  agree: boolean;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  comment: "",
  agree: false,
};

export function CheckoutForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Не удалось создать платёж");
      }
      // Redirect to ЮКасса confirmation page
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
      setSubmitting(false);
    }
  }

  const fieldClass =
    "w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-4 py-3 text-base text-[var(--color-fg-primary)] placeholder:text-[var(--color-fg-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";
  const labelClass =
    "block font-caps text-[10px] text-[var(--color-fg-muted)] mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>
          Имя и фамилия *
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          className={fieldClass}
          placeholder="Иван Петров"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Телефон *
          </label>
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={update("phone")}
            className={fieldClass}
            placeholder="+7 999 123-45-67"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className={labelClass}>
          Город *
        </label>
        <input
          id="city"
          type="text"
          required
          autoComplete="address-level2"
          value={form.city}
          onChange={update("city")}
          className={fieldClass}
          placeholder="Москва"
        />
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>
          Адрес доставки *
        </label>
        <input
          id="address"
          type="text"
          required
          autoComplete="street-address"
          value={form.address}
          onChange={update("address")}
          className={fieldClass}
          placeholder="ул. Ленина 12, кв. 34 или ПВЗ СДЭК"
        />
      </div>

      <div>
        <label htmlFor="comment" className={labelClass}>
          Комментарий к заказу
        </label>
        <textarea
          id="comment"
          rows={3}
          value={form.comment}
          onChange={update("comment")}
          className={`${fieldClass} resize-none`}
          placeholder="Например: позвонить за час до доставки"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          required
          checked={form.agree}
          onChange={update("agree")}
          className="mt-1 size-4 accent-[var(--color-accent)] cursor-pointer"
        />
        <span className="text-sm text-[var(--color-fg-secondary)] leading-relaxed">
          Согласен с{" "}
          <a
            href="/legal/oferta"
            target="_blank"
            className="text-[var(--color-accent)] underline-offset-4 hover:underline"
          >
            офертой
          </a>{" "}
          и{" "}
          <a
            href="/legal/privacy"
            target="_blank"
            className="text-[var(--color-accent)] underline-offset-4 hover:underline"
          >
            политикой обработки персональных данных
          </a>
          .
        </span>
      </label>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-[var(--radius-sm)] border border-red-500/40 bg-red-500/10 text-red-300 text-sm">
          <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        size="xl"
        disabled={submitting || !form.agree}
        className="w-full sm:w-auto group"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" strokeWidth={2.5} />
            Переходим к оплате…
          </>
        ) : (
          <>
            Перейти к оплате
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </>
        )}
      </Button>
    </form>
  );
}
