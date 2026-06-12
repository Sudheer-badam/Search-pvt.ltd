import React from "react";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata = {
  title: "Categories | Sudheer Pvt.Ltd",
  description: "Browse companies by industry and sector.",
};

export default function CategoriesPage() {
  return (
    <div className="pt-20">
      <CategoryGrid />
    </div>
  );
}
