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
      {/* Video Background - Full screen, no overlay */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/ji9hkmn4_3d-abstract-particle-slow-motion-flow-with-gradien-2026-01-23-02-03-20-utc.mov" 
            type="video/quicktime" 
          />
          <source 
            src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/ji9hkmn4_3d-abstract-particle-slow-motion-flow-with-gradien-2026-01-23-02-03-20-utc.mov" 
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
