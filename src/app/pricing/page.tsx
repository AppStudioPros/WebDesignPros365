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
      'Patented ACI architecture (no commodity LLM wrappers)',
      'AI grounded in your data with no hallucination or drift',
      'Compliance-grade audit trail on every AI decision',
      'AI bound to your published methodology and brand voice',
      'White-glove engagement, dedicated team',
      'Quarterly business reviews + roadmap',
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
              Five tiers. <span className="gradient-text">One quote in 48 hours.</span>
            </h1>
            <p className="text-lg text-gray-600">
              Pick the closest fit and we'll map your project to it on the discovery call. Every
              engagement is fixed-price with milestone billing. No mystery hourly bleed, no scope
              drift mid-build.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full relative flex flex-col ${
                  plan.popular ? 'border-[#8734E1] border-2 shadow-2xl bg-gradient-to-b from-white to-[#f0e6fb]/40' :
                  plan.name === 'ACI-Powered' ? 'border-[#2F73EE] border-2 shadow-xl bg-gradient-to-b from-white to-[#e6f0fb]/50' :
                  'hover:shadow-lg transition-shadow'
                }`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8734E1] text-white shadow-md">
                      Most Popular
                    </Badge>
                  )}
                  {plan.name === 'ACI-Powered' && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white shadow-md">
                      Flagship
                    </Badge>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold gradient-text mb-2">{plan.price}</div>
                    <p className="text-sm text-gray-600 min-h-[40px]">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#8734E1]" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-auto">
                    <Button className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white shadow-md'
                        : plan.name === 'ACI-Powered'
                        ? 'bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white shadow-md'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      Start a Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">* Optional add-on</p>

          {/* Trust block: how engagements work */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-[#f8f9fc] border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">How an engagement actually works</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#f0e6fb] text-[#8734E1] flex items-center justify-center font-semibold mb-3">1</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Free Discovery Call</h4>
                  <p className="text-sm text-gray-600">30-minute call to scope your goals, audience, and timeline. No commitment.</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#f0e6fb] text-[#8734E1] flex items-center justify-center font-semibold mb-3">2</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fixed-Price Quote</h4>
                  <p className="text-sm text-gray-600">Within 48 hours, you get a fixed-price proposal mapped to one of the tiers above. No surprises.</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#f0e6fb] text-[#8734E1] flex items-center justify-center font-semibold mb-3">3</div>
                  <h4 className="font-semibold text-gray-900 mb-2">50% Kickoff Deposit</h4>
                  <p className="text-sm text-gray-600">Standard payment terms: 50% to begin, 25% at design approval, 25% at launch. Milestone-based available on larger engagements.</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#f0e6fb] text-[#8734E1] flex items-center justify-center font-semibold mb-3">4</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Weekly Updates Until Launch</h4>
                  <p className="text-sm text-gray-600">You'll always know where your project stands. Slack/email check-ins, demo links, and a Notion progress board.</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-6">All prices in USD. Retainer packages from $5,000/month. Add-ons (additional locales, accessibility remediation, custom integrations) priced separately. Tax not included.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
