"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const projects = [
  {
    title: 'Contractor Guardians',
    category: 'Business Website',
    description: 'Professional contractor services platform with modern design and lead generation.',
    url: 'https://contractorguardians.com',
    image: '/portfolio/contractor-guardians.jpg',
    tags: ['Next.js', 'Sanity CMS', 'Vercel'],
    color: '#8734E1',
  },
  {
    title: 'AppStudio Pro',
    category: 'Technology Platform',
    description: 'Custom application development studio showcasing enterprise solutions.',
    url: 'https://appstudiopro.com',
    image: '/portfolio/appstudio-pro.jpg',
    tags: ['Next.js', 'TypeScript', 'AI Integration'],
    color: '#2F73EE',
  },
  {
    title: 'Subie Recycler',
    category: 'E-Commerce',
    description: 'Subaru parts recycling marketplace with inventory management.',
    url: 'https://subierecycler.com',
    image: '/portfolio/subie-recycler.jpg',
    tags: ['Next.js', 'E-Commerce', 'CMS'],
    color: '#10b981',
  },
  {
    title: 'Coming Soon',
    category: 'Your Project?',
    description: "Your next website could be here. Let's build something amazing together.",
    url: '/contact',
    image: '',
    tags: ['Your Stack', 'Your Vision', 'Our Expertise'],
    color: '#BF5DE0',
  },
];

// Stacked card rotation angles
const cardAngles = [-6, -2, 2, 6];
const cardOffsets = [0, 8, 16, 24];

export default function PortfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Portfolio</Badge>
            <h1 className="heading-xl mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-lg text-gray-600">
              Real projects. Real results. Hover to explore what we&apos;ve built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stacked Cards Section */}
      <section className="section bg-white overflow-hidden">
        <div className="container-custom">
          {/* Stacked Card Display */}
          <div className="flex justify-center items-center py-16">
            <div className="relative w-[340px] h-[440px] sm:w-[380px] sm:h-[480px]">
              {projects.map((project, index) => {
                const isHovered = hoveredIndex === index;
                const angle = cardAngles[index];
                const offset = cardOffsets[index];

                return (
                  <motion.div
                    key={project.title}
                    className="absolute inset-0 cursor-pointer"
                    style={{
                      zIndex: isHovered ? 50 : projects.length - index,
                    }}
                    initial={{
                      rotate: angle,
                      x: offset,
                      y: offset,
                    }}
                    animate={{
                      rotate: isHovered ? 0 : angle,
                      x: isHovered ? 0 : offset,
                      y: isHovered ? -30 : offset,
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className={`w-full h-full rounded-2xl overflow-hidden shadow-xl border-2 transition-shadow duration-300 ${
                        isHovered ? 'shadow-2xl' : 'shadow-lg'
                      }`}
                      style={{
                        borderColor: isHovered ? project.color : 'rgba(0,0,0,0.08)',
                        background: 'white',
                      }}
                    >
                      {/* Image area */}
                      <div
                        className="h-[55%] relative overflow-hidden"
                        style={{
                          background: project.image
                            ? `url(${project.image}) center/cover`
                            : `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                        }}
                      >
                        {!project.image && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl opacity-30">✨</span>
                          </div>
                        )}
                        {/* Overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/40 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.url.startsWith('http') ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Visit Site <ExternalLink className="w-4 h-4" />
                            </a>
                          ) : (
                            <a
                              href={project.url}
                              className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
                            >
                              Let&apos;s Talk <ArrowRight className="w-4 h-4" />
                            </a>
                          )}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-5 h-[45%] flex flex-col justify-between">
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-wider mb-1"
                            style={{ color: project.color }}
                          >
                            {project.category}
                          </p>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                              style={{
                                backgroundColor: `${project.color}12`,
                                color: project.color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Instruction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-gray-400 mt-4"
          >
            Hover over the cards to explore our work
          </motion.p>

          {/* Expanded Details Below */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={`detail-${project.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-gray-200 p-5 hover:border-[#8734E1]/30 hover:shadow-md transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${project.color}15` }}
                >
                  <span className="text-lg">
                    {index === 0 ? '🏗️' : index === 1 ? '💻' : index === 2 ? '🚗' : '🚀'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#8734E1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{project.description}</p>
                {project.url.startsWith('http') ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8734E1] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={project.url}
                    className="text-sm text-[#8734E1] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Start Your Project <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
