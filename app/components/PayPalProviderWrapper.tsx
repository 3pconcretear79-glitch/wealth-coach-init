"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";
export function PayPalProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "USD", intent: "capture" }}>
      {children}
    </PayPalScriptProvider>
  );
}
