import React, { useEffect, useRef } from 'react';
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
  const videoRef = useRef(null);

  useEffect(() => {
    // Force video to play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, []);

  return (
    <div className="relative">
      {/* Video Background - positioned behind content only, not header/footer */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source 
            src="/particle-bg.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/vue5h43f_colorful-particle-flow-in-abstract-motion-2026-01-23-02-03-02-utc.mp4" 
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
