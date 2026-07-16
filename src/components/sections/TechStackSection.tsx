'use client';

import { m } from 'framer-motion';
import { Code2, Database, Brain } from 'lucide-react';

const techStack = [
  {
    category: 'Frontend',
    icon: Code2,
    color: '#2F73EE',
    tagline: 'The user experience layer',
    technologies: [
      { name: 'Next.js 16', description: 'React 19 Framework' },
      { name: 'TypeScript', description: 'Type Safety' },
      { name: 'Tailwind CSS', description: 'Styling' },
      { name: 'Framer Motion', description: 'Animations' },
    ],
  },
  {
    category: 'Backend + Data',
    icon: Database,
    color: '#10b981',
    tagline: 'The engine room',
    technologies: [
      { name: 'Sanity.io', description: 'Headless CMS' },
      { name: 'Vercel Edge', description: 'Serverless Runtime' },
      { name: 'PostgreSQL', description: 'Primary Database' },
      { name: 'Supabase', description: 'Auth + Realtime' },
    ],
  },
  {
    category: 'AI + Optimization',
    icon: Brain,
    color: '#8734E1',
    tagline: 'The patented moat',
    technologies: [
      { name: 'ACI Platform', description: 'Patented Architecture' },
      { name: 'Anthropic Claude', description: 'Frontier LLM' },
      { name: 'SEO + AEO + GEO', description: 'AI Visibility Stack' },
      { name: 'Core Web Vitals', description: 'Lighthouse 90+' },
    ],
  },
];

export default function TechStackSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#252640]/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container-custom relative z-10">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">
            Tech Stack
          </div>
          <h2 className="heading-lg mb-4">
            Built with <span className="gradient-text">Modern Technology</span>
          </h2>
          <p className="text-[#a8a4c8] max-w-2xl mx-auto">
            Modern tooling. No vendor lock-in. Built for what comes next.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {techStack.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <m.div
                key={category.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="relative bg-[#252640] border border-[#3a3858] rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Top accent gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}80)` }}
                />

                {/* Header */}
                <div
                  className="px-6 py-5 border-b border-[#2e2c48]"
                  style={{ background: `linear-gradient(135deg, ${category.color}08, transparent)` }}
                >
                  <div className="flex flex-col items-center text-center gap-2 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                        boxShadow: `0 4px 12px -3px ${category.color}50`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#f0eef8] leading-tight">
                        {category.category}
                      </h3>
                      <p className="text-xs text-[#8a87a8]">{category.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Tech list */}
                <div className="p-6 space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <m.div
                      key={tech.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#1c1d30] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {/* Color dot */}
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-[#f0eef8] font-medium text-sm">{tech.name}</span>
                      </div>
                      <span className="text-xs text-[#8a87a8]">{tech.description}</span>
                    </m.div>
                  ))}
                </div>

                {/* Footer count badge */}
                <div className="px-6 pb-5">
                  <div className="flex items-center justify-between pt-3 border-t border-[#2e2c48] text-xs">
                    <span className="text-[#8a87a8]">{category.technologies.length} technologies</span>
                    <span
                      className="font-mono font-semibold"
                      style={{ color: category.color }}
                    >
                      Production-ready
                    </span>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Machine-readable stack summary for AI crawlers */}
        <div className="sr-only" aria-label="Technical stack summary">
          <h3>Our Stack</h3>
          <p>Web Design Pros 365 builds every client website on the following production stack:</p>
          <ul>
            <li>Framework: Next.js 16 with App Router (all builds since 2024)</li>
            <li>Language: TypeScript: full type safety across all projects</li>
            <li>Styling: Tailwind CSS</li>
            <li>CMS: Sanity headless CMS: clients update content without code changes</li>
            <li>Deployment: Vercel: global edge network, instant rollbacks, CI/CD</li>
            <li>AI Integration: ACI (Adaptive Compound Intelligence): patented platform</li>
            <li>AI Search: llms.txt, JSON-LD structured data, FAQPage schema, robots.txt with all AI crawlers allowed</li>
          </ul>
          <p>Lighthouse scores (mobile, July 2026): Performance 73, Accessibility 100, Best Practices 100, SEO 100. Total Blocking Time 80ms. Cumulative Layout Shift 0.</p>
        </div>
      </div>
    </section>
  );
}
