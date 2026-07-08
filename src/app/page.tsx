import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Lazy-load everything below the fold — massive TBT reduction
const SiteAuditScanner = dynamic(() => import("@/components/sections/SiteAuditScanner"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection"));
const TechStackSection = dynamic(() => import("@/components/sections/TechStackSection"));
const VideoGeoSection = dynamic(() => import("@/components/sections/VideoGeoSection"));
const PricingHomeSection = dynamic(() => import("@/components/sections/PricingHomeSection"));
const FAQHomeSection = dynamic(() => import("@/components/sections/FAQHomeSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export default function Home() {
  return (
    <>
      <HeroSection />
      <SiteAuditScanner />
      <TestimonialsSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <VideoGeoSection />
      <PricingHomeSection />
      <FAQHomeSection />
      <CTASection />
    </>
  );
}
