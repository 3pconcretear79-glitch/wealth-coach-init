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

    // Handle PayPal checkout
    if (paymentMethod === "paypal") {
      const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
      if (!paypalClientId || paypalClientId === "your_paypal_client_id_here") {
        return NextResponse.json(
          {
            error:
              "PayPal is not configured. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to .env.local",
            url: null,
          },
          { status: 422 }
        );
      }
      // PayPal checkout is handled client-side via the PayPal JS SDK.
      // This endpoint confirms the server acknowledges the PayPal method.
      return NextResponse.json({
        method: "paypal",
        message: "Use client-side PayPal SDK for checkout",
      });
    }

    // Handle CashApp checkout
    if (paymentMethod === "cashapp") {
      const cashTag = process.env.CASHAPP_CASHTAG || "$WealthCoach";
      return NextResponse.json({
        method: "cashapp",
        cashTag,
        instructions:
          "Send payment to the CashTag and include your email in the note.",
      });
    }

    // Default: Stripe checkout (legacy support)
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey || secretKey === "sk_test_placeholder") {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local. You can also use PayPal or CashApp.",
          url: null,
        },
        { status: 422 }
      );
    }

    // Dynamic import to avoid build errors when stripe package is absent
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secretKey, { apiVersion: "2023-10-16" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/?success=true`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
