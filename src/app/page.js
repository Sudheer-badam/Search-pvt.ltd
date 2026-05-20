import SearchHero from "@/components/SearchHero";
import CategoryGrid from "@/components/CategoryGrid";
import CompanyCard from "@/components/CompanyCard";
import { TrendingUp, Sparkles, Database, ShieldCheck, Globe } from "lucide-react";

const trendingCompanies = [
  { id: "falcon-ebiz", name: "Falcon Ebiz Pvt Ltd", industry: "IT Services", location: "Thane, Maharashtra", cin: "U72900MH2016PTC281055", estYear: 2016, status: "Active" },
  { id: 1, name: "TechNova Solutions", industry: "AI & Cloud", location: "Bangalore, India", cin: "U72900KA2021PTC145000", estYear: 2021, status: "Active" },
  { id: 2, name: "GreenFuture Energy", industry: "Renewables", location: "Mumbai, India", cin: "U40106MH2019PTC320111", estYear: 2019, status: "Active" },
  { id: 3, name: "BlueFin Logistics", industry: "E-commerce", location: "Gurugram, India", cin: "U63090HR2018PTC075000", estYear: 2018, status: "Active" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <SearchHero />

      {/* Trending Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <TrendingUp className="w-5 h-5" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-4xl font-bold">Recently Discovered Startups</h2>
          </div>
          <button className="px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium">
            View All Companies
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCompanies.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>
      </section>

      <CategoryGrid />

      {/* Statistics Section */}
      <section className="py-24 px-6 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Total Companies", value: "15M+" },
              { label: "Active Directors", value: "32M+" },
              { label: "Daily Searches", value: "500k+" },
              { label: "API Integrations", value: "2,500+" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-black mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-primary-foreground/80 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Showcase */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-2 text-primary font-bold mb-4">
            <Database className="w-6 h-6" />
            <span>Developer API</span>
          </div>
          <h2 className="text-5xl font-bold mb-8 tracking-tight">
            Build with Global <br /> Business Intelligence
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Our powerful JSON API gives developers access to verify companies, perform KYC, and track industry trends programmatically. Reliable, fast, and secure.
          </p>
          <div className="space-y-6 mb-10">
            {[
              { title: "Real-time Verification", desc: "Instantly check CIN/UIN status from official registries.", icon: <ShieldCheck className="text-emerald-500" /> },
              { title: "Global Coverage", desc: "Access data from 50+ countries with a single endpoint.", icon: <Globe className="text-blue-500" /> },
              { title: "AI Enrichments", desc: "Get revenue ranges and growth predictions via AI.", icon: <Sparkles className="text-amber-500" /> },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-3">
            Get API Access
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="glass p-8 rounded-[3rem] shadow-2xl bg-slate-900 text-slate-300 font-mono text-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-secondary" />
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <pre className="overflow-x-auto">
              {`// GET /api/v1/company/U72900KA2021PTC145000
{
  "status": "success",
  "data": {
    "name": "TECHNOVA SOLUTIONS PVT LTD",
    "cin": "U72900KA2021PTC145000",
    "status": "ACTIVE",
    "class": "Private",
    "category": "Company limited by Shares",
    "directors": [
      { "name": "ARJUN MEHTA", "din": "08923412" },
      { "name": "SARA KHAN", "din": "09124567" }
    ],
    "metrics": {
      "employees": "50-200",
      "est_revenue": "$2.5M"
    }
  }
}`}
            </pre>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
        </div>
      </section>
    </div>
  );
}
