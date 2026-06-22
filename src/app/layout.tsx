import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { AciChat } from "@/components/chat/AciChat";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/JsonLd";

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

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the AI Visibility Stack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI Visibility Stack combines SEO (Search Engine Optimization), AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization). SEO ranks your pages in Google. AEO gets your content selected as the direct answer in AI Overviews and voice search. GEO makes your brand get cited by ChatGPT, Claude, Gemini, and Perplexity. Most agencies only do SEO. We do all three."
      }
    },
    {
      "@type": "Question",
      "name": "What web technologies do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build on Next.js 16, React 19, TypeScript, Tailwind CSS, and Sanity CMS, deployed on Vercel. For AI integration we use our patented ACI (Adaptive Compound Intelligence) platform."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Starter package begins at $3,500. Professional packages start at $7,500. Enterprise projects are custom quoted. All packages include AI Visibility Stack optimization."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Web Design Pros 365 located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web Design Pros 365 is based in Denver, Colorado. We work with clients across the United States. Contact us at info@webdesignpros365.com or call +1 (720) 276-0797."
      }
    }
  ]
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
        <JsonLd data={structuredData} />
        <JsonLd data={faqStructuredData} />
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
