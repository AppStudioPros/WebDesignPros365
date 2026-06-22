import JsonLd from '@/components/JsonLd';
import PricingPageClient from './PricingPageClient';

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Web Design Pros 365 — Next-Gen Web Development Services",
  "description": "High-performance website and application development featuring AI Visibility Stack optimization (SEO + AEO + GEO).",
  "brand": { "@type": "Brand", "name": "Web Design Pros 365" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "7500",
    "highPrice": "75000",
    "offerCount": "5"
  }
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      <PricingPageClient />
    </>
  );
}
