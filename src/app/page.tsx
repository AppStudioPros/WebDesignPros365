import HeroSection from "@/components/sections/HeroSection";
import LiveCodingSection from "@/components/sections/LiveCodingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PricingHomeSection from "@/components/sections/PricingHomeSection";
import FAQHomeSection from "@/components/sections/FAQHomeSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveCodingSection />
      <TestimonialsSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <PricingHomeSection />
      <FAQHomeSection />
      <CTASection />
    </>
  );
}
