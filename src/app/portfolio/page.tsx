"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const projects = [
  // —— NEWEST BUILDS ——
  {
    title: 'MarqetCore',
    category: 'AI Real Estate',
    description: 'Find listings before they exist. AI that ranks each morning\'s top 7 prospects per agent using 200+ behavioral and property signals.',
    url: 'https://marqetcore.com',
    image: '/portfolio/marqetcore.png',
    color: '#8734E1',
  },
  {
    title: 'PhylaxOne',
    category: 'AI-Native Security',
    description: 'Preemptive security platform. Detects, predicts, and neutralizes threats before they execute, built on the patented ACI architecture.',
    url: 'https://www.phylaxone.com',
    image: '/portfolio/phylaxone.png',
    color: '#ef4444',
  },
  {
    title: 'FORGE / YourWorkforce',
    category: 'GovCon AI Platform',
    description: 'The AI platform built for government contractors. SAM.gov integration, CMMC-aligned, FedRAMP architecture. SDVOSB compliant.',
    url: 'https://www.yourworkforce.ai',
    image: '/portfolio/yourworkforce.png',
    color: '#2F73EE',
  },
  {
    title: 'AcuSightPro',
    category: 'Federal Procurement',
    description: 'Federal contracting intelligence engine by Encore Services LLC. SAM.gov opportunity surveillance with AI-driven bid/no-bid scoring.',
    url: 'https://www.acusightpro.com',
    image: '/portfolio/acusightpro.png',
    color: '#f59e0b',
  },
  {
    title: 'MotherLode CMI',
    category: 'Critical Minerals',
    description: 'Per-site critical-minerals intelligence across mining-active U.S. Reduces per-site analysis from 6-8 months to hours.',
    url: 'https://www.motherlodecmi.com',
    image: '/portfolio/motherlodecmi.png',
    color: '#0891b2',
  },
  {
    title: 'Aether ACI',
    category: 'Family + Business OS',
    description: 'The Company Operating System. Same patented ACI intelligence that runs your company also keeps your family connected and protected.',
    url: 'https://www.aetheraci.com',
    image: '/portfolio/aetheraci.png',
    color: '#6366F1',
  },
  {
    title: 'Adaptive Compound Intelligence',
    category: 'AI Architecture',
    description: 'The patent-pending architecture behind every build. The framework that turns individual interactions into compound organizational intelligence.',
    url: 'https://www.adaptivecompoundintelligence.com',
    image: '/portfolio/adaptivecompoundintelligence.png',
    color: '#BF5DE0',
  },
  // —— EARLIER WORK ——
  {
    title: 'Lucid Tech Labs',
    category: 'AI & Enterprise',
    description: 'Patent-pending Adaptive Compound Intelligence platform powering solutions across enterprise, government, and security.',
    url: 'https://lucidtechlabsllc.com',
    image: '/portfolio/lucidtechlabs.png',
    color: '#06b6d4',
  },
  {
    title: 'Encore Services',
    category: 'Government AI',
    description: 'AI solutions that serve the mission. Purpose-trained custom AI agents for government and defense.',
    url: 'https://encoresvcsllc.com',
    image: '/portfolio/encoresvcs.png',
    color: '#f59e0b',
  },
  {
    title: 'Insurance Wheatridge',
    category: 'Insurance Agency',
    description: 'Local Farmers Insurance agency in Wheat Ridge, Colorado. Personalized coverage with a trusted community presence.',
    url: 'https://www.insurancewheatridge.com',
    image: '/portfolio/insurancewheatridge.png',
    color: '#10b981',
  },
  {
    title: 'Social New London',
    category: 'Restaurant & Bar',
    description: 'The Social Bar + Kitchen, New London\'s premier craft beer destination with 50 taps, live events, and modern American cuisine.',
    url: 'https://socialnewlondon.com',
    image: '/portfolio/socialnewlondon.png',
    color: '#7C3AED',
  },
  {
    title: 'Subie Recycler',
    category: 'E-Commerce',
    description: 'Subaru parts recycling marketplace. A digital-first breaker with online inventory and appointment scheduling.',
    url: 'https://subierecycler.com',
    image: '/portfolio/subierecycler.png',
    color: '#16A34A',
  },
  {
    title: 'AppStudio Pro',
    category: 'Technology Platform',
    description: 'Custom application development studio showcasing enterprise software solutions and mobile apps.',
    url: 'https://www.appstudiopro.com',
    image: '/portfolio/appstudiopro.png',
    color: '#DB2777',
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
