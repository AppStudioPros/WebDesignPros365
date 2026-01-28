import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../ui';

const services = [
  {
    title: 'Generative Engine Optimization',
    shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO.',
    category: 'geo',
    icon: '/icons/svg/gradient/rocket.svg',
    isFlagship: true,
    slug: 'geo',
    color: '#8734E1',
  },
  {
    title: 'AI Integration & Chatbots',
    shortDescription: 'Custom AI solutions, chatbots, and automation to enhance user experience.',
    category: 'ai',
    icon: '/icons/svg/gradient/mind.svg',
    isFlagship: false,
    slug: 'ai-integration',
    color: '#2F73EE',
  },
  {
    title: 'SEO & Performance Optimization',
    shortDescription: 'Boost rankings and speed. Core Web Vitals optimization included.',
    category: 'marketing',
    icon: '/icons/svg/gradient/speed test.svg',
    isFlagship: false,
    slug: 'seo-performance',
    color: '#f59e0b',
  },
  {
    title: 'Next.js Full-Stack Development',
    shortDescription: 'Modern web applications with React, TypeScript, and server-side rendering.',
    category: 'development',
    icon: '/icons/svg/gradient/coding.svg',
    isFlagship: false,
    slug: 'nextjs-development',
    color: '#BF5DE0',
  },
  {
    title: 'Headless CMS & Content Strategy',
    shortDescription: 'Sanity, Contentful, or Strapi setup with structured content workflows.',
    category: 'development',
    icon: '/icons/svg/gradient/database.svg',
    isFlagship: false,
    slug: 'headless-cms',
    color: '#1A3A6E',
  },
  {
    title: 'Digital Marketing & Analytics',
    shortDescription: 'Data-driven campaigns, GA4 setup, and conversion optimization.',
    category: 'marketing',
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

export default function ServicesSection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Dark section overlay */}
      <div className="absolute inset-0 bg-[#f8f9fc]/90" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

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
              <Link to={`/services#${service.slug}`}>
                <Card className={`h-full p-6 group cursor-pointer bg-white border-gray-200 hover:border-[#8734E1]/30 hover:shadow-lg transition-all relative overflow-hidden ${
                  service.isFlagship ? 'border-[#8734E1] bg-[#f0e6fb]' : ''
                }`}>
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
              </Link>
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
    </section>
  );
}
