import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { CTASection } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for web design and development services. Find the package that fits your needs.',
}

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
      { feature: 'Contact Form Integration', included: true },
      { feature: '30 Days Post-Launch Support', included: true },
      { feature: 'CMS Integration', included: false },
      { feature: 'AI Features', included: false },
      { feature: 'E-commerce', included: false },
      { feature: 'GEO Optimization', included: false },
    ],
    isPopular: false,
    ctaText: 'Get Started',
    slug: 'starter',
  },
  {
    name: 'Growth',
    priceRange: '$10,000 - $15,000',
    description: 'For growing businesses that need advanced features, CMS capabilities, and better SEO.',
    bestFor: 'Growing Business',
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
    isPopular: true,
    ctaText: 'Most Popular',
    slug: 'growth',
  },
  {
    name: 'Premium',
    priceRange: '$18,000 - $30,000',
    description: 'Full-scale digital solution with custom development, AI integration, and comprehensive GEO.',
    bestFor: 'Enterprise',
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
    isPopular: false,
    ctaText: 'Contact Us',
    slug: 'premium',
  },
]

const retainerPlan = {
  name: 'Enterprise Retainer',
  priceRange: '$3,000 - $5,000/month',
  description: 'Ongoing development, support, and optimization for businesses that need continuous improvement.',
  features: [
    'Dedicated Development Hours (20-40 hrs/month)',
    'Priority Support & Bug Fixes',
    'Monthly Performance Reports',
    'Continuous GEO & SEO Optimization',
    'Quarterly Strategy Reviews',
    'New Feature Development',
  ],
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">
              Pricing
            </Badge>
            <h1 className="heading-xl mb-6">
              Transparent <span className="gradient-text">Investment</span>
            </h1>
            <p className="text-lg text-white/60">
              Choose the package that fits your needs. All packages include our commitment
              to quality and your success.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`p-6 relative flex flex-col ${
                  tier.isPopular
                    ? 'border-accent/50 bg-accent/5 glow-accent lg:-mt-4 lg:mb-4 lg:pt-10'
                    : 'hover:bg-white/10'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardContent className="p-0 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-sm text-white/60 mb-1">{tier.bestFor}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {tier.priceRange}
                    </div>
                    <p className="text-sm text-white/40">Project-based pricing</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.feature}
                        className={`flex items-center gap-3 text-sm ${
                          feature.included ? 'text-white/80' : 'text-white/30'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 flex-shrink-0 ${
                            feature.included ? 'text-success' : 'text-white/20'
                          }`}
                        />
                        <span className={feature.included ? '' : 'line-through'}>
                          {feature.feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href="/contact" className="mt-auto">
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
            ))}
          </div>
        </div>
      </section>

      {/* Retainer Plan */}
      <section className="section bg-dark-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-primary/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Badge variant="primary" className="mb-4">
                    Monthly Retainer
                  </Badge>
                  <h2 className="heading-md mb-2">{retainerPlan.name}</h2>
                  <p className="text-3xl font-bold gradient-text mb-4">
                    {retainerPlan.priceRange}
                  </p>
                  <p className="text-white/60">{retainerPlan.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {retainerPlan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block mt-6">
                    <Button variant="primary" className="w-full lg:w-auto">
                      Discuss Retainer
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="accent" className="mb-4">
                Questions?
              </Badge>
              <h2 className="heading-lg">Pricing FAQ</h2>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-white mb-2">What's included in all packages?</h3>
                <p className="text-white/60 text-sm">
                  All packages include custom design (no templates), mobile responsiveness,
                  basic SEO setup, cross-browser testing, and post-launch support.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-white mb-2">What's the payment structure?</h3>
                <p className="text-white/60 text-sm">
                  We typically work with 50% deposit to begin, 25% at design approval, and 25% at launch.
                  For larger projects, we can arrange milestone-based payments.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-white mb-2">How long does a project take?</h3>
                <p className="text-white/60 text-sm">
                  Starter: 4-6 weeks, Growth: 8-12 weeks, Premium: 12-20 weeks.
                  Exact timelines depend on project complexity and feedback cycles.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-white mb-2">Do you offer custom quotes?</h3>
                <p className="text-white/60 text-sm">
                  Absolutely! Every project is unique. Contact us for a custom quote tailored
                  to your specific requirements and goals.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
