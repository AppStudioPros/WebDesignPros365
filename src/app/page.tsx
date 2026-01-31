import HeroSection from "@/components/sections/HeroSection";
import WebsiteScannerSection from "@/components/sections/WebsiteScannerSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PricingHomeSection from "@/components/sections/PricingHomeSection";
import FAQHomeSection from "@/components/sections/FAQHomeSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WebsiteScannerSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProcessSection />
      <TechStackSection />
      <PricingHomeSection />
      <FAQHomeSection />
      <CTASection />
    </>
  );
}
