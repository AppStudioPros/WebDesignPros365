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
  description: "We build high-performance websites and applications using cutting-edge technology. From AI integration to GEO optimization, we transform your digital presence.",
  keywords: ["web development", "Next.js", "AI integration", "GEO", "SEO", "web design"],
  openGraph: {
    title: "Web Design Pros 365 | Next-Gen Web Development",
    description: "Crafting next-gen web experiences with cutting-edge technology.",
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
