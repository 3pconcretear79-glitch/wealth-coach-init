# AI Wealth Advisor

An AI-powered financial advisory platform built with Next.js 14, Tailwind CSS, and Stripe.

## Features

- **Landing Page** — Premium dark theme with gold accents, hero section, and feature highlights
- **AI Chat Interface** — Interactive demo chat for financial advice (investment, retirement, savings)
- **Stripe Integration** — Checkout flow for Pro ($29/mo) and Enterprise ($99/mo) plans
- **Pricing Section** — Three-tier pricing with Stripe checkout trigger

## Getting Started

```bash
npm install
cp .env.example .env.local  # Then add your Stripe keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (starts with `sk_`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (starts with `pk_`) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (default: `http://localhost:3000`) |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Payments:** Stripe Checkout
- **Language:** TypeScript
