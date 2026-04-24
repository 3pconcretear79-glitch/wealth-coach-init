"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const CASHAPP_TAG = "$RAP0379";

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
    priceId: null,
  },
  {
    name: "Pro",
    price: "$29",
    priceValue: 29,
    period: "/month",
    description: "Advanced AI advisor for serious wealth builders",
    features: ["Unlimited AI chat sessions", "Advanced portfolio optimization", "Real-time market alerts", "Tax optimization strategies", "Custom investment plans", "Priority support"],
    cta: "Get Started",
    popular: true,
    priceId: "price_pro_placeholder",
  },
  {
    name: "Enterprise",
    price: "$99",
    priceValue: 99,
    period: "/month",
    description: "Full-service AI wealth management for high net worth",
    features: ["Everything in Pro", "Dedicated AI model fine-tuned to you", "Multi-account management", "Estate planning insights", "API access", "White-glove onboarding", "Phone & video support"],
    cta: "Get Started",
    popular: false,
    priceId: "price_enterprise_placeholder",
  },
];

type PaymentMethod = "select" | "paypal" | "cashapp";

interface PlanPaymentState {
  method: PaymentMethod;
  success: boolean;
}

export default function Pricing() {
  const [paymentStates, setPaymentStates] = useState<Record<string, PlanPaymentState>>({});

  const getState = (planName: string): PlanPaymentState =>
    paymentStates[planName] || { method: "select", success: false };

  const setState = (planName: string, update: Partial<PlanPaymentState>) => {
    setPaymentStates((prev) => ({ ...prev, [planName]: { ...getState(planName), ...update } }));
  };

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
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
                <p className="mt-3 text-sm text-gray-400">{plan.description}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-3">
                  {!isPaid ? (
                    <button className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${plan.popular ? "btn-primary" : "btn-secondary"}`}>{plan.cta}</button>
                  ) : state.success ? (
                    <div className="text-center py-3 rounded-lg bg-green-900/40 border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm">\u2713 Payment initiated \u2014 thank you!</p>
                    </div>
                  ) : state.method === "select" ? (
                    <>
                      <button onClick={() => setState(plan.name, { method: "paypal" })} className="w-full py-3 rounded-lg font-semibold text-sm transition-all bg-[#0070ba] hover:bg-[#005ea6] text-white flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" /></svg>
                        Pay with PayPal
                      </button>
                      <button onClick={() => setState(plan.name, { method: "cashapp" })} className="w-full py-3 rounded-lg font-semibold text-sm transition-all bg-[#00D632] hover:bg-[#00C02E] text-white flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.59 3.47A5.1 5.1 0 0 0 20.53.41C19.37.05 18.09 0 16.81 0H7.19C5.91 0 4.63.05 3.47.41A5.1 5.1 0 0 0 .41 3.47C.05 4.63 0 5.91 0 7.19v9.62c0 1.28.05 2.56.41 3.72a5.1 5.1 0 0 0 3.06 3.06c1.16.36 2.44.41 3.72.41h9.62c1.28 0 2.56-.05 3.72-.41a5.1 5.1 0 0 0 3.06-3.06c.36-1.16.41-2.44.41-3.72V7.19c0-1.28-.05-2.56-.41-3.72z" /></svg>
                        Pay with Cash App
                      </button>
                    </>
                  ) : state.method === "paypal" ? (
                    <div className="space-y-3">
                      <PayPalButtons style={{ layout: "vertical", color: "gold", shape: "rect", label: "subscribe" }} createOrder={(_data: Record<string, unknown>, actions: { order: { create: (arg0: { intent: string; purchase_units: { amount: { currency_code: string; value: string } }[] }) => Promise<string> } }) => actions.order.create({ intent: "CAPTURE", purchase_units: [{ amount: { currency_code: "USD", value: plan.priceValue.toString() } }] })} onApprove={async () => { setState(plan.name, { success: true, method: "select" }); }} />
                      <button onClick={() => setState(plan.name, { method: "select" })} className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors">\u2190 Back to payment options</button>
                    </div>
                  ) : state.method === "cashapp" ? (
                    <div className="space-y-3 text-center">
                      <div className="rounded-lg bg-[#00D632]/10 border border-[#00D632]/30 p-4">
                        <p className="text-[#00D632] font-bold text-2xl">{CASHAPP_TAG}</p>
                        <p className="text-gray-400 text-xs mt-1">Send <strong className="text-white">${plan.priceValue}</strong> to the CashTag above</p>
                        <p className="text-gray-500 text-xs mt-2">Include your email in the note for account activation</p>
                      </div>
                      <button onClick={() => setState(plan.name, { success: true, method: "select" })} className="w-full py-2.5 rounded-lg font-semibold text-sm bg-[#00D632] hover:bg-[#00C02E] text-white transition-all">I've Sent the Payment</button>
                      <button onClick={() => setState(plan.name, { method: "select" })} className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors">\u2190 Back to payment options</button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
