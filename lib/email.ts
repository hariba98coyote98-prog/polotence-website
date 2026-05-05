/**
 * Email sender via Resend.
 * Docs: https://resend.com/docs
 *
 * Required env vars:
 *   RESEND_API_KEY        — get from resend.com dashboard
 *   RESEND_FROM_EMAIL     — verified domain email, e.g. orders@polotence.ru
 *   RESEND_ADMIN_EMAIL    — where to send admin notifications (orders)
 *
 * For testing without verified domain, use: onboarding@resend.dev
 */

import { Resend } from "resend";
import { formatPrice } from "@/lib/utils";

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  amountRub: number;
  paymentId: string;
}

function resend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not set");
  }
  return new Resend(apiKey);
}

export async function sendOrderConfirmation(d: OrderEmailData) {
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const html = `<!doctype html>
<html lang="ru">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#ffffff;font-family:-apple-system,Inter,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <tr><td>
      <h1 style="font-size:32px;font-weight:900;letter-spacing:-0.02em;text-transform:uppercase;margin:0 0 24px;color:#ffffff;">POLOTENCE</h1>
      <p style="font-size:18px;line-height:1.5;color:#ffffff;margin:0 0 32px;">
        Заказ <strong style="color:#ff6b1a;">${d.orderId}</strong> успешно оплачен.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(255,255,255,0.16);padding-top:24px;margin-bottom:32px;">
        <tr><td style="padding:8px 0;color:#b8b8b8;font-size:14px;">Получатель:</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${d.customerName}</td></tr>
        <tr><td style="padding:8px 0;color:#b8b8b8;font-size:14px;">Email:</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${d.customerEmail}</td></tr>
        <tr><td style="padding:8px 0;color:#b8b8b8;font-size:14px;">Телефон:</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${d.customerPhone}</td></tr>
        <tr><td style="padding:8px 0;color:#b8b8b8;font-size:14px;">Адрес:</td><td style="padding:8px 0;color:#ffffff;font-size:14px;text-align:right;">${d.customerAddress}</td></tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(255,255,255,0.16);border-bottom:1px solid rgba(255,255,255,0.16);padding:24px 0;margin-bottom:32px;">
        <tr><td style="color:#ffffff;font-size:16px;">POLOTENCE — 4 спортивных полотенца микрофибра 80×40 см</td></tr>
        <tr><td style="padding-top:8px;color:#b8b8b8;font-size:14px;">1 шт × ${formatPrice(d.amountRub)}</td></tr>
      </table>

      <p style="font-size:14px;color:#b8b8b8;line-height:1.5;margin:0 0 24px;">
        Отправим заказ в течение 1–2 рабочих дней через СДЭК или Почту России.<br/>
        Трек-номер придёт отдельным письмом.
      </p>

      <p style="font-size:12px;color:#6a6a6a;margin:32px 0 0;line-height:1.5;">
        Платёж: ${d.paymentId}<br/>
        Если есть вопросы — ответьте на это письмо или напишите в Telegram @polotence.<br/>
        ИП Кюльмялуома Э.А. · ИНН 100128976705
      </p>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `POLOTENCE — заказ ${d.orderId}

Заказ успешно оплачен.

Получатель: ${d.customerName}
Email: ${d.customerEmail}
Телефон: ${d.customerPhone}
Адрес: ${d.customerAddress}

Товар: POLOTENCE — 4 спортивных полотенца микрофибра 80×40 см
Сумма: ${formatPrice(d.amountRub)}

Отправим в течение 1–2 рабочих дней.

Платёж: ${d.paymentId}
ИП Кюльмялуома Э.А. · ИНН 100128976705
`;

  // To customer
  await resend().emails.send({
    from: `POLOTENCE <${from}>`,
    to: d.customerEmail,
    subject: `Заказ ${d.orderId} оплачен — POLOTENCE`,
    html,
    text,
  });

  // Admin notification
  const admin = process.env.RESEND_ADMIN_EMAIL;
  if (admin) {
    await resend().emails.send({
      from: `POLOTENCE Orders <${from}>`,
      to: admin,
      subject: `🎉 Новый заказ ${d.orderId} · ${formatPrice(d.amountRub)}`,
      html,
      text,
    });
  }
}
