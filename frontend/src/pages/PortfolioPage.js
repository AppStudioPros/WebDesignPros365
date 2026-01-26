import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, Badge } from '../components/ui';
import { CTASection } from '../components/sections';

const caseStudies = [
  {
    title: 'E-Commerce Platform Redesign',
    clientName: 'Sculpted Beauty',
    solution: 'Complete Next.js rebuild with optimized images, edge caching, and streamlined checkout.',
    results: [
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Page Speed', value: '2.1s LCP' },
      { metric: 'Mobile Traffic', value: '+65%' },
    ],
    technologies: ['Next.js', 'Shopify', 'Vercel', 'Tailwind'],
    featured: true,
  },
  {
    title: 'GEO Implementation for SaaS',
    clientName: 'PocketFiler',
    solution: 'Implemented comprehensive GEO strategy with LLMs.txt, semantic markup, and content optimization.',
    results: [
      { metric: 'AI Citations', value: '+280%' },
      { metric: 'Organic Traffic', value: '+45%' },
      { metric: 'Lead Quality', value: '+60%' },
    ],
    technologies: ['GEO', 'Next.js', 'Sanity', 'OpenAI'],
    featured: true,
  },
  {
    title: 'AI Chatbot Integration',
    clientName: 'Contractor Guardians',
    solution: 'Custom AI chatbot trained on company knowledge base, integrated with CRM.',
    results: [
      { metric: 'Support Efficiency', value: '+60%' },
      { metric: 'Response Time', value: '<30s' },
      { metric: 'Customer Satisfaction', value: '94%' },
    ],
    technologies: ['OpenAI', 'Next.js', 'PostgreSQL', 'Vercel'],
    featured: false,
  },
  {
    title: 'Headless CMS Migration',
    clientName: 'Fast Track Solutions',
    solution: 'Migrated to Sanity CMS with Next.js frontend, enabling real-time editing.',
    results: [
      { metric: 'Content Updates', value: '5x faster' },
      { metric: 'Page Speed', value: '1.8s LCP' },
      { metric: 'SEO Rankings', value: '+25 positions' },
    ],
    technologies: ['Sanity', 'Next.js', 'Vercel', 'TypeScript'],
    featured: false,
  },
];

export default function PortfolioPage() {
  const featuredProjects = caseStudies.filter(cs => cs.featured);
  const otherProjects = caseStudies.filter(cs => !cs.featured);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">Our Work</Badge>
            <h1 className="heading-xl mb-6">Case <span className="gradient-text">Studies</span></h1>
            <p className="text-lg text-white/60">
              Real results for real businesses. See how we've helped our clients achieve their digital goals.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.clientName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:border-[#00d9ff]/30 transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-[#0066cc]/20 to-[#00d9ff]/20 flex items-center justify-center">
                    <span className="text-6xl opacity-50">🚀</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-[#00d9ff] mb-1">{project.clientName}</p>
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#00d9ff] transition-colors" />
                    </div>
                    <p className="text-white/60 text-sm mb-6">{project.solution}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.results.map((result) => (
                        <div key={result.metric} className="text-center">
                          <p className="text-xl font-bold gradient-text">{result.value}</p>
                          <p className="text-xs text-white/40">{result.metric}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-white/5 rounded-lg text-white/60">{tech}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#1a1f2e]">
        <div className="container-custom">
          <h2 className="heading-md mb-8">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.clientName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 group hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-[#00d9ff] mb-1">{project.clientName}</p>
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{project.solution}</p>
                  <div className="flex gap-4 mb-4">
                    {project.results.slice(0, 2).map((result) => (
                      <div key={result.metric}>
                        <span className="font-bold text-[#00d9ff]">{result.value}</span>
                        <span className="text-xs text-white/40 ml-1">{result.metric}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-white/5 rounded-lg text-white/40">{tech}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
