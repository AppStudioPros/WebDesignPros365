"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  X,
  Check,
  Sparkles,
  Zap,
  Workflow,
  Layers,
  Code2,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import { services } from '@/data/services';
import { getServiceIcon } from '@/lib/service-icons';
import CTASection from '@/components/sections/CTASection';

const categories = [
  { id: 'all', name: 'All Services', count: services.length, accent: '#8734E1' },
  { id: 'visibility', name: 'AI Visibility', count: services.filter((s) => s.category === 'visibility').length, accent: '#EC4899' },
  { id: 'ai', name: 'AI & Platforms', count: services.filter((s) => s.category === 'ai').length, accent: '#2F73EE' },
  { id: 'program', name: 'Programs + Partnerships', count: services.filter((s) => s.category === 'program').length, accent: '#F97316' },
  { id: 'development', name: 'Development', count: services.filter((s) => s.category === 'development').length, accent: '#10B981' },
  { id: 'marketing', name: 'Marketing', count: services.filter((s) => s.category === 'marketing').length, accent: '#F59E0B' },
];

// Stats with count-up animation. 'numeric' fields animate. 'static' fields don't.
const stats: Array<{
  label: string;
  type: 'numeric' | 'static';
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  staticValue?: string;
  duration?: number;
}> = [
  { label: 'Years building for the web', type: 'numeric', value: 20, suffix: '+', duration: 1800 },
  { label: 'Production services on offer', type: 'numeric', value: 12, suffix: '', duration: 2000 },
  { label: 'BBB rating', type: 'static', value: 0, staticValue: 'A+' },
  { label: 'Average build window', type: 'static', value: 0, staticValue: '4-12 wks' },
];

function CountUpStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (stat.type !== 'numeric') return;
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const duration = stat.duration || 2000;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = easeOut * stat.value;
        setCount(stat.decimals ? parseFloat(currentValue.toFixed(stat.decimals)) : Math.floor(currentValue));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(stat.value);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, stat]);

  if (stat.type === 'static') {
    return <>{stat.staticValue}</>;
  }
  const displayValue = stat.decimals ? count.toFixed(stat.decimals) : count.toLocaleString();
  return (
    <>
      {stat.prefix || ''}
      {displayValue}
      {stat.suffix || ''}
    </>
  );
}

const howWeWork = [
  { icon: Sparkles, label: 'Discovery', body: 'Free 30-min call. Scope, audience, constraints.', color: '#8734E1' },
  { icon: Zap, label: 'Fixed-price quote', body: 'Within 48 hours. Mapped to a tier. No surprises.', color: '#EC4899' },
  { icon: Code2, label: 'Build', body: 'Weekly demos. 50/25/25 milestones.', color: '#2F73EE' },
  { icon: ShieldCheck, label: 'Launch + ops', body: '30-90 day support. Retainer from $5K/mo.', color: '#10B981' },
];

