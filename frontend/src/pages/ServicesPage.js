import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Gauge, Code, Database, TrendingUp, Share2, ShoppingCart, Server, Layers, Palette, Filter } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../components/ui';
import { CTASection } from '../components/sections';

const services = [
  { title: 'Generative Engine Optimization (GEO)', shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO strategy.', category: 'geo', icon: Sparkles, isFlagship: true, slug: 'geo' },
  { title: 'AI Integration & Chatbots', shortDescription: 'Custom AI solutions, chatbots, and automation to enhance user experience.', category: 'ai', icon: Brain, slug: 'ai-integration' },
  { title: 'SEO & Performance Optimization', shortDescription: 'Boost rankings and speed. Core Web Vitals optimization included.', category: 'marketing', icon: Gauge, slug: 'seo-performance' },
  { title: 'Next.js Full-Stack Development', shortDescription: 'Modern web applications with React, TypeScript, and server-side rendering.', category: 'development', icon: Code, slug: 'nextjs-development' },
  { title: 'Headless CMS & Content Strategy', shortDescription: 'Sanity, Contentful, or Strapi setup with structured content workflows.', category: 'development', icon: Database, slug: 'headless-cms' },
  { title: 'Digital Marketing & Analytics', shortDescription: 'Data-driven campaigns, GA4 setup, and conversion optimization.', category: 'marketing', icon: TrendingUp, slug: 'digital-marketing' },
  { title: 'Social Media & Content Strategy', shortDescription: 'Build your brand presence with strategic content across platforms.', category: 'marketing', icon: Share2, slug: 'social-media' },
  { title: 'E-Commerce Development', shortDescription: 'Shopify, WooCommerce, or custom solutions that convert visitors to customers.', category: 'development', icon: ShoppingCart, slug: 'e-commerce' },
  { title: 'Web Performance & Infrastructure', shortDescription: 'Edge computing, CDN setup, and infrastructure optimization.', category: 'development', icon: Server, slug: 'web-performance' },
  { title: 'Custom Software Development', shortDescription: 'Bespoke applications tailored to your unique business requirements.', category: 'development', icon: Layers, slug: 'custom-software' },
  { title: 'Brand & UI/UX Design', shortDescription: 'Create memorable brand experiences with stunning visual design.', category: 'development', icon: Palette, slug: 'brand-design' },
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'ai', name: 'AI & Automation' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'geo', name: 'GEO' },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="accent" className="mb-4">Our Services</Badge>
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

      <section className="py-8 sticky top-16 z-30 bg-[#0f1419]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-white/40 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-[#00d9ff] text-[#0f1419]'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  service.isFlagship ? 'border-[#00d9ff]/30 bg-[#00d9ff]/5' : ''
                }`}>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        service.isFlagship ? 'bg-[#00d9ff]/20 text-[#00d9ff]' : 'bg-[#0066cc]/20 text-[#3388dd]'
                      }`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      {service.isFlagship && <Badge variant="accent" dot>Flagship</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d9ff] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">{service.shortDescription}</p>
                    <div className="flex items-center text-sm text-[#00d9ff] group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
