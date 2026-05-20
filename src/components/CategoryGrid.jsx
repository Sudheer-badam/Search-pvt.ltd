import React from "react";
import Link from "next/link";
import { 
  Laptop, Cpu, Wallet, HeartPulse, Factory, GraduationCap, 
  ShoppingCart, Truck, Home, Zap, Car, PlayCircle 
} from "lucide-react";

const categories = [
  { name: "IT Companies", icon: <Laptop />, count: "1.2M+", color: "bg-blue-500" },
  { name: "AI Startups", icon: <Cpu />, count: "50k+", color: "bg-indigo-500" },
  { name: "Finance", icon: <Wallet />, count: "800k+", color: "bg-emerald-500" },
  { name: "Healthcare", icon: <HeartPulse />, count: "400k+", color: "bg-rose-500" },
  { name: "Manufacturing", icon: <Factory />, count: "2M+", color: "bg-orange-500" },
  { name: "Education", icon: <GraduationCap />, count: "300k+", color: "bg-violet-500" },
  { name: "E-commerce", icon: <ShoppingCart />, count: "600k+", color: "bg-pink-500" },
  { name: "Logistics", icon: <Truck />, count: "450k+", color: "bg-amber-500" },
  { name: "Real Estate", icon: <Home />, count: "900k+", color: "bg-cyan-500" },
  { name: "Energy", icon: <Zap />, count: "150k+", color: "bg-yellow-500" },
  { name: "Automobile", icon: <Car />, count: "200k+", color: "bg-red-500" },
  { name: "Media", icon: <PlayCircle />, count: "100k+", color: "bg-purple-500" },
];

const CategoryGrid = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore companies by industry and sector. Our AI categorizes millions of businesses for easy discovery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href={`/search?q=${encodeURIComponent(cat.name)}`}
              className="group glass p-8 rounded-[2.5rem] hover:bg-primary hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center shadow-sm"
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-primary transition-all shadow-lg`}>
                {React.cloneElement(cat.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{cat.name}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors font-medium">
                {cat.count} Companies
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
