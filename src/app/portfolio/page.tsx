"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack Development',
    description: 'Modern e-commerce solution with headless CMS and AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Sanity', 'Stripe'],
  },
  {
    title: 'SaaS Dashboard',
    category: 'Web Application',
    description: 'Analytics dashboard with real-time data visualization and reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'D3.js'],
  },
  {
    title: 'Healthcare Portal',
    category: 'Enterprise Solution',
    description: 'Patient management system with secure data handling and HIPAA compliance.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    tags: ['Next.js', 'PostgreSQL', 'Auth0'],
  },
  {
    title: 'Real Estate Platform',
    category: 'Marketplace',
    description: 'Property listing platform with virtual tours and AI-powered search.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Maps API', 'AI'],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Portfolio</Badge>
            <h1 className="heading-xl mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-lg text-gray-600">
              Explore our recent projects and see how we&apos;ve helped businesses transform
              their digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                      <button className="p-2 bg-white rounded-full">
                        <ExternalLink className="w-5 h-5 text-[#8734E1]" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#8734E1] font-medium mb-2">{project.category}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-[#f0e6fb] text-[#8734E1]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
