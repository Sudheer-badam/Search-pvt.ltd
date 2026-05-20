"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, Building2, User, Hash, MapPin, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchHero = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-primary text-sm font-black mb-10 shadow-xl shadow-primary/10">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            AI-POWERED CORPORATE INTELLIGENCE
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            The Future of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient bg-[length:200%_auto]">
              Business Search
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
            Instantly access verified data for 50M+ Private Limited companies across India and the global market.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <form 
            onSubmit={handleSearch}
            className="glass-premium p-3 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-white/10"
          >
            <div className="flex-1 flex items-center gap-4 px-6 w-full group">
              <Search className="text-primary w-7 h-7 shrink-0 group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                placeholder="Company Name, CIN, or Pincode..."
                className="w-full bg-transparent border-none focus:ring-0 text-xl py-5 font-bold placeholder:text-slate-500 text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <div className="h-12 w-px bg-white/10 hidden md:block" />

            <button 
              type="submit"
              className="w-full md:w-auto px-10 py-5 rounded-[2rem] bg-gradient-to-r from-primary to-primary-dark text-white font-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 group"
            >
              SEARCH NOW
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Trending Searches */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Trending:</span>
            {["Falcon Ebiz", "Zoho Corp", "SpaceX", "522615"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-primary/10 text-sm font-bold transition-all text-slate-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchHero;
