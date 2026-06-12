"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Briefcase, Info, Phone, Users, Globe, Code, LogOut, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#user-menu-container")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-slate-950/40 backdrop-blur-[20px] border-b border-white/5 py-3 shadow-2xl" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-transparent shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:ring-primary/70 transition-all duration-300 overflow-hidden shrink-0">
            <img
              src="/SUDHEER PVT.LTD.png"
              alt="Sudheer Pvt.Ltd Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Sudheer Pvt.Ltd
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

          {/* Auth Section */}
          {status === "loading" ? (
            <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
          ) : session?.user ? (
            /* Logged-in user dropdown */
            <div id="user-menu-container" className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary/50 transition-all group"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(session.user.name)}
                  </div>
                )}
                <span className="text-sm font-semibold max-w-[100px] truncate">
                  {session.user.name?.split(" ")[0] || session.user.email?.split("@")[0]}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-64 glass rounded-2xl shadow-2xl border border-border overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="px-4 py-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        {session.user.image ? (
                          <img
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                            {getInitials(session.user.name)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-sm leading-tight">{session.user.name || "User"}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[160px]">{session.user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
                      >
                        <User className="w-4 h-4 text-primary" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Not logged in */
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-5 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                Sign In
              </Link>
            </div>
          )}
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
                {session?.user ? (
                  <>
                    {/* Mobile user info */}
                    <div className="flex items-center gap-3 py-2 px-3 rounded-xl bg-muted">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                        {getInitials(session.user.name)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{session.user.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 text-center font-semibold flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 rounded-xl bg-primary text-white text-center font-semibold"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 rounded-xl bg-muted text-center font-semibold"
                    >
                      Create Account
                    </Link>
                  </>
                )}
                <Link
                  href="/search"
                  onClick={() => setIsOpen(false)}
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
