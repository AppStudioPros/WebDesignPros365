import React from 'react';
import {
  HeroSection,
  ServicesSection,
  TestimonialsSection,
  ProcessSection,
  TechStackSection,
  PricingSection,
  FAQSection,
  CTASection,
} from '../components/sections';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Video Background - positioned behind content only, not header/footer */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <source 
            src="/particle-bg.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>

      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProcessSection />
      <TechStackSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
