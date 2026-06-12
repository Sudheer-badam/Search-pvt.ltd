"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Building2, Calendar, MapPin, Globe, Mail, Phone, 
  Users, TrendingUp, ShieldCheck, Download, ExternalLink, 
  Clock, Award, BarChart3, PieChart, Users2
} from "lucide-react";
import { motion } from "framer-motion";

const CompanyDetails = () => {
  const params = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!params.id) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/companies/${params.id}`);
        const result = await res.json();
        if (result.success) {
          setCompany(result.data);
        } else {
          setError(result.error || "Failed to load company details");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching company details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground font-semibold">Loading company intelligence profile...</p>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center">
        <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-6">
          <Building2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-2">Company Profile Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The company with ID "{params.id}" could not be found or has not been indexed in our records yet.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="glass p-8 md:p-12 rounded-[3rem] mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-900 border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-2xl relative">
            {company.logo && (company.logo.startsWith("http") || company.logo.startsWith("/")) ? (
              <>
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="w-full h-full object-contain p-4 bg-white"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold bg-gradient-to-br from-primary to-secondary"
                  style={{ display: 'none' }}
                >
                  {company.name.charAt(0)}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold bg-gradient-to-br from-primary to-secondary">
                {company.logo && company.logo.length === 1 ? company.logo : company.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
              <h1 className="text-4xl font-black tracking-tight">{company.name}</h1>
              <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-black shadow-lg shadow-emerald-900/20 flex items-center gap-1 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> {company.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-500 dark:text-slate-300 mb-8">
              <span className="flex items-center gap-2 font-semibold">
                <Building2 className="w-5 h-5 text-primary shrink-0" /> {company.cin}
              </span>
              <span className="flex items-center gap-2 font-semibold">
                <Calendar className="w-5 h-5 text-secondary shrink-0" /> Est. {company.estDate || company.estYear}
              </span>
              <span className="flex items-center gap-2 font-semibold">
                <MapPin className="w-5 h-5 text-accent shrink-0" /> {company.location}
              </span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                <Download className="w-5 h-5" /> Export Report PDF
              </button>
              <button className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" /> Compare Company
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-10 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="text-primary" /> Business Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {company.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Industry", value: company.industry, icon: <Award /> },
                  { label: "GST Status", value: company.gstStatus, icon: <ShieldCheck /> },
                  { label: "Employees", value: company.employees, icon: <Users /> },
                  { label: "Revenue", value: company.revenue, icon: <TrendingUp /> },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-muted/50 border border-border">
                    <div className="text-primary mb-2">{item.icon}</div>
                    <div className="text-xs text-muted-foreground font-bold uppercase mb-1">{item.label}</div>
                    <div className="text-sm font-bold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {company.directors && company.directors.length > 0 && (
              <div className="glass p-10 rounded-[2.5rem]">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Users2 className="text-primary" /> Directors & Leadership
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.directors.map((dir, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-border hover:border-primary/30 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {dir.name.charAt(0)}
                        </div>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
                      </div>
                      <h4 className="text-lg font-bold mb-1">{dir.name}</h4>
                      <p className="text-sm text-primary font-semibold mb-3">{dir.role}</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {dir.din && (
                          <p><strong className="text-foreground">DIN:</strong> {dir.din}</p>
                        )}
                        <p><strong className="text-foreground">Education:</strong> {dir.education}</p>
                        <p><strong className="text-foreground">Experience:</strong> {dir.experience}</p>
                        <p><strong className="text-foreground">Other Companies:</strong> {dir.otherCompanies}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href={company.website || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Website</div>
                    <div className="text-sm font-bold">
                      {(company.website || "N/A").replace("https://", "").replace("http://", "")}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Email</div>
                    <div className="text-sm font-bold">{company.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Phone</div>
                    <div className="text-sm font-bold">{company.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {company.timeline && company.timeline.length > 0 && (
              <div className="glass p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Growth Timeline
                </h3>
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  {company.timeline.map((item, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <div className="text-primary font-black text-sm mb-1">{item.year}</div>
                      <div className="text-sm font-bold">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass p-8 rounded-[2.5rem] bg-primary/5 border-primary/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                <ShieldCheck className="w-5 h-5" /> Detailed Intelligence
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Need deep-dive financial reports, credit ratings, or litigation history for this company?
              </p>
              <a 
                href="mailto:badamsudheerreddy@gmail.com"
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Request Full Report
                <Mail className="w-5 h-5" />
              </a>
              <p className="mt-4 text-[10px] text-center text-muted-foreground uppercase font-bold tracking-widest">
                Verified by Sudheer Pvt.Ltd Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
