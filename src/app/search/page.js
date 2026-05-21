"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, SearchX } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";
import { motion, AnimatePresence } from "framer-motion";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");

  useEffect(() => {
    handleSearch(initialQuery);
  }, [initialQuery]);

  const handleSearch = async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/companies?q=${encodeURIComponent(q)}`);
      const resData = await res.json();
      if (resData.success) {
        setResults(resData.data);
      }
    } catch (error) {
      console.error("Search API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search millions of companies..."
                className="w-full pl-16 pr-6 py-6 rounded-[2rem] glass bg-white dark:bg-slate-900 border-border focus:border-primary transition-all text-xl outline-none"
              />
            </div>
            <button className="w-full md:w-auto px-8 py-6 rounded-[2rem] glass hover:bg-muted transition-all flex items-center justify-center gap-2 font-bold">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {["Status: Active", "Industry: All", "State: All", "Year: All"].map((filter, i) => (
              <button key={i} className="px-4 py-2 rounded-full border border-border bg-white dark:bg-slate-900 text-sm font-medium flex items-center gap-2 hover:border-primary transition-colors">
                {filter} <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-muted p-1 rounded-xl">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-muted-foreground"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-white dark:bg-slate-800 shadow-sm text-primary" : "text-muted-foreground"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-muted-foreground font-medium">
            Found <span className="text-foreground font-bold">{results.length}</span> results for &quot;{query || "All Companies"}&quot;
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <select className="bg-transparent font-bold border-none focus:ring-0">
              <option>Relevance</option>
              <option>Establishment Year</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse" />
              ))}
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {results.map((company, i) => (
                <CompanyCard key={company.id} company={company} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <SearchX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No companies found</h3>
              <p className="text-muted-foreground max-w-sm">
                Try adjusting your filters or search for a different name, CIN, or director.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SearchResults = () => {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-muted-foreground text-xl">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
};

export default SearchResults;
