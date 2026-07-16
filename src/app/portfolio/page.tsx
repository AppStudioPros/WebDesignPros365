"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const projects = [
  // —— NEWEST BUILDS ——
  {
    title: 'MarqetCore',
    category: 'AI Real Estate',
    description: 'Find listings before they exist. AI that ranks each morning\'s top 7 prospects per agent using 200+ behavioral and property signals.',
    url: 'https://marqetcore.com',
    image: '/portfolio/marqetcore.webp',
    color: '#8734E1',
  },
  {
    title: 'PhylaxOne',
    category: 'AI-Native Security',
    description: 'Preemptive security platform. Detects, predicts, and neutralizes threats before they execute, built on the patented ACI architecture.',
    url: 'https://www.phylaxone.com',
    image: '/portfolio/phylaxone.webp',
    color: '#ef4444',
  },
  {
    title: 'FORGE / YourWorkforce',
    category: 'GovCon AI Platform',
    description: 'The AI platform built for government contractors. SAM.gov integration, CMMC-aligned, FedRAMP architecture. SDVOSB compliant.',
    url: 'https://www.yourworkforce.ai',
    image: '/portfolio/yourworkforce.webp',
    color: '#2F73EE',
  },
  {
    title: 'AcuSightPro',
    category: 'Federal Procurement',
    description: 'Federal contracting intelligence engine by Encore Services LLC. SAM.gov opportunity surveillance with AI-driven bid/no-bid scoring.',
    url: 'https://www.acusightpro.com',
    image: '/portfolio/acusightpro.webp',
    color: '#f59e0b',
  },
  {
    title: 'MotherLode CMI',
    category: 'Critical Minerals',
    description: 'Per-site critical-minerals intelligence across mining-active U.S. Reduces per-site analysis from 6-8 months to hours.',
    url: 'https://www.motherlodecmi.com',
    image: '/portfolio/motherlodecmi.webp',
    color: '#0891b2',
  },
  {
    title: 'Aether ACI',
    category: 'Family + Business OS',
    description: 'The Company Operating System. Same patented ACI intelligence that runs your company also keeps your family connected and protected.',
    url: 'https://www.aetheraci.com',
    image: '/portfolio/aetheraci.webp',
    color: '#6366F1',
  },
  {
    title: 'Adaptive Compound Intelligence',
    category: 'AI Architecture',
    description: 'The patent-pending architecture behind every build. The framework that turns individual interactions into compound organizational intelligence.',
    url: 'https://www.adaptivecompoundintelligence.com',
    image: '/portfolio/adaptivecompoundintelligence.webp',
    color: '#BF5DE0',
  },
  // —— EARLIER WORK ——
  {
    title: 'Lucid Tech Labs',
    category: 'AI & Enterprise',
    description: 'Patent-pending Adaptive Compound Intelligence platform powering solutions across enterprise, government, and security.',
    url: 'https://lucidtechlabsllc.com',
    image: '/portfolio/lucidtechlabs.webp',
    color: '#06b6d4',
  },
  {
    title: 'Encore Services',
    category: 'Government AI',
    description: 'AI solutions that serve the mission. Purpose-trained custom AI agents for government and defense.',
    url: 'https://encoresvcsllc.com',
    image: '/portfolio/encoresvcs.webp',
    color: '#f59e0b',
  },
  {
    title: 'Insurance Wheatridge',
    category: 'Insurance Agency',
    description: 'Local Farmers Insurance agency in Wheat Ridge, Colorado. Personalized coverage with a trusted community presence.',
    url: 'https://www.insurancewheatridge.com',
    image: '/portfolio/insurancewheatridge.webp',
    color: '#10b981',
  },
  {
    title: 'Social New London',
    category: 'Restaurant & Bar',
    description: 'The Social Bar + Kitchen, New London\'s premier craft beer destination with 50 taps, live events, and modern American cuisine.',
    url: 'https://socialnewlondon.com',
    image: '/portfolio/socialnewlondon.webp',
    color: '#7C3AED',
  },
  {
    title: 'Subie Recycler',
    category: 'E-Commerce',
    description: 'Subaru parts recycling marketplace. A digital-first breaker with online inventory and appointment scheduling.',
    url: 'https://subierecycler.com',
    image: '/portfolio/subierecycler.webp',
    color: '#16A34A',
  },
  {
    title: 'AppStudio Pro',
    category: 'Technology Platform',
    description: 'Custom application development studio showcasing enterprise software solutions and mobile apps.',
    url: 'https://www.appstudiopro.com',
    image: '/portfolio/appstudiopro.webp',
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
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Portfolio</Badge>
            <h1 className="heading-xl mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-lg text-[#a8a4c8]">
              Real projects. Real results. Hover to scroll through each site.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: Math.min(index * 0.05, 0.4) }}
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
                    <h3 className="text-lg font-bold text-[#f0eef8] mb-1 group-hover:text-[#8734E1] transition-colors flex items-center gap-2">
                      {project.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-[#8a87a8] line-clamp-2">{project.description}</p>
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

            {/* "Yours next" CTA card — fills the orphan grid slot when projects.length % 3 !== 0 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 lg:col-span-2"
            >
              <Link
                href="/contact"
                className="group block h-full"
              >
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-[#8734E1]">
                    Your Project
                  </p>
                  <h3 className="text-lg font-bold text-[#f0eef8] mb-1 group-hover:text-[#8734E1] transition-colors flex items-center gap-2">
                    Yours next?
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-[#8a87a8] line-clamp-2">
                    Free 30-minute discovery call. Fixed-price quote within 48 hours.
                  </p>
                </div>
                <div
                  className="relative w-full h-[320px] rounded-xl overflow-hidden border-2 border-dashed border-[#3a3858] group-hover:border-[#8734E1] transition-all duration-300 bg-gradient-to-br from-[#f0e6fb] via-white to-[#f0e6fb] flex items-center justify-center"
                >
                  <div className="text-center px-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8734E1] to-[#2F73EE] mx-auto mb-4 flex items-center justify-center shadow-xl shadow-[#8734E1]/30 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-8 h-8 text-white" strokeWidth={2.25} />
                    </div>
                    <h4 className="text-2xl font-bold text-[#f0eef8] mb-2">
                      Let&apos;s build yours.
                    </h4>
                    <p className="text-sm text-[#a8a4c8] mb-6 max-w-sm mx-auto">
                      We&apos;re currently taking on builds for Q2 + Q3. Next.js, AI integration, ACI platform engineering, or all three.
                    </p>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8734E1] text-white text-sm font-semibold shadow-lg group-hover:shadow-xl group-hover:gap-3 transition-all">
                      Start a Project
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
