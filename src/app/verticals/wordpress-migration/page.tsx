"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, AlertTriangle, Code2, Shield, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const painPoints = [
  { title: 'Page loads are too slow', body: 'Average WordPress site has 4-6 second LCP. Visitors bounce. Google penalizes. Core Web Vitals score sits at 30-50 out of 100.' },
  { title: 'Plugin hell', body: 'A typical business WP install has 25-50 plugins, half of them abandoned, each one a security risk and a future incompatibility waiting to happen.' },
  { title: 'Security incidents are routine', body: 'WordPress runs 43% of the web AND accounts for 96% of CMS hacks. Editor accounts get popped, ransomware lands, and you find out at 3 AM.' },
  { title: 'Editor experience is hostile', body: 'Gutenberg blocks fight with classic editor. Page builders fight with the theme. Your team gives up and asks the developer for everything.' },
];

const whatYouGet = [
  { icon: Zap, title: 'Sub-100ms page loads', body: 'Next.js 16 + Vercel Edge gets you LCP under 1.2 seconds globally. 5-7x faster than your current WordPress install.' },
  { icon: Shield, title: 'Modern security model', body: 'No PHP attack surface. No vulnerable plugins. JWT auth, RBAC, audit trails. The kind of security you cannot bolt onto WordPress.' },
  { icon: Code2, title: 'Editor experience that does not suck', body: 'Sanity, Contentful, or Strapi instead of the WordPress admin. Your team actually wants to use it. Clean, fast, predictable.' },
  { icon: AlertTriangle, title: 'No more plugin roulette', body: 'Every feature is purpose-built code, not a marketplace plugin that breaks on the next WP update. Stable. Predictable. Maintainable.' },
];

const migrationPath = [
  { step: '01', title: 'Content export', body: 'We pull every post, page, image, and custom field from your WordPress install. Mapped to clean structured content models.' },
  { step: '02', title: 'Rebuild on modern stack', body: 'Next.js 16 + your choice of headless CMS. Custom design or your existing brand. SEO + AEO + GEO baked in from day one.' },
  { step: '03', title: 'Side-by-side staging', body: 'Your new site lives on staging while WordPress keeps serving. You preview everything. Stakeholders sign off before the switch.' },
  { step: '04', title: 'DNS cutover', body: 'One-day flip. We redirect every URL so SEO transfers cleanly. Old site decommissioned after 30 days of monitoring.' },
];

const advantages = [
  '5-7x faster page loads with Next.js 16 + Vercel Edge',
  'Full SEO + AEO + GEO setup included (most agencies charge separately)',
  'No more security patches and plugin updates eating your week',
  'Your editorial team actually likes the new editor (we promise)',
  'Optional AI layer: chatbot, content engine, search, recommendations',
  'Patent-anchored ACI platform under any AI you add later',
];

export default function WordpressMigrationPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Vertical: WordPress Migration</Badge>
            <h1 className="heading-xl mb-6">Migrate off WordPress to <span className="gradient-text">a modern stack.</span></h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              For organizations on aging WordPress installs ready for sub-100ms page loads, modern
              security, an editor experience your team likes, and an AI layer that actually works.
              We migrate the content cleanly and rebuild on Next.js 16 + headless CMS.
            </p>
            <Link href="/contact?topic=wordpress-migration"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">Book a Migration Audit <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">The WordPress Tax</Badge>
            <h2 className="heading-lg mb-4">Why teams finally leave</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {painPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 h-full border-red-100 bg-red-50/30 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-700">{p.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">What You Get</Badge>
            <h2 className="heading-lg mb-4">Four upgrades <span className="gradient-text">on day one.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whatYouGet.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all flex flex-col items-center text-center">
                    <div className="mb-4"><GlassIcon Icon={Icon} color="#8734E1" /></div>
                    <h3 className="font-semibold text-gray-900 mb-2">{h.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{h.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Migration Path</Badge>
            <h2 className="heading-lg mb-4">Four <span className="gradient-text">steps</span> to a clean migration.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {migrationPath.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="p-5 h-full text-center">
                  <div className="text-2xl font-bold text-[#8734E1]/30 mb-2">{s.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">Typical migration timeline: 4-8 weeks for marketing sites, 8-16 weeks for content-heavy sites with WooCommerce.</p>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The WDP365 Migration Advantage</Badge>
            <h2 className="heading-lg mb-6">Why teams finally pick us</h2>
            <ul className="space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0 mt-0.5">
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
