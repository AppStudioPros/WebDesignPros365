"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, FileSearch, Layers, Workflow, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const painPoints = [
  { title: '1990s contract writing systems', body: 'Most agencies still use legacy CWS tools with no AI, no audit trails, no modern UX. Officers burn hours on what should take minutes.' },
  { title: 'No audit-trail-complete AI', body: 'When a CO uses ChatGPT for procurement research, there is no trace, no methodology binding, no protest-defensible evidence.' },
  { title: 'FAR / VAAR compliance nightmares', body: 'Citation discipline is hard. Methodology binding is harder. Most AI tools fail every federal evaluation criteria.' },
  { title: 'Procurement workforce shrinking', body: 'Senior COs retiring, replacement bench thin. The remaining workforce needs leverage, not more tools.' },
];

const platforms = [
  'SAM.gov API', 'FPDS', 'USAspending.gov', 'GSA Advantage', 'FedConnect', 'Beta.SAM',
  'eBuy', 'eOffer', 'ASSIST', 'GovWin', 'Bloomberg Government', 'Deltek GovWin',
];

const howWeHelp = [
  { icon: ShieldCheck, title: 'Federal-grade compliance discipline', body: 'Audit-trail-complete AI. No hallucination, no drift, always human-in-the-loop. The same disciplines applied to commercial work apply 1:1 here, only stricter.' },
  { icon: FileSearch, title: 'SAM.gov + FPDS data integration', body: 'Live federal acquisition data, market research automation, set-aside determination, sources sought response automation.' },
  { icon: Layers, title: 'CWS modernization', body: 'Modern contract writing systems that integrate with legacy ERP and accounting. Next.js + Supabase + ACI architecture replaces 1990s tools.' },
  { icon: Workflow, title: 'Acquisition lifecycle automation', body: 'Market research, sources sought, RFI, RFP drafting, evaluation, award, post-award tracking. End-to-end with methodology binding.' },
];

const advantages = [
  'Patented ACI architecture under every AI deployment',
  'Audit-trail-complete responses (protest-defensible)',
  'Methodology-bound AI (citable to FAR / VAAR / agency-specific doctrine)',
  'No hallucination, no drift, always human-in-the-loop',
  'Familiar with SDVOSB partnership pathways',
  'Federal-cleared infrastructure patterns',
  'Built on Next.js 16 + Vercel + Supabase + Anthropic Claude',
];

export default function FederalContractingPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">Vertical: Federal & Government</Badge>
            <h1 className="heading-xl mb-6 text-white">Federal-grade AI for <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">acquisition workflows.</span></h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              For federal contractors, SDVOSB partners, GovCon primes, and agency tech leads. We build
              audit-trail-complete AI systems for the acquisition lifecycle. Built on the patented ACI
              platform with federal-grade compliance discipline from day one.
            </p>
            <Link href="/contact?topic=federal"><Button size="lg" className="bg-[#252640] text-[#8734E1] hover:bg-[#252640]/90">Book a Federal Discovery Call <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">The Federal Acquisition Tax</Badge>
            <h2 className="heading-lg mb-4">What&apos;s actually broken</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {painPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 h-full border-red-100 bg-red-50/30 text-center">
                  <h3 className="font-semibold text-[#f0eef8] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#c4c0e0]">{p.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">How We Help</Badge>
            <h2 className="heading-lg mb-4">Four shapes <span className="gradient-text">we ship for federal.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {howWeHelp.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all flex flex-col items-center text-center">
                    <div className="mb-4"><GlassIcon Icon={Icon} color="#8734E1" /></div>
                    <h3 className="font-semibold text-[#f0eef8] mb-2">{h.title}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{h.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Federal Platforms We Integrate</Badge>
            <h2 className="heading-lg mb-4">Where we <span className="gradient-text">plug in.</span></h2>
            <p className="text-[#a8a4c8]">We connect to the federal data sources and procurement systems you already use.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <div key={p} className="px-4 py-2 rounded-xl bg-[#181928] border border-[#3a3858] text-[#c4c0e0] text-sm font-medium">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">The WDP365 Federal Advantage</Badge>
            <h2 className="heading-lg mb-6 text-white">Why federal contractors pick us</h2>
            <ul className="space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-[#8734E1]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#BF5DE0]" />
                  </div>
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/services/aci-platform" className="text-[#BF5DE0] hover:text-white text-sm underline">Read more about the ACI platform underneath →</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
