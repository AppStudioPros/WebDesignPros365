"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Map, Users, FileText, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const painPoints = [
  { title: 'Lead gen platforms are stuck in 2010', body: 'kvCORE, BoomTown, Sierra are powerful but feel ancient. Agents export to Excel because the platform is too clunky to actually use day-to-day.' },
  { title: 'Title industry is 1990s', body: 'Title companies use desktop software that predates the iPhone. Buyers and sellers have zero visibility into a 30-60 day process. Fraud is rampant.' },
  { title: 'Post-close relationship dies at signing', body: 'The buyer\'s relationship with their agent ends roughly 2 minutes after closing. Nobody owns the homeowner relationship after that. $5K-$30K spent in first 90 days, captured by nobody.' },
  { title: 'AI in real estate is mostly hype', body: 'Most "AI" tools are GPT-mini wrappers that hallucinate property data. Nothing built on patented architecture. Nothing with audit trails. Nothing that learns YOUR agent.' },
];

const platforms = [
  'kvCORE', 'Sierra Interactive', 'BoomTown', 'Real Geeks', 'MLS-RETS', 'RESO Web API',
  'Follow Up Boss', 'Chime', 'Wise Agent', 'Zillow Premier Agent', 'Realtor.com', 'Compass',
  'DocuSign', 'Dotloop', 'TransactionDesk', 'Skyslope',
];

const howWeHelp = [
  { icon: Home, title: 'Custom agent platforms', body: 'Per-agent AI coaching, prospect intelligence, transaction dashboards. Built on the patented ACI architecture for cross-agent compound learning.' },
  { icon: Map, title: 'Multi-MLS integration', body: 'Production-grade MLS-RETS and RESO Web API connections. Real-time data, historical sold comps, off-market intelligence layers.' },
  { icon: Users, title: 'Lead-to-close pipeline AI', body: 'Daily 7 prospect scoring, pre-call coaching, in-call nudges, post-call extraction. The kind of intelligence layer kvCORE wishes it had.' },
  { icon: FileText, title: 'Title + transaction tooling', body: 'Title status translators for buyers, inspection report AI, closing disclosure pre-flight, attorney/notary matching. The missing pieces nobody else builds.' },
];

const advantages = [
  'MarqetCore in production (Pro Agent + Scout Flipper + FSBO Seller modules)',
  'Title industry research and partnership track (Caleb Christopher / Creative Title relationship)',
  'Patent-anchored AI architecture for the compound learning play',
  'Custom MLS-RETS integration experience',
  'Federal-grade audit-trail discipline applied to real estate transactions',
];

export default function RealEstatePage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Vertical: Real Estate Tech</Badge>
            <h1 className="heading-xl mb-6">Real estate is <span className="gradient-text">stuck in 2010.</span> We help unstick it.</h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              For real estate brokerages, lead gen platform founders, title companies, transaction
              coordinators, and PropTech operators. We build the AI-native tooling the industry has
              been promised for a decade and never actually gotten.
            </p>
            <Link href="/contact?topic=real-estate"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">Book a Real Estate Call <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">The Real Estate Tax</Badge>
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
            <h2 className="heading-lg mb-4">Four shapes <span className="gradient-text">we ship for real estate.</span></h2>
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
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Real Estate Platforms We Integrate</Badge>
            <h2 className="heading-lg mb-4">Where we <span className="gradient-text">plug in.</span></h2>
          </motion.div>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <div key={p} className="px-4 py-2 rounded-xl bg-[#181928] border border-[#3a3858] text-[#c4c0e0] text-sm font-medium">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The WDP365 Real Estate Advantage</Badge>
            <h2 className="heading-lg mb-6">Why PropTech founders pick us</h2>
            <ul className="space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[#c4c0e0]">
                  <div className="w-6 h-6 rounded-full bg-[#1e1c35] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#8734E1]" />
                  </div>
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
