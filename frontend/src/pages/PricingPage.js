import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../components/ui';
import { CTASection } from '../components/sections';

const pricingTiers = [
  {
    name: 'Starter', priceRange: '$5,000 - $7,000', description: 'Perfect for small businesses and startups launching their first professional website.', bestFor: 'Small Business',
    features: [
      { feature: 'Custom Design (5-7 pages)', included: true },
      { feature: 'Mobile Responsive', included: true },
      { feature: 'Basic SEO Setup', included: true },
      { feature: 'Contact Form Integration', included: true },
      { feature: '30 Days Post-Launch Support', included: true },
      { feature: 'CMS Integration', included: false },
      { feature: 'AI Features', included: false },
      { feature: 'E-commerce', included: false },
      { feature: 'GEO Optimization', included: false },
    ],
    isPopular: false, ctaText: 'Get Started', color: '#2F73EE',
  },
  {
    name: 'Growth', priceRange: '$10,000 - $15,000', description: 'For growing businesses that need advanced features, CMS capabilities, and better SEO.', bestFor: 'Growing Business',
    features: [
      { feature: 'Custom Design (10-15 pages)', included: true },
      { feature: 'Mobile Responsive', included: true },
      { feature: 'Advanced SEO + Basic GEO', included: true },
      { feature: 'Sanity CMS Integration', included: true },
      { feature: '60 Days Post-Launch Support', included: true },
      { feature: 'Analytics Dashboard', included: true },
      { feature: 'Basic E-commerce (up to 50 products)', included: true },
      { feature: 'Performance Optimization', included: true },
      { feature: 'AI Chatbot Integration', included: false },
    ],
    isPopular: true, ctaText: 'Most Popular', color: '#8734E1',
  },
  {
    name: 'Premium', priceRange: '$18,000 - $30,000', description: 'Full-scale digital solution with custom development, AI integration, and comprehensive GEO.', bestFor: 'Enterprise',
    features: [
      { feature: 'Unlimited Pages', included: true },
      { feature: 'Custom Applications', included: true },
      { feature: 'Full GEO Optimization', included: true },
      { feature: 'AI Chatbot Integration', included: true },
      { feature: '90 Days Post-Launch Support', included: true },
      { feature: 'Advanced E-commerce', included: true },
      { feature: 'Custom Integrations', included: true },
      { feature: 'Priority Support', included: true },
      { feature: 'Quarterly Optimization Reviews', included: true },
    ],
    isPopular: false, ctaText: 'Contact Us', color: '#f59e0b',
  },
];

const retainerPlan = {
  name: 'Enterprise Retainer', priceRange: '$3,000 - $5,000/month', description: 'Ongoing development, support, and optimization for businesses that need continuous improvement.',
  features: ['Dedicated Development Hours (20-40 hrs/month)', 'Priority Support & Bug Fixes', 'Monthly Performance Reports', 'Continuous GEO & SEO Optimization', 'Quarterly Strategy Reviews', 'New Feature Development'],
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">Pricing</Badge>
            <h1 className="heading-xl mb-6">Transparent <span className="gradient-text">Investment</span></h1>
            <p className="text-lg text-gray-600">Choose the package that fits your needs. All packages include our commitment to quality and your success.</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`p-6 relative flex flex-col h-full ${tier.isPopular ? 'border-[#8734E1] shadow-xl lg:-mt-4 lg:mb-4 lg:pt-10' : 'hover:shadow-lg'}`}>
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="accent"><Sparkles className="w-3 h-3" />Recommended</Badge>
                    </div>
                  )}

                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">{tier.bestFor}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <div className="text-3xl font-bold mb-2" style={{ color: tier.color }}>{tier.priceRange}</div>
                      <p className="text-sm text-gray-400">Project-based pricing</p>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">{tier.description}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature.feature} className={`flex items-center gap-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          <Check className={`w-4 h-4 flex-shrink-0 ${feature.included ? 'text-[#10b981]' : 'text-gray-300'}`} />
                          <span className={feature.included ? '' : 'line-through'}>{feature.feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact" className="mt-auto">
                      <Button variant={tier.isPopular ? 'accent' : 'outline'} className="w-full">
                        {tier.ctaText}<ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-[#8734E1]/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Badge variant="primary" className="mb-4">Monthly Retainer</Badge>
                  <h2 className="heading-md mb-2">{retainerPlan.name}</h2>
                  <p className="text-3xl font-bold gradient-text mb-4">{retainerPlan.priceRange}</p>
                  <p className="text-gray-600">{retainerPlan.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {retainerPlan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-[#10b981] flex-shrink-0" />{feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="block mt-6">
                    <Button variant="primary" className="w-full lg:w-auto">Discuss Retainer<ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
