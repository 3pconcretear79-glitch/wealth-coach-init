import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, paymentMethod } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing priceId" },
        { status: 400 }
      );
    }

    if (paymentMethod === "paypal") {
      return NextResponse.json({
        method: "paypal",
        message: "Use client-side PayPal SDK for checkout",
      });
    }

    if (paymentMethod === "cashapp") {
      const cashTag = process.env.CASHAPP_CASHTAG || "$RAP0379";
      return NextResponse.json({
        method: "cashapp",
        cashTag,
        instructions:
          "Send payment to the CashTag and include your email in the note.",
      });
    }

    return NextResponse.json(
      { error: "Use PayPal or CashApp for payment." },
      { status: 422 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
