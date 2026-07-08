"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CTASection from '@/components/sections/CTASection';
import { Badge } from '@/components/ui/badge';

export default function PricingPageClient() {
  return (
    <>
      <section className="bg-white text-gray-900 py-24 px-4 sm:px-6 lg:px-8 pt-32">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Pricing</Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-4xl font-extrabold sm:text-5xl text-gray-900"
          >
            Fixed-Price Architecture.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8734E1] to-[#2F73EE]">
              Zero Scope Drift.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto"
          >
            No mystery hourly bleed, no unexpected surcharges. Pick the closest fit and we'll map your exact project scope on the discovery call. One fixed quote in 48 hours.
          </motion.p>
        </div>

        {/* 3-Column Grid */}
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3 items-start mb-12">

          {/* Launch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-gray-200 bg-gray-50 rounded-2xl p-8 flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900">Launch</h3>
              <p className="mt-2 text-sm text-gray-500">Perfect for small businesses and startups launching their professional web footprint.</p>
              <div className="mt-6">
                <p className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-gray-900">$3,750</span>
                  <span className="text-sm font-semibold text-gray-400">to start</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">$7,500 total · 50/25/25 milestone payments</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <li>• Up to 5 pages built on Next.js 16</li>
                <li>• Fully responsive framework & PWA layout*</li>
                <li>• Base SEO + AEO + GEO stack deployment</li>
                <li>• Secure contact form integration</li>
                <li>• 30 days post-launch support window</li>
              </ul>
            </div>
            <Link href="/contact">
              <button className="mt-8 w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition">
                Start a Project
              </button>
            </Link>
          </motion.div>

          {/* Growth — Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border-2 border-[#8734E1] bg-white rounded-2xl p-8 flex flex-col justify-between h-full relative shadow-xl shadow-[#8734E1]/10"
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              Most Popular
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Growth</h3>
              <p className="mt-2 text-sm text-gray-500">For growing brands that require custom design structures and deep content engines.</p>
              <div className="mt-6">
                <p className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8734E1] to-[#2F73EE]">$7,500</span>
                  <span className="text-sm font-semibold text-gray-400">to start</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">$15,000 total · 50/25/25 milestone payments</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <li>• Up to 15 pages with custom UI/UX design</li>
                <li>• Native Sanity CMS headless infrastructure</li>
                <li>• Advanced Core Web Vitals optimization</li>
                <li>• Analytics & custom conversion funnel tracking</li>
                <li>• 60 days dedicated deployment support</li>
              </ul>
            </div>
            <Link href="/contact">
              <button className="mt-8 w-full bg-gradient-to-r from-[#8734E1] to-[#2F73EE] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-[#8734E1]/20">
                Start a Project
              </button>
            </Link>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-gray-200 bg-gray-50 rounded-2xl p-8 flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900">Pro</h3>
              <p className="mt-2 text-sm text-gray-500">Corporate properties needing complex AI interfaces and rigid accessibility features.</p>
              <div className="mt-6">
                <p className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-gray-900">$15,000</span>
                  <span className="text-sm font-semibold text-gray-400">to start</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">$30,000 total · 50/25/25 milestone payments</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <li>• Unlimited context pages & custom codebases</li>
                <li>• Production-grade interactive AI chatbot</li>
                <li>• Advanced SEO + AEO + GEO stack setup</li>
                <li>• WCAG 2.2 AA accessibility legal compliance</li>
                <li>• Full CRM & A/B testing infrastructure sync</li>
                <li>• 90 days support + monthly reports (6 mos.)</li>
              </ul>
            </div>
            <Link href="/contact">
              <button className="mt-8 w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition">
                Start a Project
              </button>
            </Link>
          </motion.div>

        </div>

        <p className="text-center text-xs text-gray-400 mb-16">* Mobile responsiveness & PWA are optional add-ons for lower tiers.</p>

        {/* Enterprise + Flagship Dual Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto border border-gray-200 bg-gray-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

            {/* Custom */}
            <div className="pb-8 lg:pb-0">
              <span className="text-xs font-bold uppercase text-[#2F73EE] tracking-wider">Enterprise</span>
              <h4 className="text-2xl font-bold mt-1 text-gray-900">Custom Package</h4>
              <div className="mt-4">
                <p className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">$25,000+</span>
                  <span className="text-sm font-semibold text-gray-400">to start</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">$50,000+ total · 50/25/25 milestone payments</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">Multi-language, headless commerce, and deep legacy software system hooks.</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li>• Everything included in the Pro tier</li>
                <li>• Multi-language regional routing setups</li>
                <li>• Headless architecture commerce builds</li>
                <li>• White-label / wholesale agency execution modes</li>
                <li>• Dedicated priority support with fixed SLA bounds</li>
              </ul>
              <Link href="/contact">
                <button className="mt-8 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition">
                  Discuss Scope
                </button>
              </Link>
            </div>

            {/* ACI-Powered */}
            <div className="pt-8 lg:pt-0 lg:pl-12">
              <span className="text-xs font-bold uppercase text-[#8734E1] tracking-wider">Patented Technology</span>
              <h4 className="text-2xl font-bold mt-1 text-gray-900">Flagship ACI-Powered</h4>
              <div className="mt-4">
                <p className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8734E1] to-[#2F73EE]">$37,500+</span>
                  <span className="text-sm font-semibold text-gray-400">to start</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">$75,000+ total · 50/25/25 milestone payments</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">Full 5-layer Adaptive Compound Intelligence engineering with audit trails.</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li>• Patented ACI platform integration (no wrappers)</li>
                <li>• Custom AI agents trained completely on your domain</li>
                <li>• Zero-hallucination and zero-drift algorithmic guardrails</li>
                <li>• Compliance-grade audit trails for every automated node</li>
                <li>• White-glove team access + quarterly reviews</li>
              </ul>
              <Link href="/contact">
                <button className="mt-8 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] hover:opacity-90 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition shadow-lg shadow-[#8734E1]/20">
                  Request AI Architecture Call
                </button>
              </Link>
            </div>

          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-8">All prices in USD. Retainer packages from $5,000/month. Tax not included.</p>

      </section>

      <CTASection />
    </>
  );
}
