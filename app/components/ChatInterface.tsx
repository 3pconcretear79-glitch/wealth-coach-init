"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const DEMO_RESPONSES: Record<string, string> = {
  default:
    "I'd be happy to help with your financial questions! You can ask me about investment strategies, portfolio allocation, retirement planning, tax optimization, or any other wealth management topic. What would you like to explore?",
  invest:
    "Great question! For a diversified investment approach, I'd recommend considering a mix of:\n\n• **Index Funds** (40-60%) — Low-cost, broad market exposure\n• **Bonds** (20-30%) — Stability and income\n• **International Equities** (10-20%) — Geographic diversification\n• **Alternative Assets** (5-10%) — REITs, commodities\n\nYour exact allocation depends on your risk tolerance, time horizon, and goals. Would you like me to create a personalized plan?",
  retire:
    "Retirement planning is crucial! Here are the key steps:\n\n1. **Calculate your number** — Typically 25x your annual expenses\n2. **Maximize tax-advantaged accounts** — 401(k), IRA, Roth IRA\n3. **Automate contributions** — Pay yourself first\n4. **Review annually** — Rebalance and adjust\n\nAt a 7% average return, investing $500/month starting at 30 would give you approximately $1.2M by age 65. Shall I run numbers for your specific situation?",
  save:
    "Here's a solid savings framework:\n\n• **Emergency Fund** — 3-6 months of expenses in high-yield savings\n• **50/30/20 Rule** — 50% needs, 30% wants, 20% savings\n• **Automate transfers** — Set up automatic savings on payday\n• **High-yield savings accounts** — Currently offering 4-5% APY\n\nWould you like specific recommendations based on your income and expenses?",
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invest") || lower.includes("stock") || lower.includes("portfolio"))
    return DEMO_RESPONSES.invest;
  if (lower.includes("retire") || lower.includes("retirement"))
    return DEMO_RESPONSES.retire;
  if (lower.includes("save") || lower.includes("saving") || lower.includes("budget"))
    return DEMO_RESPONSES.save;
  return DEMO_RESPONSES.default;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI Wealth Advisor. I can help with investment strategies, retirement planning, budgeting, and more. What financial topic would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getResponse(text) };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <section id="chat" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Try the AI Advisor</h2>
          <p className="mt-4 text-gray-400">Ask any financial question — experience the power of AI wealth management.</p>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 border-b border-gray-800 px-6 py-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-gray-950 font-bold text-sm">AI</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-gray-900" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Wealth Advisor</p>
              <p className="text-xs text-emerald-400">Online — Ready to help</p>
            </div>
            <span className="ml-auto text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">Demo Mode</span>
          </div>
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-gold-500 text-gray-950 rounded-br-md" : "bg-gray-800 text-gray-200 rounded-bl-md"}`}>
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-gray-800 p-4">
            <div className="flex gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about investments, retirement, savings..." className="flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors" />
              <button onClick={handleSend} disabled={!input.trim() || isTyping} className="btn-primary px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              {["How should I invest $10k?", "Retirement planning tips", "Help me save more"].map((q) => (
                <button key={q} onClick={() => { setInput(q); }} className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-400 hover:border-gold-500/50 hover:text-gold-400 transition-colors">{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
