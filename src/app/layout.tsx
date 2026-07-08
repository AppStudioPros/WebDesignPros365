import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { AciChatLazy } from "@/components/chat/AciChatLazy";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
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
    },
    {
      "@type": "Question",
      "name": "What deployment platform does WDP use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web Design Pros 365 deploys all client websites on Vercel. Vercel provides global edge network delivery, automatic HTTPS, instant rollbacks, and CI/CD pipelines. Every WDP site is deployed to Vercel's production environment with preview deployments on every branch."
      }
    },
    {
      "@type": "Question",
      "name": "Do you use Next.js App Router?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All WDP client builds since 2024 use the Next.js App Router with TypeScript. The App Router enables React Server Components, streaming, and parallel routes — delivering faster page loads and better Core Web Vitals than the legacy Pages Router."
      }
    },
    {
      "@type": "Question",
      "name": "What CMS does Web Design Pros 365 use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WDP integrates Sanity CMS as the headless content management system for all client sites. Sanity allows clients to update content, services, and metadata without code changes. Changes reflect on the live site within 60 seconds via on-demand revalidation."
      }
    },
    {
      "@type": "Question",
      "name": "What is WDP's technical stack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web Design Pros 365 builds on: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Sanity CMS, deployed on Vercel. Lighthouse scores: Performance 73, Accessibility 100, Best Practices 100, SEO 100. All sites include llms.txt, structured data (JSON-LD), and full AI crawler access for ChatGPT, Perplexity, Claude, and Gemini."
      }
    },
    {
      "@type": "Question",
      "name": "What are WDP's Lighthouse scores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Webdesignpros365.com scores: Performance 73/100, Accessibility 100/100, Best Practices 100/100, SEO 100/100 (Lighthouse mobile, July 2026). Total Blocking Time: 80ms. Cumulative Layout Shift: 0. First Contentful Paint: 2.0s."
      }
    }
  ]
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Web Design Pros 365",
  "legalName": "Lucid Tech Labs LLC",
  "url": "https://www.webdesignpros365.com",
  "logo": "https://www.webdesignpros365.com/logo.png",
  "image": "https://www.webdesignpros365.com/og-image.jpg",
  "description": "Denver-based web development agency specializing in AI-optimized websites. We build high-performance Next.js sites with full AI Visibility Stack: Technical SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) so AI search engines like ChatGPT, Perplexity, and Gemini recommend your business.",
  "telephone": "+17202760797",
  "email": "info@webdesignpros365.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Denver",
    "addressRegion": "CO",
    "postalCode": "80202",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.7392,
    "longitude": -104.9903
  },
  "priceRange": "$$$",
  "openingHours": "Mo-Fr 08:00-18:00",
  "sameAs": [
    "https://www.linkedin.com/company/webdesignpros365",
    "https://www.bbb.org/us/co/denver/profile/web-design/web-design-pros-365-1296-1000176091"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+17202760797",
    "email": "info@webdesignpros365.com",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Visibility Stack Website",
          "description": "Custom Next.js website optimized for SEO, AEO, and GEO — so Google ranks you, AI Overviews answer with you, and ChatGPT recommends you."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technical SEO Optimization",
          "description": "Core Web Vitals optimization, structured data implementation, and codebase-level search engine optimization."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Generative Engine Optimization (GEO)",
          "description": "Get cited by ChatGPT, Perplexity, Claude, and Gemini when customers ask about your industry."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "12"
  }
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
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Web Design Pros 365",
          "url": "https://www.webdesignpros365.com",
          "description": "AI-optimized web development agency in Denver, CO. Technical SEO, AEO, and GEO services.",
          "publisher": {
            "@type": "Organization",
            "name": "Web Design Pros 365"
          }
        }} />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
        <CookieBanner />
        <AciChatLazy />
      </body>
    </html>
  );
}
