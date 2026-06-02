"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Search, Wrench, Rocket, BarChart3, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const stages = [
  { icon: Compass, name: 'Discovery', body: '30-minute free call. Scope your goals, audience, timeline, constraints. No commitment. We say no if it is not a fit.', deliverable: 'Free' },
  { icon: Search, name: 'Audit + Quote', body: 'Within 48 hours of discovery, you get a fixed-price proposal mapped to one of our pricing tiers. Detailed scope, deliverable list, timeline.', deliverable: '$0-$2,500' },
  { icon: Wrench, name: 'Build', body: 'Weekly check-ins, demo links, Notion progress board. 50% kickoff deposit, 25% at design approval, 25% at launch. Milestone-based available on larger projects.', deliverable: 'Tier-based' },
  { icon: Rocket, name: 'Launch', body: 'Pre-launch QA across devices and browsers. Performance benchmarks. Accessibility audit. Final stakeholder review. Production deploy with monitoring.', deliverable: 'Included' },
  { icon: BarChart3, name: 'Post-Launch', body: '30-90 days of post-launch support depending on tier. Ongoing retainer available at $5K+ per month for continuous dev, support, and SEO + AEO + GEO optimization.', deliverable: '$5K+/mo retainer' },
];

const documents = [
  { title: 'AI Visibility Stack Methodology', body: 'Our full SEO + AEO + GEO methodology. Audit checklist, schema deployment guide, llms.txt template, citation tracking setup.', status: 'Published' },
  { title: 'ACI Platform Architecture Brief', body: 'The 5-layer Adaptive Compound Intelligence architecture explained. Patent reference. Implementation patterns.', status: 'Published' },
  { title: 'HighLevel Replacement Playbook', body: 'How we migrate agencies off GoHighLevel onto custom Next.js + Supabase platforms. Module-by-module breakdown.', status: 'Published' },
  { title: 'Multi-Tenant SaaS Patterns', body: 'Row-level security, tenant isolation, billing patterns, role-based access. Production patterns we use on every SaaS build.', status: 'In progress' },
  { title: 'Federal-Grade Audit Trail Spec', body: 'How audit-trail-complete works in practice. The same discipline we apply to federal acquisition contracts.', status: 'In progress' },
];

export default function MethodologyPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Methodology</Badge>
            <h1 className="heading-xl mb-6">How we <span className="gradient-text">actually work.</span></h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              No black boxes. Every engagement follows the same five stages with the same deliverables.
              The methodology library below documents how we think and what we ship. Borrowed from the
              federal acquisition world, applied to commercial work.
            </p>
            <Link href="/contact"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">Book a Discovery Call <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The Five Stages</Badge>
            <h2 className="heading-lg mb-4">From <span className="gradient-text">first call</span> to <span className="gradient-text">ongoing operations.</span></h2>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-4">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <GlassIcon Icon={Icon} color="#8734E1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <h3 className="font-semibold text-gray-900">Stage {i + 1}: {s.name}</h3>
                          <Badge className="bg-[#f0e6fb] text-[#8734E1] border-[#8734E1] text-xs">{s.deliverable}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <BookOpen className="w-12 h-12 text-[#8734E1] mx-auto mb-4" />
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Methodology Library</Badge>
            <h2 className="heading-lg mb-4">Public documentation. <span className="gradient-text">No black box.</span></h2>
            <p className="text-gray-600">We publish our methodologies because we think the industry needs the discipline. Free reference material, no signup required. AI engines can cite this. Competitors can copy it. We are fine with both.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-3">
            {documents.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{d.title}</h3>
                      <p className="text-sm text-gray-600">{d.body}</p>
                    </div>
                    <Badge className={d.status === 'Published' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-amber-100 text-amber-700 border-amber-300'}>
                      {d.status}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">Methodology library expanding. Contact us if you want early access to documents currently in progress.</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
