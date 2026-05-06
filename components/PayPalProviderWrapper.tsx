"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = "AXJZ3V8cdUCKMTBrSLrGUq7nx9r6Wtb2qVQpFbvDD3eyvstitOSxtq5srLvACd9LcNCicZ5ckk96Bi-y";

export function PayPalProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
      {children}
    </PayPalScriptProvider>
  );
}
