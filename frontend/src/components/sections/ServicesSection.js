import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Check } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../ui';

const services = [
  {
    title: 'Generative Engine Optimization',
    shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO.',
    fullDescription: 'GEO is our flagship service that prepares your website for the AI-powered future of search. As more users rely on ChatGPT, Claude, and Google AI for answers, your content needs to be optimized not just for traditional search engines, but for AI comprehension and citation.',
    features: [
      'AI-friendly content structuring',
      'Schema markup for LLM understanding',
      'Citation optimization for AI responses',
      'Voice search readiness',
      'Semantic content enhancement',
    ],
    deliverables: ['GEO audit report', 'Implementation roadmap', 'Content optimization', 'Ongoing monitoring'],
    timeline: '4-6 weeks',
    icon: '/icons/svg/gradient/rocket.svg',
    isFlagship: true,
    slug: 'geo',
    color: '#8734E1',
  },
  {
    title: 'AI Integration & Chatbots',
    shortDescription: 'Custom AI solutions, chatbots, and automation to enhance user experience.',
    fullDescription: 'Transform your customer experience with intelligent AI solutions. We build custom chatbots, integrate AI assistants, and automate workflows to help your business scale efficiently while providing 24/7 support to your customers.',
    features: [
      'Custom GPT-powered chatbots',
      'Intelligent customer support automation',
      'AI content generation tools',
      'Workflow automation with AI',
      'Natural language processing integration',
    ],
    deliverables: ['Custom AI chatbot', 'Training documentation', 'Integration support', 'Analytics dashboard'],
    timeline: '6-8 weeks',
    icon: '/icons/svg/gradient/mind.svg',
    isFlagship: false,
    slug: 'ai-integration',
    color: '#2F73EE',
  },
  {
    title: 'SEO & Performance Optimization',
    shortDescription: 'Boost rankings and speed. Core Web Vitals optimization included.',
    fullDescription: 'Achieve top search rankings and lightning-fast load times. We optimize every aspect of your website\'s performance, from Core Web Vitals to technical SEO, ensuring you rank higher and convert more visitors.',
    features: [
      'Core Web Vitals optimization',
      'Technical SEO audit & fixes',
      'Page speed optimization',
      'Mobile performance tuning',
      'Structured data implementation',
    ],
    deliverables: ['Performance audit', 'SEO roadmap', 'Monthly ranking reports', 'Speed optimization'],
    timeline: '4-8 weeks',
    icon: '/icons/svg/gradient/speed test.svg',
    isFlagship: false,
    slug: 'seo-performance',
    color: '#f59e0b',
  },
  {
    title: 'Next.js Full-Stack Development',
    shortDescription: 'Modern web applications with React, TypeScript, and server-side rendering.',
    fullDescription: 'Build powerful, scalable web applications using the latest Next.js framework. We leverage React, TypeScript, and modern tooling to create fast, SEO-friendly applications that provide exceptional user experiences.',
    features: [
      'Server-side rendering (SSR)',
      'Static site generation (SSG)',
      'API route development',
      'TypeScript implementation',
      'Vercel deployment optimization',
    ],
    deliverables: ['Custom web application', 'Source code', 'Documentation', 'Deployment setup'],
    timeline: '8-16 weeks',
    icon: '/icons/svg/gradient/coding.svg',
    isFlagship: false,
    slug: 'nextjs-development',
    color: '#BF5DE0',
  },
  {
    title: 'Headless CMS & Content Strategy',
    shortDescription: 'Sanity, Contentful, or Strapi setup with structured content workflows.',
    fullDescription: 'Empower your team with flexible content management. We set up and customize headless CMS solutions that give you complete control over your content while enabling developers to build cutting-edge frontends.',
    features: [
      'Sanity.io / Contentful / Strapi setup',
      'Custom content schemas',
      'Editorial workflow design',
      'Content migration assistance',
      'API integration',
    ],
    deliverables: ['CMS configuration', 'Content models', 'User training', 'Migration support'],
    timeline: '3-6 weeks',
    icon: '/icons/svg/gradient/database.svg',
    isFlagship: false,
    slug: 'headless-cms',
    color: '#1A3A6E',
  },
  {
    title: 'Digital Marketing & Analytics',
    shortDescription: 'Data-driven campaigns, GA4 setup, and conversion optimization.',
    fullDescription: 'Make informed decisions with comprehensive analytics and strategic marketing. We set up tracking, analyze user behavior, and implement data-driven strategies to maximize your ROI and grow your business.',
    features: [
      'Google Analytics 4 setup',
      'Conversion tracking',
      'A/B testing implementation',
      'Marketing automation',
      'ROI analysis & reporting',
    ],
    deliverables: ['Analytics setup', 'Custom dashboards', 'Monthly reports', 'Optimization recommendations'],
    timeline: '2-4 weeks',
    icon: '/icons/svg/gradient/vision.svg',
    isFlagship: false,
    slug: 'digital-marketing',
    color: '#10b981',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Service Modal Component
function ServiceModal({ service, isOpen, onClose }) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto pointer-events-auto"
            >
              {/* Header with gradient */}
              <div 
                className="relative p-6 pb-8"
                style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)` }}
              >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-start gap-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <img src={service.icon} alt="" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  {service.isFlagship && (
                    <Badge variant="accent" dot className="mb-2">Flagship Service</Badge>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Typical timeline: {service.timeline}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</h4>
                <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">What's Included</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <Check className="w-3 h-3" style={{ color: service.color }} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${service.color}10`, color: service.color }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-100">
                <Link to="/contact" onClick={onClose}>
                  <Button variant="accent" size="lg" className="w-full">
                    Get Started with {service.title.split(' ')[0]}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="section relative overflow-hidden">
      {/* Semi-transparent overlay - video visible underneath */}
      <div className="absolute inset-0 bg-[#f8f9fc]/70" />
      {/* Grid pattern on top */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="accent" className="mb-4">Our Services</Badge>
          <h2 className="heading-lg mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From cutting-edge AI integration to performance optimization,
            we deliver comprehensive digital solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={itemVariants}>
              <Card 
                onClick={() => setSelectedService(service)}
                className={`h-full p-6 group cursor-pointer bg-white border-gray-200 hover:border-[#8734E1]/30 hover:shadow-lg transition-all relative overflow-hidden ${
                  service.isFlagship ? 'border-[#8734E1] bg-[#f0e6fb]' : ''
                }`}
              >
                {/* Background Icon - bottom right, large, transparent, cut off */}
                <img 
                  src={service.icon} 
                  alt="" 
                  className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 pointer-events-none"
                />
                <CardContent className="p-0 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    {service.isFlagship && (
                      <Badge variant="accent" dot>Flagship</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8734E1] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center text-sm text-[#8734E1] group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="outline" size="lg">
              View All 11 Services
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
}
