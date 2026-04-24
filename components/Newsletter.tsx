"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    // Placeholder — log to console until a real service is wired up
    console.log("[Newsletter] Waitlist signup:", trimmed);

    setStatus("success");
    setEmail("");
    setErrorMsg("");
  }

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-gray-950 py-20"
    >
      {/* Subtle gold glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[400px] w-[700px] rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* Badge */}
        <span className="mb-4 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400">
          Stay in the loop
        </span>

        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get exclusive{" "}
          <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            wealth insights
          </span>{" "}
          first
        </h2>

        <p className="mb-10 text-base text-gray-400">
          Join thousands of smart investors who receive AI-powered market
          analysis, portfolio tips, and early product updates — straight to
          their inbox.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-8 py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 text-gold-400"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.06-1.061l-4.5 4.5-2.25-2.25a.75.75 0 0 0-1.06 1.06l2.813 2.813a.75.75 0 0 0 1.06 0l5-5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-lg font-semibold text-white">
              You&apos;re on the list! 🎉
            </p>
            <p className="text-sm text-gray-400">
              We&apos;ll be in touch with your first wealth insight soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-gold-400 underline underline-offset-2 hover:text-gold-300"
            >
              Sign up with another email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMsg("");
                }
              }}
              placeholder="Enter your email address"
              required
              className="w-full flex-1 rounded-lg border border-gray-700 bg-gray-900 px-5 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-gold-500 focus:ring-1 focus:ring-gold-500 sm:w-auto"
            />
            <button type="submit" className="btn-primary w-full whitespace-nowrap sm:w-auto">
              Join Waitlist
            </button>
          </form>
        )}

        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {errorMsg}
          </p>
        )}

        <p className="mt-6 text-xs text-gray-600">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
