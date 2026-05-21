"use client";

import React, { useState } from "react";
import { Code, Key, Globe, Database, Terminal, CheckCircle2, Copy } from "lucide-react";
import { motion } from "framer-motion";

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("curl");

  const codeSnippets = {
    curl: `curl -X GET "https://search-pvt.ltd/api/companies?q=zoho" \\
  -H "Accept: application/json"`,
    js: `const fetchCompanies = async () => {
  const response = await fetch("https://search-pvt.ltd/api/companies?q=zoho");
  const data = await response.json();
  console.log(data);
};`,
    python: `import requests

url = "https://search-pvt.ltd/api/companies"
params = {"q": "zoho"}
response = requests.get(url, params=params)
print(response.json())`
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Code className="w-5 h-5" />
            <span>Developer Reference</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black mb-4 tracking-tight"
          >
            Company Search API
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Verify companies, parse active directors, check CIN listings, and query global business datasets dynamically using our RESTful JSON endpoints.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main API Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 border border-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" /> Endpoints Specification
              </h3>

              <div className="space-y-6">
                
                {/* GET companies */}
                <div className="p-6 rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-black tracking-wider uppercase">GET</span>
                      <code className="text-sm font-bold text-foreground font-mono">/api/companies</code>
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-primary" /> HTTPS Protocol
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Searches and filters the company records database using keywords (e.g. Zoho, SpaceX, Stripe).
                  </p>

                  <h5 className="text-sm font-bold mb-2">Query Parameters</h5>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-border text-muted-foreground">
                      <span>q <span className="text-primary">(optional)</span></span>
                      <span>Keyword query matching name, location, or CIN</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border text-muted-foreground">
                      <span>type <span className="text-primary">(optional)</span></span>
                      <span>all, company, director, pincode (default: all)</span>
                    </div>
                  </div>
                </div>

                {/* POST company */}
                <div className="p-6 rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black tracking-wider uppercase">POST</span>
                      <code className="text-sm font-bold text-foreground font-mono">/api/companies</code>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Inserts a new corporate entry into the directory records. Requires JSON body matching schema specifications.
                  </p>
                </div>

              </div>
            </div>

            {/* API Keys */}
            <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Key className="w-6 h-6 text-primary" /> Authorization Key
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Our public endpoint `/api/companies` is open for playground testing without keys. To scale past 500 requests/day, please retrieve your private client token inside the Developer Control Center.
              </p>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" /> 500 Free Daily Searches Remaining
              </div>
            </div>

          </div>

          {/* Sandbox & Code Blocks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-8 rounded-[2.5rem] bg-slate-900 text-slate-300 font-mono text-sm relative overflow-hidden border border-white/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-secondary" />
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <button 
                  onClick={() => copyToClipboard(codeSnippets[activeTab])}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  title="Copy Code"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex gap-2 border-b border-white/10 pb-4 mb-4">
                {["curl", "js", "python"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${activeTab === lang ? "bg-primary text-white" : "hover:bg-white/5 text-slate-400"}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Display Code */}
              <pre className="overflow-x-auto text-xs leading-relaxed p-2 bg-slate-950/50 rounded-2xl whitespace-pre-wrap">
                {codeSnippets[activeTab]}
              </pre>
            </div>

            <div className="glass p-8 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 border border-border">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" /> Mock API Response
              </h4>
              <pre className="text-xs font-mono bg-slate-900/5 dark:bg-slate-900 p-4 rounded-2xl overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "zoho-corp",
      "name": "Zoho Corp Pvt Ltd",
      "cin": "U72200TN1996PTC035345",
      "industry": "SaaS & Cloud",
      "status": "Active"
    }
  ]
}`}
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
