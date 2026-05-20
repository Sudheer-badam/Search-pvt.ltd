"use client";

import React from "react";
import Link from "next/link";
import { Building2, Calendar, MapPin, ArrowUpRight, ShieldCheck, Tag } from "lucide-react";
import { motion } from "framer-motion";

const CompanyCard = ({ company, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group glass p-6 rounded-3xl hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-primary w-6 h-6" />
      </div>

      <div className="flex gap-4 items-start mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/20">
          {company.logo || company.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            {company.status === "Active" && (
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Tag className="w-3 h-3" /> {company.industry}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>Est. {company.estYear}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-secondary" />
          <span>{company.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          CIN: {company.cin}
        </span>
        <Link 
          href={`/companies/${company.id}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
