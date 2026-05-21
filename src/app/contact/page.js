"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold mb-3"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Support & Sales</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-4 tracking-tight"
          >
            Let&apos;s Build Together
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Have questions about our corporate APIs, data accuracy, or licensing details? Get in touch with our team of specialists.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 border border-border">
              <h3 className="text-2xl font-bold mb-6">Contact Channels</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase">General & API Queries</h4>
                    <p className="font-bold text-lg mt-1 break-all">badamsudheerreddy@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase">Toll-Free Support</h4>
                    <p className="font-bold text-lg mt-1">+91 1800-SEARCH-PL</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-muted-foreground uppercase">Corporate HQ</h4>
                    <p className="font-bold mt-1 text-slate-700 dark:text-slate-300">
                      Narasaraopet, Guntur District,<br />
                      Andhra Pradesh, India - 522615
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <h4 className="text-xl font-bold mb-2">We Are Here Online</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Our support desk operates around the clock for priority enterprise partners, and standard office hours for community builders.
              </p>
              <div className="text-sm font-bold text-slate-200">
                Monday - Friday: 9:00 AM - 6:00 PM IST
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass p-10 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 border border-border">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center"
                >
                  <h4 className="text-xl font-bold text-emerald-500 mb-2">Message Dispatched!</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Thank you for reaching out. A developer intelligence advisor will contact you within 2-4 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-border focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-border focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground ml-1">Message Description</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="How can we help your business verification needs?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-border focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
