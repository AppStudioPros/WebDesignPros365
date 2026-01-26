'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Brain, Gauge, Code, Database, TrendingUp, Share2, ShoppingCart, Server, Layers, Palette, Filter } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { CTASection } from '@/components/sections'

// Services data
const services = [
  {
    title: 'Generative Engine Optimization (GEO)',
    shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO strategy.',
    description: 'As AI-powered search evolves, traditional SEO isn\'t enough. Our GEO service ensures your content is discoverable by ChatGPT, Claude, Perplexity, and other AI systems.',
    category: 'geo',
    icon: Sparkles,
    isFlagship: true,
    slug: 'geo',
    features: [
      { name: 'LLMs.txt Implementation', description: 'Create machine-readable content guides' },
      { name: 'Semantic Markup', description: 'Structure data for AI understanding' },
      { name: 'Content Optimization', description: 'Write content that AI systems cite' },
      { name: 'Citation Building', description: 'Build authority for AI recommendations' },
    ],
  },
  {
    title: 'AI Integration & Chatbots',
    shortDescription: 'Custom AI solutions, chatbots, and automation to enhance user experience.',
    description: 'Leverage the power of AI with custom chatbots, automated workflows, and intelligent features that delight users.',
    category: 'ai',
    icon: Brain,
    isFlagship: false,
    slug: 'ai-integration',
    features: [
      { name: 'Custom Chatbots', description: 'AI-powered customer support' },
      { name: 'OpenAI Integration', description: 'GPT-4 and embeddings' },
      { name: 'Automation Workflows', description: 'Streamline operations' },
      { name: 'Content Generation', description: 'AI-assisted content creation' },
    ],
  },
  {
    title: 'SEO & Performance Optimization',
    shortDescription: 'Boost rankings and speed. Core Web Vitals optimization included.',
    description: 'Comprehensive SEO and performance optimization to ensure your site ranks well and loads fast.',
    category: 'marketing',
    icon: Gauge,
    isFlagship: false,
    slug: 'seo-performance',
    features: [
      { name: 'Technical SEO Audit', description: 'Complete site analysis' },
      { name: 'Core Web Vitals', description: 'LCP, FID, CLS optimization' },
      { name: 'Schema Markup', description: 'Rich snippets and structured data' },
      { name: 'Speed Optimization', description: 'Sub-2.5s load times' },
    ],
  },
  {
    title: 'Next.js Full-Stack Development',
    shortDescription: 'Modern web applications with React, TypeScript, and server-side rendering.',
    description: 'Build scalable, performant web applications using the latest Next.js features including App Router and Server Components.',
    category: 'development',
    icon: Code,
    isFlagship: false,
    slug: 'nextjs-development',
    features: [
      { name: 'App Router Architecture', description: 'Next.js 15 patterns' },
      { name: 'Server Components', description: 'Optimal rendering' },
      { name: 'TypeScript', description: 'Type-safe development' },
      { name: 'API Routes', description: 'Full-stack capabilities' },
    ],
  },
  {
    title: 'Headless CMS & Content Strategy',
    shortDescription: 'Sanity, Contentful, or Strapi setup with structured content workflows.',
    description: 'Implement a headless CMS that empowers your team to manage content efficiently with modern workflows.',
    category: 'development',
    icon: Database,
    isFlagship: false,
    slug: 'headless-cms',
    features: [
      { name: 'Sanity.io Setup', description: 'Our preferred CMS' },
      { name: 'Content Modeling', description: 'Structured schemas' },
      { name: 'Editorial Workflows', description: 'Review and publish' },
      { name: 'Real-time Preview', description: 'Live content editing' },
    ],
  },
  {
    title: 'Digital Marketing & Analytics',
    shortDescription: 'Data-driven campaigns, GA4 setup, and conversion optimization.',
    description: 'Comprehensive digital marketing services with a focus on measurable results and continuous optimization.',
    category: 'marketing',
    icon: TrendingUp,
    isFlagship: false,
    slug: 'digital-marketing',
    features: [
      { name: 'GA4 Implementation', description: 'Advanced analytics setup' },
      { name: 'Conversion Tracking', description: 'Measure what matters' },
      { name: 'A/B Testing', description: 'Data-driven decisions' },
      { name: 'Campaign Management', description: 'Paid media optimization' },
    ],
  },
  {
    title: 'Social Media & Content Strategy',
    shortDescription: 'Build your brand presence with strategic content across platforms.',
    description: 'Develop a cohesive social media strategy that builds brand awareness and engages your audience.',
    category: 'marketing',
    icon: Share2,
    isFlagship: false,
    slug: 'social-media',
    features: [
      { name: 'Content Calendar', description: 'Strategic planning' },
      { name: 'Platform Optimization', description: 'Tailored content' },
      { name: 'Community Management', description: 'Engage your audience' },
      { name: 'Analytics & Reporting', description: 'Track performance' },
    ],
  },
  {
    title: 'E-Commerce Development',
    shortDescription: 'Shopify, WooCommerce, or custom solutions that convert visitors to customers.',
    description: 'Build high-converting e-commerce experiences with modern platforms and custom solutions.',
    category: 'development',
    icon: ShoppingCart,
    isFlagship: false,
    slug: 'e-commerce',
    features: [
      { name: 'Shopify Development', description: 'Storefront & apps' },
      { name: 'Custom Checkout', description: 'Optimized conversion' },
      { name: 'Payment Integration', description: 'Stripe, PayPal, etc.' },
      { name: 'Inventory Management', description: 'Automated systems' },
    ],
  },
  {
    title: 'Web Performance & Infrastructure',
    shortDescription: 'Edge computing, CDN setup, and infrastructure optimization.',
    description: 'Optimize your web infrastructure for global performance with edge computing and CDN solutions.',
    category: 'development',
    icon: Server,
    isFlagship: false,
    slug: 'web-performance',
    features: [
      { name: 'Vercel Deployment', description: 'Edge network' },
      { name: 'CDN Configuration', description: 'Global distribution' },
      { name: 'Caching Strategies', description: 'Optimal performance' },
      { name: 'Monitoring & Alerts', description: 'Proactive management' },
    ],
  },
  {
    title: 'Custom Software Development',
    shortDescription: 'Bespoke applications tailored to your unique business requirements.',
    description: 'Build custom software solutions that solve your specific business challenges.',
    category: 'development',
    icon: Layers,
    isFlagship: false,
    slug: 'custom-software',
    features: [
      { name: 'Requirements Analysis', description: 'Understand your needs' },
      { name: 'Architecture Design', description: 'Scalable solutions' },
      { name: 'Full-Stack Development', description: 'End-to-end delivery' },
      { name: 'Ongoing Support', description: 'Maintenance & updates' },
    ],
  },
  {
    title: 'Brand & UI/UX Design',
    shortDescription: 'Create memorable brand experiences with stunning visual design.',
    description: 'Craft beautiful, user-centered designs that tell your brand story and convert visitors.',
    category: 'development',
    icon: Palette,
    isFlagship: false,
    slug: 'brand-design',
    features: [
      { name: 'Brand Strategy', description: 'Define your identity' },
      { name: 'UI Design', description: 'Beautiful interfaces' },
      { name: 'UX Research', description: 'User-centered approach' },
      { name: 'Design Systems', description: 'Consistent components' },
    ],
  },
]

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'ai', name: 'AI & Automation' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'geo', name: 'GEO' },
]

export default function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="accent" className="mb-4">
              Our Services
            </Badge>
            <h1 className="heading-xl mb-6">
              Comprehensive <span className="gradient-text">Digital Solutions</span>
            </h1>
            <p className="text-lg text-white/60">
              From cutting-edge AI integration to performance optimization,
              we deliver everything you need to succeed online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 sticky top-16 z-30 bg-dark/80 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-white/40 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-accent text-dark'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`h-full p-6 group cursor-pointer hover:bg-white/10 hover:border-white/20 ${
                  service.isFlagship ? 'border-accent/30 bg-accent/5' : ''
                }`}>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        service.isFlagship
                          ? 'bg-accent/20 text-accent'
                          : 'bg-primary/20 text-primary-light'
                      }`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      {service.isFlagship && (
                        <Badge variant="accent" dot>
                          Flagship
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      {service.shortDescription}
                    </p>
                    
                    {/* Features Preview */}
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature) => (
                        <div key={feature.name} className="flex items-center gap-2 text-xs text-white/40">
                          <span className="w-1 h-1 rounded-full bg-accent" />
                          {feature.name}
                        </div>
                      ))}
                    </div>

                    <Link href={`/services/${service.slug}`} className="flex items-center text-sm text-accent group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
