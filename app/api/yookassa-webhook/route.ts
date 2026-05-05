import { NextRequest, NextResponse } from "next/server";
import { fetchPayment } from "@/lib/yookassa";
import { sendOrderConfirmation } from "@/lib/email";

export const runtime = "nodejs";

/**
 * ЮКасса webhook handler.
 * Configure URL in YooKassa admin: https://<your-domain>/api/yookassa-webhook
 * Subscribe to events: payment.succeeded, payment.canceled, payment.waiting_for_capture
 *
 * Security:
 *  - YooKassa does not sign webhooks with HMAC by default.
 *  - We verify by re-fetching the payment via API (single source of truth).
 *  - Optionally restrict by IP allowlist (185.71.76.0/27, 185.71.77.0/27, 77.75.153.0/25,
 *    77.75.154.128/25, 77.75.156.11, 77.75.156.35, 2a02:5180::/32) — set up at edge/CDN.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = body?.event as string | undefined;
    const paymentObject = body?.object;
    const paymentId = paymentObject?.id;

    if (!paymentId) {
      return NextResponse.json({ ok: false, reason: "no payment id" }, { status: 400 });
    }

    // Re-fetch payment from API (don't trust webhook payload directly)
    const payment = await fetchPayment(paymentId);

    if (event === "payment.succeeded" && payment.status === "succeeded") {
      const meta = payment.metadata || {};
      const amountRub = Math.round(parseFloat(payment.amount.value));

      try {
        await sendOrderConfirmation({
          orderId: meta.order_id || paymentId,
          customerName: meta.customer_name || "—",
          customerEmail: meta.customer_email || "",
          customerPhone: meta.customer_phone || "",
          customerAddress: meta.customer_address || "",
          amountRub,
          paymentId,
        });
      } catch (mailErr) {
        // Don't fail the webhook on mail error
        console.error("[email send error]", mailErr);
      }

      console.log("[order succeeded]", {
        orderId: meta.order_id,
        paymentId,
        amount: payment.amount,
      });
    }

    if (event === "payment.canceled") {
      console.log("[order canceled]", { paymentId });
    }

    // Always 200 — otherwise YooKassa retries
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[yookassa-webhook]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
