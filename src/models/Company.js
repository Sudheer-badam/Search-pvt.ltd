import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  cin: { type: String, required: true, unique: true },
  logo: String,
  estDate: Date,
  estYear: Number,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  industry: String,
  location: String,
  pincode: String,
  website: String,
  email: String,
  phone: String,
  employees: String,
  revenue: String,
  description: String,
  gstStatus: String,
  directors: [
    {
      name: String,
      role: String,
      experience: String,
      education: String,
      otherCompanies: Number,
    }
  ],
  timeline: [
    {
      year: String,
      event: String,
    }
  ],
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
