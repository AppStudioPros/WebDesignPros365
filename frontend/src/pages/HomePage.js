import React from 'react';
import {
  HeroSection,
  WebsiteScannerSection,
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
      {/* Fixed Video Background - covers entire page */}
      <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source
            src="https://customer-assets.emergentagent.com/job_design-scanner-3/artifacts/uacga4lg_wdpbgvideo.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Page Content */}
      <HeroSection />
      <WebsiteScannerSection />
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
