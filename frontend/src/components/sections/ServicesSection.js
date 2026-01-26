import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Gauge, Code, Database, TrendingUp } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../ui';

const services = [
  {
    title: 'Generative Engine Optimization',
    shortDescription: 'Optimize your site for AI search engines and LLMs. Future-proof your SEO.',
    category: 'geo',
    icon: Sparkles,
    isFlagship: true,
    slug: 'geo',
    color: '#8734E1',
  },
  {
    title: 'AI Integration & Chatbots',
    shortDescription: 'Custom AI solutions, chatbots, and automation to enhance user experience.',
    category: 'ai',
    icon: Brain,
    isFlagship: false,
    slug: 'ai-integration',
    color: '#2F73EE',
  },
  {
    title: 'SEO & Performance Optimization',
    shortDescription: 'Boost rankings and speed. Core Web Vitals optimization included.',
    category: 'marketing',
    icon: Gauge,
    isFlagship: false,
    slug: 'seo-performance',
    color: '#FFD700',
  },
  {
    title: 'Next.js Full-Stack Development',
    shortDescription: 'Modern web applications with React, TypeScript, and server-side rendering.',
    category: 'development',
    icon: Code,
    isFlagship: false,
    slug: 'nextjs-development',
    color: '#BF5DE0',
  },
  {
    title: 'Headless CMS & Content Strategy',
    shortDescription: 'Sanity, Contentful, or Strapi setup with structured content workflows.',
    category: 'development',
    icon: Database,
    isFlagship: false,
    slug: 'headless-cms',
    color: '#1A3A6E',
  },
  {
    title: 'Digital Marketing & Analytics',
    shortDescription: 'Data-driven campaigns, GA4 setup, and conversion optimization.',
    category: 'marketing',
    icon: TrendingUp,
    isFlagship: false,
    slug: 'digital-marketing',
    color: '#00ff88',
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
      {/* Transparent background to show video */}
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
          <p className="text-white/60 max-w-2xl mx-auto">
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
                <Card className={`h-full p-6 group cursor-pointer hover:bg-[#2F73EE]/10 hover:border-[#2F73EE]/30 transition-all ${
                  service.isFlagship ? 'border-[#8734E1]/40 bg-[#8734E1]/10' : ''
                }`}>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <service.icon className="w-6 h-6" style={{ color: service.color }} />
                      </div>
                      {service.isFlagship && (
                        <Badge variant="accent" dot>Flagship</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#2F73EE] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-sm text-[#2F73EE] group-hover:gap-2 transition-all">
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
