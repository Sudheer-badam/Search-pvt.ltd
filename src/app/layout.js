import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import IntroScreen from "@/components/IntroScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sudheer Pvt.Ltd | GST/Company API | Verification | Validation | Corporate Directory",
  description:
    "Some of our services include Pincode Wise Companies, Newly Registered Companies, Company Watchlist, Gold Membership, CIN Master Data API, DIN Master Data API, Company Search API, Company Documents API, GST Verification API, GST Returns API, Name/PAN to GST API, One API - Sudheer Pvt.Ltd",
  robots: "all,index,follow",
  verification: {
    google: "bu6PlEfWymgcNJS8s06fU_UFi9IK6tLwIkSRXYnp2Jg",
  },
  icons: {
    icon: "/SUDHEER PVT.LTD.png",
    shortcut: "/SUDHEER PVT.LTD.png",
    apple: "/SUDHEER PVT.LTD.png",
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    siteName: "Sudheer Pvt.Ltd",
    images: [
      {
        url: "https://badamsudheerreddy-search-pvt-ltd.vercel.app/images/og_image.jpg",
        width: 600,
        height: 314,
      },
    ],
    url: "https://badamsudheerreddy-search-pvt-ltd.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://badamsudheerreddy-search-pvt-ltd.vercel.app/images/og_image.jpg",
    ],
  },
  other: {
    "publication-media-verification": "9757e56e4ab944c29aee992c593d5954",
    distribution: "global",
    HandheldFriendly: "true",
    MobileOptimized: "width",
  },
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
          <IntroScreen />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
