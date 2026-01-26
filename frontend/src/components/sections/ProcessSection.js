import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Palette, Code, TestTube2, Rocket, ArrowRight } from 'lucide-react';
import { Badge } from '../ui';

const steps = [
  { number: '01', title: 'Discovery', description: 'We dive deep into your business goals, target audience, and competitive landscape.', icon: MessageSquare },
  { number: '02', title: 'Strategy', description: 'Define the tech stack, features, and roadmap tailored to your needs.', icon: Search },
  { number: '03', title: 'Design', description: 'Create stunning UI/UX designs that align with your brand identity.', icon: Palette },
  { number: '04', title: 'Development', description: 'Build with modern tech: Next.js, TypeScript, and best practices.', icon: Code },
  { number: '05', title: 'Testing', description: 'Rigorous QA across devices, browsers, and performance benchmarks.', icon: TestTube2 },
  { number: '06', title: 'Launch', description: 'Deploy to Vercel with optimized caching, monitoring, and support.', icon: Rocket },
];

export default function ProcessSection() {
  return (
    <section className="section relative overflow-hidden bg-[#1a1f2e]">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="accent" className="mb-4">Our Process</Badge>
          <h2 className="heading-lg mb-4">
            How We <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A proven 6-step process that ensures quality, transparency, and results.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00d9ff]/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-hover p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold text-white/10">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-[#00d9ff]/20 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[#00d9ff]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </div>

                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[#00d9ff]/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
