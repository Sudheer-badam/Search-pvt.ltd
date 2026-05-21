"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, Users, Landmark, MapPin, Tag } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    fetchCompanies("");
  }, []);

  const fetchCompanies = async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/companies?q=${encodeURIComponent(q)}`);
      const resData = await res.json();
      if (resData.success) {
        setCompanies(resData.data);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchCompanies(value);
  };

  const industries = ["All", ...new Set(companies.map(c => c.industry).filter(Boolean))];
  
  const filteredCompanies = companies.filter(company => {
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;
    const matchesStatus = selectedStatus === "All" || company.status === selectedStatus;
    return matchesIndustry && matchesStatus;
  });

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold mb-3"
          >
            <Users className="w-5 h-5" />
            <span>Corporate Directory</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-4 tracking-tight"
          >
            Explore Registered Companies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Browse, search, and verify companies in real-time. Gain instant access to corporate filings, active status, and director details.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="glass p-6 rounded-[2.5rem] mb-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-border">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search by company name, CIN, or registration details..."
                className="w-full pl-16 pr-6 py-4.5 rounded-[2rem] bg-white dark:bg-slate-950 border border-border focus:border-primary transition-all outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <select 
                  value={selectedIndustry} 
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full pl-6 pr-10 py-4.5 rounded-[2rem] bg-white dark:bg-slate-950 border border-border font-semibold appearance-none outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="All">All Industries</option>
                  {industries.filter(ind => ind !== "All").map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>

              <div className="relative flex-1 sm:flex-initial">
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-6 pr-10 py-4.5 rounded-[2rem] bg-white dark:bg-slate-950 border border-border font-semibold appearance-none outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Metadata */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-semibold text-center sm:text-left">
            Showing <span className="text-foreground font-bold">{filteredCompanies.length}</span> companies
          </p>
        </div>

        {/* Directory Grid */}
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
                <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse border border-border/20" />
              ))}
            </motion.div>
          ) : filteredCompanies.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCompanies.map((company, i) => (
                <CompanyCard key={company.id || company._id} company={company} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center glass rounded-[3rem]"
            >
              <div className="w-20 h-20 bg-muted/65 rounded-full flex items-center justify-center mb-6">
                <Landmark className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No companies match your filters</h3>
              <p className="text-muted-foreground max-w-sm">
                Try resetting your category filters or adjusting your search keyword.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
