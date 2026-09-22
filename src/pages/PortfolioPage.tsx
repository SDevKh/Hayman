import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Portfolio from "@/components/Portfolio";
import { ArrowLeft } from "lucide-react";

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-xs tracking-widest uppercase font-mono text-white/90 group-hover:text-blue-400 transition-colors">
            Back to Home
          </span>
        </Link>
        <div className="font-bold text-lg tracking-wider font-mono">
          HAYMAN<span className="text-blue-500">_</span>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="relative z-10">
        <Portfolio />
      </main>

      {/* Portfolio Page Footer */}
      <footer className="border-t border-white/10 bg-neutral-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-bold text-xl tracking-wider font-mono">
              HAYMAN<span className="text-blue-500">_</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">High-performance digital products, web solutions & AI engineering.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400 font-mono">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <a href="mailto:info@hayman.com" className="hover:text-blue-400 transition-colors">info@hayman.com</a>
            <a href="tel:+916350455133" className="hover:text-blue-400 transition-colors">+91 6350455133</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;
