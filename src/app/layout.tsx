import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Web Design Pros 365 | Next-Gen Web Development",
  description: "We build high-performance websites and applications on a modern AI-native stack. From patented ACI AI integration to the full AI Visibility Stack (SEO + AEO + GEO), we make sure you rank, you're the answer, and you get cited by AI.",
  keywords: ["web development", "Next.js 16", "React 19", "AI integration", "ACI", "GEO", "AEO", "SEO", "AI Visibility Stack", "web design"],
  openGraph: {
    title: "Web Design Pros 365 | Next-Gen Web Development",
    description: "Building modern web experiences on an AI-native stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
