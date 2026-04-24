import type { Metadata } from "next";
import "./globals.css";
import { PayPalProviderWrapper } from "@/components/PayPalProviderWrapper";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "AI Wealth Advisor — Smart Financial Guidance",
  description:
    "Get personalized, AI-powered financial advice. Plan your investments, optimize your portfolio, and build lasting wealth — all through an intuitive
          chat experience.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#pricing" className="btn-primary px-8 py-4  text-base">Start Free Trial</a>
          <a href="#chat" className="btn-secondary px-8 py-4 text-base">Try AI Chat Demo</a>
        </div>
        <div className="mt-16 flex items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            14-day free trial
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
}
