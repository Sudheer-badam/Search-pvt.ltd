import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Falcon Ebiz Pvt Ltd | GST/Company API | Verification | Validation | Corporate Directory",
  description: "Some of our services include Pincode Wise Companies, Newly Registered Companies, Company Watchlist, Gold Membership, CIN Master Data API, DIN Master Data API, Company Search API, Company Documents API, GST Verification API, GST Returns API, Name/PAN to GST API, One API - Falcon Ebiz Private Limited",
  robots: "all,index,follow",
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "Falcon Ebiz Private Limited",
    images: [{ url: "https://www.falconebiz.com/images/og_image.jpg", width: 600, height: 314 }],
    url: "https://www.falconebiz.com/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.falconebiz.com/images/og_image.jpg"],
  },
  other: {
    "publication-media-verification": "9757e56e4ab944c29aee992c593d5954",
    "distribution": "global",
    "HandheldFriendly": "true",
    "MobileOptimized": "width",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  themeColor: "#f26522",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
