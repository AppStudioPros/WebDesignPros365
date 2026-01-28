import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';

const techBadges = [
  { name: 'Next.js 15', icon: '/icons/svg/gradient/coding.svg' },
  { name: 'Vercel Edge', icon: '/icons/svg/gradient/speed test.svg' },
  { name: 'Sanity CMS', icon: '/icons/svg/gradient/database.svg' },
  { name: 'GEO Ready', icon: '/icons/svg/gradient/rocket.svg' },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '<2.5s', label: 'Avg. LCP Score' },
  { value: '24/7', label: 'Support' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Semi-transparent overlay - TESTING at 30% opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/30" />
      {/* Grid pattern on top of overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      {/* Gradient mesh effect */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BF5DE0]/5 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0e6fb] border border-[#8734E1] text-[#8734E1] mb-8"
          >
            <img src="/icons/svg/gradient/rocket.svg" alt="rocket" className="w-4 h-4" />
            <span className="text-sm font-medium">Introducing GEO - Generative Engine Optimization</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-xl text-balance mb-6"
          >
            Crafting{' '}
            <span className="gradient-text">Next-Gen</span>
            <br />
            Web Experiences
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            We build high-performance websites and applications using cutting-edge technology.
            From AI integration to GEO optimization, we transform your digital presence.
          </motion.p>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {techBadges.map((badge) => (
              <div
                key={badge.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm shadow-sm"
              >
                <img src={badge.icon} alt={badge.name} className="w-5 h-5" />
                {badge.name}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/contact">
              <Button variant="accent" size="lg">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#8734E1]/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-[#8734E1]/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
