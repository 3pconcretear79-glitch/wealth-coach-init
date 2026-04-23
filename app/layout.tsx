import type { Metadata } from "next";
import "./globals.css";
import { PayPalProviderWrapper } from "@/components/PayPalProviderWrapper";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "AI Wealth Advisor — Smart Financial Guidance",
  description:
    "Get personalized, AI-powered financial advice. Plan your investments, optimize your portfolio, and build lasting wealth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PayPalProviderWrapper>{children}</PayPalProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
