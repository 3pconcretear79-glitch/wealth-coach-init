export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <span className="text-gray-950 font-bold text-sm">W</span>
          </div>
          <span className="text-lg font-bold">AI Wealth Advisor</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#chat" className="text-sm text-gray-400 hover:text-white transition-colors">AI Chat</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
          <a href="#pricing" className="btn-primary text-xs px-4 py-2">Get Started</a>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 mb-6">
          <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-xs font-medium text-gold-400">AI-Powered Financial Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          Your Personal
          <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">AI Wealth Advisor</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Get personalized financial guidance powered by advanced AI. Plan investments,
          optimize your portfolio, and build lasting wealth — all through an intuitive
          chat experience.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#pricing" className="btn-primary px-8 py-4 text-base">Start Free Trial</a>
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
