"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const CASHAPP_TAG = "$WealthCoach";

const plans = [
  {
    name: "Starter",
    price: "Free",
    priceValue: 0,
    period: "",
    description: "Perfect for getting started with AI financial guidance",
    features: [
      "5 AI chat sessions per month",
      "Basic portfolio analysis",
      "Market news digest",
      "Email support",
    ],
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
    features: [
      "Unlimited AI chat sessions",
      "Advanced portfolio optimization",
      "Real-time market alerts",
      "Tax optimization strategies",
      "Custom investment plans",
      "Priority support",
    ],
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
    features: [
      "Everything in Pro",
      "Dedicated AI model fine-tuned to you",
      "Multi-account management",
      "Estate planning insights",
      "API access",
      "White-glove onboarding",
      "Phone & video support",
    ],
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
  const [paymentStates, setPaymentStates] = useState<
    Record<string, PlanPaymentState>
  >({});

  const getState = (planName: string): PlanPaymentState =>
    paymentStates[planName] || { method: "select", success: false };

  const setState = (planName: string, update: Partial<PlanPaymentState>) => {
    setPaymentStates((prev) => ({
      ...prev,
      [planName]: { ...getState(planName), ...update },
    }));
  };

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Start free and upgrade as your wealth grows. All plans include our
            core AI advisor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const state = getState(plan.name);
            const isPaid = plan.priceId !== null;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  plan.popular
                    ? "border-gold-500/50 bg-gray-900 shadow-xl shadow-gold-500/10"
                    : "border-gray-800 bg-gray-900/50"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-gray-950 text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400">{plan.period}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-400">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Payment section */}
                <div className="mt-8 space-y-3">
                  {!isPaid ? (
                    /* Free plan */
                    <button
                      className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                        plan.popular ? "btn-primary" : "btn-secondary"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  ) : state.success ? (
                    /* Payment success */
                    <div className="text-center py-3 rounded-lg bg-green-900/40 border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm">
                        \u2713 Payment initiated \u2014 thank you!
                      </p>
                    </div>
                  ) : state.method === "select" ? (
                    /* Payment method selection */
                    <>
                      <button
                        onClick={() => setState(plan.name, { method: "paypal" })}
                        className="w-full py-3 rounded-lg font-semibold text-sm transition-all bg-[#0070ba] hover:bg-[#005ea6] text-white flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" />
                          <path d="M18.171 7.357c-.003.017-.006.034-.01.051-1.07 5.498-4.728 7.398-9.404 7.398H7.076l-1.326 8.413a.448.448 0 0 0 .442.516h3.1c.493 0 .912-.358.99-.842l.04-.208.784-4.97.05-.274c.078-.484.496-.842.99-.842h.624c4.035 0 7.194-1.638 8.117-6.376.386-1.98.186-3.63-.835-4.792a3.969 3.969 0 0 0-1.131-.874 9.868 9.868 0 0 1 .25 2.9z" opacity="0.7" />
                        </svg>
                        Pay with PayPal
                      </button>
                      <button
                        onClick={() => setState(plan.name, { method: "cashapp" })}
                        className="w-full py-3 rounded-lg font-semibold text-sm transition-all bg-[#00D632] hover:bg-[#00C02E] text-white flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.59 3.47A5.1 5.1 0 0 0 20.53.41C19.37.05 18.09 0 16.81 0H7.19C5.91 0 4.63.05 3.47.41A5.1 5.1 0 0 0 .41 3.47C.05 4.63 0 5.91 0 7.19v9.62c0 1.28.05 2.56.41 3.72a5.1 5.1 0 0 0 3.06 3.06c1.16.36 2.44.41 3.72.41h9.62c1.28 0 2.56-.05 3.72-.41a5.1 5.1 0 0 0 3.06-3.06c.36-1.16.41-2.44.41-3.72V7.19c0-1.28-.05-2.56-.41-3.72zM17.42 8.16l-1.29 1.29c-.21.21-.54.27-.81.13a5.63 5.63 0 0 0-2.56-.63c-1.1 0-1.99.39-1.99 1.26 0 .89 1.06 1.2 2.32 1.56 1.96.56 4.47 1.27 4.47 4.15 0 2.51-2.08 4.1-4.94 4.41l-.24 1.2a.52.52 0 0 1-.51.41h-1.72a.52.52 0 0 1-.51-.62l.22-1.08c-1.23-.19-2.38-.62-3.14-1.15a.52.52 0 0 1-.09-.76l1.29-1.49a.52.52 0 0 1 .78-.06 5.3 5.3 0 0 0 3.01 1.05c1.3 0 2.17-.52 2.17-1.42 0-.95-1.04-1.33-2.41-1.73-1.89-.56-4.24-1.26-4.24-3.97 0-2.38 1.89-3.88 4.51-4.22l.22-1.13a.52.52 0 0 1 .51-.41h1.72c.33 0 .57.29.51.62l-.2 1.01c1.03.16 1.98.49 2.7.93.28.17.33.56.13.78z" />
                        </svg>
                        Pay with Cash App
                      </button>
                    </>
                  ) : state.method === "paypal" ? (
                    /* PayPal checkout */
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 min-h-[50px]">
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "rect",
                            label: "pay",
                          }}
                          createOrder={(_data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [
                                {
                                  description: `AI Wealth Advisor \u2014 ${plan.name} Plan`,
                                  amount: {
                                    currency_code: "USD",
                                    value: plan.priceValue.toFixed(2),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (_data, actions) => {
                            if (actions.order) {
                              await actions.order.capture();
                              setState(plan.name, {
                                success: true,
                                method: "paypal",
                              });
                            }
                          }}
                          onError={() => {
                            alert(
                              "PayPal checkout encountered an error. Please try again."
                            );
                          }}
                        />
                      </div>
                      <button
                        onClick={() =>
                          setState(plan.name, { method: "select" })
                        }
                        className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        \u2190 Back to payment options
                      </button>
                    </div>
                  ) : (
                    /* CashApp checkout */
                    <div className="space-y-3">
                      <div className="rounded-lg border border-[#00D632]/30 bg-[#00D632]/10 p-4 text-center">
                        <p className="text-sm text-gray-300 mb-2">
                          Send{" "}
                          <span className="font-bold text-white">
                            {plan.price}
                          </span>{" "}
                          to
                        </p>
                        <p className="text-2xl font-bold text-[#00D632]">
                          {CASHAPP_TAG}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Include your email in the note for account activation
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setState(plan.name, {
                            success: true,
                            method: "cashapp",
                          })
                        }
                        className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all bg-[#00D632] hover:bg-[#00C02E] text-white"
                      >
                        I&apos;ve Sent the Payment
                      </button>
                      <button
                        onClick={() =>
                          setState(plan.name, { method: "select" })
                        }
                        className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        \u2190 Back to payment options
                      </button>
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
