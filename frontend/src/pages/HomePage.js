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
      {/* Video Background - Full screen */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
        >
          <source 
            src="/video-small.mp4" 
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
