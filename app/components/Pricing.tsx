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
    priceId: null as string | null,
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

type PaymentMethod = "select" | "paypal" | "cashapp";
interface PlanPaymentState {
  method: PaymentMethod;
  success: boolean;
  verifying: boolean;
  error: string | null;
  cashAppForm: boolean;
  cashAppName: string;
  cashAppTxId: string;
  cashAppSubmitting: boolean;
  cashAppVerified: boolean;
}

const defaultState: PlanPaymentState = {
  method: "select",
  success: false,
  verifying: false,
  error: null,
  cashAppForm: false,
  cashAppName: "",
  cashAppTxId: "",
  cashAppSubmitting: false,
  cashAppVerified: false,
};

export default function Pricing() {
  const [paymentStates, setPaymentStates] = useState<Record<string, PlanPaymentState>>({});
  const getState = (name: string): PlanPaymentState => paymentStates[name] || { ...defaultState };
  const setState = (name: string, update: Partial<PlanPaymentState>) => {
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
        setState(planName, { success: true, method: "select", verifying: false });
      } else {
        setState(planName, { error: data.error || "Payment verification failed", verifying: false });
      }
    } catch {
      setState(planName, { error: "Network error during verification. Please try again.", verifying: false });
    }
  };

  const submitCashAppVerification = async (planName: string, amount: number) => {
    const state = getState(planName);
    if (!state.cashAppName.trim() || !state.cashAppTxId.trim()) return;

    setState(planName, { cashAppSubmitting: true, error: null });
    try {
      const response = await fetch("/api/cashapp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cashAppName: state.cashAppName.trim(),
          transactionId: state.cashAppTxId.trim(),
          planName,
          amount,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setState(planName, { cashAppVerified: true, cashAppSubmitting: false });
      } else {
        setState(planName, { error: data.error || "Verification submission failed", cashAppSubmitting: false });
      }
    } catch {
      setState(planName, { error: "Network error. Please try again.", cashAppSubmitting: false });
    }
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
                  ) : state.method === "select" ? (
                    <>
                      <button onClick={() => setState(plan.name, { method: "paypal", error: null })} className="w-full py-3 rounded-lg font-semibold text-sm bg-[#0070ba] hover:bg-[#005ea6] text-white flex items-center justify-center gap-2">Pay with PayPal</button>
                      <button onClick={() => setState(plan.name, { method: "cashapp", error: null })} className="w-full py-3 rounded-lg font-semibold text-sm bg-[#00D632] hover:bg-[#00C02E] text-white flex items-center justify-center gap-2">Pay with Cash App</button>
                    </>
                  ) : state.method === "paypal" ? (
                    <div className="space-y-3">
                      {state.verifying ? (
                        <div className="text-center py-4">
                          <div className="inline-block w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-gray-400 text-sm mt-2">Verifying payment...</p>
                        </div>
                      ) : (
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
                      )}
                      {state.error && (
                        <div className="rounded-lg bg-red-900/30 border border-red-600/30 p-3">
                          <p className="text-red-400 text-xs">{state.error}</p>
                        </div>
                      )}
                      <button onClick={() => setState(plan.name, { ...defaultState })} className="w-full text-xs text-gray-500 hover:text-gray-300">← Back to payment options</button>
                    </div>
                  ) : state.method === "cashapp" ? (
                    <div className="space-y-3 text-center">
                      {state.cashAppVerified ? (
                        <div className="rounded-lg bg-green-900/40 border border-green-600/40 p-4">
                          <p className="text-green-400 font-semibold text-sm">✓ Verification submitted!</p>
                          <p className="text-gray-400 text-xs mt-1">Your payment will be confirmed shortly.</p>
                        </div>
                      ) : !state.cashAppForm ? (
                        <>
                          <div className="rounded-lg bg-[#00D632]/10 border border-[#00D632]/30 p-4">
                            <p className="text-[#00D632] font-bold text-2xl">{CASHAPP_TAG}</p>
                            <p className="text-gray-400 text-xs mt-1">Send <strong className="text-white">${plan.priceValue}</strong> to the CashTag above</p>
                            <p className="text-gray-500 text-xs mt-2">Include your email in the note for account activation</p>
                          </div>
                          <button onClick={() => setState(plan.name, { cashAppForm: true })} className="w-full py-2.5 rounded-lg font-semibold text-sm bg-[#00D632] hover:bg-[#00C02E] text-white">I&apos;ve Sent the Payment</button>
                        </>
                      ) : (
                        <div className="text-left space-y-3">
                          <p className="text-sm font-semibold text-white">Verify Your Payment</p>
                          <p className="text-xs text-gray-400">Enter your CashApp details to confirm your payment.</p>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">CashApp Name <span className="text-red-400">*</span></label>
                            <input
                              type="text"
                              placeholder="$YourCashTag"
                              value={state.cashAppName}
                              onChange={(e) => setState(plan.name, { cashAppName: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:border-[#00D632] focus:outline-none focus:ring-1 focus:ring-[#00D632]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Transaction ID <span className="text-red-400">*</span></label>
                            <input
                              type="text"
                              placeholder="Enter your CashApp transaction ID"
                              value={state.cashAppTxId}
                              onChange={(e) => setState(plan.name, { cashAppTxId: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:border-[#00D632] focus:outline-none focus:ring-1 focus:ring-[#00D632]"
                            />
                          </div>
                          {state.error && (
                            <div className="rounded-lg bg-red-900/30 border border-red-600/30 p-3">
                              <p className="text-red-400 text-xs">{state.error}</p>
                            </div>
                          )}
                          <button
                            onClick={() => submitCashAppVerification(plan.name, plan.priceValue)}
                            disabled={!state.cashAppName.trim() || !state.cashAppTxId.trim() || state.cashAppSubmitting}
                            className="w-full py-2.5 rounded-lg font-semibold text-sm bg-[#00D632] hover:bg-[#00C02E] text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {state.cashAppSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Submitting...
                              </>
                            ) : (
                              "Submit for Verification"
                            )}
                          </button>
                          <button onClick={() => setState(plan.name, { cashAppForm: false, error: null })} className="w-full text-xs text-gray-500 hover:text-gray-300">← Back to CashApp instructions</button>
                        </div>
                      )}
                      {!state.cashAppVerified && (
                        <button onClick={() => setState(plan.name, { ...defaultState })} className="w-full text-xs text-gray-500 hover:text-gray-300">← Back to payment options</button>
                      )}
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
