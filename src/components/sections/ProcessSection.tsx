'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Compass, FileSearch, Palette, Code2, Bug, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business goals, target audience, and competitive landscape.',
    icon: Compass,
    color: '#2F73EE',
    duration: '1 week',
    deliverable: 'Discovery brief',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Define the tech stack, features, and roadmap tailored to your needs.',
    icon: FileSearch,
    color: '#8734E1',
    duration: '1 week',
    deliverable: 'Fixed-price quote',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Stunning UI/UX designs that align with your brand identity, on the modern stack.',
    icon: Palette,
    color: '#BF5DE0',
    duration: '2-3 weeks',
    deliverable: 'Figma + design system',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Build with Next.js 16, TypeScript, Vercel Edge, and patented ACI integration.',
    icon: Code2,
    color: '#f59e0b',
    duration: '4-8 weeks',
    deliverable: 'Working staging environment',
  },
  {
    number: '05',
    title: 'Testing',
    description: 'QA across devices, browsers, Core Web Vitals, and WCAG 2.2 AA accessibility.',
    icon: Bug,
    color: '#10b981',
    duration: '1 week',
    deliverable: 'Audit report + fixes',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Deploy to Vercel with optimized caching, monitoring, and 30-90 day post-launch support.',
    icon: Rocket,
    color: '#2F73EE',
    duration: 'Day 1',
    deliverable: 'Production deploy',
  },
];

export default function ProcessSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#f8f9fc]/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
            Our Process
          </div>
          <h2 className="heading-lg mb-4">
            How We <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A proven 6-step process. No mystery, no scope creep, no surprises.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line behind cards */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8734E1]/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative"
                >
                  <div
                    className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:shadow-xl transition-all relative overflow-hidden group"
                    style={{ borderLeft: `3px solid ${step.color}` }}
                  >
                    {/* Background number watermark */}
                    <div
                      className="absolute -right-2 -top-2 text-7xl font-bold pointer-events-none select-none"
                      style={{ color: `${step.color}10` }}
                    >
                      {step.number}
                    </div>

                    {/* Icon medallion */}
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
                        boxShadow: `0 6px 20px -6px ${step.color}50, inset 0 1px 0 rgba(255,255,255,0.3)`,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.25} />
                    </div>

                    {/* Number + step counter */}
                    <div className="flex items-baseline gap-2 mb-2 relative">
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: step.color }}
                      >
                        STEP {step.number}
                      </span>
                      <span className="text-[10px] text-gray-400">·</span>
                      <span className="text-[10px] text-gray-500">{step.duration}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 relative">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 relative leading-relaxed">{step.description}</p>

                    {/* Deliverable footer */}
                    <div className="relative pt-3 border-t border-gray-100 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                      <span className="text-xs text-gray-500">
                        Deliverable: <span className="text-gray-800 font-medium">{step.deliverable}</span>
                      </span>
                    </div>
                  </div>

                  {/* Arrow connector to next step (desktop only) */}
                  {index < steps.length - 1 && index % 3 !== 2 && (
                    <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-[#8734E1]/40" strokeWidth={2} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
