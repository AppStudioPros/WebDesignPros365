import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { CTASection } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our case studies and see how we\'ve helped businesses transform their digital presence.',
}

// Case studies data (would come from Sanity in production)
const caseStudies = [
  {
    title: 'E-Commerce Platform Redesign',
    clientName: 'Sculpted Beauty',
    challenge: 'Slow site speed and poor mobile experience leading to high cart abandonment.',
    solution: 'Complete Next.js rebuild with optimized images, edge caching, and streamlined checkout.',
    results: [
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Page Speed', value: '2.1s LCP' },
      { metric: 'Mobile Traffic', value: '+65%' },
    ],
    technologies: ['Next.js', 'Shopify', 'Vercel', 'Tailwind'],
    slug: 'sculpted-beauty',
    featured: true,
  },
  {
    title: 'GEO Implementation for SaaS',
    clientName: 'PocketFiler',
    challenge: 'Not appearing in AI-powered search results despite strong traditional SEO.',
    solution: 'Implemented comprehensive GEO strategy with LLMs.txt, semantic markup, and content optimization.',
    results: [
      { metric: 'AI Citations', value: '+280%' },
      { metric: 'Organic Traffic', value: '+45%' },
      { metric: 'Lead Quality', value: '+60%' },
    ],
    technologies: ['GEO', 'Next.js', 'Sanity', 'OpenAI'],
    slug: 'pocketfiler',
    featured: true,
  },
  {
    title: 'AI Chatbot Integration',
    clientName: 'Contractor Guardians',
    challenge: 'High support ticket volume overwhelming small team.',
    solution: 'Custom AI chatbot trained on company knowledge base, integrated with CRM.',
    results: [
      { metric: 'Support Efficiency', value: '+60%' },
      { metric: 'Response Time', value: '<30s' },
      { metric: 'Customer Satisfaction', value: '94%' },
    ],
    technologies: ['OpenAI', 'Next.js', 'PostgreSQL', 'Vercel'],
    slug: 'contractor-guardians',
    featured: false,
  },
  {
    title: 'Headless CMS Migration',
    clientName: 'Fast Track Solutions',
    challenge: 'Legacy WordPress site difficult to update and slow to load.',
    solution: 'Migrated to Sanity CMS with Next.js frontend, enabling real-time editing.',
    results: [
      { metric: 'Content Updates', value: '5x faster' },
      { metric: 'Page Speed', value: '1.8s LCP' },
      { metric: 'SEO Rankings', value: '+25 positions' },
    ],
    technologies: ['Sanity', 'Next.js', 'Vercel', 'TypeScript'],
    slug: 'fast-track',
    featured: false,
  },
]

export default function PortfolioPage() {
  const featuredProjects = caseStudies.filter(cs => cs.featured)
  const otherProjects = caseStudies.filter(cs => !cs.featured)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">
              Our Work
            </Badge>
            <h1 className="heading-xl mb-6">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-lg text-white/60">
              Real results for real businesses. See how we've helped our clients
              achieve their digital goals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="overflow-hidden group hover:border-accent/30 transition-colors">
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-6xl opacity-50">🚀</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-accent mb-1">{project.clientName}</p>
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
                  </div>
                  
                  <p className="text-white/60 text-sm mb-6">{project.solution}</p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {project.results.map((result) => (
                      <div key={result.metric} className="text-center">
                        <p className="text-xl font-bold gradient-text">{result.value}</p>
                        <p className="text-xs text-white/40">{result.metric}</p>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-white/5 rounded-lg text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="section bg-dark-secondary">
        <div className="container-custom">
          <h2 className="heading-md mb-8">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.slug} className="p-6 group hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-accent mb-1">{project.clientName}</p>
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  </div>
                </div>
                
                <p className="text-white/60 text-sm mb-4">{project.solution}</p>

                {/* Quick Results */}
                <div className="flex gap-4 mb-4">
                  {project.results.slice(0, 2).map((result) => (
                    <div key={result.metric}>
                      <span className="font-bold text-accent">{result.value}</span>
                      <span className="text-xs text-white/40 ml-1">{result.metric}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-white/5 rounded-lg text-white/40">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