function ServiceModal({ service, isOpen, onClose }: { service: typeof services[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!service) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-[#252640] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto pointer-events-auto"
            >
              <div
                className="relative p-6 pb-8"
                style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)` }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#252640]/80 hover:bg-[#252640] text-[#8a87a8] hover:text-[#c4c0e0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${service.color}20`, color: service.color }}
                  >
                    {(() => {
                      const SvcIcon = getServiceIcon(service._id);
                      return <SvcIcon className="w-6 h-6" strokeWidth={2.25} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    {service.isFlagship && (
                      <Badge className="mb-2 bg-[#8734E1] text-white">Flagship Service</Badge>
                    )}
                    <h3 className="text-2xl font-bold text-[#f0eef8]">{service.title}</h3>
                    <p className="text-sm text-[#8a87a8] mt-1">Typical timeline: {service.timeline}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-[#8a87a8] uppercase tracking-wider mb-2">Overview</h4>
                  <p className="text-[#c4c0e0] leading-relaxed">{service.fullDescription}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#8a87a8] uppercase tracking-wider mb-3">What's included</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}20` }}
                        >
                          <Check className="w-3 h-3" style={{ color: service.color }} />
                        </div>
                        <span className="text-[#c4c0e0]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#8a87a8] uppercase tracking-wider mb-3">Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{ backgroundColor: `${service.color}10`, color: service.color }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[#2e2c48]">
                  <Link href="/contact" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatsRow() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(statsRef, { once: true, margin: '-50px' });
  return (
    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          className="text-center"
        >
          <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent mb-1">
            <CountUpStat stat={s} inView={inView} />
          </div>
          <div className="text-xs text-white/60 uppercase tracking-wider">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const flagship = services.find((s) => s.isFlagship);
  const filtered = services.filter((s) => activeCategory === 'all' || s.category === activeCategory);

  return (
    <>
      {/* HERO — dark gradient with grid pattern + stats strip */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">Services</Badge>
            <h1 className="heading-xl mb-6 text-white">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Patented ACI architecture, modern stack, and the same team that ships every project.
              Fixed-price quotes within 48 hours. No mystery, no ghosting mid-build.
            </p>

            {/* STATS ROW with count-up animation */}
            <StatsRow />
          </motion.div>
        </div>
      </section>

      {/* VIDEO — How We Do It */}
      <section className="py-16 bg-[#252640] border-b border-[#2e2c48]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xs uppercase tracking-widest text-[#8734E1] font-semibold mb-3">
              Watch
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f0eef8] mb-8">
              How We Do It And Why Daily Optimization Wins
            </h2>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3a3858] bg-black">
              <video
                controls
                playsInline
                preload="none"
                poster="/videos/daily-optimization-poster.png"
                className="w-full block"
                style={{ aspectRatio: '16/9' }}
              >
                <source src="/videos/daily-optimization.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI VISIBILITY FLAGSHIP BANNER */}
      {flagship && (
        <section className="py-12 bg-gradient-to-r from-[#f0e6fb] via-white to-[#f0e6fb] border-b border-[#8734E1]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              <div className="flex-1 text-center md:text-left">
                <Badge className="mb-2 bg-[#8734E1] text-white">Flagship</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-[#f0eef8] mb-2">
                  {flagship.title}
                </h2>
                <p className="text-[#a8a4c8] mb-3">{flagship.shortDescription}</p>
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start text-xs text-[#8a87a8]">
                  <span>Timeline: {flagship.timeline}</span>
                  <span className="text-gray-300">·</span>
                  <span>Includes SEO + AEO + GEO</span>
                  <span className="text-gray-300">·</span>
                  <span>Patent-protected</span>
                </div>
              </div>
              <Link href={flagship.link || `/services/${flagship.slug.current}`} className="flex-shrink-0">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white shadow-lg">
                  Explore the Flagship
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER — inline (not sticky), aligned with card grid below */}
      <section className="py-6 bg-[#252640] border-b border-[#2e2c48]">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-wrap">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-[#191a2c] text-[#a8a4c8] hover:bg-gray-200 hover:text-[#f0eef8]'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(135deg, ${category.accent}, ${category.accent}cc)`,
                  } : undefined}
                >
                  {category.name}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-[#252640]/20' : 'bg-[#252640] text-[#8a87a8]'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, index) => {
              const card = (
                <Card
                  className={`h-full p-6 group cursor-pointer hover:shadow-xl transition-all relative overflow-hidden ${
                    service.isFlagship ? 'border-[#8734E1] bg-gradient-to-br from-white to-[#f0e6fb]/30 shadow-md' : 'hover:border-[#8734E1]'
                  }`}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}80)` }}
                  />
                  <CardContent className="p-0 pt-3 flex flex-col items-center text-center">
                    <div className="flex flex-col items-center mb-4 gap-2">
                      <GlassIcon
                        Icon={getServiceIcon(service._id)}
                        color={service.color}
                      />
                      {service.isFlagship && (
                        <Badge className="bg-[#8734E1] text-white">Flagship</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#f0eef8] mb-2 group-hover:text-[#8734E1] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#a8a4c8] mb-4 leading-relaxed">{service.shortDescription}</p>
                    <div className="flex items-center justify-center gap-4 pt-3 border-t border-[#2e2c48] w-full">
                      <span className="text-xs text-[#8a87a8]">{service.timeline}</span>
                      <div className="flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: service.color }}>
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              return (
                <motion.div
                  key={service._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  {service.link ? (
                    <Link href={service.link} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    <div onClick={() => setSelectedService(service)}>{card}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* HOW WE WORK STRIP */}
      <section className="section bg-[#181928] border-y border-[#3a3858]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">How We Work</Badge>
            <h2 className="heading-lg mb-3">
              Four <span className="gradient-text">steps</span> from call to launch
            </h2>
            <p className="text-[#a8a4c8]">
              Same process on every engagement. You know what happens this week, next week, and at
              launch. No mid-build scope expansion. No ghosting after kickoff.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {howWeWork.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="p-5 h-full hover:shadow-lg transition-all flex flex-col items-center text-center">
                    <div className="flex flex-col items-center gap-1 mb-3">
                      <GlassIcon Icon={Icon} color={step.color} size="w-11 h-11" iconSize="w-5 h-5" />
                      <div className="text-xs text-gray-400 font-mono">0{i + 1}</div>
                    </div>
                    <h3 className="font-semibold text-[#f0eef8] mb-1">{step.label}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{step.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/methodology">
              <Button variant="outline" size="lg">
                Read the full methodology
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
