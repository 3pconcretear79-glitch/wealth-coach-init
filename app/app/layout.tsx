import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
