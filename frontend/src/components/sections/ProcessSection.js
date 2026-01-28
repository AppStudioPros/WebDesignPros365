import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui';

const steps = [
  { number: '01', title: 'Discovery', description: 'We dive deep into your business goals, target audience, and competitive landscape.', color: '#2F73EE' },
  { number: '02', title: 'Strategy', description: 'Define the tech stack, features, and roadmap tailored to your needs.', color: '#8734E1' },
  { number: '03', title: 'Design', description: 'Create stunning UI/UX designs that align with your brand identity.', color: '#BF5DE0' },
  { number: '04', title: 'Development', description: 'Build with modern tech: Next.js, TypeScript, and best practices.', color: '#f59e0b' },
  { number: '05', title: 'Testing', description: 'Rigorous QA across devices, browsers, and performance benchmarks.', color: '#10b981' },
  { number: '06', title: 'Launch', description: 'Deploy to Vercel with optimized caching, monitoring, and support.', color: '#2F73EE' },
];

export default function ProcessSection() {
  return (
    <section className="section relative overflow-hidden bg-[#f8f9fc]">
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
          <p className="text-gray-600 max-w-2xl mx-auto">
            A proven 6-step process that ensures quality, transparency, and results.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8734E1]/20 to-transparent -translate-y-1/2" />

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
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:shadow-lg hover:border-[#8734E1]/30 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold text-gray-100">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>

                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[#8734E1]/40" />
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
