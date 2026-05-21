"use client";

import React from "react";
import { useParams } from "next/navigation";
import { 
  Building2, Calendar, MapPin, Globe, Mail, Phone, 
  Users, TrendingUp, ShieldCheck, Download, ExternalLink, 
  Clock, Award, BarChart3, PieChart, Users2
} from "lucide-react";
import { motion } from "framer-motion";

const COMPANIES = {
  "tech-nova": {
    id: "tech-nova",
    name: "TechNova Solutions Pvt Ltd",
    logo: "T",
    cin: "U72900KA2021PTC145000",
    estDate: "12 May 2021",
    status: "Active",
    industry: "Information Technology / AI",
    location: "HSR Layout, Bangalore, Karnataka, India - 560102",
    website: "https://technova.ai",
    email: "contact@technova.ai",
    phone: "+91 80-4567-8901",
    employees: "124",
    revenue: "₹15.4 Cr (FY 2025)",
    gstStatus: "Verified",
    description: "TechNova Solutions is a leading AI-driven enterprise software provider specializing in cloud infrastructure and automated business intelligence. Founded by industry veterans, the company has scaled rapidly to serve global clients in finance and healthcare sectors.",
    directors: [
      { name: "Arjun Mehta", role: "Managing Director", experience: "15+ Years", education: "IIT Bombay, MBA IIM Bangalore", otherCompanies: 3 },
      { name: "Sara Khan", role: "Technical Director", experience: "12+ Years", education: "BITS Pilani, MS Stanford", otherCompanies: 1 },
    ],
    timeline: [
      { year: "2021", event: "Company Incorporated in Bangalore" },
      { year: "2022", event: "Seed Funding of $2M raised" },
      { year: "2023", event: "Expanded operations to Southeast Asia" },
      { year: "2024", event: "Reached 100+ employees milestone" },
    ]
  },
  "falcon-ebiz": {
    id: "falcon-ebiz",
    name: "Falcon Ebiz Private Limited",
    logo: "F",
    cin: "U72900MH2016PTC281055",
    estDate: "13 May 2016",
    status: "Active",
    industry: "IT Services & Consulting",
    location: "Thane, Maharashtra, India - 400601",
    website: "https://falconebiz.com",
    email: "info@falconebiz.com",
    phone: "+91 22-1234-5678",
    employees: "50-100",
    revenue: "₹5 Cr - ₹10 Cr (Est.)",
    gstStatus: "Verified",
    description: "Falcon Ebiz Private Limited is a Maharashtra-based technology services firm specializing in IT consulting, website maintenance, and custom software support. Since 2016, they have been a reliable partner for businesses looking to scale their digital infrastructure.",
    directors: [
      { name: "Arvind Pramod Pal", role: "Director", experience: "10+ Years", education: "University of Mumbai", otherCompanies: 2 },
      { name: "Rashmi Punjabi Pal", role: "Director", experience: "8+ Years", education: "Pune University", otherCompanies: 1 },
    ],
    timeline: [
      { year: "2016", event: "Incorporated in Mumbai, ROC Mumbai" },
      { year: "2018", event: "Established core IT consulting team" },
      { year: "2021", event: "Launched advanced web maintenance services" },
      { year: "2024", event: "Ranked as top IT service provider in Thane" },
    ]
  },
  "zoho-corp": {
    id: "zoho-corp",
    name: "Zoho Corporation Private Limited",
    logo: "Z",
    cin: "U72200TN1996PTC035345",
    estDate: "01 Feb 1996",
    status: "Active",
    industry: "SaaS & Cloud Computing",
    location: "Estancia IT Park, Chennai, Tamil Nadu, India",
    website: "https://zoho.com",
    email: "support@zoho.com",
    phone: "+91 44-6744-7070",
    employees: "15,000+",
    revenue: "₹8,000+ Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Zoho Corporation is an Indian multinational technology company that makes web-based business tools. It is best known for the online office suite Zoho Office Suite. The company was founded in 1996 by Sridhar Vembu and Tony Thomas.",
    directors: [
      { name: "Sridhar Vembu", role: "CEO & Founder", experience: "28+ Years", education: "IIT Madras, PhD Princeton", otherCompanies: 5 },
      { name: "Radha Vembu", role: "Director", experience: "25+ Years", education: "IIT Madras", otherCompanies: 2 },
    ],
    timeline: [
      { year: "1996", event: "AdventNet Inc. founded in Pleasanton, CA" },
      { year: "2005", event: "Launched Zoho CRM and Zoho Writer" },
      { year: "2009", event: "Renamed to Zoho Corporation" },
      { year: "2020", event: "Moved headquarters to Tenkasi for rural empowerment" },
    ]
  },
  "spacex": {
    id: "spacex",
    name: "Space Exploration Technologies Corp",
    logo: "S",
    cin: "GLOBAL-SPX-2002",
    estDate: "14 Mar 2002",
    status: "Active",
    industry: "Aerospace & Satellite",
    location: "Hawthorne, California, USA",
    website: "https://spacex.com",
    email: "media@spacex.com",
    phone: "+1 310-363-6000",
    employees: "13,000+",
    revenue: "$9B+ (Est. 2024)",
    gstStatus: "Global Reg.",
    description: "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.",
    directors: [
      { name: "Elon Musk", role: "CEO & CTO", experience: "25+ Years", education: "UPenn, Stanford", otherCompanies: 6 },
      { name: "Gwynne Shotwell", role: "President & COO", experience: "35+ Years", education: "Northwestern University", otherCompanies: 2 },
    ],
    timeline: [
      { year: "2002", event: "SpaceX Founded by Elon Musk" },
      { year: "2008", event: "Falcon 1 becomes first privately funded liquid-fueled rocket to reach orbit" },
      { year: "2015", event: "First successful vertical landing of an orbital rocket" },
      { year: "2020", event: "First private company to send humans to the ISS" },
    ]
  },
  "openai": {
    id: "openai",
    name: "OpenAI LP",
    logo: "O",
    cin: "GLOBAL-OAI-2015",
    estDate: "11 Dec 2015",
    status: "Active",
    industry: "Artificial Intelligence",
    location: "San Francisco, California, USA",
    website: "https://openai.com",
    email: "press@openai.com",
    phone: "+1 415-555-0199",
    employees: "1,000+",
    revenue: "$2B+ (ARR 2024)",
    gstStatus: "Global Reg.",
    description: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We created ChatGPT, DALL-E, and GPT-4.",
    directors: [
      { name: "Sam Altman", role: "CEO", experience: "20+ Years", education: "Stanford (Dropout)", otherCompanies: 4 },
      { name: "Greg Brockman", role: "President", experience: "15+ Years", education: "MIT, Harvard", otherCompanies: 1 },
    ],
    timeline: [
      { year: "2015", event: "OpenAI founded as a non-profit" },
      { year: "2019", event: "Transitioned to a 'capped-profit' model" },
      { year: "2022", event: "Launched ChatGPT, sparking global AI race" },
      { year: "2024", event: "Released GPT-4o with multimodal capabilities" },
    ]
  },
  "vitol": {
    id: "vitol",
    name: "Vitol Group",
    logo: "V",
    cin: "GLOBAL-VIT-1966",
    estDate: "01 Aug 1966",
    status: "Active",
    industry: "Energy & Commodities",
    location: "Rotterdam, Netherlands & Geneva, Switzerland",
    website: "https://vitol.com",
    email: "info@vitol.com",
    phone: "+41 22-320-3000",
    employees: "2,800+",
    revenue: "$400B+ (2024)",
    gstStatus: "Global Reg.",
    description: "Vitol is a Dutch energy and commodity trading company, currently the largest independent energy trader in the world. It ships more than 350 million tonnes of crude oil and products a year.",
    directors: [
      { name: "Russell Hardy", role: "CEO", experience: "30+ Years", education: "Imperial College London", otherCompanies: 3 },
      { name: "Ian Taylor", role: "Late Chairman", experience: "40+ Years", education: "Oxford University", otherCompanies: 1 },
    ],
    timeline: [
      { year: "1966", event: "Founded in Rotterdam by Henk Viëtor" },
      { year: "1990", event: "Shifted focus to global commodity trading" },
      { year: "2022", event: "Reported record turnover due to energy market shifts" },
      { year: "2024", event: "Investing heavily in renewable energy transition" },
    ]
  },
  "cargill": {
    id: "cargill",
    name: "Cargill, Incorporated",
    logo: "C",
    cin: "GLOBAL-CRG-1865",
    estDate: "01 Jan 1865",
    status: "Active",
    industry: "Agriculture & Food",
    location: "Minnetonka, Minnesota, USA",
    website: "https://cargill.com",
    email: "media@cargill.com",
    phone: "+1 952-742-7575",
    employees: "160,000+",
    revenue: "$177B+ (FY 2024)",
    gstStatus: "Global Reg.",
    description: "Cargill is the largest privately held corporation in the United States by revenue. Its business activities include purchasing, processing, and distributing grain and other agricultural commodities.",
    directors: [
      { name: "Brian Sikes", role: "CEO", experience: "32+ Years", education: "Texas Tech University", otherCompanies: 2 },
      { name: "Dave MacLennan", role: "Executive Chair", experience: "35+ Years", education: "Amherst College", otherCompanies: 3 },
    ],
    timeline: [
      { year: "1865", event: "Founded by William Wallace Cargill" },
      { year: "1945", event: "Expanded globally following WWII" },
      { year: "2015", event: "Celebrated 150 years of operations" },
      { year: "2024", event: "Pioneering sustainable supply chain initiatives" },
    ]
  },
  "stripe": {
    id: "stripe",
    name: "Stripe, Inc.",
    logo: "S",
    cin: "GLOBAL-STR-2010",
    estDate: "01 Sep 2010",
    status: "Active",
    industry: "Fintech & Payments",
    location: "San Francisco, USA & Dublin, Ireland",
    website: "https://stripe.com",
    email: "support@stripe.com",
    phone: "+1 415-555-0100",
    employees: "7,000+",
    revenue: "$14B+ (Est. 2024)",
    gstStatus: "Global Reg.",
    description: "Stripe is a financial services and software as a service company. It primarily offers payment processing software and application programming interfaces for e-commerce websites and mobile applications.",
    directors: [
      { name: "Patrick Collison", role: "CEO & Co-founder", experience: "15+ Years", education: "MIT (Dropout)", otherCompanies: 3 },
      { name: "John Collison", role: "President & Co-founder", experience: "15+ Years", education: "Harvard (Dropout)", otherCompanies: 2 },
    ]
  },
  "flipkart": {
    id: "flipkart",
    name: "Flipkart Internet Private Limited",
    logo: "F",
    cin: "U51109KA2012PTC066107",
    estDate: "05 May 2012",
    status: "Active",
    industry: "E-commerce & Retail",
    location: "Outer Ring Road, Bangalore, Karnataka, India - 560103",
    website: "https://flipkart.com",
    email: "info@flipkart.com",
    phone: "+91 80-4664-0000",
    employees: "30,000+",
    revenue: "₹56,013 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Flipkart is one of India's leading e-commerce marketplaces. Founded by Sachin and Binny Bansal in 2007, it began as an online bookstore before expanding to other categories and was acquired by Walmart in 2018.",
    directors: [
      { name: "Kalyan Krishnamurthy", role: "CEO & Director", experience: "20+ Years", education: "MBA UIUC", otherCompanies: 3 },
      { name: "Sachin Bansal", role: "Co-Founder", experience: "18+ Years", education: "IIT Delhi", otherCompanies: 5 },
    ],
    timeline: [
      { year: "2007", event: "Founded as an online book retailer" },
      { year: "2012", event: "Incorporated Flipkart Internet Pvt Ltd" },
      { year: "2016", event: "Acquired Jabong & scaled fashion division" },
      { year: "2018", event: "Walmart acquired a 77% stake for $16B" },
    ]
  },
  "razorpay": {
    id: "razorpay",
    name: "Razorpay Software Private Limited",
    logo: "R",
    cin: "U72200KA2014PTC077308",
    estDate: "18 Nov 2014",
    status: "Active",
    industry: "Fintech & Payments",
    location: "SJR Cyber, Koramangala, Bangalore, Karnataka",
    website: "https://razorpay.com",
    email: "support@razorpay.com",
    phone: "+91 80-6666-7777",
    employees: "3,000+",
    revenue: "₹2,279 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Razorpay is a leading fintech platform providing payments, banking, and business finance solutions for developers and enterprises. It was founded by Harshil Mathur and Shashank Kumar, alumni of IIT Roorkee.",
    directors: [
      { name: "Harshil Mathur", role: "Co-Founder & CEO", experience: "12+ Years", education: "IIT Roorkee", otherCompanies: 2 },
      { name: "Shashank Kumar", role: "Co-Founder & CTO", experience: "12+ Years", education: "IIT Roorkee", otherCompanies: 2 },
    ],
    timeline: [
      { year: "2014", event: "Founded in Jaipur and incubated at Y Combinator" },
      { year: "2018", event: "Launched RazorpayX neo-banking platform" },
      { year: "2020", event: "Achieved Unicorn status at $1B+ valuation" },
      { year: "2024", event: "Expanded services globally to Southeast Asia" },
    ]
  },
  "google-india": {
    id: "google-india",
    name: "Google India Private Limited",
    logo: "G",
    cin: "U72200KA2003PTC033028",
    estDate: "16 Dec 2003",
    status: "Active",
    industry: "IT & Digital Services",
    location: "RMZ Infinity, Old Madras Road, Bangalore, Karnataka",
    website: "https://google.co.in",
    email: "support-in@google.com",
    phone: "+91 80-6721-8000",
    employees: "8,000+",
    revenue: "₹9,275 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Google India Private Limited operates as a subsidiary of Google LLC, providing IT solutions, sales & marketing support, software maintenance, and local infrastructure operations across key Indian cities.",
    directors: [
      { name: "Sanjay Gupta", role: "VP & Country Manager", experience: "25+ Years", education: "Delhi College of Engineering, MBA FMS", otherCompanies: 2 },
      { name: "Roma Dutta", role: "Director", experience: "18+ Years", education: "University of Delhi", otherCompanies: 1 },
    ],
    timeline: [
      { year: "2003", event: "Google India Incorporated" },
      { year: "2008", event: "Launched Google Map maker and local search initiatives" },
      { year: "2016", event: "Introduced high-speed WiFi at 400 railway stations" },
      { year: "2024", event: "Announced local manufacturing of Pixel phones in India" },
    ]
  },
  "reliance": {
    id: "reliance",
    name: "Reliance Industries Limited",
    logo: "R",
    cin: "L17110MH1973PLC019786",
    estDate: "08 May 1973",
    status: "Active",
    industry: "Conglomerate & Energy",
    location: "Maker Chambers IV, Nariman Point, Mumbai, Maharashtra",
    website: "https://ril.com",
    email: "investor.relations@ril.com",
    phone: "+91 22-3555-5000",
    employees: "389,000+",
    revenue: "₹1,000,122 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Reliance Industries Limited (RIL) is a Fortune 500 multinational conglomerate headquartered in Mumbai. Its diverse portfolio includes energy, petrochemicals, natural gas, retail, telecommunications, and digital services.",
    directors: [
      { name: "Mukesh Ambani", role: "Chairman & MD", experience: "45+ Years", education: "Stanford University (Dropout)", otherCompanies: 6 },
      { name: "Nita Ambani", role: "Director", experience: "25+ Years", education: "University of Mumbai", otherCompanies: 3 },
    ],
    timeline: [
      { year: "1973", event: "Incorporated by Dhirubhai Ambani as a textile company" },
      { year: "1999", event: "Commissioned Jamnagar refinery, the world's largest" },
      { year: "2016", event: "Launched Reliance Jio, disrupting telecommunications" },
      { year: "2024", event: "Announced massive clean energy gigafactories in Gujarat" },
    ]
  },
  "tcs": {
    id: "tcs",
    name: "Tata Consultancy Services Limited",
    logo: "T",
    cin: "L22210MH1995PLC084781",
    estDate: "26 Jan 1995",
    status: "Active",
    industry: "IT Services & Consulting",
    location: "Nirmal Building, Nariman Point, Mumbai, Maharashtra",
    website: "https://tcs.com",
    email: "global.support@tcs.com",
    phone: "+91 22-6778-9999",
    employees: "600,000+",
    revenue: "₹240,893 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Tata Consultancy Services (TCS) is an Indian multinational information technology services and consulting company. It operates in 46 countries and is one of the largest IT service brands worldwide.",
    directors: [
      { name: "K. Krithivasan", role: "CEO & MD", experience: "34+ Years", education: "IIT Madras", otherCompanies: 2 },
      { name: "N. Chandrasekaran", role: "Chairman", experience: "35+ Years", education: "NIT Trichy", otherCompanies: 8 },
    ],
    timeline: [
      { year: "1968", event: "Founded as Tata Computer Systems by Tata Group" },
      { year: "1995", event: "Incorporated as public limited company" },
      { year: "2004", event: "Went public with one of India's largest IPOs" },
      { year: "2024", event: "Ranked as the 2nd most valuable global IT services brand" },
    ]
  },
  "infosys": {
    id: "infosys",
    name: "Infosys Limited",
    logo: "I",
    cin: "L85110KA1981PLC013115",
    estDate: "02 Jul 1981",
    status: "Active",
    industry: "IT Services & Outsourcing",
    location: "Electronics City, Hosur Road, Bangalore, Karnataka",
    website: "https://infosys.com",
    email: "contactus@infosys.com",
    phone: "+91 80-2852-0261",
    employees: "317,000+",
    revenue: "₹153,670 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Infosys Limited is a global leader in next-generation digital services and consulting. It was founded in Pune by Narayana Murthy, Nandan Nilekani, and five other co-founders with a seed capital of $250.",
    directors: [
      { name: "Salil Parekh", role: "CEO & MD", experience: "30+ Years", education: "Cornell University", otherCompanies: 3 },
      { name: "Nandan Nilekani", role: "Chairman", experience: "40+ Years", education: "IIT Bombay", otherCompanies: 4 },
    ],
    timeline: [
      { year: "1981", event: "Founded in Pune by seven engineers" },
      { year: "1999", event: "Became first Indian company listed on NASDAQ" },
      { year: "2012", event: "Set up operations in the European tech hubs" },
      { year: "2024", event: "Accelerated cloud transformation via cobalt platform" },
    ]
  },
  "wipro": {
    id: "wipro",
    name: "Wipro Limited",
    logo: "W",
    cin: "L32102KA1945PLC020800",
    estDate: "29 Dec 1945",
    status: "Active",
    industry: "IT & Systems Integration",
    location: "Sarjapur Road, Doddakannelli, Bangalore, Karnataka",
    website: "https://wipro.com",
    email: "info@wipro.com",
    phone: "+91 80-2844-0011",
    employees: "230,000+",
    revenue: "₹89,760 Cr (FY 2024)",
    gstStatus: "Verified",
    description: "Wipro Limited is a leading technology services and consulting company focused on building innovative solutions that address clients' most complex digital transformation needs.",
    directors: [
      { name: "Srinivas Pallia", role: "CEO & MD", experience: "32+ Years", education: "IISc Bangalore", otherCompanies: 2 },
      { name: "Rishad Premji", role: "Executive Chairman", experience: "20+ Years", education: "Harvard Business School", otherCompanies: 4 },
    ],
    timeline: [
      { year: "1945", event: "Founded as Western India Vegetable Products by Mohamed Premji" },
      { year: "1980", event: "Entered the IT industry under Azim Premji's leadership" },
      { year: "2000", event: "Listed on New York Stock Exchange (NYSE)" },
      { year: "2024", event: "Launched major global AI enterprise practice" },
    ]
  }
};

const CompanyDetails = () => {
  const params = useParams();
  const company = COMPANIES[params.id] || COMPANIES["tech-nova"];

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="glass p-8 md:p-12 rounded-[3rem] mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-5xl font-bold shadow-2xl shrink-0">
            {company.logo}
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
                <Calendar className="w-5 h-5 text-secondary shrink-0" /> Est. {company.estDate}
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
                    <p className="text-sm text-primary font-semibold mb-4">{dir.role}</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Education:</strong> {dir.education}</p>
                      <p><strong>Experience:</strong> {dir.experience}</p>
                      <p><strong>Other Companies:</strong> {dir.otherCompanies}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href={company.website} className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase">Website</div>
                    <div className="text-sm font-bold">{company.website.replace("https://", "")}</div>
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
                Verified by Search Pvt.Ltd Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
