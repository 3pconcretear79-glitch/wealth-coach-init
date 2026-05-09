import { NextRequest, NextResponse } from "next/server";

const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  "AXJZ3V8cdUCKMTBrSLrGUq7nx9r6Wtb2qVQpFbvDD3eyvstitOSxtq5srLvACd9LcNCicZ5ckk96Bi-y";

const PAYPAL_CLIENT_SECRET =
  process.env.PAYPAL_CLIENT_SECRET ||
  "EMw8nXNUYhfpr4oJwzk7Otjglwb7KK4qor_9hj3hBh090dxIIol_O_197-l1WCBqB_jWlE3egZSRyF2Q";

const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE || "https://api-m.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials are not configured");
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to get PayPal access token: ${err}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function capturePayPalOrder(orderId: string): Promise<Record<string, unknown>> {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to capture PayPal order: ${err}`);
  }

  return response.json();
}

async function getPayPalOrderDetails(orderId: string): Promise<Record<string, unknown>> {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to get PayPal order details: ${err}`);
  }

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderID, planName } = body;

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    if (!planName) {
      return NextResponse.json({ error: "Missing planName" }, { status: 400 });
    }

    const captureData = await capturePayPalOrder(orderID) as Record<string, unknown>;
    const captureStatus = captureData.status as string;

    if (captureStatus === "COMPLETED") {
      const purchaseUnits = captureData.purchase_units as Array<Record<string, unknown>>;
      const capture = ((purchaseUnits?.[0]?.payments as Record<string, unknown>)?.captures as Array<Record<string, unknown>>)?.[0];
      const transactionId = capture?.id || orderID;
      const amount = (capture?.amount as Record<string, unknown>)?.value || "unknown";
      const currency = (capture?.amount as Record<string, unknown>)?.currency_code || "USD";
      const payerEmail = ((captureData.payer as Record<string, unknown>)?.email_address) || "unknown";

      console.log("=== VERIFIED PAYPAL TRANSACTION ===");
      console.log(`Transaction ID: ${transactionId}`);
      console.log(`Order ID: ${orderID}`);
      console.log(`Plan: ${planName}`);
      console.log(`Amount: ${amount} ${currency}`);
      console.log(`Payer Email: ${payerEmail}`);
      console.log(`Status: ${captureStatus}`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log("===================================");

      return NextResponse.json({
        success: true,
        transactionId,
        status: captureStatus,
        plan: planName,
        amount,
        currency,
      });
    } else {
      const orderDetails = await getPayPalOrderDetails(orderID);
      console.log("PayPal order not completed:", JSON.stringify(orderDetails, null, 2));

      return NextResponse.json(
        {
          success: false,
          error: `Payment not completed. Status: ${captureStatus}`,
          status: captureStatus,
        },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("PayPal capture error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
