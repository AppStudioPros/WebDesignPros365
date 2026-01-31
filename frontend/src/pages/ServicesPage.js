import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, X, Check } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../components/ui';
import { CTASection } from '../components/sections';

const services = [
  { 
    title: 'Generative Engine Optimization (GEO)', 
    shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO strategy.', 
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
    category: 'geo', 
    icon: '/icons/svg/gradient/rocket.svg', 
    isFlagship: true, 
    slug: 'geo', 
    color: '#8734E1' 
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
    category: 'ai', 
    icon: '/icons/svg/gradient/mind.svg', 
    slug: 'ai-integration', 
    color: '#2F73EE' 
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
    category: 'marketing', 
    icon: '/icons/svg/gradient/speed test.svg', 
    slug: 'seo-performance', 
    color: '#f59e0b' 
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
    category: 'development', 
    icon: '/icons/svg/gradient/coding.svg', 
    slug: 'nextjs-development', 
    color: '#BF5DE0' 
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
    category: 'development', 
    icon: '/icons/svg/gradient/database.svg', 
    slug: 'headless-cms', 
    color: '#1A3A6E' 
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
    category: 'marketing', 
    icon: '/icons/svg/gradient/vision.svg', 
    slug: 'digital-marketing', 
    color: '#10b981' 
  },
  { 
    title: 'Social Media & Content Strategy', 
    shortDescription: 'Build your brand presence with strategic content across platforms.', 
    fullDescription: 'Develop a compelling social media presence that engages your audience and builds brand loyalty. We create content strategies, manage campaigns, and help you connect authentically with your community.',
    features: [
      'Social media strategy development',
      'Content calendar creation',
      'Community management',
      'Influencer partnership coordination',
      'Performance analytics & reporting',
    ],
    deliverables: ['Content strategy', 'Brand guidelines', 'Monthly content calendar', 'Performance reports'],
    timeline: '4-6 weeks',
    category: 'marketing', 
    icon: '/icons/svg/gradient/share code.svg', 
    slug: 'social-media', 
    color: '#8734E1' 
  },
  { 
    title: 'E-Commerce Development', 
    shortDescription: 'Shopify, WooCommerce, or custom solutions that convert visitors to customers.', 
    fullDescription: 'Launch or upgrade your online store with conversion-optimized e-commerce solutions. Whether you need Shopify, WooCommerce, or a custom build, we create shopping experiences that drive sales.',
    features: [
      'E-commerce platform setup',
      'Payment gateway integration',
      'Inventory management systems',
      'Checkout optimization',
      'Product page design',
    ],
    deliverables: ['Complete store setup', 'Payment integration', 'Training materials', 'Launch support'],
    timeline: '6-12 weeks',
    category: 'development', 
    icon: '/icons/svg/gradient/client server.svg', 
    slug: 'e-commerce', 
    color: '#f59e0b' 
  },
  { 
    title: 'Web Performance & Infrastructure', 
    shortDescription: 'Edge computing, CDN setup, and infrastructure optimization.', 
    fullDescription: 'Ensure your website delivers lightning-fast experiences globally. We optimize your infrastructure with edge computing, CDN configuration, and advanced caching strategies.',
    features: [
      'CDN setup & optimization',
      'Edge computing implementation',
      'Server infrastructure audit',
      'Caching strategy design',
      'Load balancing configuration',
    ],
    deliverables: ['Infrastructure audit', 'CDN configuration', 'Performance monitoring', 'Documentation'],
    timeline: '2-4 weeks',
    category: 'development', 
    icon: '/icons/svg/gradient/server.svg', 
    slug: 'web-performance', 
    color: '#2F73EE' 
  },
  { 
    title: 'Custom Software Development', 
    shortDescription: 'Bespoke applications tailored to your unique business requirements.', 
    fullDescription: 'Get software built specifically for your business needs. We develop custom applications, internal tools, and integrations that streamline your operations and give you a competitive edge.',
    features: [
      'Requirements analysis',
      'Custom application development',
      'Third-party API integrations',
      'Database design & optimization',
      'Ongoing maintenance & support',
    ],
    deliverables: ['Custom application', 'Source code', 'Technical documentation', 'Training'],
    timeline: '12-24 weeks',
    category: 'development', 
    icon: '/icons/svg/gradient/layer code.svg', 
    slug: 'custom-software', 
    color: '#BF5DE0' 
  },
  { 
    title: 'Brand & UI/UX Design', 
    shortDescription: 'Create memorable brand experiences with stunning visual design.', 
    fullDescription: 'Build a brand identity that resonates with your audience. Our design team creates beautiful, user-centered interfaces and cohesive brand systems that make lasting impressions.',
    features: [
      'Brand identity development',
      'UI/UX design & prototyping',
      'Design system creation',
      'User research & testing',
      'Responsive design',
    ],
    deliverables: ['Brand guidelines', 'UI/UX designs', 'Design system', 'Prototype'],
    timeline: '4-8 weeks',
    category: 'development', 
    icon: '/icons/svg/gradient/eyedropper.svg', 
    slug: 'brand-design', 
    color: '#10b981' 
  },
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'ai', name: 'AI & Automation' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'geo', name: 'GEO' },
];

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
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

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
                <Card 
                  onClick={() => setSelectedService(service)}
                  className={`h-full p-6 group cursor-pointer hover:shadow-lg hover:border-[#8734E1] relative overflow-hidden ${service.isFlagship ? 'border-[#8734E1] bg-[#f0e6fb]' : ''}`}
                >
                  {/* Background Icon - bottom right, large, transparent, cut off */}
                  <img 
                    src={service.icon} 
                    alt="" 
                    className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 pointer-events-none"
                  />
                  <CardContent className="p-0 relative z-10">
                    <div className="flex items-start justify-between mb-4">
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

      {/* Service Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </>
  );
}
