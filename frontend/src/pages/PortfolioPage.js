import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Globe, Zap, Bot, ShoppingCart, Search, Palette, Code } from 'lucide-react';
import { Card, CardContent, Badge } from '../components/ui';
import { CTASection } from '../components/sections';

const caseStudies = [
  {
    title: 'E-Commerce Platform Redesign',
    clientName: 'Sculpted Beauty',
    solution: 'Complete Next.js rebuild with optimized images, edge caching, and streamlined checkout flow for maximum conversions.',
    results: [
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Page Speed', value: '2.1s LCP' },
      { metric: 'Mobile Traffic', value: '+65%' },
    ],
    technologies: ['Next.js', 'Shopify', 'Vercel', 'Tailwind'],
    featured: true,
    icon: ShoppingCart,
    color: '#f59e0b',
  },
  {
    title: 'GEO Implementation for SaaS',
    clientName: 'PocketFiler',
    solution: 'Implemented comprehensive GEO strategy with LLMs.txt, semantic markup, and content optimization for AI discovery.',
    results: [
      { metric: 'AI Citations', value: '+280%' },
      { metric: 'Organic Traffic', value: '+45%' },
      { metric: 'Lead Quality', value: '+60%' },
    ],
    technologies: ['GEO', 'Next.js', 'Sanity', 'OpenAI'],
    featured: true,
    icon: Globe,
    color: '#8734E1',
  },
  {
    title: 'AI Chatbot Integration',
    clientName: 'Contractor Guardians',
    solution: 'Custom AI chatbot trained on company knowledge base, integrated with CRM for seamless customer support.',
    results: [
      { metric: 'Support Efficiency', value: '+60%' },
      { metric: 'Response Time', value: '<30s' },
      { metric: 'Customer Satisfaction', value: '94%' },
    ],
    technologies: ['OpenAI', 'Next.js', 'PostgreSQL', 'Vercel'],
    featured: true,
    icon: Bot,
    color: '#2F73EE',
  },
  {
    title: 'Headless CMS Migration',
    clientName: 'Fast Track Solutions',
    solution: 'Migrated to Sanity CMS with Next.js frontend, enabling real-time editing and blazing-fast page loads.',
    results: [
      { metric: 'Content Updates', value: '5x faster' },
      { metric: 'Page Speed', value: '1.8s LCP' },
      { metric: 'SEO Rankings', value: '+25 positions' },
    ],
    technologies: ['Sanity', 'Next.js', 'Vercel', 'TypeScript'],
    featured: true,
    icon: Code,
    color: '#BF5DE0',
  },
  {
    title: 'Performance Optimization',
    clientName: 'TechStart Inc.',
    solution: 'Complete performance audit and optimization including image optimization, code splitting, and edge caching.',
    results: [
      { metric: 'Load Time', value: '-65%' },
      { metric: 'Bounce Rate', value: '-40%' },
      { metric: 'Core Web Vitals', value: 'All Green' },
    ],
    technologies: ['Next.js', 'Vercel', 'Lighthouse', 'CDN'],
    featured: false,
    icon: Zap,
    color: '#f59e0b',
  },
  {
    title: 'SEO & Content Strategy',
    clientName: 'GrowthLabs Agency',
    solution: 'Comprehensive SEO overhaul with technical optimization, content strategy, and ongoing performance monitoring.',
    results: [
      { metric: 'Organic Traffic', value: '+180%' },
      { metric: 'Keyword Rankings', value: '+120' },
      { metric: 'Domain Authority', value: '+15' },
    ],
    technologies: ['SEO', 'Content Strategy', 'Analytics', 'Schema'],
    featured: false,
    icon: Search,
    color: '#10b981',
  },
  {
    title: 'Brand Refresh & Redesign',
    clientName: 'Urban Lifestyle Co.',
    solution: 'Complete brand refresh with new visual identity, custom illustrations, and responsive web design.',
    results: [
      { metric: 'Brand Recognition', value: '+85%' },
      { metric: 'User Engagement', value: '+55%' },
      { metric: 'Social Shares', value: '+200%' },
    ],
    technologies: ['Figma', 'Next.js', 'Framer Motion', 'Tailwind'],
    featured: false,
    icon: Palette,
    color: '#BF5DE0',
  },
  {
    title: 'Multi-vendor Marketplace',
    clientName: 'ArtisanHub',
    solution: 'Built a custom multi-vendor marketplace with vendor dashboards, payment splitting, and inventory management.',
    results: [
      { metric: 'Vendors Onboarded', value: '150+' },
      { metric: 'Monthly GMV', value: '$2.5M' },
      { metric: 'Avg. Order Value', value: '+35%' },
    ],
    technologies: ['Next.js', 'Stripe Connect', 'PostgreSQL', 'Vercel'],
    featured: false,
    icon: ShoppingCart,
    color: '#2F73EE',
  },
  {
    title: 'Real-time Analytics Dashboard',
    clientName: 'DataFlow Analytics',
    solution: 'Custom analytics dashboard with real-time data visualization, custom reports, and automated alerting.',
    results: [
      { metric: 'Data Processing', value: '10x faster' },
      { metric: 'Report Generation', value: 'Real-time' },
      { metric: 'User Adoption', value: '95%' },
    ],
    technologies: ['Next.js', 'D3.js', 'WebSockets', 'PostgreSQL'],
    featured: false,
    icon: TrendingUp,
    color: '#8734E1',
  },
  {
    title: 'AI-Powered Content Platform',
    clientName: 'ContentGenius',
    solution: 'Built an AI-powered content management platform with automated content generation and SEO optimization.',
    results: [
      { metric: 'Content Output', value: '10x increase' },
      { metric: 'SEO Score', value: '+45%' },
      { metric: 'Time Saved', value: '20hrs/week' },
    ],
    technologies: ['OpenAI', 'Next.js', 'Sanity', 'Vercel'],
    featured: false,
    icon: Bot,
    color: '#f59e0b',
  },
];

