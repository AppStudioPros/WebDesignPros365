"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Compass, Target, Layers3, Workflow, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/sections/CTASection';

const elements = [
  { icon: Compass, title: 'Strategy + Positioning', body: 'Who are you, who are you for, what makes you different. Brand voice, ICP definition, competitive positioning. Without strategy, the build is decoration.' },
  { icon: Target, title: 'Brand + Visual Identity', body: 'Logo systems, color palettes, typography, brand guidelines. Certification marks, badges, tier systems. Whatever you need to look like a real organization.' },
  { icon: Layers3, title: 'Multi-Site Architecture', body: 'For organizations running multiple products or brands. Coherent design language across N sites, shared component libraries, consistent deployment.' },
  { icon: Workflow, title: 'AI + Automation Layer', body: 'ACI-anchored AI integrated through every customer interaction. Chatbots, agentic workflows, content engines, decision tools. All connected.' },
  { icon: Rocket, title: 'Launch + Ongoing Operations', body: 'Pre-launch campaigns, launch sequencing, post-launch monitoring, ongoing dev retainer. We do not build and disappear. The program keeps running.' },
];

const whoThisFor = [
  { title: 'Federal contractors', body: 'You need a credible public face plus internal AI tooling plus methodology library plus pilot demo. Our parent company runs this exact playbook for an SDVOSB partner.' },
  { title: 'Multi-brand operators', body: 'You run 3+ brands and need a coherent design + AI system across all of them. We have shipped this pattern across 6+ branded sites under a single agency umbrella.' },
  { title: 'Vertical platform founders', body: 'You are building a category-defining product in real estate, legal, healthcare, or fintech. You need strategy + design + engineering + AI as one program, not three vendors.' },
  { title: 'Established companies modernizing', body: 'You have an outdated stack, an outdated brand, and an outdated way of working with customers. You want to fix all three at once instead of stitching one-off projects together.' },
];

const faqs = [
  {
    q: 'How is this different from hiring an agency for one project?',
    a: 'A normal agency engagement is one deliverable: a website, a logo, an app. Program creation is the whole digital program. Strategy, brand, design, engineering, AI, launch, ongoing operations, all coordinated and shipping in coherent waves. You get one team, one timeline, one accountability surface. Most projects that fail do so because the strategy person, the design person, and the engineering person never spoke. Program creation eliminates that.',
  },
  {
    q: 'Who actually leads a program engagement?',
    a: 'Corey leads the technical architecture and AI work. Kelsi leads design and brand systems. William leads strategic partnerships and channel work. We pull in specialists (copywriting, paid media, accessibility audit) as the scope requires. You always have one senior point of contact, not a rotating bench.',
  },
  {
    q: 'How long does program creation take?',
    a: 'A real program build runs 4-9 months from kickoff to operational launch. We sequence it: month 1-2 strategy and brand foundation, month 2-5 design and core engineering, month 5-7 AI layer and integrations, month 7-9 launch and post-launch operations. After launch, we shift into ongoing retainer at $5K-$20K per month depending on velocity.',
  },
  {
    q: 'What does program creation cost?',
    a: 'Total engagement runs $75K to $500K depending on scope. The Custom and ACI-Powered pricing tiers cover this range. Federal-grade or compliance-heavy programs sit at the upper end. Strategy and brand-only engagements (no engineering) sit lower. We scope every program in a free discovery call before quoting.',
  },
  {
    q: 'Do you do strategy-only without the build?',
    a: 'Yes, when it makes sense. We charge for strategy work as a fixed-fee deliverable (audit, roadmap, brand brief, methodology library). If the engagement converts into a full program build inside 90 days, the strategy fee credits against the program build fee.',
  },
];

export default function ProgramCreationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Full Program Creation</Badge>
            <h1 className="heading-xl mb-6">Build the whole <span className="gradient-text">digital program.</span> Not just a website.</h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              Strategy, brand, design, engineering, AI integration, launch, and ongoing operations.
              One team, one timeline, one accountability surface. For organizations that need the whole
              program shipped coherently, not stitched together from three vendors.
            </p>
            <Link href="/contact?topic=program-creation">
              <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                Scope a Program <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">What's In a Program</Badge>
            <h2 className="heading-lg mb-4">Five <span className="gradient-text">elements,</span> coordinated.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {elements.map((e, i) => {
              const Icon = e.icon;
              return (
                <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-[#1e1c35] flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-[#8734E1]" /></div>
                    <h3 className="font-semibold text-[#f0eef8] mb-2">{e.title}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{e.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Who This Is For</Badge>
            <h2 className="heading-lg mb-4">When program creation <span className="gradient-text">fits.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whoThisFor.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="p-6 h-full">
                  <h3 className="font-semibold text-[#f0eef8] mb-2">{w.title}</h3>
                  <p className="text-sm text-[#a8a4c8] leading-relaxed">{w.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h2 className="heading-lg mb-4">Program creation questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <div className="bg-[#252640] border border-[#3a3858] rounded-2xl overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1c1d30] transition-colors">
                    <span className="font-medium text-[#f0eef8] pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#8734E1] transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-5"><p className="text-[#a8a4c8] leading-relaxed">{faq.a}</p></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
