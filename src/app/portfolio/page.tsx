"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const projects = [
  {
    title: 'Social New London',
    category: 'Restaurant & Bar',
    description: 'The Social Bar + Kitchen — New London\'s premier craft beer destination with 50 taps, live events, and modern American cuisine.',
    url: 'https://socialnewlondon.com',
    image: '/portfolio/socialnewlondon.png',
    color: '#8734E1',
  },
  {
    title: 'AppStudio Pro',
    category: 'Technology Platform',
    description: 'Custom application development studio showcasing enterprise software solutions and mobile apps.',
    url: 'https://www.appstudiopro.com',
    image: '/portfolio/appstudiopro.png',
    color: '#2F73EE',
  },
  {
    title: 'Subie Recycler',
    category: 'E-Commerce',
    description: 'Subaru parts recycling marketplace — a digital-first breaker with online inventory and appointment scheduling.',
    url: 'https://subierecycler.com',
    image: '/portfolio/subierecycler.png',
    color: '#10b981',
  },
  {
    title: 'Encore Services',
    category: 'Government AI',
    description: 'AI solutions that serve the mission — purpose-trained custom AI agents for government and defense.',
    url: 'https://encoresvcsllc.com',
    image: '/portfolio/encoresvcs.png',
    color: '#f59e0b',
  },
  {
    title: 'Insurance Wheatridge',
    category: 'Insurance Agency',
    description: 'Local Farmers Insurance agency in Wheat Ridge, Colorado — personalized coverage with a trusted community presence.',
    url: 'https://www.insurancewheatridge.com',
    image: '/portfolio/insurancewheatridge.png',
    color: '#ef4444',
  },
  {
    title: 'Lucid Tech Labs',
    category: 'AI & Enterprise',
    description: 'Patent-pending Adaptive Compound Intelligence platform powering solutions across enterprise, government, and security.',
    url: 'https://lucidtechlabsllc.com',
    image: '/portfolio/lucidtechlabs.png',
    color: '#06b6d4',
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
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
              Real projects. Real results. Hover to scroll through each site.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {/* Text card above screenshot */}
                  <div className="mb-3">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#8734E1] transition-colors flex items-center gap-2">
                      {project.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                  </div>

                  {/* Screenshot container with scroll on hover */}
                  <div
                    className="relative w-full h-[320px] rounded-xl overflow-hidden border-2 transition-all duration-300 group-hover:shadow-xl"
                    style={{
                      borderColor: 'rgba(0,0,0,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      const container = e.currentTarget;
                      container.style.borderColor = project.color;
                    }}
                    onMouseLeave={(e) => {
                      const container = e.currentTarget;
                      container.style.borderColor = 'rgba(0,0,0,0.08)';
                    }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} homepage`}
                      className="absolute top-0 left-0 w-full object-cover object-top transition-all duration-[6s] ease-in-out group-hover:translate-y-[calc(-100%+320px)]"
                      style={{ minHeight: '100%' }}
                      loading="lazy"
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