export default function PortfolioPage() {
  const featuredProjects = caseStudies.filter(cs => cs.featured);
  const otherProjects = caseStudies.filter(cs => !cs.featured);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">Our Work</Badge>
            <h1 className="heading-xl mb-6">Case <span className="gradient-text">Studies</span></h1>
            <p className="text-lg text-gray-600">
              Real results for real businesses. See how we've helped our clients achieve their digital goals.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
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
                <Card className="overflow-hidden group hover:shadow-xl transition-all h-full bg-white border-gray-200">
                  <div className="aspect-video bg-gradient-to-br from-[#f8f9fc] to-white flex items-center justify-center relative">
                    <project.icon className="w-16 h-16 opacity-20" style={{ color: project.color }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm mb-1" style={{ color: project.color }}>{project.clientName}</p>
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#8734E1] transition-colors" />
                    </div>
                    <p className="text-gray-600 text-sm mb-6">{project.solution}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.results.map((result) => (
                        <div key={result.metric} className="text-center">
                          <p className="text-xl font-bold gradient-text">{result.value}</p>
                          <p className="text-xs text-gray-500">{result.metric}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-[#f8f9fc] rounded-lg text-gray-600 border border-gray-200">{tech}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <h2 className="heading-md mb-8">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.clientName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 group hover:shadow-lg transition-all h-full bg-white border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${project.color}15` }}>
                      <project.icon className="w-5 h-5" style={{ color: project.color }} />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: project.color }}>{project.clientName}</p>
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.solution}</p>
                  <div className="flex gap-4 mb-4">
                    {project.results.slice(0, 2).map((result) => (
                      <div key={result.metric}>
                        <span className="font-bold" style={{ color: project.color }}>{result.value}</span>
                        <span className="text-xs text-gray-500 ml-1">{result.metric}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-[#f8f9fc] rounded-lg text-gray-500">{tech}</span>
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
