import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createPayment } from "@/lib/yookassa";
import { PRODUCT } from "@/lib/product";

export const runtime = "nodejs";

const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().min(7).max(40),
  city: z.string().min(1).max(120),
  address: z.string().min(3).max(300),
  comment: z.string().max(500).optional(),
  agree: z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Проверьте корректность полей формы" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const orderId = `POL-${Date.now().toString(36).toUpperCase()}`;

    // Build absolute return URL (Vercel sets headers; fallback to env)
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const host =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      process.env.NEXT_PUBLIC_SITE_HOST ||
      "polotence.vercel.app";
    const returnUrl = `${proto}://${host}/checkout/success?order=${orderId}`;

    const payment = await createPayment({
      amountRub: PRODUCT.priceRub,
      description: `${PRODUCT.name} · заказ ${orderId}`,
      orderId,
      customerEmail: data.email,
      customerName: data.name,
      customerPhone: data.phone,
      returnUrl,
      receiptItems: [
        {
          description: PRODUCT.name,
          quantity: 1,
          amountRub: PRODUCT.priceRub,
        },
      ],
    });

    const url = payment.confirmation?.confirmation_url;
    if (!url) {
      throw new Error("ЮКасса не вернула confirmation_url");
    }

    // TODO: persist order to database before returning so webhook can match it later.
    // For MVP we rely on metadata.order_id + email in webhook; user data is in metadata too.
    console.log("[POLOTENCE order]", {
      orderId,
      paymentId: payment.id,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        address: data.address,
        comment: data.comment,
      },
    });

    return NextResponse.json({ url, paymentId: payment.id, orderId });
  } catch (err) {
    console.error("[create-payment]", err);
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
