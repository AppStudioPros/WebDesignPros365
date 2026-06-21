import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { AciChat } from "@/components/chat/AciChat";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Web Design Pros 365 | Next-Gen Web Development",
  description: "High-performance websites built on an AI-native stack. SEO + AEO + GEO — we make sure you rank, you're the answer, and AI recommends you.",
  keywords: ["web development", "Next.js 16", "React 19", "AI integration", "ACI", "GEO", "AEO", "SEO", "AI Visibility Stack", "web design"],
  openGraph: {
    title: "Web Design Pros 365 | Next-Gen Web Development",
    description: "High-performance websites built on an AI-native stack. SEO + AEO + GEO.",
    type: "website",
    url: "https://www.webdesignpros365.com",
    images: [{ url: "https://www.webdesignpros365.com/og-image.jpg", width: 1200, height: 630 }],
  },
  metadataBase: new URL("https://www.webdesignpros365.com"),
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Web Design Pros 365",
  "url": "https://www.webdesignpros365.com",
  "logo": "https://www.webdesignpros365.com/logo.png",
  "description": "We build high-performance websites and AI-native web applications. Full AI Visibility Stack: SEO + AEO + GEO.",
  "telephone": "+17202760797",
  "email": "info@webdesignpros365.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Denver",
    "addressRegion": "CO",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.linkedin.com/company/webdesignpros365",
    "https://twitter.com/webdesignpros365"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+17202760797",
    "email": "info@webdesignpros365.com",
    "contactType": "customer service"
  },
  "areaServed": "US",
  "serviceType": ["Web Design", "Web Development", "AI Integration", "SEO", "GEO", "AEO"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
        <CookieBanner />
        <AciChat />
      </body>
    </html>
  );
}
