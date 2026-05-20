import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Company from "@/models/Company";

const MOCK_DATA = [
  { id: "zoho-corp", name: "Zoho Corporation Private Limited", industry: "SaaS & Cloud", location: "Chennai, Tamil Nadu", cin: "U72200TN1996PTC035345", estYear: 1996, status: "Active" },
  { id: "flipkart", name: "Flipkart Internet Private Limited", industry: "E-commerce", location: "Bangalore, Karnataka", cin: "U51109KA2012PTC066107", estYear: 2012, status: "Active" },
  { id: "spacex", name: "Space Exploration Technologies Corp (SpaceX)", industry: "Aerospace", location: "Hawthorne, USA", cin: "GLOBAL-SPX-001", estYear: 2002, status: "Active" },
  { id: "openai", name: "OpenAI LP", industry: "Artificial Intelligence", location: "San Francisco, USA", cin: "GLOBAL-OAI-002", estYear: 2015, status: "Active" },
  { id: "razorpay", name: "Razorpay Software Private Limited", industry: "Fintech", location: "Bangalore, Karnataka", cin: "U72200KA2014PTC077308", estYear: 2014, status: "Active" },
  { id: "google-india", name: "Google India Private Limited", industry: "IT Services", location: "Gurugram, Haryana", cin: "U72200KA2003PTC033028", estYear: 2003, status: "Active" },
  { id: "dream11", name: "Sporta Technologies Private Limited (Dream11)", industry: "Gaming", location: "Mumbai, Maharashtra", cin: "U74900MH2008PTC184124", estYear: 2008, status: "Active" },
  { id: "bytedance", name: "Bytedance (India) Technology Pvt Ltd", industry: "Digital Media", location: "Mumbai, Maharashtra", cin: "U74999MH2017PTC301712", estYear: 2017, status: "Active" },
  { id: "vitol", name: "Vitol Group", industry: "Energy", location: "Geneva, Switzerland", cin: "GLOBAL-VIT-1966", estYear: 1966, status: "Active" },
  { id: "cargill", name: "Cargill, Incorporated", industry: "Agriculture", location: "Minnesota, USA", cin: "GLOBAL-CRG-1865", estYear: 1865, status: "Active" },
  { id: "stripe", name: "Stripe, Inc.", industry: "Fintech", location: "San Francisco, USA", cin: "GLOBAL-STR-2010", estYear: 2010, status: "Active" },
  { id: "reliance", name: "Reliance Industries Limited", industry: "Conglomerate", location: "Mumbai, Maharashtra", cin: "L17110MH1973PLC019786", estYear: 1973, status: "Active" },
  { id: "tcs", name: "Tata Consultancy Services Limited", industry: "IT Services", location: "Mumbai, Maharashtra", cin: "L22210MH1995PLC084781", estYear: 1995, status: "Active" },
  { id: "infosys", name: "Infosys Limited", industry: "IT Services", location: "Bangalore, Karnataka", cin: "L85110KA1981PLC013115", estYear: 1981, status: "Active" },
  { id: "wipro", name: "Wipro Limited", industry: "IT Services", location: "Bangalore, Karnataka", cin: "L32102KA1945PLC020800", estYear: 1945, status: "Active" }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").toLowerCase();
  const type = searchParams.get("type") || "all";

  try {
    let dbCompanies = [];
    try {
      await dbConnect();
      let filter = {};
      if (query) {
        if (type === "company" || type === "all") {
          filter.$or = [
            { name: { $regex: query, $options: "i" } },
            { cin: { $regex: query, $options: "i" } },
          ];
        } else if (type === "director") {
          filter["directors.name"] = { $regex: query, $options: "i" };
        } else if (type === "pincode") {
          filter.pincode = query;
        }
      }
      dbCompanies = await Company.find(filter).limit(20);
    } catch (dbError) {
      console.error("Database connection failed, using mock data fallback", dbError);
    }

    // Filter mock data based on query
    const filteredMock = MOCK_DATA.filter(company => 
      company.name.toLowerCase().includes(query) || 
      company.cin.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query)
    );

    // Merge results
    const combinedData = [...dbCompanies, ...filteredMock];

    return NextResponse.json({ success: true, data: combinedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const company = await Company.create(body);
    return NextResponse.json({ success: true, data: company }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
