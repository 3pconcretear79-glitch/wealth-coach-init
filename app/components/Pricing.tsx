"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "Free",
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

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string | null, planName: string) => {
    if (!priceId) return;

    setLoading(planName);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe checkout is not configured yet. Add your STRIPE_SECRET_KEY to .env.local to enable payments.");
      }
    } catch {
      alert("Stripe checkout is not configured yet. Add your STRIPE_SECRET_KEY to .env.local to enable payments.");
    } finally {
      setLoading(null);
    }
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
          {plans.map((plan) => (
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
              <p className="mt-3 text-sm text-gray-400">{plan.description}</p>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
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

              <button
                onClick={() => handleCheckout(plan.priceId, plan.name)}
                disabled={loading === plan.name}
                className={`mt-8 w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-secondary"
                } ${loading === plan.name ? "opacity-50 cursor-wait" : ""}`}
              >
                {loading === plan.name ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  plan.cta
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
