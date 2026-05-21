"use client";

import React from "react";
import { Info, ShieldCheck, Heart, Users, Award, Landmark } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold mb-3"
          >
            <Info className="w-5 h-5" />
            <span>Who We Are</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-4 tracking-tight"
          >
            Pioneering Corporate Intelligence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Search Pvt.Ltd is the world's leading database for corporate filings, GST compliance, and real-time business insights. We make verification quick, smooth, and accessible.
          </motion.p>
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in building a transparent and verified corporate ecosystem. By consolidating company registration details, DIN indexes, and GST records, we empower developers, banks, and enterprises to perform seamless KYC and due diligence in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As a subsidiary of <strong className="text-foreground">Falcon Ebiz Private Limited</strong>, we serve millions of search requests daily, backed by top-tier infrastructure and real-time API sync.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2.5rem] relative overflow-hidden bg-white/40 dark:bg-slate-900/40 border border-border"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <Landmark className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Verified by Search Pvt.Ltd</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              All company datasets are fetched from verified public indexes and updated multiple times daily to maintain supreme accuracy.
            </p>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" /> MCA & ROC Live Integration
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {[
            { title: "Trust and Accuracy", desc: "99.9% uptime and high accuracy records.", icon: <ShieldCheck className="text-emerald-500" /> },
            { title: "Global Scale", desc: "Serving 15 million companies across multiple countries.", icon: <Users className="text-blue-500" /> },
            { title: "Award Winning", desc: "Voted #1 Developer Business API platform.", icon: <Award className="text-amber-500" /> },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl text-center bg-white/30 dark:bg-slate-900/30 border border-border/60 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-primary/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to elevate your verification?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Get instant API credentials or search our directory database to discover active Private Limited listings today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/search" className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all">
              Search Companies
            </a>
            <a href="/contact" className="px-6 py-3 rounded-xl border border-border hover:bg-muted font-bold transition-all">
              Contact Sales
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
