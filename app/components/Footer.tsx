export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <span className="text-gray-950 font-bold text-xs">W</span>
          </div>
          <span className="text-sm font-semibold">AI Wealth Advisor</span>
        </div>
        <p className="text-xs text-gray-500">
          \u00a9 {new Date().getFullYear()} AI Wealth Advisor. For informational purposes only \u2014 not financial advice.
        </p>
        <div className="flex gap-6 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
