'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui'

const techStack = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'Next.js 15', description: 'React Framework' },
      { name: 'TypeScript', description: 'Type Safety' },
      { name: 'Tailwind CSS', description: 'Styling' },
      { name: 'Framer Motion', description: 'Animations' },
    ],
  },
  {
    category: 'Backend & CMS',
    technologies: [
      { name: 'Sanity.io', description: 'Headless CMS' },
      { name: 'Vercel Edge', description: 'Serverless' },
      { name: 'Node.js', description: 'Runtime' },
      { name: 'PostgreSQL', description: 'Database' },
    ],
  },
  {
    category: 'AI & Optimization',
    technologies: [
      { name: 'OpenAI', description: 'AI Integration' },
      { name: 'GEO Ready', description: 'AI Search' },
      { name: 'Core Web Vitals', description: 'Performance' },
      { name: 'Lighthouse 90+', description: 'Scoring' },
    ],
  },
]

export default function TechStackSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="accent" className="mb-4">
            Tech Stack
          </Badge>
          <h2 className="heading-lg mb-4">
            Built with <span className="gradient-text">Modern Technology</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We use cutting-edge tools and frameworks to deliver exceptional results.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">{category.category}</h3>
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-white font-medium">{tech.name}</span>
                    <span className="text-sm text-white/40">{tech.description}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
