"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const plans = [
  {
    name: "Starter",
    price: "Free",
    priceValue: 0,
    period: "",
    description: "Perfect for getting started with AI financial guidance",
    features: ["5 AI chat sessions per month", "Basic portfolio analysis", "Market news digest", "Email support"],
    cta: "Start Free",
    popular: false,
    priceId: null as string | null,
  },
  {
    name: "Pro",
    price: "$19",
    priceValue: 19,
    period: "/month",
    description: "Advanced AI advisor for serious wealth builders",
    features: ["Unlimited AI chat sessions", "Advanced portfolio optimization", "Real-time market alerts", "Tax optimization strategies", "Custom investment plans", "Priority support"],
    cta: "Get Started",
    popular: true,
    priceId: "price_pro" as string | null,
  },
  {
    name: "Enterprise",
    price: "$99",
    priceValue: 99,
    period: "/month",
    description: "Full-service AI wealth management for high net worth",
    features: ["Everything in Pro", "Dedicated AI model fine-tuned to you", "Multi-account management", "Estate planning insights", "API access", "White-glove onboarding", "Phone and video support"],
    cta: "Get Started",
    popular: false,
    priceId: "price_enterprise" as string | null,
  },
];

type PaymentState = {
  verifying: boolean;
  success: boolean;
  error: string | null;
};

const defaultState: PaymentState = {
  verifying: false,
  success: false,
  error: null,
};

export default function Pricing() {
  const [paymentStates, setPaymentStates] = useState<Record<string, PaymentState>>({});

  const getState = (name: string): PaymentState => paymentStates[name] || { ...defaultState };
  const setState = (name: string, update: Partial<PaymentState>) => {
    setPaymentStates((prev) => ({ ...prev, [name]: { ...getState(name), ...update } }));
  };

  const verifyPayPalPayment = async (orderID: string, planName: string) => {
    setState(planName, { verifying: true, error: null });
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID, planName }),
      });
      const data = await response.json();
      if (data.success) {
        setState(planName, { success: true, verifying: false });
      } else {
        setState(planName, { error: data.error || "Payment verification failed", verifying: false });
      }
    } catch {
      setState(planName, { error: "Network error during verification. Please try again.", verifying: false });
    }
  };

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* FOUNDER'S DEAL BANNER */}
        <div className="mb-10 mx-auto max-w-3xl rounded-2xl border-2 border-amber-400/60 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 px-6 py-5 text-center shadow-lg shadow-amber-500/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🔥</span>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-amber-300 uppercase">Founder&apos;s Deal</span>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-sm md:text-base text-amber-100/90 font-medium">
            Lock in our <span className="font-bold text-white">Pro plan at just $19/mo</span> — available for a limited time only. Early supporters get this rate <span className="underline decoration-amber-400">for life</span>.
          </p>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Start free and upgrade as your wealth grows. All plans include our core AI advisor.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const state = getState(plan.name);
            const isPaid = plan.priceId !== null;
            return (
              <div key={plan.name} className={`relative rounded-2xl border p-8 flex flex-col ${plan.popular ? "border-gold-500/50 bg-gray-900 shadow-xl shadow-gold-500/10" : "border-gray-800 bg-gray-900/50"}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-gray-950 text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                {plan.popular && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 rounded-full px-3 py-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-amber-400 text-xs font-semibold">Limited Time Founder&apos;s Price</span>
                  </div>
                )}
                <p className="mt-3 text-sm text-gray-400">{plan.description}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-3">
                  {!isPaid ? (
                    <button className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${plan.popular ? "btn-primary" : "btn-secondary"}`}>{plan.cta}</button>
                  ) : state.success ? (
                    <div className="text-center py-3 rounded-lg bg-green-900/40 border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm">✓ Payment verified — thank you!</p>
                    </div>
                  ) : state.verifying ? (
                    <div className="text-center py-4">
                      <div className="inline-block w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-400 text-sm mt-2">Verifying payment...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <PayPalButtons
                        style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                        createOrder={(_data: Record<string, unknown>, actions: Record<string, unknown>) => {
                          const orderActions = actions as { order: { create: (opts: Record<string, unknown>) => Promise<string> } };
                          return orderActions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                              amount: {
                                currency_code: "USD",
                                value: plan.priceValue.toString(),
                              },
                              description: `AI Wealth Advisor - ${plan.name} Plan`,
                            }],
                          });
                        }}
                        onApprove={async (data: Record<string, unknown>) => {
                          const orderID = data.orderID as string;
                          await verifyPayPalPayment(orderID, plan.name);
                        }}
                        onError={() => {
                          setState(plan.name, { error: "PayPal encountered an error. Please try again." });
                        }}
                        onCancel={() => {
                          setState(plan.name, { error: "Payment was cancelled." });
                        }}
                      />
                      {state.error && (
                        <div className="rounded-lg bg-red-900/30 border border-red-600/30 p-3">
                          <p className="text-red-400 text-xs">{state.error}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
