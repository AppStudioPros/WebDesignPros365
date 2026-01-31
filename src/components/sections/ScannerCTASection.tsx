'use client';

import { motion } from 'framer-motion';
import { Search, Zap, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ScannerCTASection() {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
              Free Tool
            </div>
            <h2 className="heading-lg mb-4">
              Test Your Website's <span className="gradient-text">Performance</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get instant insights into your website's speed, SEO, accessibility, and mobile performance. 
              Completely free, no signup required.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Zap,
                title: 'Performance',
                description: 'Core Web Vitals & speed metrics',
                color: 'text-yellow-600',
                bg: 'bg-yellow-50',
              },
              {
                icon: Search,
                title: 'SEO Analysis',
                description: 'Search engine optimization score',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: Shield,
                title: 'Accessibility',
                description: 'WCAG compliance check',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                icon: TrendingUp,
                title: 'Best Practices',
                description: 'Industry standards audit',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${feature.bg} border-2 border-transparent hover:border-[#8734E1] transition-all group`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/scanner">
              <Button
                className="h-14 px-10 text-base bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90"
                data-testid="scanner-cta-button"
              >
                <Search className="w-5 h-5 mr-2" />
                Scan Your Website Now
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              ⚡ Results in seconds • 100% free • No credit card required
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
