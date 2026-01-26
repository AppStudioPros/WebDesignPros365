'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Card, CardContent, Button, Badge } from '@/components/ui'

// Pricing data (would come from Sanity in production)
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
    slug: 'starter',
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
    slug: 'growth',
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
    slug: 'premium',
  },
]

export default function PricingSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="accent" className="mb-4">
            Pricing
          </Badge>
          <h2 className="heading-lg mb-4">
            Transparent <span className="gradient-text">Investment</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Choose the package that fits your needs. All packages include our commitment to quality.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full p-6 relative ${
                tier.isPopular
                  ? 'border-accent/50 bg-accent/5 glow-accent'
                  : 'hover:bg-white/10'
              }`}>
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardContent className="p-0">
                  {/* Tier Name */}
                  <div className="mb-4">
                    <p className="text-sm text-white/60 mb-1">{tier.bestFor}</p>
                    <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold gradient-text">{tier.priceRange}</span>
                    <p className="text-sm text-white/40 mt-1">Project-based pricing</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.feature}
                        className={`flex items-center gap-3 text-sm ${
                          feature.included ? 'text-white/80' : 'text-white/40'
                        }`}
                      >
                        <Check className={`w-4 h-4 flex-shrink-0 ${
                          feature.included ? 'text-success' : 'text-white/20'
                        }`} />
                        {feature.feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href="/contact">
                    <Button
                      variant={tier.isPopular ? 'accent' : 'outline'}
                      className="w-full"
                    >
                      {tier.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Need a Retainer?</h3>
          <p className="text-white/60 mb-4">
            Enterprise retainer packages starting at $3,000 - $5,000/month for ongoing development and support.
          </p>
          <Link href="/contact">
            <Button variant="primary">
              Discuss Your Needs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
