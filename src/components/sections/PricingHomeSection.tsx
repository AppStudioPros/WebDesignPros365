'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const pricingTiers = [
  {
    name: 'Starter',
    priceRange: '$5,000 - $7,000',
    description: 'Perfect for small businesses and startups launching their first professional website.',
    bestFor: 'Small Business',
    features: [
      { feature: 'Custom Design (5-7 pages)', included: true },
      { feature: 'Mobile Responsive', included: true },
      { feature: 'Basic SEO Setup', included: true },
      { feature: 'Contact Form', included: true },
      { feature: 'CMS Integration', included: false },
      { feature: 'E-commerce', included: false },
    ],
    isPopular: false,
    ctaText: 'Get Started',
    color: '#2F73EE',
  },
  {
    name: 'Growth',
    priceRange: '$10,000 - $15,000',
    description: 'For growing businesses that need advanced features and CMS capabilities.',
    bestFor: 'Growing Business',
    features: [
      { feature: 'Custom Design (10-15 pages)', included: true },
      { feature: 'Mobile Responsive', included: true },
      { feature: 'Advanced SEO + GEO', included: true },
      { feature: 'Sanity CMS Integration', included: true },
      { feature: 'Analytics Dashboard', included: true },
      { feature: 'Basic E-commerce', included: true },
    ],
    isPopular: true,
    ctaText: 'Most Popular',
    color: '#8734E1',
  },
  {
    name: 'Premium',
    priceRange: '$18,000 - $30,000',
    description: 'Full-scale digital solution with custom development and AI integration.',
    bestFor: 'Enterprise',
    features: [
      { feature: 'Unlimited Pages', included: true },
      { feature: 'Custom Applications', included: true },
      { feature: 'Full GEO Optimization', included: true },
      { feature: 'AI Chatbot Integration', included: true },
      { feature: 'Advanced E-commerce', included: true },
      { feature: 'Priority Support', included: true },
    ],
    isPopular: false,
    ctaText: 'Contact Us',
    color: '#f59e0b',
  },
];

export default function PricingHomeSection() {
  return (
    <section className="section relative overflow-hidden" id="pricing-section">
      <div className="absolute inset-0 bg-white/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
            Pricing
          </div>
          <h2 className="heading-lg mb-4">
            Transparent <span className="gradient-text">Investment</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the package that fits your needs. All packages include our commitment to quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full p-6 relative bg-white border-gray-200 ${
                tier.isPopular
                  ? 'border-[#8734E1] shadow-xl'
                  : 'hover:shadow-lg'
              }`}>
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Recommended
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">{tier.bestFor}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold" style={{ color: tier.color }}>{tier.priceRange}</span>
                  <p className="text-sm text-gray-400 mt-1">Project-based pricing</p>
                </div>

                <p className="text-sm text-gray-600 mb-6">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.feature}
                      className={`flex items-center gap-3 text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      <Check className={`w-4 h-4 flex-shrink-0 ${
                        feature.included ? 'text-[#10b981]' : 'text-gray-300'
                      }`} />
                      {feature.feature}
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className={`w-full ${tier.isPopular ? 'bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90' : 'border border-[#8734E1] text-[#8734E1] bg-white hover:bg-[#8734E1]/10'}`}
                  >
                    {tier.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#f8f9fc] border border-gray-200 rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Need a Retainer?</h3>
          <p className="text-gray-600 mb-4">
            Enterprise retainer packages starting at $3,000 - $5,000/month for ongoing development and support.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-[#8734E1] to-[#2F73EE] hover:opacity-90">
              Discuss Your Needs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
