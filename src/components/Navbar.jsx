"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Briefcase, Info, Phone, Users, Globe, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/", icon: <Globe className="w-4 h-4" /> },
  { name: "Categories", href: "/categories", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Companies", href: "/companies", icon: <Users className="w-4 h-4" /> },
  { name: "API", href: "/api-docs", icon: <Code className="w-4 h-4" /> },
  { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
  { name: "Contact", href: "/contact", icon: <Phone className="w-4 h-4" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-slate-950/40 backdrop-blur-[20px] border-b border-white/5 py-3 shadow-2xl" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Search className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Search Pvt.Ltd
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/search"
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </Link>
          <Link
            href="/auth/login"
            className="px-5 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-primary"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  className="w-full py-3 rounded-xl bg-primary text-white text-center font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/search"
                  className="w-full py-3 rounded-xl bg-muted text-center font-semibold"
                >
                  Search Database
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
