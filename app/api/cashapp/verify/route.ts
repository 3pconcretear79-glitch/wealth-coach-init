import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cashAppName, transactionId, planName, amount } = body;

    if (!cashAppName || !transactionId || !planName) {
      return NextResponse.json(
        { error: "Missing required fields: cashAppName, transactionId, planName" },
        { status: 400 }
      );
    }

    const cleanCashAppName = cashAppName.startsWith("$") ? cashAppName : `$${cashAppName}`;

    console.log("=== CASHAPP VERIFICATION SUBMITTED ===");
    console.log(`CashApp Name: ${cleanCashAppName}`);
    console.log(`Transaction ID: ${transactionId}`);
    console.log(`Plan: ${planName}`);
    console.log(`Amount: $${amount}`);
    console.log(`Status: PENDING_VERIFICATION`);
    console.log(`Submitted At: ${new Date().toISOString()}`);
    console.log("======================================");

    return NextResponse.json({
      success: true,
      message: "Verification submitted successfully. Your payment will be confirmed shortly.",
      verification: {
        cashAppName: cleanCashAppName,
        transactionId,
        plan: planName,
        amount,
        status: "PENDING_VERIFICATION",
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("CashApp verification error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
