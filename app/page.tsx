import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import ChatInterface from "@/components/ChatInterface";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ChatInterface />
      <Pricing />
      <Newsletter />
      <Footer />
    </main>
  );
}
