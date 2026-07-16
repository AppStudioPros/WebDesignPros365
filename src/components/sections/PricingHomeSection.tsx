"use client";

import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const highlights = [
  { value: '$7,500', label: 'Starting price', note: 'Launch tier: 5 pages, full AI Visibility Stack' },
  { value: 'Fixed', label: 'Price guarantee', note: 'One quote in 48 hours. No hourly bleed, ever.' },
  { value: '48hrs', label: 'Quote turnaround', note: 'Scoped, fixed, and ready to sign in two days.' },
];

const quickWins = [
  'SEO + AEO + GEO on every build',
  'Next.js 16, loads under 500ms',
  '50% deposit, 50% at launch',
  'No retainers required to start',
];

export default function PricingHomeSection() {
  return (
    <section className="section bg-[#252640] py-20">
      <div className="container-custom">

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Transparent Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f0eef8] mb-3">
            Fixed-price builds.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8734E1] to-[#2F73EE]">
              Starting at $7,500.
            </span>
          </h2>
          <p className="text-[#8a87a8] max-w-xl mx-auto text-base">
            No mystery hourly rates. No scope creep. One number, one quote, one handshake.
          </p>
        </m.div>

        {/* 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {highlights.map((h, i) => (
            <m.div
              key={h.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1c1d30] border border-[#3a3858] rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8734E1] to-[#2F73EE] mb-1">
                {h.value}
              </div>
              <div className="text-sm font-bold text-[#f0eef8] mb-1">{h.label}</div>
              <div className="text-xs text-[#8a87a8] leading-relaxed">{h.note}</div>
            </m.div>
          ))}
        </div>

        {/* Quick win bullets + CTA */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#f0e6fb] to-[#e6f0fb] border border-[#8734E1]/15 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickWins.map(win => (
              <div key={win} className="flex items-center gap-2 text-sm text-[#c4c0e0]">
                <div className="w-5 h-5 rounded-full bg-[#8734E1]/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#8734E1]" strokeWidth={3} />
                </div>
                {win}
              </div>
            ))}
          </div>
          <Link href="/pricing" className="shrink-0">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition shadow-md shadow-[#8734E1]/20 whitespace-nowrap">
              See Full Pricing <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </m.div>

      </div>
    </section>
  );
}
