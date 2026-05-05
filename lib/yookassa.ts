/**
 * ЮКасса (YooKassa) API client.
 * Docs: https://yookassa.ru/developers/api
 *
 * Required env vars:
 *   YOOKASSA_SHOP_ID       — your shop ID from yookassa.ru admin
 *   YOOKASSA_SECRET_KEY    — secret key (live or test)
 *   YOOKASSA_RETURN_URL    — full URL where customer is redirected after payment
 *
 * Webhook URL to configure in YooKassa admin:
 *   https://<your-domain>/api/yookassa-webhook
 */

const YK_API_BASE = "https://api.yookassa.ru/v3";

interface CreatePaymentParams {
  amountRub: number;
  description: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  returnUrl: string;
  /** items for FZ-54 receipt — required if shop is integrated with online cash register via YooKassa */
  receiptItems?: Array<{
    description: string;
    quantity: number;
    amountRub: number;
  }>;
}

export interface YkPayment {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  amount: { value: string; currency: string };
  confirmation: {
    type: "redirect" | string;
    confirmation_url?: string;
  };
  metadata?: Record<string, string>;
  paid: boolean;
  description?: string;
  created_at: string;
}

function authHeader(): string {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const key = process.env.YOOKASSA_SECRET_KEY;
  if (!shopId || !key) {
    throw new Error(
      "ЮКасса credentials missing. Set YOOKASSA_SHOP_ID and YOOKASSA_SECRET_KEY in .env.local"
    );
  }
  const token = Buffer.from(`${shopId}:${key}`).toString("base64");
  return `Basic ${token}`;
}

function rub(amount: number): string {
  return amount.toFixed(2);
}

export async function createPayment(p: CreatePaymentParams): Promise<YkPayment> {
  const idempotenceKey = crypto.randomUUID();

  // Build receipt block. vat_code:
  //   1 = БЕЗ НДС (УСН — typical for ИП)
  //   2 = 0%
  //   3 = 10%
  //   4 = 20%
  //   5 = 10/110, 6 = 20/120
  // ⚠ Default 1 (БЕЗ НДС) — corrects per real tax mode of ИП Кюльмялуома Э.А.
  const VAT_CODE = 1;

  const body = {
    amount: {
      value: rub(p.amountRub),
      currency: "RUB",
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: p.returnUrl,
    },
    description: p.description,
    metadata: {
      order_id: p.orderId,
      customer_email: p.customerEmail,
      customer_name: p.customerName,
    },
    // ФЗ-54 receipt — uncomment & adjust when онлайн-касса is wired up.
    // receipt: p.receiptItems
    //   ? {
    //       customer: {
    //         email: p.customerEmail,
    //         phone: p.customerPhone.replace(/\D/g, ""),
    //       },
    //       items: p.receiptItems.map((item) => ({
    //         description: item.description.slice(0, 128),
    //         quantity: item.quantity.toFixed(0),
    //         amount: { value: rub(item.amountRub), currency: "RUB" },
    //         vat_code: VAT_CODE,
    //         payment_subject: "commodity",
    //         payment_mode: "full_prepayment",
    //       })),
    //     }
    //   : undefined,
  };

  const res = await fetch(`${YK_API_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Idempotence-Key": idempotenceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ЮКасса API error ${res.status}: ${errText}`);
  }

  return (await res.json()) as YkPayment;
}

export async function fetchPayment(paymentId: string): Promise<YkPayment> {
  const res = await fetch(`${YK_API_BASE}/payments/${paymentId}`, {
    headers: { Authorization: authHeader() },
  });
  if (!res.ok) {
    throw new Error(`ЮКасса fetchPayment error ${res.status}`);
  }
  return (await res.json()) as YkPayment;
}
