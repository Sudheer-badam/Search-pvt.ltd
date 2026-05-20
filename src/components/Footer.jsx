import React from "react";
import Link from "next/link";
import { Search, Mail, Phone, MapPin, Globe, Users, Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Search Pvt.Ltd
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            Global business intelligence platform for Private Limited companies. Access registration data, founder details, and financial insights in seconds.
          </p>
          <div className="flex gap-4">
            {[Globe, Users, Briefcase, Mail, Phone].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Platform</h4>
          <ul className="space-y-4">
            <li><Link href="/search" className="hover:text-primary transition-colors">Company Search</Link></li>
            <li><Link href="/categories" className="hover:text-primary transition-colors">Browse Categories</Link></li>
            <li><Link href="/api-docs" className="hover:text-primary transition-colors">API Documentation</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
            <li><Link href="/global-map" className="hover:text-primary transition-colors">Global Business Map</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="/press" className="hover:text-primary transition-colors">Press & Media</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contact Support</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>badamsudheerreddy@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>+91 1800-SEARCH-PL</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Narasaraopet, Guntur, India - 522615</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© 2026 Badam Sudheer Reddy | Search Pvt.Ltd. All rights reserved.</p>
        <p>Data provided is for informational purposes only. CIN/UIN verified from public records.</p>
      </div>
    </footer>
  );
};

export default Footer;
