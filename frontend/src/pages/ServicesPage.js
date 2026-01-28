import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../components/ui';
import { CTASection } from '../components/sections';

const services = [
  { title: 'Generative Engine Optimization (GEO)', shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO strategy.', category: 'geo', icon: '/icons/gradient/rocket.png', isFlagship: true, slug: 'geo', color: '#8734E1' },
  { title: 'AI Integration & Chatbots', shortDescription: 'Custom AI solutions, chatbots, and automation to enhance user experience.', category: 'ai', icon: '/icons/gradient/mind.png', slug: 'ai-integration', color: '#2F73EE' },
  { title: 'SEO & Performance Optimization', shortDescription: 'Boost rankings and speed. Core Web Vitals optimization included.', category: 'marketing', icon: '/icons/gradient/speed test.png', slug: 'seo-performance', color: '#f59e0b' },
  { title: 'Next.js Full-Stack Development', shortDescription: 'Modern web applications with React, TypeScript, and server-side rendering.', category: 'development', icon: '/icons/gradient/coding.png', slug: 'nextjs-development', color: '#BF5DE0' },
  { title: 'Headless CMS & Content Strategy', shortDescription: 'Sanity, Contentful, or Strapi setup with structured content workflows.', category: 'development', icon: '/icons/gradient/database.png', slug: 'headless-cms', color: '#1A3A6E' },
  { title: 'Digital Marketing & Analytics', shortDescription: 'Data-driven campaigns, GA4 setup, and conversion optimization.', category: 'marketing', icon: '/icons/gradient/vision.png', slug: 'digital-marketing', color: '#10b981' },
  { title: 'Social Media & Content Strategy', shortDescription: 'Build your brand presence with strategic content across platforms.', category: 'marketing', icon: '/icons/gradient/share code.png', slug: 'social-media', color: '#8734E1' },
  { title: 'E-Commerce Development', shortDescription: 'Shopify, WooCommerce, or custom solutions that convert visitors to customers.', category: 'development', icon: '/icons/gradient/client server.png', slug: 'e-commerce', color: '#f59e0b' },
  { title: 'Web Performance & Infrastructure', shortDescription: 'Edge computing, CDN setup, and infrastructure optimization.', category: 'development', icon: '/icons/gradient/server.png', slug: 'web-performance', color: '#2F73EE' },
  { title: 'Custom Software Development', shortDescription: 'Bespoke applications tailored to your unique business requirements.', category: 'development', icon: '/icons/gradient/layer code.png', slug: 'custom-software', color: '#BF5DE0' },
  { title: 'Brand & UI/UX Design', shortDescription: 'Create memorable brand experiences with stunning visual design.', category: 'development', icon: '/icons/gradient/eyedropper.png', slug: 'brand-design', color: '#10b981' },
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
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
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
            <p className="text-lg text-gray-600">
              From cutting-edge AI integration to performance optimization,
              we deliver everything you need to succeed online.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-[#8734E1] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
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
                <Card className={`h-full p-6 group cursor-pointer hover:shadow-lg hover:border-[#8734E1]/30 ${service.isFlagship ? 'border-[#8734E1]/40 bg-[#8734E1]/5' : ''}`}>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}15` }}
                      >
                        <img src={service.icon} alt={service.title} className="w-7 h-7" />
                      </div>
                      {service.isFlagship && <Badge variant="accent" dot>Flagship</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8734E1] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{service.shortDescription}</p>
                    <div className="flex items-center text-sm text-[#8734E1] group-hover:gap-2 transition-all">
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
