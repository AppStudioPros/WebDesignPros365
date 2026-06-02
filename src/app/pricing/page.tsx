"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/sections/CTASection';

const plans = [
  {
    name: 'Launch',
    price: '$7,500',
    description: 'Perfect for small businesses and startups',
    features: [
      'Up to 5 pages',
      'Next.js 16 development',
      'Responsive design',
      'SEO + AEO + GEO setup',
      'Contact form',
      '30 days support',
      'Mobile responsiveness*',
      'PWA*',
    ],
  },
  {
    name: 'Growth',
    price: '$15,000',
    description: 'For growing businesses that need more',
    popular: true,
    features: [
      'Up to 15 pages',
      'Next.js 16 development',
      'Custom design',
      'Advanced SEO + AEO + GEO',
      'Sanity CMS integration',
      'Analytics + conversion tracking',
      '60 days support',
      'Mobile responsiveness*',
      'PWA*',
    ],
  },
  {
    name: 'Pro',
    price: '$30,000',
    description: 'Corporate marketing sites with full AI integration',
    features: [
      'Unlimited content pages',
      'Next.js 16 + custom development',
      'AI chatbot integration',
      'Advanced SEO + AEO + GEO',
      'A/B testing infrastructure',
      'WCAG 2.2 AA accessibility',
      'CRM integration',
      '90 days support',
      'Monthly performance reports (6 months)',
    ],
  },
  {
    name: 'Custom',
    price: '$50,000+',
    description: 'Multi-language, headless commerce, legacy system integration',
    features: [
      'Everything in Pro',
      'Multi-language deployment',
      'Headless commerce',
      'Legacy system integration',
      'Custom AI applications',
      'White-label / agency mode',
      'Priority support',
      'SLA guarantee',
      'Custom support window',
    ],
  },
  {
    name: 'ACI-Powered',
    price: '$75,000+',
    description: 'Full ACI platform: patented AI architecture, custom agents, audit-trail-complete',
    features: [
      'Everything in Custom',
      'Full ACI platform integration',
      'Custom AI agents trained on your domain',
      'Patented Adaptive Compound Intelligence',
      'No hallucination / no drift / human-in-the-loop',
      'Audit-trail-complete (compliance-grade)',
      'Methodology-bound AI (cite-the-source)',
      'White-glove engagement',
      'Quarterly business reviews',
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Pricing</Badge>
            <h1 className="heading-xl mb-6">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-gray-600">
              Choose the plan that best fits your needs. All plans include our
              commitment to quality and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full relative ${
                  plan.popular ? 'border-[#8734E1] border-2 shadow-xl' : ''
                }`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8734E1] text-white">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold gradient-text mb-2">{plan.price}</div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#8734E1]" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">* Optional add-on</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
