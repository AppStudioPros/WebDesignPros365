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
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: 'auto',
            minWidth: '100%',
            minHeight: '100%'
          }}
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#0a0f18]/60" />
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
